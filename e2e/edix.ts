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
