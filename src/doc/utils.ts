import { isTextNode } from "./edit.js";
import { type DocFragment, type DocNode } from "./types.js";

/**
 * @internal
 */
export const docToString = (
  doc: DocFragment,
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
export const stringToDoc = (text: string): DocFragment => {
  return text.split("\n").map((l) => (l ? [{ text: l }] : []));
};
