import { describe, expect, it } from "vitest";
import { toError } from "../../../src";

describe("toError() function", () => {
  it("should return same error, when given error", () => {
    const error = new Error("");
    expect(toError(error)).toBe(error);
  });

  it("should return error, when given value of other type", () => {
    expect(toError("err")).toBeInstanceOf(Error);
    expect(toError(1)).toBeInstanceOf(Error);
  });
});
