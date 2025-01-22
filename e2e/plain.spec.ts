import { test, expect, Page } from "@playwright/test";
import {
  createSelection,
  getSelection,
  getText,
  initEdixHelpers,
  deleteAt,
  insertAt,
  insertLineBreakAt,
} from "./edix";
import { getEditable, input, loop, storyUrl } from "./utils";

test.beforeEach(async ({ context }) => {
  await initEdixHelpers(context);
});

test.describe("type word", () => {
  test.describe("multiline", () => {
    test("on origin", async ({ page }) => {
      await page.goto(storyUrl("basics-plain--multiline"));

      const editable = await getEditable(page);
      const initialValue = await getText(editable);

      await editable.focus();

      expect(await getSelection(editable)).toEqual(createSelection());

      // Input
      const text = "test";
      await input(editable, text);
      const value = await getText(editable);
      expect(value).toEqual(insertAt(initialValue, text, [0, 0]));
      const textLength = text.length;
      expect(await getSelection(editable)).toEqual(
        createSelection({ offset: textLength })
      );
    });

    test("on 1st row", async ({ page }) => {
      await page.goto(storyUrl("basics-plain--multiline"));

      const editable = await getEditable(page);
      const initialValue = await getText(editable);

      await editable.focus();

      expect(await getSelection(editable)).toEqual(createSelection());

      // Move caret
      await page.keyboard.press("ArrowRight");
      expect(await getSelection(editable)).toEqual(
        createSelection({ offset: 1 })
      );

      // Input
      const text = "test";
      await input(editable, text);
      const value = await getText(editable);
      expect(value).toEqual(insertAt(initialValue, text, [0, 1]));
      const textLength = text.length;
      expect(await getSelection(editable)).toEqual(
        createSelection({ offset: 1 + textLength })
      );
    });

    test("on 2nd row", async ({ page }) => {
      await page.goto(storyUrl("basics-plain--multiline"));

      const editable = await getEditable(page);
      const initialValue = await getText(editable);

      await editable.focus();

      expect(await getSelection(editable)).toEqual(createSelection());

      // Move caret
      await page.keyboard.press("ArrowRight");
      await page.keyboard.press("ArrowDown");
      expect(await getSelection(editable)).toEqual(
        createSelection({ line: 1, offset: 1 })
      );

      // Input
      const text = "test";
      await input(editable, text);
      const value = await getText(editable);
      expect(value).toEqual(insertAt(initialValue, text, [1, 1]));
      const textLength = text.length;
      expect(await getSelection(editable)).toEqual(
        createSelection({ line: 1, offset: 1 + textLength })
      );
    });

    test("with IME", async ({ browserName, page }) => {
      test.skip(browserName !== "chromium");

      await page.goto(storyUrl("basics-plain--multiline"));

      const editable = await getEditable(page);
      const initialValue = await getText(editable);

      await editable.focus();

      expect(await getSelection(editable)).toEqual(createSelection());

      const client = await page.context().newCDPSession(page);
      await client.send("Input.imeSetComposition", {
        selectionStart: -1,
        selectionEnd: -1,
        text: "😂😂",
      });
      await client.send("Input.imeSetComposition", {
        selectionStart: 1,
        selectionEnd: 2,
        text: "😭",
      });
      await client.send("Input.insertText", {
        text: "😂😭",
      });

      const value = await getText(editable);
      expect(value).toEqual(insertAt(initialValue, "😂😭", [0, 0]));
      const textLength = "😂😭".length;
      expect(await getSelection(editable)).toEqual(
        createSelection({ offset: textLength })
      );
    });
  });

  test.describe("singleline", () => {
    test("on origin", async ({ page }) => {
      await page.goto(storyUrl("basics-plain--singleline"));

      const editable = await getEditable(page);
      const initialValue = await getText(editable);

      await editable.focus();

      expect(await getSelection(editable, true)).toEqual(createSelection());

      // Input
      const text = "test";
      await input(editable, text);
      const value = await getText(editable);
      expect(value).toEqual(insertAt(initialValue, text, [0, 0]));
      const textLength = text.length;
      expect(await getSelection(editable, true)).toEqual(
        createSelection({ offset: textLength })
      );
    });

    test("on 1st row", async ({ page }) => {
      await page.goto(storyUrl("basics-plain--singleline"));

      const editable = await getEditable(page);
      const initialValue = await getText(editable);

      await editable.focus();

      expect(await getSelection(editable, true)).toEqual(createSelection());

      // Move caret
      await page.keyboard.press("ArrowRight");
      expect(await getSelection(editable, true)).toEqual(
        createSelection({ offset: 1 })
      );

      // Input
      const text = "test";
      await input(editable, text);
      const value = await getText(editable);
      expect(value).toEqual(insertAt(initialValue, text, [0, 1]));
      const textLength = text.length;
      expect(await getSelection(editable, true)).toEqual(
        createSelection({ offset: 1 + textLength })
      );
    });

    test("with IME", async ({ browserName, page }) => {
      test.skip(browserName !== "chromium");

      await page.goto(storyUrl("basics-plain--singleline"));

      const editable = await getEditable(page);
      const initialValue = await getText(editable);

      await editable.focus();

      expect(await getSelection(editable, true)).toEqual(createSelection());

      const client = await page.context().newCDPSession(page);
      await client.send("Input.imeSetComposition", {
        selectionStart: -1,
        selectionEnd: -1,
        text: "😂😂",
      });
      await client.send("Input.imeSetComposition", {
        selectionStart: 1,
        selectionEnd: 2,
        text: "😭",
      });
      await client.send("Input.insertText", {
        text: "😂😭",
      });

      const value = await getText(editable);
      expect(value).toEqual(insertAt(initialValue, "😂😭", [0, 0]));
      const textLength = "😂😭".length;
      expect(await getSelection(editable, true)).toEqual(
        createSelection({ offset: textLength })
      );
    });
  });
});

test.describe("replace range", () => {
  test("replace chars", async ({ page }) => {
    await page.goto(storyUrl("basics-plain--multiline"));

    const editable = await getEditable(page);
    const initialValue = await getText(editable);

    await editable.focus();

    expect(await getSelection(editable)).toEqual(createSelection());

    // Move caret
    await page.keyboard.press("ArrowRight");
    expect(await getSelection(editable)).toEqual(
      createSelection({ offset: 1 })
    );
    // Expand selection
    const selLength = 3;

    await loop(selLength, () => page.keyboard.press("Shift+ArrowRight"));
    expect(await getSelection(editable)).toEqual(
      createSelection({ offset: 1, extent: selLength })
    );

    // Input
    const char = "a";
    const charLength = char.length;
    await input(editable, char);
    const value = await getText(editable);
    expect(value).toEqual(
      insertAt(deleteAt(initialValue, selLength, [0, 1]), char, [0, 1])
    );
    expect(await getSelection(editable)).toEqual(
      createSelection({ offset: 1 + charLength })
    );
  });

  test("replace linebreak", async ({ page }) => {
    await page.goto(storyUrl("basics-plain--multiline"));

    const editable = await getEditable(page);
    const initialValue = await getText(editable);

    await editable.focus();

    expect(await getSelection(editable)).toEqual(createSelection());

    // Move caret
    const len = 1;
    await loop(len, () => page.keyboard.press("ArrowRight"));
    expect(await getSelection(editable)).toEqual(
      createSelection({ offset: len })
    );
    // Expand selection
    await page.keyboard.press("Shift+ArrowDown");
    expect(await getSelection(editable)).toEqual(
      createSelection({ anchor: [0, len], focus: [1, len] })
    );

    // Input
    const char = "a";
    const charLength = char.length;
    await input(editable, char);

    const value = await getText(editable);
    expect(value).toEqual([
      initialValue[0].slice(0, len) + char + initialValue[1].slice(len),
      ...initialValue.slice(2),
    ]);
    expect(await getSelection(editable)).toEqual(
      createSelection({ offset: len + charLength })
    );
  });

  test("replace all", async ({ page }) => {
    await page.goto(storyUrl("basics-plain--multiline"));

    const editable = await getEditable(page);
    const initialValue = await getText(editable);

    await editable.focus();

    expect(await getSelection(editable)).toEqual(createSelection());

    // Select All
    await page.keyboard.press(`ControlOrMeta+A`);
    expect(await getSelection(editable)).toEqual(
      createSelection({
        anchor: [0, 0],
        focus: [
          initialValue.length - 1,
          initialValue[initialValue.length - 1].length,
        ],
      })
    );

    // Input
    const char = "a";
    const charLength = char.length;
    await input(editable, char);

    const value = await getText(editable);
    expect(value).toEqual([char]);
    expect(await getSelection(editable)).toEqual(
      createSelection({ offset: charLength })
    );
  });
});

test.describe("Keydown", () => {
  test.describe("Arrow keys", () => {
    test("multiline", async ({ page }) => {
      await page.goto(storyUrl("basics-plain--multiline"));

      const editable = await getEditable(page);

      await editable.focus();

      expect(await getSelection(editable)).toEqual(createSelection());

      await page.keyboard.press("ArrowRight");
      expect(await getSelection(editable)).toEqual(
        createSelection({ offset: 1 })
      );

      await page.keyboard.press("ArrowDown");
      expect(await getSelection(editable)).toEqual(
        createSelection({ line: 1, offset: 1 })
      );

      await page.keyboard.press("ArrowLeft");
      expect(await getSelection(editable)).toEqual(
        createSelection({ line: 1, offset: 0 })
      );

      await page.keyboard.press("ArrowUp");
      expect(await getSelection(editable)).toEqual(createSelection());
    });

    test("singleline", async ({ page }) => {
      await page.goto(storyUrl("basics-plain--singleline"));

      const editable = await getEditable(page);
      const textLength = (await getText(editable))[0].length;

      await editable.focus();

      expect(await getSelection(editable)).toEqual(createSelection());

      await page.keyboard.press("ArrowRight");
      expect(await getSelection(editable)).toEqual(
        createSelection({ offset: 1 })
      );

      await page.keyboard.press("ArrowDown");
      expect(await getSelection(editable)).toEqual(
        createSelection({ offset: textLength })
      );

      await page.keyboard.press("ArrowLeft");
      expect(await getSelection(editable)).toEqual(
        createSelection({ offset: textLength - 1 })
      );

      await page.keyboard.press("ArrowUp");
      expect(await getSelection(editable)).toEqual(createSelection());
    });
  });

  test.describe("Enter", () => {
    test("multiline", async ({ page }) => {
      await page.goto(storyUrl("basics-plain--multiline"));

      const editable = await getEditable(page);
      const initialValue = await getText(editable);

      await editable.focus();

      expect(await getSelection(editable)).toEqual(createSelection());

      await loop(2, () => page.keyboard.press("ArrowRight"));
      expect(await getSelection(editable)).toEqual(
        createSelection({ offset: 2 })
      );

      // Press enter
      await page.keyboard.press("Enter");

      {
        const value = await getText(editable);
        expect(value).toEqual(insertLineBreakAt(initialValue, [0, 2]));
        expect(await getSelection(editable)).toEqual(
          createSelection({ line: 1 })
        );
      }

      // Press enter again
      await page.keyboard.press("Enter");

      {
        const value = await getText(editable);
        expect(value).toEqual(
          insertLineBreakAt(insertLineBreakAt(initialValue, [0, 2]), [1, 0])
        );
        expect(await getSelection(editable)).toEqual(
          createSelection({ line: 2 })
        );
      }
    });

    test("singleline", async ({ page }) => {
      await page.goto(storyUrl("basics-plain--singleline"));

      const editable = await getEditable(page);
      const initialValue = await getText(editable);

      await editable.focus();

      expect(await getSelection(editable)).toEqual(createSelection());

      await loop(2, () => page.keyboard.press("ArrowRight"));
      expect(await getSelection(editable)).toEqual(
        createSelection({ offset: 2 })
      );

      // Press enter
      await page.keyboard.press("Enter");

      // NOP
      expect(await getText(editable)).toEqual(initialValue);
      expect(await getSelection(editable)).toEqual(
        createSelection({ offset: 2 })
      );
    });
  });

  test.describe("Backspace", () => {
    test("delete char", async ({ page }) => {
      await page.goto(storyUrl("basics-plain--multiline"));

      const editable = await getEditable(page);
      const initialValue = await getText(editable);

      await editable.focus();

      expect(await getSelection(editable)).toEqual(createSelection());

      // Move caret
      await loop(2, () => page.keyboard.press("ArrowRight"));
      expect(await getSelection(editable)).toEqual(
        createSelection({ offset: 2 })
      );

      // delete
      await page.keyboard.press("Backspace");

      const value = await getText(editable);
      expect(value).toEqual(deleteAt(initialValue, 1, [0, 1]));
      expect(await getSelection(editable)).toEqual(
        createSelection({ offset: 1 })
      );
    });

    test("delete chars", async ({ page }) => {
      await page.goto(storyUrl("basics-plain--multiline"));

      const editable = await getEditable(page);
      const initialValue = await getText(editable);

      await editable.focus();

      expect(await getSelection(editable)).toEqual(createSelection());

      // Move caret
      await page.keyboard.press("ArrowRight");
      expect(await getSelection(editable)).toEqual(
        createSelection({ offset: 1 })
      );
      // Expand selection
      const selLength = 3;
      await loop(selLength, () => page.keyboard.press("Shift+ArrowRight"));
      expect(await getSelection(editable)).toEqual(
        createSelection({ offset: 1, extent: selLength })
      );

      // delete
      await page.keyboard.press("Backspace");

      const value = await getText(editable);
      expect(value).toEqual(deleteAt(initialValue, selLength, [0, 1]));
      expect(await getSelection(editable)).toEqual(
        createSelection({ offset: 1 })
      );
    });

    test("delete linebreak", async ({ page }) => {
      await page.goto(storyUrl("basics-plain--multiline"));

      const editable = await getEditable(page);
      const initialValue = await getText(editable);

      await editable.focus();

      expect(await getSelection(editable)).toEqual(createSelection());

      // Move caret
      const len = 1;
      await loop(len, () => page.keyboard.press("ArrowRight"));
      expect(await getSelection(editable)).toEqual(
        createSelection({ offset: len })
      );
      // Expand selection
      await page.keyboard.press("Shift+ArrowDown");
      expect(await getSelection(editable)).toEqual(
        createSelection({ anchor: [0, len], focus: [1, len] })
      );

      // delete
      await page.keyboard.press("Backspace");

      const value = await getText(editable);
      expect(value).toEqual([
        initialValue[0].slice(0, len) + initialValue[1].slice(len),
        ...initialValue.slice(2),
      ]);
      expect(await getSelection(editable)).toEqual(
        createSelection({ offset: len })
      );
    });

    test("delete all", async ({ page }) => {
      await page.goto(storyUrl("basics-plain--multiline"));

      const editable = await getEditable(page);
      const initialValue = await getText(editable);

      await editable.focus();

      expect(await getSelection(editable)).toEqual(createSelection());

      // Select All
      await page.keyboard.press(`ControlOrMeta+A`);
      expect(await getSelection(editable)).toEqual(
        createSelection({
          anchor: [0, 0],
          focus: [
            initialValue.length - 1,
            initialValue[initialValue.length - 1].length,
          ],
        })
      );

      // delete
      await page.keyboard.press("Backspace");

      const value = await getText(editable);
      expect(value).toEqual([""]);
      expect(await getSelection(editable)).toEqual(createSelection());
    });
  });

  test.describe("Delete", () => {
    test("delete char", async ({ page }) => {
      await page.goto(storyUrl("basics-plain--multiline"));

      const editable = await getEditable(page);
      const initialValue = await getText(editable);

      await editable.focus();

      expect(await getSelection(editable)).toEqual(createSelection());

      // Move caret
      await loop(2, () => page.keyboard.press("ArrowRight"));
      expect(await getSelection(editable)).toEqual(
        createSelection({ offset: 2 })
      );

      // delete
      await page.keyboard.press("Delete");

      const value = await getText(editable);
      expect(value).toEqual(deleteAt(initialValue, 1, [0, 2]));
      expect(await getSelection(editable)).toEqual(
        createSelection({ offset: 2 })
      );
    });

    test("delete chars", async ({ page }) => {
      await page.goto(storyUrl("basics-plain--multiline"));

      const editable = await getEditable(page);
      const initialValue = await getText(editable);

      await editable.focus();

      expect(await getSelection(editable)).toEqual(createSelection());

      // Move caret
      await page.keyboard.press("ArrowRight");
      expect(await getSelection(editable)).toEqual(
        createSelection({ offset: 1 })
      );
      // Expand selection
      const selLength = 3;
      for (let i = 1; i <= selLength; i++) {
        await page.keyboard.press("Shift+ArrowRight");
      }
      expect(await getSelection(editable)).toEqual(
        createSelection({ offset: 1, extent: selLength })
      );

      // delete
      await page.keyboard.press("Delete");

      const value = await getText(editable);
      expect(value).toEqual(deleteAt(initialValue, selLength, [0, 1]));
      expect(await getSelection(editable)).toEqual(
        createSelection({ offset: 1 })
      );
    });

    test("delete linebreak", async ({ page }) => {
      await page.goto(storyUrl("basics-plain--multiline"));

      const editable = await getEditable(page);
      const initialValue = await getText(editable);

      await editable.focus();

      expect(await getSelection(editable)).toEqual(createSelection());

      // Move caret
      const len = 1;
      await loop(len, () => page.keyboard.press("ArrowRight"));
      expect(await getSelection(editable)).toEqual(
        createSelection({ offset: len })
      );
      // Expand selection
      await page.keyboard.press("Shift+ArrowDown");
      expect(await getSelection(editable)).toEqual(
        createSelection({ anchor: [0, len], focus: [1, len] })
      );

      // delete
      await page.keyboard.press("Delete");

      const value = await getText(editable);
      expect(value).toEqual([
        initialValue[0].slice(0, len) + initialValue[1].slice(len),
        ...initialValue.slice(2),
      ]);
      expect(await getSelection(editable)).toEqual(
        createSelection({ offset: len })
      );
    });

    test("delete all", async ({ page }) => {
      await page.goto(storyUrl("basics-plain--multiline"));

      const editable = await getEditable(page);
      const initialValue = await getText(editable);

      await editable.focus();

      expect(await getSelection(editable)).toEqual(createSelection());

      // Select All
      await page.keyboard.press(`ControlOrMeta+A`);
      expect(await getSelection(editable)).toEqual(
        createSelection({
          anchor: [0, 0],
          focus: [
            initialValue.length - 1,
            initialValue[initialValue.length - 1].length,
          ],
        })
      );

      // delete
      await page.keyboard.press("Delete");

      const value = await getText(editable);
      expect(value).toEqual([""]);
      expect(await getSelection(editable)).toEqual(createSelection());
    });
  });
});

test.describe("Cut", () => {
  test("noop (collapsed selection)", async ({ page }) => {
    await page.goto(storyUrl("basics-plain--multiline"));

    const editable = await getEditable(page);
    const initialValue = await getText(editable);

    await editable.focus();

    expect(await getSelection(editable)).toEqual(createSelection());

    // Move caret
    await loop(2, () => page.keyboard.press("ArrowRight"));
    expect(await getSelection(editable)).toEqual(
      createSelection({ offset: 2 })
    );

    // cut
    await page.keyboard.press("ControlOrMeta+X");

    const value = await getText(editable);
    expect(value).toEqual(initialValue);
    expect(await getSelection(editable)).toEqual(
      createSelection({ offset: 2 })
    );
  });

  test("cut chars", async ({ page }) => {
    await page.goto(storyUrl("basics-plain--multiline"));

    const editable = await getEditable(page);
    const initialValue = await getText(editable);

    await editable.focus();

    expect(await getSelection(editable)).toEqual(createSelection());

    // Move caret
    await page.keyboard.press("ArrowRight");
    expect(await getSelection(editable)).toEqual(
      createSelection({ offset: 1 })
    );
    // Expand selection
    const selLength = 3;
    for (let i = 1; i <= selLength; i++) {
      await page.keyboard.press("Shift+ArrowRight");
    }
    expect(await getSelection(editable)).toEqual(
      createSelection({ offset: 1, extent: selLength })
    );

    // cut
    await page.keyboard.press("ControlOrMeta+X");

    const value = await getText(editable);
    expect(value).toEqual(deleteAt(initialValue, selLength, [0, 1]));
    expect(await getSelection(editable)).toEqual(
      createSelection({ offset: 1 })
    );
  });

  test("cut linebreak", async ({ page }) => {
    await page.goto(storyUrl("basics-plain--multiline"));

    const editable = await getEditable(page);
    const initialValue = await getText(editable);

    await editable.focus();

    expect(await getSelection(editable)).toEqual(createSelection());

    // Move caret
    const len = 1;
    await loop(len, () => page.keyboard.press("ArrowRight"));
    expect(await getSelection(editable)).toEqual(
      createSelection({ offset: len })
    );
    // Expand selection
    await page.keyboard.press("Shift+ArrowDown");
    expect(await getSelection(editable)).toEqual(
      createSelection({ anchor: [0, len], focus: [1, len] })
    );

    // cut
    await page.keyboard.press("ControlOrMeta+X");

    const value = await getText(editable);
    expect(value).toEqual([
      initialValue[0].slice(0, len) + initialValue[1].slice(len),
      ...initialValue.slice(2),
    ]);
    expect(await getSelection(editable)).toEqual(
      createSelection({ offset: len })
    );
  });

  test("cut all", async ({ page }) => {
    await page.goto(storyUrl("basics-plain--multiline"));

    const editable = await getEditable(page);
    const initialValue = await getText(editable);

    await editable.focus();

    expect(await getSelection(editable)).toEqual(createSelection());

    // Select All
    await page.keyboard.press(`ControlOrMeta+A`);
    expect(await getSelection(editable)).toEqual(
      createSelection({
        anchor: [0, 0],
        focus: [
          initialValue.length - 1,
          initialValue[initialValue.length - 1].length,
        ],
      })
    );

    // cut
    await page.keyboard.press("ControlOrMeta+X");

    const value = await getText(editable);
    expect(value).toEqual([""]);
    expect(await getSelection(editable)).toEqual(createSelection());
  });
});

test.describe("Copy", () => {
  test.beforeEach(async ({ context, browserName }) => {
    // https://github.com/microsoft/playwright/issues/13037#issuecomment-1078208810
    test.skip(browserName !== "chromium");
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  });

  const readClipboard = async (
    page: Page,
    type: "text/plain" | "text/html"
  ): Promise<string> => {
    return page.evaluate(async (t) => {
      const contents = await navigator.clipboard.read();
      for (const item of contents) {
        if (item.types.includes(t)) {
          const blob = await item.getType(t);
          return await blob.text();
        }
      }
      throw new Error(`${t} is not found`);
    }, type);
  };

  test("copy all", async ({ page }) => {
    await page.goto(storyUrl("basics-plain--multiline"));

    const editable = await getEditable(page);
    const initialValue = await getText(editable);

    await editable.focus();

    expect(await getSelection(editable)).toEqual(createSelection());

    await page.keyboard.press("ControlOrMeta+A");
    await page.keyboard.press("ControlOrMeta+C");

    expect(await readClipboard(page, "text/plain")).toEqual(
      initialValue.join("\n")
    );
    expect(await readClipboard(page, "text/html")).toEqual(
      await editable.evaluate((e) => e.innerHTML)
    );
  });
});

test.describe("Paste", () => {
  test.beforeEach(async ({ context, browserName }) => {
    // https://github.com/microsoft/playwright/issues/13037#issuecomment-1078208810
    test.skip(browserName !== "chromium");
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  });

  const writeText = async (page: Page, value: string) => {
    await page.evaluate((t) => navigator.clipboard.writeText(t), value);
  };

  test.describe("multiline", () => {
    test("paste text", async ({ page }) => {
      await page.goto(storyUrl("basics-plain--multiline"));

      const editable = await getEditable(page);
      const initialValue = await getText(editable);

      await editable.focus();

      expect(await getSelection(editable)).toEqual(createSelection());

      // Move caret
      await loop(2, () => page.keyboard.press("ArrowRight"));
      expect(await getSelection(editable)).toEqual(
        createSelection({ offset: 2 })
      );

      // paste
      const pastedText = "Paste text.";
      await writeText(page, pastedText);
      await page.keyboard.press("ControlOrMeta+V");

      const charLength = pastedText.length;
      const value = await getText(editable);
      expect(value).toEqual(insertAt(initialValue, pastedText, [0, 2]));
      expect(await getSelection(editable)).toEqual(
        createSelection({ offset: 2 + charLength })
      );
    });

    test("paste linebreak", async ({ page }) => {
      await page.goto(storyUrl("basics-plain--multiline"));

      const editable = await getEditable(page);
      const initialValue = await getText(editable);

      await editable.focus();

      expect(await getSelection(editable)).toEqual(createSelection());

      // Move caret
      await loop(2, () => page.keyboard.press("ArrowRight"));
      expect(await getSelection(editable)).toEqual(
        createSelection({ offset: 2 })
      );

      // paste
      const pastedText = "Paste \ntext.";
      await writeText(page, pastedText);
      await page.keyboard.press("ControlOrMeta+V");

      const [beforeLineBreak, afterLineBreak] = pastedText.split("\n");
      const value = await getText(editable);
      expect(value).toEqual(
        insertLineBreakAt(
          insertAt(initialValue, beforeLineBreak + afterLineBreak, [0, 2]),
          [0, 2 + beforeLineBreak.length]
        )
      );
      expect(await getSelection(editable)).toEqual(
        createSelection({ line: 1, offset: afterLineBreak.length })
      );
    });
  });

  test.describe("singleline", () => {
    test("paste text", async ({ page }) => {
      await page.goto(storyUrl("basics-plain--singleline"));

      const editable = await getEditable(page);
      const initialValue = await getText(editable);

      await editable.focus();

      expect(await getSelection(editable)).toEqual(createSelection());

      // Move caret
      await loop(2, () => page.keyboard.press("ArrowRight"));
      expect(await getSelection(editable)).toEqual(
        createSelection({ offset: 2 })
      );

      // paste
      const pastedText = "Paste text.";
      await writeText(page, pastedText);
      await page.keyboard.press("ControlOrMeta+V");

      const charLength = pastedText.length;
      const value = await getText(editable);
      expect(value).toEqual(insertAt(initialValue, pastedText, [0, 2]));
      expect(await getSelection(editable)).toEqual(
        createSelection({ offset: 2 + charLength })
      );
    });

    test("paste linebreak", async ({ page }) => {
      await page.goto(storyUrl("basics-plain--singleline"));

      const editable = await getEditable(page);
      const initialValue = await getText(editable);

      await editable.focus();

      expect(await getSelection(editable)).toEqual(createSelection());

      // Move caret
      await loop(2, () => page.keyboard.press("ArrowRight"));
      expect(await getSelection(editable)).toEqual(
        createSelection({ offset: 2 })
      );

      // paste
      const pastedText = "Paste \ntext.";
      await writeText(page, pastedText);
      await page.keyboard.press("ControlOrMeta+V");

      const pastedTextWithoutLinebreak = pastedText.split("\n").join("");
      const charLength = pastedTextWithoutLinebreak.length;
      const value = await getText(editable);
      expect(value).toEqual(
        insertAt(initialValue, pastedTextWithoutLinebreak, [0, 2])
      );
      expect(await getSelection(editable)).toEqual(
        createSelection({ offset: 2 + charLength })
      );
    });
  });

  test.describe("html paste", () => {
    const writeHTML = async (page: Page, value: string) => {
      await page.evaluate(
        (t) =>
          navigator.clipboard.write([
            new ClipboardItem({
              "text/html": new Blob([t], { type: "text/html" }),
            }),
          ]),
        value
      );
    };

    test("single paragraph root", async ({ page }) => {
      await page.goto(storyUrl("basics-plain--multiline"));

      const editable = await getEditable(page);

      await editable.focus();

      const plain = `
export const editable = (
  element: HTMLElement,
  { readonly, nodes, onChange }: EditableOptions`;
      const html = `<meta charset='utf-8'><div><br><div><span>export</span><span> </span><span>const</span><span> </span><span>editable</span><span> </span><span>=</span><span> (</span></div><div><span>  </span><span>element</span><span>:</span><span> </span><span>HTMLElement</span><span>,</span></div><div><span>  { </span><span>readonly</span><span>, </span><span>nodes</span><span>, </span><span>onChange</span><span> }</span><span>:</span><span> </span><span>EditableOptions</span></div></div>`;

      await writeHTML(page, html);

      // Delete all
      await page.keyboard.press(`ControlOrMeta+A`);
      await page.keyboard.press(`Backspace`);

      await page.keyboard.press(`ControlOrMeta+V`);
      expect((await getText(editable)).join("\n")).toEqual(plain);
    });

    test("multi paragraph root", async ({ page }) => {
      await page.goto(storyUrl("basics-plain--multiline"));

      const editable = await getEditable(page);

      await editable.focus();

      const plain = `#17
#6`;
      const html = `<meta charset='utf-8'><p>#17</p><p>#6</p>`;

      await writeHTML(page, html);

      // Delete all
      await page.keyboard.press(`ControlOrMeta+A`);
      await page.keyboard.press(`Backspace`);

      await page.keyboard.press(`ControlOrMeta+V`);
      expect((await getText(editable)).join("\n")).toEqual(plain);
    });

    test("single inline root", async ({ page }) => {
      await page.goto(storyUrl("basics-plain--multiline"));

      const editable = await getEditable(page);

      await editable.focus();

      const plain = `#17
#6`;
      const html = `<meta charset='utf-8'><span>#17<br ><em>#6</em></span>`;
      await writeHTML(page, html);

      // Delete all
      await page.keyboard.press(`ControlOrMeta+A`);
      await page.keyboard.press(`Backspace`);

      await page.keyboard.press(`ControlOrMeta+V`);
      expect((await getText(editable)).join("\n")).toEqual(plain);
    });

    test("multi inline root", async ({ page }) => {
      await page.goto(storyUrl("basics-plain--multiline"));

      const editable = await getEditable(page);

      await editable.focus();

      const plain = `#17
#6`;
      const html = `<meta charset='utf-8'><a>#17</a><br ><a>#6</a>`;
      await writeHTML(page, html);

      // Delete all
      await page.keyboard.press(`ControlOrMeta+A`);
      await page.keyboard.press(`Backspace`);

      await page.keyboard.press(`ControlOrMeta+V`);
      expect((await getText(editable)).join("\n")).toEqual(plain);
    });

    test("table root", async ({ page }) => {
      await page.goto(storyUrl("basics-plain--multiline"));

      const editable = await getEditable(page);

      await editable.focus();

      const plain = `    const html = clipboardData.getData("text/html");
    if (html) {`;
      const html = `<meta charset='utf-8'><table><tbody><tr><td><span>    <span>const</span> <span>html</span> <span>=</span> <span>clipboardData</span><span>.</span><span>getData</span><span>(</span><span>"text/html"</span><span>)</span><span>;</span></span></td></tr><tr><td></td><td></td><td><button><svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16"><path></path></svg></button><span>    <span>if</span> <span>(</span><span>html</span><span>)</span> <span>{</span></span></td></tr></tbody></table>`;
      await writeHTML(page, html);

      // Delete all
      await page.keyboard.press(`ControlOrMeta+A`);
      await page.keyboard.press(`Backspace`);

      await page.keyboard.press(`ControlOrMeta+V`);
      expect((await getText(editable)).join("\n")).toEqual(plain);
    });
  });
});

test.describe("undo and redo", () => {
  test("one char", async ({ page }) => {
    await page.goto(storyUrl("basics-plain--multiline"));

    const editable = await getEditable(page);
    const initialValue = await getText(editable);

    await editable.focus();

    expect(await getSelection(editable)).toEqual(createSelection());

    const text = "z";
    await input(editable, text);
    const value = await getText(editable);
    expect(value).toEqual(insertAt(initialValue, text, [0, 0]));

    // undo
    await page.keyboard.press(`ControlOrMeta+Z`);
    expect(await getText(editable)).toEqual(initialValue);

    // redo
    await page.keyboard.press(`ControlOrMeta+Shift+Z`);
    expect(value).toEqual(insertAt(initialValue, text, [0, 0]));
  });
});

test("rtl", async ({ page }) => {
  await page.goto(storyUrl("basics-plain--rtl"));

  const editable = await getEditable(page);
  const initialValue = await getText(editable);

  await editable.focus();

  expect(await getSelection(editable)).toEqual(createSelection());

  // Move caret
  await page.keyboard.press("ArrowLeft");
  expect(await getSelection(editable)).toEqual(createSelection({ offset: 1 }));

  {
    // Input
    const text = "test";
    await input(editable, text);
    const value = await getText(editable);
    const textLength = text.length;
    expect(value).toEqual(insertAt(initialValue, text, [0, 1]));
    expect(await getSelection(editable)).toEqual(
      createSelection({ offset: 1 + textLength })
    );
  }
});

test("readonly", async ({ page, browserName }) => {
  await page.goto(storyUrl("basics-plain--readonly"));

  const editable = await getEditable(page);
  const initialValue = await getText(editable);

  // Enable readonly mode
  await page.getByRole("button").click();

  await editable.focus();

  expect(await getSelection(editable)).toEqual(createSelection());

  // Move caret
  await page.keyboard.press("ArrowRight");
  expect(await getSelection(editable)).toEqual(createSelection({ offset: 1 }));

  {
    // Input should be ignored
    const text = "test";
    await input(editable, text);
    const value = await getText(editable);
    expect(value).toEqual(initialValue);
    expect(await getSelection(editable)).toEqual(
      createSelection({ offset: 1 })
    );
  }

  if (browserName === "chromium") {
    // IME input should be ignored
    const client = await page.context().newCDPSession(page);
    await client.send("Input.imeSetComposition", {
      selectionStart: -1,
      selectionEnd: -1,
      text: "😂😂",
    });
    await client.send("Input.imeSetComposition", {
      selectionStart: 1,
      selectionEnd: 2,
      text: "😭",
    });
    await client.send("Input.insertText", {
      text: "😂😭",
    });
    const value = await getText(editable);
    expect(value).toEqual(initialValue);
    expect(await getSelection(editable)).toEqual(
      createSelection({ offset: 1 })
    );
  }
});

test("placeholder", async ({ page }) => {
  await page.goto(storyUrl("basics-plain--placeholder"));

  const editable = await getEditable(page);
  const initialValue = await getText(editable);

  await editable.focus();

  // const getPlaceholder = () =>
  //   editable.evaluate((e) => {
  //     return window.getComputedStyle(e, "before").getPropertyValue("content");
  //   });

  expect(initialValue).toEqual([""]);
  expect(await getSelection(editable)).toEqual(createSelection());
  // expect((await getPlaceholder()).includes("Enter some text...")).toBe(true);

  // Input
  const char = "a";
  await input(editable, char);

  const value1 = await getText(editable);
  expect(value1).toEqual(insertAt(initialValue, char, [0, 0]));
  expect(await getSelection(editable)).toEqual(createSelection({ offset: 1 }));
  // expect((await getPlaceholder()).includes("Enter some text...")).toBe(false);

  await page.keyboard.press("Backspace");
  const value2 = await getText(editable);
  expect(value2).toEqual([""]);
  expect(await getSelection(editable)).toEqual(createSelection());
  // expect((await getPlaceholder()).includes("Enter some text...")).toBe(true);
});

test.describe("keep state on render", () => {
  test("sync", async ({ page }) => {
    await page.goto(storyUrl("basics-plain--highlight"));

    const editable = await getEditable(page);
    const initialValue = await getText(editable);

    await editable.focus();

    expect(await getSelection(editable)).toEqual(createSelection());

    const searchInput = page.getByRole("textbox").first();
    const searchValue = await searchInput.inputValue();
    const searchValueLength = searchValue.length;
    expect(searchValueLength).toBeGreaterThan(1);

    const markedOffset = initialValue[0].indexOf(searchValue);
    const char = "a";

    // type just before node
    await loop(markedOffset, () => page.keyboard.press("ArrowRight"));
    expect(await getSelection(editable)).toEqual(
      createSelection({ offset: markedOffset })
    );
    {
      // insert
      await input(editable, char);

      const value = await getText(editable);
      expect(value).toEqual(insertAt(initialValue, char, [0, markedOffset]));
      expect(await getSelection(editable)).toEqual(
        createSelection({ offset: markedOffset + 1 })
      );
    }
    {
      // delete
      await page.keyboard.press("Backspace");
      const value = await getText(editable);
      expect(value).toEqual(initialValue);
      expect(await getSelection(editable)).toEqual(
        createSelection({ offset: markedOffset })
      );
    }

    // type on node
    await page.keyboard.press("ArrowRight");
    expect(await getSelection(editable)).toEqual(
      createSelection({ offset: markedOffset + 1 })
    );
    {
      // insert
      await input(editable, char);

      const value = await getText(editable);
      expect(value).toEqual(
        insertAt(initialValue, char, [0, markedOffset + 1])
      );
      expect(await getSelection(editable)).toEqual(
        createSelection({ offset: markedOffset + 2 })
      );
    }
    {
      // delete
      await page.keyboard.press("Backspace");
      const value = await getText(editable);
      expect(value).toEqual(initialValue);
      expect(await getSelection(editable)).toEqual(
        createSelection({ offset: markedOffset + 1 })
      );
    }

    // type just after node
    await loop(searchValueLength - 1, () => page.keyboard.press("ArrowRight"));
    expect(await getSelection(editable)).toEqual(
      createSelection({ offset: markedOffset + searchValueLength })
    );
    {
      // insert
      await input(editable, char);

      const value = await getText(editable);
      expect(value).toEqual(
        insertAt(initialValue, char, [0, markedOffset + searchValueLength])
      );
      expect(await getSelection(editable)).toEqual(
        createSelection({ offset: markedOffset + searchValueLength + 1 })
      );
    }
    {
      // delete
      await page.keyboard.press("Backspace");
      const value = await getText(editable);
      expect(value).toEqual(initialValue);
      expect(await getSelection(editable)).toEqual(
        createSelection({ offset: markedOffset + searchValueLength })
      );
    }
  });

  test("async", async ({ page }) => {
    await page.goto(storyUrl("advanced-with-textlint--with-textlint"));

    const editable = await getEditable(page);
    const initialValue = await getText(editable);

    await editable.focus();

    expect(await getSelection(editable)).toEqual(createSelection());

    const markedOffset = await editable.evaluate((e) => {
      const marks = e.querySelectorAll('span[style*="text-decoration"]');
      if (marks.length < 2) throw new Error();
      const secondMark = marks[1];
      if (
        e.firstChild !== secondMark.parentNode ||
        secondMark.textContent!.length !== 1
      )
        throw new Error();
      let offset = 0;
      let n: Node = secondMark;
      while ((n = n.previousSibling!)) {
        offset += n.textContent!.length;
      }
      return offset;
    });
    const char = "a";

    // type just before node
    await loop(markedOffset, () => page.keyboard.press("ArrowRight"));
    expect(await getSelection(editable)).toEqual(
      createSelection({ offset: markedOffset })
    );
    {
      // insert
      await input(editable, char);

      const value = await getText(editable);
      expect(value).toEqual(insertAt(initialValue, char, [0, markedOffset]));
      expect(await getSelection(editable)).toEqual(
        createSelection({ offset: markedOffset + 1 })
      );
    }
    {
      // delete
      await page.keyboard.press("Backspace");
      const value = await getText(editable);
      expect(value).toEqual(initialValue);
      expect(await getSelection(editable)).toEqual(
        createSelection({ offset: markedOffset })
      );
    }

    // type just after node
    await page.keyboard.press("ArrowRight");
    expect(await getSelection(editable)).toEqual(
      createSelection({ offset: markedOffset + 1 })
    );
    {
      // insert
      await input(editable, char);

      const value = await getText(editable);
      expect(value).toEqual(
        insertAt(initialValue, char, [0, markedOffset + 1])
      );
      expect(await getSelection(editable)).toEqual(
        createSelection({ offset: markedOffset + 2 })
      );
    }
    {
      // delete
      await page.keyboard.press("Backspace");
      const value = await getText(editable);
      expect(value).toEqual(initialValue);
      expect(await getSelection(editable)).toEqual(
        createSelection({ offset: markedOffset + 1 })
      );
    }
  });
});

test("new window", async ({ page, context }) => {
  await page.goto(storyUrl("advanced-newwindow--default"));

  // open new window
  const newPagePromise = context.waitForEvent("page");
  await page.getByRole("button", { name: "open window" }).click();
  const newPage = await newPagePromise;

  const editable = await getEditable(newPage);
  const initialValue = await getText(editable);

  await editable.focus();

  expect(await getSelection(editable)).toEqual(createSelection());

  // Move caret
  await newPage.keyboard.press("ArrowRight");
  expect(await getSelection(editable)).toEqual(createSelection({ offset: 1 }));

  // Input
  const text = "test";
  await input(editable, text);
  const value = await getText(editable);
  expect(value).toEqual(insertAt(initialValue, text, [0, 1]));
  const textLength = text.length;
  expect(await getSelection(editable)).toEqual(
    createSelection({ offset: 1 + textLength })
  );
});
