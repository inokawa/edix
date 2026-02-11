import { docToString, stringToFragment } from "../doc/utils.js";
import { createEditor, type Editor, type EditorOptions } from "../editor.js";
import { singlelinePlugin } from "../plugins/index.js";

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
   * TODO
   */
  singleline?: boolean;
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
  singleline,
  onChange,
  ...opts
}: PlainEditorOptions): Editor<PlainDoc> => {
  return createEditor({
    ...opts,
    doc: stringToFragment(text),
    plugins: singleline ? [singlelinePlugin()] : undefined,
    onChange: (doc) => {
      onChange(docToString(doc));
    },
  });
};
