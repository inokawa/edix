import { Position } from "./types";

/**
 * @internal
 */
export const { min } = Math;

/**
 * @internal
 */
export const microtask: (fn: () => void) => void =
  typeof queueMicrotask === "function"
    ? queueMicrotask
    : (fn) => {
        Promise.resolve().then(fn);
      };

/**
 * @internal
 */
export const isSamePosition = (start: Position, end: Position): boolean => {
  return start[0] === end[0] && start[1] === end[1];
};
