import type { DomSnapshot, Point, NodeRef, SelectionSnapshot } from "./types";
import { isSamePoint } from "./utils";

type Writeable<T> = T extends Record<string, unknown> | readonly unknown[]
  ? {
      -readonly [key in keyof T]: Writeable<T[key]>;
    }
  : T;

const isTextNode = (node: NodeRef) => typeof node === "string";
const getNodeLength = (node: NodeRef): number =>
  isTextNode(node) ? node.length : 1;

const normalizeRow = (row: NodeRef[]): NodeRef[] => {
  for (let i = 0; i < row.length - 1; ) {
    const current = row[i]!;
    const next = row[i + 1];
    if (isTextNode(current) && next != null && isTextNode(next)) {
      row[i] = current + next;
      row.splice(i + 1, 1);
    } else {
      i++;
    }
  }
  return row;
};

const splitRow = (
  doc: Writeable<DomSnapshot>,
  [line, offset]: Point
): [NodeRef[], NodeRef[]] => {
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

const insertLines = (
  doc: Writeable<DomSnapshot>,
  before: NodeRef[],
  after: NodeRef[],
  point: Point,
  text: string
): Point => {
  const lines = text.split("\n");
  const lineLength = lines.length;
  const [line, offset] = point;

  if (lineLength === 1) {
    doc[line] = normalizeRow([...before, text, ...after]);
    return [line, offset + text.length];
  } else {
    const mid: NodeRef[][] = [];
    const last = lines[lineLength - 1]!;
    doc[line] = normalizeRow([...before, lines[0]!]);

    for (let i = 1; i < lineLength - 1; i++) {
      mid.push([lines[i]!]);
    }
    doc.splice(line + 1, 0, ...mid);

    doc.splice(line + lineLength - 1, 0, normalizeRow([last, ...after]));

    return [line + lineLength - 1, last.length];
  }
};

/**
 * @internal
 */
export const insertText = (
  current: DomSnapshot,
  [start, end]: SelectionSnapshot,
  text: string
): [DomSnapshot, SelectionSnapshot] => {
  const next: Writeable<DomSnapshot> = current.map((row) => [...row]);

  let nextPoint: Point;
  if (isSamePoint(start, end)) {
    const [before, after] = splitRow(next, start);
    nextPoint = insertLines(next, before, after, start, text);
  } else {
    const startLine = start[0];
    const endLine = end[0];

    const [beforeStart] = splitRow(next, start);
    const [, afterEnd] = splitRow(next, end);

    nextPoint = insertLines(next, beforeStart, afterEnd, start, text);

    if (startLine !== endLine) {
      const lines = text.split("\n");
      next.splice(startLine + lines.length, endLine - startLine);
    }
  }

  return [next, [nextPoint, nextPoint, false]];
};

/**
 * @internal
 */
export const deleteText = (
  current: DomSnapshot,
  selection: SelectionSnapshot
): [DomSnapshot, SelectionSnapshot] => {
  if (isSamePoint(selection[0], selection[1])) {
    return [current, selection];
  } else {
    return insertText(current, selection, "");
  }
};

/**
 * @internal
 */
export const flatten = (
  current: DomSnapshot,
  [[startLine, startOffset], [endLine, endOffset]]: SelectionSnapshot
): [DomSnapshot, SelectionSnapshot] => {
  const row: NodeRef[] = [];
  let offsetBeforeStart = 0;
  let offsetBeforeEnd = 0;

  for (let i = 0; i < current.length; i++) {
    for (const node of current[i]!) {
      row.push(node);

      const length = getNodeLength(node);
      if (i < startLine) {
        offsetBeforeStart += length;
      }
      if (i < endLine) {
        offsetBeforeEnd += length;
      }
    }
  }

  return [
    [normalizeRow(row)],
    [
      [0, offsetBeforeStart + startOffset],
      [0, offsetBeforeEnd + endOffset],
      false,
    ],
  ];
};
