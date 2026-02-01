import type { PasteExtension } from "./types.js";

export const plainPaste = (): PasteExtension => (dataTransfer) => {
  return dataTransfer.getData("text/plain");
};
