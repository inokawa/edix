import { docToString, stringToDoc } from "../doc/utils";
import type { DocSchema } from "./types";

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
    void: () => {}, // not supported
    copy: (dataTransfer, data) => {
      dataTransfer.setData("text/plain", docToString(data));
    },
    paste: (dataTransfer) => {
      return stringToDoc(dataTransfer.getData("text/plain"));
    },
  };
};
