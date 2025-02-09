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

const INSERT_EDIT = 1;
type InsertEdit = readonly [
  type: typeof INSERT_EDIT,
  payload: readonly [pos: Position, node: DomSnapshot]
];

const DELETE_EDIT = 2;
type DeleteEdit = readonly [
  type: typeof DELETE_EDIT,
  payload: readonly [start: Position, end: Position]
];

const MOVE_EDIT = 3;
type MoveEdit = readonly [
  type: typeof MOVE_EDIT,
  payload: readonly [anchor: Position, focus?: Position]
];

/**
 * @internal
 */
export type Edit = InsertEdit | DeleteEdit | MoveEdit;

/**
 * @internal
 */
export const insertEdit = (pos: Position, node: DomSnapshot): InsertEdit => [
  INSERT_EDIT,
  [pos, node],
];

/**
 * @internal
 */
export const deleteEdit = (start: Position, end: Position): DeleteEdit => [
  DELETE_EDIT,
  [start, end],
];

/**
 * @internal
 */
export const moveEdit = (anchor: Position, focus?: Position): MoveEdit => [
  MOVE_EDIT,
  [anchor, focus],
];

/**
 * @internal
 */
export const applyEdit = (
  doc: Writeable<DomSnapshot>,
  selection: Writeable<SelectionSnapshot>,
  [type, payload]: Edit
) => {
  switch (type) {
    case INSERT_EDIT: {
      const [pos, lines] = payload;

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
      break;
    }
    case DELETE_EDIT: {
      const [start, end] = payload;

      const startLine = start[0];
      const endLine = end[0];
      doc.splice(
        startLine,
        endLine - startLine + 1,
        joinRows(splitRow(doc, start)[0], splitRow(doc, end)[1])
      );
      break;
    }
    case MOVE_EDIT: {
      selection[0] = payload[0];
      selection[1] = payload[1] || payload[0];
      break;
    }
  }
};

/**
 * @internal
 */
export const flatten = (
  doc: DomSnapshot,
  [[anchorLine, anchorOffset], [focusLine, focusOffset]]: SelectionSnapshot
): [Writeable<DomSnapshot>, Writeable<SelectionSnapshot>] => {
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
