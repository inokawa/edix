import { test, expect, Page } from "@playwright/test";
import { createSelection, getSelection, getText } from "./edix";
import {
  deleteAt,
  getEditable,
  input,
  insertAt,
  loop,
  storyUrl,
} from "./utils";

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
      expect(value).toEqual(
        initialValue.map((r, i) => (i === 0 ? insertAt(r, 0, text) : r))
      );
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
      expect(value).toEqual(
        initialValue.map((r, i) => (i === 0 ? insertAt(r, 1, text) : r))
      );
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
      expect(value).toEqual(
        initialValue.map((r, i) => (i == 1 ? insertAt(r, 1, text) : r))
      );
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
      expect(value).toEqual(
        initialValue.map((r, i) => (i === 0 ? insertAt(r, 0, "😂😭") : r))
      );
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
      expect(value).toEqual(
        initialValue.map((r, i) => (i === 0 ? insertAt(r, 0, text) : r))
      );
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
      expect(value).toEqual(
        initialValue.map((r, i) => (i === 0 ? insertAt(r, 1, text) : r))
      );
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
      expect(value).toEqual(
        initialValue.map((r, i) => (i === 0 ? insertAt(r, 0, "😂😭") : r))
      );
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
      initialValue.map((r, i) =>
        i === 0 ? insertAt(deleteAt(r, 1, selLength), 1, char) : r
      )
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
      createSelection({ start: [0, len], end: [1, len] })
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
        start: [0, 0],
        end: [
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
        expect(value).toEqual(
          initialValue.flatMap((r, i) =>
            i === 0 ? [r.slice(0, 2), r.slice(2)] : r
          )
        );
        expect(await getSelection(editable)).toEqual(
          createSelection({ line: 1 })
        );
      }

      // Press enter again
      await page.keyboard.press("Enter");

      {
        const value = await getText(editable);
        expect(value).toEqual(
          initialValue.flatMap((r, i) =>
            i === 0 ? [r.slice(0, 2), "", r.slice(2)] : r
          )
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
      expect(value).toEqual(
        initialValue.map((r, i) => (i === 0 ? deleteAt(r, 1, 1) : r))
      );
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
      expect(value).toEqual(
        initialValue.map((r, i) => (i === 0 ? deleteAt(r, 1, selLength) : r))
      );
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
        createSelection({ start: [0, len], end: [1, len] })
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
          start: [0, 0],
          end: [
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
      expect(value).toEqual(
        initialValue.map((r, i) => (i === 0 ? deleteAt(r, 2, 1) : r))
      );
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
      expect(value).toEqual(
        initialValue.map((r, i) => (i === 0 ? deleteAt(r, 1, selLength) : r))
      );
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
        createSelection({ start: [0, len], end: [1, len] })
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
          start: [0, 0],
          end: [
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
    expect(value).toEqual(
      initialValue.map((r, i) => (i === 0 ? deleteAt(r, 1, selLength) : r))
    );
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
      createSelection({ start: [0, len], end: [1, len] })
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
        start: [0, 0],
        end: [
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

test.describe("Paste", () => {
  test.beforeEach(async ({ context, browserName }) => {
    // https://github.com/microsoft/playwright/issues/13037#issuecomment-1078208810
    test.skip(browserName !== "chromium");
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  });

  const writeClipboard = async (page: Page, value: string) => {
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
      await writeClipboard(page, pastedText);
      await page.keyboard.press("ControlOrMeta+V");

      const charLength = pastedText.length;
      const value = await getText(editable);
      expect(value).toEqual(
        initialValue.map((r, i) => (i === 0 ? insertAt(r, 2, pastedText) : r))
      );
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
      await writeClipboard(page, pastedText);
      await page.keyboard.press("ControlOrMeta+V");

      const beforeLineBreakText = pastedText.split("\n")[0];
      const afterLineBreakText = pastedText.split("\n")[1];
      const afterLineBreakLength = afterLineBreakText.length;
      const value = await getText(editable);
      expect(value).toEqual(
        initialValue.flatMap((r, i) =>
          i === 0
            ? [
                r.slice(0, 2) + beforeLineBreakText,
                afterLineBreakText + r.slice(2),
              ]
            : r
        )
      );
      expect(await getSelection(editable)).toEqual(
        createSelection({ line: 1, offset: afterLineBreakLength })
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
      await writeClipboard(page, pastedText);
      await page.keyboard.press("ControlOrMeta+V");

      const charLength = pastedText.length;
      const value = await getText(editable);
      expect(value).toEqual(
        initialValue.map((r, i) => (i === 0 ? insertAt(r, 2, pastedText) : r))
      );
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
      await writeClipboard(page, pastedText);
      await page.keyboard.press("ControlOrMeta+V");

      const pastedTextWithoutLinebreak = pastedText.split("\n").join("");
      const charLength = pastedTextWithoutLinebreak.length;
      const value = await getText(editable);
      expect(value).toEqual(
        initialValue.map((r, i) =>
          i === 0 ? insertAt(r, 2, pastedTextWithoutLinebreak) : r
        )
      );
      expect(await getSelection(editable)).toEqual(
        createSelection({ offset: 2 + charLength })
      );
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
    expect(value).toEqual(
      initialValue.map((r, i) => (i === 0 ? insertAt(r, 0, text) : r))
    );

    // undo
    await page.keyboard.press(`ControlOrMeta+Z`);
    expect(await getText(editable)).toEqual(initialValue);

    // redo
    await page.keyboard.press(`ControlOrMeta+Shift+Z`);
    expect(value).toEqual(
      initialValue.map((r, i) => (i === 0 ? insertAt(r, 0, text) : r))
    );
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
    expect(value).toEqual(
      initialValue.map((r, i) => (i === 0 ? insertAt(r, 1, text) : r))
    );
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
  expect(value).toEqual(
    initialValue.map((r, i) => (i === 0 ? insertAt(r, 1, text) : r))
  );
  const textLength = text.length;
  expect(await getSelection(editable)).toEqual(
    createSelection({ offset: 1 + textLength })
  );
});
