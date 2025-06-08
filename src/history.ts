const MAX_HISTORY_LENGTH = 500;
const BATCH_HISTORY_TIME = 500;

/**
 * @internal
 */
export const createHistory = <T>(initialValue: T) => {
  let index = 0;
  let prevTime = 0;
  const now = Date.now;
  const histories: T[] = [initialValue];

  const get = () => histories[index]!;

  const set = (history: T) => {
    histories[index] = history;
  };

  const push = (history: T) => {
    const time = now();
    if (index !== 0 && time - prevTime < BATCH_HISTORY_TIME) {
      index--;
    }
    prevTime = time;

    histories[++index] = history;
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
    set,
    undo,
    redo,
    push,
  };
};
