import { getCurrentDocument, selectionToRange } from "../dom/index.js";
import { isElementNode } from "../dom/utils.js";
import type { Editor } from "../editor.js";

// `auto` parses to NaN and reserves nothing
const resolveScrollPadding = (value: string, size: number): number => {
  const px = parseFloat(value);
  return px ? (value.endsWith("%") ? (px / 100) * size : px) : 0;
};

const getBounds = (
  start: number,
  size: number,
  paddingStart: string,
  paddingEnd: string,
): [start: number, end: number] => [
  start + resolveScrollPadding(paddingStart, size),
  start + size - resolveScrollPadding(paddingEnd, size),
];

const isScrollable = (overflow: string): boolean =>
  overflow === "auto" || overflow === "scroll" || overflow === "overlay";

// Resolved once on mount, so this keys off the authored overflow rather than
// whether the element currently overflows, which depends on the content. Both
// axes matter: a vertical writing mode scrolls along x.
// body/documentElement are left to the viewport scroll.
const getNearestScrollParent = (
  root: HTMLElement,
  document: Document,
  window: Window,
): HTMLElement | null => {
  const { body, documentElement } = document;
  let element: HTMLElement | null = root;
  while (element && element !== body && element !== documentElement) {
    const { overflowX, overflowY } = window.getComputedStyle(element);
    if (isScrollable(overflowX) || isScrollable(overflowY)) {
      return element;
    }
    element = element.parentElement;
  }
  return null;
};

const overflow = (
  start: number,
  end: number,
  [boundStart, boundEnd]: [number, number],
): number =>
  start < boundStart ? start - boundStart : end > boundEnd ? end - boundEnd : 0;

// An axis flowing back toward the scroll origin is reached through negative
// offsets, so scrollLeft runs [-scrollable, 0] under `rtl` or `vertical-rl`.
const isReversed = (style: CSSStyleDeclaration): [x: boolean, y: boolean] => {
  const rtl = style.direction === "rtl";
  switch (style.writingMode) {
    case "vertical-rl":
    case "sideways-rl":
      return [true, rtl];
    case "vertical-lr":
      return [false, rtl];
    // the one mode whose inline axis runs bottom-to-top while `ltr`
    case "sideways-lr":
      return [false, !rtl];
    default:
      return [rtl, false];
  }
};

// Clamping keeps the applied offset known without reading back the scroll
// position, which stays stale during a smooth scroll.
const clamp = (
  diff: number,
  scrolled: number,
  scrollable: number,
  reversed: boolean,
): number => {
  const min = reversed ? -scrollable : 0;
  return Math.max(min - scrolled, Math.min(diff, min + scrollable - scrolled));
};

const measureElement = (
  scroller: HTMLElement,
  style: CSSStyleDeclaration,
  rect: DOMRect,
): [x: number, y: number] => {
  const {
    scrollLeft,
    scrollTop,
    scrollWidth,
    scrollHeight,
    clientLeft,
    clientTop,
    clientWidth,
    clientHeight,
  } = scroller;
  const box = scroller.getBoundingClientRect();
  const [reversedX, reversedY] = isReversed(style);

  // The scrollport is the padding box minus scrollbars, which is what client*
  // describe. The border box would count borders and scrollbars as visible.
  const top = clamp(
    overflow(
      rect.top,
      rect.bottom,
      getBounds(
        box.top + clientTop,
        clientHeight,
        style.scrollPaddingTop,
        style.scrollPaddingBottom,
      ),
    ),
    scrollTop,
    scrollHeight - clientHeight,
    reversedY,
  );
  const left = clamp(
    overflow(
      rect.left,
      rect.right,
      getBounds(
        box.left + clientLeft,
        clientWidth,
        style.scrollPaddingLeft,
        style.scrollPaddingRight,
      ),
    ),
    scrollLeft,
    scrollWidth - clientWidth,
    reversedX,
  );

  return [left, top];
};

const measureWindow = (
  documentElement: HTMLElement,
  style: CSSStyleDeclaration,
  rect: DOMRect,
  [x, y]: [x: number, y: number],
): [x: number, y: number] => {
  // not innerWidth/Height, which include the scrollbars
  const { clientWidth, clientHeight } = documentElement;

  const top = overflow(
    rect.top - y,
    rect.bottom - y,
    getBounds(
      0,
      clientHeight,
      style.scrollPaddingTop,
      style.scrollPaddingBottom,
    ),
  );
  const left = overflow(
    rect.left - x,
    rect.right - x,
    getBounds(
      0,
      clientWidth,
      style.scrollPaddingLeft,
      style.scrollPaddingRight,
    ),
  );

  return [left, top];
};

const scrollBy = (
  target: Window | HTMLElement,
  [left, top]: [x: number, y: number],
  behavior: ScrollBehavior,
): void => {
  if (top || left) {
    target.scrollBy({ top, left, behavior });
  }
};

/**
 * A plugin to scroll to the selection on document change.
 */
export const scrollToSelectionPlugin = (editor: Editor) => {
  const behavior: ScrollBehavior = "auto";
  editor.hook("mount", (element, parser) => {
    const document = getCurrentDocument(element);
    const window = document.defaultView!;
    const { documentElement } = document;
    const scroller = getNearestScrollParent(element, document, window);
    // live declarations, so the lookup is paid once but the values stay current
    const scrollerStyle = scroller && window.getComputedStyle(scroller);
    const rootStyle = window.getComputedStyle(documentElement);

    let timer: ReturnType<typeof setTimeout> | null = null;
    // Moving the caret reveals it natively, leaving only document changes
    const cleanup = editor.on("change", () => {
      if (timer != null) return;
      // Defer until the host framework has re-rendered, since the native reveal
      // ran against the layout before it. Matches the delay in editor.input().
      timer = setTimeout(() => {
        timer = null;
        const range = selectionToRange(
          element,
          parser,
          editor.doc,
          editor.selection,
        );
        let rect = range.getBoundingClientRect();
        // A collapsed range around a `<br>` reports an empty rect at (0, 0),
        // which would scroll toward the start of the document. A caret itself
        // is flat on one axis only, on y in a vertical writing mode.
        if (!rect.width && !rect.height) {
          const node = range.startContainer;
          const el = isElementNode(node) ? node : node.parentElement;
          if (el) {
            rect = el.getBoundingClientRect();
          }
        }

        // Walk the scroll chain inner -> outer like scrollIntoView(). Rects are
        // viewport-relative, so fitting the caret in the scroller does not put
        // it on screen; scrolling the scroller shifts those coords, hence
        // subtracting the applied offset. The reverse never holds, so one pass
        // converges. Only the nearest scroller is walked. Both passes measure
        // before either scrolls, since a scroll would invalidate layout and
        // force the later measurements to lay out again.
        const scrolled: [number, number] =
          scroller && scrollerStyle
            ? measureElement(scroller, scrollerStyle, rect)
            : [0, 0];
        const scrolledWindow = measureWindow(
          documentElement,
          rootStyle,
          rect,
          scrolled,
        );

        if (scroller) {
          scrollBy(scroller, scrolled, behavior);
        }
        scrollBy(window, scrolledWindow, behavior);
      }, 50);
    });

    return () => {
      if (timer != null) {
        clearTimeout(timer);
      }
      cleanup();
    };
  });
};
