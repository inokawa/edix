import {
  TokenType,
  parse,
  getNodeSize,
  getDomNode,
  isElementNode,
  TOKEN_TEXT,
  TOKEN_VOID,
  TOKEN_SOFT_BREAK,
  TOKEN_HARD_BREAK,
  ParserConfig,
  isTextNode,
} from "./parser";
import { comparePosition } from "../position";
import {
  DocFragment,
  Position,
  NodeData,
  SelectionSnapshot,
  NODE_TEXT,
  NODE_VOID,
} from "../types";
import { min } from "../utils";

export { defaultIsBlockNode } from "./parser";

// const DOCUMENT_POSITION_DISCONNECTED = 0x01;
const DOCUMENT_POSITION_PRECEDING = 0x02;
const DOCUMENT_POSITION_FOLLOWING = 0x04;
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
  [anchor, focus]: SelectionSnapshot,
  isSingleline: boolean,
  config: ParserConfig
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

  const domStart = findPosition(root, start, isSingleline, config);
  if (!domStart) {
    return false;
  }

  const domEnd = isCollapsed
    ? domStart
    : findPosition(root, end, isSingleline, config);
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
  root: Element,
  [line, offset]: Position,
  isSingleline: boolean,
  config: ParserConfig
): DOMPosition | void => {
  return parse(
    (next): DOMPosition | void => {
      while (next()) {
        const length = getNodeSize();
        if (offset <= length) {
          return [getDomNode(), offset];
        }
        offset -= length;
      }
    },
    isSingleline || root.childElementCount === 0 ? root : root.children[line]!,
    config
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

const serializePosition = (
  root: Element,
  targetNode: Node,
  offsetAtNode: number,
  isSingleline: boolean,
  config: ParserConfig,
  isArtifitialPosition?: boolean,
  includeEnd?: boolean
): Position => {
  let row: Node;
  let lineIndex: number;
  if (isSingleline || root.childElementCount === 0) {
    row = root;
    lineIndex = 0;
  } else {
    row = findClosestBlockNode(root, targetNode);
    lineIndex = Array.prototype.indexOf.call(root.children, row);
  }

  if (!isArtifitialPosition && isElementNode(targetNode)) {
    // If anchor/focus of selection is not selectable node, it will have offset relative to its parent
    //      0  1       2               3
    // <div>aaaa<img /><span>bbbb</span></div>
    targetNode = targetNode.childNodes[offsetAtNode]!;
    offsetAtNode = 0;
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
    { _endNode: targetNode, _excludeEnd: !includeEnd }
  );
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
  isSingleline: boolean,
  config: ParserConfig
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
      : (compareDomPosition(selection.anchorNode!, selection.focusNode!) &
          DOCUMENT_POSITION_PRECEDING) !==
        0;

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
        root,
        root.lastElementChild!,
        root.lastElementChild!.textContent!.length,
        isSingleline,
        config
      );
    } else {
      return getEmptySelectionSnapshot();
    }
  } else {
    start = serializePosition(
      root,
      startContainer,
      startOffset,
      isSingleline,
      config
    );
    end = selection.isCollapsed
      ? start
      : serializePosition(root, endContainer, endOffset, isSingleline, config);
  }

  return [backward ? end : start, backward ? start : end];
};

type NodeRef = Element | string;

/**
 * @internal
 */
export const refToDoc = (
  nodes: readonly (readonly NodeRef[])[],
  serializeVoid: (node: Element) => Record<string, unknown> | void
): DocFragment => {
  return nodes.map((l) =>
    l.reduce((acc, n) => {
      if (typeof n === "string") {
        acc.push({ type: NODE_TEXT, text: n });
      } else {
        const data = serializeVoid(n);
        if (data) {
          acc.push({ type: NODE_VOID, data });
        }
      }
      return acc;
    }, [] as NodeData[])
  );
};

/**
 * @internal
 */
export const readDom = (
  root: Node,
  config: ParserConfig,
  range?: { _startNode: Node; _endNode: Node }
): NodeRef[][] => {
  return parse(
    (next) => {
      let type: TokenType | void;
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

      while ((type = next())) {
        if (type === TOKEN_TEXT) {
          text += getDomNode<typeof type>().data;
        } else if (type === TOKEN_VOID) {
          completeNode(getDomNode<typeof type>());
        } else if (type === TOKEN_SOFT_BREAK || type === TOKEN_HARD_BREAK) {
          completeRow();
        }
      }
      completeRow();

      return rows;
    },
    root,
    config,
    range
  );
};

const findAnchorableChild = (
  config: ParserConfig,
  root: Node,
  node: Node,
  last?: boolean
): Node | void => {
  return parse(
    (next) => {
      let child: Node | undefined;
      let type: TokenType | void;
      while ((type = next())) {
        if (type !== TOKEN_HARD_BREAK) {
          child = getDomNode<typeof type>();
          if (!last) {
            break;
          }
        }
      }
      return child;
    },
    root,
    config,
    { _startNode: node, _endNode: node }
  );
};

/**
 * @internal
 */
export const detectMutationRange = (
  root: Element,
  nodes: Set<Node>,
  config: ParserConfig
): [Node, Node, boolean] | undefined => {
  let start: Node | undefined;
  let end: Node | undefined;
  for (const n of nodes) {
    if (n.isConnected && (isTextNode(n) || isElementNode(n))) {
      if (
        !start ||
        compareDomPosition(start, n) & DOCUMENT_POSITION_PRECEDING
      ) {
        start = n;
      }
      if (!end || compareDomPosition(end, n) & DOCUMENT_POSITION_FOLLOWING) {
        end = n;
      }
    }
  }

  if (!start || !end) {
    return;
  }
  const startBlock = findClosestBlockNode(root, start);

  const firstChild = findAnchorableChild(config, root, start);
  const lastChild = findAnchorableChild(config, root, end, true);
  if (!firstChild || !lastChild) {
    return;
  }
  return [
    firstChild,
    lastChild,
    startBlock === start && config._isBlock(startBlock),
  ];
};

/**
 * @internal
 */
export const domToRange = (
  root: Element,
  isSingleline: boolean,
  config: ParserConfig,
  startNode: Node,
  endNode: Node
): [Position, Position] => {
  return [
    serializePosition(root, startNode, 0, isSingleline, config, true),
    serializePosition(
      root,
      endNode,
      0, // TODO unused
      isSingleline,
      config,
      true,
      true
    ),
  ];
};

/**
 * @internal
 */
export const readDocAll = (
  root: Node,
  config: ParserConfig,
  serializeVoid: (node: Element) => Record<string, unknown> | void
): DocFragment => {
  return refToDoc(readDom(root, config), serializeVoid);
};

/**
 * @internal
 */
export const getSelectedElements = (root: Element): Node | undefined => {
  const range = getSelectionRangeInEditor(getDOMSelection(root), root);
  if (!range) return;
  return range.cloneContents();
};

/**
 * @internal
 */
export const getPointedCaretPosition = (
  document: Document,
  root: Element,
  { clientX, clientY }: MouseEvent,
  isSingleline: boolean,
  config: ParserConfig
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
        isSingleline,
        config
      );
    }
  } else if (document.caretRangeFromPoint) {
    const range = document.caretRangeFromPoint(clientX, clientY);
    if (range) {
      return serializePosition(
        root,
        range.startContainer,
        range.startOffset,
        isSingleline,
        config
      );
    }
  }
};
