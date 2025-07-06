import { isCommentNode } from "../dom/parser";
import { TextNode, type DocNode } from "../doc/types";
import type { DocSchema } from "./types";
import { docToString, stringToDoc } from "../doc/utils";
import { isTextNode } from "../doc/edit";

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

type MarkType = "boolean" | "number" | "string";

type MarkToJS<T extends MarkType> = T extends "boolean"
  ? boolean
  : T extends "number"
  ? number
  : T extends "string"
  ? string
  : never;

type TextNodeType<T extends Record<string, MarkType> | void> = T extends void
  ? { type: "text"; text: string }
  : {
      type: "text";
      text: string;
      data?: { [key in keyof T]?: MarkToJS<T[key]> };
    };

/**
 * Defines structured text schema.
 */
export const schema = <
  D extends Record<string, MarkType> | void = void,
  V extends Record<string, EditableVoidSerializer<any>> = {},
  M extends boolean = false
>({
  multiline,
  mark: marks,
  void: voids = {} as V,
}: {
  multiline?: M;
  mark?: D;
  void?: V;
}): DocSchema<
  M extends true
    ? (ExtractVoidNode<V> | TextNodeType<D>)[][]
    : (ExtractVoidNode<V> | TextNodeType<D>)[]
> => {
  type VoidNodeData = ExtractVoidData<V[keyof V]>;
  type VoidNodeType = ExtractVoidNode<V>;
  type RowType = (TextNodeType<D> | VoidNodeType)[];

  const voidSerializers = Object.entries(voids);

  const textCache = new WeakMap<TextNode, TextNodeType<D>>();
  // TODO replace VoidNodeData with VoidNode
  const voidCache = new WeakMap<VoidNodeData, VoidNodeType>();

  const serializeRow = (r: readonly DocNode[]): RowType => {
    return r.reduce((acc, t) => {
      if (isTextNode(t)) {
        let text = textCache.get(t);
        if (!text) {
          // TODO improve
          text = { type: "text", ...t };
          textCache.set(t, text);
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
    paste: (dataTransfer, read) => {
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
        return read(dom);
      }
      return stringToDoc(dataTransfer.getData("text/plain"));
    },
  };
};
