import type { Doc } from "../doc/types.js";
import { createEditor, type Editor, type EditorOptions } from "../editor.js";
import { plainSchema } from "../schema/plain.js";

export interface PlainEditorOptions extends Omit<
  EditorOptions<Doc>,
  "doc" | "schema" | "onChange"
> {
  /**
   * Initial document state.
   */
  text: string;
  /**
   * TODO
   */
  singleline?: boolean;
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
  singleline,
  onChange,
  ...opts
}: PlainEditorOptions): Editor => {
  return createEditor({
    ...opts,
    schema: plainSchema({ multiline: !singleline }),
    doc: text,
    onChange: (doc) => {
      onChange(doc);
    },
  });
};
