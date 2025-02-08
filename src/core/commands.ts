import type { DomSnapshot, SelectionSnapshot } from "./types";
import { comparePosition } from "./position";
import { deleteAt, getRowLength, insertAt, moveTo, Writeable } from "./edit";

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
export const deleteSelection: EditableCommand<[]> = (doc, selection) => {
  const [anchor, focus] = selection;
  const posDiff = comparePosition(anchor, focus);
  if (posDiff !== 0) {
    const backward = posDiff === -1;
    const start = backward ? focus : anchor;
    const end = backward ? anchor : focus;

    deleteAt(doc, start, end);
    moveTo(selection, start);
  }
};

/**
 * @internal
 */
export const replaceSelection: EditableCommand<[lines: DomSnapshot]> = (
  doc,
  selection,
  lines
) => {
  deleteSelection(doc, selection);

  // selection was collapsed with deleteSelection command
  const pos = selection[0];

  const lineLength = lines.length;
  const [line, offset] = pos;

  insertAt(doc, lines, pos);
  moveTo(
    selection,
    lineLength === 1
      ? [line, offset + getRowLength(lines[0]!)]
      : [line + lineLength - 1, getRowLength(lines[lineLength - 1]!)]
  );
};

/**
 * @internal
 */
export const insertText: EditableCommand<[text: string]> = (
  doc,
  selection,
  text
) => {
  replaceSelection(
    doc,
    selection,
    text.split("\n").map((l) => [l])
  );
};
