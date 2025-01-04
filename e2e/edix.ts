import test, { BrowserContext, Locator } from "@playwright/test";
import * as esbuild from "esbuild";
import * as path from "node:path";
import { SelectionSnapshot } from "../src/core/types";

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

const NON_EDITABLE_NODES = ["IMG", "VIDEO", "IFRAME"];
export const NON_EDITABLE_PLACEHOLDER = "$";

export const getText = async (editable: Locator): Promise<string[]> => {
  return editable.evaluate(
    (element, [NON_EDITABLE_NODES, NON_EDITABLE_PLACEHOLDER]) => {
      return window.edix.serializeDOM(
        element.ownerDocument,
        element as HTMLElement,
        (e) =>
          // TODO improve
          NON_EDITABLE_NODES.includes(e.tagName) ||
          (e as HTMLElement).contentEditable === "false"
            ? NON_EDITABLE_PLACEHOLDER
            : undefined
      );
    },
    [NON_EDITABLE_NODES, NON_EDITABLE_PLACEHOLDER] as const
  );
};

export const getSelection = (
  editable: Locator,
  isSingleline: boolean = false
): Promise<SelectionSnapshot> => {
  return editable.evaluate(
    (element, [isSingleline, NON_EDITABLE_NODES]) => {
      return window.edix.getSelectionSnapshot(
        element.ownerDocument,
        element as HTMLElement,
        (e) =>
          // TODO improve
          NON_EDITABLE_NODES.includes(e.tagName) ||
          (e as HTMLElement).contentEditable === "false",
        isSingleline
      );
    },
    [isSingleline, NON_EDITABLE_NODES] as const
  );
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
