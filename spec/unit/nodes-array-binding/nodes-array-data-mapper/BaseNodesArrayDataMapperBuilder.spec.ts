import { beforeEach, describe, expect, it } from "vitest";
import {
  BaseNodesArrayBindingBuilder,
  BaseNodesArrayDataMapperBuilder,
  BaseNodesArrayLookupBuilder,
  ElementsArrayLookupFactory,
  StringExtractorFactory,
} from "../../../../src";

describe("BaseNodesArrayDataMapperBuilder class", () => {
  let lookupBuilder: BaseNodesArrayLookupBuilder<Element[] | undefined>;
  let dataMapperBuilder: BaseNodesArrayDataMapperBuilder<Element[] | undefined>;

  beforeEach(() => {
    lookupBuilder = new BaseNodesArrayLookupBuilder<Element[] | undefined>(
      new ElementsArrayLookupFactory(),
      "//List/Item"
    );
    dataMapperBuilder = new BaseNodesArrayDataMapperBuilder<
      Element[] | undefined
    >(lookupBuilder);
  });

  describe("ofBooleans() method", () => {
    it("should return instance of BaseNodesArrayBindingBuilder", () => {
      expect(dataMapperBuilder.ofBooleans()).toBeInstanceOf(
        BaseNodesArrayBindingBuilder
      );
    });
  });

  describe("ofNumbers() method", () => {
    it("should return instance of BaseNodesArrayBindingBuilder", () => {
      expect(dataMapperBuilder.ofNumbers()).toBeInstanceOf(
        BaseNodesArrayBindingBuilder
      );
    });
  });

  describe("ofStrings() method", () => {
    it("should return instance of BaseNodesArrayBindingBuilder", () => {
      expect(dataMapperBuilder.ofStrings()).toBeInstanceOf(
        BaseNodesArrayBindingBuilder
      );
    });
  });

  describe("ofObjects() method", () => {
    it("should take ObjectBlueprint and return instance of BaseNodesArrayBindingBuilder", () => {
      expect(
        dataMapperBuilder.ofObjects({
          title: () => "",
        })
      ).toBeInstanceOf(BaseNodesArrayBindingBuilder);
    });
  });

  describe("ofRecursiveObjects() method", () => {
    it("should take RecursiveObjectFactory and return instance of BaseNodesArrayBindingBuilder", () => {
      expect(
        dataMapperBuilder.ofRecursiveObjects(() => ({ title: () => "" }))
      ).toBeInstanceOf(BaseNodesArrayBindingBuilder);
    });
  });

  describe("usingMapper() method", () => {
    it("should take SingleNodeDataExtractorFn callback and return instance of BaseNodesArrayBindingBuilder", () => {
      expect(
        dataMapperBuilder.usingMapper(
          new StringExtractorFactory().createNodeDataExtractor()
        )
      ).toBeInstanceOf(BaseNodesArrayBindingBuilder);
    });

    it("should take SingleNodeDataExtractorFnFactory and return instance of BaseNodesArrayBindingBuilder", () => {
      expect(
        dataMapperBuilder.usingMapper(new StringExtractorFactory())
      ).toBeInstanceOf(BaseNodesArrayBindingBuilder);
    });
  });
});
