import { docToString, stringToFragment } from "../doc/utils.js";
import { createEditor, type Editor, type EditorOptions } from "../editor.js";

type PlainDoc = { text: string }[][];

export interface PlainEditorOptions extends Omit<
  EditorOptions<PlainDoc>,
  "doc" | "schema" | "onChange"
> {
  /**
   * Initial document text.
   */
  text: string;
  /**
   * Callback invoked when document changes.
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
}: PlainEditorOptions): Editor<PlainDoc> => {
  return createEditor({
    ...opts,
    doc: stringToFragment(text),
    onChange: (doc) => {
      onChange(docToString(doc));
    },
  });
};
