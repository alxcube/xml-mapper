import { beforeEach, describe, expect, it, test } from "vitest";
import xpath from "xpath";
import {
  BaseSingleNodeBindingBuilder,
  BaseSingleNodeLookupBuilder,
  ElementLookupFactory,
  type SingleNodeLookupBuilder,
  StringExtractorFactory,
} from "../../../src";
import { parseXml } from "../../helper/parseXml";

describe("BaseSingleNodeBindingBuilder class", () => {
  const xml = `
<Root>
    <Element>Element content</Element>
</Root>  
  `;
  let doc: Document;
  const xs = xpath.select;
  let successfulLookup: SingleNodeLookupBuilder<Element>;
  let unsucessfulLookup: SingleNodeLookupBuilder<Element | undefined>;
  let stringExtractorFactory: StringExtractorFactory;

  beforeEach(() => {
    doc = parseXml(xml);
    successfulLookup = new BaseSingleNodeLookupBuilder(
      new ElementLookupFactory(),
      "/Root/Element"
    ) as SingleNodeLookupBuilder<Element>;
    unsucessfulLookup = new BaseSingleNodeLookupBuilder(
      new ElementLookupFactory(),
      "//ElementThatDoesntExist"
    );
    stringExtractorFactory = new StringExtractorFactory();
  });

  describe("createNodeDataExtractor() method", () => {
    it("should return SingleNodeDataExtractorFn function", () => {
      const binding = new BaseSingleNodeBindingBuilder(
        successfulLookup,
        stringExtractorFactory
      );
      const dataExtractor = binding.createNodeDataExtractor();
      expect(dataExtractor).toBeTypeOf("function");
      expect(dataExtractor(doc, xs)).toBe("Element content");
    });
  });

  describe("named() method", () => {
    it("should create new instance of BaseSingleNodeBindingBuilder that includes binding name in errors, thrown in produced SingleNodeDataExtractorFn", () => {
      const binding = new BaseSingleNodeBindingBuilder(
        unsucessfulLookup.mandatory(),
        stringExtractorFactory
      );
      const named = binding.named("NamedBinding");
      expect(named).toBeInstanceOf(BaseSingleNodeBindingBuilder);
      const dataExtractor = named.createNodeDataExtractor();
      expect(() => dataExtractor(doc, xs)).toThrow("NamedBinding");
    });
  });

  describe("withDefault() method", () => {
    it("should create new instance of BaseSingleNodeBindingBuilder that creates SingleNodeDataExtractorFn, which return given default value, when lookup returns undefined", () => {
      const binding = new BaseSingleNodeBindingBuilder(
        unsucessfulLookup,
        stringExtractorFactory
      );
      const withDefault = binding.withDefault("fallback");
      expect(withDefault).toBeInstanceOf(BaseSingleNodeBindingBuilder);
      const dataExtractor = withDefault.createNodeDataExtractor();
      expect(dataExtractor(doc, xs)).toBe("fallback");
    });
  });

  describe("withConversion() method", () => {
    it("should take given conversion callback and return new instance of BaseSingleNodeBindingBuilder that creates SingleNodeDataExtractorFn, which returns converted data extraction result", () => {
      const binding = new BaseSingleNodeBindingBuilder(
        successfulLookup,
        stringExtractorFactory
      );
      const withConversion = binding.withConversion(
        (str) => str.split(/\s+/).length
      );
      const dataExtractor = withConversion.createNodeDataExtractor();
      expect(dataExtractor(doc, xs)).toBe(2);
    });

    test("produced callback should return undefined when lookup returns undefined", () => {
      const dataExtractor = new BaseSingleNodeBindingBuilder(
        unsucessfulLookup,
        stringExtractorFactory
      )
        .withConversion((content) => content.length)
        .createNodeDataExtractor();
      expect(dataExtractor(doc, xs)).toBeUndefined();
    });

    it("should reset defaultValue, that was set before withConversion() call", () => {
      const dataExtractor = new BaseSingleNodeBindingBuilder(
        unsucessfulLookup,
        stringExtractorFactory
      )
        .withDefault("fallback")
        .withConversion((str) => str.length)
        .createNodeDataExtractor();
      expect(dataExtractor(doc, xs)).toBeUndefined();
    });

    it("should change accepted default value type", () => {
      const dataExtractor = new BaseSingleNodeBindingBuilder(
        unsucessfulLookup,
        stringExtractorFactory
      )
        .withDefault("fallback") // accepts string without typescript error
        .withConversion((str) => str.length)
        .withDefault(0) // accepts number without ts error
        .createNodeDataExtractor();
      expect(dataExtractor(doc, xs)).toBe(0);
    });
  });
});
