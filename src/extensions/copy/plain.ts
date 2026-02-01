import type { DocBase, DocNode, InferNode } from "../../doc/types.js";
import { docToString } from "../../doc/utils.js";
import type { CopyExtension } from "./types.js";

export const plainCopy = <T extends DocBase>(
  serializer?: (node: InferNode<T>) => string,
): CopyExtension => {
  return (dataTransfer, data) => {
    dataTransfer.setData(
      "text/plain",
      docToString(data, serializer as ((node: DocNode) => string) | undefined),
    );
  };
};
