import { type TextNode, type DocNode } from "../doc/types.js";
import type { DocSchema } from "./types.js";
import { isTextNode } from "../doc/edit.js";

type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

type ExtractVoidNode<T> = Prettify<
  {
    [K in keyof T]: {
      type: K;
      data: T[K];
    };
  }[keyof T]
>;

/**
 * Defines structured text schema.
 */
export const schema = <
  V extends Record<string, any> = {},
  M extends boolean = false,
>({
  multiline,
}: {
  multiline?: M;
  void?: V;
}): DocSchema<
  M extends true
    ? (ExtractVoidNode<V> | { type: "text"; text: string })[][]
    : (ExtractVoidNode<V> | { type: "text"; text: string })[]
> => {
  type VoidNodeData = V[keyof V];
  type TextNodeType = { type: "text"; text: string };
  type VoidNodeType = ExtractVoidNode<V>;
  type RowType = (TextNodeType | VoidNodeType)[];

  const textCache = new WeakMap<TextNode, TextNodeType>();
  // TODO replace VoidNodeData with VoidNode
  const voidCache = new WeakMap<VoidNodeData, VoidNodeType>();

  const serializeRow = (r: readonly DocNode[]): RowType => {
    return r.reduce((acc, t) => {
      if (isTextNode(t)) {
        let text = textCache.get(t);
        if (!text) {
          textCache.set(t, (text = { type: "text", text: t.text }));
        }
        acc.push(text);
      } else {
        // TODO improve later
        let prev = voidCache.get(t.data as VoidNodeData);
        if (!prev) {
          prev = t as any;
        }
        acc.push(prev as any);
      }
      return acc;
    }, [] as RowType);
  };

  const nodeToDocNode = (
    node: ExtractVoidNode<V> | { type: "text"; text: string },
  ): DocNode => {
    if (node.type === "text") {
      return { text: (node as { type: "text"; text: string }).text };
    }
    const { type, data } = node as {
      type: keyof V;
      data: V[keyof V];
    };
    voidCache.set(
      data as VoidNodeData,
      {
        type,
        data,
      } as VoidNodeType,
    );
    return { data };
  };

  return {
    single: !multiline,
    js: multiline
      ? (doc) => {
          return doc.map(serializeRow);
        }
      : (doc) => {
          return serializeRow(doc[0]!) satisfies RowType as any; // TODO improve type
        },
    doc: (state) => {
      // TODO remove
      return multiline
        ? (
            state as (ExtractVoidNode<V> | { type: "text"; text: string })[][]
          ).map((r) => r.map(nodeToDocNode))
        : [
            (
              state as (ExtractVoidNode<V> | { type: "text"; text: string })[]
            ).map(nodeToDocNode),
          ];
    },
  };
};
