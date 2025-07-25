import { compareLine, comparePosition } from "./position";
import {
  DocFragment,
  DocLine,
  DocNode,
  Position,
  SelectionSnapshot,
  Writeable,
} from "./types";

const TYPE_DELETE = 1;
type DeleteOperation = Readonly<{
  _type: typeof TYPE_DELETE;
  _start: Position;
  _end: Position;
}>;

const TYPE_INSERT = 2;
type InsertOperation = Readonly<{
  _type: typeof TYPE_INSERT;
  _pos: Position;
  _fragment: DocFragment;
}>;

const TYPE_SELECT = 3;
type SelectOperataion = Readonly<{
  _type: typeof TYPE_SELECT;
  _anchor: Position | undefined;
  _focus: Position | undefined;
}>;
type EditOperation = DeleteOperation | InsertOperation;
export type Operation = EditOperation | SelectOperataion;

const isEditOperation = (op: Operation) => op._type !== TYPE_SELECT;

export class Transaction extends Array<Operation> {
  static from(tr: Transaction | Array<Operation>): Transaction {
    return new Transaction(...tr);
  }

  insert(start: Position, fragment: DocFragment): this {
    this.push({
      _type: TYPE_INSERT,
      _pos: start,
      _fragment: fragment,
    });
    return this;
  }

  delete(start: Position, end: Position): this {
    this.push({
      _type: TYPE_DELETE,
      _start: start,
      _end: end,
    });
    return this;
  }

  select(anchor?: Position, focus?: Position): this {
    this.push({
      _type: TYPE_SELECT,
      _anchor: anchor,
      _focus: focus,
    });
    return this;
  }

  rebasePos(position: Position): Position {
    return this.reduce(
      (acc, op) => (isEditOperation(op) ? rebasePosition(acc, op) : acc),
      position
    );
  }
}

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

const isValidOperation = (op: Operation): boolean => {
  switch (op._type) {
    case TYPE_DELETE: {
      return comparePosition(op._start, op._end) === 1;
    }
  }
  return true;
};

const updateDoc = (doc: Writeable<DocFragment>, op: EditOperation): void => {
  switch (op._type) {
    case TYPE_DELETE: {
      replaceRange(doc, [], op._start, op._end);
      break;
    }
    case TYPE_INSERT: {
      replaceRange(doc, op._fragment, op._pos);
      break;
    }
    default: {
      op satisfies never;
    }
  }
};

const rebasePosition = (position: Position, op: EditOperation): Position => {
  switch (op._type) {
    case TYPE_DELETE: {
      const { _start: start, _end: end } = op;

      if (comparePosition(position, start) !== 1) {
        return comparePosition(end, position) === 1
          ? [
              position[0] + start[0] - end[0],
              position[1] +
                (compareLine(end, position) === 0 ? start[1] - end[1] : 0),
            ]
          : start;
      }
      break;
    }
    case TYPE_INSERT: {
      const { _pos: pos, _fragment: lines } = op;

      const lineLength = lines.length;
      const lineDiff = lineLength - 1;

      if (comparePosition(position, pos) !== 1) {
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
  doc: Writeable<DocFragment>,
  selection: Writeable<SelectionSnapshot>,
  tr: Transaction
): void => {
  const docSnapshot: DocFragment = [...doc];
  const selectionSnapshot: SelectionSnapshot = [...selection];

  try {
    for (const op of tr) {
      if (isValidOperation(op)) {
        if (isEditOperation(op)) {
          updateDoc(doc, op);
          selection[0] = rebasePosition(selection[0], op);
          selection[1] = rebasePosition(selection[1], op);
        } else {
          if (op._anchor) {
            selection[0] = op._anchor;
          }
          if (op._focus) {
            selection[1] = op._focus;
          }
        }
      }
    }
  } catch (e) {
    // rollback
    console.error("rollback transaction:", e);

    doc.length = 0;
    doc.push(...docSnapshot);
    selection[0] = selectionSnapshot[0];
    selection[1] = selectionSnapshot[1];
  }
};
