import { beforeEach, describe, expect, it } from "vitest";
import {
  BaseNodesArrayDataMapperBuilder,
  BaseNodesArrayLookupBuilder,
  StringExtractorFactory,
  BaseLookupToDataExtractorBindingBuilder,
} from "../../../../src";

describe("BaseNodesArrayDataMapperBuilder class", () => {
  let lookupBuilder: BaseNodesArrayLookupBuilder<Node[] | undefined>;
  let dataMapperBuilder: BaseNodesArrayDataMapperBuilder<Node[] | undefined>;

  beforeEach(() => {
    lookupBuilder = new BaseNodesArrayLookupBuilder<Node[] | undefined>(
      "//List/Item"
    );
    dataMapperBuilder = new BaseNodesArrayDataMapperBuilder<Node[] | undefined>(
      lookupBuilder
    );
  });

  describe("ofBooleans() method", () => {
    it("should return instance of BaseNodesArrayBindingBuilder", () => {
      expect(dataMapperBuilder.ofBooleans()).toBeInstanceOf(
        BaseLookupToDataExtractorBindingBuilder
      );
    });
  });

  describe("ofNumbers() method", () => {
    it("should return instance of BaseNodesArrayBindingBuilder", () => {
      expect(dataMapperBuilder.ofNumbers()).toBeInstanceOf(
        BaseLookupToDataExtractorBindingBuilder
      );
    });
  });

  describe("ofStrings() method", () => {
    it("should return instance of BaseNodesArrayBindingBuilder", () => {
      expect(dataMapperBuilder.ofStrings()).toBeInstanceOf(
        BaseLookupToDataExtractorBindingBuilder
      );
    });
  });

  describe("ofObjects() method", () => {
    it("should take ObjectBlueprint and return instance of BaseNodesArrayBindingBuilder", () => {
      expect(
        dataMapperBuilder.ofObjects({
          title: () => "",
        })
      ).toBeInstanceOf(BaseLookupToDataExtractorBindingBuilder);
    });
  });

  describe("ofRecursiveObjects() method", () => {
    it("should take RecursiveObjectFactory and return instance of BaseNodesArrayBindingBuilder", () => {
      expect(
        dataMapperBuilder.ofRecursiveObjects(() => ({ title: () => "" }))
      ).toBeInstanceOf(BaseLookupToDataExtractorBindingBuilder);
    });
  });

  describe("usingMapper() method", () => {
    it("should take SingleNodeDataExtractorFn callback and return instance of BaseNodesArrayBindingBuilder", () => {
      expect(
        dataMapperBuilder.usingMapper(
          new StringExtractorFactory().createNodeDataExtractor()
        )
      ).toBeInstanceOf(BaseLookupToDataExtractorBindingBuilder);
    });

    it("should take SingleNodeDataExtractorFnFactory and return instance of BaseNodesArrayBindingBuilder", () => {
      expect(
        dataMapperBuilder.usingMapper(new StringExtractorFactory())
      ).toBeInstanceOf(BaseLookupToDataExtractorBindingBuilder);
    });
  });
});
