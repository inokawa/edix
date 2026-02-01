import { is, isString, keys } from "../utils.js";
import { compareLine, comparePosition } from "./position.js";
import type {
  DocBase,
  Fragment,
  DocNode,
  Position,
  SelectionSnapshot,
  TextNode,
} from "./types.js";
import { docToString, stringToFragment } from "./utils.js";

const TYPE_DELETE = 1;
type DeleteOperation = Readonly<{
  _type: typeof TYPE_DELETE;
  _start: Position;
  _end: Position;
}>;

const TYPE_INSERT_TEXT = 2;
type InsertOperation = Readonly<{
  _type: typeof TYPE_INSERT_TEXT;
  _pos: Position;
  _text: string;
}>;

const TYPE_INSERT_NODE = 3;
type InsertNodeOperation = Readonly<{
  _type: typeof TYPE_INSERT_NODE;
  _pos: Position;
  _fragment: Fragment;
}>;

const TYPE_SELECT = 4;
type SelectOperataion = Readonly<{
  _type: typeof TYPE_SELECT;
  _anchor: Position | undefined;
  _focus: Position | undefined;
}>;
type EditOperation = DeleteOperation | InsertOperation | InsertNodeOperation;
export type Operation = EditOperation | SelectOperataion;

const isEditOperation = (op: Operation) => op._type !== TYPE_SELECT;

export class Transaction {
  private readonly _ops: Operation[];

  constructor(ops?: readonly Operation[]) {
    this._ops = ops ? ops.slice() : [];
  }

  get ops(): readonly Operation[] {
    return this._ops;
  }

  insert(start: Position, text: string): this {
    this._ops.push({
      _type: TYPE_INSERT_TEXT,
      _pos: start,
      _text: text,
    });
    return this;
  }

  insertFragment(start: Position, fragment: Fragment): this {
    this._ops.push({
      _type: TYPE_INSERT_NODE,
      _pos: start,
      _fragment: fragment,
    });
    return this;
  }

  delete(start: Position, end: Position): this {
    this._ops.push({
      _type: TYPE_DELETE,
      _start: start,
      _end: end,
    });
    return this;
  }

  select(anchor?: Position, focus?: Position): this {
    this._ops.push({
      _type: TYPE_SELECT,
      _anchor: anchor,
      _focus: focus,
    });
    return this;
  }

  transform(position: Position): Position {
    return this._ops.reduce(
      (acc, op) => (isEditOperation(op) ? rebasePosition(acc, op) : acc),
      position,
    );
  }
}

/**
 * @internal
 */
export const isDocEqual = (docA: DocBase, docB: DocBase): boolean =>
  // TODO improve
  docA.length === docB.length && docA.every((l, i) => l === docB[i]);

/**
 * @internal
 */
export const isTextNode = (node: DocNode): node is TextNode => "text" in node;

const isSameNode = (a: DocNode, b: DocNode): boolean => {
  const aKeys = keys(a);
  if (aKeys.length !== keys(b).length) {
    return false;
  }
  return aKeys.every((k) => {
    if (!(k in b)) {
      return false;
    }
    return k === "text" || is((a as any)[k], (b as any)[k]);
  });
};

const getNodeSize = (node: DocNode): number =>
  isTextNode(node) ? node.text.length : 1;

/**
 * @internal
 */
export const getLineSize = (line: readonly DocNode[]): number =>
  line.reduce((acc: number, n) => acc + getNodeSize(n), 0);

const normalize = <T extends DocNode>(
  array: T[],
  start: number = 0,
  end: number = array.length - 1,
): void => {
  let i = start + 1;
  while (i <= end) {
    const prev = array[i - 1]!;
    const curr = array[i]!;
    if (isTextNode(prev) && isTextNode(curr) && isSameNode(prev, curr)) {
      array[i - 1] = { ...prev, text: prev.text + curr.text };
      array.splice(i, 1);
      end--;
    } else {
      i++;
    }
  }
};

/**
 * @internal
 */
export const concat = <T extends DocNode>(a: T[], b: readonly T[]): void => {
  if (b.length) {
    const prevLength = a.length;
    a.push(...b);
    if (prevLength) {
      normalize(a, prevLength - 1, prevLength);
    }
  }
};

const copyArray = <T extends DocNode>(
  ...arrays: (readonly T[])[]
): readonly T[] => {
  const result: T[] = [];
  arrays.forEach((a) => {
    concat(result, a);
  });
  return result;
};

const split = <T extends DocNode>(
  nodes: readonly T[],
  offset: number,
): [readonly T[], readonly T[]] => {
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]!;
    const size = getNodeSize(node);
    if (size > offset) {
      const before = nodes.slice(0, i);
      const after = nodes.slice(i + 1);
      if (isTextNode(node)) {
        const beforeText = node.text.slice(0, offset);
        const afterText = node.text.slice(offset);
        if (beforeText) {
          before.push({ ...node, text: beforeText });
        }
        if (afterText) {
          after.unshift({ ...node, text: afterText });
        }
      } else {
        // node size must be 1
        after.unshift(node);
      }
      return [before, after];
    }
    offset -= size;
  }
  return [nodes, []];
};

const replaceRange = <T extends DocBase>(
  doc: T,
  inserted: Fragment | string,
  start: Position,
  end?: Position,
): T => {
  const [startLine] = start;
  const [endLine] = end || start;

  const [before, docEnd] = split(doc[start[0]]!, start[1]);
  const after = end ? split(doc[end[0]]!, end[1])[1] : docEnd;

  if (isString(inserted)) {
    // inherit style from previous text node
    const beforeLength = before.length;
    let anchorNode: TextNode | undefined;
    if (beforeLength) {
      const maybeAnchor = before[beforeLength - 1]!;
      if (isTextNode(maybeAnchor)) {
        anchorNode = maybeAnchor;
      }
    }
    inserted = stringToFragment(inserted, anchorNode);
  }

  let lines: (readonly DocNode[])[];
  if (inserted.length) {
    lines = [...inserted];
    lines[0] = copyArray(before, lines[0]!);
    lines[lines.length - 1] = copyArray(lines[lines.length - 1]!, after);
  } else {
    lines = [copyArray(before, after)];
  }

  const newDoc = doc.slice();
  newDoc.splice(startLine, endLine - startLine + 1, ...lines);
  return newDoc as DocBase as T; // TODO improve
};

/**
 * @internal
 */
export const sliceDoc = (
  doc: DocBase,
  start: Position,
  end: Position,
): Fragment => {
  if (compareLine(start, end) === 0) {
    return [split(split(doc[start[0]]!, end[1])[0], start[1])[1]];
  }
  return [
    split(doc[start[0]]!, start[1])[1],
    ...doc.slice(start[0] + 1, end[0]),
    split(doc[end[0]]!, end[1])[0],
  ];
};

const isValidPosition = (doc: DocBase, [line, offset]: Position): boolean => {
  if (line >= 0 && line < doc.length) {
    if (offset >= 0 && offset <= getLineSize(doc[line]!)) {
      return true;
    }
  }
  return false;
};

const isValidOperation = (doc: DocBase, op: Operation): boolean => {
  switch (op._type) {
    case TYPE_DELETE: {
      const { _start: start, _end: end } = op;
      return (
        isValidPosition(doc, start) &&
        isValidPosition(doc, end) &&
        comparePosition(start, end) === 1
      );
    }
    case TYPE_INSERT_TEXT: {
      return (
        isValidPosition(doc, op._pos) &&
        // TODO optimize later
        !!op._text
      );
    }
    case TYPE_INSERT_NODE: {
      return (
        isValidPosition(doc, op._pos) &&
        // TODO optimize later
        !!docToString(op._fragment)
      );
    }
    case TYPE_SELECT: {
      return (
        (!op._anchor || isValidPosition(doc, op._anchor)) &&
        (!op._focus || isValidPosition(doc, op._focus))
      );
    }
  }
};

const rebasePosition = (position: Position, op: EditOperation): Position => {
  switch (op._type) {
    case TYPE_DELETE: {
      const { _start: start, _end: end } = op;

      if (comparePosition(position, start) !== 1) {
        // start <= position
        return comparePosition(end, position) === 1
          ? // start <= end < position
            [
              position[0] + start[0] - end[0],
              position[1] +
                (compareLine(end, position) === 0 ? start[1] - end[1] : 0),
            ]
          : // start <= position <= end
            start;
      }
      break;
    }
    case TYPE_INSERT_TEXT:
    case TYPE_INSERT_NODE: {
      const pos = op._pos;
      const lines =
        op._type === TYPE_INSERT_TEXT
          ? stringToFragment(op._text)
          : op._fragment;

      const lineLength = lines.length;
      const lineDiff = lineLength - 1;

      if (comparePosition(position, pos) !== 1) {
        // pos <= position
        return [
          position[0] + lineDiff,
          position[1] +
            (compareLine(position, pos) === 0
              ? getLineSize(lines[lineLength - 1]!) -
                (lineDiff === 0 ? 0 : pos[1])
              : 0),
        ];
      }
      break;
    }
    default: {
      op satisfies never;
    }
  }
  return position;
};

/**
 * @internal
 */
export const applyTransaction = <T extends DocBase>(
  doc: T,
  selection: SelectionSnapshot,
  tr: Transaction,
  onError?: (message: string) => void,
): [T, SelectionSnapshot] | undefined => {
  try {
    for (const op of tr.ops) {
      if (isValidOperation(doc, op)) {
        switch (op._type) {
          case TYPE_DELETE: {
            doc = replaceRange(doc, [], op._start, op._end);
            break;
          }
          case TYPE_INSERT_TEXT: {
            doc = replaceRange(doc, op._text, op._pos);
            break;
          }
          case TYPE_INSERT_NODE: {
            doc = replaceRange(doc, op._fragment, op._pos);
            break;
          }
          case TYPE_SELECT: {
            if (op._anchor || op._focus) {
              selection = [
                op._anchor || selection[0],
                op._focus || selection[1],
              ];
            }
            break;
          }
          default: {
            op satisfies never;
          }
        }
        if (isEditOperation(op)) {
          selection = [
            rebasePosition(selection[0], op),
            rebasePosition(selection[1], op),
          ];
        }
      }
    }
    return [doc, selection];
  } catch (e) {
    // rollback
    if (onError) {
      onError("rollback transaction: " + e);
    }

    return;
  }
};
