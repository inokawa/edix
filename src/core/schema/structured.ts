import { InsertFragment, InsertText } from "../doc/commands";
import { isCommentNode } from "../dom/parser";
import { NODE_TEXT, TextNode, type DocNode } from "../doc/types";
import type { EditableSchema } from "./types";
import { docToString } from "../doc/edit";

export interface EditableVoidSerializer<T> {
  is: (node: HTMLElement) => boolean;
  data: (node: HTMLElement) => T;
  plain: (data: T) => string;
}

const emptyString = (): string => "";

export const voidNode = <const D>({
  is,
  data,
  plain = emptyString,
}: {
  is: (node: HTMLElement) => boolean;
  data: (node: HTMLElement) => D;
  plain?: (data: D) => string;
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

type ExtractVoidData<T> = T extends EditableVoidSerializer<infer D> ? D : never;
type ExtractVoidNode<T> = Prettify<
  {
    [K in keyof T]: {
      type: K;
      data: ExtractVoidData<T[K]>;
    };
  }[keyof T]
>;

/**
 * Defines structured text schema.
 */
export const schema = <
  V extends Record<string, EditableVoidSerializer<any>> = {},
  M extends boolean = false
>({
  multiline,
  void: voids = {} as V,
}: {
  multiline?: M;
  void?: V;
}): EditableSchema<
  M extends true
    ? (ExtractVoidNode<V> | { type: "text"; text: string })[][]
    : (ExtractVoidNode<V> | { type: "text"; text: string })[]
> => {
  type VoidNodeData = ExtractVoidData<V[keyof V]>;
  type TextNodeType = { type: "text"; text: string };
  type VoidNodeType = ExtractVoidNode<V>;
  type RowType = (TextNodeType | VoidNodeType)[];

  const voidSerializers = Object.entries(voids);

  const textCache = new WeakMap<TextNode, TextNodeType>();
  // TODO replace VoidNodeData with VoidNode
  const voidCache = new WeakMap<VoidNodeData, VoidNodeType>();

  const serializeRow = (r: readonly DocNode[]): RowType => {
    return r.reduce((acc, t) => {
      if (t.type === NODE_TEXT) {
        let text = textCache.get(t);
        if (!text) {
          textCache.set(t, (text = { type: "text", text: t.text }));
        }
        acc.push(text);
      } else {
        acc.push(voidCache.get(t.data as VoidNodeData)!);
      }
      return acc;
    }, [] as RowType);
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
    void: (element) => {
      for (const [type, s] of voidSerializers) {
        if (s.is(element as HTMLElement)) {
          const data = s.data(element as HTMLElement) as VoidNodeData;
          // TODO improve
          voidCache.set(data, {
            type,
            data: { ...data },
          } as VoidNodeType);
          return data;
        }
      }
      return;
    },
    copy: (dataTransfer, doc, dom) => {
      dataTransfer.setData(
        "text/plain",
        docToString(doc, (node) => {
          const voidNode = voidCache.get(node.data as VoidNodeData)!;
          return voids[voidNode.type]!.plain(node.data);
        })
      );

      const wrapper = document.createElement("div");
      wrapper.appendChild(dom());
      dataTransfer.setData("text/html", wrapper.innerHTML);
    },
    paste: (dataTransfer, command, read) => {
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
        command(InsertFragment, read(dom));
      }
      command(InsertText, dataTransfer.getData("text/plain"));
    },
  };
};
