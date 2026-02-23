export type KeyboardHandler = (keyboard: KeyboardEvent) => boolean | void;

/**
 * TODO
 */
export const hotkey = (
  key: string,
  cb: (e: KeyboardEvent) => void,
  {
    mod,
    shift = false,
    alt = false,
  }: {
    mod?: boolean;
    // ctrl?: boolean;
    // meta?: boolean;
    shift?: boolean;
    alt?: boolean;
    // phase?: 'down' | 'up';
  } = {},
): KeyboardHandler => {
  return (e): boolean | void => {
    if (e.key === key) {
      if (
        // TODO detect OS
        (!mod || e.ctrlKey || e.metaKey) &&
        shift === e.shiftKey &&
        alt === e.altKey
      ) {
        cb(e);
        return true;
      }
    }
  };
};
