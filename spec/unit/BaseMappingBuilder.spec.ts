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

  it("should populate given name, which should be contained in binding error message", () => {
    expect(() =>
      map("propName")
        .toNode("//MissingNode")
        .mandatory()
        .asString()
        .createNodeDataExtractor()(parseXml("<root/>"), xpath.select)
    ).toThrow("propName: //MissingNode");

    expect(() =>
      map("arrayPropName")
        .toNodesArray("//MissingNodesArray")
        .mandatory()
        .asArray()
        .ofStrings()
        .createNodeDataExtractor()(parseXml("<root/>"), xpath.select)
    ).toThrow("arrayPropName: //MissingNodesArray");
  });
});

describe("BaseMappingBuilder class", () => {
  describe("toNode() method", () => {
    it("should return instance of BaseSingleNodeLookupBuilder", () => {
      expect(map().toNode("/")).toBeInstanceOf(BaseSingleNodeLookupBuilder);
    });
  });

  describe("toNodesArray() method", () => {
    it("should return instance of BaseNodesArrayLookupBuilder", () => {
      expect(map().toNodesArray("/")).toBeInstanceOf(
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
