import type { DocFragment } from "../types";

export interface EditableSchema<T> {
  single: boolean;
  js: (doc: DocFragment) => T;
  void: (element: Element) => Record<string, unknown> | void;
  copy: (dataTransfer: DataTransfer, doc: DocFragment, dom: Node) => void;
  paste: (dataTransfer: DataTransfer) => Node | string;
}

type ExtractItem<T> = T extends (infer I)[] ? ExtractItem<I> : T;

export type InferDoc<T> = T extends EditableSchema<infer N> ? N : never;
export type InferNode<T> = T extends EditableSchema<infer N>
  ? ExtractItem<N>
  : never;
