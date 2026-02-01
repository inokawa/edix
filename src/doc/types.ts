export type TextNode = Readonly<{
  text: string;
}>;
export type VoidNode = Readonly<{
  data: Record<string, unknown>;
}>;
export type DocNode = TextNode | VoidNode;
export type Doc = readonly (readonly DocNode[])[];
export type Fragment = readonly (readonly DocNode[])[];

export type Position = readonly [line: number, offset: number];
export type PositionRange = readonly [start: Position, end: Position];

export type SelectionSnapshot = readonly [anchor: Position, focus: Position];
