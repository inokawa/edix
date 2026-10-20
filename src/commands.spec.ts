import { describe, expect, it } from "vitest";
import { createEditor } from "./editor.js";
import {
  Format,
  SetBlockAttr,
  SetVoidAttr,
  ToggleBlockAttr,
  ToggleFormat,
} from "./commands.js";

type Doc = {
  children: {
    align?: string;
    children: ({ text: string; bold?: boolean } | { label: string })[];
  }[];
};

describe(Format.name, () => {
  it("skip void node in range", () => {
    const editor = createEditor<Doc>({
      doc: {
        children: [
          { children: [{ text: "ab" }, { label: "x" }, { text: "cd" }] },
        ],
      },
    });
    editor.exec(Format, "bold", true, [0, 5]);

    expect(editor.doc).toEqual({
      children: [
        {
          children: [
            { text: "ab", bold: true },
            { label: "x" },
            { text: "cd", bold: true },
          ],
        },
      ],
    });
  });

  it("skip void node inside partially covered texts", () => {
    const editor = createEditor<Doc>({
      doc: {
        children: [
          { children: [{ text: "ab" }, { label: "x" }, { text: "cd" }] },
        ],
      },
    });
    editor.exec(Format, "bold", true, [1, 4]);

    expect(editor.doc).toEqual({
      children: [
        {
          children: [
            { text: "a" },
            { text: "b", bold: true },
            { label: "x" },
            { text: "c", bold: true },
            { text: "d" },
          ],
        },
      ],
    });
  });

  it("skip void node in range spanning blocks", () => {
    const editor = createEditor<Doc>({
      doc: {
        children: [
          { children: [{ text: "ab" }, { label: "x" }] },
          { children: [{ text: "cd" }] },
        ],
      },
    });
    editor.exec(Format, "bold", true, [0, 6]);

    expect(editor.doc).toEqual({
      children: [
        { children: [{ text: "ab", bold: true }, { label: "x" }] },
        { children: [{ text: "cd", bold: true }] },
      ],
    });
  });

  it("do nothing if range covers only a void node", () => {
    const doc: Doc = {
      children: [
        { children: [{ text: "ab" }, { label: "x" }, { text: "cd" }] },
      ],
    };
    const editor = createEditor<Doc>({ doc });
    editor.exec(Format, "bold", true, [2, 3]);

    expect(editor.doc).toEqual(doc);
  });

  it("update empty text with collapsed range", () => {
    const editor = createEditor<Doc>({
      doc: { children: [{ children: [{ text: "" }] }] },
    });
    editor.exec(Format, "bold", true, [0, 0]);

    expect(editor.doc).toEqual({
      children: [{ children: [{ text: "", bold: true }] }],
    });
  });
});

describe(ToggleFormat.name, () => {
  it("skip void node in range", () => {
    const editor = createEditor<Doc>({
      doc: {
        children: [
          { children: [{ text: "ab" }, { label: "x" }, { text: "cd" }] },
        ],
      },
    });
    editor.exec(ToggleFormat, "bold", [0, 5]);

    expect(editor.doc).toEqual({
      children: [
        {
          children: [
            { text: "ab", bold: true },
            { label: "x" },
            { text: "cd", bold: true },
          ],
        },
      ],
    });
  });

  it("do nothing if range covers only a void node", () => {
    const doc: Doc = {
      children: [
        { children: [{ text: "ab" }, { label: "x" }, { text: "cd" }] },
      ],
    };
    const editor = createEditor<Doc>({ doc });
    editor.exec(ToggleFormat, "bold", [2, 3]);

    expect(editor.doc).toEqual(doc);
  });
});

describe(SetBlockAttr.name, () => {
  it("update the block at the caret", () => {
    const editor = createEditor<Doc>({
      doc: {
        children: [
          { children: [{ text: "abcde" }] },
          { children: [{ text: "fghij" }] },
        ],
      },
    });
    editor.exec(SetBlockAttr, "align", "right", [7, 7]);

    expect(editor.doc).toEqual({
      children: [
        { children: [{ text: "abcde" }] },
        { align: "right", children: [{ text: "fghij" }] },
      ],
    });
  });

  it("update the cell at the caret inside a table", () => {
    type TableDoc = {
      children: (
        | { children: { text: string }[] }
        | {
            children: {
              children: { align?: string; children: { text: string }[] }[];
            }[];
          }
      )[];
    };
    const editor = createEditor<TableDoc>({
      doc: {
        children: [
          { children: [{ text: "abcde" }] },
          {
            children: [
              {
                children: [
                  { children: [{ text: "1" }] },
                  { children: [{ text: "2" }] },
                ],
              },
            ],
          },
        ],
      },
    });
    editor.exec(SetBlockAttr, "align", "right", [8, 8]);

    expect(editor.doc).toEqual({
      children: [
        { children: [{ text: "abcde" }] },
        {
          children: [
            {
              children: [
                { children: [{ text: "1" }] },
                { align: "right", children: [{ text: "2" }] },
              ],
            },
          ],
        },
      ],
    });
  });

  it("update every block in multiline range", () => {
    const editor = createEditor<Doc>({
      doc: {
        children: [
          { children: [{ text: "abcde" }] },
          { children: [{ text: "fghij" }] },
          { children: [{ text: "klmno" }] },
        ],
      },
    });
    editor.exec(SetBlockAttr, "align", "right", [2, 14]);

    expect(editor.doc).toEqual({
      children: [
        { align: "right", children: [{ text: "abcde" }] },
        { align: "right", children: [{ text: "fghij" }] },
        { align: "right", children: [{ text: "klmno" }] },
      ],
    });
  });

  it("skip the block the range ends at the start of", () => {
    const editor = createEditor<Doc>({
      doc: {
        children: [
          { children: [{ text: "abcde" }] },
          { children: [{ text: "fghij" }] },
        ],
      },
    });
    editor.exec(SetBlockAttr, "align", "right", [0, 6]);

    expect(editor.doc).toEqual({
      children: [
        { align: "right", children: [{ text: "abcde" }] },
        { children: [{ text: "fghij" }] },
      ],
    });
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
    editor.exec(SetBlockAttr, "align", "right");

    expect(editor.doc).toEqual({
      children: [
        { align: "right", children: [{ text: "abcde" }] },
        { align: "right", children: [{ text: "fghij" }] },
        { children: [{ text: "klmno" }] },
      ],
    });
  });
});

describe(SetVoidAttr.name, () => {
  it("update the void node just before the caret", () => {
    const editor = createEditor<Doc>({
      doc: {
        children: [
          { children: [{ text: "ab" }, { label: "x" }, { text: "cd" }] },
        ],
      },
    });
    editor.exec(SetVoidAttr, "label", "y", 3);

    expect(editor.doc).toEqual({
      children: [
        { children: [{ text: "ab" }, { label: "y" }, { text: "cd" }] },
      ],
    });
  });

  it("do nothing if the caret is in a text node", () => {
    const doc: Doc = {
      children: [
        { children: [{ text: "ab" }, { label: "x" }, { text: "cd" }] },
      ],
    };
    const editor = createEditor<Doc>({ doc });
    editor.exec(SetVoidAttr, "label", "y", 4);

    expect(editor.doc).toEqual(doc);
  });
});

describe(ToggleBlockAttr.name, () => {
  it("turn on if no block in range is on", () => {
    const editor = createEditor<Doc>({
      doc: {
        children: [
          { children: [{ text: "abcde" }] },
          { children: [{ text: "fghij" }] },
        ],
      },
    });
    editor.exec(ToggleBlockAttr, "align", "right", undefined, [2, 8]);

    expect(editor.doc).toEqual({
      children: [
        { align: "right", children: [{ text: "abcde" }] },
        { align: "right", children: [{ text: "fghij" }] },
      ],
    });
  });

  it("turn on if only some blocks in range are on", () => {
    const editor = createEditor<Doc>({
      doc: {
        children: [
          { align: "right", children: [{ text: "abcde" }] },
          { children: [{ text: "fghij" }] },
        ],
      },
    });
    editor.exec(ToggleBlockAttr, "align", "right", undefined, [2, 8]);

    expect(editor.doc).toEqual({
      children: [
        { align: "right", children: [{ text: "abcde" }] },
        { align: "right", children: [{ text: "fghij" }] },
      ],
    });
  });

  it("turn off if every block in range is on", () => {
    const editor = createEditor<Doc>({
      doc: {
        children: [
          { align: "right", children: [{ text: "abcde" }] },
          { align: "right", children: [{ text: "fghij" }] },
        ],
      },
    });
    editor.exec(ToggleBlockAttr, "align", "right", undefined, [2, 8]);

    expect(editor.doc).toEqual({
      children: [
        { children: [{ text: "abcde" }] },
        { children: [{ text: "fghij" }] },
      ],
    });
  });
});
