/**
 * @internal
 */
export type Point = readonly [line: number, offset: number];

/**
 * @internal
 */
export interface SelectionSnapshot {
  readonly start: Point;
  readonly end: Point;
  readonly backward: boolean;
}
