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
export const microtask: (fn: () => void) => void =
  typeof queueMicrotask === "function"
    ? queueMicrotask
    : (fn) => {
        Promise.resolve().then(fn);
      };

let id = 0;
const nodeMap = new WeakMap<object, string>();
export const nodeId = (node: object): string => {
  let nid = nodeMap.get(node);
  if (!nid) {
    nodeMap.set(node, (nid = String(++id)));
  }
  return nid;
};
