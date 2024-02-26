import { describe, expect, it } from "vitest";
import xpath from "xpath";
import {
  BaseMappingBuilder,
  BaseNodesArrayLookupBuilder,
  BaseSingleNodeLookupBuilder,
  map,
} from "../../src";
import { parseXml } from "../helper/parseXml";

describe("map() function", () => {
  it("should return BaseMappingBuilder instance", () => {
    expect(map()).toBeInstanceOf(BaseMappingBuilder);
  });
});

describe("BaseMappingBuilder class", () => {
  describe("toNode() method", () => {
    it("should return instance of BaseSingleNodeLookupBuilder", () => {
      expect(map().toNode("/")).toBeInstanceOf(BaseSingleNodeLookupBuilder);
    });
  });

  describe("toAttribute() method", () => {
    it("should return instance of BaseSingleNodeLookupBuilder", () => {
      expect(map().toAttribute("/")).toBeInstanceOf(
        BaseSingleNodeLookupBuilder
      );
    });
  });

  describe("toElement() method", () => {
    it("should return instance of BaseSingleNodeLookupBuilder", () => {
      expect(map().toElement("/")).toBeInstanceOf(BaseSingleNodeLookupBuilder);
    });
  });

  describe("toNodesArray() method", () => {
    it("should return instance of BaseNodesArrayLookupBuilder", () => {
      expect(map().toNodesArray("/")).toBeInstanceOf(
        BaseNodesArrayLookupBuilder
      );
    });
  });

  describe("toAttributesArray() method", () => {
    it("should return instance of BaseNodesArrayLookupBuilder", () => {
      expect(map().toAttributesArray("/")).toBeInstanceOf(
        BaseNodesArrayLookupBuilder
      );
    });
  });

  describe("toElementsArray() method", () => {
    it("should return instance of BaseNodesArrayLookupBuilder", () => {
      expect(map().toElementsArray("/")).toBeInstanceOf(
        BaseNodesArrayLookupBuilder
      );
    });
  });

  describe("constant() method", () => {
    it("should return SingleNodeDataExtractorFn function, which returns provided constant value", () => {
      expect(map().constant(10)(parseXml("<root/>"), xpath.select)).toBe(10);
    });
  });
});
