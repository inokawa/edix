import { compareLine, comparePosition } from "./position";
import {
  DocFragment,
  DocLine,
  DocNode,
  Position,
  SelectionSnapshot,
  Writeable,
} from "./types";

/**
 * @internal
 */
export const isTextNode = (node: DocNode) => "text" in node;
const getNodeSize = (node: DocNode): number =>
  isTextNode(node) ? node.text.length : 1;

/**
 * @internal
 */
export const getLineSize = (line: DocLine): number =>
  line.reduce((acc, n) => acc + getNodeSize(n), 0);

const merge = (a: DocLine, b: DocLine): DocLine => {
  const result: Writeable<DocLine> = [...a];
  if (!result.length) {
    result.push(...b);
  } else {
    for (const node of b) {
      const index = result.length - 1;
      const target = result[index]!;
      if (isTextNode(node) && isTextNode(target)) {
        result[index] = { text: target.text + node.text };
      } else {
        result.push(node);
      }
    }
  }
  return result;
};

const split = (line: DocLine, offset: number): [DocLine, DocLine] => {
  for (let i = 0; i < line.length; i++) {
    const node = line[i]!;
    const size = getNodeSize(node);
    if (size > offset) {
      const before = line.slice(0, i);
      const after = line.slice(i + 1);
      if (isTextNode(node)) {
        const beforeText = node.text.slice(0, offset);
        const afterText = node.text.slice(offset);
        if (beforeText) {
          before.push({ text: beforeText });
        }
        if (afterText) {
          after.unshift({ text: afterText });
        }
      } else {
        // node size must be 1
        after.unshift(node);
      }
      return [before, after];
    }
    offset -= size;
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
        selectionPos[0] + start[0] - end[0],
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

  const lines: Writeable<DocFragment> = [...fragment];
  if (lines.length) {
    lines[0] = merge(before, lines[0]!);
    lines[lines.length - 1] = merge(lines[lines.length - 1]!, after);
  } else {
    lines.push(merge(before, after));
  }

  doc.splice(startLine, endLine - startLine + 1, ...lines);
};

/**
 * @internal
 */
export const sliceDoc = (
  doc: DocFragment,
  start: Position,
  end: Position
): DocFragment => {
  if (compareLine(start, end) === 0) {
    return [split(split(doc[start[0]]!, end[1])[0], start[1])[1]];
  }
  return [
    split(doc[start[0]]!, start[1])[1],
    ...doc.slice(start[0] + 1, end[0]),
    split(doc[end[0]]!, end[1])[0],
  ];
};

/**
 * @internal
 */
export const insertEdit = (
  doc: Writeable<DocFragment>,
  selection: Writeable<SelectionSnapshot>,
  pos: Position,
  lines: DocFragment
) => {
  const [anchor, focus] = selection;

  const lineLength = lines.length;
  const lineDiff = lineLength - 1;
  const lastRowLength = getLineSize(lines[lineLength - 1]!);

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
): [Writeable<DocFragment>, Writeable<SelectionSnapshot>] => {
  let offsetBeforeAnchor = 0;
  let offsetBeforeFocus = 0;

  for (let i = 0; i < doc.length; i++) {
    for (const node of doc[i]!) {
      const size = getNodeSize(node);
      if (i < anchorLine) {
        offsetBeforeAnchor += size;
      }
      if (i < focusLine) {
        offsetBeforeFocus += size;
      }
    }
  }

  return [
    [doc.reduce((acc, l) => merge(acc, l), [] as DocLine)],
    [
      [0, offsetBeforeAnchor + anchorOffset],
      [0, offsetBeforeFocus + focusOffset],
    ],
  ];
};
