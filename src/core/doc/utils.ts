import { NODE_TEXT, type DocFragment, type VoidNode } from "./types";

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
          acc +
          (n.type === NODE_TEXT ? n.text : voidToString ? voidToString(n) : ""),
        ""
      )
    );
  }, "");
};

/**
 * @internal
 */
export const stringToDoc = (text: string): DocFragment => {
  return text.split("\n").map((l) => [{ type: NODE_TEXT, text: l }]);
};
