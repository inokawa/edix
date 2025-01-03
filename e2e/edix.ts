import test, { Locator } from "@playwright/test";
import * as esbuild from "esbuild";
import * as path from "node:path";
import { SelectionSnapshot } from "../src/core/dom";

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

export const getSelection = (
  editable: Locator,
  isSingleline: boolean = false
): Promise<SelectionSnapshot> => {
  return editable.evaluate((element, isSingleline) => {
    return window.edix.getSelectionSnapshot(
      element.ownerDocument,
      element as HTMLElement,
      () => false, // TODO
      isSingleline
    );
  }, isSingleline);
};

export const createSelection = (
  opts:
    | {
        line?: number;
        offset?: number;
        extent?: number;
      }
    | { start: [number, number]; end: [number, number] } = {}
): SelectionSnapshot => {
  if ("start" in opts) {
    return {
      start: opts.start,
      end: opts.end,
      backward: false,
    };
  }

  const line = opts.line ?? 0;
  const startOffset = opts.offset ?? 0;
  const endOffset = startOffset + (opts.extent ?? 0);
  return {
    start: [line, startOffset],
    end: [line, endOffset],
    backward: false,
  };
};
