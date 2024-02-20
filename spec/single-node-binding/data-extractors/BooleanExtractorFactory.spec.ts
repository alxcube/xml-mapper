import { beforeEach, describe, expect, it } from "vitest";
import { BooleanExtractorFactory, extractBoolean } from "../../../src";

describe("BooleanExtractorFactory class", () => {
  let factory: BooleanExtractorFactory;

  beforeEach(() => {
    factory = new BooleanExtractorFactory();
  });

  describe("createNodeDataExtractor() method", () => {
    it("should return extractBoolean() function", () => {
      expect(factory.createNodeDataExtractor()).toBe(extractBoolean);
    });
  });
});
