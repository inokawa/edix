import { docToString, stringToFragment } from "../doc/utils.js";
import { createEditor, type Editor, type EditorOptions } from "../editor.js";
import { singlelinePlugin } from "../plugins/index.js";
import type { PluginObject } from "../plugins/types.js";

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
  plugins: optsPlugins = [],
  onChange,
  ...opts
}: PlainEditorOptions): Editor<PlainDoc> => {
  const plugins: PluginObject[] = [...optsPlugins];
  if (singleline) {
    plugins.unshift(singlelinePlugin());
  }
  return createEditor({
    ...opts,
    doc: stringToFragment(text),
    plugins,
    onChange: (doc) => {
      onChange(docToString(doc));
    },
  });
};
