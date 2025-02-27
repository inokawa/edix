import { isCommentNode } from "../dom/parser";
import type { NodeRef } from "../types";
import type { EditableSchema } from "./types";

export interface EditableVoidSerializer<T> {
  is: (node: HTMLElement) => boolean;
  data: (node: HTMLElement) => T;
  plain: (node: HTMLElement) => string;
}

const toString = (node: Node): string => node.textContent!;

export const voidNode = <const D>({
  is,
  data,
  plain = toString,
}: {
  is: (node: HTMLElement) => boolean;
  data: (node: HTMLElement) => D;
  plain?: (node: HTMLElement) => string;
}): EditableVoidSerializer<D> => {
  return {
    is,
    data,
    plain,
  };
};

type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

type ExtractVoidNode<T> = Prettify<
  {
    [K in keyof T]: {
      type: K;
      data: T[K] extends EditableVoidSerializer<infer D> ? D : never;
    };
  }[keyof T]
>;

/**
 * Defines structured text schema.
 */
export const schema = <
  V extends Record<string, EditableVoidSerializer<any>>,
  M extends boolean = false
>({
  multiline,
  void: voids,
}: {
  multiline?: M;
  void: V;
}): EditableSchema<
  M extends true
    ? (ExtractVoidNode<V> | { type: "text"; text: string })[][]
    : (ExtractVoidNode<V> | { type: "text"; text: string })[]
> => {
  type VoidNodeType = ExtractVoidNode<V>;
  type RowType = (VoidNodeType | { type: "text"; text: string })[];

  const voidSerializers = Object.entries(voids);

  const serializeRow = (r: readonly NodeRef[]): RowType => {
    return r.reduce((acc, t) => {
      if (typeof t === "string") {
        acc.push({ type: "text", text: t });
      } else {
        for (const [type, s] of voidSerializers) {
          if (s.is(t as HTMLElement)) {
            acc.push({
              type,
              data: s.data(t as HTMLElement),
            } as VoidNodeType);
            break;
          }
        }
      }
      return acc;
    }, [] as RowType);
  };

  return {
    single: !multiline,
    data: multiline
      ? (snap) => {
          return snap.map(serializeRow);
        }
      : (snap) => {
          return serializeRow(snap[0]!) satisfies RowType as any; // TODO improve type
        },
    plain: (snap) => {
      return snap.reduce((acc, r, i) => {
        if (i !== 0) {
          acc += "\n";
        }
        return (
          acc +
          r.reduce((acc, t) => {
            if (typeof t === "string") {
              return acc + t;
            } else {
              for (const [, s] of voidSerializers) {
                if (s.is(t as HTMLElement)) {
                  return acc + s.plain(t as HTMLElement);
                }
              }
            }
            return acc;
          }, "")
        );
      }, "");
    },
    paste: (dataTransfer) => {
      const html = dataTransfer.getData("text/html");
      if (html) {
        let dom: Node = new DOMParser().parseFromString(html, "text/html").body;
        let isWindowsCopy = false;
        // https://github.com/w3c/clipboard-apis/issues/193
        for (const n of [...dom.childNodes]) {
          if (isCommentNode(n)) {
            if (n.data === "StartFragment") {
              isWindowsCopy = true;
              dom = new DocumentFragment();
            } else if (n.data === "EndFragment") {
              isWindowsCopy = false;
            }
          } else if (isWindowsCopy) {
            dom.appendChild(n);
          }
        }
        return dom;
      }
      return dataTransfer.getData("text/plain");
    },
  };
};
