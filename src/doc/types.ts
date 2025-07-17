export type TextNode = Readonly<{
  text: string;
}>;
export type VoidNode = Readonly<{
  data: Record<string, unknown>;
}>;
export type InlineNode = TextNode | VoidNode;
export type DocNode = BlockNode | InlineNode;
export type BlockNode = Readonly<{
  nodes: readonly InlineNode[];
}>;

export type DocFragment = readonly BlockNode[];

export type Position = readonly [line: number, offset: number];
export type PositionRange = readonly [start: Position, end: Position];

export type SelectionSnapshot = readonly [anchor: Position, focus: Position];

export type Writeable<T> = T extends
  | Record<string, unknown>
  | readonly unknown[]
  ? {
      -readonly [key in keyof T]: T[key];
    }
  : T;
