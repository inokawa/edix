import { INTERNAL_COPY_KEY } from "../utils.js";
import type { PasteExtension } from "./types.js";

/**
 * An extension to handle pasting from edix editor instance.
 */
export const internalPaste = ({
  key = INTERNAL_COPY_KEY,
}: { key?: string } = {}): PasteExtension => {
  return (dataTransfer) => {
    try {
      return JSON.parse(dataTransfer.getData(key));
    } catch (e) {
      return null;
    }
  };
};
