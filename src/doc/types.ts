export interface TextNode {
  readonly text: string;
}

export interface VoidNode {}

export type DocNode = TextNode | VoidNode;

export type DocBase = readonly (readonly DocNode[])[];
export type Fragment = readonly (readonly DocNode[])[];

export type InferNode<T extends DocBase> = T[number][number];

export type Position = readonly [line: number, offset: number];
export type PositionRange = readonly [start: Position, end: Position];

export type SelectionSnapshot = readonly [anchor: Position, focus: Position];
