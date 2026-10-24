import { getNodeSize, iterLeafBlocks } from "../doc/node.js";
import { applyOperation } from "../doc/operation.js";
import { toRange } from "../doc/position.js";
import type { InferLeafBlockNode } from "../doc/types-infer.js";
import type { BlockNode, DocNode, Range } from "../doc/types.js";
import type { Editor } from "../editor.js";

interface BlockLockContext {
  locked: (range: Range) => boolean;
}

/**
 * A plugin to make specific blocks read-only.
 *
 * Locked blocks can still be selected and copied, but operations editing them are cancelled with the transaction they belong to,
 * except ones that unlock the block.
 */
export function blockLockPlugin<T extends DocNode>(
  editor: Editor<T>,
  options: {
    /**
     * A function to check if the block is locked or not.
     */
    isLocked: (node: InferLeafBlockNode<T>) => boolean;
  },
) {
  const isLockedNode = options.isLocked as (node: BlockNode) => boolean;

  const hasLockedBlock = (range: Range): boolean => {
    for (const [block] of iterLeafBlocks(editor.doc, range)) {
      if (isLockedNode(block)) {
        return true;
      }
    }
    return false;
  };

  editor.hook("apply", (op, next) => {
    switch (op.type) {
      case "delete": {
        if (hasLockedBlock(toRange(op.range))) {
          next(null);
          return;
        }
        break;
      }
      case "insert_text":
      case "insert_node": {
        if (hasLockedBlock([op.at, op.at])) {
          next(null);
          return;
        }
        break;
      }
      case "format": {
        const doc = editor.doc;
        const range: Range =
          op.depth === 0 ? [0, getNodeSize(doc)] : toRange(op.range);
        const after = iterLeafBlocks(
          applyOperation(doc, editor.selection, op)[0],
          range,
        );
        for (const [b] of iterLeafBlocks(doc, range)) {
          const a = after.next().value?.[0];
          if (a && b !== a && isLockedNode(b) && isLockedNode(a)) {
            next(null);
            return;
          }
        }
        break;
      }
    }
    next(op);
  });

  editor.set<BlockLockContext>(blockLockPlugin, {
    locked: hasLockedBlock,
  });
}

/**
 * Check if the selection or specified range touches a locked block, which means editing operations on it will be cancelled.
 */
export function LockedInRange(
  editor: Editor,
  range: Range = toRange(editor.selection),
): boolean {
  return editor.get<BlockLockContext>(blockLockPlugin).locked(range);
}
