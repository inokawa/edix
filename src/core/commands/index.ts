import type { DomSnapshot, SelectionSnapshot, Writeable } from "../types";
import { comparePosition } from "../position";
import { deleteEdit, getRowLength, insertEdit, moveTo } from "./edit";

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
export const Delete: EditableCommand<[]> = (doc, selection) => {
  const [anchor, focus] = selection;
  const posDiff = comparePosition(anchor, focus);
  if (posDiff !== 0) {
    const backward = posDiff === -1;
    const start = backward ? focus : anchor;
    const end = backward ? anchor : focus;

    deleteEdit(doc, start, end);
    moveTo(selection, start);
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

  // selection was collapsed with deleteSelection command
  const pos = selection[0];

  const lineLength = lines.length;
  const [line, offset] = pos;
  const lastLineLength = getRowLength(lines[lineLength - 1]!);

  insertEdit(doc, lines, pos);
  moveTo(
    selection,
    lineLength === 1
      ? [line, offset + lastLineLength]
      : [line + lineLength - 1, lastLineLength]
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
