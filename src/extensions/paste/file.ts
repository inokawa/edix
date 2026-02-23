import type { DocNode } from "../../doc/types.js";
import type { PasteExtension } from "./types.js";

/**
 * An extension to handle pasting / dropping from File.
 */
export const filePaste = (
  handlerByMime: Record<string, (file: File) => DocNode>,
): PasteExtension => {
  return (dataTransfer) => {
    for (const item of dataTransfer.items) {
      if (item.kind === "file") {
        const mapper = handlerByMime[item.type];
        if (mapper) {
          const file = item.getAsFile();
          if (file) {
            return [[mapper(file)]];
          }
        }
      }
    }
    return null;
  };
};
