import { joinBlocks } from "../doc/edit.js";
import type { EditorPlugin } from "./types.js";

export const singlelinePlugin = (): EditorPlugin => {
  return {
    mount: (element) => {
      element.ariaMultiLine = null;
    },
    apply: (op, next) => {
      if (op.type === "insert_text") {
        op = {
          ...op,
          text: op.text.replaceAll("\n", ""),
        };
      } else if (op.type === "insert_node") {
        op = {
          ...op,
          fragment: [joinBlocks(...op.fragment)],
        };
      }
      next(op);
    },
  };
};
