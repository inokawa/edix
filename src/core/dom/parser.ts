let walker: TreeWalker | null;
let node: Node | null;
let tokenType: TokenType | null;
let startNode: Node | null;
let endNode: Node | null;
let isEndNodeVisited = false;
let shouldExcludeStart = false;
let shouldExcludeEnd = false;
let isBlockNode: (node: Element) => boolean;

/**
 * @internal
 */
export interface ParserConfig {
  _document: Document;
  _isBlock: (node: Element) => boolean;
}

interface ParserOption {
  _startNode?: Node;
  _endNode?: Node;
  _excludeStart?: boolean;
  _excludeEnd?: boolean;
}

const SHOW_ELEMENT = 0x1;
const SHOW_TEXT = 0x4;

/** @internal */
export const TOKEN_TEXT = 1;
/** @internal */
export const TOKEN_VOID = 2;
/** @internal */
export const TOKEN_SOFT_BREAK = 3;
/** @internal */
export const TOKEN_BLOCK = 4;
const TOKEN_EMPTY_BLOCK_ANCHOR = 5;
const TOKEN_INVALID_SOFT_BREAK = 6;

/**
 * @internal
 */
export type TokenType =
  | typeof TOKEN_TEXT
  | typeof TOKEN_VOID
  | typeof TOKEN_SOFT_BREAK
  | typeof TOKEN_BLOCK
  | typeof TOKEN_EMPTY_BLOCK_ANCHOR
  | typeof TOKEN_INVALID_SOFT_BREAK;

const ELEMENT_NODE = 1;
const TEXT_NODE = 3;
const COMMENT_NODE = 8;

/**
 * @internal
 */
export const isTextNode = (node: Node): node is Text => {
  return node.nodeType === TEXT_NODE;
};

/**
 * @internal
 */
export const isElementNode = (node: Node): node is Element => {
  return node.nodeType === ELEMENT_NODE;
};

/**
 * @internal
 */
export const isCommentNode = (node: Node): node is Comment => {
  return node.nodeType === COMMENT_NODE;
};

// https://developer.mozilla.org/en-US/docs/Web/HTML/Content_categories
// https://html.spec.whatwg.org/multipage/dom.html#embedded-content-category
const EMBEDDED_CONTENT_TAG_NAMES = new Set([
  "EMBED",
  "IMG",
  "PICTURE",
  "AUDIO",
  "VIDEO",
  "SVG",
  "CANVAS",
  "MATH",
  "IFRAME",
  "OBJECT",
]);

/**
 * @internal
 */
export const getDomNode = <
  T extends TokenType | void
>(): T extends typeof TOKEN_TEXT
  ? Text
  : T extends TokenType
  ? Element
  : Text | Element => {
  return node as any;
};

/**
 * @internal
 */
export const getNodeSize = (): number => {
  return tokenType === TOKEN_TEXT
    ? (node as Text).data.length
    : tokenType === TOKEN_VOID
    ? 1
    : 0;
};

const isValidSoftBreak = (node: Node): boolean => {
  const next = node.nextSibling;

  // This function will return false if there are no nodes after soft break.
  //
  // In contenteditable, Shift+Enter will insert soft break. \n in Chrome, <br/> in Firefox. Safari doesn't insert soft break.
  // And \n or <br/> has a special role that represents empty block in contenteditable.
  // We have to distinguish real soft breaks from empty blocks.
  //
  // There are many possible markups for soft break ([] means text node):
  // <div>[\n][abc]</div>         Shift+Enter at start of line in Chrome
  // <div><br/>[abc]</div>        Shift+Enter at start of line in Firefox
  // <div>[ab][\n][c]</div>       Shift+Enter at mid of line in Chrome
  // <div>[ab]<br/>[c]</div>      Shift+Enter at mid of line in Firefox
  // <div>[abc][\n][\n]</div>     Shift+Enter at end of line in Chrome
  // <div>[abc]<br/><br/></div>   Shift+Enter at end of line in Firefox
  // <div>[\n]<br/></div>         Shift+Enter at empty line in Chrome
  // <div><br/><br/></div>        Shift+Enter at empty line in Firefox
  //
  // And these do not include soft breaks:
  // <div><br/></div>             empty line
  // <div>[a]<br/></div>          type on empty line in Firefox
  return (
    !!next &&
    // svelte/angular may have comment node
    !isCommentNode(next)
  );
};

const readNext = (): TokenType | void => {
  while (true) {
    if (tokenType === TOKEN_VOID) {
      const current = node!;
      // don't use TreeWalker.nextSibling() to support case like <body><p><a><img /></a></p><p>hello</p></body>
      while ((node = walker!.nextNode())) {
        if (!current.contains(node)) {
          break;
        }
      }
    } else {
      node = walker!.nextNode();
    }

    tokenType = null;

    if (!node) {
      break;
    }

    if (startNode && shouldExcludeStart) {
      if (startNode.contains(node)) {
        continue;
      } else {
        shouldExcludeStart = false;
      }
    }

    if (endNode) {
      if (endNode.contains(node)) {
        isEndNodeVisited = true;
        if (shouldExcludeEnd) {
          break;
        }
      } else {
        if (isEndNodeVisited) {
          break;
        }
      }
    }

    if (isTextNode(node)) {
      const text = node.data;
      // Ignore empty text nodes some frameworks may generate
      if (text) {
        // Especially Shift+Enter in Chrome
        if (text === "\n") {
          return (tokenType = isValidSoftBreak(node)
            ? TOKEN_SOFT_BREAK
            : TOKEN_INVALID_SOFT_BREAK);
        } else {
          return (tokenType = TOKEN_TEXT);
        }
      }
    } else if (isElementNode(node)) {
      const tagName = node.tagName;
      if (tagName === "BR") {
        return (tokenType = isValidSoftBreak(node)
          ? // Especially Shift+Enter in Firefox
            TOKEN_SOFT_BREAK
          : // Returning <div><br/></div> is necessary to anchor selection
            TOKEN_EMPTY_BLOCK_ANCHOR);
      } else if (
        (node as HTMLElement).contentEditable === "false" ||
        EMBEDDED_CONTENT_TAG_NAMES.has(tagName)
      ) {
        return (tokenType = TOKEN_VOID);
      } else if (isBlockNode(node)) {
        return (tokenType = TOKEN_BLOCK);
      }
    }
  }
};

/**
 * @internal
 */
export const parse = <T>(
  scopeFn: (read: typeof readNext) => T,
  root: Node,
  { _document: document, _isBlock: isBlock }: ParserConfig,
  option?: ParserOption
): T => {
  try {
    isBlockNode = isBlock;

    walker = document.createTreeWalker(root, SHOW_TEXT | SHOW_ELEMENT);

    if (option) {
      if (option._startNode) {
        walker.currentNode = startNode = option._startNode;
        walker.previousNode();
      }
      if (option._endNode) {
        endNode = option._endNode;
      }
      shouldExcludeStart = option._excludeStart || false;
      shouldExcludeEnd = option._excludeEnd || false;
    }

    return scopeFn(readNext);
  } finally {
    walker = node = tokenType = startNode = endNode = null;
    isEndNodeVisited = shouldExcludeStart = shouldExcludeEnd = false;
  }
};
