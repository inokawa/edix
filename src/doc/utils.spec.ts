import { describe, expect, it } from "vitest";
import { stringToDoc } from "./utils";
import { DocFragment } from "./types";

describe(stringToDoc.name, () => {
  const tests: [string, DocFragment][] = [
    ["Hello world", [[{ text: "Hello world" }]]],
    ["Hello\n world", [[{ text: "Hello" }], [{ text: " world" }]]],
    ["", [[{ text: "" }]]],
    ["\n", [[{ text: "" }], [{ text: "" }]]],
    [
      "\nHello\n\n\n world\n",
      [
        [{ text: "" }],
        [{ text: "Hello" }],
        [{ text: "" }],
        [{ text: "" }],
        [{ text: " world" }],
        [{ text: "" }],
      ],
    ],
  ];

  tests.forEach(([str, doc]) => {
    it(str, () => {
      expect(stringToDoc(str)).toEqual(doc);
    });
  });
});
