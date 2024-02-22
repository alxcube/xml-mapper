import { describe, expect, it } from "vitest";
import {
  BaseBindingInitializer,
  BaseNodesArrayLookupBuilder,
  BaseSingleNodeLookupBuilder,
  bind,
} from "../../src";

describe("bind() function", () => {
  it("should return BaseBindingInitializer instance", () => {
    expect(bind()).toBeInstanceOf(BaseBindingInitializer);
  });
});

describe("BaseBindingInitializer class", () => {
  describe("toNode() method", () => {
    it("should return instance of BaseSingleNodeLookupBuilder", () => {
      expect(bind().toNode("/")).toBeInstanceOf(BaseSingleNodeLookupBuilder);
    });
  });

  describe("toAttribute() method", () => {
    it("should return instance of BaseSingleNodeLookupBuilder", () => {
      expect(bind().toAttribute("/")).toBeInstanceOf(
        BaseSingleNodeLookupBuilder
      );
    });
  });

  describe("toElement() method", () => {
    it("should return instance of BaseSingleNodeLookupBuilder", () => {
      expect(bind().toElement("/")).toBeInstanceOf(BaseSingleNodeLookupBuilder);
    });
  });

  describe("toNodesArray() method", () => {
    it("should return instance of BaseNodesArrayLookupBuilder", () => {
      expect(bind().toNodesArray("/")).toBeInstanceOf(
        BaseNodesArrayLookupBuilder
      );
    });
  });

  describe("toAttributesArray() method", () => {
    it("should return instance of BaseNodesArrayLookupBuilder", () => {
      expect(bind().toAttributesArray("/")).toBeInstanceOf(
        BaseNodesArrayLookupBuilder
      );
    });
  });

  describe("toElementsArray() method", () => {
    it("should return instance of BaseNodesArrayLookupBuilder", () => {
      expect(bind().toElementsArray("/")).toBeInstanceOf(
        BaseNodesArrayLookupBuilder
      );
    });
  });
});
