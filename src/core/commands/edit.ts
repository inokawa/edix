import { compareLine, comparePosition } from "../position";
import {
  DomSnapshot,
  NodeRef,
  Position,
  SelectionSnapshot,
  Writeable,
} from "../types";

const isTextNode = (node: NodeRef) => typeof node === "string";
const getNodeLength = (node: NodeRef): number =>
  isTextNode(node) ? node.length : 1;
const getLineLength = (nodes: readonly NodeRef[]): number =>
  nodes.reduce((acc, n) => acc + getNodeLength(n), 0);

const insertNodeAfter = (line: NodeRef[], index: number, node: NodeRef) => {
  const target = line[index]!;
  if (isTextNode(node) && isTextNode(target)) {
    line[index] = target + node;
  } else {
    line.splice(index + 1, 0, node);
  }
};

const joinNodes = (...lines: (readonly NodeRef[])[]): readonly NodeRef[] => {
  const line: NodeRef[] = [];
  for (let i = 0; i < lines.length; i++) {
    const current = lines[i]!;
    if (i === 0) {
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
  line: readonly NodeRef[],
  offset: number
): [readonly NodeRef[], readonly NodeRef[]] => {
  for (let i = 0; i < line.length; i++) {
    const node = line[i]!;
    const length = getNodeLength(node);
    if (length > offset) {
      const before = line.slice(0, i);
      const after = line.slice(i + 1);
      if (isTextNode(node)) {
        before.push(node.slice(0, offset));
        after.unshift(node.slice(offset));
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
  doc: Writeable<DomSnapshot>,
  newLines: DomSnapshot,
  start: Position,
  end?: Position
) => {
  const [startLine] = start;
  const [endLine] = end || start;

  const splitByStart = split(doc[start[0]]!, start[1]);
  const before = splitByStart[0];
  const after = end ? split(doc[end[0]]!, end[1])[1] : splitByStart[1];

  const results: (readonly NodeRef[])[] = [...newLines];
  results[0] = results.length ? joinNodes(before, results[0]!) : before;
  results[results.length - 1] = joinNodes(results[results.length - 1]!, after);

  doc.splice(startLine, endLine - startLine + 1, ...results);
};

/**
 * @internal
 */
export const insertEdit = (
  doc: Writeable<DomSnapshot>,
  selection: Writeable<SelectionSnapshot>,
  lines: DomSnapshot,
  pos: Position
) => {
  const [anchor, focus] = selection;

  const lineLength = lines.length;
  const lineDiff = lineLength - 1;
  const lastRowLength = getLineLength(lines[lineLength - 1]!);

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
  doc: Writeable<DomSnapshot>,
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
  doc: DomSnapshot,
  [[anchorLine, anchorOffset], [focusLine, focusOffset]]: SelectionSnapshot
): [DomSnapshot, SelectionSnapshot] => {
  let offsetBeforeAnchor = 0;
  let offsetBeforeFocus = 0;

  for (let i = 0; i < doc.length; i++) {
    for (const node of doc[i]!) {
      const length = getNodeLength(node);
      if (i < anchorLine) {
        offsetBeforeAnchor += length;
      }
      if (i < focusLine) {
        offsetBeforeFocus += length;
      }
    }
  }

  return [
    [joinNodes(...doc)],
    [
      [0, offsetBeforeAnchor + anchorOffset],
      [0, offsetBeforeFocus + focusOffset],
    ],
  ];
};
