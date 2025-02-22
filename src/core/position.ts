import type { Position } from "./types";
import { min } from "./utils";

/**
 * @internal
 * 0 : same
 * 1 : A is before B (forward)
 * -1: A is after B (backward)
 */
export const comparePosition = (
  [pathA, offsetA]: Position,
  [pathB, offsetB]: Position
): 0 | 1 | -1 => {
  const length = min(pathA.length, pathB.length);
  for (let i = 0; i < length; i++) {
    const a = pathA[i]!;
    const b = pathB[i]!;
    if (a < b) return 1;
    if (a > b) return -1;
  }

  // same path
  return offsetA === offsetB ? 0 : offsetA < offsetB ? 1 : -1;
};
