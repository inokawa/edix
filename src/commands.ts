import {
  type DocFragment,
  type Position,
  type SelectionSnapshot,
  type Writeable,
} from "./doc/types";
import { comparePosition, edges } from "./doc/position";
import { deleteEdit, insertEdit, getBlockSize } from "./doc/edit";
import { stringToDoc } from "./doc/utils";

export type EditableCommand<A extends unknown[]> = (
  doc: Writeable<DocFragment>,
  selection: Writeable<SelectionSnapshot>,
  ...args: A
) => void;

/**
 * @internal
 */
export const DeleteRange: EditableCommand<
  [anchor: Position, focus: Position]
> = (doc, selection, anchor, focus) => {
  if (comparePosition(anchor, focus) !== 0) {
    deleteEdit(doc, selection, ...edges(anchor, focus));
  }
};

export const Delete: EditableCommand<[]> = (doc, selection) => {
  DeleteRange(doc, selection, ...selection);
};

/**
 * @internal
 */
export const InsertAt: EditableCommand<
  [pos: Position, fragment: DocFragment]
> = (doc, selection, pos, fragment) => {
  insertEdit(doc, selection, pos, fragment);
};

/**
 * @internal
 */
export const InsertFragment: EditableCommand<[fragment: DocFragment]> = (
  doc,
  selection,
  fragment
) => {
  Delete(doc, selection);

  insertEdit(
    doc,
    selection,
    // selection was collapsed with delete command
    selection[0],
    fragment
  );
};

export const InsertText: EditableCommand<[text: string]> = (
  doc,
  selection,
  text
) => {
  InsertFragment(doc, selection, stringToDoc(text));
};

export const ReplaceAll: EditableCommand<[text: string]> = (
  doc,
  selection,
  text
) => {
  deleteEdit(
    doc,
    selection,
    [0, 0],
    [doc.length - 1, getBlockSize(doc[doc.length - 1]!)]
  );
  insertEdit(doc, selection, [0, 0], stringToDoc(text));
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
