import type {
  DomSnapshot,
  Position,
  NodeRef,
  SelectionSnapshot,
} from "./types";
import { isBackward, isSamePosition } from "./position";

type Writeable<T> = T extends Record<string, unknown> | readonly unknown[]
  ? {
      -readonly [key in keyof T]: Writeable<T[key]>;
    }
  : T;

const isTextNode = (node: NodeRef) => typeof node === "string";
const getNodeLength = (node: NodeRef): number =>
  isTextNode(node) ? node.length : 1;
const getRowLength = (nodes: readonly NodeRef[]): number =>
  nodes.reduce((acc, n) => acc + getNodeLength(n), 0);

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
  [line, offset]: Position
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
  pos: Position,
  lines: DomSnapshot
): Position => {
  const lineLength = lines.length;
  const [line, offset] = pos;

  if (lineLength === 1) {
    doc[line] = normalizeRow([...before, ...lines[0]!, ...after]);
    return [line, offset + getRowLength(lines[0]!)];
  } else {
    const mid: NodeRef[][] = [];
    const last = lines[lineLength - 1]!;
    doc[line] = normalizeRow([...before, ...lines[0]!]);

    for (let i = 1; i < lineLength - 1; i++) {
      mid.push([...lines[i]!]);
    }
    doc.splice(line + 1, 0, ...mid);

    doc.splice(line + lineLength - 1, 0, normalizeRow([...last, ...after]));

    return [line + lineLength - 1, getRowLength(last)];
  }
};

/**
 * @internal
 */
export type EditableCommand<T extends unknown[]> = (
  current: DomSnapshot,
  selection: SelectionSnapshot,
  ...args: T
) => readonly [DomSnapshot, SelectionSnapshot];

/**
 * @internal
 */
export const insertDom: EditableCommand<[DomSnapshot]> = (
  current,
  [anchor, focus],
  lines
) => {
  const next: Writeable<DomSnapshot> = current.map((row) => [...row]);

  let nextPos: Position;
  if (isSamePosition(anchor, focus)) {
    const [before, after] = splitRow(next, anchor);
    nextPos = insertLines(next, before, after, anchor, lines);
  } else {
    const backward = isBackward(anchor, focus);
    const start = backward ? focus : anchor;
    const end = backward ? anchor : focus;
    const startLine = start[0];
    const endLine = end[0];

    const [beforeStart] = splitRow(next, start);
    const [, afterEnd] = splitRow(next, end);

    nextPos = insertLines(next, beforeStart, afterEnd, start, lines);

    if (startLine !== endLine) {
      next.splice(startLine + lines.length, endLine - startLine);
    }
  }

  return [next, [nextPos, nextPos]];
};

/**
 * @internal
 */
export const insertText: EditableCommand<[string]> = (
  current,
  selection,
  text
) => {
  return insertDom(
    current,
    selection,
    text.split("\n").map((l) => [l])
  );
};

/**
 * @internal
 */
export const deleteText: EditableCommand<[]> = (current, selection) => {
  if (isSamePosition(selection[0], selection[1])) {
    return [current, selection];
  } else {
    return insertText(current, selection, "");
  }
};

/**
 * @internal
 */
export const flatten: EditableCommand<[]> = (
  current,
  [[anchorLine, anchorOffset], [focusLine, focusOffset]]
) => {
  const row: NodeRef[] = [];
  let offsetBeforeAnchor = 0;
  let offsetBeforeFocus = 0;

  for (let i = 0; i < current.length; i++) {
    for (const node of current[i]!) {
      row.push(node);

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
    [normalizeRow(row)],
    [
      [0, offsetBeforeAnchor + anchorOffset],
      [0, offsetBeforeFocus + focusOffset],
    ],
  ];
};
