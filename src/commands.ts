import { type DocFragment, type SelectionSnapshot } from "./doc/types";
import { range } from "./doc/position";
import { getLineSize, Transaction } from "./doc/edit";
import { stringToDoc } from "./doc/utils";

export type EditableCommand<A extends unknown[]> = (
  doc: DocFragment,
  selection: SelectionSnapshot,
  ...args: A
) => Transaction | void;

export const Delete: EditableCommand<[]> = (_doc, selection) => {
  return new Transaction().delete(...range(selection));
};

export const InsertText: EditableCommand<[text: string]> = (
  _doc,
  selection,
  text
) => {
  const [start, end] = range(selection);
  return new Transaction().delete(start, end).insert(start, stringToDoc(text));
};

export const ReplaceAll: EditableCommand<[text: string]> = (
  doc,
  _selection,
  text
) => {
  return new Transaction()
    .delete([0, 0], [doc.length - 1, getLineSize(doc[doc.length - 1]!)])
    .insert([0, 0], stringToDoc(text));
};
