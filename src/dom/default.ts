const SINGLE_LINE_CONTAINER_NAMES = new Set([
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

  // other elements for HTML paste
  "TR",
]);

/**
 * @internal
 */
export const defaultIsBlockNode = (node: Element): boolean => {
  return SINGLE_LINE_CONTAINER_NAMES.has(node.tagName);
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
export const defaultIsVoidNode = (node: Element): boolean => {
  return (
    (node as HTMLElement).contentEditable === "false" ||
    EMBEDDED_CONTENT_TAG_NAMES.has(node.tagName)
  );
};
