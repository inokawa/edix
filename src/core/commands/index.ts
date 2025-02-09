import type {
  DomSnapshot,
  Position,
  SelectionSnapshot,
  Writeable,
} from "../types";
import { comparePosition } from "../position";
import { deleteEdit, insertEdit } from "./edit";

/**
 * @internal
 */
export type EditableCommand<T extends unknown[]> = (
  doc: Writeable<DomSnapshot>,
  selection: Writeable<SelectionSnapshot>,
  ...args: T
) => void;

/**
 * @internal
 */
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
export const InsertFragment: EditableCommand<[lines: DomSnapshot]> = (
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

/**
 * @internal
 */
export const InsertText: EditableCommand<[text: string]> = (
  doc,
  selection,
  text
) => {
  InsertFragment(
    doc,
    selection,
    text.split("\n").map((l) => [l])
  );
};

/**
 * @internal
 */
export const MoveTo: EditableCommand<[position: Position]> = (
  _doc,
  selection,
  position
) => {
  selection[0] = selection[1] = position;
};
