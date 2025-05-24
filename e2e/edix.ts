import { BrowserContext, Locator } from "@playwright/test";
import * as esbuild from "esbuild";
import * as path from "node:path";
import { SelectionSnapshot } from "../src/core/doc/types";

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

export const getText = async (
  editable: Locator,
  config: { blockTag?: string } = {}
): Promise<string[]> => {
  return editable.evaluate(
    (element, [NON_EDITABLE_PLACEHOLDER, { blockTag }]) => {
      const document = element.ownerDocument;
      return window.edix
        .refToDoc(
          window.edix.readDom(element, {
            _document: document,
            _isBlock: blockTag
              ? (n) => n.tagName === blockTag.toUpperCase()
              : window.edix.defaultIsBlockNode,
          }),
          () => ({})
        )
        .map((r) => {
          return r.reduce<string>((acc, n) => {
            return acc + (n.type === 1 ? n.text : NON_EDITABLE_PLACEHOLDER);
          }, "");
        });
    },
    [NON_EDITABLE_PLACEHOLDER, config] as const
  );
};

export const getSeletedText = (
  editable: Locator,
  config: { blockTag?: string } = {}
): Promise<string[]> => {
  return editable.evaluate(
    (element, [NON_EDITABLE_PLACEHOLDER, { blockTag }]) => {
      const document = element.ownerDocument;
      const selection = document.getSelection()!;
      const range = selection.getRangeAt(0)!.cloneContents();
      return window.edix
        .refToDoc(
          window.edix.readDom(range, {
            _document: document,
            _isBlock: blockTag
              ? (n) => n.tagName === blockTag.toUpperCase()
              : window.edix.defaultIsBlockNode,
          }),
          () => ({})
        )
        .map((r) => {
          return r.reduce<string>((acc, n) => {
            return acc + (n.type === 1 ? n.text : NON_EDITABLE_PLACEHOLDER);
          }, "");
        });
    },
    [NON_EDITABLE_PLACEHOLDER, config] as const
  );
};

export const getSelection = (
  editable: Locator,
  config: { blockTag?: string } = {}
): Promise<SelectionSnapshot> => {
  return editable.evaluate((element, { blockTag }) => {
    return window.edix.takeSelectionSnapshot(element, {
      _document: element.ownerDocument,
      _isBlock: blockTag
        ? (n) => n.tagName === blockTag.toUpperCase()
        : window.edix.defaultIsBlockNode,
    });
  }, config);
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
