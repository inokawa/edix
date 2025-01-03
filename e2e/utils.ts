import { Locator, Page } from "@playwright/test";

export const storyUrl = (id: string) =>
  `http://localhost:6006/iframe.html?id=${id}&viewMode=story`;

export const getEditable = async (page: Page) => {
  const editable = page.locator('[contenteditable="true"]');
  await editable.waitFor();
  return editable;
};

export const deleteAt = (
  str: string,
  index: number,
  length: number
): string => {
  return str.slice(0, index) + str.slice(index + length);
};
export const insertAt = (str: string, index: number, value: string): string => {
  return str.slice(0, index) + value + str.slice(index);
};

export const input = async (editable: Locator, text: string) => {
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

export const loop = async (count: number = 1, fn: () => Promise<void>) => {
  for (let i = 1; i <= count; i++) {
    await fn();
  }
};
