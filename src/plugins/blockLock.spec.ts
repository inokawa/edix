import { expect, it } from "vitest";
import { createEditor } from "../editor.js";
import { blockLockPlugin, LockedInRange } from "./blockLock.js";
import { Redo, Undo } from "./history.js";

type LockDoc = {
  children: {
    locked?: boolean;
    align?: string;
    children: { text: string; bold?: boolean }[];
  }[];
};

it("insert_text inside unlocked block", () => {
  const doc: LockDoc = {
    children: [
      { children: [{ text: "abcde" }] },
      { locked: true, children: [{ text: "fghij" }] },
      { children: [{ text: "klmno" }] },
    ],
  };
  const editor = createEditor({ doc }).exec(blockLockPlugin, {
    isLocked: (b) => !!b.locked,
  });
  editor.apply({ type: "insert_text", at: 2, text: "x" });
  expect(editor.doc.children[0]).toEqual({ children: [{ text: "abxcde" }] });
});

it("insert_text inside locked block", () => {
  const doc: LockDoc = {
    children: [
      { children: [{ text: "abcde" }] },
      { locked: true, children: [{ text: "fghij" }] },
      { children: [{ text: "klmno" }] },
    ],
  };
  const editor = createEditor({ doc }).exec(blockLockPlugin, {
    isLocked: (b) => !!b.locked,
  });
  editor.apply({ type: "insert_text", at: 8, text: "x" });
  expect(editor.doc).toEqual(doc);
});

it("insert_text at edges of locked block", () => {
  const doc: LockDoc = {
    children: [
      { children: [{ text: "abcde" }] },
      { locked: true, children: [{ text: "fghij" }] },
      { children: [{ text: "klmno" }] },
    ],
  };
  const editor = createEditor({ doc }).exec(blockLockPlugin, {
    isLocked: (b) => !!b.locked,
  });
  editor.apply({ type: "insert_text", at: 6, text: "x" });
  expect(editor.doc).toEqual(doc);
  editor.apply({ type: "insert_text", at: 11, text: "x" });
  expect(editor.doc).toEqual(doc);
});

it("insert_text at edges of neighbor blocks", () => {
  const doc: LockDoc = {
    children: [
      { children: [{ text: "abcde" }] },
      { locked: true, children: [{ text: "fghij" }] },
      { children: [{ text: "klmno" }] },
    ],
  };
  const editor = createEditor({ doc }).exec(blockLockPlugin, {
    isLocked: (b) => !!b.locked,
  });
  editor.apply({ type: "insert_text", at: 5, text: "x" });
  expect(editor.doc.children[0]).toEqual({ children: [{ text: "abcdex" }] });
  editor.apply({ type: "insert_text", at: 13, text: "y" });
  expect(editor.doc.children[2]).toEqual({ children: [{ text: "yklmno" }] });
});

it("insert_text linebreak before locked block", () => {
  const doc: LockDoc = {
    children: [
      { children: [{ text: "abcde" }] },
      { locked: true, children: [{ text: "fghij" }] },
      { children: [{ text: "klmno" }] },
    ],
  };
  const editor = createEditor({ doc }).exec(blockLockPlugin, {
    isLocked: (b) => !!b.locked,
  });
  editor.apply({ type: "insert_text", at: 5, text: "\n" });
  expect(editor.doc).toEqual({
    children: [
      { children: [{ text: "abcde" }] },
      { children: [{ text: "" }] },
      { locked: true, children: [{ text: "fghij" }] },
      { children: [{ text: "klmno" }] },
    ],
  });
});

it("insert_text linebreak at start of locked block", () => {
  const doc: LockDoc = {
    children: [
      { children: [{ text: "abcde" }] },
      { locked: true, children: [{ text: "fghij" }] },
      { children: [{ text: "klmno" }] },
    ],
  };
  const editor = createEditor({ doc }).exec(blockLockPlugin, {
    isLocked: (b) => !!b.locked,
  });
  editor.apply({ type: "insert_text", at: 6, text: "\n" });
  expect(editor.doc).toEqual(doc);
});

it("delete inside unlocked block", () => {
  const doc: LockDoc = {
    children: [
      { children: [{ text: "abcde" }] },
      { locked: true, children: [{ text: "fghij" }] },
      { children: [{ text: "klmno" }] },
    ],
  };
  const editor = createEditor({ doc }).exec(blockLockPlugin, {
    isLocked: (b) => !!b.locked,
  });
  editor.apply({ type: "delete", range: [1, 3] });
  expect(editor.doc.children[0]).toEqual({ children: [{ text: "ade" }] });
});

it("delete inside locked block", () => {
  const doc: LockDoc = {
    children: [
      { children: [{ text: "abcde" }] },
      { locked: true, children: [{ text: "fghij" }] },
      { children: [{ text: "klmno" }] },
    ],
  };
  const editor = createEditor({ doc }).exec(blockLockPlugin, {
    isLocked: (b) => !!b.locked,
  });
  editor.apply({ type: "delete", range: [7, 9] });
  expect(editor.doc).toEqual(doc);
});

it("delete block boundaries of locked block", () => {
  const doc: LockDoc = {
    children: [
      { children: [{ text: "abcde" }] },
      { locked: true, children: [{ text: "fghij" }] },
      { children: [{ text: "klmno" }] },
    ],
  };
  const editor = createEditor({ doc }).exec(blockLockPlugin, {
    isLocked: (b) => !!b.locked,
  });
  // merge with previous block
  editor.apply({ type: "delete", range: [5, 6] });
  expect(editor.doc).toEqual(doc);
  // merge with next block
  editor.apply({ type: "delete", range: [11, 12] });
  expect(editor.doc).toEqual(doc);
});

it("delete until end of previous block", () => {
  const doc: LockDoc = {
    children: [
      { children: [{ text: "abcde" }] },
      { locked: true, children: [{ text: "fghij" }] },
      { children: [{ text: "klmno" }] },
    ],
  };
  const editor = createEditor({ doc }).exec(blockLockPlugin, {
    isLocked: (b) => !!b.locked,
  });
  editor.apply({ type: "delete", range: [3, 5] });
  expect(editor.doc.children[0]).toEqual({ children: [{ text: "abc" }] });
});

it("delete across locked block", () => {
  const doc: LockDoc = {
    children: [
      { children: [{ text: "abcde" }] },
      { locked: true, children: [{ text: "fghij" }] },
      { children: [{ text: "klmno" }] },
    ],
  };
  const editor = createEditor({ doc }).exec(blockLockPlugin, {
    isLocked: (b) => !!b.locked,
  });
  editor.apply({ type: "delete", range: [3, 14] });
  expect(editor.doc).toEqual(doc);
});

it("insert_node inside locked block", () => {
  const doc: LockDoc = {
    children: [
      { children: [{ text: "abcde" }] },
      { locked: true, children: [{ text: "fghij" }] },
      { children: [{ text: "klmno" }] },
    ],
  };
  const editor = createEditor({ doc }).exec(blockLockPlugin, {
    isLocked: (b) => !!b.locked,
  });
  editor.apply({ type: "insert_node", at: 8, fragment: [{ text: "x" }] });
  expect(editor.doc).toEqual(doc);
});

it("insert_node with blocks inside unlocked block", () => {
  const doc: LockDoc = {
    children: [
      { children: [{ text: "abcde" }] },
      { locked: true, children: [{ text: "fghij" }] },
      { children: [{ text: "klmno" }] },
    ],
  };
  const editor = createEditor({ doc }).exec(blockLockPlugin, {
    isLocked: (b) => !!b.locked,
  });
  editor.apply({
    type: "insert_node",
    at: 2,
    fragment: [{ children: [{ text: "X" }] }, { children: [{ text: "Y" }] }],
  });
  expect(editor.doc).toEqual({
    children: [
      { children: [{ text: "abX" }] },
      { children: [{ text: "Ycde" }] },
      { locked: true, children: [{ text: "fghij" }] },
      { children: [{ text: "klmno" }] },
    ],
  });
});

it("format inside locked block", () => {
  const doc: LockDoc = {
    children: [
      { children: [{ text: "abcde" }] },
      { locked: true, children: [{ text: "fghij" }] },
      { children: [{ text: "klmno" }] },
    ],
  };
  const editor = createEditor({ doc }).exec(blockLockPlugin, {
    isLocked: (b) => !!b.locked,
  });
  editor.apply({ type: "format", range: [7, 10], key: "bold", value: true });
  expect(editor.doc).toEqual(doc);
});

it("format collapsed inside locked block", () => {
  const doc: LockDoc = {
    children: [
      { children: [{ text: "abcde" }] },
      { locked: true, children: [{ text: "fghij" }] },
      { children: [{ text: "klmno" }] },
    ],
  };
  const editor = createEditor({ doc }).exec(blockLockPlugin, {
    isLocked: (b) => !!b.locked,
  });
  editor.apply({ type: "format", range: [8, 8], key: "bold", value: true });
  expect(editor.doc).toEqual(doc);
});

it("format inside unlocked block", () => {
  const doc: LockDoc = {
    children: [
      { children: [{ text: "abcde" }] },
      { locked: true, children: [{ text: "fghij" }] },
      { children: [{ text: "klmno" }] },
    ],
  };
  const editor = createEditor({ doc }).exec(blockLockPlugin, {
    isLocked: (b) => !!b.locked,
  });
  editor.apply({ type: "format", range: [1, 4], key: "bold", value: true });
  expect(editor.doc.children[0]).toEqual({
    children: [{ text: "a" }, { text: "bcd", bold: true }, { text: "e" }],
  });
});

it("format range touching edge of locked block", () => {
  const doc: LockDoc = {
    children: [
      { children: [{ text: "abcde" }] },
      { locked: true, children: [{ text: "fghij" }] },
      { children: [{ text: "klmno" }] },
    ],
  };
  const editor = createEditor({ doc }).exec(blockLockPlugin, {
    isLocked: (b) => !!b.locked,
  });
  editor.apply({ type: "format", range: [1, 6], key: "bold", value: true });
  expect(editor.doc.children[0]).toEqual({
    children: [{ text: "a" }, { text: "bcde", bold: true }],
  });
  expect(editor.doc.children[1]).toEqual(doc.children[1]);
});

it("patch_node on locked block", () => {
  const doc: LockDoc = {
    children: [
      { children: [{ text: "abcde" }] },
      { locked: true, children: [{ text: "fghij" }] },
      { children: [{ text: "klmno" }] },
    ],
  };
  const editor = createEditor({ doc }).exec(blockLockPlugin, {
    isLocked: (b) => !!b.locked,
  });
  editor.apply({ type: "patch_node", path: [1], key: "align", value: "right" });
  expect(editor.doc).toEqual(doc);
});

it("patch_node inside locked block", () => {
  const doc: LockDoc = {
    children: [
      { children: [{ text: "abcde" }] },
      { locked: true, children: [{ text: "fghij" }] },
      { children: [{ text: "klmno" }] },
    ],
  };
  const editor = createEditor({ doc }).exec(blockLockPlugin, {
    isLocked: (b) => !!b.locked,
  });
  editor.apply({ type: "patch_node", path: [1, 0], key: "bold", value: true });
  expect(editor.doc).toEqual(doc);
});

it("patch_node unlocking locked block", () => {
  const doc: LockDoc = {
    children: [
      { children: [{ text: "abcde" }] },
      { locked: true, children: [{ text: "fghij" }] },
      { children: [{ text: "klmno" }] },
    ],
  };
  const editor = createEditor({ doc }).exec(blockLockPlugin, {
    isLocked: (b) => !!b.locked,
  });
  editor.apply({ type: "patch_node", path: [1], key: "locked", value: false });
  expect(editor.doc.children[1]).toEqual({
    locked: false,
    children: [{ text: "fghij" }],
  });
  editor.apply({ type: "insert_text", at: 8, text: "x" });
  expect(editor.doc.children[1]).toEqual({
    locked: false,
    children: [{ text: "fgxhij" }],
  });
});

it("patch_node locking unlocked block", () => {
  const doc: LockDoc = {
    children: [
      { children: [{ text: "abcde" }] },
      { locked: true, children: [{ text: "fghij" }] },
      { children: [{ text: "klmno" }] },
    ],
  };
  const editor = createEditor({ doc }).exec(blockLockPlugin, {
    isLocked: (b) => !!b.locked,
  });
  editor.apply({ type: "patch_node", path: [0], key: "locked", value: true });
  expect(editor.doc.children[0]).toEqual({
    locked: true,
    children: [{ text: "abcde" }],
  });
  editor.apply({ type: "insert_text", at: 2, text: "x" });
  expect(editor.doc.children[0]).toEqual({
    locked: true,
    children: [{ text: "abcde" }],
  });
});

it("patch_node on root", () => {
  const doc: LockDoc = {
    children: [
      { children: [{ text: "abcde" }] },
      { locked: true, children: [{ text: "fghij" }] },
      { children: [{ text: "klmno" }] },
    ],
  };
  const editor = createEditor({ doc }).exec(blockLockPlugin, {
    isLocked: (b) => !!b.locked,
  });
  editor.apply({ type: "patch_node", path: [], key: "foo", value: 1 });
  expect(editor.doc).toEqual({ ...doc, foo: 1 });
});

it("undo and redo", () => {
  const doc: LockDoc = {
    children: [
      { children: [{ text: "abcde" }] },
      { locked: true, children: [{ text: "fghij" }] },
      { children: [{ text: "klmno" }] },
    ],
  };
  const editor = createEditor({ doc }).exec(blockLockPlugin, {
    isLocked: (b) => !!b.locked,
  });
  editor.apply({ type: "insert_text", at: 1, text: "x" });
  const updatedDoc = editor.doc;
  expect(updatedDoc.children[0]).toEqual({ children: [{ text: "axbcde" }] });

  editor.exec(Undo);
  expect(editor.doc).toEqual(doc);

  editor.exec(Redo);
  expect(editor.doc).toEqual(updatedDoc);
});

it("rejected delete also cancels paired insert", async () => {
  const doc: LockDoc = {
    children: [
      { children: [{ text: "abcde" }] },
      { locked: true, children: [{ text: "fghij" }] },
      { children: [{ text: "klmno" }] },
    ],
  };
  const editor = createEditor({ doc }).exec(blockLockPlugin, {
    isLocked: (b) => !!b.locked,
  });
  editor.apply([
    { type: "delete", range: [3, 9] },
    { type: "insert_text", at: 3, text: "x" },
  ]);
  expect(editor.doc).toEqual(doc);

  // suppression must not leak to unrelated inserts
  await Promise.resolve();
  editor.apply({ type: "insert_text", at: 3, text: "x" });
  expect(editor.doc.children[0]).toEqual({ children: [{ text: "abcxde" }] });
});

it("LockedInRange", () => {
  const doc: LockDoc = {
    children: [
      { children: [{ text: "abcde" }] },
      { locked: true, children: [{ text: "fghij" }] },
      { children: [{ text: "klmno" }] },
    ],
  };
  const editor = createEditor({ doc }).exec(blockLockPlugin, {
    isLocked: (b) => !!b.locked,
  });
  expect(editor.exec(LockedInRange, [7, 9])).toBe(true);
  expect(editor.exec(LockedInRange, [1, 4])).toBe(false);
  expect(editor.exec(LockedInRange, [3, 14])).toBe(true);
  expect(editor.exec(LockedInRange, [8, 8])).toBe(true);
  expect(editor.exec(LockedInRange, [2, 2])).toBe(false);
  editor.selection = [7, 9];
  expect(editor.exec(LockedInRange)).toBe(true);
});
