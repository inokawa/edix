import { afterEach, describe, expect, it, vi } from "vitest";
import { Transaction, applyTransaction } from "./edit";
import {
  type DocFragment,
  type SelectionSnapshot,
  type Writeable,
} from "./types";

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

afterEach(() => {
  vi.restoreAllMocks();
});

it("rollback if error", () => {
  const docText = "abcde";
  const docText2 = "fghij";
  const doc: Writeable<DocFragment> = [
    [{ text: docText }],
    [{ text: docText2 }],
  ];
  const sel: Writeable<SelectionSnapshot> = [
    [1, 2],
    [1, 2],
  ];

  const docSnapshot = [...doc];
  const selSnapshot = [...sel];

  const consoleSpy = vi.spyOn(console, "error");

  applyTransaction(
    doc,
    sel,
    Transaction.from([
      { _type: 1, _start: [0, 0], _end: [0, 1] },
      { _type: 2, _pos: [0, 0], _fragment: {} as any },
    ])
  );

  expect(consoleSpy).toHaveBeenCalledOnce();
  expect(doc).toEqual(docSnapshot);
  expect(doc.every((n, i) => n === docSnapshot[i])).toBe(true);
  expect(sel).toEqual(selSnapshot);
  expect(sel.every((n, i) => n === selSnapshot[i])).toBe(true);
});

describe("insert", () => {
  it("should insert text at line before caret", () => {
    const docText = "abcde";
    const docText2 = "fghij";
    const doc: Writeable<DocFragment> = [
      [{ text: docText }],
      [{ text: docText2 }],
    ];
    const sel: Writeable<SelectionSnapshot> = [
      [1, 2],
      [1, 2],
    ];
    const initialSel: SelectionSnapshot = structuredClone(sel);
    const text = "ABC";
    applyTransaction(
      doc,
      sel,
      new Transaction().insert([0, 1], [[{ text: text }]])
    );

    expect(doc).toEqual([
      [{ text: insertAt(docText, 1, text) }],
      [{ text: docText2 }],
    ]);
    expect(sel).toEqual(initialSel);
  });

  it("should insert lines at line before caret", () => {
    const docText = "abcde";
    const docText2 = "fghij";
    const doc: Writeable<DocFragment> = [
      [{ text: docText }],
      [{ text: docText2 }],
    ];
    const sel: Writeable<SelectionSnapshot> = [
      [1, 2],
      [1, 2],
    ];
    const initialSel: SelectionSnapshot = structuredClone(sel);
    const text = "ABC";
    const text2 = "DEFG";
    applyTransaction(
      doc,
      sel,
      new Transaction().insert([0, 1], [[{ text: text }], [{ text: text2 }]])
    );

    const [before, after] = splitAt(docText, 1);
    expect(doc).toEqual([
      [{ text: before + text }],
      [{ text: text2 + after }],
      [{ text: docText2 }],
    ]);
    expect(sel).toEqual(moveLine(initialSel, 1));
  });

  it("should insert text before caret", () => {
    const docText = "abcde";
    const doc: Writeable<DocFragment> = [[{ text: docText }]];
    const sel: Writeable<SelectionSnapshot> = [
      [0, 2],
      [0, 2],
    ];
    const initialSel: SelectionSnapshot = structuredClone(sel);
    const text = "ABC";
    applyTransaction(
      doc,
      sel,
      new Transaction().insert([0, 1], [[{ text: text }]])
    );

    expect(doc).toEqual([[{ text: insertAt(docText, 1, text) }]]);
    expect(sel).toEqual(moveOffset(initialSel, text.length));
  });

  it("should insert text before caret on middle line", () => {
    const docText = "abcde";
    const docText2 = "fghi";
    const docText3 = "jkl";
    const doc: Writeable<DocFragment> = [
      [{ text: docText }],
      [{ text: docText2 }],
      [{ text: docText3 }],
    ];
    const sel: Writeable<SelectionSnapshot> = [
      [1, 2],
      [1, 2],
    ];
    const initialSel: SelectionSnapshot = structuredClone(sel);
    const text = "ABC";
    applyTransaction(
      doc,
      sel,
      new Transaction().insert([1, 1], [[{ text: text }]])
    );

    expect(doc).toEqual([
      [{ text: docText }],
      [{ text: insertAt(docText2, 1, text) }],
      [{ text: docText3 }],
    ]);
    expect(sel).toEqual(moveOffset(initialSel, text.length));
  });

  it("should insert lines before caret", () => {
    const docText = "abcde";
    const doc: Writeable<DocFragment> = [[{ text: docText }]];
    const sel: Writeable<SelectionSnapshot> = [
      [0, 2],
      [0, 2],
    ];
    const initialSel: SelectionSnapshot = structuredClone(sel);
    const text = "ABC";
    const text2 = "DEFG";
    applyTransaction(
      doc,
      sel,
      new Transaction().insert([0, 1], [[{ text: text }], [{ text: text2 }]])
    );

    const [before, after] = splitAt(docText, 1);
    expect(doc).toEqual([[{ text: before + text }], [{ text: text2 + after }]]);
    expect(sel).toEqual(
      moveLine(moveOffset(initialSel, -before.length + text2.length), 1)
    );
  });

  it("should insert text on caret", () => {
    const docText = "abcde";
    const doc: Writeable<DocFragment> = [[{ text: docText }]];
    const sel: Writeable<SelectionSnapshot> = [
      [0, 2],
      [0, 2],
    ];
    const initialSel: SelectionSnapshot = structuredClone(sel);
    const text = "ABC";
    applyTransaction(
      doc,
      sel,
      new Transaction().insert([0, 2], [[{ text: text }]])
    );

    expect(doc).toEqual([[{ text: insertAt(docText, 2, text) }]]);
    expect(sel).toEqual(moveOffset(initialSel, text.length));
  });

  it("should insert lines on caret", () => {
    const docText = "abcde";
    const doc: Writeable<DocFragment> = [[{ text: docText }]];
    const sel: Writeable<SelectionSnapshot> = [
      [0, 2],
      [0, 2],
    ];
    const initialSel: SelectionSnapshot = structuredClone(sel);
    const text = "ABC";
    const text2 = "DEFG";
    applyTransaction(
      doc,
      sel,
      new Transaction().insert([0, 2], [[{ text: text }], [{ text: text2 }]])
    );

    const [before, after] = splitAt(docText, 2);
    expect(doc).toEqual([[{ text: before + text }], [{ text: text2 + after }]]);
    expect(sel).toEqual(
      moveLine(moveOffset(initialSel, -before.length + text2.length), 1)
    );
  });

  it("should insert text inside selection", () => {
    const docText = "abcde";
    const doc: Writeable<DocFragment> = [[{ text: docText }]];
    const sel: Writeable<SelectionSnapshot> = [
      [0, 1],
      [0, 3],
    ];
    const initialSel: SelectionSnapshot = structuredClone(sel);
    const text = "ABC";
    applyTransaction(
      doc,
      sel,
      new Transaction().insert([0, 2], [[{ text: text }]])
    );

    expect(doc).toEqual([[{ text: insertAt(docText, 2, text) }]]);
    expect(sel).toEqual(moveOffset(initialSel, { focus: text.length }));
  });

  it("should insert lines inside selection", () => {
    const docText = "abcde";
    const doc: Writeable<DocFragment> = [[{ text: docText }]];
    const sel: Writeable<SelectionSnapshot> = [
      [0, 1],
      [0, 3],
    ];
    const initialSel: SelectionSnapshot = structuredClone(sel);
    const text = "ABC";
    const text2 = "DEFG";
    applyTransaction(
      doc,
      sel,
      new Transaction().insert([0, 2], [[{ text: text }], [{ text: text2 }]])
    );

    const [before, after] = splitAt(docText, 2);
    expect(doc).toEqual([[{ text: before + text }], [{ text: text2 + after }]]);
    expect(sel).toEqual(
      moveLine(
        moveOffset(initialSel, { focus: -before.length + text2.length }),
        { focus: 1 }
      )
    );
  });

  it("should insert text after caret", () => {
    const docText = "abcde";
    const doc: Writeable<DocFragment> = [[{ text: docText }]];
    const sel: Writeable<SelectionSnapshot> = [
      [0, 2],
      [0, 2],
    ];
    const initialSel: SelectionSnapshot = structuredClone(sel);
    const text = "ABC";
    applyTransaction(
      doc,
      sel,
      new Transaction().insert([0, 3], [[{ text: text }]])
    );

    expect(doc).toEqual([[{ text: insertAt(docText, 3, text) }]]);
    expect(sel).toEqual(initialSel);
  });

  it("should insert text after caret on middle line", () => {
    const docText = "abcde";
    const docText2 = "fghi";
    const docText3 = "jkl";
    const doc: Writeable<DocFragment> = [
      [{ text: docText }],
      [{ text: docText2 }],
      [{ text: docText3 }],
    ];
    const sel: Writeable<SelectionSnapshot> = [
      [1, 2],
      [1, 2],
    ];
    const initialSel: SelectionSnapshot = structuredClone(sel);
    const text = "ABC";
    applyTransaction(
      doc,
      sel,
      new Transaction().insert([1, 3], [[{ text: text }]])
    );

    expect(doc).toEqual([
      [{ text: docText }],
      [{ text: insertAt(docText2, 3, text) }],
      [{ text: docText3 }],
    ]);
    expect(sel).toEqual(initialSel);
  });

  it("should insert lines after caret", () => {
    const docText = "abcde";
    const doc: Writeable<DocFragment> = [[{ text: docText }]];
    const sel: Writeable<SelectionSnapshot> = [
      [0, 2],
      [0, 2],
    ];
    const initialSel: SelectionSnapshot = structuredClone(sel);
    const text = "ABC";
    const text2 = "DEFG";
    applyTransaction(
      doc,
      sel,
      new Transaction().insert([0, 3], [[{ text: text }], [{ text: text2 }]])
    );

    const [before, after] = splitAt(docText, 3);
    expect(doc).toEqual([[{ text: before + text }], [{ text: text2 + after }]]);
    expect(sel).toEqual(initialSel);
  });

  it("should insert text at line after caret", () => {
    const docText = "abcde";
    const docText2 = "fghij";
    const doc: Writeable<DocFragment> = [
      [{ text: docText }],
      [{ text: docText2 }],
    ];
    const sel: Writeable<SelectionSnapshot> = [
      [0, 2],
      [0, 2],
    ];
    const initialSel: SelectionSnapshot = structuredClone(sel);
    const text = "ABC";
    applyTransaction(
      doc,
      sel,
      new Transaction().insert([1, 1], [[{ text: text }]])
    );

    expect(doc).toEqual([
      [{ text: docText }],
      [{ text: insertAt(docText2, 1, text) }],
    ]);
    expect(sel).toEqual(initialSel);
  });

  it("should insert lines at line after caret", () => {
    const docText = "abcde";
    const docText2 = "fghij";
    const doc: Writeable<DocFragment> = [
      [{ text: docText }],
      [{ text: docText2 }],
    ];
    const sel: Writeable<SelectionSnapshot> = [
      [0, 2],
      [0, 2],
    ];
    const initialSel: SelectionSnapshot = structuredClone(sel);
    const text = "ABC";
    const text2 = "DEFG";
    applyTransaction(
      doc,
      sel,
      new Transaction().insert([1, 1], [[{ text: text }], [{ text: text2 }]])
    );

    const [before, after] = splitAt(docText2, 1);
    expect(doc).toEqual([
      [{ text: docText }],
      [{ text: before + text }],
      [{ text: text2 + after }],
    ]);
    expect(sel).toEqual(initialSel);
  });
});

describe("delete", () => {
  it("should do nothing if start and end is the same", () => {
    const docText = "abcde";
    const doc: Writeable<DocFragment> = [[{ text: docText }]];
    const sel: Writeable<SelectionSnapshot> = [
      [0, 2],
      [0, 2],
    ];
    const initialDoc: DocFragment = structuredClone(doc);
    const initialSel: SelectionSnapshot = structuredClone(sel);
    applyTransaction(doc, sel, new Transaction().delete([0, 1], [0, 1]));

    expect(doc).toEqual(initialDoc);
    expect(sel).toEqual(initialSel);
  });

  it("should delete text at line before caret", () => {
    const docText = "abcde";
    const docText2 = "fghij";
    const doc: Writeable<DocFragment> = [
      [{ text: docText }],
      [{ text: docText2 }],
    ];
    const sel: Writeable<SelectionSnapshot> = [
      [1, 2],
      [1, 2],
    ];
    const initialSel: SelectionSnapshot = structuredClone(sel);
    applyTransaction(doc, sel, new Transaction().delete([0, 1], [0, 2]));

    expect(doc).toEqual([
      [{ text: deleteAt(docText, 1, 1) }],
      [{ text: docText2 }],
    ]);
    expect(sel).toEqual(initialSel);
  });

  it("should delete linebreak at line before caret", () => {
    const docText = "abcde";
    const docText2 = "fghij";
    const doc: Writeable<DocFragment> = [
      [{ text: docText }],
      [{ text: docText2 }],
    ];
    const sel: Writeable<SelectionSnapshot> = [
      [1, 3],
      [1, 3],
    ];

    applyTransaction(doc, sel, new Transaction().delete([0, 2], [1, 1]));

    expect(doc).toEqual([
      [
        {
          text:
            deleteAt(docText, 2, docText.length - 1) + deleteAt(docText2, 0, 1),
        },
      ],
    ]);
    expect(sel).toEqual([
      [0, 2 + (3 - 1)],
      [0, 2 + (3 - 1)],
    ]);
  });

  it("should delete text before caret", () => {
    const docText = "abcde";
    const doc: Writeable<DocFragment> = [[{ text: docText }]];
    const sel: Writeable<SelectionSnapshot> = [
      [0, 3],
      [0, 3],
    ];
    const initialSel: SelectionSnapshot = structuredClone(sel);
    applyTransaction(doc, sel, new Transaction().delete([0, 1], [0, 2]));

    expect(doc).toEqual([[{ text: deleteAt(docText, 1, 1) }]]);
    expect(sel).toEqual(moveOffset(initialSel, -1));
  });

  it("should delete text before caret on middle line", () => {
    const docText = "abcde";
    const docText2 = "fghi";
    const docText3 = "jkl";
    const doc: Writeable<DocFragment> = [
      [{ text: docText }],
      [{ text: docText2 }],
      [{ text: docText3 }],
    ];
    const sel: Writeable<SelectionSnapshot> = [
      [1, 3],
      [1, 3],
    ];
    const initialSel: SelectionSnapshot = structuredClone(sel);
    applyTransaction(doc, sel, new Transaction().delete([1, 1], [1, 2]));

    expect(doc).toEqual([
      [{ text: docText }],
      [{ text: deleteAt(docText2, 1, 1) }],
      [{ text: docText3 }],
    ]);
    expect(sel).toEqual(moveOffset(initialSel, -1));
  });

  it("should delete text just before caret", () => {
    const docText = "abcde";
    const doc: Writeable<DocFragment> = [[{ text: docText }]];
    const sel: Writeable<SelectionSnapshot> = [
      [0, 3],
      [0, 3],
    ];
    const initialSel: SelectionSnapshot = structuredClone(sel);
    applyTransaction(doc, sel, new Transaction().delete([0, 2], [0, 3]));

    expect(doc).toEqual([[{ text: deleteAt(docText, 2, 1) }]]);
    expect(sel).toEqual(moveOffset(initialSel, -1));
  });

  it("should delete text around caret", () => {
    const docText = "abcde";
    const doc: Writeable<DocFragment> = [[{ text: docText }]];
    const sel: Writeable<SelectionSnapshot> = [
      [0, 3],
      [0, 3],
    ];
    const initialSel: SelectionSnapshot = structuredClone(sel);
    applyTransaction(doc, sel, new Transaction().delete([0, 2], [0, 4]));

    expect(doc).toEqual([[{ text: deleteAt(docText, 2, 2) }]]);
    expect(sel).toEqual(moveOffset(initialSel, -1));
  });

  it("should delete text around selection", () => {
    const docText = "abcde";
    const doc: Writeable<DocFragment> = [[{ text: docText }]];
    const sel: Writeable<SelectionSnapshot> = [
      [0, 2],
      [0, 4],
    ];
    applyTransaction(doc, sel, new Transaction().delete([0, 1], [0, 5]));

    expect(doc).toEqual([[{ text: deleteAt(docText, 1, 4) }]]);
    expect(sel).toEqual([
      [0, 1],
      [0, 1],
    ]);
  });

  it("should delete text around selection anchor", () => {
    const docText = "abcde";
    const doc: Writeable<DocFragment> = [[{ text: docText }]];
    const sel: Writeable<SelectionSnapshot> = [
      [0, 2],
      [0, 4],
    ];
    const initialSel: SelectionSnapshot = structuredClone(sel);
    applyTransaction(doc, sel, new Transaction().delete([0, 1], [0, 3]));

    expect(doc).toEqual([[{ text: deleteAt(docText, 1, 2) }]]);
    expect(sel).toEqual(moveOffset(initialSel, { anchor: 1 - 2, focus: -2 }));
  });

  it("should delete text around selection focus", () => {
    const docText = "abcde";
    const doc: Writeable<DocFragment> = [[{ text: docText }]];
    const sel: Writeable<SelectionSnapshot> = [
      [0, 2],
      [0, 4],
    ];
    const initialSel: SelectionSnapshot = structuredClone(sel);
    applyTransaction(doc, sel, new Transaction().delete([0, 3], [0, 5]));

    expect(doc).toEqual([[{ text: deleteAt(docText, 3, 2) }]]);
    expect(sel).toEqual(moveOffset(initialSel, { focus: 1 - 2 }));
  });

  it("should delete linebreak inside selection", () => {
    const docText = "abcde";
    const docText2 = "fghij";
    const doc: Writeable<DocFragment> = [
      [{ text: docText }],
      [{ text: docText2 }],
    ];
    const sel: Writeable<SelectionSnapshot> = [
      [0, 2],
      [1, 2],
    ];
    applyTransaction(doc, sel, new Transaction().delete([0, 3], [1, 1]));

    expect(doc).toEqual([
      [
        {
          text: splitAt(docText, 3)[0] + splitAt(docText2, 1)[1],
        },
      ],
    ]);
    expect(sel).toEqual([
      [0, 2],
      [0, 3 + 1],
    ]);
  });

  it("should delete text just after caret", () => {
    const docText = "abcde";
    const doc: Writeable<DocFragment> = [[{ text: docText }]];
    const sel: Writeable<SelectionSnapshot> = [
      [0, 3],
      [0, 3],
    ];
    const initialSel: SelectionSnapshot = structuredClone(sel);
    applyTransaction(doc, sel, new Transaction().delete([0, 3], [0, 4]));

    expect(doc).toEqual([[{ text: deleteAt(docText, 3, 1) }]]);
    expect(sel).toEqual(initialSel);
  });

  it("should delete text after caret", () => {
    const docText = "abcde";
    const doc: Writeable<DocFragment> = [[{ text: docText }]];
    const sel: Writeable<SelectionSnapshot> = [
      [0, 3],
      [0, 3],
    ];
    const initialSel: SelectionSnapshot = structuredClone(sel);
    applyTransaction(doc, sel, new Transaction().delete([0, 4], [0, 5]));

    expect(doc).toEqual([[{ text: deleteAt(docText, 4, 1) }]]);
    expect(sel).toEqual(initialSel);
  });

  it("should delete text after caret on middle line", () => {
    const docText = "abcde";
    const docText2 = "fghi";
    const docText3 = "jkl";
    const doc: Writeable<DocFragment> = [
      [{ text: docText }],
      [{ text: docText2 }],
      [{ text: docText3 }],
    ];
    const sel: Writeable<SelectionSnapshot> = [
      [1, 3],
      [1, 3],
    ];
    const initialSel: SelectionSnapshot = structuredClone(sel);
    applyTransaction(doc, sel, new Transaction().delete([1, 4], [1, 5]));

    expect(doc).toEqual([
      [{ text: docText }],
      [{ text: deleteAt(docText2, 4, 1) }],
      [{ text: docText3 }],
    ]);
    expect(sel).toEqual(initialSel);
  });

  it("should delete text at line after caret", () => {
    const docText = "abcde";
    const docText2 = "fghij";
    const doc: Writeable<DocFragment> = [
      [{ text: docText }],
      [{ text: docText2 }],
    ];
    const sel: Writeable<SelectionSnapshot> = [
      [0, 2],
      [0, 2],
    ];
    const initialSel: SelectionSnapshot = structuredClone(sel);
    applyTransaction(doc, sel, new Transaction().delete([1, 1], [1, 2]));

    expect(doc).toEqual([
      [{ text: docText }],
      [{ text: deleteAt(docText2, 1, 1) }],
    ]);
    expect(sel).toEqual(initialSel);
  });

  it("should delete linebreak at line after caret", () => {
    const docText = "abcde";
    const docText2 = "fghij";
    const docText3 = "klmno";
    const doc: Writeable<DocFragment> = [
      [{ text: docText }],
      [{ text: docText2 }],
      [{ text: docText3 }],
    ];
    const sel: Writeable<SelectionSnapshot> = [
      [0, 2],
      [0, 2],
    ];
    const initialSel: SelectionSnapshot = structuredClone(sel);
    applyTransaction(doc, sel, new Transaction().delete([1, 1], [2, 1]));

    expect(doc).toEqual([
      [{ text: docText }],
      [
        {
          text:
            deleteAt(docText2, 1, docText2.length - 1) +
            deleteAt(docText3, 0, 1),
        },
      ],
    ]);
    expect(sel).toEqual(initialSel);
  });
});
