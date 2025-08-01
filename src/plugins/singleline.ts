import { Operation, Transaction, merge } from "../doc/edit";
import { DocLine } from "../doc/types";

/**
 * @internal
 */
export const singleline = (tr: Transaction): Transaction => {
  return Transaction.from(
    tr.map((op): Operation => {
      if (op._type === 2) {
        return {
          ...op,
          _fragment: [
            op._fragment.reduce((acc, l) => merge(acc, l), [] as DocLine),
          ],
        };
      }
      return op;
    })
  );
};
