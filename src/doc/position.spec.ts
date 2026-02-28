import { describe, expect, it } from "vitest";
import { compareLine, comparePosition } from "./position.js";

describe(compareLine.name, () => {
  it("should return same if it is the same", () => {
    expect(compareLine(1, 1)).toBe(0);
  });

  it("should return forward if forward", () => {
    expect(compareLine(1, 2)).toBe(1);
  });

  it("should return backward if backward", () => {
    expect(compareLine(2, 1)).toBe(-1);
  });
});

describe(comparePosition.name, () => {
  it("should return same if position is the same", () => {
    expect(comparePosition([1, 1], [1, 1])).toBe(0);
  });

  it("should return forward if offset is forward", () => {
    expect(comparePosition([1, 1], [1, 2])).toBe(1);
  });

  it("should return forward if line is forward", () => {
    expect(comparePosition([1, 2], [2, 1])).toBe(1);
  });

  it("should return backward if offset is backward", () => {
    expect(comparePosition([1, 2], [1, 1])).toBe(-1);
  });

  it("should return backward if line is backward", () => {
    expect(comparePosition([2, 1], [1, 2])).toBe(-1);
  });
});
