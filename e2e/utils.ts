import { Locator, Page } from "@playwright/test";

export const storyUrl = (id: string) =>
  `http://localhost:6006/iframe.html?id=${id}&viewMode=story`;

export const getEditable = async (page: Page) => {
  const editable = page.locator('[contenteditable="true"]');
  await editable.waitFor();
  return editable;
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

export const loop = async (count: number, fn: () => Promise<void>) => {
  for (let i = 1; i <= count; i++) {
    await fn();
  }
};

export const segment = (str: string): string[] => {
  return [
    ...new Intl.Segmenter("en", { granularity: "grapheme" }).segment(str),
  ].map((s) => s.segment);
};
