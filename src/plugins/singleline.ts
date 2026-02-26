import { joinBlocks } from "../doc/edit.js";
import type { EditorPlugin } from "./types.js";

export const singlelinePlugin = (): EditorPlugin => {
  return {
    mount: (element) => {
      element.ariaMultiLine = null;
    },
    apply: (op, next) => {
      if (op._type === 2) {
        op = {
          ...op,
          _text: op._text.replaceAll("\n", ""),
        };
      } else if (op._type === 3) {
        op = {
          ...op,
          _fragment: [joinBlocks(...op._fragment)],
        };
      }
      next(op);
    },
  };
};
