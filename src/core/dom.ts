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

type Point = readonly [line: number, offset: number];

export interface SelectionSnapshot {
  readonly start: Point;
  readonly end: Point;
  readonly backward: boolean;
}

/**
 * @internal
 */
export const getCurrentDocument = (node: HTMLElement): Document =>
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
export const getDOMSelection = (element: HTMLElement): Selection => {
  // TODO support ShadowRoot
  return getCurrentDocument(element).getSelection()!;
};

const getSelectionRangeInEditor = (
  selection: Selection,
  root: HTMLElement
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

/**
 * @internal
 */
export const setSelectionToDOM = (
  document: Document,
  root: HTMLElement,
  snapshot: SelectionSnapshot,
  isCustomNode: (node: Element) => boolean
): boolean => {
  const {
    start: [startLine, startOffset],
    end: [endLine, endOffset],
    backward,
  } = snapshot;

  const domStart = findBoundaryPoint(
    document,
    root.children[startLine]!,
    startOffset,
    isCustomNode
  );
  if (!domStart) {
    return false;
  }

  const domEnd = findBoundaryPoint(
    document,
    root.children[endLine]!,
    endOffset,
    isCustomNode
  );
  if (!domEnd) {
    return false;
  }

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
  root: Node,
  targetOffset: number,
  isCustomNode: (node: Element) => boolean
): [node: Text | Element, offsetAtNode: number] | undefined => {
  let offset = 0;
  let node: Node | null;
  let isCustom = false;

  const iterator = document.createTreeWalker(root, SHOW_TEXT | SHOW_ELEMENT);

  while ((node = isCustom ? iterator.nextSibling() : iterator.nextNode())) {
    isCustom = false;
    if (isTextNode(node)) {
      const textLength = node.data.length;
      if (offset + textLength >= targetOffset) {
        return [node, targetOffset - offset];
      }

      offset += textLength;
    } else if (isElementNode(node)) {
      if (isCustomNode(node)) {
        isCustom = true;
        if (offset + 1 >= targetOffset) {
          return [node, targetOffset - offset];
        }
        offset++;
      } else if (node.tagName === BR_TAG_NAME) {
        if (offset + 1 >= targetOffset) {
          return [node, 0];
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
  root: HTMLElement,
  targetNode: Node,
  offsetAtNode: number,
  isCustomNode: (node: Element) => boolean
): Point => {
  let row: Node = targetNode;
  let lineIndex: number;
  if (root.childElementCount === 0) {
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
  let isCustom = false;

  const isTargetEmbed = !isTextNode(targetNode);
  if (isTargetEmbed) {
    targetNode = targetNode.childNodes[offsetAtNode]!;
  }

  const iterator = document.createTreeWalker(row, SHOW_TEXT | SHOW_ELEMENT);

  while ((node = isCustom ? iterator.nextSibling() : iterator.nextNode())) {
    isCustom = false;
    if (node === targetNode) {
      offset += isTargetEmbed ? 0 : offsetAtNode;
      break;
    }
    if (isTextNode(node)) {
      offset += node.data.length;
    } else if (isElementNode(node)) {
      if (isCustomNode(node)) {
        isCustom = true;
        offset++;
      } else if (isBrInText(node)) {
        lineIndex++;
        offset = 0;
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
  root: HTMLElement,
  isCustomNode: (node: Element) => boolean
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
      start = [0, 0];
      end = serializeBoundaryPoint(
        document,
        root,
        root.lastElementChild!,
        root.lastElementChild!.textContent!.length,
        isCustomNode
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
      isCustomNode
    );
    end = serializeBoundaryPoint(
      document,
      root,
      range.endContainer,
      range.endOffset,
      isCustomNode
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
): string => {
  const iterator = document.createTreeWalker(root, SHOW_TEXT | SHOW_ELEMENT);

  let node: Node | null;
  let text = "";
  let lineIndex = 0;
  let skipChildren = false;
  while ((node = skipChildren ? iterator.nextSibling() : iterator.nextNode())) {
    skipChildren = false;
    if (isTextNode(node)) {
      text += node.data;
    } else if (isElementNode(node)) {
      if (
        SINGLE_LINE_CONTAINER_TAG_NAMES.has(node.tagName) &&
        node.parentNode === root
      ) {
        if (lineIndex !== 0) {
          text += "\n";
        }
        lineIndex++;
      } else {
        const data = serializeCustomNode(node);
        if (typeof data !== "undefined") {
          skipChildren = true;
          text += data;
        } else if (isBrInText(node)) {
          text += "\n";
        }
      }
    }
  }
  return text;
};

/**
 * @internal
 */
export const serializeSelectedDOM = (
  document: Document,
  root: HTMLElement,
  serializeCustomNode: (node: Element) => string | undefined
): string | undefined => {
  const range = getSelectionRangeInEditor(getDOMSelection(root), root);
  if (!range) return;
  return serializeDOM(document, range.cloneContents(), serializeCustomNode);
};
