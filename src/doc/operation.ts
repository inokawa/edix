import { is, keys } from "../utils.js";
import {
  getLeafBlockAt,
  getChildAt,
  getNodeSize,
  hasBlockChildren,
  isBlockNode,
  isTextNode,
  sliceFragment,
  splitBlock,
} from "./node.js";
import type {
  DocNode,
  Fragment,
  InlineNode,
  Selection,
  Path,
  BlockNode,
  Node,
  Range,
} from "./types.js";
import { stringToFragment } from "./utils.js";

const OP_DELETE = "delete";
type DeleteOperation = Readonly<{
  type: typeof OP_DELETE;
  range: Range;
}>;

const OP_INSERT_TEXT = "insert_text";
type InsertTextOperation = Readonly<{
  type: typeof OP_INSERT_TEXT;
  at: number;
  text: string;
}>;

const OP_INSERT_NODE = "insert_node";
type InsertNodeOperation = Readonly<{
  type: typeof OP_INSERT_NODE;
  at: number;
  fragment: Fragment;
}>;

const OP_FORMAT = "format";
type FormatOperation = Readonly<{
  type: typeof OP_FORMAT;
  range: Range;
  key: string;
  value: unknown;
}>;

const OP_PATCH_NODE = "patch_node";
type PatchNodeOperation = Readonly<{
  type: typeof OP_PATCH_NODE;
  path: Path;
  key: string;
  value: unknown;
}>;

export type Operation =
  | DeleteOperation
  | InsertTextOperation
  | InsertNodeOperation
  | FormatOperation
  | PatchNodeOperation;

/**
 * @internal
 */
export const isUnsafeOperation = ({ type }: Operation): boolean =>
  type !== OP_INSERT_TEXT && type !== OP_DELETE;

const isSameNode = (a: InlineNode, b: InlineNode): boolean => {
  const aKeys = keys(a);
  if (aKeys.length !== keys(b).length) {
    return false;
  }
  return aKeys.every(
    (k) => k in b && (k === "text" || is((a as any)[k], (b as any)[k])),
  );
};

const normalizeInline = (
  array: InlineNode[],
  start: number = 0,
  end: number = array.length - 1,
): void => {
  let i = start + 1;
  while (i <= end) {
    const prev = array[i - 1]!;
    const curr = array[i]!;
    // merge text nodes with same attrs
    if (isTextNode(prev) && isTextNode(curr) && isSameNode(prev, curr)) {
      array[i - 1] = { ...prev, text: prev.text + curr.text };
      array.splice(i, 1);
      end--;
    } else {
      i++;
    }
  }

  // remove empty text nodes, leaving at least one node per block
  i = start;
  while (i <= end) {
    const node = array[i]!;
    if (isTextNode(node) && !node.text && array.length > 1) {
      array.splice(i, 1);
      end--;
    } else {
      i++;
    }
  }
};

const concat = <T extends Node>(a: readonly T[], b: readonly T[]): T[] => {
  const i = a.length - 1;
  const array = a.concat(b);
  if (i >= 0 && b.length) {
    const isBlock = isBlockNode(array[i]!);
    if (isBlock === isBlockNode(array[i + 1]!)) {
      if (isBlock) {
        array.splice(
          i,
          2,
          joinBlocks(array.slice(i, i + 2) as BlockNode[]) as T,
        );
      } else {
        normalizeInline(array as InlineNode[], i, i + 1);
      }
    }
  }
  if (!array.length) {
    array.push({ text: "" } as T);
  }
  return array;
};

/**
 * @internal
 */
export const joinBlocks = <T extends BlockNode>(blocks: readonly T[]): T => {
  return {
    ...blocks[0]!,
    children: blocks.reduce<Node[]>((acc, b) => concat(acc, b.children), []),
  };
};

const getNodeAtPath = (
  node: DocNode | BlockNode,
  path: Path,
): BlockNode | DocNode => {
  for (let i = 0; i < path.length; i++) {
    node = node.children[path[i]!]! as BlockNode; // TODO improve
  }
  return node;
};

const replaceNodeAt = <T extends DocNode | BlockNode>(
  node: T,
  path: Path,
  afterNode: Node,
  i: number = 0,
): T => {
  if (i < path.length) {
    const index = path[i]!;
    const children = node.children;
    const sliced = children.slice();
    sliced.splice(
      index,
      1,
      replaceNodeAt(children[index]! as T, path, afterNode, i + 1),
    );
    return { ...node, children: sliced };
  }
  // TODO improve type
  return afterNode as T;
};

const replaceRange = <T extends DocNode>(
  doc: T,
  start: number,
  end: number,
  inserted: Fragment,
): T => {
  const [before, maybeAfter] = splitBlock(doc, start);
  const after = start < end ? splitBlock(doc, end)[1] : maybeAfter;

  const isBlock = hasBlockChildren(inserted);
  if (isBlock !== hasBlockChildren(doc.children)) {
    inserted = isBlock
      ? joinBlocks(inserted as BlockNode[]).children
      : [{ children: inserted }];
  }
  return {
    ...doc,
    children: concat(concat(before.children, inserted), after.children),
  };
};

const isValidPosition = (doc: DocNode, offset: number): boolean => {
  return offset >= 0 && offset <= getNodeSize(doc);
};

/**
 * @internal
 */
export const mapPositionWithOps = (
  position: number,
  ops: readonly Operation[],
): number => {
  return ops.reduce((acc, op) => mapPosition(acc, op), position);
};

/**
 * Remap a position through the given operation.
 * @param stickBefore `true` to keep the position in place when content is inserted at it, instead of moving it after the inserted content.
 */
export const mapPosition = (
  position: number,
  op: Operation,
  stickBefore?: boolean,
): number => {
  switch (op.type) {
    case OP_DELETE: {
      const [start, end] = op.range;

      if (position >= start) {
        // start <= position
        if (end >= position) {
          // start <= position <= end
          return start;
        }
        // start <= end < position
        return position + start - end;
      }
      break;
    }
    case OP_INSERT_TEXT: {
      const { at, text } = op;

      if (stickBefore ? position > at : position >= at) {
        // at <= position
        return position + text.length;
      }
      break;
    }
    case OP_INSERT_NODE: {
      const { at, fragment } = op;

      if (stickBefore ? position > at : position >= at) {
        // at <= position
        return position + getNodeSize({ children: fragment });
      }
      break;
    }
  }
  return position;
};

const rebaseSelection = (
  [anchor, focus]: Selection,
  op: Operation,
): Selection => {
  return [mapPosition(anchor, op), mapPosition(focus, op)];
};

/**
 * @internal
 */
export const isValidSelection = (
  doc: DocNode,
  [anchor, focus]: Selection,
): boolean => {
  return isValidPosition(doc, anchor) && isValidPosition(doc, focus);
};

/**
 * @internal
 */
export const applyOperation = <T extends DocNode>(
  doc: T,
  selection: Selection,
  op: Operation,
): [T, Selection] => {
  switch (op.type) {
    case OP_DELETE: {
      const [start, end] = op.range;
      if (isValidSelection(doc, op.range) && start < end) {
        doc = replaceRange(doc, start, end, []);
        selection = rebaseSelection(selection, op);
      }
      break;
    }
    case OP_INSERT_TEXT: {
      const { at, text } = op;
      if (isValidPosition(doc, at) && text) {
        // inherit style from previous block/text node
        const [block, offset] = getLeafBlockAt(doc, at);
        const res = getChildAt(block, offset, true);
        doc = replaceRange(
          doc,
          at,
          at,
          stringToFragment(
            text,
            res && isTextNode(res[0]) ? res[0] : undefined,
            block,
          ),
        );
        selection = rebaseSelection(selection, op);
      }
      break;
    }
    case OP_INSERT_NODE: {
      const { at, fragment } = op;
      if (isValidPosition(doc, at) && fragment.length) {
        doc = replaceRange(doc, at, at, fragment);
        selection = rebaseSelection(selection, op);
      }
      break;
    }
    case OP_FORMAT: {
      const {
        range: [start, end],
        key,
        value,
      } = op;
      if (
        isValidPosition(doc, start) &&
        isValidPosition(doc, end) &&
        start <= end
      ) {
        if (start === end) {
          const [{ children }, , path] = getLeafBlockAt(doc, start);
          if (children.length === 1) {
            const maybeText = children[0]!;
            if (isTextNode(maybeText) && !maybeText.text) {
              doc = replaceNodeAt(
                doc,
                [...path, 0], // TODO imporve
                { ...maybeText, [key]: value },
              );
            }
          }
        } else {
          const mapNode = <T extends Node>(node: T): T => {
            if (isBlockNode(node)) {
              return {
                ...node,
                children: node.children.map(mapNode),
              };
            } else if (isTextNode(node)) {
              return { ...node, [key]: value };
            }
            return node;
          };

          doc = replaceRange(
            doc,
            start,
            end,
            sliceFragment(doc, start, end).map(mapNode),
          );
        }
      }
      break;
    }
    case OP_PATCH_NODE: {
      const { path, key, value } = op;
      const node = getNodeAtPath(doc, path);
      if (node) {
        doc = replaceNodeAt(doc, path, { ...node, [key]: value });
      }
      break;
    }
    default: {
      op satisfies never;
    }
  }

  return [doc, selection];
};
