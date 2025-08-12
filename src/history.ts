import { Transaction } from "./doc/edit";
import { DocFragment } from "./doc/types";

const MAX_HISTORY_LENGTH = 500;
const BATCH_HISTORY_TIME = 500;

const invert = (tr: Transaction, doc: DocFragment): Transaction => {
  //
};

/**
 * @internal
 */
export const createHistory = (
  getDoc: () => DocFragment,
  apply: (tr: Transaction) => void
) => {
  let prevTime = 0;
  const now = Date.now;
  const undos: Transaction[] = [];
  const redos: Transaction[] = [];

  const isUndoable = (): boolean => {
    return undos.length !== 0;
  };

  const isRedoable = (): boolean => {
    return redos.length !== 0;
  };

  return {
    undo: (): void => {
      if (isUndoable()) {
        const tr = undos.pop();
        if (tr) {
          redos.push(invert(tr, getDoc()));
          apply(tr);
        }
      }
    },
    redo: (): void => {
      if (isRedoable()) {
        const tr = redos.pop();
        if (tr) {
          undos.push(invert(tr, getDoc()));
          apply(tr);
        }
      }
    },
    push: (tr: Transaction) => {
      const time = now();
      let undoTr = invert(tr, getDoc());
      if (isUndoable() && time - prevTime < BATCH_HISTORY_TIME) {
        const prevUndoTr = undos.pop()!;
        prevUndoTr.push(...undoTr);
        undoTr = prevUndoTr;
      }

      prevTime = time;

      redos.splice(0);
      undos.push(undoTr);
      const exceededLength = undos.length - MAX_HISTORY_LENGTH;
      if (exceededLength > 0) {
        undos.splice(0, exceededLength);
      }
    },
  };
};
