import {
  NODE_TEXT,
  type DocFragment,
  type Position,
  type SelectionSnapshot,
  type Writeable,
} from "./types";
import { comparePosition } from "./position";
import { deleteEdit, getLineSize, insertEdit } from "./edit";

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

const movePositionPrevIfExist = (doc: DocFragment, pos: Position): Position => {
  return pos[0] === 0 ? [0, 0] : [pos[0] - 1, getLineSize(doc, pos[0] - 1)];
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
    } | null,
    nextSelection?: SelectionSnapshot
  ]
> = (doc, selection, deleteLines, insertLines, nextSelection) => {
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
  if (nextSelection) {
    selection[0] = nextSelection[0];
    selection[1] = nextSelection[1];
  }
};
