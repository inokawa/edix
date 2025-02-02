import type {
  DomSnapshot,
  Position,
  NodeRef,
  SelectionSnapshot,
} from "./types";
import { isBackward, isSamePosition } from "./position";

/**
 * @internal
 */
export type EditableCommand<T extends unknown[]> = (
  doc: Writeable<DomSnapshot>,
  selection: Writeable<SelectionSnapshot>,
  ...args: T
) => void;

/**
 * @internal
 */
export type Writeable<T> = T extends
  | Record<string, unknown>
  | readonly unknown[]
  ? {
      -readonly [key in keyof T]: T[key];
    }
  : T;

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

/**
 * @internal
 */
export const deleteSelection: EditableCommand<[]> = (doc, selection) => {
  const [anchor, focus] = selection;
  if (!isSamePosition(anchor, focus)) {
    const backward = isBackward(anchor, focus);
    const start = backward ? focus : anchor;
    const end = backward ? anchor : focus;
    const startLine = start[0];
    const endLine = end[0];

    doc.splice(
      startLine,
      endLine - startLine + 1,
      joinRows(splitRow(doc, start)[0], splitRow(doc, end)[1])
    );
    selection[0] = selection[1] = start;
  }
};

/**
 * @internal
 */
export const replaceSelection: EditableCommand<[lines: DomSnapshot]> = (
  doc,
  selection,
  lines
) => {
  deleteSelection(doc, selection);

  // selection was collapsed with deleteSelection command
  const pos = selection[0];
  const [before, after] = splitRow(doc, pos);

  const lineLength = lines.length;
  const [line, offset] = pos;

  if (lineLength === 1) {
    doc[line] = joinRows(before, lines[0]!, after);
    selection[0] = selection[1] = [line, offset + getRowLength(lines[0]!)];
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
    selection[0] = selection[1] = [line + lineLength - 1, getRowLength(last)];
  }
};

/**
 * @internal
 */
export const insertText: EditableCommand<[text: string]> = (
  doc,
  selection,
  text
) => {
  replaceSelection(
    doc,
    selection,
    text.split("\n").map((l) => [l])
  );
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
