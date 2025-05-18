import {
  type DocFragment,
  type Position,
  type SelectionSnapshot,
  type Writeable,
} from "./types";
import { comparePosition, edges } from "./position";
import { deleteEdit, getLineSize, insertEdit } from "./edit";
import { stringToDoc } from "./utils";

export type EditableCommand<T extends unknown[]> = (
  doc: Writeable<DocFragment>,
  selection: Writeable<SelectionSnapshot>,
  ...args: T
) => void;

export const Delete: EditableCommand<[range?: SelectionSnapshot]> = (
  doc,
  selection,
  [anchor, focus] = selection
) => {
  if (comparePosition(anchor, focus) !== 0) {
    deleteEdit(doc, selection, ...edges(anchor, focus));
  }
};

/**
 * @internal
 */
export const InsertFragment: EditableCommand<[lines: DocFragment]> = (
  doc,
  selection,
  lines
) => {
  Delete(doc, selection);

  insertEdit(
    doc,
    selection,
    lines,
    // selection was collapsed with delete command
    selection[0]
  );
};

export const InsertText: EditableCommand<[text: string]> = (
  doc,
  selection,
  text
) => {
  InsertFragment(doc, selection, stringToDoc(text));
};

/**
 * @internal
 */
export const MoveTo: EditableCommand<[anchor: Position, focus?: Position]> = (
  _doc,
  selection,
  anchor,
  focus = anchor
) => {
  selection[0] = anchor;
  selection[1] = focus;
};

/**
 * @internal
 */
export const Input: EditableCommand<
  [
    start: Position | undefined,
    end: Position | undefined,
    fragment: DocFragment
  ]
> = (
  doc,
  selection,
  start = [0, 0],
  end = [doc.length - 1, getLineSize(doc[doc.length - 1]!)],
  fragment
) => {
  deleteEdit(doc, selection, start, end);
  insertEdit(doc, selection, fragment, start);
};
