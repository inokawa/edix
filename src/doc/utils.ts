import { isTextNode } from "./edit.js";
import { type DocFragment, type VoidNode } from "./types.js";

/**
 * @internal
 */
export const docToString = (
  doc: DocFragment,
  voidToString?: (node: VoidNode) => string
): string => {
  return doc.reduce((acc, r, i) => {
    if (i !== 0) {
      acc += "\n";
    }
    return (
      acc +
      r.reduce(
        (acc, n) =>
          acc + (isTextNode(n) ? n.text : voidToString ? voidToString(n) : ""),
        ""
      )
    );
  }, "");
};

/**
 * @internal
 */
export const stringToDoc = (text: string): DocFragment => {
  return text.split("\n").map((l) => (l ? [{ text: l }] : []));
};
