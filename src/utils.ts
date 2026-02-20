/**
 * @internal
 */
export const min = Math.min;

/**
 * @internal
 */
export const { keys, is } = Object;

/**
 * @internal
 */
export const isString = (n: unknown) => typeof n === "string";

/**
 * @internal
 */
export const isFunction = (n: unknown) => typeof n === "function";

/**
 * @internal
 */
export const microtask: (fn: () => void) => void = isFunction(queueMicrotask)
  ? queueMicrotask
  : (fn) => {
      Promise.resolve().then(fn);
    };
