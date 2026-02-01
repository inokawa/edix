import { isTextNode } from "./edit.js";
import { type Doc, type DocNode, type Fragment } from "./types.js";

/**
 * @internal
 */
export const docToString = (
  doc: Doc,
  serializer: (node: DocNode) => string = (n) => (isTextNode(n) ? n.text : ""),
): string => {
  return doc.reduce((acc, r, i) => {
    if (i !== 0) {
      acc += "\n";
    }
    return acc + r.reduce((acc, n) => acc + serializer(n), "");
  }, "");
};

/**
 * @internal
 */
export const stringToFragment = (
  text: string,
  attrs?: Record<string, any>,
): Fragment => {
  return text.split("\n").map((l) => (l ? [{ ...attrs, text: l }] : []));
};
