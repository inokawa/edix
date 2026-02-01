import type { DocNode, TextNode } from "../../doc/types.js";
import { readDom } from "../../dom/index.js";
import { isCommentNode } from "../../dom/parser.js";
import type { PasteExtension } from "./types.js";

export const htmlPaste = <T extends DocNode>(
  serializeText: (t: string) => Extract<T, TextNode>,
  serializers: ((node: HTMLElement) => T | void)[] = [],
): PasteExtension => {
  return (dataTransfer, config) => {
    const html = dataTransfer.getData("text/html");
    if (html) {
      let dom: Node = new DOMParser().parseFromString(html, "text/html").body;
      let isWindowsCopy = false;
      // https://github.com/w3c/clipboard-apis/issues/193
      for (const n of [...dom.childNodes]) {
        if (isCommentNode(n)) {
          if (n.data === "StartFragment") {
            isWindowsCopy = true;
            dom = new DocumentFragment();
          } else if (n.data === "EndFragment") {
            isWindowsCopy = false;
          }
        } else if (isWindowsCopy) {
          dom.appendChild(n);
        }
      }

      // TODO customizable dom to standard schema and validate
      return readDom(dom, config, serializeText, (n) => {
        for (const s of serializers) {
          const node = s(n as HTMLElement);
          if (node) {
            return node;
          }
        }
        return;
      });
    }
    return null;
  };
};
