/**
 * @vitest-environment jsdom
 */
import { afterEach, beforeEach, expect, it } from "vitest";
import { createPlainEditor } from "./presets/index.js";

// Smoke tests for editors mounted in another window (popup / iframe).
// The editor must resolve document/window from the mounted element instead of
// the globals, so mount it into an iframe which has its own window and realm
// in jsdom.

// jsdom does not implement getTargetRanges, which is required by the feature
// detection in input().
const stubGetTargetRanges = (win: Window & typeof globalThis) => {
  (win.InputEvent.prototype as any).getTargetRanges = () => [];
};

let iframe: HTMLIFrameElement;
let childDocument: Document;
let childWindow: Window & typeof globalThis;

beforeEach(() => {
  stubGetTargetRanges(window);
  iframe = document.createElement("iframe");
  document.body.appendChild(iframe);
  childDocument = iframe.contentDocument!;
  childWindow = iframe.contentWindow! as Window & typeof globalThis;
  stubGetTargetRanges(childWindow);
});

afterEach(() => {
  iframe.remove();
});

const renderText = (container: HTMLElement, text: string) => {
  container.textContent = "";
  for (const line of text.split("\n")) {
    const row = childDocument.createElement("div");
    if (line) {
      row.textContent = line;
    } else {
      row.appendChild(childDocument.createElement("br"));
    }
    container.appendChild(row);
  }
};

const init = (initialText: string) => {
  const element = childDocument.createElement("div");
  childDocument.body.appendChild(element);

  let text = initialText;
  renderText(element, text);

  const editor = createPlainEditor({
    text,
    onChange: (value) => {
      text = value;
      renderText(element, text);
    },
  });
  const dispose = editor.input(element);

  return { editor, element, getText: () => text, dispose };
};

const setCaret = (node: Node, offset: number) => {
  const selection = childDocument.getSelection()!;
  const range = childDocument.createRange();
  range.setStart(node, offset);
  range.collapse(true);
  selection.removeAllRanges();
  selection.addRange(range);
};

// selectionchange and change events are dispatched in a queued task
const nextTask = () => new Promise((resolve) => setTimeout(resolve));

it("should activate contenteditable in another document", () => {
  const { element, dispose } = init("This is new window!");

  expect(element.contentEditable).toBe("true");
  expect(element.role).toBe("textbox");

  dispose();
  expect(element.contentEditable).not.toBe("true");
});

it("should sync selection and input with another document", async () => {
  const initialValue = "This is new window!";
  const { editor, element, getText, dispose } = init(initialValue);

  element.dispatchEvent(new childWindow.FocusEvent("focus"));

  // Moving caret in another document should be synced to the editor
  setCaret(element.childNodes[0]!.firstChild!, 1);
  await nextTask();
  expect(editor.selection).toEqual([1, 1]);

  // beforeinput from another realm should update the document
  const inserted = "test";
  const event = new childWindow.InputEvent("beforeinput", {
    inputType: "insertText",
    data: inserted,
    bubbles: true,
    cancelable: true,
  });
  (event as any).getTargetRanges = () => [
    new childWindow.StaticRange({
      startContainer: element.childNodes[0]!.firstChild!,
      startOffset: 1,
      endContainer: element.childNodes[0]!.firstChild!,
      endOffset: 1,
    }),
  ];
  element.dispatchEvent(event);
  await nextTask();

  const caretOffset = 1 + inserted.length;
  expect(getText()).toBe(
    initialValue.slice(0, 1) + inserted + initialValue.slice(1),
  );
  expect(editor.selection).toEqual([caretOffset, caretOffset]);

  // The updated selection should be written back to another document
  // (syncDomSelection is scheduled with 50ms delay)
  await new Promise((resolve) => setTimeout(resolve, 100));
  const range = childDocument.getSelection()!.getRangeAt(0);
  expect(range.startContainer).toBe(element.childNodes[0]!.firstChild);
  expect(range.startOffset).toBe(caretOffset);
  expect(range.collapsed).toBe(true);

  dispose();
});

it("merges blocks on a collapsed deleteContentBackward target range", async () => {
  // Firefox reports a collapsed target range for a Backspace that should cross a
  // block boundary when blocks are separated by framework anchor nodes (e.g.
  // Svelte's `{#each}`). The editor falls back to deleting one position backward
  // so the two blocks still merge.
  const { editor, element, getText, dispose } = init("a\nb");

  element.dispatchEvent(new childWindow.FocusEvent("focus"));

  // Caret at the very start of the second block ("b") — doc offset 2
  // (block "a" is size 1, plus the inter-block separator).
  setCaret(element.childNodes[1]!.firstChild!, 0);
  await nextTask();
  expect(editor.selection).toEqual([2, 2]);

  const event = new childWindow.InputEvent("beforeinput", {
    inputType: "deleteContentBackward",
    bubbles: true,
    cancelable: true,
  });
  (event as any).getTargetRanges = () => [
    new childWindow.StaticRange({
      startContainer: element.childNodes[1]!.firstChild!,
      startOffset: 0,
      endContainer: element.childNodes[1]!.firstChild!,
      endOffset: 0,
    }),
  ];
  element.dispatchEvent(event);
  await nextTask();

  expect(getText()).toBe("ab");
  expect(editor.selection).toEqual([1, 1]);

  dispose();
});

it("keeps a collapsed backward delete at the document start a no-op", async () => {
  const { editor, element, getText, dispose } = init("a\nb");

  element.dispatchEvent(new childWindow.FocusEvent("focus"));

  // Caret at the very start of the document — there is nothing to delete
  // backward, so the collapsed-range fallback must not underflow past 0.
  setCaret(element.childNodes[0]!.firstChild!, 0);
  await nextTask();
  expect(editor.selection).toEqual([0, 0]);

  const event = new childWindow.InputEvent("beforeinput", {
    inputType: "deleteContentBackward",
    bubbles: true,
    cancelable: true,
  });
  (event as any).getTargetRanges = () => [
    new childWindow.StaticRange({
      startContainer: element.childNodes[0]!.firstChild!,
      startOffset: 0,
      endContainer: element.childNodes[0]!.firstChild!,
      endOffset: 0,
    }),
  ];
  element.dispatchEvent(event);
  await nextTask();

  expect(getText()).toBe("a\nb");

  dispose();
});
