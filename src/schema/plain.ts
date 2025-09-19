import { docToString, stringToDoc } from "../doc/utils.js";
import type { DocSchema } from "./types.js";

/**
 * Defines plain text schema.
 */
export const plainSchema = ({
  multiline,
}: {
  multiline?: boolean;
} = {}): DocSchema<string> => {
  return {
    single: !multiline,
    js: docToString,
    doc: stringToDoc,
    copy: (dataTransfer, data) => {
      dataTransfer.setData("text/plain", docToString(data));
    },
    paste: (dataTransfer) => {
      return stringToDoc(dataTransfer.getData("text/plain"));
    },
  };
};
