import {
  type TokenType,
  parse,
  getNodeSize,
  getDomNode,
  isElementNode,
  TOKEN_TEXT,
  TOKEN_VOID,
  TOKEN_SOFT_BREAK,
  TOKEN_BLOCK,
  type ParserConfig,
  isVoidNode,
  moveToBlock,
} from "./parser.js";
import { comparePosition } from "../doc/position.js";
import type {
  Position,
  DocNode,
  SelectionSnapshot,
  PositionRange,
  Fragment,
} from "../doc/types.js";
import { min } from "../utils.js";

export { defaultIsBlockNode } from "./default.js";

// const DOCUMENT_POSITION_DISCONNECTED = 0x01;
const DOCUMENT_POSITION_PRECEDING = 0x02;
// const DOCUMENT_POSITION_FOLLOWING = 0x04;
// const DOCUMENT_POSITION_CONTAINS = 0x08;
// const DOCUMENT_POSITION_CONTAINED_BY = 0x10;
// const DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC = 0x20;

/**
 * @internal
 */
export const getCurrentDocument = (node: Element): Document =>
  node.ownerDocument;

/**
 * @internal
 */
export const getDOMSelection = (element: Element): Selection => {
  // TODO support ShadowRoot
  return getCurrentDocument(element).getSelection()!;
};

/**
 * @internal
 */
export const getSelectionRangeInEditor = (
  selection: Selection,
  root: Element,
): Range | void => {
  if (selection.rangeCount) {
    const range = selection.getRangeAt(0);
    if (root.contains(range.commonAncestorContainer)) {
      return range;
    }
  }
};

const setRangeToSelection = (
  root: Element,
  range: Range,
  backward?: boolean,
) => {
  const selection = getDOMSelection(root);
  selection.removeAllRanges();
  selection.addRange(range);
  if (backward) {
    selection.collapseToEnd();
    selection.extend(range.startContainer, range.startOffset);
  }
};

/**
 * @internal
 */
export const setSelectionToDOM = (
  document: Document,
  root: Element,
  [anchor, focus]: SelectionSnapshot,
  config: ParserConfig,
): boolean => {
  const posDiff = comparePosition(anchor, focus);
  const isCollapsed = posDiff === 0;
  const backward = posDiff === -1;
  const start = backward ? focus : anchor;
  const end = backward ? anchor : focus;
  // special path for empty content with empty selection, necessary for placeholder
  if (
    start[0] === 0 &&
    start[1] === 0 &&
    isCollapsed &&
    !root.hasChildNodes()
  ) {
    const range = document.createRange();
    range.setStart(root, 0);
    range.setEnd(root, 0);

    setRangeToSelection(root, range);
    return true;
  }

  const domStart = findPosition(root, start, config);
  if (!domStart) {
    return false;
  }

  const domEnd = isCollapsed ? domStart : findPosition(root, end, config);
  if (!domEnd) {
    return false;
  }

  // https://w3c.github.io/contentEditable/#dfn-legal-caret-positions
  const range = document.createRange();

  const [startNode, startOffset] = domStart;
  const [endNode, endOffset] = domEnd;

  // embed or br
  if (isElementNode(startNode)) {
    if (startOffset < 1) {
      range.setStartBefore(startNode);
    } else {
      range.setStartAfter(startNode);
    }
  } else {
    range.setStart(startNode, startOffset);
  }

  // embed or br
  if (isElementNode(endNode)) {
    if (endOffset < 1) {
      range.setEndBefore(endNode);
    } else {
      range.setEndAfter(endNode);
    }
  } else {
    range.setEnd(endNode, endOffset);
  }

  setRangeToSelection(root, range, backward);
  return true;
};

type DOMPosition = [node: Text | Element, offsetAtNode: number];

const findPosition = (
  root: Element,
  [line, offset]: Position,
  config: ParserConfig,
): DOMPosition | undefined => {
  return parse(
    (next): DOMPosition | undefined => {
      let type: TokenType | void;
      let isBlockVisited = false;
      while ((type = next())) {
        if (type === TOKEN_BLOCK) {
          if (!isBlockVisited) {
            isBlockVisited = true;
            if (line !== 0) {
              moveToBlock(line);
            }
          }
        } else {
          const length = getNodeSize();
          if (offset <= length) {
            return [getDomNode(), offset];
          }
          offset -= length;
        }
      }
      return;
    },
    root,
    config,
  );
};

const findClosestBlockNode = (root: Element, startNode: Node): Element => {
  let temp: Element = startNode as Element;
  while (true) {
    const parent = temp.parentElement!;
    if (parent === root) {
      break;
    }
    temp = parent;
  }
  return temp;
};

const indexOf = (node: Element): number => {
  let i = 0;
  while ((node = node.previousElementSibling!)) {
    i++;
  }
  return i;
};

const serializePosition = (
  root: Element,
  node: Node,
  offsetAtNode: number,
  config: ParserConfig,
): Position => {
  let row: Element;
  let lineIndex: number;
  let excludeEnd = true;
  if (root === node && !node.hasChildNodes()) {
    // for placeholder
    return [0, 0];
  }

  if (isElementNode(node) && !isVoidNode(node) && node.hasChildNodes()) {
    // If start/end of Range is not selectable node, it will have offset relative to its parent
    //      0  1       2               3
    // <div>aaaa<img /><span>bbbb</span></div>
    //
    // And there are other possible cases:
    // - Selection with Ctrl+A in Firefox
    // - getTargetRanges() when deleting contenteditable:false in Firefox
    const index = min(offsetAtNode, node.childNodes.length - 1);
    node = node.childNodes[index]!;
    excludeEnd = index === offsetAtNode;
    offsetAtNode = 0;
  }

  const maybeBlock = findClosestBlockNode(root, node);
  if (config._isBlock(maybeBlock)) {
    row = maybeBlock;
    lineIndex = indexOf(row);
  } else {
    row = root;
    lineIndex = 0;
  }

  return parse(
    (next) => {
      let type: TokenType | void;
      let offset = 0;
      while ((type = next())) {
        if (type === TOKEN_SOFT_BREAK) {
          lineIndex++;
          offset = 0;
        } else {
          offset += getNodeSize();
        }
      }
      return [lineIndex, offset + offsetAtNode];
    },
    row,
    config,
    { _endNode: node, _excludeEnd: excludeEnd },
  );
};

/**
 * @internal
 */
export const serializeRange = (
  root: Element,
  config: ParserConfig,
  { startOffset, startContainer, endOffset, endContainer }: AbstractRange,
): PositionRange => {
  const start = serializePosition(root, startContainer, startOffset, config);
  return [
    start,
    startContainer === endContainer && startOffset === endOffset
      ? start
      : serializePosition(root, endContainer, endOffset, config),
  ];
};

/**
 * @internal
 */
export const getEmptySelectionSnapshot = (): SelectionSnapshot => {
  return [
    [0, 0],
    [0, 0],
  ];
};

const compareDomPosition = (a: Node, b: Node) => a.compareDocumentPosition(b);

/**
 * @internal
 */
export const takeSelectionSnapshot = (
  root: Element,
  config: ParserConfig,
): SelectionSnapshot => {
  const selection = getDOMSelection(root);
  const domRange = getSelectionRangeInEditor(selection, root);
  if (!domRange) {
    return getEmptySelectionSnapshot();
  }

  const range = serializeRange(root, config, domRange);

  return (
    // https://stackoverflow.com/questions/9180405/detect-direction-of-user-selection-with-javascript
    (
      selection.anchorNode === selection.focusNode
        ? selection.anchorOffset > selection.focusOffset
        : (compareDomPosition(selection.anchorNode!, selection.focusNode!) &
            DOCUMENT_POSITION_PRECEDING) !==
          0
    )
      ? [range[1], range[0]]
      : range
  );
};

/**
 * @internal
 */
export const readDom = (
  root: Node,
  config: ParserConfig,
  serializeVoid: (node: Element) => DocNode | void,
): Fragment => {
  return parse(
    (next) => {
      let type: TokenType | void;
      let row: DocNode[] | null = null;
      let text = "";
      let hasContent = false;

      const rows: DocNode[][] = [];

      const completeText = () => {
        if (text) {
          if (!row) {
            row = [];
          }
          row.push({ text });
          text = "";
        }
      };
      const completeRow = () => {
        completeText();
        if (!row && hasContent) {
          row = [];
        }
        if (row) {
          rows.push(row);
        }
        row = null;
        hasContent = false;
      };

      while ((type = next())) {
        if (type === TOKEN_BLOCK) {
          completeRow();
        } else {
          hasContent = true;

          if (type === TOKEN_TEXT) {
            text += getDomNode<typeof type>().data;
          } else if (type === TOKEN_VOID) {
            completeText();
            const docNode = serializeVoid(getDomNode<typeof type>());
            if (docNode) {
              row!.push(docNode);
            }
          } else if (type === TOKEN_SOFT_BREAK) {
            completeRow();
          }
        }
      }
      completeRow();

      if (!rows.length) {
        rows.push([]);
      }

      return rows;
    },
    root,
    config,
  );
};

/**
 * @internal
 */
export const getPointedCaretPosition = (
  document: Document,
  root: Element,
  { clientX, clientY }: MouseEvent,
  config: ParserConfig,
): Position | void => {
  // https://developer.mozilla.org/en-US/docs/Web/API/Document/caretPositionFromPoint
  // https://developer.mozilla.org/en-US/docs/Web/API/Document/caretRangeFromPoint
  //          caretPositionFromPoint caretRangeFromPoint
  // Chrome:  128                    4
  // Firefox: 20                     -
  // Safari:  -                      5
  if (document.caretPositionFromPoint) {
    const position = document.caretPositionFromPoint(clientX, clientY);
    if (position) {
      return serializePosition(
        root,
        position.offsetNode,
        position.offset,
        config,
      );
    }
  } else if (document.caretRangeFromPoint) {
    const range = document.caretRangeFromPoint(clientX, clientY);
    if (range) {
      return serializePosition(
        root,
        range.startContainer,
        range.startOffset,
        config,
      );
    }
  }
};
