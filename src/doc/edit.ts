import { compareLine, comparePosition } from "./position.js";
import type {
  DocFragment,
  DocLine,
  DocNode,
  Position,
  SelectionSnapshot,
} from "./types.js";
import { docToString, stringToDoc } from "./utils.js";

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
  _fragment: DocFragment;
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

  insertFragment(start: Position, fragment: DocFragment): this {
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

const splice = <T>(
  doc: readonly T[],
  start: number,
  deleteCount: number,
  lines: T[],
): readonly T[] => {
  const newDoc = doc.slice();
  newDoc.splice(start, deleteCount, ...lines);
  return newDoc;
};

/**
 * @internal
 */
export const isDocEqual = (docA: DocFragment, docB: DocFragment): boolean =>
  // TODO improve
  docA.length === docB.length && docA.every((l, i) => l === docB[i]);

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

/**
 * @internal
 */
export const merge = (a: DocLine, b: DocLine): DocLine => {
  const result: DocNode[] = [...a];
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

const replaceRange = (
  doc: DocFragment,
  fragment: DocFragment,
  start: Position,
  end?: Position,
): DocFragment => {
  const [startLine] = start;
  const [endLine] = end || start;

  const splitByStart = split(doc[start[0]]!, start[1]);
  const before = splitByStart[0];
  const after = end ? split(doc[end[0]]!, end[1])[1] : splitByStart[1];

  const lines = [...fragment];
  if (lines.length) {
    lines[0] = merge(before, lines[0]!);
    lines[lines.length - 1] = merge(lines[lines.length - 1]!, after);
  } else {
    lines.push(merge(before, after));
  }

  return splice(doc, startLine, endLine - startLine + 1, lines);
};

/**
 * @internal
 */
export const sliceDoc = (
  doc: DocFragment,
  start: Position,
  end: Position,
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

const isValidOperation = (op: Operation): boolean => {
  switch (op._type) {
    case TYPE_DELETE: {
      return comparePosition(op._start, op._end) === 1;
    }
    case TYPE_INSERT_TEXT: {
      // TODO optimize later
      return !!op._text;
    }
    case TYPE_INSERT_NODE: {
      // TODO optimize later
      return !!docToString(op._fragment);
    }
  }
  return true;
};

const updateDoc = (doc: DocFragment, op: EditOperation): DocFragment => {
  switch (op._type) {
    case TYPE_DELETE: {
      return replaceRange(doc, [], op._start, op._end);
    }
    case TYPE_INSERT_TEXT: {
      return replaceRange(doc, stringToDoc(op._text), op._pos);
    }
    case TYPE_INSERT_NODE: {
      return replaceRange(doc, op._fragment, op._pos);
    }
    default: {
      return op satisfies never;
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
        op._type === TYPE_INSERT_TEXT ? stringToDoc(op._text) : op._fragment;

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
export const applyTransaction = (
  doc: DocFragment,
  selection: SelectionSnapshot,
  tr: Transaction,
  onError?: (message: string) => void,
): [DocFragment, SelectionSnapshot] | undefined => {
  try {
    for (const op of tr.ops) {
      if (isValidOperation(op)) {
        if (isEditOperation(op)) {
          doc = updateDoc(doc, op);
          selection = [
            rebasePosition(selection[0], op),
            rebasePosition(selection[1], op),
          ];
        } else {
          if (op._anchor || op._focus) {
            selection = [op._anchor || selection[0], op._focus || selection[1]];
          }
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
