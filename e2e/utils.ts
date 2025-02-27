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

export const grapheme = (str: string): string[] => {
  return [
    ...new Intl.Segmenter("en", { granularity: "grapheme" }).segment(str),
  ].map((s) => s.segment);
};

export const readClipboard = async (
  page: Page,
  type: "text/plain" | "text/html"
): Promise<string | null> => {
  return page.evaluate(async (t) => {
    const contents = await navigator.clipboard.read();
    for (const item of contents) {
      if (item.types.includes(t)) {
        const blob = await item.getType(t);
        return await blob.text();
      }
    }
    return null;
  }, type);
};
