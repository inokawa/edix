import { describe, expect, it } from "vitest";
import { stringToDoc } from "./utils.js";
import { DocFragment } from "./types.js";

describe(stringToDoc.name, () => {
  const tests: [string, DocFragment][] = [
    ["Hello world", [[{ text: "Hello world" }]]],
    ["Hello\n world", [[{ text: "Hello" }], [{ text: " world" }]]],
    ["", [[]]],
    ["\n", [[], []]],
    [
      "\nHello\n\n\n world\n",
      [[], [{ text: "Hello" }], [], [], [{ text: " world" }], []],
    ],
  ];

  tests.forEach(([str, doc]) => {
    it(str, () => {
      expect(stringToDoc(str)).toEqual(doc);
    });
  });
});
