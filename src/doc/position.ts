import type { Position, PositionRange } from "./types.js";

/**
 * @internal
 * 0 : same
 * 1 : A is before B (forward)
 * -1: A is after B (backward)
 */
export const compareLine = (
  [lineA]: Position,
  [lineB]: Position,
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
export const comparePosition = (posA: Position, posB: Position): 0 | 1 | -1 => {
  const line = compareLine(posA, posB);
  if (line === 0) {
    return posA[1] === posB[1] ? 0 : posA[1] < posB[1] ? 1 : -1;
  } else {
    return line;
  }
};

/**
 * @internal
 */
export const toRange = ([a, b]: readonly [Position, Position]): PositionRange => {
  return comparePosition(a, b) === -1 ? [b, a] : [a, b];
};
