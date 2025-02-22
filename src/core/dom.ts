import {
  NodeType,
  parse,
  getNodeSize,
  getDomNode,
  isElementNode,
  TYPE_TEXT,
  TYPE_VOID,
  TYPE_SOFT_BREAK,
  TYPE_BLOCK,
  isTextNode,
  moveToBlock,
} from "./parser";
import { comparePosition } from "./position";
import { DomSnapshot, Position, NodeRef, SelectionSnapshot } from "./types";
import { min } from "./utils";

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

const getDOMSelection = (element: Element): Selection => {
  // TODO support ShadowRoot
  return getCurrentDocument(element).getSelection()!;
};

const getSelectionRangeInEditor = (
  selection: Selection,
  root: Element
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
  backward?: boolean
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
  [anchor, focus]: SelectionSnapshot
): boolean => {
  const posDiff = comparePosition(anchor, focus);
  const isCollapsed = posDiff === 0;
  const backward = posDiff === -1;
  const start = backward ? focus : anchor;
  const end = backward ? anchor : focus;
  // special path for empty content with empty selection, necessary for placeholder
  if (
    start[0].length === 0 &&
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

  const domStart = findPosition(document, root, start);
  if (!domStart) {
    return false;
  }

  const domEnd = isCollapsed ? domStart : findPosition(document, root, end);
  if (!domEnd) {
    return false;
  }

  // https://w3c.github.io/contentEditable/#dfn-legal-caret-positions
  const range = document.createRange();
  {
    const [node, offset] = domStart;
    // embed or br
    if (isElementNode(node)) {
      if (offset < 1) {
        range.setStartBefore(node);
      } else {
        range.setStartAfter(node);
      }
    } else {
      range.setStart(node, min(offset, node.data.length));
    }
  }
  {
    const [node, offset] = domEnd;
    // embed or br
    if (isElementNode(node)) {
      if (offset < 1) {
        range.setEndBefore(node);
      } else {
        range.setEndAfter(node);
      }
    } else {
      range.setEnd(node, min(offset, node.data.length));
    }
  }

  setRangeToSelection(root, range, backward);
  return true;
};

type DOMPosition = [node: Text | Element, offsetAtNode: number];

const findPosition = (
  document: Document,
  root: Element,
  [path, offset]: Position
): DOMPosition | void => {
  let pathIndex = 0;
  let type: NodeType | void;
  return parse(
    (readNext): DOMPosition | void => {
      while ((type = readNext())) {
        if (type === TYPE_BLOCK) {
          if (pathIndex < path.length) {
            moveToBlock(path[pathIndex]!);
            pathIndex++;
          }
        } else {
          const length = getNodeSize();
          if (offset <= length) {
            return [getDomNode(), offset];
          }
          offset -= length;
        }
      }
    },
    document,
    root
  );
};

const serializePosition = (
  document: Document,
  root: Element,
  targetNode: Node,
  offsetAtNode: number
): Position => {
  let node: Node | null = targetNode;

  if (isElementNode(targetNode)) {
    if (targetNode.childNodes.length <= offsetAtNode) {
      // special path for root selection
      if (offsetAtNode === 0) {
        // empty content (placeholder)
      } else {
        // void node at line end
        // Ctrl+A in firefox
        let n: Node | null = targetNode;
        while ((n = n.lastChild)) {
          targetNode = n;
        }
        offsetAtNode = isTextNode(targetNode) ? targetNode.data.length : 1;
      }
    } else {
      // If anchor/focus of selection is not selectable node, it will have offset relative to its parent
      //      0  1       2               3
      // <div>aaaa<img /><span>bbbb</span></div>
      targetNode = targetNode.childNodes[offsetAtNode]!;
      offsetAtNode = 0;
    }
  }

  const walker = document.createTreeWalker(
    root,
    NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT
  );
  walker.currentNode = targetNode;

  let offset = 0;

  let shouldSkipSiblings = false;

  function indexOfBlock(node: Element): number {
    let index = 0;
    while ((node = node.previousElementSibling!)) {
      index++;
    }

    return index;
  }

  const path: number[] = [];
  while (
    (node = shouldSkipSiblings ? walker.parentNode() : walker.previousNode()) &&
    node !== root
  ) {
    shouldSkipSiblings = false;
    if (isTextNode(node)) {
      offset += node.data.length;
    } else if (isElementNode(node)) {
      // TODO improve
      if (node.tagName === "DIV") {
        shouldSkipSiblings = true;
        path.unshift(indexOfBlock(node));
      } else if (node.tagName === "IMG") {
        // TODO support void(embed?) node
        offset++;
      }
    }
  }

  return [path, offset + offsetAtNode];
};

/**
 * @internal
 */
export const getEmptySelectionSnapshot = (): SelectionSnapshot => {
  return [
    [[], 0],
    [[], 0],
  ];
};

/**
 * @internal
 */
export const takeSelectionSnapshot = (
  document: Document,
  root: Element
): SelectionSnapshot => {
  const selection = getDOMSelection(root);
  const range = getSelectionRangeInEditor(selection, root);
  if (!range) {
    return getEmptySelectionSnapshot();
  }

  const { startOffset, startContainer, endOffset, endContainer } = range;

  // https://stackoverflow.com/questions/9180405/detect-direction-of-user-selection-with-javascript
  const backward =
    startContainer === endContainer
      ? selection.anchorOffset > selection.focusOffset
      : (selection.anchorNode!.compareDocumentPosition(selection.focusNode!) &
          DOCUMENT_POSITION_PRECEDING) !==
        0;

  const start = serializePosition(document, root, startContainer, startOffset);
  const end = selection.isCollapsed
    ? start
    : serializePosition(document, root, endContainer, endOffset);

  return [backward ? end : start, backward ? start : end];
};

/**
 * @internal
 */
export const takeDomSnapshot = (
  document: Document,
  root: Node
): DomSnapshot => {
  return parse(
    (readNext) => {
      let type: NodeType | void;
      let row: NodeRef[] | null = null;
      let text = "";

      const rows: NodeRef[][] = [];

      const completeNode = (element?: Element) => {
        if (!row) {
          row = [];
        }
        if (text) {
          row.push(text);
          text = "";
        }
        if (element) {
          row.push(element);
        }
      };
      const completeRow = () => {
        completeNode();
        if (row) {
          rows.push(row);
        }
        row = null;
      };

      while ((type = readNext())) {
        if (type === TYPE_TEXT) {
          text += getDomNode<typeof type>().data;
        } else if (type === TYPE_VOID) {
          completeNode(getDomNode<typeof type>());
        } else if (type === TYPE_SOFT_BREAK) {
          completeRow();
        } else if (type === TYPE_BLOCK) {
          const prev = getDomNode<typeof type>().previousElementSibling;
          // TODO improve
          if (prev && prev.tagName === "DIV") {
            completeRow();
          }
        }
      }
      completeRow();

      return rows;
    },
    document,
    root
  );
};

/**
 * @internal
 */
export const getSelectedElements = (root: Element): Node | undefined => {
  const range = getSelectionRangeInEditor(getDOMSelection(root), root);
  if (!range) return;
  return range.cloneContents();
};
