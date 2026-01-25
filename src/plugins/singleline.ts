import { copyArray, Transaction, type Operation } from "../doc/edit.js";
import type { EditorPlugin } from "./types.js";

/**
 * @internal
 */
export const singlelinePlugin: EditorPlugin = () => {
  return {
    mount: (element) => {
      element.ariaMultiLine = null;
    },
    apply: (next, tr) => {
      return next(
        new Transaction(
          tr.ops.map((op): Operation => {
            if (op._type === 2) {
              return {
                ...op,
                _text: op._text.replaceAll("\n", ""),
              };
            } else if (op._type === 3) {
              return {
                ...op,
                _fragment: [copyArray(...op._fragment)],
              };
            }
            return op;
          }),
        ),
      );
    },
  };
};
