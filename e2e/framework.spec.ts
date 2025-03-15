import { test, expect } from "@playwright/test";
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

  const value1 = insertAt(initialValue, text, [0, 1]);
  expect(await getText(editable)).toEqual(value1);
  const textLength = text.length;
  expect(await getSelection(editable)).toEqual(
    createSelection({ offset: 1 + textLength })
  );

  // Split
  await page.keyboard.press("Enter");
  const value2 = insertLineBreakAt(value1, [0, 1 + textLength]);
  expect(await getText(editable)).toEqual(value2);
  expect(await getSelection(editable)).toEqual(createSelection({ line: 1 }));

  // Split again
  await page.keyboard.press("Enter");
  const value3 = insertLineBreakAt(value2, [1, 0]);
  expect(await getText(editable)).toEqual(value3);
  expect(await getSelection(editable)).toEqual(createSelection({ line: 2 }));

  // Insert empty line
  await page.keyboard.press("ArrowUp");
  await page.keyboard.press("Enter");
  expect(await getText(editable)).toEqual(insertLineBreakAt(value3, [1, 0]));
  expect(await getSelection(editable)).toEqual(createSelection({ line: 2 }));
});
