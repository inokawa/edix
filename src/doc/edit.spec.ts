import { afterEach, describe, expect, it, vi } from "vitest";
import { Transaction, applyOperation } from "./edit.js";
import { type DocNode, type SelectionSnapshot } from "./types.js";
import { is } from "../utils.js";

type Doc = { children: { id: number; text: string }[][] };

const applyTransaction = <T extends DocNode>(
  doc: T,
  selection: SelectionSnapshot,
  tr: Transaction,
): [T, SelectionSnapshot] => {
  for (const op of tr.ops) {
    [doc, selection] = applyOperation(doc, selection, op);
  }
  return [doc, selection];
};

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
  offset: number | { anchor?: number; focus?: number },
): SelectionSnapshot => {
  const anchorOffset =
    typeof offset === "number" ? offset : (offset.anchor ?? 0);
  const focusOffset = typeof offset === "number" ? offset : (offset.focus ?? 0);
  return [
    [selection[0][0], selection[0][1] + anchorOffset],
    [selection[1][0], selection[1][1] + focusOffset],
  ];
};

const moveLine = (
  [anchor, focus]: SelectionSnapshot,
  line: number | { anchor?: number; focus?: number },
): SelectionSnapshot => {
  const anchorLine = typeof line === "number" ? line : (line.anchor ?? 0);
  const focusLine = typeof line === "number" ? line : (line.focus ?? 0);
  return [
    [[(anchor[0].length ? anchor[0][0]! : 0) + anchorLine], anchor[1]],
    [[(focus[0].length ? focus[0][0]! : 0) + focusLine], focus[1]],
  ];
};

afterEach(() => {
  vi.restoreAllMocks();
});

it("discard if error", () => {
  const docText = "abcde";
  const docText2 = "fghij";
  const doc: Doc = {
    children: [[{ id: 1, text: docText }], [{ id: 1, text: docText2 }]],
  };
  const sel: SelectionSnapshot = [
    [[1], 2],
    [[1], 2],
  ];

  expect(() => applyOperation(doc, sel, { _type: 3 } as any)).toThrowError();
});

describe("insert text", () => {
  describe("validation", () => {
    it("path less than min", () => {
      const docText = "abcde";
      const docText2 = "fghij";
      const doc: Doc = {
        children: [[{ id: 1, text: docText }], [{ id: 1, text: docText2 }]],
      };
      const sel: SelectionSnapshot = [
        [[1], 2],
        [[1], 2],
      ];
      const res = applyTransaction(
        doc,
        sel,
        new Transaction().insertText([[-1], 0], "test"),
      )!;

      expect(is(res[0], doc)).toBe(true);
      expect(res[1]).toEqual(sel);
    });

    it("path more than max", () => {
      const docText = "abcde";
      const docText2 = "fghij";
      const doc: Doc = {
        children: [[{ id: 1, text: docText }], [{ id: 1, text: docText2 }]],
      };
      const sel: SelectionSnapshot = [
        [[1], 2],
        [[1], 2],
      ];
      const res = applyTransaction(
        doc,
        sel,
        new Transaction().insertText([[100], 0], "test"),
      )!;

      expect(is(res[0], doc)).toBe(true);
      expect(res[1]).toEqual(sel);
    });

    it("offset less than min", () => {
      const docText = "abcde";
      const docText2 = "fghij";
      const doc: Doc = {
        children: [[{ id: 1, text: docText }], [{ id: 1, text: docText2 }]],
      };
      const sel: SelectionSnapshot = [
        [[1], 2],
        [[1], 2],
      ];
      const res = applyTransaction(
        doc,
        sel,
        new Transaction().insertText([[0], -1], "test"),
      )!;

      expect(is(res[0], doc)).toBe(true);
      expect(res[1]).toEqual(sel);
    });

    it("offset more than max", () => {
      const docText = "abcde";
      const docText2 = "fghij";
      const doc: Doc = {
        children: [[{ id: 1, text: docText }], [{ id: 1, text: docText2 }]],
      };
      const sel: SelectionSnapshot = [
        [[1], 2],
        [[1], 2],
      ];
      const res = applyTransaction(
        doc,
        sel,
        new Transaction().insertText([[0], 100], "test"),
      )!;

      expect(is(res[0], doc)).toBe(true);
      expect(res[1]).toEqual(sel);
    });

    it("empty text", () => {
      const docText = "abcde";
      const docText2 = "fghij";
      const doc: Doc = {
        children: [[{ id: 1, text: docText }], [{ id: 1, text: docText2 }]],
      };
      const sel: SelectionSnapshot = [
        [[1], 2],
        [[1], 2],
      ];
      const res = applyTransaction(
        doc,
        sel,
        new Transaction().insertText([[0], 1], ""),
      )!;

      expect(is(res[0], doc)).toBe(true);
      expect(res[1]).toEqual(sel);
    });
  });

  describe("expanded", () => {
    it("insert text inside selection", () => {
      const docText = "abcde";
      const doc: Doc = { children: [[{ id: 1, text: docText }]] };
      const sel: SelectionSnapshot = [
        [[0], 1],
        [[0], 3],
      ];
      const text = "ABC";
      const res = applyTransaction(
        doc,
        sel,
        new Transaction().insertText([[0], 2], text),
      )!;

      expect(res[0]).toEqual({
        children: [[{ id: 1, text: insertAt(docText, 2, text) }]],
      });
      expect(res[1]).toEqual(moveOffset(sel, { focus: text.length }));
    });

    it("insert line break inside selection", () => {
      const docText = "abcde";
      const doc: Doc = { children: [[{ id: 1, text: docText }]] };
      const sel: SelectionSnapshot = [
        [[0], 1],
        [[0], 3],
      ];
      const res = applyTransaction(
        doc,
        sel,
        new Transaction().insertText([[0], 2], "\n"),
      )!;

      const [before, after] = splitAt(docText, 2);
      expect(res[0]).toEqual({
        children: [[{ id: 1, text: before }], [{ id: 1, text: after }]],
      });
      expect(res[1]).toEqual(
        moveLine(moveOffset(sel, { focus: -before.length }), {
          focus: 1,
        }),
      );
    });

    it("insert lines inside selection", () => {
      const docText = "abcde";
      const doc: Doc = { children: [[{ id: 1, text: docText }]] };
      const sel: SelectionSnapshot = [
        [[0], 1],
        [[0], 3],
      ];
      const text = "ABC";
      const text2 = "DEFG";
      const res = applyTransaction(
        doc,
        sel,
        new Transaction().insertText([[0], 2], text + "\n" + text2),
      )!;

      const [before, after] = splitAt(docText, 2);
      expect(res[0]).toEqual({
        children: [
          [{ id: 1, text: before + text }],
          [{ id: 1, text: text2 + after }],
        ],
      });
      expect(res[1]).toEqual(
        moveLine(moveOffset(sel, { focus: -before.length + text2.length }), {
          focus: 1,
        }),
      );
    });
  });

  it("insert text at previous line", () => {
    const docText = "abcde";
    const docText2 = "fghij";
    const doc: Doc = {
      children: [[{ id: 1, text: docText }], [{ id: 1, text: docText2 }]],
    };
    const sel: SelectionSnapshot = [
      [[1], 2],
      [[1], 2],
    ];
    const text = "ABC";
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().insertText([[0], 1], text),
    )!;

    expect(res[0]).toEqual({
      children: [
        [{ id: 1, text: insertAt(docText, 1, text) }],
        [{ id: 1, text: docText2 }],
      ],
    });
    expect(res[1]).toEqual(sel);
  });

  it("insert line break at previous line", () => {
    const docText = "abcde";
    const docText2 = "fghij";
    const doc: Doc = {
      children: [[{ id: 1, text: docText }], [{ id: 1, text: docText2 }]],
    };
    const sel: SelectionSnapshot = [
      [[1], 2],
      [[1], 2],
    ];
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().insertText([[0], 1], "\n"),
    )!;

    const [before, after] = splitAt(docText, 1);
    expect(res[0]).toEqual({
      children: [
        [{ id: 1, text: before }],
        [{ id: 1, text: after }],
        [{ id: 1, text: docText2 }],
      ],
    });
    expect(res[1]).toEqual(moveLine(sel, 1));
  });

  it("insert lines at previous line", () => {
    const docText = "abcde";
    const docText2 = "fghij";
    const doc: Doc = {
      children: [[{ id: 1, text: docText }], [{ id: 1, text: docText2 }]],
    };
    const sel: SelectionSnapshot = [
      [[1], 2],
      [[1], 2],
    ];
    const text = "ABC";
    const text2 = "DEFG";
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().insertText([[0], 1], text + "\n" + text2),
    )!;

    const [before, after] = splitAt(docText, 1);
    expect(res[0]).toEqual({
      children: [
        [{ id: 1, text: before + text }],
        [{ id: 1, text: text2 + after }],
        [{ id: 1, text: docText2 }],
      ],
    });
    expect(res[1]).toEqual(moveLine(sel, 1));
  });

  it("insert text before caret", () => {
    const docText = "abcde";
    const doc: Doc = { children: [[{ id: 1, text: docText }]] };
    const sel: SelectionSnapshot = [
      [[0], 2],
      [[0], 2],
    ];
    const text = "ABC";
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().insertText([[0], 1], text),
    )!;

    expect(res[0]).toEqual({
      children: [[{ id: 1, text: insertAt(docText, 1, text) }]],
    });
    expect(res[1]).toEqual(moveOffset(sel, text.length));
  });

  it("insert line break before caret", () => {
    const docText = "abcde";
    const doc: Doc = { children: [[{ id: 1, text: docText }]] };
    const sel: SelectionSnapshot = [
      [[0], 2],
      [[0], 2],
    ];
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().insertText([[0], 1], "\n"),
    )!;

    const [before, after] = splitAt(docText, 1);
    expect(res[0]).toEqual({
      children: [[{ id: 1, text: before }], [{ id: 1, text: after }]],
    });
    expect(res[1]).toEqual(moveLine(moveOffset(sel, -before.length), 1));
  });

  it("insert lines before caret", () => {
    const docText = "abcde";
    const doc: Doc = { children: [[{ id: 1, text: docText }]] };
    const sel: SelectionSnapshot = [
      [[0], 2],
      [[0], 2],
    ];
    const text = "ABC";
    const text2 = "DEFG";
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().insertText([[0], 1], text + "\n" + text2),
    )!;

    const [before, after] = splitAt(docText, 1);
    expect(res[0]).toEqual({
      children: [
        [{ id: 1, text: before + text }],
        [{ id: 1, text: text2 + after }],
      ],
    });
    expect(res[1]).toEqual(
      moveLine(moveOffset(sel, -before.length + text2.length), 1),
    );
  });

  it("insert text on caret", () => {
    const docText = "abcde";
    const doc: Doc = { children: [[{ id: 1, text: docText }]] };
    const sel: SelectionSnapshot = [
      [[0], 2],
      [[0], 2],
    ];
    const text = "ABC";
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().insertText([[0], 2], text),
    )!;

    expect(res[0]).toEqual({
      children: [[{ id: 1, text: insertAt(docText, 2, text) }]],
    });
    expect(res[1]).toEqual(moveOffset(sel, text.length));
  });

  it("insert line break on caret", () => {
    const docText = "abcde";
    const doc: Doc = { children: [[{ id: 1, text: docText }]] };
    const sel: SelectionSnapshot = [
      [[0], 2],
      [[0], 2],
    ];
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().insertText([[0], 2], "\n"),
    )!;

    const [before, after] = splitAt(docText, 2);
    expect(res[0]).toEqual({
      children: [[{ id: 1, text: before }], [{ id: 1, text: after }]],
    });
    expect(res[1]).toEqual(moveLine(moveOffset(sel, -before.length), 1));
  });

  it("insert lines on caret", () => {
    const docText = "abcde";
    const doc: Doc = { children: [[{ id: 1, text: docText }]] };
    const sel: SelectionSnapshot = [
      [[0], 2],
      [[0], 2],
    ];
    const text = "ABC";
    const text2 = "DEFG";
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().insertText([[0], 2], text + "\n" + text2),
    )!;

    const [before, after] = splitAt(docText, 2);
    expect(res[0]).toEqual({
      children: [
        [{ id: 1, text: before + text }],
        [{ id: 1, text: text2 + after }],
      ],
    });
    expect(res[1]).toEqual(
      moveLine(moveOffset(sel, -before.length + text2.length), 1),
    );
  });

  it("insert text after caret", () => {
    const docText = "abcde";
    const doc: Doc = { children: [[{ id: 1, text: docText }]] };
    const sel: SelectionSnapshot = [
      [[0], 2],
      [[0], 2],
    ];
    const text = "ABC";
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().insertText([[0], 3], text),
    )!;

    expect(res[0]).toEqual({
      children: [[{ id: 1, text: insertAt(docText, 3, text) }]],
    });
    expect(res[1]).toEqual(sel);
  });

  it("insert line break after caret", () => {
    const docText = "abcde";
    const doc: Doc = { children: [[{ id: 1, text: docText }]] };
    const sel: SelectionSnapshot = [
      [[0], 2],
      [[0], 2],
    ];
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().insertText([[0], 3], "\n"),
    )!;

    const [before, after] = splitAt(docText, 3);
    expect(res[0]).toEqual({
      children: [[{ id: 1, text: before }], [{ id: 1, text: after }]],
    });
    expect(res[1]).toEqual(sel);
  });

  it("insert lines after caret", () => {
    const docText = "abcde";
    const doc: Doc = { children: [[{ id: 1, text: docText }]] };
    const sel: SelectionSnapshot = [
      [[0], 2],
      [[0], 2],
    ];
    const text = "ABC";
    const text2 = "DEFG";
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().insertText([[0], 3], text + "\n" + text2),
    )!;

    const [before, after] = splitAt(docText, 3);
    expect(res[0]).toEqual({
      children: [
        [{ id: 1, text: before + text }],
        [{ id: 1, text: text2 + after }],
      ],
    });
    expect(res[1]).toEqual(sel);
  });

  it("insert text at next line", () => {
    const docText = "abcde";
    const docText2 = "fghij";
    const doc: Doc = {
      children: [[{ id: 1, text: docText }], [{ id: 1, text: docText2 }]],
    };
    const sel: SelectionSnapshot = [
      [[0], 2],
      [[0], 2],
    ];
    const text = "ABC";
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().insertText([[1], 1], text),
    )!;

    expect(res[0]).toEqual({
      children: [
        [{ id: 1, text: docText }],
        [{ id: 1, text: insertAt(docText2, 1, text) }],
      ],
    });
    expect(res[1]).toEqual(sel);
  });

  it("insert line break at next line", () => {
    const docText = "abcde";
    const docText2 = "fghij";
    const doc: Doc = {
      children: [[{ id: 1, text: docText }], [{ id: 1, text: docText2 }]],
    };
    const sel: SelectionSnapshot = [
      [[0], 2],
      [[0], 2],
    ];
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().insertText([[1], 1], "\n"),
    )!;

    const [before, after] = splitAt(docText2, 1);
    expect(res[0]).toEqual({
      children: [
        [{ id: 1, text: docText }],
        [{ id: 1, text: before }],
        [{ id: 1, text: after }],
      ],
    });
    expect(res[1]).toEqual(sel);
  });

  it("insert lines at next line", () => {
    const docText = "abcde";
    const docText2 = "fghij";
    const doc: Doc = {
      children: [[{ id: 1, text: docText }], [{ id: 1, text: docText2 }]],
    };
    const sel: SelectionSnapshot = [
      [[0], 2],
      [[0], 2],
    ];
    const text = "ABC";
    const text2 = "DEFG";
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().insertText([[1], 1], text + "\n" + text2),
    )!;

    const [before, after] = splitAt(docText2, 1);
    expect(res[0]).toEqual({
      children: [
        [{ id: 1, text: docText }],
        [{ id: 1, text: before + text }],
        [{ id: 1, text: text2 + after }],
      ],
    });
    expect(res[1]).toEqual(sel);
  });

  it("insert text before caret at middle line", () => {
    const docText = "abcde";
    const docText2 = "fghi";
    const docText3 = "jkl";
    const doc: Doc = {
      children: [
        [{ id: 1, text: docText }],
        [{ id: 1, text: docText2 }],
        [{ id: 1, text: docText3 }],
      ],
    };
    const sel: SelectionSnapshot = [
      [[1], 2],
      [[1], 2],
    ];
    const text = "ABC";
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().insertText([[1], 1], text),
    )!;

    expect(res[0]).toEqual({
      children: [
        [{ id: 1, text: docText }],
        [{ id: 1, text: insertAt(docText2, 1, text) }],
        [{ id: 1, text: docText3 }],
      ],
    });
    expect(res[1]).toEqual(moveOffset(sel, text.length));
  });

  it("insert text after caret at middle line", () => {
    const docText = "abcde";
    const docText2 = "fghi";
    const docText3 = "jkl";
    const doc: Doc = {
      children: [
        [{ id: 1, text: docText }],
        [{ id: 1, text: docText2 }],
        [{ id: 1, text: docText3 }],
      ],
    };
    const sel: SelectionSnapshot = [
      [[1], 2],
      [[1], 2],
    ];
    const text = "ABC";
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().insertText([[1], 3], text),
    )!;

    expect(res[0]).toEqual({
      children: [
        [{ id: 1, text: docText }],
        [{ id: 1, text: insertAt(docText2, 3, text) }],
        [{ id: 1, text: docText3 }],
      ],
    });
    expect(res[1]).toEqual(sel);
  });

  it("insert line break at start of line", () => {
    const docText = "abcde";
    const docText2 = "fghij";
    const doc: Doc = {
      children: [[{ id: 1, text: docText }], [{ id: 2, text: docText2 }]],
    };
    const sel: SelectionSnapshot = [
      [[0], 2],
      [[0], 2],
    ];
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().insertText([[1], 0], "\n"),
    )!;
    expect(res[0]).toEqual({
      children: [
        [{ id: 1, text: docText }],
        [{ id: 2, text: "" }],
        [{ id: 2, text: docText2 }],
      ],
    });
    expect(res[1]).toEqual(sel);
  });

  it("insert line break at middle of line", () => {
    const docText = "abcde";
    const docText2 = "fghij";
    const doc: Doc = {
      children: [[{ id: 1, text: docText }], [{ id: 2, text: docText2 }]],
    };
    const sel: SelectionSnapshot = [
      [[0], 2],
      [[0], 2],
    ];
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().insertText([[1], 1], "\n"),
    )!;

    const [before, after] = splitAt(docText2, 1);
    expect(res[0]).toEqual({
      children: [
        [{ id: 1, text: docText }],
        [{ id: 2, text: before }],
        [{ id: 2, text: after }],
      ],
    });
    expect(res[1]).toEqual(sel);
  });

  it("insert line break at end of line", () => {
    const docText = "abcde";
    const docText2 = "fghij";
    const doc: Doc = {
      children: [[{ id: 1, text: docText }], [{ id: 2, text: docText2 }]],
    };
    const sel: SelectionSnapshot = [
      [[0], 2],
      [[0], 2],
    ];
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().insertText([[0], docText.length], "\n"),
    )!;
    expect(res[0]).toEqual({
      children: [
        [{ id: 1, text: docText }],
        [{ id: 1, text: "" }],
        [{ id: 2, text: docText2 }],
      ],
    });
    expect(res[1]).toEqual(sel);
  });

  it("insert text at the edge of text node", () => {
    const docText = "abcde";
    const docText2 = "fghij";
    const doc: Doc = {
      children: [
        [
          { id: 1, text: docText },
          { id: 2, text: docText2 },
        ],
      ],
    };
    const sel: SelectionSnapshot = [
      [[0], 2],
      [[0], 2],
    ];
    const text = "ABC";
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().insertText([[0], docText.length], text),
    )!;

    expect(res[0]).toEqual({
      children: [
        [
          { id: 1, text: docText + text },
          { id: 2, text: docText2 },
        ],
      ],
    });
    expect(res[1]).toEqual(sel);
  });

  it("insert lines at the edge of text node", () => {
    const docText = "abcde";
    const docText2 = "fghij";
    const doc: Doc = {
      children: [
        [
          { id: 1, text: docText },
          { id: 2, text: docText2 },
        ],
      ],
    };
    const sel: SelectionSnapshot = [
      [[0], 2],
      [[0], 2],
    ];
    const text = "ABC";
    const text2 = "DEFG";
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().insertText([[0], docText.length], text + "\n" + text2),
    )!;

    expect(res[0]).toEqual({
      children: [
        [{ id: 1, text: docText + text }],
        [
          { id: 1, text: text2 },
          { id: 2, text: docText2 },
        ],
      ],
    });
    expect(res[1]).toEqual(sel);
  });

  it("insert line break at the edge of text node", () => {
    const docText = "abcde";
    const docText2 = "fghij";
    const doc: Doc = {
      children: [
        [
          { id: 1, text: docText },
          { id: 2, text: docText2 },
        ],
      ],
    };
    const sel: SelectionSnapshot = [
      [[0], 2],
      [[0], 2],
    ];
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().insertText([[0], docText.length], "\n"),
    )!;

    expect(res[0]).toEqual({
      children: [[{ id: 1, text: docText }], [{ id: 2, text: docText2 }]],
    });
    expect(res[1]).toEqual(sel);
  });
});

describe("insert node", () => {
  describe("validation", () => {
    it("path less than min", () => {
      const docText = "abcde";
      const docText2 = "fghij";
      const doc: Doc = {
        children: [[{ id: 1, text: docText }], [{ id: 1, text: docText2 }]],
      };
      const sel: SelectionSnapshot = [
        [[1], 2],
        [[1], 2],
      ];
      const res = applyTransaction(
        doc,
        sel,
        new Transaction().insertFragment([[-1], 0], [[{ text: "test" }]]),
      )!;

      expect(is(res[0], doc)).toBe(true);
      expect(res[1]).toEqual(sel);
    });

    it("path more than max", () => {
      const docText = "abcde";
      const docText2 = "fghij";
      const doc: Doc = {
        children: [[{ id: 1, text: docText }], [{ id: 1, text: docText2 }]],
      };
      const sel: SelectionSnapshot = [
        [[1], 2],
        [[1], 2],
      ];
      const res = applyTransaction(
        doc,
        sel,
        new Transaction().insertFragment([[100], 0], [[{ text: "test" }]]),
      )!;

      expect(is(res[0], doc)).toBe(true);
      expect(res[1]).toEqual(sel);
    });

    it("offset less than min", () => {
      const docText = "abcde";
      const docText2 = "fghij";
      const doc: Doc = {
        children: [[{ id: 1, text: docText }], [{ id: 1, text: docText2 }]],
      };
      const sel: SelectionSnapshot = [
        [[1], 2],
        [[1], 2],
      ];
      const res = applyTransaction(
        doc,
        sel,
        new Transaction().insertFragment([[0], -1], [[{ text: "test" }]]),
      )!;

      expect(is(res[0], doc)).toBe(true);
      expect(res[1]).toEqual(sel);
    });

    it("offset more than max", () => {
      const docText = "abcde";
      const docText2 = "fghij";
      const doc: Doc = {
        children: [[{ id: 1, text: docText }], [{ id: 1, text: docText2 }]],
      };
      const sel: SelectionSnapshot = [
        [[1], 2],
        [[1], 2],
      ];
      const res = applyTransaction(
        doc,
        sel,
        new Transaction().insertFragment([[0], 100], [[{ text: "test" }]]),
      )!;

      expect(is(res[0], doc)).toBe(true);
      expect(res[1]).toEqual(sel);
    });

    it("empty fragment", () => {
      const docText = "abcde";
      const docText2 = "fghij";
      const doc: Doc = {
        children: [[{ id: 1, text: docText }], [{ id: 1, text: docText2 }]],
      };
      const sel: SelectionSnapshot = [
        [[1], 2],
        [[1], 2],
      ];
      const res = applyTransaction(
        doc,
        sel,
        new Transaction().insertFragment([[0], 1], []),
      )!;

      expect(is(res[0], doc)).toBe(true);
      expect(res[1]).toEqual(sel);
    });
  });

  it("insert text at previous line", () => {
    const docText = "abcde";
    const docText2 = "fghij";
    const doc: Doc = {
      children: [[{ id: 1, text: docText }], [{ id: 1, text: docText2 }]],
    };
    const sel: SelectionSnapshot = [
      [[1], 2],
      [[1], 2],
    ];
    const text = "ABC";
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().insertFragment([[0], 1], [[{ text }]]),
    )!;

    const [before, after] = splitAt(docText, 1);
    expect(res[0]).toEqual({
      children: [
        [{ id: 1, text: before }, { text }, { id: 1, text: after }],
        [{ id: 1, text: docText2 }],
      ],
    });
    expect(res[1]).toEqual(sel);
  });

  it("insert lines at previous line", () => {
    const docText = "abcde";
    const docText2 = "fghij";
    const doc: Doc = {
      children: [[{ id: 1, text: docText }], [{ id: 1, text: docText2 }]],
    };
    const sel: SelectionSnapshot = [
      [[1], 2],
      [[1], 2],
    ];
    const text = "ABC";
    const text2 = "DEFG";
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().insertFragment(
        [[0], 1],
        [[{ text: text }], [{ text: text2 }]],
      ),
    )!;

    const [before, after] = splitAt(docText, 1);
    expect(res[0]).toEqual({
      children: [
        [{ id: 1, text: before }, { text }],
        [{ text: text2 }, { id: 1, text: after }],
        [{ id: 1, text: docText2 }],
      ],
    });
    expect(res[1]).toEqual(moveLine(sel, 1));
  });

  it("insert text before caret", () => {
    const docText = "abcde";
    const doc: Doc = { children: [[{ id: 1, text: docText }]] };
    const sel: SelectionSnapshot = [
      [[0], 2],
      [[0], 2],
    ];
    const text = "ABC";
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().insertFragment([[0], 1], [[{ text }]]),
    )!;

    const [before, after] = splitAt(docText, 1);
    expect(res[0]).toEqual({
      children: [[{ id: 1, text: before }, { text }, { id: 1, text: after }]],
    });
    expect(res[1]).toEqual(moveOffset(sel, text.length));
  });

  it("insert lines before caret", () => {
    const docText = "abcde";
    const doc: Doc = { children: [[{ id: 1, text: docText }]] };
    const sel: SelectionSnapshot = [
      [[0], 2],
      [[0], 2],
    ];
    const text = "ABC";
    const text2 = "DEFG";
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().insertFragment(
        [[0], 1],
        [[{ text: text }], [{ text: text2 }]],
      ),
    )!;

    const [before, after] = splitAt(docText, 1);
    expect(res[0]).toEqual({
      children: [
        [{ id: 1, text: before }, { text }],
        [{ text: text2 }, { id: 1, text: after }],
      ],
    });
    expect(res[1]).toEqual(
      moveLine(moveOffset(sel, -before.length + text2.length), 1),
    );
  });

  it("insert text on caret", () => {
    const docText = "abcde";
    const doc: Doc = { children: [[{ id: 1, text: docText }]] };
    const sel: SelectionSnapshot = [
      [[0], 2],
      [[0], 2],
    ];
    const text = "ABC";
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().insertFragment([[0], 2], [[{ text }]]),
    )!;

    const [before, after] = splitAt(docText, 2);
    expect(res[0]).toEqual({
      children: [[{ id: 1, text: before }, { text }, { id: 1, text: after }]],
    });
    expect(res[1]).toEqual(moveOffset(sel, text.length));
  });

  it("insert lines on caret", () => {
    const docText = "abcde";
    const doc: Doc = { children: [[{ id: 1, text: docText }]] };
    const sel: SelectionSnapshot = [
      [[0], 2],
      [[0], 2],
    ];
    const text = "ABC";
    const text2 = "DEFG";
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().insertFragment(
        [[0], 2],
        [[{ text: text }], [{ text: text2 }]],
      ),
    )!;

    const [before, after] = splitAt(docText, 2);
    expect(res[0]).toEqual({
      children: [
        [{ id: 1, text: before }, { text }],
        [{ text: text2 }, { id: 1, text: after }],
      ],
    });
    expect(res[1]).toEqual(
      moveLine(moveOffset(sel, -before.length + text2.length), 1),
    );
  });

  it("insert text inside selection", () => {
    const docText = "abcde";
    const doc: Doc = { children: [[{ id: 1, text: docText }]] };
    const sel: SelectionSnapshot = [
      [[0], 1],
      [[0], 3],
    ];
    const text = "ABC";
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().insertFragment([[0], 2], [[{ text }]]),
    )!;

    const [before, after] = splitAt(docText, 2);
    expect(res[0]).toEqual({
      children: [[{ id: 1, text: before }, { text }, { id: 1, text: after }]],
    });
    expect(res[1]).toEqual(moveOffset(sel, { focus: text.length }));
  });

  it("insert lines inside selection", () => {
    const docText = "abcde";
    const doc: Doc = { children: [[{ id: 1, text: docText }]] };
    const sel: SelectionSnapshot = [
      [[0], 1],
      [[0], 3],
    ];
    const text = "ABC";
    const text2 = "DEFG";
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().insertFragment(
        [[0], 2],
        [[{ text: text }], [{ text: text2 }]],
      ),
    )!;

    const [before, after] = splitAt(docText, 2);
    expect(res[0]).toEqual({
      children: [
        [{ id: 1, text: before }, { text }],
        [{ text: text2 }, { id: 1, text: after }],
      ],
    });
    expect(res[1]).toEqual(
      moveLine(moveOffset(sel, { focus: -before.length + text2.length }), {
        focus: 1,
      }),
    );
  });

  it("insert text after caret", () => {
    const docText = "abcde";
    const doc: Doc = { children: [[{ id: 1, text: docText }]] };
    const sel: SelectionSnapshot = [
      [[0], 2],
      [[0], 2],
    ];
    const text = "ABC";
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().insertFragment([[0], 3], [[{ text }]]),
    )!;

    const [before, after] = splitAt(docText, 3);
    expect(res[0]).toEqual({
      children: [[{ id: 1, text: before }, { text }, { id: 1, text: after }]],
    });
    expect(res[1]).toEqual(sel);
  });

  it("insert lines after caret", () => {
    const docText = "abcde";
    const doc: Doc = { children: [[{ id: 1, text: docText }]] };
    const sel: SelectionSnapshot = [
      [[0], 2],
      [[0], 2],
    ];
    const text = "ABC";
    const text2 = "DEFG";
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().insertFragment(
        [[0], 3],
        [[{ text: text }], [{ text: text2 }]],
      ),
    )!;

    const [before, after] = splitAt(docText, 3);
    expect(res[0]).toEqual({
      children: [
        [{ id: 1, text: before }, { text }],
        [{ text: text2 }, { id: 1, text: after }],
      ],
    });
    expect(res[1]).toEqual(sel);
  });

  it("insert text at next line", () => {
    const docText = "abcde";
    const docText2 = "fghij";
    const doc: Doc = {
      children: [[{ id: 1, text: docText }], [{ id: 1, text: docText2 }]],
    };
    const sel: SelectionSnapshot = [
      [[0], 2],
      [[0], 2],
    ];
    const text = "ABC";
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().insertFragment([[1], 1], [[{ text }]]),
    )!;

    const [before, after] = splitAt(docText2, 1);
    expect(res[0]).toEqual({
      children: [
        [{ id: 1, text: docText }],
        [{ id: 1, text: before }, { text }, { id: 1, text: after }],
      ],
    });
    expect(res[1]).toEqual(sel);
  });

  it("insert lines at next line", () => {
    const docText = "abcde";
    const docText2 = "fghij";
    const doc: Doc = {
      children: [[{ id: 1, text: docText }], [{ id: 1, text: docText2 }]],
    };
    const sel: SelectionSnapshot = [
      [[0], 2],
      [[0], 2],
    ];
    const text = "ABC";
    const text2 = "DEFG";
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().insertFragment(
        [[1], 1],
        [[{ text: text }], [{ text: text2 }]],
      ),
    )!;

    const [before, after] = splitAt(docText2, 1);
    expect(res[0]).toEqual({
      children: [
        [{ id: 1, text: docText }],
        [{ id: 1, text: before }, { text: text }],
        [{ text: text2 }, { id: 1, text: after }],
      ],
    });
    expect(res[1]).toEqual(sel);
  });
});

describe("delete", () => {
  describe("validation", () => {
    it("path less than min", () => {
      const docText = "abcde";
      const doc: Doc = { children: [[{ id: 1, text: docText }]] };
      const sel: SelectionSnapshot = [
        [[0], 2],
        [[0], 2],
      ];
      const res = applyTransaction(
        doc,
        sel,
        new Transaction().delete([[-1], 0], [[0], 1]),
      )!;

      expect(is(res[0], doc)).toBe(true);
      expect(res[1]).toEqual(sel);
    });

    it("path more than max", () => {
      const docText = "abcde";
      const doc: Doc = { children: [[{ id: 1, text: docText }]] };
      const sel: SelectionSnapshot = [
        [[0], 2],
        [[0], 2],
      ];
      const res = applyTransaction(
        doc,
        sel,
        new Transaction().delete([[0], 0], [[100], 1]),
      )!;

      expect(is(res[0], doc)).toBe(true);
      expect(res[1]).toEqual(sel);
    });

    it("offset less than min", () => {
      const docText = "abcde";
      const doc: Doc = { children: [[{ id: 1, text: docText }]] };
      const sel: SelectionSnapshot = [
        [[0], 2],
        [[0], 2],
      ];
      const res = applyTransaction(
        doc,
        sel,
        new Transaction().delete([[0], -1], [[0], 1]),
      )!;

      expect(is(res[0], doc)).toBe(true);
      expect(res[1]).toEqual(sel);
    });

    it("offset more than max", () => {
      const docText = "abcde";
      const doc: Doc = { children: [[{ id: 1, text: docText }]] };
      const sel: SelectionSnapshot = [
        [[0], 2],
        [[0], 2],
      ];
      const res = applyTransaction(
        doc,
        sel,
        new Transaction().delete([[0], 0], [[0], 100]),
      )!;

      expect(is(res[0], doc)).toBe(true);
      expect(res[1]).toEqual(sel);
    });

    it("start and end is the same", () => {
      const docText = "abcde";
      const doc: Doc = { children: [[{ id: 1, text: docText }]] };
      const sel: SelectionSnapshot = [
        [[0], 2],
        [[0], 2],
      ];
      const res = applyTransaction(
        doc,
        sel,
        new Transaction().delete([[0], 1], [[0], 1]),
      )!;

      expect(is(res[0], doc)).toBe(true);
      expect(res[1]).toEqual(sel);
    });

    it("start and end is inverted", () => {
      const docText = "abcde";
      const doc: Doc = { children: [[{ id: 1, text: docText }]] };
      const sel: SelectionSnapshot = [
        [[0], 2],
        [[0], 2],
      ];
      const res = applyTransaction(
        doc,
        sel,
        new Transaction().delete([[0], 2], [[0], 1]),
      )!;

      expect(is(res[0], doc)).toBe(true);
      expect(res[1]).toEqual(sel);
    });
  });

  describe("expanded", () => {
    it("delete text around selection", () => {
      const docText = "abcde";
      const doc: Doc = { children: [[{ id: 1, text: docText }]] };
      const sel: SelectionSnapshot = [
        [[0], 2],
        [[0], 4],
      ];
      const res = applyTransaction(
        doc,
        sel,
        new Transaction().delete([[0], 1], [[0], 5]),
      )!;

      expect(res[0]).toEqual({
        children: [[{ id: 1, text: deleteAt(docText, 1, 4) }]],
      });
      expect(res[1]).toEqual([
        [[0], 1],
        [[0], 1],
      ]);
    });

    it("delete text around selection anchor", () => {
      const docText = "abcde";
      const doc: Doc = { children: [[{ id: 1, text: docText }]] };
      const sel: SelectionSnapshot = [
        [[0], 2],
        [[0], 4],
      ];
      const res = applyTransaction(
        doc,
        sel,
        new Transaction().delete([[0], 1], [[0], 3]),
      )!;

      expect(res[0]).toEqual({
        children: [[{ id: 1, text: deleteAt(docText, 1, 2) }]],
      });
      expect(res[1]).toEqual(moveOffset(sel, { anchor: 1 - 2, focus: -2 }));
    });

    it("delete text around selection focus", () => {
      const docText = "abcde";
      const doc: Doc = { children: [[{ id: 1, text: docText }]] };
      const sel: SelectionSnapshot = [
        [[0], 2],
        [[0], 4],
      ];
      const res = applyTransaction(
        doc,
        sel,
        new Transaction().delete([[0], 3], [[0], 5]),
      )!;

      expect(res[0]).toEqual({
        children: [[{ id: 1, text: deleteAt(docText, 3, 2) }]],
      });
      expect(res[1]).toEqual(moveOffset(sel, { focus: 1 - 2 }));
    });

    it("delete line break inside selection", () => {
      const docText = "abcde";
      const docText2 = "fghij";
      const doc: Doc = {
        children: [[{ id: 1, text: docText }], [{ id: 1, text: docText2 }]],
      };
      const sel: SelectionSnapshot = [
        [[0], 2],
        [[1], 2],
      ];
      const res = applyTransaction(
        doc,
        sel,
        new Transaction().delete([[0], 3], [[1], 1]),
      )!;

      expect(res[0]).toEqual({
        children: [
          [{ id: 1, text: splitAt(docText, 3)[0] + splitAt(docText2, 1)[1] }],
        ],
      });
      expect(res[1]).toEqual([
        [[0], 2],
        [[0], 3 + 1],
      ]);
    });
  });

  it("delete text at previous line", () => {
    const docText = "abcde";
    const docText2 = "fghij";
    const doc: Doc = {
      children: [[{ id: 1, text: docText }], [{ id: 1, text: docText2 }]],
    };
    const sel: SelectionSnapshot = [
      [[1], 2],
      [[1], 2],
    ];
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().delete([[0], 1], [[0], 2]),
    )!;

    expect(res[0]).toEqual({
      children: [
        [{ id: 1, text: deleteAt(docText, 1, 1) }],
        [{ id: 1, text: docText2 }],
      ],
    });
    expect(res[1]).toEqual(sel);
  });

  it("delete line break at previous line", () => {
    const docText = "abcde";
    const docText2 = "fghij";
    const doc: Doc = {
      children: [[{ id: 1, text: docText }], [{ id: 1, text: docText2 }]],
    };
    const sel: SelectionSnapshot = [
      [[1], 3],
      [[1], 3],
    ];

    const res = applyTransaction(
      doc,
      sel,
      new Transaction().delete([[0], 2], [[1], 1]),
    )!;

    expect(res[0]).toEqual({
      children: [
        [
          {
            id: 1,
            text:
              deleteAt(docText, 2, docText.length - 1) +
              deleteAt(docText2, 0, 1),
          },
        ],
      ],
    });
    expect(res[1]).toEqual([
      [[0], 2 + (3 - 1)],
      [[0], 2 + (3 - 1)],
    ]);
  });

  it("delete lines at previous line", () => {
    const docText = "abcde";
    const docText2 = "fghi";
    const docText3 = "jkl";
    const doc: Doc = {
      children: [
        [{ id: 1, text: docText }],
        [{ id: 1, text: docText2 }],
        [{ id: 1, text: docText3 }],
      ],
    };
    const sel: SelectionSnapshot = [
      [[2], 3],
      [[2], 3],
    ];
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().delete([[0], 0], [[1], 2]),
    )!;

    expect(res[0]).toEqual({
      children: [
        [{ id: 1, text: deleteAt(docText2, 0, 2) }],
        [{ id: 1, text: docText3 }],
      ],
    });
    expect(res[1]).toEqual(moveLine(sel, -1));
  });

  it("delete text before caret", () => {
    const docText = "abcde";
    const doc: Doc = { children: [[{ id: 1, text: docText }]] };
    const sel: SelectionSnapshot = [
      [[0], 3],
      [[0], 3],
    ];
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().delete([[0], 1], [[0], 2]),
    )!;

    expect(res[0]).toEqual({
      children: [[{ id: 1, text: deleteAt(docText, 1, 1) }]],
    });
    expect(res[1]).toEqual(moveOffset(sel, -1));
  });

  it("delete text just before caret", () => {
    const docText = "abcde";
    const doc: Doc = { children: [[{ id: 1, text: docText }]] };
    const sel: SelectionSnapshot = [
      [[0], 3],
      [[0], 3],
    ];
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().delete([[0], 2], [[0], 3]),
    )!;

    expect(res[0]).toEqual({
      children: [[{ id: 1, text: deleteAt(docText, 2, 1) }]],
    });
    expect(res[1]).toEqual(moveOffset(sel, -1));
  });

  it("delete text around caret", () => {
    const docText = "abcde";
    const doc: Doc = { children: [[{ id: 1, text: docText }]] };
    const sel: SelectionSnapshot = [
      [[0], 3],
      [[0], 3],
    ];
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().delete([[0], 2], [[0], 4]),
    )!;

    expect(res[0]).toEqual({
      children: [[{ id: 1, text: deleteAt(docText, 2, 2) }]],
    });
    expect(res[1]).toEqual(moveOffset(sel, -1));
  });

  it("delete text just after caret", () => {
    const docText = "abcde";
    const doc: Doc = { children: [[{ id: 1, text: docText }]] };
    const sel: SelectionSnapshot = [
      [[0], 3],
      [[0], 3],
    ];
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().delete([[0], 3], [[0], 4]),
    )!;

    expect(res[0]).toEqual({
      children: [[{ id: 1, text: deleteAt(docText, 3, 1) }]],
    });
    expect(res[1]).toEqual(sel);
  });

  it("delete text after caret", () => {
    const docText = "abcde";
    const doc: Doc = { children: [[{ id: 1, text: docText }]] };
    const sel: SelectionSnapshot = [
      [[0], 3],
      [[0], 3],
    ];
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().delete([[0], 4], [[0], 5]),
    )!;

    expect(res[0]).toEqual({
      children: [[{ id: 1, text: deleteAt(docText, 4, 1) }]],
    });
    expect(res[1]).toEqual(sel);
  });

  it("delete text at next line", () => {
    const docText = "abcde";
    const docText2 = "fghij";
    const doc: Doc = {
      children: [[{ id: 1, text: docText }], [{ id: 1, text: docText2 }]],
    };
    const sel: SelectionSnapshot = [
      [[0], 2],
      [[0], 2],
    ];
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().delete([[1], 1], [[1], 2]),
    )!;

    expect(res[0]).toEqual({
      children: [
        [{ id: 1, text: docText }],
        [{ id: 1, text: deleteAt(docText2, 1, 1) }],
      ],
    });
    expect(res[1]).toEqual(sel);
  });

  it("delete line break at next line", () => {
    const docText = "abcde";
    const docText2 = "fghij";
    const docText3 = "klmno";
    const doc: Doc = {
      children: [
        [{ id: 1, text: docText }],
        [{ id: 1, text: docText2 }],
        [{ id: 1, text: docText3 }],
      ],
    };
    const sel: SelectionSnapshot = [
      [[0], 2],
      [[0], 2],
    ];
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().delete([[1], 1], [[2], 1]),
    )!;

    expect(res[0]).toEqual({
      children: [
        [{ id: 1, text: docText }],
        [
          {
            id: 1,
            text:
              deleteAt(docText2, 1, docText2.length - 1) +
              deleteAt(docText3, 0, 1),
          },
        ],
      ],
    });
    expect(res[1]).toEqual(sel);
  });

  it("delete lines at next line", () => {
    const docText = "abcde";
    const docText2 = "fghij";
    const docText3 = "klmno";
    const doc: Doc = {
      children: [
        [{ id: 1, text: docText }],
        [{ id: 1, text: docText2 }],
        [{ id: 1, text: docText3 }],
      ],
    };
    const sel: SelectionSnapshot = [
      [[0], 2],
      [[0], 2],
    ];
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().delete([[1], 0], [[2], 1]),
    )!;

    expect(res[0]).toEqual({
      children: [
        [{ id: 1, text: docText }],
        [
          {
            id: 1,
            text: deleteAt(docText3, 0, 1),
          },
        ],
      ],
    });
    expect(res[1]).toEqual(sel);
  });

  it("delete text before caret at middle line", () => {
    const docText = "abcde";
    const docText2 = "fghi";
    const docText3 = "jkl";
    const doc: Doc = {
      children: [
        [{ id: 1, text: docText }],
        [{ id: 1, text: docText2 }],
        [{ id: 1, text: docText3 }],
      ],
    };
    const sel: SelectionSnapshot = [
      [[1], 3],
      [[1], 3],
    ];
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().delete([[1], 1], [[1], 2]),
    )!;

    expect(res[0]).toEqual({
      children: [
        [{ id: 1, text: docText }],
        [{ id: 1, text: deleteAt(docText2, 1, 1) }],
        [{ id: 1, text: docText3 }],
      ],
    });
    expect(res[1]).toEqual(moveOffset(sel, -1));
  });

  it("delete text after caret at middle line", () => {
    const docText = "abcde";
    const docText2 = "fghi";
    const docText3 = "jkl";
    const doc: Doc = {
      children: [
        [{ id: 1, text: docText }],
        [{ id: 1, text: docText2 }],
        [{ id: 1, text: docText3 }],
      ],
    };
    const sel: SelectionSnapshot = [
      [[1], 2],
      [[1], 2],
    ];
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().delete([[1], 3], [[1], 4]),
    )!;

    expect(res[0]).toEqual({
      children: [
        [{ id: 1, text: docText }],
        [{ id: 1, text: deleteAt(docText2, 3, 1) }],
        [{ id: 1, text: docText3 }],
      ],
    });
    expect(res[1]).toEqual(sel);
  });

  it("delete line break", () => {
    const docText = "abcde";
    const docText2 = "fghij";
    const doc: Doc = {
      children: [[{ id: 1, text: docText }], [{ id: 1, text: docText2 }]],
    };
    const sel: SelectionSnapshot = [
      [[0], 2],
      [[0], 2],
    ];

    const res = applyTransaction(
      doc,
      sel,
      new Transaction().delete([[0], docText.length], [[1], 0]),
    )!;

    expect(res[0]).toEqual({
      children: [
        [
          {
            id: 1,
            text: docText + docText2,
          },
        ],
      ],
    });
    expect(res[1]).toEqual(sel);
  });

  it("delete empty line from the start", () => {
    const docText = "abcde";
    const docText2 = "fghij";
    const doc: Doc = {
      children: [
        [{ id: 1, text: docText }],
        [{ id: 1, text: "" }],
        [{ id: 1, text: docText2 }],
      ],
    };
    const sel: SelectionSnapshot = [
      [[0], 2],
      [[0], 2],
    ];

    const res = applyTransaction(
      doc,
      sel,
      new Transaction().delete([[0], docText.length], [[1], 0]),
    )!;

    expect(res[0]).toEqual({
      children: [[{ id: 1, text: docText }], [{ id: 1, text: docText2 }]],
    });
    expect(res[1]).toEqual(sel);
  });

  it("delete empty line from the end", () => {
    const docText = "abcde";
    const docText2 = "fghij";
    const doc: Doc = {
      children: [
        [{ id: 1, text: docText }],
        [{ id: 1, text: "" }],
        [{ id: 1, text: docText2 }],
      ],
    };
    const sel: SelectionSnapshot = [
      [[0], 2],
      [[0], 2],
    ];

    const res = applyTransaction(
      doc,
      sel,
      new Transaction().delete([[1], 0], [[2], 0]),
    )!;

    expect(res[0]).toEqual({
      children: [[{ id: 1, text: docText }], [{ id: 1, text: docText2 }]],
    });
    expect(res[1]).toEqual(sel);
  });

  it("delete forward at the edge of text node", () => {
    const docText = "abcde";
    const docText2 = "fghij";
    const doc: Doc = {
      children: [
        [
          { id: 1, text: docText },
          { id: 2, text: docText2 },
        ],
      ],
    };
    const sel: SelectionSnapshot = [
      [[0], 2],
      [[0], 2],
    ];

    const res = applyTransaction(
      doc,
      sel,
      new Transaction().delete(
        [[0], docText.length],
        [[0], docText.length + 1],
      ),
    )!;

    expect(res[0]).toEqual({
      children: [
        [
          { id: 1, text: docText },
          { id: 2, text: docText2.slice(1) },
        ],
      ],
    });
    expect(res[1]).toEqual(sel);
  });

  it("delete backward at the edge of text node", () => {
    const docText = "abcde";
    const docText2 = "fghij";
    const doc: Doc = {
      children: [
        [
          { id: 1, text: docText },
          { id: 2, text: docText2 },
        ],
      ],
    };
    const sel: SelectionSnapshot = [
      [[0], 2],
      [[0], 2],
    ];

    const res = applyTransaction(
      doc,
      sel,
      new Transaction().delete(
        [[0], docText.length - 1],
        [[0], docText.length],
      ),
    )!;

    expect(res[0]).toEqual({
      children: [
        [
          { id: 1, text: docText.slice(0, -1) },
          { id: 2, text: docText2 },
        ],
      ],
    });
    expect(res[1]).toEqual(sel);
  });

  it("delete line break at the edge of text node", () => {
    const docText = "abcde";
    const docText2 = "fghij";
    const doc: Doc = {
      children: [[{ id: 1, text: docText }], [{ id: 2, text: docText2 }]],
    };
    const sel: SelectionSnapshot = [
      [[0], 2],
      [[0], 2],
    ];

    const res = applyTransaction(
      doc,
      sel,
      new Transaction().delete([[0], docText.length], [[1], 0]),
    )!;

    expect(res[0]).toEqual({
      children: [
        [
          {
            id: 1,
            text: docText,
          },
          {
            id: 2,
            text: docText2,
          },
        ],
      ],
    });
    expect(res[1]).toEqual(sel);
  });
});

describe("update attr", () => {
  describe("validation", () => {
    it("path less than min", () => {
      const docText = "abcde";
      const doc: Doc = { children: [[{ id: 1, text: docText }]] };
      const sel: SelectionSnapshot = [
        [[0], 2],
        [[0], 2],
      ];
      const res = applyTransaction(
        doc,
        sel,
        new Transaction().attr([[-1], 0], [[0], 1], { foo: "bar" }),
      )!;

      expect(is(res[0], doc)).toBe(true);
      expect(res[1]).toEqual(sel);
    });

    it("path more than max", () => {
      const docText = "abcde";
      const doc: Doc = { children: [[{ id: 1, text: docText }]] };
      const sel: SelectionSnapshot = [
        [[0], 2],
        [[0], 2],
      ];
      const res = applyTransaction(
        doc,
        sel,
        new Transaction().attr([[0], 0], [[100], 1], { foo: "bar" }),
      )!;

      expect(is(res[0], doc)).toBe(true);
      expect(res[1]).toEqual(sel);
    });

    it("offset less than min", () => {
      const docText = "abcde";
      const doc: Doc = { children: [[{ id: 1, text: docText }]] };
      const sel: SelectionSnapshot = [
        [[0], 2],
        [[0], 2],
      ];
      const res = applyTransaction(
        doc,
        sel,
        new Transaction().attr([[0], -1], [[0], 1], { foo: "bar" }),
      )!;

      expect(is(res[0], doc)).toBe(true);
      expect(res[1]).toEqual(sel);
    });

    it("offset more than max", () => {
      const docText = "abcde";
      const doc: Doc = { children: [[{ id: 1, text: docText }]] };
      const sel: SelectionSnapshot = [
        [[0], 2],
        [[0], 2],
      ];
      const res = applyTransaction(
        doc,
        sel,
        new Transaction().attr([[0], 0], [[0], 100], { foo: "bar" }),
      )!;

      expect(is(res[0], doc)).toBe(true);
      expect(res[1]).toEqual(sel);
    });

    it("start and end is the same", () => {
      const docText = "abcde";
      const doc: Doc = { children: [[{ id: 1, text: docText }]] };
      const sel: SelectionSnapshot = [
        [[0], 2],
        [[0], 2],
      ];
      const res = applyTransaction(
        doc,
        sel,
        new Transaction().attr([[0], 1], [[0], 1], { foo: "bar" }),
      )!;

      expect(is(res[0], doc)).toBe(true);
      expect(res[1]).toEqual(sel);
    });

    it("start and end is inverted", () => {
      const docText = "abcde";
      const doc: Doc = { children: [[{ id: 1, text: docText }]] };
      const sel: SelectionSnapshot = [
        [[0], 2],
        [[0], 2],
      ];
      const res = applyTransaction(
        doc,
        sel,
        new Transaction().attr([[0], 2], [[0], 1], { foo: "bar" }),
      )!;

      expect(is(res[0], doc)).toBe(true);
      expect(res[1]).toEqual(sel);
    });
  });

  it("update text at previous line", () => {
    const docText = "abcde";
    const docText2 = "fghij";
    const doc: Doc = {
      children: [[{ id: 1, text: docText }], [{ id: 1, text: docText2 }]],
    };
    const sel: SelectionSnapshot = [
      [[1], 2],
      [[1], 2],
    ];
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().attr([[0], 1], [[0], 2], { foo: "bar" }),
    )!;

    expect(res[0]).toEqual({
      children: [
        [
          { id: 1, text: docText.slice(0, 1) },
          { id: 1, text: docText.slice(1, 2), foo: "bar" },
          { id: 1, text: docText.slice(2) },
        ],
        [{ id: 1, text: docText2 }],
      ],
    });
    expect(res[1]).toEqual(sel);
  });

  it("update line break at previous line", () => {
    const docText = "abcde";
    const docText2 = "fghij";
    const doc: Doc = {
      children: [[{ id: 1, text: docText }], [{ id: 1, text: docText2 }]],
    };
    const sel: SelectionSnapshot = [
      [[1], 3],
      [[1], 3],
    ];

    const res = applyTransaction(
      doc,
      sel,
      new Transaction().attr([[0], 2], [[1], 1], { foo: "bar" }),
    )!;

    expect(res[0]).toEqual({
      children: [
        [
          { id: 1, text: docText.slice(0, 2) },
          { id: 1, text: docText.slice(2), foo: "bar" },
        ],
        [
          { id: 1, text: docText2.slice(0, 1), foo: "bar" },
          { id: 1, text: docText2.slice(1) },
        ],
      ],
    });
    expect(res[1]).toEqual(sel);
  });

  it("update text before caret", () => {
    const docText = "abcde";
    const doc: Doc = { children: [[{ id: 1, text: docText }]] };
    const sel: SelectionSnapshot = [
      [[0], 3],
      [[0], 3],
    ];
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().attr([[0], 1], [[0], 2], { foo: "bar" }),
    )!;

    expect(res[0]).toEqual({
      children: [
        [
          { id: 1, text: docText.slice(0, 1) },
          { id: 1, text: docText.slice(1, 2), foo: "bar" },
          { id: 1, text: docText.slice(2) },
        ],
      ],
    });
    expect(res[1]).toEqual(sel);
  });

  it("update text just before caret", () => {
    const docText = "abcde";
    const doc: Doc = { children: [[{ id: 1, text: docText }]] };
    const sel: SelectionSnapshot = [
      [[0], 3],
      [[0], 3],
    ];
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().attr([[0], 2], [[0], 3], { foo: "bar" }),
    )!;

    expect(res[0]).toEqual({
      children: [
        [
          { id: 1, text: docText.slice(0, 2) },
          { id: 1, text: docText.slice(2, 3), foo: "bar" },
          { id: 1, text: docText.slice(3) },
        ],
      ],
    });
    expect(res[1]).toEqual(sel);
  });

  it("update line break inside selection", () => {
    const docText = "abcde";
    const docText2 = "fghij";
    const doc: Doc = {
      children: [[{ id: 1, text: docText }], [{ id: 1, text: docText2 }]],
    };
    const sel: SelectionSnapshot = [
      [[0], 2],
      [[1], 2],
    ];
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().attr([[0], 3], [[1], 1], { foo: "bar" }),
    )!;

    expect(res[0]).toEqual({
      children: [
        [
          { id: 1, text: docText.slice(0, 3) },
          { id: 1, text: docText.slice(3), foo: "bar" },
        ],
        [
          { id: 1, text: docText2.slice(0, 1), foo: "bar" },
          { id: 1, text: docText2.slice(1) },
        ],
      ],
    });
    expect(res[1]).toEqual(sel);
  });

  it("update text just after caret", () => {
    const docText = "abcde";
    const doc: Doc = { children: [[{ id: 1, text: docText }]] };
    const sel: SelectionSnapshot = [
      [[0], 3],
      [[0], 3],
    ];
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().attr([[0], 3], [[0], 4], { foo: "bar" }),
    )!;

    expect(res[0]).toEqual({
      children: [
        [
          { id: 1, text: docText.slice(0, 3) },
          { id: 1, text: docText.slice(3, 4), foo: "bar" },
          { id: 1, text: docText.slice(4) },
        ],
      ],
    });
    expect(res[1]).toEqual(sel);
  });

  it("update text after caret", () => {
    const docText = "abcde";
    const doc: Doc = { children: [[{ id: 1, text: docText }]] };
    const sel: SelectionSnapshot = [
      [[0], 3],
      [[0], 3],
    ];
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().attr([[0], 4], [[0], 5], { foo: "bar" }),
    )!;

    expect(res[0]).toEqual({
      children: [
        [
          { id: 1, text: docText.slice(0, 4) },
          { id: 1, text: docText.slice(4, 5), foo: "bar" },
        ],
      ],
    });
    expect(res[1]).toEqual(sel);
  });

  it("update text at next line", () => {
    const docText = "abcde";
    const docText2 = "fghij";
    const doc: Doc = {
      children: [[{ id: 1, text: docText }], [{ id: 1, text: docText2 }]],
    };
    const sel: SelectionSnapshot = [
      [[0], 2],
      [[0], 2],
    ];
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().attr([[1], 1], [[1], 2], { foo: "bar" }),
    )!;

    expect(res[0]).toEqual({
      children: [
        [{ id: 1, text: docText }],
        [
          { id: 1, text: docText2.slice(0, 1) },
          { id: 1, text: docText2.slice(1, 2), foo: "bar" },
          { id: 1, text: docText2.slice(2) },
        ],
      ],
    });
    expect(res[1]).toEqual(sel);
  });

  it("update line break at next line", () => {
    const docText = "abcde";
    const docText2 = "fghij";
    const docText3 = "klmno";
    const doc: Doc = {
      children: [
        [{ id: 1, text: docText }],
        [{ id: 1, text: docText2 }],
        [{ id: 1, text: docText3 }],
      ],
    };
    const sel: SelectionSnapshot = [
      [[0], 2],
      [[0], 2],
    ];
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().attr([[1], 1], [[2], 1], { foo: "bar" }),
    )!;

    expect(res[0]).toEqual({
      children: [
        [{ id: 1, text: docText }],
        [
          { id: 1, text: docText2.slice(0, 1) },
          { id: 1, text: docText2.slice(1), foo: "bar" },
        ],
        [
          { id: 1, text: docText3.slice(0, 1), foo: "bar" },
          { id: 1, text: docText3.slice(1) },
        ],
      ],
    });
    expect(res[1]).toEqual(sel);
  });
});

describe("selection", () => {
  describe("validation", () => {
    it("path less than min", () => {
      const docText = "abcde";
      const doc: Doc = { children: [[{ id: 1, text: docText }]] };
      const sel: SelectionSnapshot = [
        [[0], 2],
        [[0], 2],
      ];
      const res = applyTransaction(
        doc,
        sel,
        new Transaction().select([[-1], 0], [[0], 1]),
      )!;

      expect(is(res[0], doc)).toBe(true);
      expect(res[1]).toEqual(sel);
    });

    it("path more than max", () => {
      const docText = "abcde";
      const doc: Doc = { children: [[{ id: 1, text: docText }]] };
      const sel: SelectionSnapshot = [
        [[0], 2],
        [[0], 2],
      ];
      const res = applyTransaction(
        doc,
        sel,
        new Transaction().select([[0], 0], [[100], 1]),
      )!;

      expect(is(res[0], doc)).toBe(true);
      expect(res[1]).toEqual(sel);
    });

    it("offset less than min", () => {
      const docText = "abcde";
      const doc: Doc = { children: [[{ id: 1, text: docText }]] };
      const sel: SelectionSnapshot = [
        [[0], 2],
        [[0], 2],
      ];
      const res = applyTransaction(
        doc,
        sel,
        new Transaction().select([[0], -1], [[0], 1]),
      )!;

      expect(is(res[0], doc)).toBe(true);
      expect(res[1]).toEqual(sel);
    });

    it("offset more than max", () => {
      const docText = "abcde";
      const doc: Doc = { children: [[{ id: 1, text: docText }]] };
      const sel: SelectionSnapshot = [
        [[0], 2],
        [[0], 2],
      ];
      const res = applyTransaction(
        doc,
        sel,
        new Transaction().select([[0], 0], [[0], 100]),
      )!;

      expect(is(res[0], doc)).toBe(true);
      expect(res[1]).toEqual(sel);
    });
  });

  it("should select cursor", () => {
    const docText = "abcde";
    const doc: Doc = { children: [[{ id: 1, text: docText }]] };
    const sel: SelectionSnapshot = [
      [[0], 2],
      [[0], 2],
    ];
    const nextSel: SelectionSnapshot = [
      [[0], 1],
      [[0], 1],
    ];
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().select(...nextSel),
    )!;

    expect(is(res[0], doc)).toBe(true);
    expect(res[1]).toEqual(nextSel);
  });

  it("should select text at line", () => {
    const docText = "abcde";
    const docText2 = "fghij";
    const docText3 = "klmno";
    const doc: Doc = {
      children: [
        [{ id: 1, text: docText }],
        [{ id: 1, text: docText2 }],
        [{ id: 1, text: docText3 }],
      ],
    };
    const sel: SelectionSnapshot = [
      [[0], 2],
      [[0], 2],
    ];
    const nextSel: SelectionSnapshot = [
      [[1], 1],
      [[2], 1],
    ];
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().select(...nextSel),
    )!;

    expect(res[0]).toEqual(doc);
    expect(res[1]).toEqual(nextSel);
  });

  it("should select line break", () => {
    const docText = "abcde";
    const docText2 = "fghij";
    const doc: Doc = {
      children: [[{ id: 1, text: docText }], [{ id: 1, text: docText2 }]],
    };
    const sel: SelectionSnapshot = [
      [[0], 1],
      [[0], 1],
    ];
    const nextSel: SelectionSnapshot = [
      [[0], 2],
      [[1], 1],
    ];
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().select(...nextSel),
    )!;

    expect(res[0]).toEqual(doc);
    expect(res[1]).toEqual(nextSel);
  });

  it("should select all", () => {
    const docText = "abcde";
    const docText2 = "fghij";
    const doc: Doc = {
      children: [[{ id: 1, text: docText }], [{ id: 1, text: docText2 }]],
    };
    const sel: SelectionSnapshot = [
      [[0], 1],
      [[0], 1],
    ];
    const nextSel: SelectionSnapshot = [
      [[0], 0],
      [
        [doc.children.length - 1],
        doc.children[doc.children.length - 1]![0]!.text.length - 1,
      ],
    ];
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().select(...nextSel),
    )!;

    expect(res[0]).toEqual(doc);
    expect(res[1]).toEqual(nextSel);
  });
});
