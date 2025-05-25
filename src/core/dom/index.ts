import {
  TokenType,
  parse,
  getNodeSize,
  getDomNode,
  isElementNode,
  TOKEN_TEXT,
  TOKEN_VOID,
  TOKEN_SOFT_BREAK,
  TOKEN_BLOCK,
  ParserConfig,
  isTextNode,
} from "./parser";
import { comparePosition } from "../doc/position";
import {
  DocFragment,
  Position,
  DocNode,
  SelectionSnapshot,
  NODE_TEXT,
  NODE_VOID,
} from "../doc/types";
import { min } from "../utils";

export { defaultIsBlockNode } from "./default";

// const DOCUMENT_POSITION_DISCONNECTED = 0x01;
const DOCUMENT_POSITION_PRECEDING = 0x02;
const DOCUMENT_POSITION_FOLLOWING = 0x04;
const DOCUMENT_POSITION_CONTAINS = 0x08;
const DOCUMENT_POSITION_CONTAINED_BY = 0x10;
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
  node: Node,
  offsetAtNode: number,
  config: ParserConfig,
  isArtifitialPosition?: boolean,
  includeEnd?: boolean
): Position => {
  let row: Node;
  let lineIndex: number;
  if (root === node) {
    if (!root.hasChildNodes()) {
      // for placeholder
      return [0, 0];
    }
    // special case for Ctrl+A in firefox
    const index = min(offsetAtNode, root.childNodes.length - 1);
    return serializePosition(
      root,
      root.childNodes[index]!,
      0,
      config,
      isArtifitialPosition,
      index !== offsetAtNode
    );
  } else {
    const maybeBlock = findClosestBlockNode(root, node);
    if (config._isBlock(maybeBlock)) {
      row = maybeBlock;
      lineIndex = Array.prototype.indexOf.call(root.children, row);
    } else {
      row = root;
      lineIndex = 0;
    }
  }

  if (!isArtifitialPosition && isElementNode(node)) {
    // If anchor/focus of selection is not selectable node, it will have offset relative to its parent
    //      0  1       2               3
    // <div>aaaa<img /><span>bbbb</span></div>
    node = node.childNodes[offsetAtNode]!;
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
    { _endNode: node, _excludeEnd: !includeEnd }
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
  config: ParserConfig
): SelectionSnapshot => {
  const selection = getDOMSelection(root);
  const range = getSelectionRangeInEditor(selection, root);
  if (!range) {
    return getEmptySelectionSnapshot();
  }

  const { startOffset, startContainer, endOffset, endContainer } = range;

  const start = serializePosition(root, startContainer, startOffset, config);
  const end =
    startContainer === endContainer && startOffset === endOffset
      ? start
      : serializePosition(root, endContainer, endOffset, config);

  return (
    // https://stackoverflow.com/questions/9180405/detect-direction-of-user-selection-with-javascript
    (
      selection.anchorNode === selection.focusNode
        ? selection.anchorOffset > selection.focusOffset
        : (compareDomPosition(selection.anchorNode!, selection.focusNode!) &
            DOCUMENT_POSITION_PRECEDING) !==
          0
    )
      ? [end, start]
      : [start, end]
  );
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
    }, [] as DocNode[])
  );
};

/**
 * @internal
 */
export const readDom = (
  root: Node,
  config: ParserConfig,
  option?: {
    _startNode?: Node;
    _endNode?: Node;
    _isStartSibling: boolean;
    _isEndSibling: boolean;
  }
): NodeRef[][] => {
  const isStartSib = option && option._isStartSibling;
  const isEndSib = option && option._isEndSibling;

  return parse(
    (next) => {
      let type: TokenType | void;
      let row: NodeRef[] | null = null;
      let text = "";
      let hasContent = false;

      const rows: NodeRef[][] = [];

      const completeText = () => {
        if (text) {
          if (!row) {
            row = [];
          }
          row.push(text);
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

      if (
        isStartSib &&
        isElementNode(option._startNode! /* TODO improve type */) &&
        config._isBlock(option._startNode)
      ) {
        rows.push([]);
      }

      while ((type = next())) {
        if (type === TOKEN_BLOCK) {
          completeRow();
        } else {
          hasContent = true;
          if (type === TOKEN_TEXT) {
            text += getDomNode<typeof type>().data;
          } else if (type === TOKEN_VOID) {
            completeText();
            row!.push(getDomNode<typeof type>());
          } else if (type === TOKEN_SOFT_BREAK) {
            completeRow();
          }
        }
      }
      completeRow();

      if (
        isEndSib &&
        isElementNode(option._endNode! /* TODO improve type */) &&
        config._isBlock(option._endNode)
      ) {
        rows.push([]);
      }

      if (!rows.length) {
        // delete all
        rows.push([]);
      }

      return rows;
    },
    root,
    config,
    option && {
      _startNode: option._startNode,
      _endNode: option._endNode,
      _excludeStart: isStartSib,
      _excludeEnd: isEndSib,
    }
  );
};

/**
 * @internal
 */
export const readEditAndRevert = (
  root: Element,
  config: ParserConfig,
  queue: MutationRecord[],
  serializeVoid: (node: Element) => Record<string, unknown> | void
):
  | [
      start: Position | undefined,
      end: Position | undefined,
      doc: DocFragment
    ] => {
  const updates = new Set<Node>();
  const addedOrRemoved = new Set<Node>();
  const prev = new Set<Node>();
  const next = new Set<Node>();

  let start: Node | undefined;
  let end: Node | undefined;

  let isDocStart = false;
  let isDocEnd = false;
  for (const {
    type,
    target,
    addedNodes,
    removedNodes,
    previousSibling,
    nextSibling,
  } of queue) {
    if (type === "childList") {
      for (const n of addedNodes) {
        addedOrRemoved.add(n);
      }
      for (const n of removedNodes) {
        addedOrRemoved.add(n);
      }

      if (previousSibling) {
        prev.add(previousSibling);
      } else {
        if (target === root) {
          isDocStart = true;
        } else {
          prev.add(target);
          updates.add(target);
        }
      }
      if (nextSibling) {
        next.add(nextSibling);
      } else {
        if (target === root) {
          isDocEnd = true;
        } else {
          next.add(target);
          updates.add(target);
        }
      }
    } else {
      prev.add(target);
      next.add(target);
      updates.add(target);
    }
  }

  if (!isDocStart) {
    for (const n of prev) {
      if (
        n !== root &&
        !addedOrRemoved.has(n) &&
        n.isConnected &&
        (isTextNode(n) || isElementNode(n))
      ) {
        if (
          !start ||
          compareDomPosition(start, n) &
            (DOCUMENT_POSITION_PRECEDING | DOCUMENT_POSITION_CONTAINS)
        ) {
          start = n;
        }
      }
    }
  }
  if (!isDocEnd) {
    for (const n of next) {
      if (
        n !== root &&
        !addedOrRemoved.has(n) &&
        n.isConnected &&
        (isTextNode(n) || isElementNode(n))
      ) {
        if (
          !end ||
          compareDomPosition(end, n) &
            (DOCUMENT_POSITION_FOLLOWING | DOCUMENT_POSITION_CONTAINS)
        ) {
          end = n;
        }
      }
    }
  }

  if (start && end) {
    const compare = compareDomPosition(start, end);
    if (compare & DOCUMENT_POSITION_CONTAINS) {
      start = end;
    } else if (compare & DOCUMENT_POSITION_CONTAINED_BY) {
      end = start;
    }
  }

  const isStartSibling =
    !!start &&
    ![...updates].some(
      (n) =>
        n === start || compareDomPosition(n, start) & DOCUMENT_POSITION_CONTAINS
    );
  const isEndSibling =
    !!end &&
    ![...updates].some(
      (n) =>
        n === end || compareDomPosition(n, end) & DOCUMENT_POSITION_CONTAINS
    );

  const afterSlicedDom = readDom(root, config, {
    _startNode: start,
    _endNode: end,
    _isStartSibling: isStartSibling,
    _isEndSibling: isEndSibling,
  });

  // Revert DOM
  let m: MutationRecord | undefined;
  while ((m = queue.pop())) {
    if (m.type === "childList") {
      const { target, removedNodes, addedNodes, nextSibling } = m;
      for (let i = removedNodes.length - 1; i >= 0; i--) {
        target.insertBefore(removedNodes[i]!, nextSibling);
      }
      for (let i = addedNodes.length - 1; i >= 0; i--) {
        target.removeChild(addedNodes[i]!);
      }
    } else {
      (m.target as CharacterData).nodeValue = m.oldValue!;
    }
  }

  return [
    start && serializePosition(root, start, 0, config, true, isStartSibling),
    end &&
      serializePosition(
        root,
        end,
        0, // TODO unused
        config,
        true,
        !isEndSibling
      ),
    refToDoc(afterSlicedDom, serializeVoid),
  ];
};

/**
 * @internal
 */
export const getPointedCaretPosition = (
  document: Document,
  root: Element,
  { clientX, clientY }: MouseEvent,
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
        config
      );
    }
  }
};
