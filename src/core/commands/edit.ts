import { compareLine, comparePosition } from "../position";
import {
  DocFragment,
  NODE_TEXT,
  NodeData,
  Position,
  SelectionSnapshot,
  Writeable,
} from "../types";

const isTextNode = (node: NodeData) => node.type === NODE_TEXT;
const getNodeSize = (node: NodeData): number =>
  isTextNode(node) ? node.text.length : 1;

const insertNodeAfter = (line: NodeData[], index: number, node: NodeData) => {
  const target = line[index]!;
  if (isTextNode(node) && isTextNode(target)) {
    line[index] = { type: NODE_TEXT, text: target.text + node.text };
  } else {
    line.splice(index + 1, 0, node);
  }
};

const join = (...lines: (readonly NodeData[])[]): readonly NodeData[] => {
  const line: NodeData[] = [];
  for (let i = 0; i < lines.length; i++) {
    const current = lines[i]!;
    if (!line.length) {
      line.push(...current);
    } else {
      for (const node of current) {
        insertNodeAfter(line, line.length - 1, node);
      }
    }
  }
  return line;
};

const split = (
  line: readonly NodeData[],
  offset: number
): [readonly NodeData[], readonly NodeData[]] => {
  for (let i = 0; i < line.length; i++) {
    const node = line[i]!;
    const length = getNodeSize(node);
    if (length > offset) {
      const before = line.slice(0, i);
      const after = line.slice(i + 1);
      if (isTextNode(node)) {
        before.push({ type: NODE_TEXT, text: node.text.slice(0, offset) });
        after.unshift({ type: NODE_TEXT, text: node.text.slice(offset) });
      } else {
        // TODO improve
        if (offset === 0) {
          after.unshift(node);
        } else {
          before.push(node);
        }
      }
      return [before, after];
    }
    offset -= length;
  }
  return [line, []];
};

const fixPositionAfterInsert = (
  selectionPos: Position,
  pos: Position,
  lineDiff: number,
  lastRowLength: number
): Position => {
  return [
    selectionPos[0] + lineDiff,
    selectionPos[1] +
      (compareLine(selectionPos, pos) === 0
        ? lastRowLength - (lineDiff === 0 ? 0 : pos[1])
        : 0),
  ];
};

const fixPositionAfterDelete = (
  selectionPos: Position,
  start: Position,
  end: Position
): Position => {
  return comparePosition(end, selectionPos) === 1
    ? [
        selectionPos[0] - end[0] - start[0],
        selectionPos[1] +
          (compareLine(end, selectionPos) === 0 ? start[1] - end[1] : 0),
      ]
    : start;
};

const replaceRange = (
  doc: Writeable<DocFragment>,
  fragment: DocFragment,
  start: Position,
  end?: Position
) => {
  const [startLine] = start;
  const [endLine] = end || start;

  const splitByStart = split(doc[start[0]]!, start[1]);
  const before = splitByStart[0];
  const after = end ? split(doc[end[0]]!, end[1])[1] : splitByStart[1];

  const lines: (readonly NodeData[])[] = [...fragment];
  if (lines.length) {
    lines[0] = join(before, lines[0]!);
    lines[lines.length - 1] = join(lines[lines.length - 1]!, after);
  } else {
    lines.push(join(before, after));
  }

  doc.splice(startLine, endLine - startLine + 1, ...lines);
};

/**
 * @internal
 */
export const insertEdit = (
  doc: Writeable<DocFragment>,
  selection: Writeable<SelectionSnapshot>,
  lines: DocFragment,
  pos: Position
) => {
  const [anchor, focus] = selection;

  const lineLength = lines.length;
  const lineDiff = lineLength - 1;
  const lastRowLength = lines[lineLength - 1]!.reduce(
    (acc, n) => acc + getNodeSize(n),
    0
  );

  replaceRange(doc, lines, pos);

  if (comparePosition(anchor, pos) !== 1) {
    selection[0] = fixPositionAfterInsert(anchor, pos, lineDiff, lastRowLength);
  }
  if (comparePosition(focus, pos) !== 1) {
    selection[1] = fixPositionAfterInsert(focus, pos, lineDiff, lastRowLength);
  }
};

/**
 * @internal
 */
export const deleteEdit = (
  doc: Writeable<DocFragment>,
  selection: Writeable<SelectionSnapshot>,
  start: Position,
  end: Position
) => {
  const [anchor, focus] = selection;

  replaceRange(doc, [], start, end);

  if (comparePosition(anchor, start) !== 1) {
    selection[0] = fixPositionAfterDelete(anchor, start, end);
  }
  if (comparePosition(focus, start) !== 1) {
    selection[1] = fixPositionAfterDelete(focus, start, end);
  }
};

/**
 * @internal
 */
export const flatten = (
  doc: DocFragment,
  [[anchorLine, anchorOffset], [focusLine, focusOffset]]: SelectionSnapshot
): [DocFragment, SelectionSnapshot] => {
  let offsetBeforeAnchor = 0;
  let offsetBeforeFocus = 0;

  for (let i = 0; i < doc.length; i++) {
    for (const node of doc[i]!) {
      const length = getNodeSize(node);
      if (i < anchorLine) {
        offsetBeforeAnchor += length;
      }
      if (i < focusLine) {
        offsetBeforeFocus += length;
      }
    }
  }

  return [
    [join(...doc)],
    [
      [0, offsetBeforeAnchor + anchorOffset],
      [0, offsetBeforeFocus + focusOffset],
    ],
  ];
};
