import { stringToDoc } from "../../doc/utils.js";
import type { PasteExtension } from "./types.js";

export const plainPaste = (): PasteExtension => (dataTransfer) => {
  return stringToDoc(dataTransfer.getData("text/plain"));
};
