import type { DocBase } from "../doc/types.js";
import { docToString, stringToFragment } from "../doc/utils.js";
import { createEditor, type Editor, type EditorOptions } from "../editor.js";

export interface PlainEditorOptions extends Omit<
  EditorOptions<DocBase>,
  "doc" | "onChange"
> {
  /**
   * Initial document state.
   */
  text: string;
  /**
   * Callback invoked when document state changes.
   */
  onChange: (text: string) => void;
}

/**
 * A function to initialize editor with plaintext.
 */
export const createPlainEditor = ({
  text,
  onChange,
  ...opts
}: PlainEditorOptions): Editor => {
  return createEditor({
    ...opts,
    doc: stringToFragment(text),
    onChange: (doc) => {
      onChange(docToString(doc));
    },
  });
};
