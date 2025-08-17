import { test, expect, Page } from "@playwright/test";
import {
  createSelection,
  getSelection,
  getText,
  initEdixHelpers,
  NON_EDITABLE_PLACEHOLDER,
  insertAt,
  deleteAt,
  moveSelectionToOrigin,
} from "./edix";
import { getEditable, type, loop, readClipboard, storyUrl } from "./utils";

test.beforeEach(async ({ context }) => {
  await initEdixHelpers(context);
});

test.describe("smoke node", () => {
  test("contenteditable: false", async ({ page }) => {
    await page.goto(storyUrl("basics-structured--tag"));

    const editable = await getEditable(page);
    const initialValue = await getText(editable);

    await editable.focus();

    expect(await getSelection(editable)).toEqual(createSelection());

    const nodeOffset = initialValue[0].indexOf(NON_EDITABLE_PLACEHOLDER);
    const char = "a";

    // type just before node
    await loop(nodeOffset, () => page.keyboard.press("ArrowRight"));
    expect(await getSelection(editable)).toEqual(
      createSelection({ offset: nodeOffset })
    );

    // insert
    await type(editable, char);
    expect(await getText(editable)).toEqual(
      insertAt(initialValue, char, [0, nodeOffset])
    );
    expect(await getSelection(editable)).toEqual(
      createSelection({ offset: nodeOffset + 1 })
    );

    // delete
    await page.keyboard.press("Backspace");
    expect(await getText(editable)).toEqual(initialValue);
    expect(await getSelection(editable)).toEqual(
      createSelection({ offset: nodeOffset })
    );

    // type just after node
    await page.keyboard.press("ArrowRight");
    expect(await getSelection(editable)).toEqual(
      createSelection({ offset: nodeOffset + 1 })
    );

    // insert
    await type(editable, char);
    expect(await getText(editable)).toEqual(
      insertAt(initialValue, char, [0, nodeOffset + 1])
    );
    expect(await getSelection(editable)).toEqual(
      createSelection({ offset: nodeOffset + 2 })
    );

    // delete
    await page.keyboard.press("Backspace");
    expect(await getText(editable)).toEqual(initialValue);
    expect(await getSelection(editable)).toEqual(
      createSelection({ offset: nodeOffset + 1 })
    );

    // delete custom node
    await page.keyboard.press("Backspace");
    expect(await getText(editable)).toEqual(
      deleteAt(initialValue, 1, [0, nodeOffset])
    );
    expect(await getSelection(editable)).toEqual(
      createSelection({ offset: nodeOffset })
    );

    // undo
    await page.keyboard.press(`ControlOrMeta+Z`);
    await moveSelectionToOrigin(editable);
    expect(await getText(editable)).toEqual(initialValue);
    expect(await getSelection(editable)).toEqual(
      createSelection({ offset: 0 })
    );

    // delete selected custom node and texts
    await loop(nodeOffset - 1, () => page.keyboard.press("ArrowRight"));
    await page.keyboard.press("Shift+ArrowRight");
    await page.keyboard.press("Shift+ArrowRight");
    await page.keyboard.press("Shift+ArrowRight");
    await page.keyboard.press("Backspace");
    expect(await getText(editable)).toEqual(
      deleteAt(initialValue, 3, [0, nodeOffset - 1])
    );
    expect(await getSelection(editable)).toEqual(
      createSelection({ offset: nodeOffset - 1 })
    );

    // undo
    await page.keyboard.press(`ControlOrMeta+Z`);
    await moveSelectionToOrigin(editable);
    expect(await getText(editable)).toEqual(initialValue);
    expect(await getSelection(editable)).toEqual(
      createSelection({ offset: 0 })
    );

    // replace selected custom node
    const replaceText = "Z";
    await loop(nodeOffset, () => page.keyboard.press("ArrowRight"));
    await page.keyboard.press("Shift+ArrowRight");
    await type(editable, replaceText);
    expect(await getText(editable)).toEqual(
      insertAt(deleteAt(initialValue, 1, [0, nodeOffset]), replaceText, [
        0,
        nodeOffset,
      ])
    );
    expect(await getSelection(editable)).toEqual(
      createSelection({ offset: nodeOffset + 1 })
    );
  });

  test("img", async ({ page }) => {
    await page.goto(storyUrl("basics-structured--image"));

    const editable = await getEditable(page);
    const initialValue = await getText(editable);

    await editable.focus();

    expect(await getSelection(editable)).toEqual(createSelection());

    const nodeOffset = initialValue[0].indexOf(NON_EDITABLE_PLACEHOLDER);
    const char = "a";

    // type just before node
    await loop(nodeOffset, () => page.keyboard.press("ArrowRight"));
    expect(await getSelection(editable)).toEqual(
      createSelection({ offset: nodeOffset })
    );

    // insert
    await type(editable, char);
    expect(await getText(editable)).toEqual(
      insertAt(initialValue, char, [0, nodeOffset])
    );
    expect(await getSelection(editable)).toEqual(
      createSelection({ offset: nodeOffset + 1 })
    );

    // delete
    await page.keyboard.press("Backspace");
    expect(await getText(editable)).toEqual(initialValue);
    expect(await getSelection(editable)).toEqual(
      createSelection({ offset: nodeOffset })
    );

    // type just after node
    await page.keyboard.press("ArrowRight");
    expect(await getSelection(editable)).toEqual(
      createSelection({ offset: nodeOffset + 1 })
    );

    // insert
    await type(editable, char);
    expect(await getText(editable)).toEqual(
      insertAt(initialValue, char, [0, nodeOffset + 1])
    );
    expect(await getSelection(editable)).toEqual(
      createSelection({ offset: nodeOffset + 2 })
    );

    // delete
    await page.keyboard.press("Backspace");
    expect(await getText(editable)).toEqual(initialValue);
    expect(await getSelection(editable)).toEqual(
      createSelection({ offset: nodeOffset + 1 })
    );

    // delete custom node
    await page.keyboard.press("Backspace");
    expect(await getText(editable)).toEqual(
      deleteAt(initialValue, 1, [0, nodeOffset])
    );
    expect(await getSelection(editable)).toEqual(
      createSelection({ offset: nodeOffset })
    );

    // undo
    await page.keyboard.press(`ControlOrMeta+Z`);
    await moveSelectionToOrigin(editable);
    expect(await getText(editable)).toEqual(initialValue);
    expect(await getSelection(editable)).toEqual(
      createSelection({ offset: 0 })
    );

    // delete selected custom node and texts
    await loop(nodeOffset - 1, () => page.keyboard.press("ArrowRight"));
    await page.keyboard.press("Shift+ArrowRight");
    await page.keyboard.press("Shift+ArrowRight");
    await page.keyboard.press("Shift+ArrowRight");
    await page.keyboard.press("Backspace");
    expect(await getText(editable)).toEqual(
      deleteAt(initialValue, 3, [0, nodeOffset - 1])
    );
    expect(await getSelection(editable)).toEqual(
      createSelection({ offset: nodeOffset - 1 })
    );

    // undo
    await page.keyboard.press(`ControlOrMeta+Z`);
    await moveSelectionToOrigin(editable);
    expect(await getText(editable)).toEqual(initialValue);
    expect(await getSelection(editable)).toEqual(
      createSelection({ offset: 0 })
    );

    // replace selected custom node
    const replaceText = "Z";
    await loop(nodeOffset, () => page.keyboard.press("ArrowRight"));
    await page.keyboard.press("Shift+ArrowRight");
    await type(editable, replaceText);
    expect(await getText(editable)).toEqual(
      insertAt(deleteAt(initialValue, 1, [0, nodeOffset]), replaceText, [
        0,
        nodeOffset,
      ])
    );
    expect(await getSelection(editable)).toEqual(
      createSelection({ offset: nodeOffset + 1 })
    );
  });

  test("video", async ({ page }) => {
    await page.goto(storyUrl("basics-structured--video"));

    const editable = await getEditable(page);
    const initialValue = await getText(editable);

    await editable.focus();

    expect(await getSelection(editable)).toEqual(createSelection());

    const nodeOffset = initialValue[0].indexOf(NON_EDITABLE_PLACEHOLDER);
    const char = "a";

    // type just before node
    await loop(nodeOffset, () => page.keyboard.press("ArrowRight"));
    expect(await getSelection(editable)).toEqual(
      createSelection({ offset: nodeOffset })
    );

    // insert
    await type(editable, char);
    expect(await getText(editable)).toEqual(
      insertAt(initialValue, char, [0, nodeOffset])
    );
    expect(await getSelection(editable)).toEqual(
      createSelection({ offset: nodeOffset + 1 })
    );

    // delete
    await page.keyboard.press("Backspace");
    expect(await getText(editable)).toEqual(initialValue);
    expect(await getSelection(editable)).toEqual(
      createSelection({ offset: nodeOffset })
    );

    // type just after node
    await page.keyboard.press("ArrowRight");
    expect(await getSelection(editable)).toEqual(
      createSelection({ offset: nodeOffset + 1 })
    );

    // insert
    await type(editable, char);
    expect(await getText(editable)).toEqual(
      insertAt(initialValue, char, [0, nodeOffset + 1])
    );
    expect(await getSelection(editable)).toEqual(
      createSelection({ offset: nodeOffset + 2 })
    );

    // delete
    await page.keyboard.press("Backspace");
    expect(await getText(editable)).toEqual(initialValue);
    expect(await getSelection(editable)).toEqual(
      createSelection({ offset: nodeOffset + 1 })
    );

    // delete custom node
    await page.keyboard.press("Backspace");
    expect(await getText(editable)).toEqual(
      deleteAt(initialValue, 1, [0, nodeOffset])
    );
    expect(await getSelection(editable)).toEqual(
      createSelection({ offset: nodeOffset })
    );
  });

  test("iframe", async ({ page }) => {
    await page.goto(storyUrl("basics-structured--iframe"));

    const editable = await getEditable(page);
    const initialValue = await getText(editable);

    await editable.focus();

    expect(await getSelection(editable)).toEqual(createSelection());

    const nodeOffset = initialValue[0].indexOf(NON_EDITABLE_PLACEHOLDER);
    const char = "a";

    // type just before node
    await loop(nodeOffset, () => page.keyboard.press("ArrowRight"));
    expect(await getSelection(editable)).toEqual(
      createSelection({ offset: nodeOffset })
    );

    // insert
    await type(editable, char);
    expect(await getText(editable)).toEqual(
      insertAt(initialValue, char, [0, nodeOffset])
    );
    expect(await getSelection(editable)).toEqual(
      createSelection({ offset: nodeOffset + 1 })
    );

    // delete
    await page.keyboard.press("Backspace");
    expect(await getText(editable)).toEqual(initialValue);
    expect(await getSelection(editable)).toEqual(
      createSelection({ offset: nodeOffset })
    );

    // type just after node
    await page.keyboard.press("ArrowRight");
    expect(await getSelection(editable)).toEqual(
      createSelection({ offset: nodeOffset + 1 })
    );

    // insert
    await type(editable, char);
    expect(await getText(editable)).toEqual(
      insertAt(initialValue, char, [0, nodeOffset + 1])
    );
    expect(await getSelection(editable)).toEqual(
      createSelection({ offset: nodeOffset + 2 })
    );

    // delete
    await page.keyboard.press("Backspace");
    expect(await getText(editable)).toEqual(initialValue);
    expect(await getSelection(editable)).toEqual(
      createSelection({ offset: nodeOffset + 1 })
    );

    // delete custom node
    await page.keyboard.press("Backspace");
    expect(await getText(editable)).toEqual(
      deleteAt(initialValue, 1, [0, nodeOffset])
    );
    expect(await getSelection(editable)).toEqual(
      createSelection({ offset: nodeOffset })
    );
  });
});

test.describe("Copy", () => {
  test.beforeEach(async ({ context, browserName }) => {
    // https://github.com/microsoft/playwright/issues/13037#issuecomment-1078208810
    test.skip(browserName !== "chromium");
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  });

  test("copy all", async ({ page }) => {
    await page.goto(storyUrl("basics-structured--multiline"));

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

test.describe("html paste", () => {
  test.beforeEach(async ({ context, browserName }) => {
    // https://github.com/microsoft/playwright/issues/13037#issuecomment-1078208810
    test.skip(browserName !== "chromium");
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  });

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
    await page.goto(storyUrl("basics-structured--multiline"));

    const editable = await getEditable(page);

    await editable.focus();

    const plain = `
export const editable = (
  element: HTMLElement,
  { readonly, nodes, onChange }: EditableOptions`;
    const html = `<meta charset='utf-8'><div><br><div><span>export</span><span> </span><span>const</span><span> </span><span>editable</span><span> </span><span>=</span><span> (</span></div><div><span>  </span><span>element</span><span>:</span><span> </span><span>HTMLElement</span><span>,</span></div><div><span>  { </span><span>readonly</span><span>, </span><span>nodes</span><span>, </span><span>onChange</span><span> }</span><span>:</span><span> </span><span>EditableOptions</span></div><div><span></span></div></div>`;

    await writeHTML(page, html);

    // Delete all
    await page.keyboard.press(`ControlOrMeta+A`);
    await page.keyboard.press(`Backspace`);

    await page.keyboard.press(`ControlOrMeta+V`);
    expect((await getText(editable)).join("\n")).toEqual(plain);
  });

  test("multi paragraph root", async ({ page }) => {
    await page.goto(storyUrl("basics-structured--multiline"));

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
    await page.goto(storyUrl("basics-structured--multiline"));

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
    await page.goto(storyUrl("basics-structured--multiline"));

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
    await page.goto(storyUrl("basics-structured--multiline"));

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

  test("copy in windows", async ({ page }) => {
    await page.goto(storyUrl("basics-structured--multiline"));

    const editable = await getEditable(page);

    await editable.focus();

    const plain = `world`;
    const html = `<html>
<body>
<!--StartFragment-->world<!--EndFragment-->
</body>
</html>`;

    await writeHTML(page, html);

    // Delete all
    await page.keyboard.press(`ControlOrMeta+A`);
    await page.keyboard.press(`Backspace`);

    await page.keyboard.press(`ControlOrMeta+V`);
    expect((await getText(editable)).join("\n")).toEqual(plain);
  });
});
