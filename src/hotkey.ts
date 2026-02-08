export type KeyboardHandler = (keyboard: KeyboardEvent) => boolean | void;

/**
 * @internal
 */
export const hotkey = (
  key: string,
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
  },
  cb: KeyboardHandler,
): KeyboardHandler => {
  return (e) => {
    if (e.key === key) {
      if (
        // TODO detect OS
        (!mod || e.ctrlKey || e.metaKey) &&
        shift === e.shiftKey &&
        alt === e.altKey
      ) {
        return cb(e);
      }
    }
  };
};
