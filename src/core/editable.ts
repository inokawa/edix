import { createHistory } from "./history";
import {
  getCurrentDocument,
  SelectionSnapshot,
  getSelectionSnapshot,
  getDOMSelection,
  setSelectionToDOM,
  serializeDOM,
  getEmptySelectionSnapshot,
  getSelectedElements,
} from "./dom";
import { createMutationObserver, revertMutations } from "./mutation";
import { microtask } from "./utils";

/**
 * https://www.w3.org/TR/input-events-1/#interface-InputEvent-Attributes
 */
type InputType =
  | "insertText" // insert typed plain text
  | "insertReplacementText" // replace existing text by means of a spell checker, auto-correct or similar
  | "insertLineBreak" // insert a line break
  | "insertParagraph" // insert a paragraph break
  | "insertOrderedList" // insert a numbered list
  | "insertUnorderedList" // insert a bulleted list
  | "insertHorizontalRule" // insert a horizontal rule
  | "insertFromYank" // replace the current selection with content stored in a kill buffer
  | "insertFromDrop" // insert content into the DOM by means of drop
  | "insertFromPaste" // paste
  | "insertFromPasteAsQuotation" // paste content as a quotation
  | "insertTranspose" // transpose the last two characters that were entered
  | "insertCompositionText" // replace the current composition string
  | "insertLink" // insert a link
  | "deleteWordBackward" // delete a word directly before the caret position
  | "deleteWordForward" // delete a word directly after the caret position
  | "deleteSoftLineBackward" // delete from the caret to the nearest visual line break before the caret position
  | "deleteSoftLineForward" // delete from the caret to the nearest visual line break after the caret position
  | "deleteEntireSoftLine" // delete from to the nearest visual line break before the caret position to the nearest visual line break after the caret position
  | "deleteHardLineBackward" // delete from the caret to the nearest beginning of a block element or br element before the caret position
  | "deleteHardLineForward" // delete from the caret to the nearest end of a block element or br element after the caret position
  | "deleteByDrag" // remove content from the DOM by means of drag
  | "deleteByCut" // remove the current selection as part of a cut
  | "deleteContent" // delete the selection without specifying the direction of the deletion and this intention is not covered by another inputType
  | "deleteContentBackward" // delete the content directly before the caret position and this intention is not covered by another inputType or delete the selection with the selection collapsing to its start after the deletion
  | "deleteContentForward" // delete the content directly after the caret position and this intention is not covered by another inputType or delete the selection with the selection collapsing to its end after the deletion
  | "historyUndo" // undo the last editing action
  | "historyRedo" // to redo the last undone editing action
  | "formatBold" // initiate bold text
  | "formatItalic" // initiate italic text
  | "formatUnderline" // initiate underline text
  | "formatStrikeThrough" // initiate stricken through text
  | "formatSuperscript" // initiate superscript text
  | "formatSubscript" // initiate subscript text
  | "formatJustifyFull" // make the current selection fully justified
  | "formatJustifyCenter" // center align the current selection
  | "formatJustifyRight" // right align the current selection
  | "formatJustifyLeft" // left align the current selection
  | "formatIndent" // indent the current selection
  | "formatOutdent" // outdent the current selection
  | "formatRemove" // remove all formatting from the current selection
  | "formatSetBlockTextDirection" // set the text block direction
  | "formatSetInlineTextDirection" // set the text inline direction
  | "formatBackColor" // change the background color
  | "formatFontColor" // change the font color
  | "formatFontName"; // change the font-family

export interface CustomEditableNode {
  is: keyof HTMLElementTagNameMap | ((e: HTMLElement) => boolean);
  serialize?: (e: HTMLElement) => string;
}

export interface EditableOptions {
  readonly?: boolean;
  nodes?: CustomEditableNode[];
  onChange: (value: string) => void;
}

export interface EditableHandle {
  (): void;
  insert: (text: string) => void;
  readonly: (value: boolean) => void;
}

export const editable = (
  element: HTMLElement,
  { readonly, nodes, onChange }: EditableOptions
): EditableHandle => {
  // https://w3c.github.io/contentEditable/
  // https://w3c.github.io/editing/docs/execCommand/
  // https://w3c.github.io/selection-api/
  const {
    contentEditable: prevContentEditable,
    role: prevRole,
    ariaMultiLine: prevAriaMultiLine,
    ariaReadOnly: prevAriaReadOnly,
  } = element;
  const prevWhiteSpace = element.style.whiteSpace;
  element.contentEditable = "true";
  element.role = "textbox";
  element.ariaMultiLine = "true";
  element.style.whiteSpace = "pre-wrap";

  let disposed = false;
  let selectionReverted = false;
  let currentSelection: SelectionSnapshot | undefined;
  let flushQueued = false;
  let restoreSelectionQueue: number | null = null;
  let isComposing = false;
  let hasFocus = false;
  let isDragging = false;

  const getCustomNodeData = (node: Element): CustomEditableNode | undefined => {
    if (!nodes) return;
    return nodes.find((n) => {
      return typeof n.is === "function"
        ? n.is(node as HTMLElement)
        : node.nodeName === n.is.toUpperCase();
    });
  };
  const serializeCustomNode = (node: Element): string | undefined => {
    const nodeData = getCustomNodeData(node);
    if (nodeData) {
      return nodeData.serialize
        ? nodeData.serialize(node as HTMLElement)
        : node.textContent!;
    }
    return;
  };
  const isCustomNode = (node: Element): boolean => {
    return !!getCustomNodeData(node);
  };

  const updateReadonly = () => {
    element.ariaReadOnly = readonly ? "true" : null;
  };
  updateReadonly();

  const document = getCurrentDocument(element);

  const history = createHistory<
    readonly [value: string, selection: SelectionSnapshot]
  >([
    serializeDOM(document, element, serializeCustomNode),
    getEmptySelectionSnapshot(),
  ]);

  const observer = createMutationObserver(element, () => {
    if (hasFocus) {
      if (currentSelection) {
        setSelectionToDOM(document, element, currentSelection, isCustomNode);
        if (restoreSelectionQueue != null) {
          cancelAnimationFrame(restoreSelectionQueue);
          restoreSelectionQueue = null;
        }
      }
    }
  });

  const restoreSelectionOnTimeout = (selection: SelectionSnapshot) => {
    restoreSelectionQueue = requestAnimationFrame(() => {
      setSelectionToDOM(document, element, selection, isCustomNode);
    });
  };

  const emitChange = (value: string) => {
    onChange(value);
  };

  const prepareBeforeChange = () => {
    observer._accept(true);
  };
  const flushChanges = () => {
    if (!flushQueued) {
      flushQueued = true;

      microtask(() => {
        flushQueued = false;

        const queue = observer._flush();

        observer._accept(false);
        if (queue.length) {
          const selection = getSelectionSnapshot(
            document,
            element,
            isCustomNode
          );

          const value = serializeDOM(document, element, serializeCustomNode);

          revertMutations(queue);
          observer._flush();

          const prevSelection = currentSelection || getEmptySelectionSnapshot();
          selectionReverted = setSelectionToDOM(
            document,
            element,
            prevSelection,
            isCustomNode
          );

          const prevValue = serializeDOM(
            document,
            element,
            serializeCustomNode
          );
          if (!readonly) {
            history.push([prevValue, prevSelection], true);
            history.push([value, selection]);
            currentSelection = selection;
            emitChange(value);
          }

          if (currentSelection) {
            restoreSelectionOnTimeout(currentSelection);
          }
        }
      });
    }
  };

  const insertText = (text: string) => {
    const shouldDelete = !getDOMSelection(element).isCollapsed;

    prepareBeforeChange();

    // https://w3c.github.io/editing/docs/execCommand/#the-inserttext-command
    if (shouldDelete) {
      document.execCommand("delete", false);
    }
    document.execCommand("insertText", false, text);

    flushChanges();
  };

  const copyText = (clipboardData: DataTransfer) => {
    const selected = getSelectedElements(element);
    if (!selected) return;

    const wrapper = document.createElement("div");
    wrapper.appendChild(selected);
    clipboardData.setData("text/html", wrapper.innerHTML);
    clipboardData.setData(
      "text/plain",
      serializeDOM(document, selected, serializeCustomNode)
    );
  };

  const doUndoOrRedo = (isRedo: boolean) => {
    if (readonly) return;

    const nextHistory = isRedo ? history.redo() : history.undo();

    if (nextHistory) {
      observer._accept(false);
      currentSelection = nextHistory[1];
      emitChange(nextHistory[0]);
    }
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (isComposing) return;
    if ((e.metaKey || e.ctrlKey) && !e.altKey && e.code === "KeyZ") {
      e.preventDefault();

      doUndoOrRedo(e.shiftKey);
    }
  };

  const onInput = (() => {
    if (isComposing || isDragging) return;
    flushChanges();
  }) as (e: Event) => void;
  const onBeforeInput = (e: InputEvent) => {
    switch (e.inputType as InputType) {
      case "historyUndo": {
        e.preventDefault();
        break;
      }
      case "historyRedo": {
        e.preventDefault();
        break;
      }
      default: {
        prepareBeforeChange();
        break;
      }
    }
  };
  const onCompositionStart = () => {
    isComposing = true;
  };
  const onCompositionEnd = () => {
    isComposing = false;
    flushChanges();
  };

  const onSelectionChange = () => {
    if (selectionReverted) {
      selectionReverted = false;
      return;
    }
    if (isComposing || isDragging) return;
    currentSelection = getSelectionSnapshot(document, element, isCustomNode);
  };

  const onCopy = (e: ClipboardEvent) => {
    e.preventDefault();
    copyText(e.clipboardData!);
  };
  const onCut = (e: ClipboardEvent) => {
    e.preventDefault();
    copyText(e.clipboardData!);
    insertText("");
  };
  const onPaste = (e: ClipboardEvent) => {
    e.preventDefault();
    const clipboardData = e.clipboardData!;

    if (nodes) {
      const html = clipboardData.getData("text/html");
      if (html) {
        try {
          const dom = new DOMParser().parseFromString(html, "text/html");
          insertText(serializeDOM(document, dom.body, serializeCustomNode));
          return;
        } catch {
          // NOP
        }
      }
    }

    insertText(clipboardData.getData("text/plain"));
  };

  const onFocus = () => {
    hasFocus = true;
  };
  const onBlur = () => {
    hasFocus = false;
  };

  const onDragStart = () => {
    isDragging = true;
  };
  const onDragEnd = () => {
    if (isDragging) {
      isDragging = false;
      flushChanges();
    }
  };

  document.addEventListener("selectionchange", onSelectionChange);
  element.addEventListener("keydown", onKeyDown);
  element.addEventListener("input", onInput);
  element.addEventListener("beforeinput", onBeforeInput);
  element.addEventListener("compositionstart", onCompositionStart);
  element.addEventListener("compositionend", onCompositionEnd);
  element.addEventListener("copy", onCopy);
  element.addEventListener("cut", onCut);
  element.addEventListener("paste", onPaste);
  element.addEventListener("focus", onFocus);
  element.addEventListener("blur", onBlur);
  element.addEventListener("dragstart", onDragStart);
  element.addEventListener("dragend", onDragEnd);

  const handle = () => {
    if (disposed) return;
    disposed = true;

    element.contentEditable = prevContentEditable;
    element.role = prevRole;
    element.ariaMultiLine = prevAriaMultiLine;
    element.ariaReadOnly = prevAriaReadOnly;
    element.style.whiteSpace = prevWhiteSpace;

    observer._dispose();

    document.removeEventListener("selectionchange", onSelectionChange);
    element.removeEventListener("keydown", onKeyDown);
    element.removeEventListener("input", onInput);
    element.removeEventListener("beforeinput", onBeforeInput);
    element.removeEventListener("compositionstart", onCompositionStart);
    element.removeEventListener("compositionend", onCompositionEnd);
    element.removeEventListener("copy", onCopy);
    element.removeEventListener("cut", onCut);
    element.removeEventListener("paste", onPaste);
    element.removeEventListener("focus", onFocus);
    element.removeEventListener("blur", onBlur);
    element.removeEventListener("dragstart", onDragStart);
    element.removeEventListener("dragend", onDragEnd);
  };
  handle.insert = insertText;
  handle.readonly = (value: boolean) => {
    readonly = value;
    updateReadonly();
  };
  return handle;
};
