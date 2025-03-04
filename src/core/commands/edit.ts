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
const getRowLength = (nodes: readonly NodeRef[]): number =>
  nodes.reduce((acc, n) => acc + getNodeLength(n), 0);

const insertNodeAfter = (row: NodeRef[], index: number, node: NodeRef) => {
  const target = row[index]!;
  if (isTextNode(node) && isTextNode(target)) {
    row[index] = target + node;
  } else {
    row.splice(index + 1, 0, node);
  }
};

const joinRows = (...rows: (readonly NodeRef[])[]): readonly NodeRef[] => {
  const row: NodeRef[] = [];
  for (let i = 0; i < rows.length; i++) {
    const current = rows[i]!;
    if (i === 0) {
      row.push(...current);
    } else {
      for (const node of current) {
        insertNodeAfter(row, row.length - 1, node);
      }
    }
  }
  return row;
};

const splitRow = (
  doc: Writeable<DomSnapshot>,
  [line, offset]: Position
): [readonly NodeRef[], readonly NodeRef[]] => {
  const row = doc[line]!;

  for (let i = 0; i < row.length; i++) {
    const node = row[i]!;
    const length = getNodeLength(node);
    if (length > offset) {
      const before = row.slice(0, i);
      const after = row.slice(i + 1);
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
  return [row, []];
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
        compareLine(end, selectionPos) === 1
          ? selectionPos[1]
          : selectionPos[1] + start[1] - end[1],
      ]
    : start;
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

  const [before, after] = splitRow(doc, pos);

  const lineLength = lines.length;
  const [line] = pos;
  const lineDiff = lineLength - 1;
  const lastRowLength = getRowLength(lines[lineLength - 1]!);

  if (lineLength === 1) {
    doc[line] = joinRows(before, lines[0]!, after);
  } else {
    const [first, ...mid] = lines;
    const last = mid.pop()!;
    doc.splice(
      line,
      1,
      joinRows(before, first!),
      ...mid,
      joinRows(last, after)
    );
  }

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

  const [startLine] = start;
  const [endLine] = end;

  doc.splice(
    startLine,
    endLine - startLine + 1,
    joinRows(splitRow(doc, start)[0], splitRow(doc, end)[1])
  );

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
    [joinRows(...doc)],
    [
      [0, offsetBeforeAnchor + anchorOffset],
      [0, offsetBeforeFocus + focusOffset],
    ],
  ];
};
