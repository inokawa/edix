import { createHistory } from "./history";
import {
  getCurrentDocument,
  takeSelectionSnapshot,
  setSelectionToDOM,
  takeDomSnapshot,
  getEmptySelectionSnapshot,
  getSelectedElements,
} from "./dom";
import { createMutationObserver } from "./mutation";
import { DomSnapshot, SelectionSnapshot } from "./types";
import { microtask } from "./utils";
import {
  deleteSelection,
  EditableCommand,
  flatten,
  insertText,
  replaceSelection,
  Writeable,
} from "./commands";

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

export interface EditableSerializer<T> {
  data: (snapshot: DomSnapshot) => T;
  plain?: (snapshot: DomSnapshot) => string;
}

const serializeToString = (snapshot: DomSnapshot): string => {
  return snapshot.reduce((acc, r, i) => {
    if (i !== 0) {
      acc += "\n";
    }
    return (
      acc +
      r.reduce(
        (acc, n) => acc + (typeof n === "string" ? n : n.textContent!),
        ""
      )
    );
  }, "");
};

export interface EditableOptions<T> {
  multiline?: boolean;
  readonly?: boolean;
  serializer?: EditableSerializer<T>;
  onChange: (value: T) => void;
}

export interface EditableHandle {
  (): void;
  readonly: (value: boolean) => void;
}

export const editable = <T = string>(
  element: HTMLElement,
  {
    multiline,
    readonly,
    serializer = { data: serializeToString as EditableSerializer<T>["data"] },
    onChange,
  }: EditableOptions<T>
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

  const setContentEditable = () => {
    element.contentEditable = readonly ? "false" : "true";
    element.ariaReadOnly = readonly ? "true" : null;
  };

  setContentEditable();
  element.role = "textbox";
  element.style.whiteSpace = "pre-wrap";
  if (multiline) {
    element.ariaMultiLine = "true";
  }

  let disposed = false;
  let selectionReverted = false;
  let currentSelection: SelectionSnapshot = getEmptySelectionSnapshot();
  let restoreSelectionQueue: ReturnType<typeof setTimeout> | null = null;
  let isComposing = false;
  let hasFocus = false;
  let isDragging = false;

  const commands: [EditableCommand<any[]>, args: unknown[]][] = [];

  const isSingleline = !multiline;
  const { data: serialize, plain: toString = serializeToString } = serializer;

  const document = getCurrentDocument(element);

  const history = createHistory<
    readonly [value: T, selection: SelectionSnapshot]
  >([serialize(takeDomSnapshot(document, element)), currentSelection]);

  const observer = createMutationObserver(element, () => {
    if (hasFocus) {
      // Mutation to selected DOM may change selection, so restore it.
      setSelectionToDOM(document, element, currentSelection, isSingleline);
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

  const restoreSelectionOnTimeout = () => {
    // We set updated selection after the next rerender, because it will modify DOM and selection again.
    // However frameworks may not rerender for optimization in some case, for example if selection is updated but value is the same.
    // So we also schedule restoring on timeout for safe.
    const nextSelection = currentSelection;
    restoreSelectionQueue = setTimeout(() => {
      setSelectionToDOM(document, element, nextSelection, isSingleline);
    });
  };

  const updateState = (
    dom: DomSnapshot,
    selection: SelectionSnapshot,
    prevSelection: SelectionSnapshot
  ) => {
    if (!readonly) {
      if (isSingleline) {
        [dom, selection] = flatten(dom, selection);
      }
      const value = serialize(dom);

      history.set([history.get()[0], prevSelection]);
      history.push([value, selection]);
      currentSelection = selection;
      onChange(value);
    }

    restoreSelectionOnTimeout();
  };

  const syncSelection = () => {
    currentSelection = takeSelectionSnapshot(document, element, isSingleline);
  };

  const flushInput = () => {
    const queue = observer._flush();

    observer._accept(false);
    if (queue.length) {
      // Get current value and selection from DOM
      const selection = takeSelectionSnapshot(document, element, isSingleline);
      const value = takeDomSnapshot(document, element);

      // Revert DOM
      let m: MutationRecord | undefined;
      while ((m = queue.pop())) {
        if (m.type === "characterData") {
          (m.target as CharacterData).nodeValue = m.oldValue!;
        } else if (m.type === "childList") {
          const { target, removedNodes, addedNodes, nextSibling } = m;
          for (let i = removedNodes.length - 1; i >= 0; i--) {
            target.insertBefore(removedNodes[i]!, nextSibling);
          }
          for (let i = addedNodes.length - 1; i >= 0; i--) {
            target.removeChild(addedNodes[i]!);
          }
        }
      }
      observer._flush();

      const prevSelection = currentSelection;

      // Restore previous selection
      // Updating selection may schedule the next selectionchange event
      // It should be ignored especially in firefox not to confuse editor state
      selectionReverted = setSelectionToDOM(
        document,
        element,
        prevSelection,
        isSingleline
      );

      updateState(value, selection, prevSelection);
    }
  };

  const flushCommand = () => {
    if (commands.length) {
      const prevSelection = currentSelection;
      const selection: Writeable<SelectionSnapshot> = [...currentSelection];
      const dom: Writeable<DomSnapshot> = takeDomSnapshot(
        document,
        element
      ) as Writeable<DomSnapshot>; // TODO improve type

      let command: (typeof commands)[number] | undefined;
      while ((command = commands.pop())) {
        command[0](dom, selection, ...command[1]);
      }
      updateState(dom, selection, prevSelection);
    }
  };

  const execCommand = <A extends unknown[]>(
    fn: EditableCommand<A>,
    ...args: A
  ) => {
    commands.unshift([fn, args]);

    queueTask(flushCommand);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (isComposing) return;

    if ((e.metaKey || e.ctrlKey) && !e.altKey && e.code === "KeyZ") {
      e.preventDefault();

      if (!readonly) {
        const nextHistory = e.shiftKey ? history.redo() : history.undo();

        if (nextHistory) {
          observer._accept(false);
          currentSelection = nextHistory[1];
          onChange(nextHistory[0]);

          restoreSelectionOnTimeout();
        }
      }
    }
  };

  const onInput = (() => {
    if (isComposing || isDragging) return;
    queueTask(flushInput);
  }) as (e: Event) => void;
  const onBeforeInput = (e: InputEvent) => {
    switch (e.inputType as InputType) {
      case "historyUndo": {
        e.preventDefault();
        return;
      }
      case "historyRedo": {
        e.preventDefault();
        return;
      }
      case "insertLineBreak":
      case "insertParagraph": {
        if (isSingleline) {
          e.preventDefault();
          return;
        }
      }
    }

    observer._accept(true);
  };
  const onCompositionStart = () => {
    isComposing = true;
  };
  const onCompositionEnd = () => {
    isComposing = false;
    queueTask(flushInput);
  };

  const onSelectionChange = () => {
    if (selectionReverted) {
      selectionReverted = false;
      return;
    }
    if (hasFocus && !isComposing && !isDragging) {
      syncSelection();
    }
  };

  const copySelectedDOM = (dataTransfer: DataTransfer) => {
    const selected = getSelectedElements(element);
    if (!selected) return;

    const str = toString(takeDomSnapshot(document, selected));
    const wrapper = document.createElement("div");
    wrapper.appendChild(selected);
    dataTransfer.setData("text/html", wrapper.innerHTML);
    dataTransfer.setData("text/plain", str);
  };

  const onCopy = (e: ClipboardEvent) => {
    e.preventDefault();
    copySelectedDOM(e.clipboardData!);
  };
  const onCut = (e: ClipboardEvent) => {
    e.preventDefault();
    if (!readonly) {
      copySelectedDOM(e.clipboardData!);
      execCommand(deleteSelection);
    }
  };
  const onPaste = (e: ClipboardEvent) => {
    e.preventDefault();
    const clipboardData = e.clipboardData!;

    const html = clipboardData.getData("text/html");
    if (html) {
      try {
        execCommand(
          replaceSelection,
          takeDomSnapshot(
            document,
            new DOMParser().parseFromString(html, "text/html").body,
            true
          )
        );
        return;
      } catch {
        // NOP
      }
    }

    execCommand(insertText, clipboardData.getData("text/plain"));
  };

  const onFocus = () => {
    hasFocus = true;
    syncSelection();
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
      queueTask(flushInput);
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
  handle.readonly = (value: boolean) => {
    readonly = value;
    setContentEditable();
  };
  return handle;
};
