import { describe, expect, it } from "vitest";
import { comparePosition } from "./position";

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
