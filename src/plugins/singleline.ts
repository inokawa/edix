import { type Operation, Transaction, merge } from "../doc/edit.js";
import { type DocNode } from "../doc/types.js";

/**
 * @internal
 */
export const singleline = (tr: Transaction): Transaction => {
  return new Transaction(
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
  );
};
