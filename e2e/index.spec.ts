import { test, expect, Page, Locator } from "@playwright/test";
import * as esbuild from "esbuild";
import * as path from "node:path";

declare global {
  interface Window {
    edix: typeof import("../src/core/dom.ts");
  }
}

const edixDom = esbuild
  .build({
    entryPoints: [path.join(__dirname, "../src/core/dom.ts")],
    bundle: true,
    write: false,
    format: "iife",
    globalName: "edix",
  })
  .then((r) => r.outputFiles[0].text);

test.beforeEach(async ({ context }) => {
  await context.addInitScript(`
${await edixDom}
window.edix = edix;
`);
});

const storyUrl = (id: string) =>
  `http://localhost:6006/iframe.html?id=${id}&viewMode=story`;

const getEditable = async (page: Page) => {
  const editable = page.locator('[contenteditable="true"]');
  await editable.waitFor();
  return editable;
};

const getText = async (editable: Locator): Promise<string[]> => {
  return editable.evaluate((element) => {
    return window.edix
      .serializeDOM(
        element.ownerDocument,
        element as HTMLElement,
        () => undefined // TODO
      )
      .split("\n");
  });
};

const getSelectionRange = (editable: Locator) => {
  return editable.evaluate((element) => {
    return window.edix.getSelectionSnapshot(
      element.ownerDocument,
      element as HTMLElement,
      () => false // TODO
    );
  });
};

const deleteAt = (str: string, index: number, length: number): string => {
  return str.slice(0, index) + str.slice(index + length);
};
const insertAt = (str: string, index: number, value: string): string => {
  return str.slice(0, index) + value + str.slice(index);
};

const input = async (editable: Locator, text: string) => {
  for (const t of text.split("")) {
    // playwright doesn't fire beforeinput event on press
    await editable.evaluate((e, t) => {
      e.dispatchEvent(
        new InputEvent("beforeinput", {
          data: t,
          bubbles: true,
          cancelable: true,
          inputType: "insertText",
        })
      );
    }, t);
    await editable.press(t);
  }
};

const keypress = async (page: Page, key: string, count: number = 1) => {
  for (let i = 1; i <= count; i++) {
    await page.keyboard.press(key);
  }
};

test.describe("type word", () => {
  test("on origin", async ({ page }) => {
    await page.goto(storyUrl("basics-editable--text"));

    const editable = await getEditable(page);
    const initialValue = await getText(editable);

    await editable.focus();

    expect(await getSelectionRange(editable)).toEqual({
      start: [0, 0],
      end: [0, 0],
      backward: false,
    });

    // Input
    const text = "test";
    await input(editable, text);
    const value = await getText(editable);
    expect(value).toEqual(
      initialValue.map((r, i) => (i === 0 ? insertAt(r, 0, text) : r))
    );
    const textLength = text.length;
    expect(await getSelectionRange(editable)).toEqual({
      start: [0, 0 + textLength],
      end: [0, 0 + textLength],
      backward: false,
    });
  });

  test("on 1st row", async ({ page }) => {
    await page.goto(storyUrl("basics-editable--text"));

    const editable = await getEditable(page);
    const initialValue = await getText(editable);

    await editable.focus();

    expect(await getSelectionRange(editable)).toEqual({
      start: [0, 0],
      end: [0, 0],
      backward: false,
    });

    // Move caret
    await page.keyboard.press("ArrowRight");
    expect(await getSelectionRange(editable)).toEqual({
      start: [0, 1],
      end: [0, 1],
      backward: false,
    });

    // Input
    const text = "test";
    await input(editable, text);
    const value = await getText(editable);
    expect(value).toEqual(
      initialValue.map((r, i) => (i === 0 ? insertAt(r, 1, text) : r))
    );
    const textLength = text.length;
    expect(await getSelectionRange(editable)).toEqual({
      start: [0, 1 + textLength],
      end: [0, 1 + textLength],
      backward: false,
    });
  });

  test("on 2nd row", async ({ page }) => {
    await page.goto(storyUrl("basics-editable--text"));

    const editable = await getEditable(page);
    const initialValue = await getText(editable);

    await editable.focus();

    expect(await getSelectionRange(editable)).toEqual({
      start: [0, 0],
      end: [0, 0],
      backward: false,
    });

    // Move caret
    await page.keyboard.press("ArrowRight");
    await page.keyboard.press("ArrowDown");
    expect(await getSelectionRange(editable)).toEqual({
      start: [1, 1],
      end: [1, 1],
      backward: false,
    });

    // Input
    const text = "test";
    await input(editable, text);
    const value = await getText(editable);
    expect(value).toEqual(
      initialValue.map((r, i) => (i == 1 ? insertAt(r, 1, text) : r))
    );
    const textLength = text.length;
    expect(await getSelectionRange(editable)).toEqual({
      start: [1, 1 + textLength],
      end: [1, 1 + textLength],
      backward: false,
    });
  });

  test("with IME", async ({ browserName, page }) => {
    test.skip(browserName !== "chromium");

    await page.goto(storyUrl("basics-editable--text"));

    const editable = await getEditable(page);
    const initialValue = await getText(editable);

    await editable.focus();

    expect(await getSelectionRange(editable)).toEqual({
      start: [0, 0],
      end: [0, 0],
      backward: false,
    });

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
    expect(await getSelectionRange(editable)).toEqual({
      start: [0, 0 + textLength],
      end: [0, 0 + textLength],
      backward: false,
    });
  });
});

test.describe("replace range", () => {
  test("replace chars", async ({ page }) => {
    await page.goto(storyUrl("basics-editable--text"));

    const editable = await getEditable(page);
    const initialValue = await getText(editable);

    await editable.focus();

    expect(await getSelectionRange(editable)).toEqual({
      start: [0, 0],
      end: [0, 0],
      backward: false,
    });

    // Move caret
    await page.keyboard.press("ArrowRight");
    expect(await getSelectionRange(editable)).toEqual({
      start: [0, 1],
      end: [0, 1],
      backward: false,
    });
    // Expand selection
    const selLength = 3;
    await keypress(page, "Shift+ArrowRight", selLength);
    expect(await getSelectionRange(editable)).toEqual({
      start: [0, 1],
      end: [0, 1 + selLength],
      backward: false,
    });

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
    expect(await getSelectionRange(editable)).toEqual({
      start: [0, 1 + charLength],
      end: [0, 1 + charLength],
      backward: false,
    });
  });

  test("replace linebreak", async ({ page }) => {
    await page.goto(storyUrl("basics-editable--text"));

    const editable = await getEditable(page);
    const initialValue = await getText(editable);

    await editable.focus();

    expect(await getSelectionRange(editable)).toEqual({
      start: [0, 0],
      end: [0, 0],
      backward: false,
    });

    // Move caret
    const len = 1;
    await keypress(page, "ArrowRight", len);
    expect(await getSelectionRange(editable)).toEqual({
      start: [0, len],
      end: [0, len],
      backward: false,
    });
    // Expand selection
    await page.keyboard.press("Shift+ArrowDown");
    expect(await getSelectionRange(editable)).toEqual({
      start: [0, len],
      end: [1, len],
      backward: false,
    });

    // Input
    const char = "a";
    const charLength = char.length;
    await input(editable, char);

    const value = await getText(editable);
    expect(value).toEqual([
      initialValue[0].slice(0, len) + char + initialValue[1].slice(len),
      ...initialValue.slice(2),
    ]);
    expect(await getSelectionRange(editable)).toEqual({
      start: [0, len + charLength],
      end: [0, len + charLength],
      backward: false,
    });
  });

  test("replace all", async ({ page }) => {
    await page.goto(storyUrl("basics-editable--text"));

    const editable = await getEditable(page);
    const initialValue = await getText(editable);

    await editable.focus();

    expect(await getSelectionRange(editable)).toEqual({
      start: [0, 0],
      end: [0, 0],
      backward: false,
    });

    // Select All
    await page.keyboard.press(`ControlOrMeta+A`);
    expect(await getSelectionRange(editable)).toEqual({
      start: [0, 0],
      end: [
        initialValue.length - 1,
        initialValue[initialValue.length - 1].length,
      ],
      backward: false,
    });

    // Input
    const char = "a";
    const charLength = char.length;
    await input(editable, char);

    const value = await getText(editable);
    expect(value).toEqual([char]);
    expect(await getSelectionRange(editable)).toEqual({
      start: [0, charLength],
      end: [0, charLength],
      backward: false,
    });
  });
});

test.describe("Keydown", () => {
  test("Arrow keys", async ({ page }) => {
    await page.goto(storyUrl("basics-editable--text"));

    const editable = await getEditable(page);

    await editable.focus();

    expect(await getSelectionRange(editable)).toEqual({
      start: [0, 0],
      end: [0, 0],
      backward: false,
    });

    await page.keyboard.press("ArrowRight");
    expect(await getSelectionRange(editable)).toEqual({
      start: [0, 1],
      end: [0, 1],
      backward: false,
    });

    await page.keyboard.press("ArrowDown");
    expect(await getSelectionRange(editable)).toEqual({
      start: [1, 1],
      end: [1, 1],
      backward: false,
    });

    await page.keyboard.press("ArrowLeft");
    expect(await getSelectionRange(editable)).toEqual({
      start: [1, 0],
      end: [1, 0],
      backward: false,
    });

    await page.keyboard.press("ArrowUp");
    expect(await getSelectionRange(editable)).toEqual({
      start: [0, 0],
      end: [0, 0],
      backward: false,
    });
  });

  test("Enter", async ({ page }) => {
    await page.goto(storyUrl("basics-editable--text"));

    const editable = await getEditable(page);
    const initialValue = await getText(editable);

    await editable.focus();

    expect(await getSelectionRange(editable)).toEqual({
      start: [0, 0],
      end: [0, 0],
      backward: false,
    });

    await keypress(page, "ArrowRight", 2);
    expect(await getSelectionRange(editable)).toEqual({
      start: [0, 2],
      end: [0, 2],
      backward: false,
    });

    // Press enter
    await page.keyboard.press("Enter");

    {
      const value = await getText(editable);
      expect(value).toEqual(
        initialValue.flatMap((r, i) =>
          i === 0 ? [r.slice(0, 2), r.slice(2)] : r
        )
      );
      expect(await getSelectionRange(editable)).toEqual({
        start: [1, 0],
        end: [1, 0],
        backward: false,
      });
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
      expect(await getSelectionRange(editable)).toEqual({
        start: [2, 0],
        end: [2, 0],
        backward: false,
      });
    }
  });

  test.describe("Backspace", () => {
    test("delete char", async ({ page }) => {
      await page.goto(storyUrl("basics-editable--text"));

      const editable = await getEditable(page);
      const initialValue = await getText(editable);

      await editable.focus();

      expect(await getSelectionRange(editable)).toEqual({
        start: [0, 0],
        end: [0, 0],
        backward: false,
      });

      // Move caret
      await keypress(page, "ArrowRight", 2);
      expect(await getSelectionRange(editable)).toEqual({
        start: [0, 2],
        end: [0, 2],
        backward: false,
      });

      // delete
      await page.keyboard.press("Backspace");

      const value = await getText(editable);
      expect(value).toEqual(
        initialValue.map((r, i) => (i === 0 ? deleteAt(r, 1, 1) : r))
      );
      expect(await getSelectionRange(editable)).toEqual({
        start: [0, 1],
        end: [0, 1],
        backward: false,
      });
    });

    test("delete chars", async ({ page }) => {
      await page.goto(storyUrl("basics-editable--text"));

      const editable = await getEditable(page);
      const initialValue = await getText(editable);

      await editable.focus();

      expect(await getSelectionRange(editable)).toEqual({
        start: [0, 0],
        end: [0, 0],
        backward: false,
      });

      // Move caret
      await page.keyboard.press("ArrowRight");
      expect(await getSelectionRange(editable)).toEqual({
        start: [0, 1],
        end: [0, 1],
        backward: false,
      });
      // Expand selection
      const selLength = 3;
      await keypress(page, "Shift+ArrowRight", selLength);
      expect(await getSelectionRange(editable)).toEqual({
        start: [0, 1],
        end: [0, 1 + selLength],
        backward: false,
      });

      // delete
      await page.keyboard.press("Backspace");

      const value = await getText(editable);
      expect(value).toEqual(
        initialValue.map((r, i) => (i === 0 ? deleteAt(r, 1, selLength) : r))
      );
      expect(await getSelectionRange(editable)).toEqual({
        start: [0, 1],
        end: [0, 1],
        backward: false,
      });
    });

    test("delete linebreak", async ({ page }) => {
      await page.goto(storyUrl("basics-editable--text"));

      const editable = await getEditable(page);
      const initialValue = await getText(editable);

      await editable.focus();

      expect(await getSelectionRange(editable)).toEqual({
        start: [0, 0],
        end: [0, 0],
        backward: false,
      });

      // Move caret
      const len = 1;
      await keypress(page, "ArrowRight", len);
      expect(await getSelectionRange(editable)).toEqual({
        start: [0, len],
        end: [0, len],
        backward: false,
      });
      // Expand selection
      await page.keyboard.press("Shift+ArrowDown");
      expect(await getSelectionRange(editable)).toEqual({
        start: [0, len],
        end: [1, len],
        backward: false,
      });

      // delete
      await page.keyboard.press("Backspace");

      const value = await getText(editable);
      expect(value).toEqual([
        initialValue[0].slice(0, len) + initialValue[1].slice(len),
        ...initialValue.slice(2),
      ]);
      expect(await getSelectionRange(editable)).toEqual({
        start: [0, len],
        end: [0, len],
        backward: false,
      });
    });

    test("delete all", async ({ page }) => {
      await page.goto(storyUrl("basics-editable--text"));

      const editable = await getEditable(page);
      const initialValue = await getText(editable);

      await editable.focus();

      expect(await getSelectionRange(editable)).toEqual({
        start: [0, 0],
        end: [0, 0],
        backward: false,
      });

      // Select All
      await page.keyboard.press(`ControlOrMeta+A`);
      expect(await getSelectionRange(editable)).toEqual({
        start: [0, 0],
        end: [
          initialValue.length - 1,
          initialValue[initialValue.length - 1].length,
        ],
        backward: false,
      });

      // delete
      await page.keyboard.press("Backspace");

      const value = await getText(editable);
      expect(value).toEqual([""]);
      expect(await getSelectionRange(editable)).toEqual({
        start: [0, 0],
        end: [0, 0],
        backward: false,
      });
    });
  });

  test.describe("Delete", () => {
    test("delete char", async ({ page }) => {
      await page.goto(storyUrl("basics-editable--text"));

      const editable = await getEditable(page);
      const initialValue = await getText(editable);

      await editable.focus();

      expect(await getSelectionRange(editable)).toEqual({
        start: [0, 0],
        end: [0, 0],
        backward: false,
      });

      // Move caret
      await keypress(page, "ArrowRight", 2);
      expect(await getSelectionRange(editable)).toEqual({
        start: [0, 2],
        end: [0, 2],
        backward: false,
      });

      // delete
      await page.keyboard.press("Delete");

      const value = await getText(editable);
      expect(value).toEqual(
        initialValue.map((r, i) => (i === 0 ? deleteAt(r, 2, 1) : r))
      );
      expect(await getSelectionRange(editable)).toEqual({
        start: [0, 2],
        end: [0, 2],
        backward: false,
      });
    });

    test("delete chars", async ({ page }) => {
      await page.goto(storyUrl("basics-editable--text"));

      const editable = await getEditable(page);
      const initialValue = await getText(editable);

      await editable.focus();

      expect(await getSelectionRange(editable)).toEqual({
        start: [0, 0],
        end: [0, 0],
        backward: false,
      });

      // Move caret
      await page.keyboard.press("ArrowRight");
      expect(await getSelectionRange(editable)).toEqual({
        start: [0, 1],
        end: [0, 1],
        backward: false,
      });
      // Expand selection
      const selLength = 3;
      for (let i = 1; i <= selLength; i++) {
        await page.keyboard.press("Shift+ArrowRight");
      }
      expect(await getSelectionRange(editable)).toEqual({
        start: [0, 1],
        end: [0, 1 + selLength],
        backward: false,
      });

      // delete
      await page.keyboard.press("Delete");

      const value = await getText(editable);
      expect(value).toEqual(
        initialValue.map((r, i) => (i === 0 ? deleteAt(r, 1, selLength) : r))
      );
      expect(await getSelectionRange(editable)).toEqual({
        start: [0, 1],
        end: [0, 1],
        backward: false,
      });
    });

    test("delete linebreak", async ({ page }) => {
      await page.goto(storyUrl("basics-editable--text"));

      const editable = await getEditable(page);
      const initialValue = await getText(editable);

      await editable.focus();

      expect(await getSelectionRange(editable)).toEqual({
        start: [0, 0],
        end: [0, 0],
        backward: false,
      });

      // Move caret
      const len = 1;
      await keypress(page, "ArrowRight", len);
      expect(await getSelectionRange(editable)).toEqual({
        start: [0, len],
        end: [0, len],
        backward: false,
      });
      // Expand selection
      await page.keyboard.press("Shift+ArrowDown");
      expect(await getSelectionRange(editable)).toEqual({
        start: [0, len],
        end: [1, len],
        backward: false,
      });

      // delete
      await page.keyboard.press("Delete");

      const value = await getText(editable);
      expect(value).toEqual([
        initialValue[0].slice(0, len) + initialValue[1].slice(len),
        ...initialValue.slice(2),
      ]);
      expect(await getSelectionRange(editable)).toEqual({
        start: [0, len],
        end: [0, len],
        backward: false,
      });
    });

    test("delete all", async ({ page }) => {
      await page.goto(storyUrl("basics-editable--text"));

      const editable = await getEditable(page);
      const initialValue = await getText(editable);

      await editable.focus();

      expect(await getSelectionRange(editable)).toEqual({
        start: [0, 0],
        end: [0, 0],
        backward: false,
      });

      // Select All
      await page.keyboard.press(`ControlOrMeta+A`);
      expect(await getSelectionRange(editable)).toEqual({
        start: [0, 0],
        end: [
          initialValue.length - 1,
          initialValue[initialValue.length - 1].length,
        ],
        backward: false,
      });

      // delete
      await page.keyboard.press("Delete");

      const value = await getText(editable);
      expect(value).toEqual([""]);
      expect(await getSelectionRange(editable)).toEqual({
        start: [0, 0],
        end: [0, 0],
        backward: false,
      });
    });
  });
});

test.describe("Cut", () => {
  test("noop (collapsed selection)", async ({ page }) => {
    await page.goto(storyUrl("basics-editable--text"));

    const editable = await getEditable(page);
    const initialValue = await getText(editable);

    await editable.focus();

    expect(await getSelectionRange(editable)).toEqual({
      start: [0, 0],
      end: [0, 0],
      backward: false,
    });

    // Move caret
    await keypress(page, "ArrowRight", 2);
    expect(await getSelectionRange(editable)).toEqual({
      start: [0, 2],
      end: [0, 2],
      backward: false,
    });

    // cut
    await page.keyboard.press("ControlOrMeta+X");

    const value = await getText(editable);
    expect(value).toEqual(initialValue);
    expect(await getSelectionRange(editable)).toEqual({
      start: [0, 2],
      end: [0, 2],
      backward: false,
    });
  });

  test("cut chars", async ({ page }) => {
    await page.goto(storyUrl("basics-editable--text"));

    const editable = await getEditable(page);
    const initialValue = await getText(editable);

    await editable.focus();

    expect(await getSelectionRange(editable)).toEqual({
      start: [0, 0],
      end: [0, 0],
      backward: false,
    });

    // Move caret
    await page.keyboard.press("ArrowRight");
    expect(await getSelectionRange(editable)).toEqual({
      start: [0, 1],
      end: [0, 1],
      backward: false,
    });
    // Expand selection
    const selLength = 3;
    for (let i = 1; i <= selLength; i++) {
      await page.keyboard.press("Shift+ArrowRight");
    }
    expect(await getSelectionRange(editable)).toEqual({
      start: [0, 1],
      end: [0, 1 + selLength],
      backward: false,
    });

    // cut
    await page.keyboard.press("ControlOrMeta+X");

    const value = await getText(editable);
    expect(value).toEqual(
      initialValue.map((r, i) => (i === 0 ? deleteAt(r, 1, selLength) : r))
    );
    expect(await getSelectionRange(editable)).toEqual({
      start: [0, 1],
      end: [0, 1],
      backward: false,
    });
  });

  test("cut linebreak", async ({ page }) => {
    await page.goto(storyUrl("basics-editable--text"));

    const editable = await getEditable(page);
    const initialValue = await getText(editable);

    await editable.focus();

    expect(await getSelectionRange(editable)).toEqual({
      start: [0, 0],
      end: [0, 0],
      backward: false,
    });

    // Move caret
    const len = 1;
    await keypress(page, "ArrowRight", len);
    expect(await getSelectionRange(editable)).toEqual({
      start: [0, len],
      end: [0, len],
      backward: false,
    });
    // Expand selection
    await page.keyboard.press("Shift+ArrowDown");
    expect(await getSelectionRange(editable)).toEqual({
      start: [0, len],
      end: [1, len],
      backward: false,
    });

    // cut
    await page.keyboard.press("ControlOrMeta+X");

    const value = await getText(editable);
    expect(value).toEqual([
      initialValue[0].slice(0, len) + initialValue[1].slice(len),
      ...initialValue.slice(2),
    ]);
    expect(await getSelectionRange(editable)).toEqual({
      start: [0, len],
      end: [0, len],
      backward: false,
    });
  });

  test("cut all", async ({ page }) => {
    await page.goto(storyUrl("basics-editable--text"));

    const editable = await getEditable(page);
    const initialValue = await getText(editable);

    await editable.focus();

    expect(await getSelectionRange(editable)).toEqual({
      start: [0, 0],
      end: [0, 0],
      backward: false,
    });

    // Select All
    await page.keyboard.press(`ControlOrMeta+A`);
    expect(await getSelectionRange(editable)).toEqual({
      start: [0, 0],
      end: [
        initialValue.length - 1,
        initialValue[initialValue.length - 1].length,
      ],
      backward: false,
    });

    // cut
    await page.keyboard.press("ControlOrMeta+X");

    const value = await getText(editable);
    expect(value).toEqual([""]);
    expect(await getSelectionRange(editable)).toEqual({
      start: [0, 0],
      end: [0, 0],
      backward: false,
    });
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

  test.describe("text/plain", () => {
    test("paste text", async ({ page }) => {
      await page.goto(storyUrl("basics-editable--text"));

      const editable = await getEditable(page);
      const initialValue = await getText(editable);

      await editable.focus();

      expect(await getSelectionRange(editable)).toEqual({
        start: [0, 0],
        end: [0, 0],
        backward: false,
      });

      // Move caret
      await keypress(page, "ArrowRight", 2);
      expect(await getSelectionRange(editable)).toEqual({
        start: [0, 2],
        end: [0, 2],
        backward: false,
      });

      // paste
      const pastedText = "Paste text.";
      await writeText(page, pastedText);
      await page.keyboard.press("ControlOrMeta+V");

      const charLength = pastedText.length;
      const value = await getText(editable);
      expect(value).toEqual(
        initialValue.map((r, i) => (i === 0 ? insertAt(r, 2, pastedText) : r))
      );
      expect(await getSelectionRange(editable)).toEqual({
        start: [0, 2 + charLength],
        end: [0, 2 + charLength],
        backward: false,
      });
    });

    test("paste linebreak", async ({ page }) => {
      await page.goto(storyUrl("basics-editable--text"));

      const editable = await getEditable(page);
      const initialValue = await getText(editable);

      await editable.focus();

      expect(await getSelectionRange(editable)).toEqual({
        start: [0, 0],
        end: [0, 0],
        backward: false,
      });

      // Move caret
      await keypress(page, "ArrowRight", 2);
      expect(await getSelectionRange(editable)).toEqual({
        start: [0, 2],
        end: [0, 2],
        backward: false,
      });

      // paste
      const pastedText = "Paste \ntext.";
      await writeText(page, pastedText);
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
      expect(await getSelectionRange(editable)).toEqual({
        start: [1, afterLineBreakLength],
        end: [1, afterLineBreakLength],
        backward: false,
      });
    });
  });

  test.describe("text/html", () => {
    test("single paragraph root", async ({ page }) => {
      await page.goto(storyUrl("basics-editable--image"));

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
      await page.goto(storyUrl("basics-editable--image"));

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
      await page.goto(storyUrl("basics-editable--image"));

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
      await page.goto(storyUrl("basics-editable--image"));

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
      await page.goto(storyUrl("basics-editable--image"));

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
    await page.goto(storyUrl("basics-editable--text"));

    const editable = await getEditable(page);
    const initialValue = await getText(editable);

    await editable.focus();

    expect(await getSelectionRange(editable)).toEqual({
      start: [0, 0],
      end: [0, 0],
      backward: false,
    });

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
  await page.goto(storyUrl("basics-editable--rtl"));

  const editable = await getEditable(page);
  const initialValue = await getText(editable);

  await editable.focus();

  expect(await getSelectionRange(editable)).toEqual({
    start: [0, 0],
    end: [0, 0],
    backward: false,
  });

  // Move caret
  await page.keyboard.press("ArrowLeft");
  expect(await getSelectionRange(editable)).toEqual({
    start: [0, 1],
    end: [0, 1],
    backward: false,
  });

  {
    // Input
    const text = "test";
    await input(editable, text);
    const value = await getText(editable);
    const textLength = text.length;
    expect(value).toEqual(
      initialValue.map((r, i) => (i === 0 ? insertAt(r, 1, text) : r))
    );
    expect(await getSelectionRange(editable)).toEqual({
      start: [0, 1 + textLength],
      end: [0, 1 + textLength],
      backward: false,
    });
  }
});

test("readonly", async ({ page, browserName }) => {
  await page.goto(storyUrl("basics-editable--readonly"));

  const editable = await getEditable(page);
  const initialValue = await getText(editable);

  // Enable readonly mode
  await page.getByRole("button").click();

  await editable.focus();

  expect(await getSelectionRange(editable)).toEqual({
    start: [0, 0],
    end: [0, 0],
    backward: false,
  });

  // Move caret
  await page.keyboard.press("ArrowRight");
  expect(await getSelectionRange(editable)).toEqual({
    start: [0, 1],
    end: [0, 1],
    backward: false,
  });

  {
    // Input should be ignored
    const text = "test";
    await input(editable, text);
    const value = await getText(editable);
    expect(value).toEqual(initialValue);
    expect(await getSelectionRange(editable)).toEqual({
      start: [0, 1],
      end: [0, 1],
      backward: false,
    });
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
    expect(await getSelectionRange(editable)).toEqual({
      start: [0, 1],
      end: [0, 1],
      backward: false,
    });
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

  expect(await getSelectionRange(editable)).toEqual({
    start: [0, 0],
    end: [0, 0],
    backward: false,
  });

  // Move caret
  await newPage.keyboard.press("ArrowRight");
  expect(await getSelectionRange(editable)).toEqual({
    start: [0, 1],
    end: [0, 1],
    backward: false,
  });

  // Input
  const text = "test";
  await input(editable, text);
  const value = await getText(editable);
  expect(value).toEqual(
    initialValue.map((r, i) => (i === 0 ? insertAt(r, 1, text) : r))
  );
  const textLength = text.length;
  expect(await getSelectionRange(editable)).toEqual({
    start: [0, 1 + textLength],
    end: [0, 1 + textLength],
    backward: false,
  });
});
