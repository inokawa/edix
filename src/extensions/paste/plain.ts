import { stringToFragment } from "../../doc/utils.js";
import type { PasteExtension } from "./types.js";

export const plainPaste = (): PasteExtension => (dataTransfer) => {
  return stringToFragment(dataTransfer.getData("text/plain"));
};
