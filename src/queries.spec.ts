import { describe, expect, it } from "vitest";
import { createEditor } from "./editor.js";
import { BlocksInRange, LeavesInRange } from "./queries.js";

type Doc = {
  children: { children: { text: string; bold?: boolean }[] }[];
};

describe(LeavesInRange.name, () => {
  it("get the leaf at the caret with collapsed range", () => {
    const editor = createEditor<Doc>({
      doc: {
        children: [
          { children: [{ text: "abc", bold: true }, { text: "def" }] },
        ],
      },
    });

    expect([...editor.exec(LeavesInRange, [1, 1])]).toEqual([
      { text: "abc", bold: true },
    ]);
  });

  it("get every leaf intersecting with the range", () => {
    const editor = createEditor<Doc>({
      doc: {
        children: [
          { children: [{ text: "abc", bold: true }, { text: "def" }] },
        ],
      },
    });

    expect([...editor.exec(LeavesInRange, [2, 4])]).toEqual([
      { text: "abc", bold: true },
      { text: "def" },
    ]);
  });

  it("exclude the leaf the range ends at the start of", () => {
    const editor = createEditor<Doc>({
      doc: {
        children: [
          { children: [{ text: "abc", bold: true }, { text: "def" }] },
        ],
      },
    });

    expect([...editor.exec(LeavesInRange, [0, 3])]).toEqual([
      { text: "abc", bold: true },
    ]);
  });

  it("exclude the next line when the range ends at its start", () => {
    const editor = createEditor<Doc>({
      doc: {
        children: [
          { children: [{ text: "abc", bold: true }] },
          { children: [{ text: "def" }] },
        ],
      },
    });

    expect([...editor.exec(LeavesInRange, [0, 4])]).toEqual([
      { text: "abc", bold: true },
    ]);
  });

  it("include an empty line the range ends at", () => {
    const editor = createEditor<Doc>({
      doc: {
        children: [
          { children: [{ text: "abc", bold: true }] },
          { children: [{ text: "" }] },
        ],
      },
    });

    expect([...editor.exec(LeavesInRange, [0, 4])]).toEqual([
      { text: "abc", bold: true },
      { text: "" },
    ]);
    expect([...editor.exec(BlocksInRange, [0, 4])]).toHaveLength(2);
  });

  it("exclude the leaf the range starts at the end of", () => {
    const editor = createEditor<Doc>({
      doc: {
        children: [
          { children: [{ text: "abc", bold: true }, { text: "def" }] },
        ],
      },
    });

    expect([...editor.exec(LeavesInRange, [3, 5])]).toEqual([{ text: "def" }]);
  });

  it("include an empty line inside the range and one the range starts at", () => {
    const editor = createEditor<Doc>({
      doc: {
        children: [
          { children: [{ text: "abc" }] },
          { children: [{ text: "" }] },
          { children: [{ text: "def" }] },
        ],
      },
    });

    expect([...editor.exec(LeavesInRange, [1, 6])]).toEqual([
      { text: "abc" },
      { text: "" },
      { text: "def" },
    ]);
    expect([...editor.exec(LeavesInRange, [4, 6])]).toEqual([
      { text: "" },
      { text: "def" },
    ]);
  });

  it("include the empty item of a list the range ends at", () => {
    type Item = { children: { text: string }[] };
    const editor = createEditor<{ children: (Item | { children: Item[] })[] }>({
      doc: {
        children: [
          { children: [{ text: "abc" }] },
          {
            children: [
              { children: [{ text: "" }] },
              { children: [{ text: "def" }] },
            ],
          },
        ],
      },
    });

    expect([...editor.exec(LeavesInRange, [1, 4])]).toEqual([
      { text: "abc" },
      { text: "" },
    ]);
    expect([...editor.exec(BlocksInRange, [1, 4])]).toEqual([
      [{ children: [{ text: "abc" }] }, 0, [1, 3]],
      [{ children: [{ text: "" }] }, 4, [0, 0]],
    ]);
  });
});

describe(BlocksInRange.name, () => {
  it("get the block at the caret with collapsed range", () => {
    const editor = createEditor<Doc>({
      doc: {
        children: [
          { children: [{ text: "abcde" }] },
          { children: [{ text: "fghij" }] },
        ],
      },
    });

    expect([...editor.exec(BlocksInRange, [7, 7])]).toEqual([
      [{ children: [{ text: "fghij" }] }, 6, [1, 1]],
    ]);
  });

  it("get the block at the start of a line with collapsed range", () => {
    const editor = createEditor<Doc>({
      doc: {
        children: [
          { children: [{ text: "abcde" }] },
          { children: [{ text: "fghij" }] },
        ],
      },
    });

    expect([...editor.exec(BlocksInRange, [6, 6])]).toEqual([
      [{ children: [{ text: "fghij" }] }, 6, [0, 0]],
    ]);
  });

  it("get every block intersecting with the range", () => {
    const editor = createEditor<Doc>({
      doc: {
        children: [
          { children: [{ text: "abcde" }] },
          { children: [{ text: "fghij" }] },
          { children: [{ text: "klmno" }] },
        ],
      },
    });

    expect([...editor.exec(BlocksInRange, [2, 14])]).toEqual([
      [{ children: [{ text: "abcde" }] }, 0, [2, 5]],
      [{ children: [{ text: "fghij" }] }, 6, [0, 5]],
      [{ children: [{ text: "klmno" }] }, 12, [0, 2]],
    ]);
  });

  it("exclude the block the range ends at the start of", () => {
    const editor = createEditor<Doc>({
      doc: {
        children: [
          { children: [{ text: "abcde" }] },
          { children: [{ text: "fghij" }] },
        ],
      },
    });

    expect([...editor.exec(BlocksInRange, [0, 6])]).toEqual([
      [{ children: [{ text: "abcde" }] }, 0, [0, 5]],
    ]);
  });

  it("exclude the block the range starts at the end of", () => {
    const editor = createEditor<Doc>({
      doc: {
        children: [
          { children: [{ text: "abcde" }] },
          { children: [{ text: "fghij" }] },
        ],
      },
    });

    expect([...editor.exec(BlocksInRange, [5, 11])]).toEqual([
      [{ children: [{ text: "fghij" }] }, 6, [0, 5]],
    ]);
  });

  it("include an empty block inside the range", () => {
    const editor = createEditor<Doc>({
      doc: {
        children: [
          { children: [{ text: "abcde" }] },
          { children: [{ text: "" }] },
          { children: [{ text: "klmno" }] },
        ],
      },
    });

    expect([...editor.exec(BlocksInRange, [2, 9])]).toEqual([
      [{ children: [{ text: "abcde" }] }, 0, [2, 5]],
      [{ children: [{ text: "" }] }, 6, [0, 0]],
      [{ children: [{ text: "klmno" }] }, 7, [0, 2]],
    ]);
  });

  it("include an empty block the range ends at", () => {
    const editor = createEditor<Doc>({
      doc: {
        children: [
          { children: [{ text: "abcde" }] },
          { children: [{ text: "" }] },
        ],
      },
    });

    expect([...editor.exec(BlocksInRange, [2, 6])]).toEqual([
      [{ children: [{ text: "abcde" }] }, 0, [2, 5]],
      [{ children: [{ text: "" }] }, 6, [0, 0]],
    ]);
  });

  it("use the backward selection by default", () => {
    const editor = createEditor<Doc>({
      doc: {
        children: [
          { children: [{ text: "abcde" }] },
          { children: [{ text: "fghij" }] },
          { children: [{ text: "klmno" }] },
        ],
      },
    });
    editor.selection = [8, 2];

    expect([...editor.exec(BlocksInRange)]).toEqual([
      [{ children: [{ text: "abcde" }] }, 0, [2, 5]],
      [{ children: [{ text: "fghij" }] }, 6, [0, 2]],
    ]);
  });
});
