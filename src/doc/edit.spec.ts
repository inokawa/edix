import { afterEach, describe, expect, it, vi } from "vitest";
import { Transaction, applyTransaction, isDocEqual } from "./edit.js";
import { type SelectionSnapshot } from "./types.js";

type Doc = { id: number; text: string }[][];

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
  selection: SelectionSnapshot,
  line: number | { anchor?: number; focus?: number },
): SelectionSnapshot => {
  const anchorLine = typeof line === "number" ? line : (line.anchor ?? 0);
  const focusLine = typeof line === "number" ? line : (line.focus ?? 0);
  return [
    [selection[0][0] + anchorLine, selection[0][1]],
    [selection[1][0] + focusLine, selection[1][1]],
  ];
};

afterEach(() => {
  vi.restoreAllMocks();
});

it("discard if error", () => {
  const docText = "abcde";
  const docText2 = "fghij";
  const doc: Doc = [[{ id: 1, text: docText }], [{ id: 1, text: docText2 }]];
  const sel: SelectionSnapshot = [
    [1, 2],
    [1, 2],
  ];

  const mockConsole = vi.fn();

  const res = applyTransaction(
    doc,
    sel,
    new Transaction([
      { _type: 1, _start: [0, 0], _end: [0, 1] },
      { _type: 3, _pos: [0, 0], _fragment: {} as any },
    ]),
    mockConsole,
  );

  expect(mockConsole).toHaveBeenCalledOnce();
  expect(res).toBe(undefined);
});

describe("insert", () => {
  describe("validation", () => {
    it("path less than min", () => {
      const docText = "abcde";
      const docText2 = "fghij";
      const doc: Doc = [
        [{ id: 1, text: docText }],
        [{ id: 1, text: docText2 }],
      ];
      const sel: SelectionSnapshot = [
        [1, 2],
        [1, 2],
      ];
      const res = applyTransaction(
        doc,
        sel,
        new Transaction().insert([-1, 0], "test"),
      )!;

      expect(isDocEqual(res[0], doc)).toBe(true);
      expect(res[1]).toEqual(sel);
    });

    it("path more than max", () => {
      const docText = "abcde";
      const docText2 = "fghij";
      const doc: Doc = [
        [{ id: 1, text: docText }],
        [{ id: 1, text: docText2 }],
      ];
      const sel: SelectionSnapshot = [
        [1, 2],
        [1, 2],
      ];
      const res = applyTransaction(
        doc,
        sel,
        new Transaction().insert([100, 0], "test"),
      )!;

      expect(isDocEqual(res[0], doc)).toBe(true);
      expect(res[1]).toEqual(sel);
    });

    it("offset less than min", () => {
      const docText = "abcde";
      const docText2 = "fghij";
      const doc: Doc = [
        [{ id: 1, text: docText }],
        [{ id: 1, text: docText2 }],
      ];
      const sel: SelectionSnapshot = [
        [1, 2],
        [1, 2],
      ];
      const res = applyTransaction(
        doc,
        sel,
        new Transaction().insert([0, -1], "test"),
      )!;

      expect(isDocEqual(res[0], doc)).toBe(true);
      expect(res[1]).toEqual(sel);
    });

    it("offset more than max", () => {
      const docText = "abcde";
      const docText2 = "fghij";
      const doc: Doc = [
        [{ id: 1, text: docText }],
        [{ id: 1, text: docText2 }],
      ];
      const sel: SelectionSnapshot = [
        [1, 2],
        [1, 2],
      ];
      const res = applyTransaction(
        doc,
        sel,
        new Transaction().insert([0, 100], "test"),
      )!;

      expect(isDocEqual(res[0], doc)).toBe(true);
      expect(res[1]).toEqual(sel);
    });

    it("empty text", () => {
      const docText = "abcde";
      const docText2 = "fghij";
      const doc: Doc = [
        [{ id: 1, text: docText }],
        [{ id: 1, text: docText2 }],
      ];
      const sel: SelectionSnapshot = [
        [1, 2],
        [1, 2],
      ];
      const res = applyTransaction(
        doc,
        sel,
        new Transaction().insert([0, 1], ""),
      )!;

      expect(isDocEqual(res[0], doc)).toBe(true);
      expect(res[1]).toEqual(sel);
    });
  });

  it("should insert text at line before caret", () => {
    const docText = "abcde";
    const docText2 = "fghij";
    const doc: Doc = [[{ id: 1, text: docText }], [{ id: 1, text: docText2 }]];
    const sel: SelectionSnapshot = [
      [1, 2],
      [1, 2],
    ];
    const text = "ABC";
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().insert([0, 1], text),
    )!;

    expect(res[0]).toEqual([
      [{ id: 1, text: insertAt(docText, 1, text) }],
      [{ id: 1, text: docText2 }],
    ]);
    expect(res[1]).toEqual(sel);
  });

  it("should insert lines at line before caret", () => {
    const docText = "abcde";
    const docText2 = "fghij";
    const doc: Doc = [[{ id: 1, text: docText }], [{ id: 1, text: docText2 }]];
    const sel: SelectionSnapshot = [
      [1, 2],
      [1, 2],
    ];
    const text = "ABC";
    const text2 = "DEFG";
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().insert([0, 1], text + "\n" + text2),
    )!;

    const [before, after] = splitAt(docText, 1);
    expect(res[0]).toEqual([
      [{ id: 1, text: before + text }],
      [{ id: 1, text: text2 + after }],
      [{ id: 1, text: docText2 }],
    ]);
    expect(res[1]).toEqual(moveLine(sel, 1));
  });

  it("should insert text before caret", () => {
    const docText = "abcde";
    const doc: Doc = [[{ id: 1, text: docText }]];
    const sel: SelectionSnapshot = [
      [0, 2],
      [0, 2],
    ];
    const text = "ABC";
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().insert([0, 1], text),
    )!;

    expect(res[0]).toEqual([[{ id: 1, text: insertAt(docText, 1, text) }]]);
    expect(res[1]).toEqual(moveOffset(sel, text.length));
  });

  it("should insert text before caret on middle line", () => {
    const docText = "abcde";
    const docText2 = "fghi";
    const docText3 = "jkl";
    const doc: Doc = [
      [{ id: 1, text: docText }],
      [{ id: 1, text: docText2 }],
      [{ id: 1, text: docText3 }],
    ];
    const sel: SelectionSnapshot = [
      [1, 2],
      [1, 2],
    ];
    const text = "ABC";
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().insert([1, 1], text),
    )!;

    expect(res[0]).toEqual([
      [{ id: 1, text: docText }],
      [{ id: 1, text: insertAt(docText2, 1, text) }],
      [{ id: 1, text: docText3 }],
    ]);
    expect(res[1]).toEqual(moveOffset(sel, text.length));
  });

  it("should insert lines before caret", () => {
    const docText = "abcde";
    const doc: Doc = [[{ id: 1, text: docText }]];
    const sel: SelectionSnapshot = [
      [0, 2],
      [0, 2],
    ];
    const text = "ABC";
    const text2 = "DEFG";
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().insert([0, 1], text + "\n" + text2),
    )!;

    const [before, after] = splitAt(docText, 1);
    expect(res[0]).toEqual([
      [{ id: 1, text: before + text }],
      [{ id: 1, text: text2 + after }],
    ]);
    expect(res[1]).toEqual(
      moveLine(moveOffset(sel, -before.length + text2.length), 1),
    );
  });

  it("should insert text on caret", () => {
    const docText = "abcde";
    const doc: Doc = [[{ id: 1, text: docText }]];
    const sel: SelectionSnapshot = [
      [0, 2],
      [0, 2],
    ];
    const text = "ABC";
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().insert([0, 2], text),
    )!;

    expect(res[0]).toEqual([[{ id: 1, text: insertAt(docText, 2, text) }]]);
    expect(res[1]).toEqual(moveOffset(sel, text.length));
  });

  it("should insert lines on caret", () => {
    const docText = "abcde";
    const doc: Doc = [[{ id: 1, text: docText }]];
    const sel: SelectionSnapshot = [
      [0, 2],
      [0, 2],
    ];
    const text = "ABC";
    const text2 = "DEFG";
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().insert([0, 2], text + "\n" + text2),
    )!;

    const [before, after] = splitAt(docText, 2);
    expect(res[0]).toEqual([
      [{ id: 1, text: before + text }],
      [{ id: 1, text: text2 + after }],
    ]);
    expect(res[1]).toEqual(
      moveLine(moveOffset(sel, -before.length + text2.length), 1),
    );
  });

  it("should insert text inside selection", () => {
    const docText = "abcde";
    const doc: Doc = [[{ id: 1, text: docText }]];
    const sel: SelectionSnapshot = [
      [0, 1],
      [0, 3],
    ];
    const text = "ABC";
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().insert([0, 2], text),
    )!;

    expect(res[0]).toEqual([[{ id: 1, text: insertAt(docText, 2, text) }]]);
    expect(res[1]).toEqual(moveOffset(sel, { focus: text.length }));
  });

  it("should insert lines inside selection", () => {
    const docText = "abcde";
    const doc: Doc = [[{ id: 1, text: docText }]];
    const sel: SelectionSnapshot = [
      [0, 1],
      [0, 3],
    ];
    const text = "ABC";
    const text2 = "DEFG";
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().insert([0, 2], text + "\n" + text2),
    )!;

    const [before, after] = splitAt(docText, 2);
    expect(res[0]).toEqual([
      [{ id: 1, text: before + text }],
      [{ id: 1, text: text2 + after }],
    ]);
    expect(res[1]).toEqual(
      moveLine(moveOffset(sel, { focus: -before.length + text2.length }), {
        focus: 1,
      }),
    );
  });

  it("should insert text after caret", () => {
    const docText = "abcde";
    const doc: Doc = [[{ id: 1, text: docText }]];
    const sel: SelectionSnapshot = [
      [0, 2],
      [0, 2],
    ];
    const text = "ABC";
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().insert([0, 3], text),
    )!;

    expect(res[0]).toEqual([[{ id: 1, text: insertAt(docText, 3, text) }]]);
    expect(res[1]).toEqual(sel);
  });

  it("should insert text after caret on middle line", () => {
    const docText = "abcde";
    const docText2 = "fghi";
    const docText3 = "jkl";
    const doc: Doc = [
      [{ id: 1, text: docText }],
      [{ id: 1, text: docText2 }],
      [{ id: 1, text: docText3 }],
    ];
    const sel: SelectionSnapshot = [
      [1, 2],
      [1, 2],
    ];
    const text = "ABC";
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().insert([1, 3], text),
    )!;

    expect(res[0]).toEqual([
      [{ id: 1, text: docText }],
      [{ id: 1, text: insertAt(docText2, 3, text) }],
      [{ id: 1, text: docText3 }],
    ]);
    expect(res[1]).toEqual(sel);
  });

  it("should insert lines after caret", () => {
    const docText = "abcde";
    const doc: Doc = [[{ id: 1, text: docText }]];
    const sel: SelectionSnapshot = [
      [0, 2],
      [0, 2],
    ];
    const text = "ABC";
    const text2 = "DEFG";
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().insert([0, 3], text + "\n" + text2),
    )!;

    const [before, after] = splitAt(docText, 3);
    expect(res[0]).toEqual([
      [{ id: 1, text: before + text }],
      [{ id: 1, text: text2 + after }],
    ]);
    expect(res[1]).toEqual(sel);
  });

  it("should insert text at line after caret", () => {
    const docText = "abcde";
    const docText2 = "fghij";
    const doc: Doc = [[{ id: 1, text: docText }], [{ id: 1, text: docText2 }]];
    const sel: SelectionSnapshot = [
      [0, 2],
      [0, 2],
    ];
    const text = "ABC";
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().insert([1, 1], text),
    )!;

    expect(res[0]).toEqual([
      [{ id: 1, text: docText }],
      [{ id: 1, text: insertAt(docText2, 1, text) }],
    ]);
    expect(res[1]).toEqual(sel);
  });

  it("should insert lines at line after caret", () => {
    const docText = "abcde";
    const docText2 = "fghij";
    const doc: Doc = [[{ id: 1, text: docText }], [{ id: 1, text: docText2 }]];
    const sel: SelectionSnapshot = [
      [0, 2],
      [0, 2],
    ];
    const text = "ABC";
    const text2 = "DEFG";
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().insert([1, 1], text + "\n" + text2),
    )!;

    const [before, after] = splitAt(docText2, 1);
    expect(res[0]).toEqual([
      [{ id: 1, text: docText }],
      [{ id: 1, text: before + text }],
      [{ id: 1, text: text2 + after }],
    ]);
    expect(res[1]).toEqual(sel);
  });
});

describe("insert node", () => {
  describe("validation", () => {
    it("path less than min", () => {
      const docText = "abcde";
      const docText2 = "fghij";
      const doc: Doc = [
        [{ id: 1, text: docText }],
        [{ id: 1, text: docText2 }],
      ];
      const sel: SelectionSnapshot = [
        [1, 2],
        [1, 2],
      ];
      const res = applyTransaction(
        doc,
        sel,
        new Transaction().insertFragment([-1, 0], [[{ text: "test" }]]),
      )!;

      expect(isDocEqual(res[0], doc)).toBe(true);
      expect(res[1]).toEqual(sel);
    });

    it("path more than max", () => {
      const docText = "abcde";
      const docText2 = "fghij";
      const doc: Doc = [
        [{ id: 1, text: docText }],
        [{ id: 1, text: docText2 }],
      ];
      const sel: SelectionSnapshot = [
        [1, 2],
        [1, 2],
      ];
      const res = applyTransaction(
        doc,
        sel,
        new Transaction().insertFragment([100, 0], [[{ text: "test" }]]),
      )!;

      expect(isDocEqual(res[0], doc)).toBe(true);
      expect(res[1]).toEqual(sel);
    });

    it("offset less than min", () => {
      const docText = "abcde";
      const docText2 = "fghij";
      const doc: Doc = [
        [{ id: 1, text: docText }],
        [{ id: 1, text: docText2 }],
      ];
      const sel: SelectionSnapshot = [
        [1, 2],
        [1, 2],
      ];
      const res = applyTransaction(
        doc,
        sel,
        new Transaction().insertFragment([0, -1], [[{ text: "test" }]]),
      )!;

      expect(isDocEqual(res[0], doc)).toBe(true);
      expect(res[1]).toEqual(sel);
    });

    it("offset more than max", () => {
      const docText = "abcde";
      const docText2 = "fghij";
      const doc: Doc = [
        [{ id: 1, text: docText }],
        [{ id: 1, text: docText2 }],
      ];
      const sel: SelectionSnapshot = [
        [1, 2],
        [1, 2],
      ];
      const res = applyTransaction(
        doc,
        sel,
        new Transaction().insertFragment([0, 100], [[{ text: "test" }]]),
      )!;

      expect(isDocEqual(res[0], doc)).toBe(true);
      expect(res[1]).toEqual(sel);
    });

    it("empty text", () => {
      const docText = "abcde";
      const docText2 = "fghij";
      const doc: Doc = [
        [{ id: 1, text: docText }],
        [{ id: 1, text: docText2 }],
      ];
      const sel: SelectionSnapshot = [
        [1, 2],
        [1, 2],
      ];
      const res = applyTransaction(
        doc,
        sel,
        new Transaction().insertFragment([0, 1], [[{ text: "" }]]),
      )!;

      expect(isDocEqual(res[0], doc)).toBe(true);
      expect(res[1]).toEqual(sel);
    });
  });

  it("should insert text at line before caret", () => {
    const docText = "abcde";
    const docText2 = "fghij";
    const doc: Doc = [[{ id: 1, text: docText }], [{ id: 1, text: docText2 }]];
    const sel: SelectionSnapshot = [
      [1, 2],
      [1, 2],
    ];
    const text = "ABC";
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().insertFragment([0, 1], [[{ text }]]),
    )!;

    const [before, after] = splitAt(docText, 1);
    expect(res[0]).toEqual([
      [{ id: 1, text: before }, { text }, { id: 1, text: after }],
      [{ id: 1, text: docText2 }],
    ]);
    expect(res[1]).toEqual(sel);
  });

  it("should insert lines at line before caret", () => {
    const docText = "abcde";
    const docText2 = "fghij";
    const doc: Doc = [[{ id: 1, text: docText }], [{ id: 1, text: docText2 }]];
    const sel: SelectionSnapshot = [
      [1, 2],
      [1, 2],
    ];
    const text = "ABC";
    const text2 = "DEFG";
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().insertFragment(
        [0, 1],
        [[{ text: text }], [{ text: text2 }]],
      ),
    )!;

    const [before, after] = splitAt(docText, 1);
    expect(res[0]).toEqual([
      [{ id: 1, text: before }, { text }],
      [{ text: text2 }, { id: 1, text: after }],
      [{ id: 1, text: docText2 }],
    ]);
    expect(res[1]).toEqual(moveLine(sel, 1));
  });

  it("should insert text before caret", () => {
    const docText = "abcde";
    const doc: Doc = [[{ id: 1, text: docText }]];
    const sel: SelectionSnapshot = [
      [0, 2],
      [0, 2],
    ];
    const text = "ABC";
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().insertFragment([0, 1], [[{ text }]]),
    )!;

    const [before, after] = splitAt(docText, 1);
    expect(res[0]).toEqual([
      [{ id: 1, text: before }, { text }, { id: 1, text: after }],
    ]);
    expect(res[1]).toEqual(moveOffset(sel, text.length));
  });

  it("should insert text before caret on middle line", () => {
    const docText = "abcde";
    const docText2 = "fghi";
    const docText3 = "jkl";
    const doc: Doc = [
      [{ id: 1, text: docText }],
      [{ id: 1, text: docText2 }],
      [{ id: 1, text: docText3 }],
    ];
    const sel: SelectionSnapshot = [
      [1, 2],
      [1, 2],
    ];
    const text = "ABC";
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().insertFragment([1, 1], [[{ text }]]),
    )!;

    const [before, after] = splitAt(docText2, 1);
    expect(res[0]).toEqual([
      [{ id: 1, text: docText }],
      [{ id: 1, text: before }, { text }, { id: 1, text: after }],
      [{ id: 1, text: docText3 }],
    ]);
    expect(res[1]).toEqual(moveOffset(sel, text.length));
  });

  it("should insert lines before caret", () => {
    const docText = "abcde";
    const doc: Doc = [[{ id: 1, text: docText }]];
    const sel: SelectionSnapshot = [
      [0, 2],
      [0, 2],
    ];
    const text = "ABC";
    const text2 = "DEFG";
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().insertFragment(
        [0, 1],
        [[{ text: text }], [{ text: text2 }]],
      ),
    )!;

    const [before, after] = splitAt(docText, 1);
    expect(res[0]).toEqual([
      [{ id: 1, text: before }, { text }],
      [{ text: text2 }, { id: 1, text: after }],
    ]);
    expect(res[1]).toEqual(
      moveLine(moveOffset(sel, -before.length + text2.length), 1),
    );
  });

  it("should insert text on caret", () => {
    const docText = "abcde";
    const doc: Doc = [[{ id: 1, text: docText }]];
    const sel: SelectionSnapshot = [
      [0, 2],
      [0, 2],
    ];
    const text = "ABC";
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().insertFragment([0, 2], [[{ text }]]),
    )!;

    const [before, after] = splitAt(docText, 2);
    expect(res[0]).toEqual([
      [{ id: 1, text: before }, { text }, { id: 1, text: after }],
    ]);
    expect(res[1]).toEqual(moveOffset(sel, text.length));
  });

  it("should insert lines on caret", () => {
    const docText = "abcde";
    const doc: Doc = [[{ id: 1, text: docText }]];
    const sel: SelectionSnapshot = [
      [0, 2],
      [0, 2],
    ];
    const text = "ABC";
    const text2 = "DEFG";
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().insertFragment(
        [0, 2],
        [[{ text: text }], [{ text: text2 }]],
      ),
    )!;

    const [before, after] = splitAt(docText, 2);
    expect(res[0]).toEqual([
      [{ id: 1, text: before }, { text }],
      [{ text: text2 }, { id: 1, text: after }],
    ]);
    expect(res[1]).toEqual(
      moveLine(moveOffset(sel, -before.length + text2.length), 1),
    );
  });

  it("should insert text inside selection", () => {
    const docText = "abcde";
    const doc: Doc = [[{ id: 1, text: docText }]];
    const sel: SelectionSnapshot = [
      [0, 1],
      [0, 3],
    ];
    const text = "ABC";
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().insertFragment([0, 2], [[{ text }]]),
    )!;

    const [before, after] = splitAt(docText, 2);
    expect(res[0]).toEqual([
      [{ id: 1, text: before }, { text }, { id: 1, text: after }],
    ]);
    expect(res[1]).toEqual(moveOffset(sel, { focus: text.length }));
  });

  it("should insert lines inside selection", () => {
    const docText = "abcde";
    const doc: Doc = [[{ id: 1, text: docText }]];
    const sel: SelectionSnapshot = [
      [0, 1],
      [0, 3],
    ];
    const text = "ABC";
    const text2 = "DEFG";
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().insertFragment(
        [0, 2],
        [[{ text: text }], [{ text: text2 }]],
      ),
    )!;

    const [before, after] = splitAt(docText, 2);
    expect(res[0]).toEqual([
      [{ id: 1, text: before }, { text }],
      [{ text: text2 }, { id: 1, text: after }],
    ]);
    expect(res[1]).toEqual(
      moveLine(moveOffset(sel, { focus: -before.length + text2.length }), {
        focus: 1,
      }),
    );
  });

  it("should insert text after caret", () => {
    const docText = "abcde";
    const doc: Doc = [[{ id: 1, text: docText }]];
    const sel: SelectionSnapshot = [
      [0, 2],
      [0, 2],
    ];
    const text = "ABC";
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().insertFragment([0, 3], [[{ text }]]),
    )!;

    const [before, after] = splitAt(docText, 3);
    expect(res[0]).toEqual([
      [{ id: 1, text: before }, { text }, { id: 1, text: after }],
    ]);
    expect(res[1]).toEqual(sel);
  });

  it("should insert text after caret on middle line", () => {
    const docText = "abcde";
    const docText2 = "fghi";
    const docText3 = "jkl";
    const doc: Doc = [
      [{ id: 1, text: docText }],
      [{ id: 1, text: docText2 }],
      [{ id: 1, text: docText3 }],
    ];
    const sel: SelectionSnapshot = [
      [1, 2],
      [1, 2],
    ];
    const text = "ABC";
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().insertFragment([1, 3], [[{ text }]]),
    )!;

    const [before, after] = splitAt(docText2, 3);
    expect(res[0]).toEqual([
      [{ id: 1, text: docText }],
      [{ id: 1, text: before }, { text }, { id: 1, text: after }],
      [{ id: 1, text: docText3 }],
    ]);
    expect(res[1]).toEqual(sel);
  });

  it("should insert lines after caret", () => {
    const docText = "abcde";
    const doc: Doc = [[{ id: 1, text: docText }]];
    const sel: SelectionSnapshot = [
      [0, 2],
      [0, 2],
    ];
    const text = "ABC";
    const text2 = "DEFG";
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().insertFragment(
        [0, 3],
        [[{ text: text }], [{ text: text2 }]],
      ),
    )!;

    const [before, after] = splitAt(docText, 3);
    expect(res[0]).toEqual([
      [{ id: 1, text: before }, { text }],
      [{ text: text2 }, { id: 1, text: after }],
    ]);
    expect(res[1]).toEqual(sel);
  });

  it("should insert text at line after caret", () => {
    const docText = "abcde";
    const docText2 = "fghij";
    const doc: Doc = [[{ id: 1, text: docText }], [{ id: 1, text: docText2 }]];
    const sel: SelectionSnapshot = [
      [0, 2],
      [0, 2],
    ];
    const text = "ABC";
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().insertFragment([1, 1], [[{ text }]]),
    )!;

    const [before, after] = splitAt(docText2, 1);
    expect(res[0]).toEqual([
      [{ id: 1, text: docText }],
      [{ id: 1, text: before }, { text }, { id: 1, text: after }],
    ]);
    expect(res[1]).toEqual(sel);
  });

  it("should insert lines at line after caret", () => {
    const docText = "abcde";
    const docText2 = "fghij";
    const doc: Doc = [[{ id: 1, text: docText }], [{ id: 1, text: docText2 }]];
    const sel: SelectionSnapshot = [
      [0, 2],
      [0, 2],
    ];
    const text = "ABC";
    const text2 = "DEFG";
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().insertFragment(
        [1, 1],
        [[{ text: text }], [{ text: text2 }]],
      ),
    )!;

    const [before, after] = splitAt(docText2, 1);
    expect(res[0]).toEqual([
      [{ id: 1, text: docText }],
      [{ id: 1, text: before }, { text: text }],
      [{ text: text2 }, { id: 1, text: after }],
    ]);
    expect(res[1]).toEqual(sel);
  });
});

describe("delete", () => {
  describe("validation", () => {
    it("path less than min", () => {
      const docText = "abcde";
      const doc: Doc = [[{ id: 1, text: docText }]];
      const sel: SelectionSnapshot = [
        [0, 2],
        [0, 2],
      ];
      const res = applyTransaction(
        doc,
        sel,
        new Transaction().delete([-1, 0], [0, 1]),
      )!;

      expect(isDocEqual(res[0], doc)).toBe(true);
      expect(res[1]).toEqual(sel);
    });

    it("path more than max", () => {
      const docText = "abcde";
      const doc: Doc = [[{ id: 1, text: docText }]];
      const sel: SelectionSnapshot = [
        [0, 2],
        [0, 2],
      ];
      const res = applyTransaction(
        doc,
        sel,
        new Transaction().delete([0, 0], [100, 1]),
      )!;

      expect(isDocEqual(res[0], doc)).toBe(true);
      expect(res[1]).toEqual(sel);
    });

    it("offset less than min", () => {
      const docText = "abcde";
      const doc: Doc = [[{ id: 1, text: docText }]];
      const sel: SelectionSnapshot = [
        [0, 2],
        [0, 2],
      ];
      const res = applyTransaction(
        doc,
        sel,
        new Transaction().delete([0, -1], [0, 1]),
      )!;

      expect(isDocEqual(res[0], doc)).toBe(true);
      expect(res[1]).toEqual(sel);
    });

    it("offset more than max", () => {
      const docText = "abcde";
      const doc: Doc = [[{ id: 1, text: docText }]];
      const sel: SelectionSnapshot = [
        [0, 2],
        [0, 2],
      ];
      const res = applyTransaction(
        doc,
        sel,
        new Transaction().delete([0, 0], [0, 100]),
      )!;

      expect(isDocEqual(res[0], doc)).toBe(true);
      expect(res[1]).toEqual(sel);
    });

    it("start and end is the same", () => {
      const docText = "abcde";
      const doc: Doc = [[{ id: 1, text: docText }]];
      const sel: SelectionSnapshot = [
        [0, 2],
        [0, 2],
      ];
      const res = applyTransaction(
        doc,
        sel,
        new Transaction().delete([0, 1], [0, 1]),
      )!;

      expect(isDocEqual(res[0], doc)).toBe(true);
      expect(res[1]).toEqual(sel);
    });
  });

  it("should delete text at line before caret", () => {
    const docText = "abcde";
    const docText2 = "fghij";
    const doc: Doc = [[{ id: 1, text: docText }], [{ id: 1, text: docText2 }]];
    const sel: SelectionSnapshot = [
      [1, 2],
      [1, 2],
    ];
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().delete([0, 1], [0, 2]),
    )!;

    expect(res[0]).toEqual([
      [{ id: 1, text: deleteAt(docText, 1, 1) }],
      [{ id: 1, text: docText2 }],
    ]);
    expect(res[1]).toEqual(sel);
  });

  it("should delete linebreak at line before caret", () => {
    const docText = "abcde";
    const docText2 = "fghij";
    const doc: Doc = [[{ id: 1, text: docText }], [{ id: 1, text: docText2 }]];
    const sel: SelectionSnapshot = [
      [1, 3],
      [1, 3],
    ];

    const res = applyTransaction(
      doc,
      sel,
      new Transaction().delete([0, 2], [1, 1]),
    )!;

    expect(res[0]).toEqual([
      [
        {
          id: 1,
          text:
            deleteAt(docText, 2, docText.length - 1) + deleteAt(docText2, 0, 1),
        },
      ],
    ]);
    expect(res[1]).toEqual([
      [0, 2 + (3 - 1)],
      [0, 2 + (3 - 1)],
    ]);
  });

  it("should delete text before caret", () => {
    const docText = "abcde";
    const doc: Doc = [[{ id: 1, text: docText }]];
    const sel: SelectionSnapshot = [
      [0, 3],
      [0, 3],
    ];
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().delete([0, 1], [0, 2]),
    )!;

    expect(res[0]).toEqual([[{ id: 1, text: deleteAt(docText, 1, 1) }]]);
    expect(res[1]).toEqual(moveOffset(sel, -1));
  });

  it("should delete text before caret on middle line", () => {
    const docText = "abcde";
    const docText2 = "fghi";
    const docText3 = "jkl";
    const doc: Doc = [
      [{ id: 1, text: docText }],
      [{ id: 1, text: docText2 }],
      [{ id: 1, text: docText3 }],
    ];
    const sel: SelectionSnapshot = [
      [1, 3],
      [1, 3],
    ];
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().delete([1, 1], [1, 2]),
    )!;

    expect(res[0]).toEqual([
      [{ id: 1, text: docText }],
      [{ id: 1, text: deleteAt(docText2, 1, 1) }],
      [{ id: 1, text: docText3 }],
    ]);
    expect(res[1]).toEqual(moveOffset(sel, -1));
  });

  it("should delete text just before caret", () => {
    const docText = "abcde";
    const doc: Doc = [[{ id: 1, text: docText }]];
    const sel: SelectionSnapshot = [
      [0, 3],
      [0, 3],
    ];
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().delete([0, 2], [0, 3]),
    )!;

    expect(res[0]).toEqual([[{ id: 1, text: deleteAt(docText, 2, 1) }]]);
    expect(res[1]).toEqual(moveOffset(sel, -1));
  });

  it("should delete text around caret", () => {
    const docText = "abcde";
    const doc: Doc = [[{ id: 1, text: docText }]];
    const sel: SelectionSnapshot = [
      [0, 3],
      [0, 3],
    ];
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().delete([0, 2], [0, 4]),
    )!;

    expect(res[0]).toEqual([[{ id: 1, text: deleteAt(docText, 2, 2) }]]);
    expect(res[1]).toEqual(moveOffset(sel, -1));
  });

  it("should delete text around selection", () => {
    const docText = "abcde";
    const doc: Doc = [[{ id: 1, text: docText }]];
    const sel: SelectionSnapshot = [
      [0, 2],
      [0, 4],
    ];
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().delete([0, 1], [0, 5]),
    )!;

    expect(res[0]).toEqual([[{ id: 1, text: deleteAt(docText, 1, 4) }]]);
    expect(res[1]).toEqual([
      [0, 1],
      [0, 1],
    ]);
  });

  it("should delete text around selection anchor", () => {
    const docText = "abcde";
    const doc: Doc = [[{ id: 1, text: docText }]];
    const sel: SelectionSnapshot = [
      [0, 2],
      [0, 4],
    ];
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().delete([0, 1], [0, 3]),
    )!;

    expect(res[0]).toEqual([[{ id: 1, text: deleteAt(docText, 1, 2) }]]);
    expect(res[1]).toEqual(moveOffset(sel, { anchor: 1 - 2, focus: -2 }));
  });

  it("should delete text around selection focus", () => {
    const docText = "abcde";
    const doc: Doc = [[{ id: 1, text: docText }]];
    const sel: SelectionSnapshot = [
      [0, 2],
      [0, 4],
    ];
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().delete([0, 3], [0, 5]),
    )!;

    expect(res[0]).toEqual([[{ id: 1, text: deleteAt(docText, 3, 2) }]]);
    expect(res[1]).toEqual(moveOffset(sel, { focus: 1 - 2 }));
  });

  it("should delete linebreak inside selection", () => {
    const docText = "abcde";
    const docText2 = "fghij";
    const doc: Doc = [[{ id: 1, text: docText }], [{ id: 1, text: docText2 }]];
    const sel: SelectionSnapshot = [
      [0, 2],
      [1, 2],
    ];
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().delete([0, 3], [1, 1]),
    )!;

    expect(res[0]).toEqual([
      [{ id: 1, text: splitAt(docText, 3)[0] + splitAt(docText2, 1)[1] }],
    ]);
    expect(res[1]).toEqual([
      [0, 2],
      [0, 3 + 1],
    ]);
  });

  it("should delete text just after caret", () => {
    const docText = "abcde";
    const doc: Doc = [[{ id: 1, text: docText }]];
    const sel: SelectionSnapshot = [
      [0, 3],
      [0, 3],
    ];
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().delete([0, 3], [0, 4]),
    )!;

    expect(res[0]).toEqual([[{ id: 1, text: deleteAt(docText, 3, 1) }]]);
    expect(res[1]).toEqual(sel);
  });

  it("should delete text after caret", () => {
    const docText = "abcde";
    const doc: Doc = [[{ id: 1, text: docText }]];
    const sel: SelectionSnapshot = [
      [0, 3],
      [0, 3],
    ];
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().delete([0, 4], [0, 5]),
    )!;

    expect(res[0]).toEqual([[{ id: 1, text: deleteAt(docText, 4, 1) }]]);
    expect(res[1]).toEqual(sel);
  });

  it("should delete text after caret on middle line", () => {
    const docText = "abcde";
    const docText2 = "fghi";
    const docText3 = "jkl";
    const doc: Doc = [
      [{ id: 1, text: docText }],
      [{ id: 1, text: docText2 }],
      [{ id: 1, text: docText3 }],
    ];
    const sel: SelectionSnapshot = [
      [1, 2],
      [1, 2],
    ];
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().delete([1, 3], [1, 4]),
    )!;

    expect(res[0]).toEqual([
      [{ id: 1, text: docText }],
      [{ id: 1, text: deleteAt(docText2, 3, 1) }],
      [{ id: 1, text: docText3 }],
    ]);
    expect(res[1]).toEqual(sel);
  });

  it("should delete text at line after caret", () => {
    const docText = "abcde";
    const docText2 = "fghij";
    const doc: Doc = [[{ id: 1, text: docText }], [{ id: 1, text: docText2 }]];
    const sel: SelectionSnapshot = [
      [0, 2],
      [0, 2],
    ];
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().delete([1, 1], [1, 2]),
    )!;

    expect(res[0]).toEqual([
      [{ id: 1, text: docText }],
      [{ id: 1, text: deleteAt(docText2, 1, 1) }],
    ]);
    expect(res[1]).toEqual(sel);
  });

  it("should delete linebreak at line after caret", () => {
    const docText = "abcde";
    const docText2 = "fghij";
    const docText3 = "klmno";
    const doc: Doc = [
      [{ id: 1, text: docText }],
      [{ id: 1, text: docText2 }],
      [{ id: 1, text: docText3 }],
    ];
    const sel: SelectionSnapshot = [
      [0, 2],
      [0, 2],
    ];
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().delete([1, 1], [2, 1]),
    )!;

    expect(res[0]).toEqual([
      [{ id: 1, text: docText }],
      [
        {
          id: 1,
          text:
            deleteAt(docText2, 1, docText2.length - 1) +
            deleteAt(docText3, 0, 1),
        },
      ],
    ]);
    expect(res[1]).toEqual(sel);
  });
});

describe("selection", () => {
  describe("validation", () => {
    it("path less than min", () => {
      const docText = "abcde";
      const doc: Doc = [[{ id: 1, text: docText }]];
      const sel: SelectionSnapshot = [
        [0, 2],
        [0, 2],
      ];
      const res = applyTransaction(
        doc,
        sel,
        new Transaction().select([-1, 0], [0, 1]),
      )!;

      expect(isDocEqual(res[0], doc)).toBe(true);
      expect(res[1]).toEqual(sel);
    });

    it("path more than max", () => {
      const docText = "abcde";
      const doc: Doc = [[{ id: 1, text: docText }]];
      const sel: SelectionSnapshot = [
        [0, 2],
        [0, 2],
      ];
      const res = applyTransaction(
        doc,
        sel,
        new Transaction().select([0, 0], [100, 1]),
      )!;

      expect(isDocEqual(res[0], doc)).toBe(true);
      expect(res[1]).toEqual(sel);
    });

    it("offset less than min", () => {
      const docText = "abcde";
      const doc: Doc = [[{ id: 1, text: docText }]];
      const sel: SelectionSnapshot = [
        [0, 2],
        [0, 2],
      ];
      const res = applyTransaction(
        doc,
        sel,
        new Transaction().select([0, -1], [0, 1]),
      )!;

      expect(isDocEqual(res[0], doc)).toBe(true);
      expect(res[1]).toEqual(sel);
    });

    it("offset more than max", () => {
      const docText = "abcde";
      const doc: Doc = [[{ id: 1, text: docText }]];
      const sel: SelectionSnapshot = [
        [0, 2],
        [0, 2],
      ];
      const res = applyTransaction(
        doc,
        sel,
        new Transaction().select([0, 0], [0, 100]),
      )!;

      expect(isDocEqual(res[0], doc)).toBe(true);
      expect(res[1]).toEqual(sel);
    });
  });

  it("should select cursor", () => {
    const docText = "abcde";
    const doc: Doc = [[{ id: 1, text: docText }]];
    const sel: SelectionSnapshot = [
      [0, 2],
      [0, 2],
    ];
    const nextSel: SelectionSnapshot = [
      [0, 1],
      [0, 1],
    ];
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().select(...nextSel),
    )!;

    expect(isDocEqual(res[0], doc)).toBe(true);
    expect(res[1]).toEqual(nextSel);
  });

  it("should select text at line", () => {
    const docText = "abcde";
    const docText2 = "fghij";
    const docText3 = "klmno";
    const doc: Doc = [
      [{ id: 1, text: docText }],
      [{ id: 1, text: docText2 }],
      [{ id: 1, text: docText3 }],
    ];
    const sel: SelectionSnapshot = [
      [0, 2],
      [0, 2],
    ];
    const nextSel: SelectionSnapshot = [
      [1, 1],
      [2, 1],
    ];
    const res = applyTransaction(
      doc,
      sel,
      new Transaction().select(...nextSel),
    )!;

    expect(res[0]).toEqual(doc);
    expect(res[1]).toEqual(nextSel);
  });

  it("should select linebreak", () => {
    const docText = "abcde";
    const docText2 = "fghij";
    const doc: Doc = [[{ id: 1, text: docText }], [{ id: 1, text: docText2 }]];
    const sel: SelectionSnapshot = [
      [0, 1],
      [0, 1],
    ];
    const nextSel: SelectionSnapshot = [
      [0, 2],
      [1, 1],
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
    const doc: Doc = [[{ id: 1, text: docText }], [{ id: 1, text: docText2 }]];
    const sel: SelectionSnapshot = [
      [0, 1],
      [0, 1],
    ];
    const nextSel: SelectionSnapshot = [
      [0, 0],
      [doc.length - 1, doc[doc.length - 1]![0]!.text.length - 1],
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
