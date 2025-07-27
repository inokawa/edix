import { createHistory } from "./history";
import {
  getCurrentDocument,
  takeSelectionSnapshot,
  setSelectionToDOM,
  getEmptySelectionSnapshot,
  getPointedCaretPosition,
  defaultIsBlockNode,
  getSelectionRangeInEditor,
  getDOMSelection,
  readDom,
  serializeRange,
} from "./dom";
import { createMutationObserver } from "./mutation";
import { DocFragment, SelectionSnapshot, Writeable } from "./doc/types";
import { microtask } from "./utils";
import { EditableCommand } from "./commands";
import {
  applyTransaction,
  Transaction,
  sliceDoc,
  isDocEqual,
} from "./doc/edit";
import { singleline } from "./plugins/singleline";
import { DocSchema } from "./schema";
import { ParserConfig } from "./dom/parser";
import { comparePosition, range } from "./doc/position";
import { stringToDoc } from "./doc/utils";

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
  | "formatFontName" // change the font-family
  // Legacy events older Chrome/Safari may dispatch
  // https://github.com/w3c/input-events/pull/122
  | "deleteCompositionText"
  | "deleteByComposition"
  | "insertFromComposition";

export type KeyboardPayload = Pick<
  KeyboardEvent,
  "key" | "code" | "ctrlKey" | "shiftKey" | "altKey" | "metaKey"
>;

/**
 * Options of {@link editable}.
 */
export interface EditableOptions<T> {
  /**
   * TODO
   */
  schema: DocSchema<T>;
  /**
   * TODO
   */
  isBlock?: (node: HTMLElement) => boolean;
  /**
   * Callback invoked when document state changes.
   */
  onChange: (value: T) => void;
  /**
   * Callback invoked when `keydown` events are dispatched.
   *
   * Return `true` if you want to cancel the editor's default behavior.
   */
  onKeyDown?: (keyboard: KeyboardPayload) => boolean | void;
}

/**
 * Methods of editor instance.
 */
export interface EditableHandle {
  /**
   * Disposes editor and restores previous DOM state.
   */
  dispose: () => void;
  /**
   * Dispatches editing command.
   * @param fn command function
   * @param args arguments of command
   */
  command: <A extends unknown[]>(fn: EditableCommand<A>, ...args: A) => void;
  /**
   * Changes editor's read-only state.
   * @param value `true` to read-only. `false` to editable.
   */
  readonly: (value: boolean) => void;
}

/**
 * A function to make DOM editable.
 */
export const editable = <T>(
  element: HTMLElement,
  {
    schema: {
      single: isSingleline,
      js: docToJS,
      void: serializeVoid,
      copy,
      paste,
    },
    isBlock = defaultIsBlockNode,
    onChange,
    onKeyDown: onKeyDownCallback,
  }: EditableOptions<T>
): EditableHandle => {
  if (
    !(
      window.InputEvent &&
      typeof InputEvent.prototype.getTargetRanges === "function"
    )
  ) {
    console.error("beforeinput event is not supported.");
    const dummy = () => {};
    return { dispose: dummy, command: dummy, readonly: dummy };
  }

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

  element.role = "textbox";
  // https://html.spec.whatwg.org/multipage/interaction.html#best-practices-for-in-page-editors
  element.style.whiteSpace = "pre-wrap";
  if (!isSingleline) {
    element.ariaMultiLine = "true";
  }

  let readonly = false;
  let disposed = false;
  let selectionReverted = false;
  let currentSelection: SelectionSnapshot = getEmptySelectionSnapshot();
  let inputTransaction: Transaction | null = null;
  let restoreSelectionQueue: ReturnType<typeof setTimeout> | null = null;
  let isComposing = false;
  let hasFocus = false;
  let isDragging = false;

  const document = getCurrentDocument(element);

  const parserConfig: ParserConfig = {
    _document: document,
    _isBlock: isBlock as ParserConfig["_isBlock"],
  };

  const setContentEditable = () => {
    element.contentEditable = readonly ? "false" : "true";
    element.ariaReadOnly = readonly ? "true" : null;
  };

  setContentEditable();

  const readDocAll = (root: Node, config: ParserConfig): DocFragment => {
    return readDom(root, config, serializeVoid);
  };

  const currentDoc = (): DocFragment => history.get()[0];

  const transactions: Transaction[] = [];
  const apply = (arg: Transaction) => {
    if (!readonly) {
      transactions.unshift(arg);
      queueTask(flushEdit);
    }
  };

  const history = createHistory<
    readonly [doc: DocFragment, selection: SelectionSnapshot]
  >([readDocAll(element, parserConfig), currentSelection]);

  const observer = createMutationObserver(element, () => {
    if (hasFocus) {
      // Mutation to selected DOM may change selection, so restore it.
      setSelectionToDOM(document, element, currentSelection, parserConfig);
      if (restoreSelectionQueue != null) {
        clearTimeout(restoreSelectionQueue);
        restoreSelectionQueue = null;
      }
    }
  });

  const tasks = new Set<() => void>();

  const queueTask = (fn: () => void) => {
    if (!tasks.has(fn)) {
      tasks.add(fn);

      microtask(() => {
        tasks.delete(fn);
        fn();
      });
    }
  };

  const restoreSelectionOnTimeout = (nextSelection: SelectionSnapshot) => {
    currentSelection = nextSelection;
    // We set updated selection after the next rerender, because it will modify DOM and selection again.
    // However frameworks may not rerender for optimization in some case, for example if selection is updated but document is the same.
    // So we also schedule restoring on timeout for safe.
    restoreSelectionQueue = setTimeout(() => {
      setSelectionToDOM(document, element, nextSelection, parserConfig);
    });
  };

  const syncSelection = () => {
    currentSelection = takeSelectionSnapshot(element, parserConfig);
  };

  const flushInput = () => {
    const queue = observer._flush();

    observer._record(false);

    if (queue.length) {
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
      observer._flush();
    }

    apply(inputTransaction!);

    isComposing = false;
    inputTransaction = null;

    // Restore previous selection
    // Updating selection may schedule the next selectionchange event
    // It should be ignored especially in firefox not to confuse editor state
    selectionReverted = setSelectionToDOM(
      document,
      element,
      currentSelection,
      parserConfig
    );
  };

  const flushEdit = () => {
    if (transactions.length) {
      let doc: Writeable<DocFragment> = [...currentDoc()];
      let selection: Writeable<SelectionSnapshot> = [...currentSelection];

      let tr: Transaction | undefined;
      while ((tr = transactions.pop())) {
        if (isSingleline) {
          tr = singleline(tr);
        }
        applyTransaction(doc, selection, tr);
      }

      const prevDoc = currentDoc();
      const prevSelection = currentSelection;

      if (!isDocEqual(doc, prevDoc)) {
        history.set([prevDoc, prevSelection]);
        history.push([doc, selection]);
        onChange(docToJS(doc));
      }

      restoreSelectionOnTimeout(selection);
    }
  };

  const command: EditableHandle["command"] = (fn, ...args) => {
    const tr = fn(currentDoc(), currentSelection, ...args);
    if (tr) {
      apply(tr);
    }
  };

  // spec compliant: keydown -> beforeinput -> input (-> keyup)
  // Safari (IME)  : beforeinput -> input -> keydown (-> keyup)
  // https://w3c.github.io/uievents/#events-keyboard-event-order
  // https://bugs.webkit.org/show_bug.cgi?id=165004
  const onKeyDown = (e: KeyboardEvent) => {
    if (isComposing) return;

    if (onKeyDownCallback && onKeyDownCallback(e)) {
      e.preventDefault();
      return;
    }
    if ((e.metaKey || e.ctrlKey) && !e.altKey && e.code === "KeyZ") {
      e.preventDefault();

      observer._record(false);
      if (!readonly) {
        const nextHistory = e.shiftKey ? history.redo() : history.undo();

        if (nextHistory) {
          onChange(docToJS(nextHistory[0]));

          restoreSelectionOnTimeout(nextHistory[1]);
        }
      }
    }
  };

  const onInput = () => {
    if (!isComposing) {
      flushInput();
    }
  };
  const onBeforeInput = (e: InputEvent) => {
    e.preventDefault();

    const inputType = e.inputType as InputType;

    if (inputType.startsWith("format")) {
      // Ignore format inputs from document.execCommand() or shortcuts like mod+b. 
      return;
    }
    if (inputType === "historyUndo" || inputType === "historyRedo") {
      // Cancel for now.
      return;
    }

    if (isComposing) {
      // Unfortunately, input events related to composition are not cancellable.
      // So we record mutations to DOM and revert them after composition ended.
      observer._record(true);
    } else {
      syncSelection();
    }

    const domRange = e.getTargetRanges()[0];
    if (domRange) {
      // Read input
      const range = serializeRange(element, parserConfig, domRange);
      let data =
        inputType === "insertParagraph" || inputType === "insertLineBreak"
          ? "\n"
          : e.data;
      if (data == null) {
        const dataTransfer = e.dataTransfer;
        if (dataTransfer) {
          // In some cases (e.g. insertReplacementText), dataTransfer contains text.
          data = dataTransfer.getData("text/plain");
        }
      }

      if (!inputTransaction) {
        inputTransaction = new Transaction().select(...currentSelection);
      }
      if (comparePosition(...range) !== 0) {
        // replace or delete
        inputTransaction.delete(...range);
      }
      if (data) {
        // replace or insert
        inputTransaction.insert(range[0], stringToDoc(data));
      }
    }

    if (!isComposing) {
      flushInput();
    }
  };
  const onCompositionStart = () => {
    if (!isComposing) {
      syncSelection();
    }
    isComposing = true;
  };
  const onCompositionEnd = () => {
    flushInput();
  };

  const onFocus = () => {
    hasFocus = true;
    syncSelection();
  };
  const onBlur = () => {
    hasFocus = false;
  };

  const onSelectionChange = () => {
    if (selectionReverted) {
      selectionReverted = false;
      return;
    }
    // Safari may dispatch selectionchange event after dragstart
    if (hasFocus && !isComposing && !isDragging) {
      syncSelection();
    }
  };

  const copySelected = (dataTransfer: DataTransfer) => {
    syncSelection();
    if (comparePosition(...currentSelection) !== 0) {
      copy(
        dataTransfer,
        sliceDoc(currentDoc(), ...range(currentSelection)),
        () =>
          // DOM range must exist here
          getSelectionRangeInEditor(
            getDOMSelection(element),
            element
          )!.cloneContents()
      );
    }
  };

  const docFromDataTransfer = (dataTransfer: DataTransfer): DocFragment => {
    return paste(dataTransfer, (dom) => readDocAll(dom, parserConfig));
  };

  const onCopy = (e: ClipboardEvent) => {
    e.preventDefault();
    copySelected(e.clipboardData!);
  };
  const onCut = (e: ClipboardEvent) => {
    e.preventDefault();
    if (!readonly) {
      copySelected(e.clipboardData!);
      apply(new Transaction().delete(...range(currentSelection)));
    }
  };
  const onPaste = (e: ClipboardEvent) => {
    e.preventDefault();
    const [start, end] = range(currentSelection);
    apply(
      new Transaction()
        .delete(start, end)
        .insert(start, docFromDataTransfer(e.clipboardData!))
    );
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();

    const dataTransfer = e.dataTransfer;
    const droppedPosition = getPointedCaretPosition(
      document,
      element,
      e,
      parserConfig
    );
    if (dataTransfer && droppedPosition) {
      const tr = new Transaction();
      if (isDragging) {
        tr.delete(...range(currentSelection));
      }
      const pos = tr.rebasePos(droppedPosition);
      tr.select(pos, pos)
        .insert(pos, docFromDataTransfer(dataTransfer))
        .select(pos);
      apply(tr);
      element.focus({ preventScroll: true });
    }
  };
  const onDragStart = (e: DragEvent) => {
    isDragging = true;
    copySelected(e.dataTransfer!);
  };
  const onDragEnd = () => {
    isDragging = false;
  };

  document.addEventListener("selectionchange", onSelectionChange);
  element.addEventListener("keydown", onKeyDown);
  element.addEventListener("input", onInput);
  element.addEventListener("beforeinput", onBeforeInput);
  element.addEventListener("compositionstart", onCompositionStart);
  element.addEventListener("compositionend", onCompositionEnd);
  element.addEventListener("focus", onFocus);
  element.addEventListener("blur", onBlur);
  element.addEventListener("copy", onCopy);
  element.addEventListener("cut", onCut);
  element.addEventListener("paste", onPaste);
  element.addEventListener("drop", onDrop);
  element.addEventListener("dragstart", onDragStart);
  element.addEventListener("dragend", onDragEnd);

  return {
    dispose: () => {
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
      element.removeEventListener("focus", onFocus);
      element.removeEventListener("blur", onBlur);
      element.removeEventListener("copy", onCopy);
      element.removeEventListener("cut", onCut);
      element.removeEventListener("paste", onPaste);
      element.removeEventListener("drop", onDrop);
      element.removeEventListener("dragstart", onDragStart);
      element.removeEventListener("dragend", onDragEnd);
    },
    command: command,
    readonly: (value) => {
      readonly = value;
      setContentEditable();
    },
  };
};
