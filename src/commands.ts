import { toRange } from "./doc/position.js";
import { getLineSize, Transaction } from "./doc/edit.js";
import type { Editor } from "./editor.js";

export type EditorCommand<A extends unknown[]> = (
  this: Editor,
  ...args: A
) => void;

export const Delete: EditorCommand<[]> = function () {
  this.apply(new Transaction().delete(...toRange(this.selection)));
};

export const InsertText: EditorCommand<[text: string]> = function (text) {
  const [start, end] = toRange(this.selection);
  this.apply(new Transaction().delete(start, end).insert(start, text));
};

export const ReplaceAll: EditorCommand<[text: string]> = function (text) {
  const doc = this.doc;
  this.apply(
    new Transaction()
      .delete([0, 0], [doc.length - 1, getLineSize(doc[doc.length - 1]!)])
      .insert([0, 0], text),
  );
};
