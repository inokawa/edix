import {
  getLeafAt,
  getLeafBlockAt,
  getNodeSize,
  iterLeafBlocks,
  iterLeaves,
} from "./doc/node.js";
import { isCovered, isCollapsed, toRange } from "./doc/position.js";
import type { InferInlineNode, InferLeafBlockNode } from "./doc/types-infer.js";
import type { DocNode, Range } from "./doc/types.js";
import type { Editor } from "./editor.js";

/**
 * Get leaf nodes that intersect with the selection or specified range. An empty leaf is included wherever the range reaches it.
 */
export function* LeavesInRange<T extends DocNode>(
  editor: Editor<T>,
  range: Range = toRange(editor.selection),
): Generator<InferInlineNode<T>, void, void> {
  if (isCollapsed(range)) {
    const n = getLeafAt(editor.doc, range[0])?.[0];
    if (n) {
      yield n;
    }
  } else {
    for (const [n, , r] of iterLeaves(editor.doc, range)) {
      if (isCovered(r, getNodeSize(n))) {
        yield n;
      }
    }
  }
}

/**
 * Get leaf block nodes that intersect with the selection or specified range, with their offsets. An empty block is included wherever the range reaches it.
 */
export function* BlocksInRange<T extends DocNode>(
  editor: Editor<T>,
  range: Range = toRange(editor.selection),
): Generator<
  [node: InferLeafBlockNode<T>, offset: number, range: Range],
  void,
  void
> {
  const doc = editor.doc;
  if (isCollapsed(range)) {
    const [node, inBlock] = getLeafBlockAt(doc, range[0]);
    yield [node, range[0] - inBlock, [inBlock, inBlock]];
  } else {
    for (const r of iterLeafBlocks(doc, range)) {
      if (isCovered(r[2], getNodeSize(r[0]))) {
        yield r;
      }
    }
  }
}
