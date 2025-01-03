import { test, expect } from "@playwright/test";
import {
  createSelection,
  getSelection,
  getText,
  NON_EDITABLE_PLACEHOLDER,
} from "./edix";
import { getEditable, input, insertAt, loop, storyUrl } from "./utils";

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
    expect(await getSelection(editable)).toEqual(
      createSelection({ offset: nodeOffset })
    );
    {
      // insert
      await input(editable, char);

      const value = await getText(editable);
      expect(value).toEqual([
        insertAt(initialValue[0], nodeOffset, char),
        ...initialValue.slice(1),
      ]);
      expect(await getSelection(editable)).toEqual(
        createSelection({ offset: nodeOffset + 1 })
      );
    }
    {
      // delete
      await page.keyboard.press("Backspace");
      const value = await getText(editable);
      expect(value).toEqual(initialValue);
      expect(await getSelection(editable)).toEqual(
        createSelection({ offset: nodeOffset })
      );
    }

    // type just after node
    await page.keyboard.press("ArrowRight");
    expect(await getSelection(editable)).toEqual(
      createSelection({ offset: nodeOffset + 1 })
    );
    {
      // insert
      await input(editable, char);

      const value = await getText(editable);
      expect(value).toEqual([
        insertAt(initialValue[0], nodeOffset + 1, char),
        ...initialValue.slice(1),
      ]);
      expect(await getSelection(editable)).toEqual(
        createSelection({ offset: nodeOffset + 2 })
      );
    }
    {
      // delete
      await page.keyboard.press("Backspace");
      const value = await getText(editable);
      expect(value).toEqual(initialValue);
      expect(await getSelection(editable)).toEqual(
        createSelection({ offset: nodeOffset + 1 })
      );
    }
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
    {
      // insert
      await input(editable, char);

      const value = await getText(editable);
      expect(value).toEqual([
        insertAt(initialValue[0], nodeOffset, char),
        ...initialValue.slice(1),
      ]);
      expect(await getSelection(editable)).toEqual(
        createSelection({ offset: nodeOffset + 1 })
      );
    }
    {
      // delete
      await page.keyboard.press("Backspace");
      const value = await getText(editable);
      expect(value).toEqual(initialValue);
      expect(await getSelection(editable)).toEqual(
        createSelection({ offset: nodeOffset })
      );
    }

    // type just after node
    await page.keyboard.press("ArrowRight");
    expect(await getSelection(editable)).toEqual(
      createSelection({ offset: nodeOffset + 1 })
    );
    {
      // insert
      await input(editable, char);

      const value = await getText(editable);
      expect(value).toEqual([
        insertAt(initialValue[0], nodeOffset + 1, char),
        ...initialValue.slice(1),
      ]);
      expect(await getSelection(editable)).toEqual(
        createSelection({ offset: nodeOffset + 2 })
      );
    }
    {
      // delete
      await page.keyboard.press("Backspace");
      const value = await getText(editable);
      expect(value).toEqual(initialValue);
      expect(await getSelection(editable)).toEqual(
        createSelection({ offset: nodeOffset + 1 })
      );
    }
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
    {
      // insert
      await input(editable, char);

      const value = await getText(editable);
      expect(value).toEqual([
        insertAt(initialValue[0], nodeOffset, char),
        ...initialValue.slice(1),
      ]);
      expect(await getSelection(editable)).toEqual(
        createSelection({ offset: nodeOffset + 1 })
      );
    }
    {
      // delete
      await page.keyboard.press("Backspace");
      const value = await getText(editable);
      expect(value).toEqual(initialValue);
      expect(await getSelection(editable)).toEqual(
        createSelection({ offset: nodeOffset })
      );
    }

    // type just after node
    await page.keyboard.press("ArrowRight");
    expect(await getSelection(editable)).toEqual(
      createSelection({ offset: nodeOffset + 1 })
    );
    {
      // insert
      await input(editable, char);

      const value = await getText(editable);
      expect(value).toEqual([
        insertAt(initialValue[0], nodeOffset + 1, char),
        ...initialValue.slice(1),
      ]);
      expect(await getSelection(editable)).toEqual(
        createSelection({ offset: nodeOffset + 2 })
      );
    }
    {
      // delete
      await page.keyboard.press("Backspace");
      const value = await getText(editable);
      expect(value).toEqual(initialValue);
      expect(await getSelection(editable)).toEqual(
        createSelection({ offset: nodeOffset + 1 })
      );
    }
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
    {
      // insert
      await input(editable, char);

      const value = await getText(editable);
      expect(value).toEqual([
        insertAt(initialValue[0], nodeOffset, char),
        ...initialValue.slice(1),
      ]);
      expect(await getSelection(editable)).toEqual(
        createSelection({ offset: nodeOffset + 1 })
      );
    }
    {
      // delete
      await page.keyboard.press("Backspace");
      const value = await getText(editable);
      expect(value).toEqual(initialValue);
      expect(await getSelection(editable)).toEqual(
        createSelection({ offset: nodeOffset })
      );
    }

    // type just after node
    await page.keyboard.press("ArrowRight");
    expect(await getSelection(editable)).toEqual(
      createSelection({ offset: nodeOffset + 1 })
    );
    {
      // insert
      await input(editable, char);

      const value = await getText(editable);
      expect(value).toEqual([
        insertAt(initialValue[0], nodeOffset + 1, char),
        ...initialValue.slice(1),
      ]);
      expect(await getSelection(editable)).toEqual(
        createSelection({ offset: nodeOffset + 2 })
      );
    }
    {
      // delete
      await page.keyboard.press("Backspace");
      const value = await getText(editable);
      expect(value).toEqual(initialValue);
      expect(await getSelection(editable)).toEqual(
        createSelection({ offset: nodeOffset + 1 })
      );
    }
  });
});
