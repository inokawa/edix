import test, { Locator } from "@playwright/test";
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

export const getText = async (editable: Locator): Promise<string[]> => {
  return editable.evaluate((element) => {
    return window.edix.serializeDOM(
      element.ownerDocument,
      element as HTMLElement,
      () => undefined // TODO
    );
  });
};

export const getSelectionRange = (
  editable: Locator,
  isSingleline: boolean = false
) => {
  return editable.evaluate((element, isSingleline) => {
    return window.edix.getSelectionSnapshot(
      element.ownerDocument,
      element as HTMLElement,
      () => false, // TODO
      isSingleline
    );
  }, isSingleline);
};
