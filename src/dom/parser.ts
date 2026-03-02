let walker: TreeWalker | null;
let node: Node | null;
let _token: TokenType | null;
let currentConfig: ParserConfig | null;

export interface ParserConfig {
  /**
   * @internal
   */
  _document: Document;
  /**
   * @internal
   */
  _isBlock: (node: Element) => boolean;
  /**
   * @internal
   */
  _isVoid: (node: Element) => boolean;
}

const SHOW_ELEMENT = 0x1;
const SHOW_TEXT = 0x4;

const TOKEN_NULL = 0;
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
  | typeof TOKEN_NULL
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

/**
 * @internal
 */
export const getDomNode = <
  T extends TokenType | void,
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
  const token = readToken();
  return token === TOKEN_TEXT
    ? (node as Text).data.length
    : token === TOKEN_VOID
      ? 1
      : 0;
};

const readToken = (): TokenType => {
  if (_token != null) {
    return _token;
  }

  if (node) {
    if (isTextNode(node)) {
      const text = node.data;
      // Ignore empty text nodes some frameworks may generate
      if (text) {
        return (_token =
          // Especially Shift+Enter in Chrome
          text === "\n"
            ? isValidSoftBreak()
              ? TOKEN_SOFT_BREAK
              : TOKEN_INVALID_SOFT_BREAK
            : TOKEN_TEXT);
      }
    } else if (isElementNode(node)) {
      const tagName = node.tagName;
      if (tagName === "BR") {
        return (_token = isValidSoftBreak()
          ? // Especially Shift+Enter in Firefox
            TOKEN_SOFT_BREAK
          : // Returning <div><br/></div> is necessary to anchor selection
            TOKEN_EMPTY_BLOCK_ANCHOR);
      } else if (currentConfig!._isVoid(node)) {
        return (_token = TOKEN_VOID);
      } else if (currentConfig!._isBlock(node)) {
        return (_token = TOKEN_BLOCK);
      }
    }
  }
  return (_token = TOKEN_NULL);
};

const next = (): Node | null => {
  _token = null;
  return (node = walker!.nextNode());
};

const nextSibling = (): Node | null => {
  _token = null;
  return (node = walker!.nextSibling());
};

const peek = <T>(fn: () => T) => {
  const currentNode = node!;
  const token = _token;
  try {
    return fn();
  } finally {
    walker!.currentNode = node = currentNode;
    _token = token;
  }
};

/**
 * @internal
 */
export const nextBlock = () => {
  while (nextSibling()) {
    if (readToken() === TOKEN_BLOCK) {
      return;
    }
  }
};

const isValidSoftBreak = (): boolean => {
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
  const parent = node!.parentNode!;
  return peek(() => {
    while (next()) {
      if (readToken()) {
        return true;
      }
      if (!parent.contains(node)) {
        break;
      }
    }
    return false;
  });
};

const readNext = (): TokenType | void => {
  while (true) {
    if (readToken() === TOKEN_VOID) {
      const current = node!;
      // don't use TreeWalker.nextSibling() to support case like <body><p><a><img /></a></p><p>hello</p></body>
      while (next()) {
        if (!current.contains(node)) {
          break;
        }
      }
    } else {
      next();
    }

    if (!node) {
      break;
    }

    const t = readToken();
    if (t) {
      return t;
    }
  }
};

/**
 * @internal
 */
export const parse = <T>(
  scopeFn: (read: typeof readNext) => T,
  root: Node,
  config: ParserConfig,
): T => {
  try {
    currentConfig = config;

    walker = config._document.createTreeWalker(root, SHOW_TEXT | SHOW_ELEMENT);

    return scopeFn(readNext);
  } finally {
    walker = node = _token = currentConfig = null;
  }
};
