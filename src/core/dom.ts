import { isBackward, isSamePosition } from "./position";
import { DomSnapshot, Position, NodeRef, SelectionSnapshot } from "./types";
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

const isBrInText = (node: Element, isExternalHtml?: boolean): boolean => {
  if (node.tagName !== BR_TAG_NAME) {
    return false;
  }
  if (isExternalHtml) {
    return true;
  }
  // TODO revisit here
  // unexpected br may be detected in some case, because of contenteditable
  // - type in empty row in firefox (e.g. <div>a<br/></div>)
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

const PARAGRAPH_TAG_NAMES = new Set([
  // https://w3c.github.io/editing/docs/execCommand/#single-line-container
  // non-list single-line container
  "DIV",
  "H1",
  "H2",
  "H3",
  "H4",
  "H5",
  "H6",
  "P",
  "PRE",
  // list single-line container
  "LI",
  "DT",
  "DD",

  // other elements
  "TR",
]);

const WITHOUT_TEXT_TAG_NAMES = new Set([
  // void elements
  // https://developer.mozilla.org/en-US/docs/Glossary/Void_element
  "EMBED",
  "IMG",
  // others
  "PICTURE",
  "AUDIO",
  "VIDEO",
  "MAP",
  "SVG",
  "CANVAS",
  "IFRAME",
  // TODO support more elements
]);

const isParagraphElement = (node: Element | null): boolean => {
  return !!node && PARAGRAPH_TAG_NAMES.has(node.tagName);
};

const isUneditableElement = (node: Element): boolean => {
  return (
    (node as HTMLElement).contentEditable === "false" ||
    WITHOUT_TEXT_TAG_NAMES.has(node.tagName)
  );
};

const getDOMSelection = (element: Element): Selection => {
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
  [anchor, focus]: SelectionSnapshot,
  isSingleline: boolean
): boolean => {
  const backward = isBackward(anchor, focus);
  const start = backward ? focus : anchor;
  const end = backward ? anchor : focus;
  const isCollapsed = isSamePosition(start, end);
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

  const domStart = findPosition(document, root, start, isSingleline);
  if (!domStart) {
    return false;
  }

  const domEnd = isCollapsed
    ? domStart
    : findPosition(document, root, end, isSingleline);
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

const findPosition = (
  document: Document,
  root: Element,
  [line, targetOffset]: Position,
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
      } else if (isUneditableElement(node)) {
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
  const position = selection.anchorNode!.compareDocumentPosition(
    selection.focusNode!
  );
  // position == 0 if nodes are the same
  return position === 0
    ? selection.anchorOffset > selection.focusOffset
    : (position & DOCUMENT_POSITION_PRECEDING) !== 0;
};

const serializePosition = (
  document: Document,
  root: Element,
  targetNode: Node,
  offsetAtNode: number,
  isSingleline: boolean
): Position => {
  let offset = 0;
  let node: Node | null;
  let skipChildren = false;

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

  const isTargetElement = isElementNode(targetNode);
  if (isTargetElement) {
    // If anchor/focus of selection is not selectable node, it will have offset relative to its parent
    //      0  1       2               3
    // <div>aaaa<img /><span>bbbb</span></div>
    targetNode = targetNode.childNodes[offsetAtNode]!;
  }

  const walker = document.createTreeWalker(row, SHOW_TEXT | SHOW_ELEMENT);

  while ((node = findNextNode(walker, skipChildren))) {
    skipChildren = false;
    if (node === targetNode) {
      offset += isTargetElement ? 0 : offsetAtNode;
      break;
    }
    if (isTextNode(node)) {
      offset += node.data.length;
    } else if (isElementNode(node)) {
      if (isBrInText(node)) {
        lineIndex++;
        offset = 0;
      } else if (isUneditableElement(node)) {
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
  return [
    [0, 0],
    [0, 0],
  ];
};

/**
 * @internal
 */
export const takeSelectionSnapshot = (
  document: Document,
  root: Element,
  isSingleline: boolean
): SelectionSnapshot => {
  const selection = getDOMSelection(root);
  const range = getSelectionRangeInEditor(selection, root);
  if (!range) {
    return getEmptySelectionSnapshot();
  }

  const backward = isSelectionBackward(selection);
  const { startOffset, startContainer, endOffset, endContainer } = range;

  let start: Position;
  let end: Position;
  if (root === startContainer && !isSingleline) {
    if (
      startOffset === 0 &&
      endOffset !== 0 &&
      root.children.length <= endOffset
    ) {
      // special case for Ctrl+A in firefox
      start = [0, 0];
      end = serializePosition(
        document,
        root,
        root.lastElementChild!,
        root.lastElementChild!.textContent!.length,
        isSingleline
      );
    } else {
      return getEmptySelectionSnapshot();
    }
  } else {
    start = serializePosition(
      document,
      root,
      startContainer,
      startOffset,
      isSingleline
    );
    end = selection.isCollapsed
      ? start
      : serializePosition(
          document,
          root,
          endContainer,
          endOffset,
          isSingleline
        );
  }

  return [backward ? end : start, backward ? start : end];
};

/**
 * @internal
 */
export const takeDomSnapshot = (
  document: Document,
  root: Node,
  isExternalHtml?: boolean
): DomSnapshot => {
  let node: Node | null;
  let row: NodeRef[] | null = null;
  let text = "";
  let skipChildren = false;

  const rows: NodeRef[][] = [];
  const walker = document.createTreeWalker(root, SHOW_TEXT | SHOW_ELEMENT);

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

  while ((node = findNextNode(walker, skipChildren))) {
    skipChildren = false;
    if (isTextNode(node)) {
      text += node.data;
    } else if (isElementNode(node)) {
      // a block next to block, or br
      if (
        (isParagraphElement(node) &&
          isParagraphElement(node.previousElementSibling)) ||
        isBrInText(node, isExternalHtml)
      ) {
        completeRow();
      } else if (isUneditableElement(node)) {
        skipChildren = true;
        completeNode(node);
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
