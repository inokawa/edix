import { toRange } from "./doc/position.js";
import { getLineSize, Transaction } from "./doc/edit.js";
import type { Editor } from "./editor.js";
import type { DocBase } from "./doc/types.js";

export type EditorCommand<A extends unknown[], T extends DocBase> = (
  this: Editor<T>,
  ...args: A
) => void;

export function Delete(this: Editor) {
  this.apply(new Transaction().delete(...toRange(this.selection)));
}

export function InsertText(this: Editor, text: string) {
  const [start, end] = toRange(this.selection);
  this.apply(new Transaction().delete(start, end).insert(start, text));
}

export function ReplaceAll(this: Editor, text: string) {
  const doc = this.doc;
  this.apply(
    new Transaction()
      .delete([0, 0], [doc.length - 1, getLineSize(doc[doc.length - 1]!)])
      .insert([0, 0], text),
  );
}
