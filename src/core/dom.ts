import { Point, SelectionSnapshot } from "./types";
import { min } from "./utils";

const ELEMENT_NODE = 1;
const TEXT_NODE = 3;

// const DOCUMENT_POSITION_DISCONNECTED = 0x01;
const DOCUMENT_POSITION_PRECEDING = 0x02;
// const DOCUMENT_POSITION_FOLLOWING = 0x04;
// const DOCUMENT_POSITION_CONTAINS = 0x08;
// const DOCUMENT_POSITION_CONTAINED_BY = 0x10;
// const DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC = 0x20;

const SHOW_ELEMENT = 0x1;
const SHOW_TEXT = 0x4;

const BR_TAG_NAME = "BR";
const TEMPLATE_TAG_NAME = "TEMPLATE";

const isBrInText = (node: Element): boolean => {
  if (node.tagName !== BR_TAG_NAME) {
    return false;
  }
  // unexpected br may be inserted expecially with paste in firefox
  let hasTextPrev = false;
  let hasTextNext = false;
  let prev: Node = node;
  while ((prev = prev.previousSibling!)) {
    if (isTextNode(prev)) {
      hasTextPrev = true;
      break;
    } else if (isElementNode(prev)) {
      if (prev.tagName !== TEMPLATE_TAG_NAME) {
        return false;
      }
    }
  }
  let next: Node = node;
  while ((next = next.nextSibling!)) {
    if (isTextNode(next)) {
      hasTextNext = true;
      break;
    } else if (isElementNode(next)) {
      if (next.tagName !== TEMPLATE_TAG_NAME) {
        return false;
      }
    }
  }
  return hasTextPrev && hasTextNext;
};

/**
 * @internal
 */
export const getCurrentDocument = (node: Element): Document =>
  node.ownerDocument;

const isTextNode = (node: Node): node is Text => {
  return node.nodeType === TEXT_NODE;
};

const isElementNode = (node: Node): node is Element => {
  return node.nodeType === ELEMENT_NODE;
};

// https://w3c.github.io/editing/docs/execCommand/#single-line-container
const SINGLE_LINE_CONTAINER_TAG_NAMES = new Set([
  // non-list
  "DIV",
  "H1",
  "H2",
  "H3",
  "H4",
  "H5",
  "H6",
  // "LISTING",
  "P",
  "PRE",
  // "XMP",
  // list
  "LI",
  "DT",
  "DD",
]);

/**
 * @internal
 */
export const getDOMSelection = (element: Element): Selection => {
  // TODO support ShadowRoot
  return getCurrentDocument(element).getSelection()!;
};

const getSelectionRangeInEditor = (
  selection: Selection,
  root: Element
): Range | undefined => {
  if (!selection.rangeCount) {
    return;
  }
  const range = selection.getRangeAt(0);
  if (!root.contains(range.commonAncestorContainer)) {
    return;
  }
  return range;
};

const compareDocumentPosition = (node: Node, otherNode: Node) =>
  node.compareDocumentPosition(otherNode);

const findNextNode = (
  walker: TreeWalker,
  skipChildren: boolean
): Node | null => {
  if (skipChildren) {
    const current = walker.currentNode;
    let node: Node | null;
    // don't use TreeWalker.nextSibling() to support case like <body><p><a><img /></a></p><p>hello</p></body>
    while ((node = walker.nextNode())) {
      if (!current.contains(node)) {
        break;
      }
    }
    return node;
  }

  return walker.nextNode();
};

/**
 * @internal
 */
export const setSelectionToDOM = (
  document: Document,
  root: Element,
  snapshot: SelectionSnapshot,
  isCustomNode: (node: Element) => boolean,
  isSingleline: boolean
): boolean => {
  const { start, end, backward } = snapshot;

  // special path for empty content with empty selection, necessary for placeholder
  if (
    start[0] === 0 &&
    start[1] === 0 &&
    start[0] === end[0] &&
    start[1] === end[1] &&
    !root.hasChildNodes()
  ) {
    const range = document.createRange();
    range.setStart(root, 0);
    range.setEnd(root, 0);

    return true;
  }

  const domStart = findBoundaryPoint(
    document,
    root,
    start,
    isCustomNode,
    isSingleline
  );
  if (!domStart) {
    return false;
  }

  const domEnd = findBoundaryPoint(
    document,
    root,
    end,
    isCustomNode,
    isSingleline
  );
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

  const selection = getDOMSelection(root);

  selection.removeAllRanges();
  selection.addRange(range);
  if (backward) {
    selection.collapseToEnd();
    selection.extend(range.startContainer, range.startOffset);
  }
  return true;
};

const findBoundaryPoint = (
  document: Document,
  root: Element,
  [line, targetOffset]: Point,
  isCustomNode: (node: Element) => boolean,
  isSingleline: boolean
): [node: Text | Element, offsetAtNode: number] | undefined => {
  let offset = 0;
  let node: Node | null;
  let skipChildren = false;

  const row =
    isSingleline || root.childElementCount === 0 ? root : root.children[line]!;
  const walker = document.createTreeWalker(row, SHOW_TEXT | SHOW_ELEMENT);

  while ((node = findNextNode(walker, skipChildren))) {
    skipChildren = false;
    if (isTextNode(node)) {
      const textLength = node.data.length;
      if (offset + textLength >= targetOffset) {
        return [node, targetOffset - offset];
      }

      offset += textLength;
    } else if (isElementNode(node)) {
      if (node.tagName === BR_TAG_NAME) {
        if (offset + 1 >= targetOffset) {
          return [node, 0];
        }

        offset++;
      } else if (isCustomNode(node)) {
        skipChildren = true;
        if (offset + 1 >= targetOffset) {
          return [node, targetOffset - offset];
        }
        offset++;
      }
    }
  }
  return;
};

// https://stackoverflow.com/questions/9180405/detect-direction-of-user-selection-with-javascript
const isSelectionBackward = (selection: Selection): boolean => {
  const position = compareDocumentPosition(
    selection.anchorNode!,
    selection.focusNode!
  );
  // position == 0 if nodes are the same
  return position === 0
    ? selection.anchorOffset > selection.focusOffset
    : (position & DOCUMENT_POSITION_PRECEDING) !== 0;
};

const serializeBoundaryPoint = (
  document: Document,
  root: Element,
  targetNode: Node,
  offsetAtNode: number,
  isCustomNode: (node: Element) => boolean,
  isSingleline: boolean
): Point => {
  let row: Node = targetNode;
  let lineIndex: number;
  if (isSingleline || root.childElementCount === 0) {
    row = root;
    lineIndex = 0;
  } else {
    while (row.parentNode !== root) {
      row = row.parentNode!;
    }
    lineIndex = Array.prototype.indexOf.call(root.children, row);
  }
  let offset = 0;
  let node: Node | null;
  let skipChildren = false;

  const isTargetEmbed = !isTextNode(targetNode);
  if (isTargetEmbed) {
    // If anchor/focus of selection is not selectable node, it will have offset relative to its parent
    targetNode = targetNode.childNodes[offsetAtNode]!;
  }

  const walker = document.createTreeWalker(row, SHOW_TEXT | SHOW_ELEMENT);

  while ((node = findNextNode(walker, skipChildren))) {
    skipChildren = false;
    if (node === targetNode) {
      offset += isTargetEmbed ? 0 : offsetAtNode;
      break;
    }
    if (isTextNode(node)) {
      offset += node.data.length;
    } else if (isElementNode(node)) {
      if (isBrInText(node)) {
        lineIndex++;
        offset = 0;
      } else if (isCustomNode(node)) {
        skipChildren = true;
        offset++;
      }
    }
  }
  return [lineIndex, offset];
};

/**
 * @internal
 */
export const getEmptySelectionSnapshot = (): SelectionSnapshot => {
  return { start: [0, 0], end: [0, 0], backward: false };
};

/**
 * @internal
 */
export const getSelectionSnapshot = (
  document: Document,
  root: Element,
  isCustomNode: (node: Element) => boolean,
  isSingleline: boolean
): SelectionSnapshot => {
  const selection = getDOMSelection(root);
  const range = getSelectionRangeInEditor(selection, root);
  if (!range) {
    return getEmptySelectionSnapshot();
  }

  let start: Point;
  let end: Point;
  if (root === range.startContainer) {
    if (
      range.startOffset === 0 &&
      range.endOffset !== 0 &&
      root.children.length <= range.endOffset
    ) {
      // special case for Ctrl+A in firefox
      start = [0, 0];
      end = serializeBoundaryPoint(
        document,
        root,
        root.lastElementChild!,
        root.lastElementChild!.textContent!.length,
        isCustomNode,
        isSingleline
      );
    } else {
      return getEmptySelectionSnapshot();
    }
  } else {
    start = serializeBoundaryPoint(
      document,
      root,
      range.startContainer,
      range.startOffset,
      isCustomNode,
      isSingleline
    );
    end = serializeBoundaryPoint(
      document,
      root,
      range.endContainer,
      range.endOffset,
      isCustomNode,
      isSingleline
    );
  }

  return {
    start,
    end,
    backward: isSelectionBackward(selection),
  };
};

/**
 * @internal
 */
export const serializeDOM = (
  document: Document,
  root: Node,
  serializeCustomNode: (node: Element) => string | undefined
): string[] => {
  const rows: string[] = [];
  const walker = document.createTreeWalker(root, SHOW_TEXT | SHOW_ELEMENT);

  const completeRow = () => {
    rows.push(text);
    text = "";
  };

  let node: Node | null;
  let text = "";
  let isFirstLine = true;
  let skipChildren = false;
  while ((node = findNextNode(walker, skipChildren))) {
    skipChildren = false;
    if (isTextNode(node)) {
      text += node.data;
    } else if (isElementNode(node)) {
      if (
        SINGLE_LINE_CONTAINER_TAG_NAMES.has(node.tagName) &&
        node.parentNode === root
      ) {
        // row
        if (!isFirstLine) {
          completeRow();
        }
        isFirstLine = false;
      } else {
        if (isBrInText(node)) {
          completeRow();
        } else {
          const data = serializeCustomNode(node);
          if (data != null) {
            skipChildren = true;
            text += data;
          }
        }
      }
    }
  }
  completeRow();

  return rows;
};

/**
 * @internal
 */
export const getSelectedElements = (root: Element): Node | undefined => {
  const range = getSelectionRangeInEditor(getDOMSelection(root), root);
  if (!range) return;
  return range.cloneContents();
};
