import type { PasteExtension } from "./types.js";

/**
 * An extension to handle pasting from plain text.
 */
export const plainPaste = (): PasteExtension => {
  return (dataTransfer) => {
    return dataTransfer.getData("text/plain");
  };
};
