export interface TextNode {
  readonly text: string;
}

export interface VoidNode {}

export type DocNode = TextNode | VoidNode;

export interface DocBase {
  readonly children: readonly (readonly DocNode[])[];
}
export type Fragment = DocBase["children"];

export type InferNode<T extends DocBase> = T["children"][number][number];

export type Path = readonly [number?];
export type Position = readonly [path: Path, offset: number];
export type PositionRange = readonly [start: Position, end: Position];

export type SelectionSnapshot = readonly [anchor: Position, focus: Position];
