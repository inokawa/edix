import { iterLeafBlocks } from "../doc/node.js";
import { applyOperation } from "../doc/operation.js";
import { toRange } from "../doc/position.js";
import type { InferLeafBlockNode } from "../doc/types-infer.js";
import type { BlockNode, DocNode, Range } from "../doc/types.js";
import type { Editor } from "../editor.js";
import { microtask } from "../utils.js";

interface BlockLockContext {
  locked: (range: Range) => boolean;
}

/**
 * A plugin to make specific blocks read-only.
 *
 * Locked blocks can still be selected and copied, but operations editing them are cancelled,
 * except ones that unlock the block and ones targeting the root (e.g. undo / redo).
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

  let suppressInsert = false;

  editor.hook("apply", (op, next) => {
    const wasSuppressed = suppressInsert;
    suppressInsert = false;

    switch (op.type) {
      case "delete": {
        if (hasLockedBlock(toRange(op.range))) {
          // also cancel an insert paired with this delete (e.g. input and paste dispatch [delete, insert])
          suppressInsert = true;
          microtask(() => {
            suppressInsert = false;
          });
          return next(null);
        }
        break;
      }
      case "insert_text":
      case "insert_node": {
        if (wasSuppressed || hasLockedBlock([op.at, op.at])) {
          return next(null);
        }
        break;
      }
      case "format": {
        if (op.depth === 0) {
          // undo and redo replace the root
          break;
        }
        const doc = editor.doc;
        const range = toRange(op.range);
        const after = iterLeafBlocks(
          applyOperation(doc, editor.selection, op)[0],
          range,
        );
        for (const [b] of iterLeafBlocks(doc, range)) {
          const a = after.next().value?.[0];
          if (a && b !== a && isLockedNode(b) && isLockedNode(a)) {
            return next(null);
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
