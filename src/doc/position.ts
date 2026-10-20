import type { Range, Selection } from "./types.js";

/**
 * @internal
 */
export const toRange = ([a, b]: Selection | Range): Range => {
  return a > b ? [b, a] : [a, b];
};

/**
 * @internal
 */
export const isCollapsed = ([a, b]: Selection | Range): boolean => {
  return a === b;
};

/**
 * @internal
 */
export const isCovered = ([start, end]: Range, size: number): boolean => {
  return size ? start < end : start <= end;
};
