import { describe, expect, it } from "vitest";
import { deleteEdit, insertEdit } from "./edit";
import type { DocFragment, SelectionSnapshot, Writeable } from "../types";

const splitAt = (targetStr: string, index: number): [string, string] => {
  return [targetStr.slice(0, index), targetStr.slice(index)];
};

const insertAt = (targetStr: string, index: number, text: string): string => {
  const splitted = splitAt(targetStr, index);
  return splitted[0] + text + splitted[1];
};

const deleteAt = (targetStr: string, index: number, length: number): string => {
  return targetStr.slice(0, index) + targetStr.slice(index + length);
};

const moveOffset = (
  selection: SelectionSnapshot,
  offset: number | { anchor?: number; focus?: number }
): SelectionSnapshot => {
  const anchorOffset = typeof offset === "number" ? offset : offset.anchor ?? 0;
  const focusOffset = typeof offset === "number" ? offset : offset.focus ?? 0;
  return [
    [selection[0][0], selection[0][1] + anchorOffset],
    [selection[1][0], selection[1][1] + focusOffset],
  ];
};

const moveLine = (
  selection: SelectionSnapshot,
  line: number | { anchor?: number; focus?: number }
): SelectionSnapshot => {
  const anchorLine = typeof line === "number" ? line : line.anchor ?? 0;
  const focusLine = typeof line === "number" ? line : line.focus ?? 0;
  return [
    [selection[0][0] + anchorLine, selection[0][1]],
    [selection[1][0] + focusLine, selection[1][1]],
  ];
};

describe(insertEdit.name, () => {
  it("insert text at line before caret", () => {
    const docText = "abcde";
    const docText2 = "fghij";
    const doc: Writeable<DocFragment> = [[docText], [docText2]];
    const sel: Writeable<SelectionSnapshot> = [
      [1, 2],
      [1, 2],
    ];
    const initialSel: SelectionSnapshot = structuredClone(sel);
    const text = "ABC";
    insertEdit(doc, sel, [[text]], [0, 1]);

    expect(doc).toEqual([[insertAt(docText, 1, text)], [docText2]]);
    expect(sel).toEqual(initialSel);
  });

  it("insert lines at line before caret", () => {
    const docText = "abcde";
    const docText2 = "fghij";
    const doc: Writeable<DocFragment> = [[docText], [docText2]];
    const sel: Writeable<SelectionSnapshot> = [
      [1, 2],
      [1, 2],
    ];
    const initialSel: SelectionSnapshot = structuredClone(sel);
    const text = "ABC";
    const text2 = "DEFG";
    insertEdit(doc, sel, [[text], [text2]], [0, 1]);

    const [before, after] = splitAt(docText, 1);
    expect(doc).toEqual([[before + text], [text2 + after], [docText2]]);
    expect(sel).toEqual(moveLine(initialSel, 1));
  });

  it("insert text before caret", () => {
    const docText = "abcde";
    const doc: Writeable<DocFragment> = [[docText]];
    const sel: Writeable<SelectionSnapshot> = [
      [0, 2],
      [0, 2],
    ];
    const initialSel: SelectionSnapshot = structuredClone(sel);
    const text = "ABC";
    insertEdit(doc, sel, [[text]], [0, 1]);

    expect(doc).toEqual([[insertAt(docText, 1, text)]]);
    expect(sel).toEqual(moveOffset(initialSel, text.length));
  });

  it("insert lines before caret", () => {
    const docText = "abcde";
    const doc: Writeable<DocFragment> = [[docText]];
    const sel: Writeable<SelectionSnapshot> = [
      [0, 2],
      [0, 2],
    ];
    const initialSel: SelectionSnapshot = structuredClone(sel);
    const text = "ABC";
    const text2 = "DEFG";
    insertEdit(doc, sel, [[text], [text2]], [0, 1]);

    const [before, after] = splitAt(docText, 1);
    expect(doc).toEqual([[before + text], [text2 + after]]);
    expect(sel).toEqual(
      moveLine(moveOffset(initialSel, -before.length + text2.length), 1)
    );
  });

  it("insert text on caret", () => {
    const docText = "abcde";
    const doc: Writeable<DocFragment> = [[docText]];
    const sel: Writeable<SelectionSnapshot> = [
      [0, 2],
      [0, 2],
    ];
    const initialSel: SelectionSnapshot = structuredClone(sel);
    const text = "ABC";
    insertEdit(doc, sel, [[text]], [0, 2]);

    expect(doc).toEqual([[insertAt(docText, 2, text)]]);
    expect(sel).toEqual(moveOffset(initialSel, text.length));
  });

  it("insert lines on caret", () => {
    const docText = "abcde";
    const doc: Writeable<DocFragment> = [[docText]];
    const sel: Writeable<SelectionSnapshot> = [
      [0, 2],
      [0, 2],
    ];
    const initialSel: SelectionSnapshot = structuredClone(sel);
    const text = "ABC";
    const text2 = "DEFG";
    insertEdit(doc, sel, [[text], [text2]], [0, 2]);

    const [before, after] = splitAt(docText, 2);
    expect(doc).toEqual([[before + text], [text2 + after]]);
    expect(sel).toEqual(
      moveLine(moveOffset(initialSel, -before.length + text2.length), 1)
    );
  });

  it("insert text inside selection", () => {
    const docText = "abcde";
    const doc: Writeable<DocFragment> = [[docText]];
    const sel: Writeable<SelectionSnapshot> = [
      [0, 1],
      [0, 3],
    ];
    const initialSel: SelectionSnapshot = structuredClone(sel);
    const text = "ABC";
    insertEdit(doc, sel, [[text]], [0, 2]);

    expect(doc).toEqual([[insertAt(docText, 2, text)]]);
    expect(sel).toEqual(moveOffset(initialSel, { focus: text.length }));
  });

  it("insert lines inside selection", () => {
    const docText = "abcde";
    const doc: Writeable<DocFragment> = [[docText]];
    const sel: Writeable<SelectionSnapshot> = [
      [0, 1],
      [0, 3],
    ];
    const initialSel: SelectionSnapshot = structuredClone(sel);
    const text = "ABC";
    const text2 = "DEFG";
    insertEdit(doc, sel, [[text], [text2]], [0, 2]);

    const [before, after] = splitAt(docText, 2);
    expect(doc).toEqual([[before + text], [text2 + after]]);
    expect(sel).toEqual(
      moveLine(
        moveOffset(initialSel, { focus: -before.length + text2.length }),
        { focus: 1 }
      )
    );
  });

  it("insert text after caret", () => {
    const docText = "abcde";
    const doc: Writeable<DocFragment> = [[docText]];
    const sel: Writeable<SelectionSnapshot> = [
      [0, 2],
      [0, 2],
    ];
    const initialSel: SelectionSnapshot = structuredClone(sel);
    const text = "ABC";
    insertEdit(doc, sel, [[text]], [0, 3]);

    expect(doc).toEqual([[insertAt(docText, 3, text)]]);
    expect(sel).toEqual(initialSel);
  });

  it("insert lines after caret", () => {
    const docText = "abcde";
    const doc: Writeable<DocFragment> = [[docText]];
    const sel: Writeable<SelectionSnapshot> = [
      [0, 2],
      [0, 2],
    ];
    const initialSel: SelectionSnapshot = structuredClone(sel);
    const text = "ABC";
    const text2 = "DEFG";
    insertEdit(doc, sel, [[text], [text2]], [0, 3]);

    const [before, after] = splitAt(docText, 3);
    expect(doc).toEqual([[before + text], [text2 + after]]);
    expect(sel).toEqual(initialSel);
  });

  it("insert text at line after caret", () => {
    const docText = "abcde";
    const docText2 = "fghij";
    const doc: Writeable<DocFragment> = [[docText], [docText2]];
    const sel: Writeable<SelectionSnapshot> = [
      [0, 2],
      [0, 2],
    ];
    const initialSel: SelectionSnapshot = structuredClone(sel);
    const text = "ABC";
    insertEdit(doc, sel, [[text]], [1, 1]);

    expect(doc).toEqual([[docText], [insertAt(docText2, 1, text)]]);
    expect(sel).toEqual(initialSel);
  });

  it("insert lines at line after caret", () => {
    const docText = "abcde";
    const docText2 = "fghij";
    const doc: Writeable<DocFragment> = [[docText], [docText2]];
    const sel: Writeable<SelectionSnapshot> = [
      [0, 2],
      [0, 2],
    ];
    const initialSel: SelectionSnapshot = structuredClone(sel);
    const text = "ABC";
    const text2 = "DEFG";
    insertEdit(doc, sel, [[text], [text2]], [1, 1]);

    const [before, after] = splitAt(docText2, 1);
    expect(doc).toEqual([[docText], [before + text], [text2 + after]]);
    expect(sel).toEqual(initialSel);
  });
});

describe(deleteEdit.name, () => {
  it("do nothing if start and end is the same", () => {
    const docText = "abcde";
    const doc: Writeable<DocFragment> = [[docText]];
    const sel: Writeable<SelectionSnapshot> = [
      [0, 2],
      [0, 2],
    ];
    const initialDoc: DocFragment = structuredClone(doc);
    const initialSel: SelectionSnapshot = structuredClone(sel);
    deleteEdit(doc, sel, [0, 1], [0, 1]);

    expect(doc).toEqual(initialDoc);
    expect(sel).toEqual(initialSel);
  });

  it("delete text at line before caret", () => {
    const docText = "abcde";
    const docText2 = "fghij";
    const doc: Writeable<DocFragment> = [[docText], [docText2]];
    const sel: Writeable<SelectionSnapshot> = [
      [1, 2],
      [1, 2],
    ];
    const initialSel: SelectionSnapshot = structuredClone(sel);
    deleteEdit(doc, sel, [0, 1], [0, 2]);

    expect(doc).toEqual([[deleteAt(docText, 1, 1)], [docText2]]);
    expect(sel).toEqual(initialSel);
  });

  it("delete linebreak at line before caret", () => {
    const docText = "abcde";
    const docText2 = "fghij";
    const doc: Writeable<DocFragment> = [[docText], [docText2]];
    const sel: Writeable<SelectionSnapshot> = [
      [1, 3],
      [1, 3],
    ];

    deleteEdit(doc, sel, [0, 2], [1, 1]);

    expect(doc).toEqual([
      [deleteAt(docText, 2, docText.length - 1) + deleteAt(docText2, 0, 1)],
    ]);
    expect(sel).toEqual([
      [0, 2 + (3 - 1)],
      [0, 2 + (3 - 1)],
    ]);
  });

  it("delete text before caret", () => {
    const docText = "abcde";
    const doc: Writeable<DocFragment> = [[docText]];
    const sel: Writeable<SelectionSnapshot> = [
      [0, 3],
      [0, 3],
    ];
    const initialSel: SelectionSnapshot = structuredClone(sel);
    deleteEdit(doc, sel, [0, 1], [0, 2]);

    expect(doc).toEqual([[deleteAt(docText, 1, 1)]]);
    expect(sel).toEqual(moveOffset(initialSel, -1));
  });

  it("delete text just before caret", () => {
    const docText = "abcde";
    const doc: Writeable<DocFragment> = [[docText]];
    const sel: Writeable<SelectionSnapshot> = [
      [0, 3],
      [0, 3],
    ];
    const initialSel: SelectionSnapshot = structuredClone(sel);
    deleteEdit(doc, sel, [0, 2], [0, 3]);

    expect(doc).toEqual([[deleteAt(docText, 2, 1)]]);
    expect(sel).toEqual(moveOffset(initialSel, -1));
  });

  it("delete text around caret", () => {
    const docText = "abcde";
    const doc: Writeable<DocFragment> = [[docText]];
    const sel: Writeable<SelectionSnapshot> = [
      [0, 3],
      [0, 3],
    ];
    const initialSel: SelectionSnapshot = structuredClone(sel);
    deleteEdit(doc, sel, [0, 2], [0, 4]);

    expect(doc).toEqual([[deleteAt(docText, 2, 2)]]);
    expect(sel).toEqual(moveOffset(initialSel, -1));
  });

  it("delete text around selection", () => {
    const docText = "abcde";
    const doc: Writeable<DocFragment> = [[docText]];
    const sel: Writeable<SelectionSnapshot> = [
      [0, 2],
      [0, 4],
    ];
    deleteEdit(doc, sel, [0, 1], [0, 5]);

    expect(doc).toEqual([[deleteAt(docText, 1, 4)]]);
    expect(sel).toEqual([
      [0, 1],
      [0, 1],
    ]);
  });

  it("delete text around selection anchor", () => {
    const docText = "abcde";
    const doc: Writeable<DocFragment> = [[docText]];
    const sel: Writeable<SelectionSnapshot> = [
      [0, 2],
      [0, 4],
    ];
    const initialSel: SelectionSnapshot = structuredClone(sel);
    deleteEdit(doc, sel, [0, 1], [0, 3]);

    expect(doc).toEqual([[deleteAt(docText, 1, 2)]]);
    expect(sel).toEqual(moveOffset(initialSel, { anchor: 1 - 2, focus: -2 }));
  });

  it("delete text around selection focus", () => {
    const docText = "abcde";
    const doc: Writeable<DocFragment> = [[docText]];
    const sel: Writeable<SelectionSnapshot> = [
      [0, 2],
      [0, 4],
    ];
    const initialSel: SelectionSnapshot = structuredClone(sel);
    deleteEdit(doc, sel, [0, 3], [0, 5]);

    expect(doc).toEqual([[deleteAt(docText, 3, 2)]]);
    expect(sel).toEqual(moveOffset(initialSel, { focus: 1 - 2 }));
  });

  it("delete linebreak inside selection", () => {
    const docText = "abcde";
    const docText2 = "fghij";
    const doc: Writeable<DocFragment> = [[docText], [docText2]];
    const sel: Writeable<SelectionSnapshot> = [
      [0, 2],
      [1, 2],
    ];
    deleteEdit(doc, sel, [0, 3], [1, 1]);

    expect(doc).toEqual([[splitAt(docText, 3)[0] + splitAt(docText2, 1)[1]]]);
    expect(sel).toEqual([
      [0, 2],
      [0, 3 + 1],
    ]);
  });

  it("delete text just after caret", () => {
    const docText = "abcde";
    const doc: Writeable<DocFragment> = [[docText]];
    const sel: Writeable<SelectionSnapshot> = [
      [0, 3],
      [0, 3],
    ];
    const initialSel: SelectionSnapshot = structuredClone(sel);
    deleteEdit(doc, sel, [0, 3], [0, 4]);

    expect(doc).toEqual([[deleteAt(docText, 3, 1)]]);
    expect(sel).toEqual(initialSel);
  });

  it("delete text after caret", () => {
    const docText = "abcde";
    const doc: Writeable<DocFragment> = [[docText]];
    const sel: Writeable<SelectionSnapshot> = [
      [0, 3],
      [0, 3],
    ];
    const initialSel: SelectionSnapshot = structuredClone(sel);
    deleteEdit(doc, sel, [0, 4], [0, 5]);

    expect(doc).toEqual([[deleteAt(docText, 4, 1)]]);
    expect(sel).toEqual(initialSel);
  });

  it("delete text at line after caret", () => {
    const docText = "abcde";
    const docText2 = "fghij";
    const doc: Writeable<DocFragment> = [[docText], [docText2]];
    const sel: Writeable<SelectionSnapshot> = [
      [0, 2],
      [0, 2],
    ];
    const initialSel: SelectionSnapshot = structuredClone(sel);
    deleteEdit(doc, sel, [1, 1], [1, 2]);

    expect(doc).toEqual([[docText], [deleteAt(docText2, 1, 1)]]);
    expect(sel).toEqual(initialSel);
  });

  it("delete linebreak at line after caret", () => {
    const docText = "abcde";
    const docText2 = "fghij";
    const docText3 = "klmno";
    const doc: Writeable<DocFragment> = [[docText], [docText2], [docText3]];
    const sel: Writeable<SelectionSnapshot> = [
      [0, 2],
      [0, 2],
    ];
    const initialSel: SelectionSnapshot = structuredClone(sel);
    deleteEdit(doc, sel, [1, 1], [2, 1]);

    expect(doc).toEqual([
      [docText],
      [deleteAt(docText2, 1, docText2.length - 1) + deleteAt(docText3, 0, 1)],
    ]);
    expect(sel).toEqual(initialSel);
  });
});
