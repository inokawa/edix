export type NodeRef = string | Element;

export type DomSnapshot = readonly (readonly NodeRef[])[];

/**
 * @internal
 */
export type Position = readonly [line: number, offset: number];

/**
 * @internal
 */
export type SelectionSnapshot = readonly [anchor: Position, focus: Position];

/**
 * @internal
 */
export type Writeable<T> = T extends
  | Record<string, unknown>
  | readonly unknown[]
  ? {
      -readonly [key in keyof T]: T[key];
    }
  : T;
