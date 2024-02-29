import { beforeEach, describe, expect, it, test } from "vitest";
import { MappingError } from "../../../src";

describe("MappingError class", () => {
  let error: MappingError;

  beforeEach(() => {
    error = new MappingError("test mapping error", new Error("test error"));
  });

  test("error data consistency", () => {
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe("test mapping error");
    expect(error.name).toBe("MappingError");
    expect(error.cause).toBeInstanceOf(Error);
    expect(error.stack).toBeTypeOf("string");
  });

  describe("getInitialCause() method", () => {
    it("should return undefined, when 'cause' is not set", () => {
      expect(new MappingError("").getInitialCause()).toBeUndefined();
    });

    it("should return deepest cause, when it is not child of MappingError class", () => {
      const initial = new Error("");
      const level1 = new MappingError("", initial);
      const level2 = new MappingError("", level1);
      const level3 = new MappingError("", level2);
      expect(level3.getInitialCause()).toBe(initial);
    });

    it("should return deepest cause, when it is child of MappingError class", () => {
      const initial = new MappingError("");
      const level1 = new MappingError("", initial);
      const level2 = new MappingError("", level1);
      const level3 = new MappingError("", level2);
      expect(level3.getInitialCause()).toBe(initial);
    });
  });
});
