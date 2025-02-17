import { test, expect } from "@playwright/test";
import {
  createSelection,
  getSelection,
  getText,
  initEdixHelpers,
  NON_EDITABLE_PLACEHOLDER,
  insertAt,
  deleteAt,
} from "./edix";
import { getEditable, input, loop, storyUrl } from "./utils";

test.beforeEach(async ({ context }) => {
  await initEdixHelpers(context);
});

test.describe("smoke node", () => {
  test("contenteditable: false", async ({ page }) => {
    await page.goto(storyUrl("basics-custom--tag"));

    const editable = await getEditable(page);
    const initialValue = await getText(editable);

    await editable.focus();

    expect(await getSelection(editable)).toEqual(createSelection());

    const nodeOffset = initialValue[0].indexOf(NON_EDITABLE_PLACEHOLDER);
    const char = "a";

    // type just before node
    await loop(nodeOffset, () => page.keyboard.press("ArrowRight"));
    expect(await getSelection(editable, true)).toEqual(
      createSelection({ offset: nodeOffset })
    );

    // insert
    await input(editable, char);
    expect(await getText(editable)).toEqual(
      insertAt(initialValue, char, [0, nodeOffset])
    );
    expect(await getSelection(editable, true)).toEqual(
      createSelection({ offset: nodeOffset + 1 })
    );

    // delete
    await page.keyboard.press("Backspace");
    expect(await getText(editable)).toEqual(initialValue);
    expect(await getSelection(editable, true)).toEqual(
      createSelection({ offset: nodeOffset })
    );

    // type just after node
    await page.keyboard.press("ArrowRight");
    expect(await getSelection(editable, true)).toEqual(
      createSelection({ offset: nodeOffset + 1 })
    );

    // insert
    await input(editable, char);
    expect(await getText(editable)).toEqual(
      insertAt(initialValue, char, [0, nodeOffset + 1])
    );
    expect(await getSelection(editable, true)).toEqual(
      createSelection({ offset: nodeOffset + 2 })
    );

    // delete
    await page.keyboard.press("Backspace");
    expect(await getText(editable)).toEqual(initialValue);
    expect(await getSelection(editable, true)).toEqual(
      createSelection({ offset: nodeOffset + 1 })
    );

    // delete custom node
    await page.keyboard.press("Backspace");
    expect(await getText(editable)).toEqual(
      deleteAt(initialValue, 1, [0, nodeOffset])
    );
    expect(await getSelection(editable, true)).toEqual(
      createSelection({ offset: nodeOffset })
    );
  });

  test("img", async ({ page }) => {
    await page.goto(storyUrl("basics-custom--image"));

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
    await input(editable, char);
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
    await input(editable, char);
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

  test("video", async ({ page }) => {
    await page.goto(storyUrl("basics-custom--video"));

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
    await input(editable, char);
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
    await input(editable, char);
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
    await page.goto(storyUrl("basics-custom--iframe"));

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
    await input(editable, char);
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
    await input(editable, char);
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
