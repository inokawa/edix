/**
 * @internal
 */
export type Point = readonly [line: number, offset: number];

/**
 * @internal
 */
export type SelectionSnapshot = readonly [
  start: Point,
  end: Point,
  backward: boolean
];
