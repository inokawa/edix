import {
  getLeafBlockAt,
  getNodeSize,
  isBlockNode,
  iterLeafBlocks,
} from "../doc/node.js";
import { isCollapsed, toRange } from "../doc/position.js";
import type { InferLeafBlockNode } from "../doc/types-infer.js";
import type { BlockNode, DocNode, Node, Range } from "../doc/types.js";
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

  const isLockedAt = (offset: number): boolean => {
    return isLockedNode(getLeafBlockAt(editor.doc, offset)[0]);
  };

  const hasLockedBlock = (range: Range, includesEdge: boolean): boolean => {
    const [start, end] = range;
    for (const [block, offset] of iterLeafBlocks(editor.doc, range)) {
      const blockEnd = offset + getNodeSize(block);
      if (
        (includesEdge
          ? end >= offset && start <= blockEnd
          : end > offset && start < blockEnd) &&
        isLockedNode(block)
      ) {
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
        if (hasLockedBlock(toRange(op.range), true)) {
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
        if (wasSuppressed || isLockedAt(op.at)) {
          return next(null);
        }
        break;
      }
      case "format": {
        const range = toRange(op.range);
        if (
          isCollapsed(range)
            ? isLockedAt(range[0])
            : hasLockedBlock(range, false)
        ) {
          return next(null);
        }
        break;
      }
      case "patch_node": {
        const path = op.path;
        let node: Node = editor.doc;
        for (let i = 0; i < path.length; i++) {
          const child: Node | undefined = (node as BlockNode).children?.[
            path[i]!
          ];
          if (!child) {
            break;
          }
          node = child;
          if (i < path.length - 1 && isBlockNode(node) && isLockedNode(node)) {
            return next(null);
          }
        }
        if (node !== editor.doc && isBlockNode(node) && isLockedNode(node)) {
          // allow only patches that unlock the block
          if (isLockedNode({ ...node, [op.key]: op.value })) {
            return next(null);
          }
        }
        break;
      }
    }
    next(op);
  });

  editor.set<BlockLockContext>(blockLockPlugin, {
    locked: (range) =>
      isCollapsed(range) ? isLockedAt(range[0]) : hasLockedBlock(range, true),
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
