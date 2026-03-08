import { describe, expect, it } from "vitest";
import { comparePath, comparePosition } from "./position.js";

describe(comparePath.name, () => {
  it("should return same if A is empty", () => {
    expect(comparePath([], [1])).toBe(0);
  });

  it("should return same if B is empty", () => {
    expect(comparePath([1], [])).toBe(0);
  });

  it("should return same if both is empty", () => {
    expect(comparePath([], [])).toBe(0);
  });

  it("should return same if value is the same", () => {
    expect(comparePath([1], [1])).toBe(0);
  });

  it("should return forward if B is higher", () => {
    expect(comparePath([1], [2])).toBe(-1);
  });

  it("should return backward if B is lower", () => {
    expect(comparePath([2], [1])).toBe(1);
  });

  it("should return same if B has common but shallower", () => {
    // @ts-expect-error
    expect(comparePath([1, 2], [1])).toBe(0);
  });

  it("should return same if B has common but deeper", () => {
    // @ts-expect-error
    expect(comparePath([1], [1, 2])).toBe(0);
  });

  it("should return forward if B is higher and shallower", () => {
    // @ts-expect-error
    expect(comparePath([1, 1], [2])).toBe(-1);
  });

  it("should return forward if B is higher and deeper", () => {
    // @ts-expect-error
    expect(comparePath([1], [2, 2])).toBe(-1);
  });

  it("should return backward if B is lower and shallower", () => {
    // @ts-expect-error
    expect(comparePath([2, 1], [1])).toBe(1);
  });

  it("should return backward if B is lower and deeper", () => {
    // @ts-expect-error
    expect(comparePath([2], [1, 1])).toBe(1);
  });
});

describe(comparePosition.name, () => {
  it("should return same if position is the same", () => {
    expect(comparePosition([[1], 1], [[1], 1])).toBe(0);
  });

  it("should return forward if offset is forward", () => {
    expect(comparePosition([[1], 1], [[1], 2])).toBe(-1);
  });

  it("should return forward if path is forward", () => {
    expect(comparePosition([[1], 2], [[2], 1])).toBe(-1);
  });

  it("should return backward if offset is backward", () => {
    expect(comparePosition([[1], 2], [[1], 1])).toBe(1);
  });

  it("should return backward if path is backward", () => {
    expect(comparePosition([[2], 1], [[1], 2])).toBe(1);
  });
});
