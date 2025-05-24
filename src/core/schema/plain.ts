import { docToString, stringToDoc } from "../doc/edit";
import type { EditableSchema } from "./types";

/**
 * Defines plain text schema.
 */
export const plainSchema = ({
  multiline,
}: {
  multiline?: boolean;
} = {}): EditableSchema<string> => {
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
