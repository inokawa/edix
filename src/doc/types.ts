export interface TextNode {
  readonly text: string;
}

export interface VoidNode {}

export type InlineNode = TextNode | VoidNode;

export interface DocNode {
  readonly children: readonly (readonly InlineNode[])[];
}
export type Fragment = DocNode["children"];

export type InferNode<T extends DocNode> = T["children"][number][number];

export type Path = readonly [number?];
export type Position = readonly [path: Path, offset: number];
export type PositionRange = readonly [start: Position, end: Position];

export type SelectionSnapshot = readonly [anchor: Position, focus: Position];
