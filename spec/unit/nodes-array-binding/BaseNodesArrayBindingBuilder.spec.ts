import { beforeEach, describe, expect, it } from "vitest";
import xpath from "xpath";
import {
  BaseNodesArrayBindingBuilder,
  BaseNodesArrayLookupBuilder,
  ElementsArrayLookupFactory,
  NodesArrayDataMapper,
  type NodesArrayLookupBuilder,
  StringExtractorFactory,
} from "../../../src";
import { parseXml } from "../../helper/parseXml";

describe("BaseNodesArrayBindingBuilder class", () => {
  const xml = `
<List>
    <Item>1</Item>
    <Item>2</Item>
    <Item>3</Item>
</List>  
  `;
  let doc: Document;
  const xs = xpath.select;
  let successfulLookup: NodesArrayLookupBuilder<Element[]>;
  let unsucessfulLookup: NodesArrayLookupBuilder<Element[] | undefined>;

  beforeEach(() => {
    doc = parseXml(xml);
    successfulLookup = new BaseNodesArrayLookupBuilder(
      new ElementsArrayLookupFactory(),
      "/List/Item"
    ) as NodesArrayLookupBuilder<Element[]>;
    unsucessfulLookup = new BaseNodesArrayLookupBuilder(
      new ElementsArrayLookupFactory(),
      "//ElementThatDoesntExist"
    );
  });

  describe("createNodeDataExtractor() method", () => {
    it("should return NodesArrayDataExtractorFn function", () => {
      const binding = new BaseNodesArrayBindingBuilder(
        successfulLookup,
        new NodesArrayDataMapper(new StringExtractorFactory())
      );
      const dataExtractor = binding.createNodeDataExtractor();
      expect(dataExtractor).toBeTypeOf("function");
      expect(dataExtractor(doc, xs)).toEqual(["1", "2", "3"]);
    });
  });

  describe("named() method", () => {
    it("should create new instance of BaseNodesArrayBindingBuilder that includes binding name in errors, thrown in produced SingleNodeDataExtractorFn", () => {
      const binding = new BaseNodesArrayBindingBuilder(
        unsucessfulLookup.mandatory(),
        new NodesArrayDataMapper(new StringExtractorFactory())
      );
      const named = binding.named("NamedBinding");
      expect(named).toBeInstanceOf(BaseNodesArrayBindingBuilder);
      const dataExtractor = named.createNodeDataExtractor();
      expect(() => dataExtractor(doc, xs)).toThrow("NamedBinding");
    });
  });

  describe("withDefault() method", () => {
    it("should create new instance of BaseNodesArrayBindingBuilder that creates SingleNodeDataExtractorFn, which return given default value, when lookup returns undefined", () => {
      const binding = new BaseNodesArrayBindingBuilder(
        unsucessfulLookup,
        new NodesArrayDataMapper(new StringExtractorFactory())
      );
      const withDefault = binding.withDefault(["5", "6", "7"]);
      expect(withDefault).toBeInstanceOf(BaseNodesArrayBindingBuilder);
      const dataExtractor = withDefault.createNodeDataExtractor();
      expect(dataExtractor(doc, xs)).toEqual(["5", "6", "7"]);
    });
  });
});
