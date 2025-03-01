import { BrowserContext, Locator } from "@playwright/test";
import * as esbuild from "esbuild";
import * as path from "node:path";
import { SelectionSnapshot } from "../src/core/types";

declare global {
  interface Window {
    edix: typeof import("../src/core/dom/index.ts");
  }
}

const edixDom = esbuild
  .build({
    entryPoints: [path.join(__dirname, "../src/core/dom/index.ts")],
    bundle: true,
    write: false,
    format: "iife",
    globalName: "edix",
  })
  .then((r) => r.outputFiles[0].text);

export const initEdixHelpers = async (context: BrowserContext) => {
  await context.addInitScript(`
    ${await edixDom}
    window.edix = edix;
    `);
};

export const NON_EDITABLE_PLACEHOLDER = "$";

export const getText = async (editable: Locator): Promise<string[]> => {
  return editable.evaluate((element, NON_EDITABLE_PLACEHOLDER) => {
    const document = element.ownerDocument;
    return window.edix.takeDomSnapshot(document, element).map((r) => {
      return r.reduce<string>((acc, n) => {
        return acc + (typeof n === "string" ? n : NON_EDITABLE_PLACEHOLDER);
      }, "");
    });
  }, NON_EDITABLE_PLACEHOLDER);
};

export const getSeletedText = (editable: Locator): Promise<string[]> => {
  return editable.evaluate((element, NON_EDITABLE_PLACEHOLDER) => {
    const document = element.ownerDocument;
    const selection = document.getSelection()!;
    const range = selection.getRangeAt(0)!.cloneContents();
    return window.edix.takeDomSnapshot(document, range).map((r) => {
      return r.reduce<string>((acc, n) => {
        return acc + (typeof n === "string" ? n : NON_EDITABLE_PLACEHOLDER);
      }, "");
    });
  }, NON_EDITABLE_PLACEHOLDER);
};

export const getSelection = (
  editable: Locator,
  isSingleline: boolean = false
): Promise<SelectionSnapshot> => {
  return editable.evaluate((element, isSingleline) => {
    return window.edix.takeSelectionSnapshot(
      element.ownerDocument,
      element,
      isSingleline
    );
  }, isSingleline);
};

export const getSelectedRect = (editable: Locator): Promise<DOMRect> => {
  return editable.evaluate((element) => {
    const selection = element.ownerDocument.getSelection()!;
    return selection.getRangeAt(0)!.getBoundingClientRect();
  });
};

export const deleteAt = (
  value: readonly string[],
  length: number,
  [line, offset]: readonly [line: number, offset: number]
): string[] => {
  return value.map((r, i) =>
    i === line ? r.slice(0, offset) + r.slice(offset + length) : r
  );
};

export const insertAt = (
  value: readonly string[],
  text: string,
  [line, offset]: readonly [line: number, offset: number]
): string[] => {
  return value.map((r, i) =>
    i === line ? r.slice(0, offset) + text + r.slice(offset) : r
  );
};

export const insertLineBreakAt = (
  value: readonly string[],
  [line, offset]: readonly [line: number, offset: number]
): string[] => {
  return value.flatMap((r, i) => {
    if (i === line) {
      return [r.slice(0, offset), r.slice(offset)];
    }
    return r;
  });
};

export const createSelection = (
  opts:
    | {
        line?: number;
        offset?: number;
        extent?: number;
      }
    | { anchor: [number, number]; focus: [number, number] } = {}
): SelectionSnapshot => {
  if ("anchor" in opts) {
    return [opts.anchor, opts.focus];
  }

  const line = opts.line ?? 0;
  const anchorOffset = opts.offset ?? 0;
  const focusOffset = anchorOffset + (opts.extent ?? 0);
  return [
    [line, anchorOffset],
    [line, focusOffset],
  ];
};
