import { sliceDoc } from "./doc/edit.js";
import { toRange } from "./doc/position.js";
import type { DocBase, InferNode } from "./doc/types.js";
import { docToString } from "./doc/utils.js";
import type { Editor } from "./editor.js";

export type EditorQuery<V, A extends unknown[], T extends DocBase> = (
  this: Editor<T>,
  ...args: A
) => V;

/**
 * TODO
 */
export function SelectedText(this: Editor): string {
  return docToString(sliceDoc(this.doc, ...toRange(this.selection)));
}

/**
 * TODO
 */
export function SelectedNodes<T extends DocBase>(
  this: Editor<T>,
): InferNode<T>[] {
  return sliceDoc(this.doc, ...toRange(this.selection)).flat();
}
