import { test, expect, Page } from "@playwright/test";
import {
  createSelection,
  getSelection,
  getText,
  initEdixHelpers,
  insertAt,
  insertLineBreakAt,
} from "./edix";
import { getEditable, input } from "./utils";

test.beforeEach(async ({ context }) => {
  await initEdixHelpers(context);
});

test("smoke", async ({ page }) => {
  await page.goto("localhost:8080");

  const editable = await getEditable(page);
  const initialValue = await getText(editable);

  await editable.focus();

  expect(await getSelection(editable)).toEqual(createSelection());

  // Move caret
  await page.keyboard.press("ArrowRight");
  expect(await getSelection(editable)).toEqual(createSelection({ offset: 1 }));

  // Input
  const text = "test";
  await input(editable, text);

  const value1 = await getText(editable);
  expect(value1).toEqual(insertAt(initialValue, text, [0, 1]));
  const textLength = text.length;
  expect(await getSelection(editable)).toEqual(
    createSelection({ offset: 1 + textLength })
  );

  // Press enter
  await page.keyboard.press("Enter");

  const value2 = await getText(editable);
  expect(value2).toEqual(insertLineBreakAt(value1, [0, 1 + textLength]));
  expect(await getSelection(editable)).toEqual(createSelection({ line: 1 }));
});
