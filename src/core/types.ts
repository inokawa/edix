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
