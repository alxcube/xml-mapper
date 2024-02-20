import { beforeEach, describe, expect, it } from "vitest";
import { extractString, StringExtractorFactory } from "../../../src";

describe("StringExtractorFactory class", () => {
  let factory: StringExtractorFactory;

  beforeEach(() => {
    factory = new StringExtractorFactory();
  });

  describe("createNodeDataExtractor() method", () => {
    it("should return extractString() function", () => {
      expect(factory.createNodeDataExtractor()).toBe(extractString);
    });
  });
});
