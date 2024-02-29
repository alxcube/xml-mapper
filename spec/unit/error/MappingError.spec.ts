import { beforeEach, describe, expect, test } from "vitest";
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
});
