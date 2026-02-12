import { INTERNAL_COPY_KEY } from "../utils.js";
import type { CopyExtension } from "./types.js";

/**
 * An extension to handle copying to edix editor instance.
 */
export const internalCopy = ({
  key = INTERNAL_COPY_KEY,
}: {
  key?: string;
} = {}): CopyExtension => {
  return (dataTransfer, data) => {
    dataTransfer.setData(key, JSON.stringify(data));
  };
};
