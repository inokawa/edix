import { ReplaceDoc } from "../commands.js";
import { mapPositionWithOps, type Operation } from "../doc/operation.js";
import type { DocNode, Selection } from "../doc/types.js";
import type { Editor } from "../editor.js";
import { keymap } from "../keyboard.js";
import { keys } from "../utils.js";

const MAX_HISTORY_LENGTH = 500;
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
  type History = [T, Selection, Operation[]];
  let index = 0;
  let prevTime = 0;
  let undoOrRedoing = false;
  const now = Date.now;
  const histories: History[] = [[editor.doc, editor.selection, []]];

  const get = () => histories[index]!;

  const isUndoable = (): boolean => {
    return index > 0;
  };

  const isRedoable = (): boolean => {
    return index < histories.length - 1;
  };

  const restore = (doc: T) => {
    editor.exec(ReplaceDoc, doc.children);

    // TODO improve
    const prev = doc as Record<string, unknown>;
    const current = editor.doc as Record<string, unknown>;
    for (const key of keys(prev)) {
      if (key !== "children" && current[key] !== prev[key]) {
        editor.apply({ type: "patch_node", path: [], key, value: prev[key] });
      }
    }
    for (const key of keys(current)) {
      if (key !== "children" && !(key in prev)) {
        editor.apply({ type: "patch_node", path: [], key, value: undefined });
      }
    }
  };

  const undo = () => {
    if (isUndoable()) {
      const sel = get()[1];
      index--;
      const currentDoc = editor.doc;
      undoOrRedoing = true;
      restore(get()[0]);
      undoOrRedoing = false;
      if (currentDoc !== editor.doc) {
        editor.selection = sel;
      }
    }
  };
  const redo = () => {
    if (isRedoable()) {
      index++;
      const [doc, sel, ops] = get();
      const currentDoc = editor.doc;
      undoOrRedoing = true;
      restore(doc);
      undoOrRedoing = false;
      if (currentDoc !== editor.doc) {
        editor.selection = [
          mapPositionWithOps(sel[0], ops),
          mapPositionWithOps(sel[1], ops),
        ];
      }
    }
  };

  const clear = () => {
    histories.length = 0;
    histories.push([editor.doc, editor.selection, []]);
    index = 0;
    prevTime = 0;
  };

  editor.hook("apply", (op, next) => {
    if (undoOrRedoing) return;
    const doc = editor.doc;
    const selection = editor.selection;
    next(op);
    const newDoc = editor.doc;

    if (doc !== newDoc) {
      const time = now();
      if (index === 0 || time - prevTime >= BATCH_HISTORY_TIME) {
        index++;
        const history: History = [doc, selection, []];
        if (index >= histories.length) {
          histories.push(history);
        } else {
          histories[index] = history;
        }
      }
      prevTime = time;
      histories[index]![0] = newDoc;
      histories[index]![2].push(op);
      if (histories.length > index + 1) {
        histories.length = index + 1;
      }
      if (index > MAX_HISTORY_LENGTH) {
        index--;
        histories.shift();
      }
    }
  });

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
