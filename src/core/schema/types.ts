import type { DomSnapshot } from "../types";

export interface EditableSchema<T> {
  single: boolean;
  data: (snapshot: DomSnapshot) => T;
  copy: (dataTransfer: DataTransfer, snapshot: DomSnapshot, dom: Node) => void;
  paste: (dataTransfer: DataTransfer) => Node | string;
}

type ExtractItem<T> = T extends (infer I)[] ? ExtractItem<I> : T;

export type InferDoc<T> = T extends EditableSchema<infer N> ? N : never;
export type InferNode<T> = T extends EditableSchema<infer N>
  ? ExtractItem<N>
  : never;
