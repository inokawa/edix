import { type DocFragment, type Position } from "./types";
import { comparePosition, edges } from "./position";
import { deleteEdit, Edit, insertEdit, moveEdit } from "./edit";
import { stringToDoc } from "./utils";
import { Editor } from "../editable";

export type EditableCommand<T extends unknown[]> = (
  editor: Editor,
  apply: (edit: Edit) => void,
  ...args: T
) => void;

/**
 * @internal
 */
export const DeleteRange: EditableCommand<
  [anchor: Position, focus: Position]
> = (_editor, apply, anchor, focus) => {
  if (comparePosition(anchor, focus) !== 0) {
    apply(deleteEdit(...edges(anchor, focus)));
  }
};

export const Delete: EditableCommand<[]> = (editor, apply) => {
  DeleteRange(editor, apply, ...editor.sel);
};

/**
 * @internal
 */
export const InsertAt: EditableCommand<
  [pos: Position, fragment: DocFragment]
> = (_editor, apply, pos, fragment) => {
  apply(insertEdit(pos, fragment));
};

export const InsertText: EditableCommand<[text: string]> = (
  editor,
  apply,
  text
) => {
  Delete(editor, apply);

  apply(
    insertEdit(
      // selection was collapsed with delete command
      edges(...editor.sel)[0],
      stringToDoc(text)
    )
  );
};

/**
 * @internal
 */
export const MoveTo: EditableCommand<[anchor: Position, focus?: Position]> = (
  _editor,
  apply,
  anchor,
  focus = anchor
) => {
  apply(moveEdit(anchor, focus));
};
