import { beforeEach, describe, expect, it } from "vitest";
import { extractNumber, NumberExtractorFactory } from "../../../../src";

describe("NumberExtractorFactory class", () => {
  let factory: NumberExtractorFactory;

  beforeEach(() => {
    factory = new NumberExtractorFactory();
  });

  describe("createNodeDataExtractor() method", () => {
    it("should return extractNumber() function", () => {
      expect(factory.createNodeDataExtractor()).toBe(extractNumber);
    });
  });
});
