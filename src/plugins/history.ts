import {
  invertOperation,
  mapPositionWithOps,
  type Operation,
} from "../doc/operation.js";
import type { DocNode, Selection } from "../doc/types.js";
import type { Editor } from "../editor.js";
import { keymap } from "../keyboard.js";

const MAX_HISTORY_LENGTH = 100;
const BATCH_HISTORY_TIME = 500;

interface HistoryContext {
  undo: () => void;
  redo: () => void;
  undoable: () => boolean;
  redoable: () => boolean;
  clear: () => void;
}

/**
 * @internal
 */
export function historyPlugin<T extends DocNode>(editor: Editor<T>) {
  type History = [
    selection: Selection,
    ops: Operation[],
    invertedOps: Operation[],
  ];
  const compose = (
    [selection, ops, invertedOps]: History,
    [, nextOps, nextInvertedOps]: History,
  ): History => [
    selection,
    ops.concat(nextOps),
    nextInvertedOps.concat(invertedOps),
  ];
  let index = 0;
  let prevTime = 0;
  let undoOrRedoing = false;
  const now = Date.now;
  const histories: History[] = [];

  // keyed by the document the operations led to, since a discarded transaction restores the document it started from
  let recorded = new WeakMap<T, History>();

  const commit = () => {
    let pending = recorded.get(editor.doc);
    recorded = new WeakMap();
    if (pending) {
      const time = now();
      if (index && time - prevTime < BATCH_HISTORY_TIME) {
        pending = compose(histories[--index]!, pending);
      }
      prevTime = time;
      histories[index++] = pending;
      histories.length = index;
      if (index > MAX_HISTORY_LENGTH) {
        index--;
        histories.shift();
      }
    }
  };

  const isUndoable = (): boolean => {
    commit();
    return index > 0;
  };

  const isRedoable = (): boolean => {
    commit();
    return index < histories.length;
  };

  const restore = (ops: readonly Operation[]): boolean => {
    const before = editor.doc;
    undoOrRedoing = true;
    try {
      editor.apply(ops);
    } finally {
      undoOrRedoing = false;
    }
    return before !== editor.doc;
  };

  const undo = () => {
    if (isUndoable()) {
      const [selection, , invertedOps] = histories[index - 1]!;
      if (restore(invertedOps)) {
        editor.selection = selection;
        index--;
      }
    }
  };
  const redo = () => {
    if (isRedoable()) {
      const [selection, ops] = histories[index]!;
      if (restore(ops)) {
        editor.selection = [
          mapPositionWithOps(selection[0], ops),
          mapPositionWithOps(selection[1], ops),
        ];
        index++;
      }
    }
  };

  const clear = () => {
    recorded = new WeakMap();
    histories.length = 0;
    index = 0;
  };

  editor.hook("apply", (op, next) => {
    if (undoOrRedoing) return;
    const doc = editor.doc;
    const selection = editor.selection;
    const applied = next(op);
    if (applied && doc !== editor.doc) {
      const entry: History = [
        selection,
        [applied],
        invertOperation(doc, applied),
      ];
      const prev = recorded.get(doc);
      recorded.set(editor.doc, prev ? compose(prev, entry) : entry);
    }
  });
  editor.on("change", commit);

  editor.hook("keyboard", keymap("Mod+Z", undo));
  editor.hook("keyboard", keymap("Shift+Mod+Z", redo));

  editor.set<HistoryContext>(historyPlugin, {
    undo,
    redo,
    undoable: isUndoable,
    redoable: isRedoable,
    clear,
  });
}

/**
 * Undos the last edit.
 */
export function Undo(editor: Editor) {
  editor.get<HistoryContext>(historyPlugin).undo();
}

/**
 * Redos the last undone edit.
 */
export function Redo(editor: Editor) {
  editor.get<HistoryContext>(historyPlugin).redo();
}

/**
 * Check if the history can be undone.
 */
export function Undoable(editor: Editor): boolean {
  return editor.get<HistoryContext>(historyPlugin).undoable();
}

/**
 * Check if the history can be redone.
 */
export function Redoable(editor: Editor): boolean {
  return editor.get<HistoryContext>(historyPlugin).redoable();
}

/**
 * Clears the history and makes the current document its oldest state.
 */
export function ClearHistory(editor: Editor) {
  editor.get<HistoryContext>(historyPlugin).clear();
}
