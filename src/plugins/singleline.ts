import { merge, Transaction, type Operation } from "../doc/edit.js";
import { type DocNode } from "../doc/types.js";
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
      return next(new Transaction(
        tr.ops.map((op): Operation => {
          if (op._type === 2) {
            return {
              ...op,
              _text: op._text.replaceAll("\n", ""),
            };
          } else if (op._type === 3) {
            return {
              ...op,
              _fragment: [
                op._fragment.reduce(
                  (acc, l) => merge(acc, l),
                  [] as readonly DocNode[],
                ),
              ],
            };
          }
          return op;
        }),
      ));
    },
  };
};
