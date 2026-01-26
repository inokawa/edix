import type { DocNode } from "../../doc/types.js";
import { docToString } from "../../doc/utils.js";
import type { CopyExtension } from "./types.js";

export const plainCopy = <T extends DocNode>(
  serializer?: (
    node: Extract<T, { data: any }> | { text: string } /* TODO */,
  ) => string,
): CopyExtension => {
  return (dataTransfer, data) => {
    dataTransfer.setData(
      "text/plain",
      docToString(data, serializer as ((node: DocNode) => string) | undefined),
    );
  };
};
