import {
  NODE_TEXT,
  type DocFragment,
  type Position,
  type SelectionSnapshot,
  type Writeable,
} from "../types";
import { comparePosition } from "../position";
import { deleteEdit, insertEdit } from "./edit";

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
  const posDiff = comparePosition(anchor, focus);
  if (posDiff !== 0) {
    const backward = posDiff === -1;

    deleteEdit(
      doc,
      selection,
      backward ? focus : anchor,
      backward ? anchor : focus
    );
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
  InsertFragment(
    doc,
    selection,
    text.split("\n").map((l) => [{ type: NODE_TEXT, text: l }])
  );
};

/**
 * @internal
 */
export const MoveToPosition: EditableCommand<[position: Position]> = (
  _doc,
  selection,
  position
) => {
  selection[0] = selection[1] = position;
};
