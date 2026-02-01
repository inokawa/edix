import type { Doc } from "../doc/types.js";

export interface DocSchema<T> {
  single: boolean;
  js: (doc: Doc) => T;
  doc: (state: T) => Doc;
}

type ExtractItem<T> = T extends (infer I)[] ? ExtractItem<I> : T;

export type InferDoc<T> = T extends DocSchema<infer N> ? N : never;
export type InferNode<T> =
  T extends DocSchema<infer N> ? ExtractItem<N> : never;
