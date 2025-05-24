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

const movePositionPrevIfExist = (doc: DocFragment, pos: Position): Position => {
  return pos[0] === 0 ? [0, 0] : [pos[0] - 1, getLineSize(doc[pos[0] - 1]!)];
};

/**
 * @internal
 */
export const Input: EditableCommand<
  [
    deleteLines: { _range: [Position, Position]; _isBlock: boolean } | null,
    insertLines: {
      _start: Position;
      _isBlock: boolean;
      _doc: DocFragment;
    } | null
  ]
> = (doc, selection, deleteLines, insertLines) => {
  if (deleteLines) {
    deleteEdit(
      doc,
      selection,
      deleteLines._isBlock
        ? movePositionPrevIfExist(doc, deleteLines._range[0])
        : deleteLines._range[0],
      deleteLines._range[1]
    );
  }
  if (insertLines) {
    insertEdit(
      doc,
      selection,
      insertLines._isBlock ? [[], ...insertLines._doc] : insertLines._doc,
      insertLines._isBlock
        ? movePositionPrevIfExist(doc, insertLines._start)
        : insertLines._start
    );
  }
};
