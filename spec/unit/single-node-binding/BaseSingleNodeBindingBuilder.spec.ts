import { beforeEach, describe, expect, it } from "vitest";
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
});
