import type { Position, PositionRange } from "./types.js";

/**
 * @internal
 * 0 : same
 * 1 : A is before B (forward)
 * -1: A is after B (backward)
 */
export const compareLine = (
  lineA: Position[0],
  lineB: Position[0],
): 0 | 1 | -1 => {
  if (lineA === lineB) {
    return 0;
  } else {
    return lineA < lineB ? 1 : -1;
  }
};

/**
 * @internal
 * 0 : same
 * 1 : A is before B (forward)
 * -1: A is after B (backward)
 */
export const comparePosition = (
  [lineA, offsetA]: Position,
  [lineB, offsetB]: Position,
): 0 | 1 | -1 => {
  const line = compareLine(lineA, lineB);
  if (line === 0) {
    return offsetA === offsetB ? 0 : offsetA < offsetB ? 1 : -1;
  } else {
    return line;
  }
};

/**
 * @internal
 */
export const toRange = ([a, b]: readonly [
  Position,
  Position,
]): PositionRange => {
  return comparePosition(a, b) === -1 ? [b, a] : [a, b];
};
