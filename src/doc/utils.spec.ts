import { describe, expect, it } from "vitest";
import { stringToFragment } from "./utils.js";
import { type Fragment } from "./types.js";

describe(stringToFragment.name, () => {
  const tests: [string, Fragment][] = [
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
      expect(stringToFragment(str)).toEqual(doc);
    });
  });
});
