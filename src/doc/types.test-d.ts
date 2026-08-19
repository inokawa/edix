import { expectTypeOf, it } from "vitest";
import type { Node } from "./types.js";

it("node", () => {
  interface ImageNode {
    readonly src: string;
  }

  expectTypeOf<{ text: string }>().toExtend<Node>();
  expectTypeOf<{ children: { text: string }[] }>().toExtend<Node>();
  expectTypeOf<{
    children: { children: { text: string }[] }[];
  }>().toExtend<Node>();
  expectTypeOf<{ type: "tag" }>().toExtend<Node>();
  expectTypeOf<ImageNode>().toExtend<Node>();

  expectTypeOf<number>().not.toExtend<Node>();
  expectTypeOf<string>().not.toExtend<Node>();
  expectTypeOf<boolean>().not.toExtend<Node>();
  expectTypeOf<null>().not.toExtend<Node>();
  expectTypeOf<undefined>().not.toExtend<Node>();
  expectTypeOf<{ text: number }>().not.toExtend<Node>();
});
