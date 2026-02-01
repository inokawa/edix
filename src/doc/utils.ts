import { isTextNode } from "./edit.js";
import { type DocBase, type DocNode, type TextNode } from "./types.js";

/**
 * @internal
 */
export const docToString = (
  doc: DocBase,
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
export const stringToFragment = <T extends TextNode>(
  text: string,
  node?: T,
): T[][] => {
  return text.split("\n").map((l) => (l ? [{ ...node, text: l } as T] : []));
};
