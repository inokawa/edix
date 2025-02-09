import type { DomSnapshot, Position, SelectionSnapshot } from "./types";
import { comparePosition } from "./position";
import { deleteEdit, Edit, getRowLength, insertEdit, moveEdit } from "./edit";

/**
 * @internal
 */
export type EditableCommand<T extends unknown[]> = (
  doc: DomSnapshot,
  selection: SelectionSnapshot,
  apply: (...edit: Edit[]) => void,
  ...args: T
) => void;

/**
 * @internal
 */
export const setInput: EditableCommand<
  [doc: DomSnapshot, selection: SelectionSnapshot]
> = (doc, __, apply, nextDoc, nextSelection) => {
  const lastLine = doc.length - 1;
  const origin: Position = [0, 0];

  // TODO optimize
  apply(
    deleteEdit(origin, [lastLine, getRowLength(doc[lastLine]!)]),
    insertEdit(origin, nextDoc),
    moveEdit(nextSelection[0], nextSelection[1])
  );
};

/**
 * @internal
 */
export const deleteSelection: EditableCommand<[]> = (_, selection, apply) => {
  const [anchor, focus] = selection;
  const posDiff = comparePosition(anchor, focus);
  if (posDiff !== 0) {
    const backward = posDiff === -1;
    const start = backward ? focus : anchor;
    const end = backward ? anchor : focus;

    apply(deleteEdit(start, end), moveEdit(start));
  }
};

/**
 * @internal
 */
export const replaceSelection: EditableCommand<[lines: DomSnapshot]> = (
  doc,
  selection,
  apply,
  lines
) => {
  deleteSelection(doc, selection, apply);

  // selection was collapsed with deleteSelection command
  const pos = selection[0];

  const lineLength = lines.length;
  const [line, offset] = pos;
  const lastLineLength = getRowLength(lines[lineLength - 1]!);

  apply(
    insertEdit(pos, lines),
    moveEdit(
      lineLength === 1
        ? [line, offset + lastLineLength]
        : [line + lineLength - 1, lastLineLength]
    )
  );
};

/**
 * @internal
 */
export const insertText: EditableCommand<[text: string]> = (
  doc,
  selection,
  apply,
  text
) => {
  replaceSelection(
    doc,
    selection,
    apply,
    text.split("\n").map((l) => [l])
  );
};
