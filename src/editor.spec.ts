import { expect, it } from "vitest";
import type { DocNode } from "./doc/types.js";
import { createEditor } from "./editor.js";

const createDoc = (): DocNode => ({
  children: [{ children: [{ text: "abcde" }] }],
});

it("apply hook not calling next passes operation through", () => {
  const editor = createEditor({ doc: createDoc() });
  editor.hook("apply", () => {});
  editor.apply({ type: "insert_text", at: 1, text: "x" });
  expect(editor.doc).toEqual({
    children: [{ children: [{ text: "axbcde" }] }],
  });
});

it("apply hook replaces operation with next(op)", () => {
  const editor = createEditor({ doc: createDoc() });
  editor.hook("apply", (op, next) => {
    next(
      op.type === "insert_text" ? { ...op, text: op.text.toUpperCase() } : op,
    );
  });
  editor.apply({ type: "insert_text", at: 1, text: "x" });
  expect(editor.doc).toEqual({
    children: [{ children: [{ text: "aXbcde" }] }],
  });
});

it.each([null, undefined])(
  "apply hook cancels operation with next(%s)",
  async (value) => {
    const doc = createDoc();
    const editor = createEditor({ doc });
    const calls: string[] = [];
    editor.hook("apply", (_op, next) => {
      calls.push("first");
      next(value);
    });
    editor.hook("apply", () => {
      calls.push("second");
    });
    let changed = false;
    editor.on("change", () => {
      changed = true;
    });
    editor.apply({ type: "insert_text", at: 1, text: "x" });
    expect(calls).toEqual(["first"]);
    expect(editor.doc).toEqual(doc);
    await new Promise((r) => setTimeout(r));
    expect(changed).toBe(false);
  },
);
