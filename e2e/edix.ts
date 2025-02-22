import { BrowserContext, Locator } from "@playwright/test";
import * as esbuild from "esbuild";
import * as path from "node:path";
import { Position, SelectionSnapshot } from "../src/core/types";

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

export const initEdixHelpers = async (context: BrowserContext) => {
  await context.addInitScript(`
    ${await edixDom}
    window.edix = edix;
    `);
};

export const NON_EDITABLE_PLACEHOLDER = "$";

export const getText = async (editable: Locator): Promise<string[]> => {
  return editable.evaluate((element, NON_EDITABLE_PLACEHOLDER) => {
    return window.edix
      .takeDomSnapshot(element.ownerDocument, element)
      .map((r) => {
        return r.reduce<string>((acc, n) => {
          return acc + (typeof n === "string" ? n : NON_EDITABLE_PLACEHOLDER);
        }, "");
      });
  }, NON_EDITABLE_PLACEHOLDER);
};

export const getSelection = (editable: Locator): Promise<SelectionSnapshot> => {
  return editable.evaluate((element) => {
    return window.edix.takeSelectionSnapshot(element.ownerDocument, element);
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
        line?: number | Position[0];
        offset?: number;
        extent?: number;
      }
    | { anchor: Position; focus: Position } = {}
): SelectionSnapshot => {
  if ("anchor" in opts) {
    return [opts.anchor, opts.focus];
  }

  const line = opts.line ?? 0;
  const anchorOffset = opts.offset ?? 0;
  const focusOffset = anchorOffset + (opts.extent ?? 0);
  return [
    [typeof line === "number" ? [line] : line, anchorOffset],
    [typeof line === "number" ? [line] : line, focusOffset],
  ];
};
