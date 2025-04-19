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
export type NodeData = TextNode | VoidNode;

export type DocFragment = readonly (readonly NodeData[])[];

export type Position = readonly [line: number, offset: number];

export type SelectionSnapshot = readonly [anchor: Position, focus: Position];

export type Writeable<T> = T extends
  | Record<string, unknown>
  | readonly unknown[]
  ? {
      -readonly [key in keyof T]: T[key];
    }
  : T;
