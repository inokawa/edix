export const NODE_TEXT = 1;
export const NODE_VOID = 2;
export type TextNode = Readonly<{
  type: typeof NODE_TEXT;
  text: string;
}>;
export type VoidNode = Readonly<{
  type: typeof NODE_VOID;
  data: Record<string, unknown>;
}>;
export type DocNode = TextNode | VoidNode;
export type DocLine = readonly DocNode[];
export type DocFragment = readonly DocLine[];

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
