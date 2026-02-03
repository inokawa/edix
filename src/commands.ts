import { toRange } from "./doc/position.js";
import { getLineSize, isTextNode, sliceDoc, Transaction } from "./doc/edit.js";
import type { Editor } from "./editor.js";
import type { DocBase, InferNode } from "./doc/types.js";

export type EditorCommand<A extends unknown[], T extends DocBase> = (
  this: Editor<T>,
  ...args: A
) => void;

/**
 * TODO
 */
export function Delete(this: Editor) {
  this.apply(new Transaction().delete(...toRange(this.selection)));
}

/**
 * TODO
 */
export function InsertText(this: Editor, text: string) {
  const [start, end] = toRange(this.selection);
  this.apply(new Transaction().delete(start, end).insert(start, text));
}

/**
 * TODO
 */
export function ReplaceAll(this: Editor, text: string) {
  const doc = this.doc;
  this.apply(
    new Transaction()
      .delete([0, 0], [doc.length - 1, getLineSize(doc[doc.length - 1]!)])
      .insert([0, 0], text),
  );
}

/**
 * TODO
 */
export function SetFormat<T extends DocBase>(
  this: Editor<T>,
  attrs: Partial<Omit<InferNode<T>, "text">>,
) {
  this.apply(new Transaction().attr(...toRange(this.selection), attrs));
}

type ToggleableKey<T> = {
  [K in keyof T]-?: T[K] extends boolean | undefined ? K : never;
}[keyof T];

/**
 * TODO
 */
export function ToggleFormat<T extends DocBase>(
  this: Editor<T>,
  key: ToggleableKey<Omit<InferNode<T>, "text">>,
) {
  const range = toRange(this.selection);
  const texts = sliceDoc(this.doc, ...range).flatMap((n) =>
    n.filter(isTextNode),
  );
  if (texts.length) {
    this.apply(
      new Transaction().attr(...range, {
        [key]: texts.some((n) => !n[key as keyof typeof n]) ? true : false,
      }),
    );
  }
}
