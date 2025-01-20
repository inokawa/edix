import type { Position } from "./types";

/**
 * @internal
 */
export const isSamePosition = (a: Position, b: Position): boolean => {
  return a[0] === b[0] && a[1] === b[1];
};

/**
 * @internal
 */
export const isBackward = (
  [anchorLine, anchorOffset]: Position,
  [focusLine, focusOffset]: Position
): boolean => {
  if (anchorLine === focusLine) {
    return anchorOffset > focusOffset;
  } else {
    return anchorLine > focusLine;
  }
};

