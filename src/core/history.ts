const MAX_HISTORY_LENGTH = 500;

/**
 * @internal
 */
export const createHistory = <T>(initialValue: T) => {
  let index = 0;
  const histories: T[] = [initialValue];

  const get = () => histories[index]!;

  const push = (history: T, merge?: boolean) => {
    if (!merge) {
      index++;
    }
    histories[index] = history;
    histories.splice(index + 1);
    if (index > MAX_HISTORY_LENGTH) {
      index--;
      histories.shift();
    }
  };

  const isUndoable = (): boolean => {
    return index > 0;
  };

  const isRedoable = (): boolean => {
    return index < histories.length - 1;
  };

  const undo = (): T | undefined => {
    if (isUndoable()) {
      index--;
      return get();
    } else {
      return;
    }
  };

  const redo = (): T | undefined => {
    if (isRedoable()) {
      index++;
      return get();
    } else {
      return;
    }
  };

  return {
    get,
    undo,
    redo,
    push,
  };
};
