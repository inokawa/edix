import { comparePosition } from "./position";
import {
  DomSnapshot,
  NodeRef,
  Position,
  SelectionSnapshot,
  Writeable,
} from "./types";

const isTextNode = (node: NodeRef) => typeof node === "string";
const getNodeLength = (node: NodeRef): number =>
  isTextNode(node) ? node.length : 1;
/**
 * @internal
 */
export const getRowLength = (nodes: readonly NodeRef[]): number =>
  nodes.reduce((acc, n) => acc + getNodeLength(n), 0);

/**
 * @internal
 */
export const calcPositionDiff = (
  pos1: Position,
  pos2: Position,
  doc: DomSnapshot
): number => {
  const isBackward = comparePosition(pos1, pos2) === -1;
  const [startLine, startOffset] = isBackward ? pos2 : pos1;
  const [endLine, endOffset] = isBackward ? pos1 : pos2;
  let offset = 0;
  if (endLine - startLine === 0) {
    offset = endOffset - startOffset;
  } else {
    for (let i = startLine; i <= endLine; i++) {
      let offsetAtLine = 0;
      for (const node of doc[i]!) {
        const length = getNodeLength(node);
        if (
          (i === startLine && offsetAtLine + length >= startOffset) ||
          (i === endLine && offsetAtLine + length <= endOffset)
        ) {
          // skip
        } else {
          offsetAtLine += length;
        }
      }
      offset += offsetAtLine;
    }
  }
  return isBackward ? -offset : offset;
};

/**
 * @internal
 */
export const movePosition = (
  doc: DomSnapshot,
  [line, offset]: Position,
  dist: number
): Position => {
  while (dist !== 0) {
    if (dist > 0) {
      const rowLength = getRowLength(doc[line]!) - offset;
      if (dist <= rowLength) {
        offset += dist;
        dist = 0;
      } else {
        dist -= rowLength;
        offset = 0;
        line++;
      }
    } else {
      if (offset + dist >= 0) {
        offset += dist;
        dist = 0;
      } else {
        dist += offset;
        offset = getRowLength(doc[line]!);
        line--;
      }
    }
  }

  return [line, offset];
};

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

/**
 * @internal
 */
export const insertAt = (
  doc: Writeable<DomSnapshot>,
  lines: DomSnapshot,
  pos: Position
) => {
  const [before, after] = splitRow(doc, pos);

  const lineLength = lines.length;
  const [line] = pos;

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
};

/**
 * @internal
 */
export const deleteAt = (
  doc: Writeable<DomSnapshot>,
  start: Position,
  end: Position
) => {
  const startLine = start[0];
  const endLine = end[0];
  doc.splice(
    startLine,
    endLine - startLine + 1,
    joinRows(splitRow(doc, start)[0], splitRow(doc, end)[1])
  );
};

/**
 * @internal
 */
export const moveTo = (
  selection: Writeable<SelectionSnapshot>,
  pos: Position
) => {
  selection[0] = selection[1] = pos;
};

/**
 * @internal
 */
export const flatten = (
  doc: DomSnapshot,
  [anchor, focus]: SelectionSnapshot
): [DomSnapshot, SelectionSnapshot] => {
  const origin: Position = [0, 0];

  return [
    [joinRows(...doc)],
    [
      [0, calcPositionDiff(origin, anchor, doc)],
      [0, calcPositionDiff(origin, focus, doc)],
    ],
  ];
};
