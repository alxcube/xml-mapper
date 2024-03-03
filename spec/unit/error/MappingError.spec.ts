import { beforeEach, describe, expect, it } from "vitest";
import { MappingError } from "../../../src";

describe("MappingError class", () => {
  let cause: Error;
  let mappingError: MappingError;

  beforeEach(() => {
    cause = new Error("Cause");
    mappingError = MappingError.create(cause, "test");
  });

  it("should generate error message with mapping path and cause", () => {
    expect(mappingError.message).toMatch(
      `Error in mapping "test", caused by Error: Cause`
    );
  });

  it("should contain cause - initial error", () => {
    expect(mappingError.cause).toBe(cause);
  });

  it("should contain mapping path array", () => {
    expect(mappingError.mappingPath).toEqual(["test"]);
  });

  describe("popUp() method", () => {
    it("should add given segment to path, regenerate message and return self", () => {
      const popped = mappingError.popUp(1);
      expect(popped).toBe(mappingError);
      expect(popped.message).toMatch(`Error in mapping "[1].test"`);
      expect(popped.mappingPath).toEqual([1, "test"]);
    });
  });
});
