import type { Position } from "./types";

/**
 * @internal
 * 0 : same
 * 1 : A is before B (forward)
 * -1: A is after B (backward)
 */
export const comparePosition = (
  [posAline, posAoffset]: Position,
  [posBline, posBoffset]: Position
): 0 | 1 | -1 => {
  if (posAline === posBline) {
    return posAoffset === posBoffset ? 0 : posAoffset < posBoffset ? 1 : -1;
  } else {
    return posAline < posBline ? 1 : -1;
  }
};
