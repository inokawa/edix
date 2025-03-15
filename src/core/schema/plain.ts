import { NODE_TEXT, type DocFragment } from "../types";
import type { EditableSchema } from "./types";

const toString = (doc: DocFragment): string => {
  return doc.reduce((acc, r, i) => {
    if (i !== 0) {
      acc += "\n";
    }
    return (
      acc + r.reduce((acc, n) => acc + (n.type === NODE_TEXT ? n.text : ""), "")
    );
  }, "");
};

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
    js: toString,
    void: () => {}, // not supported
    copy: (dataTransfer, data) => {
      dataTransfer.setData("text/plain", toString(data));
    },
    paste: (dataTransfer) => {
      return dataTransfer.getData("text/plain");
    },
  };
};
