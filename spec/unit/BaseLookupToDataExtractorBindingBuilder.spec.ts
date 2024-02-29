import { beforeEach, describe, expect, it, vi } from "vitest";
import xpath from "xpath";
import {
  BaseNodesArrayLookupBuilder,
  BaseSingleNodeLookupBuilder,
  CustomDataExtractorFactory,
  MappingError,
  type NodesArrayDataExtractorFnFactory,
  NodesArrayDataMapper,
  type NodesArrayLookupBuilder,
  type SingleNodeDataExtractorFnFactory,
  type SingleNodeLookupBuilder,
  StringExtractorFactory,
} from "../../src";
import { BaseLookupToDataExtractorBindingBuilder } from "../../src";
import { parseXml } from "../helper/parseXml";

describe("BaseLookupToDataExtractorBindingBuilder class", () => {
  const xml = `
<Root>
    <Element attribute="element attribute">Element content</Element>
    <List>
        <Item id="id1">1</Item>
        <Item id="id2">2</Item>
        <Item id="id3">3</Item>    
    </List>
</Root>
  `;

  let doc: Document;
  const xs = xpath.select;
  let textNodeLookup: SingleNodeLookupBuilder<Node | undefined>;
  let elementLookup: SingleNodeLookupBuilder<Node | undefined>;
  let attributeLookup: SingleNodeLookupBuilder<Node | undefined>;
  let textNodesArrayLookup: NodesArrayLookupBuilder<Node[] | undefined>;
  let elementsArrayLookup: NodesArrayLookupBuilder<Node[] | undefined>;
  let attributesArrayLookup: NodesArrayLookupBuilder<Node[] | undefined>;
  let unsuccessfulLookup: SingleNodeLookupBuilder<Node | undefined>;
  let unsuccessfulArrayLookup: NodesArrayLookupBuilder<Node[] | undefined>;
  let stringDataExtractorFactory: SingleNodeDataExtractorFnFactory<string>;
  let stringArrayMapper: NodesArrayDataMapper<string>;
  let textNodeBinding: BaseLookupToDataExtractorBindingBuilder<
    SingleNodeLookupBuilder<Node | undefined>,
    Node | undefined,
    string,
    SingleNodeDataExtractorFnFactory<string>
  >;
  let elementBinding: BaseLookupToDataExtractorBindingBuilder<
    SingleNodeLookupBuilder<Node | undefined>,
    Element | undefined,
    string,
    SingleNodeDataExtractorFnFactory<string>
  >;
  let attributeBinding: BaseLookupToDataExtractorBindingBuilder<
    SingleNodeLookupBuilder<Node | undefined>,
    Attr | undefined,
    string,
    SingleNodeDataExtractorFnFactory<string>
  >;
  let textNodesBinding: BaseLookupToDataExtractorBindingBuilder<
    NodesArrayLookupBuilder<Node[] | undefined>,
    Node[] | undefined,
    string[],
    NodesArrayDataExtractorFnFactory<string[]>
  >;
  let elementsBinding: BaseLookupToDataExtractorBindingBuilder<
    NodesArrayLookupBuilder<Node[] | undefined>,
    Element[] | undefined,
    string[],
    NodesArrayDataExtractorFnFactory<string[]>
  >;
  let attributesBinding: BaseLookupToDataExtractorBindingBuilder<
    NodesArrayLookupBuilder<Node[] | undefined>,
    Attr[] | undefined,
    string[],
    NodesArrayDataExtractorFnFactory<string[]>
  >;
  let emptySingleNodeBinding: BaseLookupToDataExtractorBindingBuilder<
    SingleNodeLookupBuilder<Node | undefined>,
    Node | undefined,
    string,
    SingleNodeDataExtractorFnFactory<string>
  >;
  let emptyNodesArrayBinding: BaseLookupToDataExtractorBindingBuilder<
    NodesArrayLookupBuilder<Node[] | undefined>,
    Node[] | undefined,
    string[],
    NodesArrayDataExtractorFnFactory<string[]>
  >;

  beforeEach(() => {
    doc = parseXml(xml);
    textNodeLookup = new BaseSingleNodeLookupBuilder("/Root/Element/text()");
    elementLookup = new BaseSingleNodeLookupBuilder("/Root/Element");
    attributeLookup = new BaseSingleNodeLookupBuilder(
      "/Root/Element/@attribute"
    );
    textNodesArrayLookup = new BaseNodesArrayLookupBuilder(
      "/Root/List/Item/text()"
    );
    elementsArrayLookup = new BaseNodesArrayLookupBuilder("/Root/List/Item");
    attributesArrayLookup = new BaseNodesArrayLookupBuilder(
      "/Root/List/Item/@id"
    );
    unsuccessfulLookup = new BaseSingleNodeLookupBuilder(
      "/Path/To/Missing/Node"
    );
    unsuccessfulArrayLookup = new BaseNodesArrayLookupBuilder(
      "/Path/To/Missing/Nodes"
    );
    stringDataExtractorFactory = new StringExtractorFactory();
    stringArrayMapper = new NodesArrayDataMapper<string>(
      stringDataExtractorFactory
    );

    textNodeBinding = new BaseLookupToDataExtractorBindingBuilder(
      textNodeLookup,
      stringDataExtractorFactory
    );
    elementBinding = new BaseLookupToDataExtractorBindingBuilder(
      elementLookup,
      stringDataExtractorFactory
    );
    attributeBinding = new BaseLookupToDataExtractorBindingBuilder(
      attributeLookup,
      stringDataExtractorFactory
    );
    textNodesBinding = new BaseLookupToDataExtractorBindingBuilder(
      textNodesArrayLookup,
      stringArrayMapper
    );
    elementsBinding = new BaseLookupToDataExtractorBindingBuilder(
      elementsArrayLookup,
      stringArrayMapper
    );
    attributesBinding = new BaseLookupToDataExtractorBindingBuilder(
      attributesArrayLookup,
      stringArrayMapper
    );
    emptySingleNodeBinding = new BaseLookupToDataExtractorBindingBuilder(
      unsuccessfulLookup,
      stringDataExtractorFactory
    );
    emptyNodesArrayBinding = new BaseLookupToDataExtractorBindingBuilder(
      unsuccessfulArrayLookup,
      stringArrayMapper
    );
  });

  describe("createNodeDataExtractor() method", () => {
    it("should return SingleNodeDataExtractorFn (function)", () => {
      [
        textNodeBinding,
        elementBinding,
        attributeBinding,
        textNodesBinding,
        elementsBinding,
        attributesBinding,
        emptySingleNodeBinding,
        emptyNodesArrayBinding,
      ].forEach((builder) => {
        expect(builder.createNodeDataExtractor()).toBeTypeOf("function");
      });
    });

    it("should throw MappingError, when given SingleNodeLookupBuilder and NodesArrayDataExtractorFnFactory", () => {
      const errorBinding = new BaseLookupToDataExtractorBindingBuilder(
        elementLookup,
        // @ts-expect-error testing error case
        stringArrayMapper
      );
      expect(() => errorBinding.createNodeDataExtractor()).toThrow(
        MappingError
      );
    });

    it("should throw MappingError, when given NodesArrayLookupBuilder and SingleNodeDataExtractorFnFactory", () => {
      const errorBinding = new BaseLookupToDataExtractorBindingBuilder(
        elementsArrayLookup,
        // @ts-expect-error testing error case
        stringDataExtractorFactory
      );
      expect(() => errorBinding.createNodeDataExtractor()).toThrow(
        MappingError
      );
    });
  });

  describe("named() method", () => {
    it("should return new instance of BaseLookupToDataExtractorBindingBuilder", () => {
      [
        textNodeBinding,
        elementBinding,
        attributeBinding,
        textNodesBinding,
        elementsBinding,
        attributesBinding,
        emptySingleNodeBinding,
        emptyNodesArrayBinding,
      ].forEach((builder) => {
        const named = builder.named("BindingName");
        expect(named).toBeInstanceOf(BaseLookupToDataExtractorBindingBuilder);
        expect(named).not.toBe(builder);
      });
    });
  });

  describe("withDefault() method", () => {
    it("should return new instance of BaseLookupToDataExtractorBindingBuilder", () => {
      [
        textNodeBinding,
        elementBinding,
        attributeBinding,
        emptySingleNodeBinding,
      ].forEach((builder) => {
        const named = builder.withDefault("string");
        expect(named).toBeInstanceOf(BaseLookupToDataExtractorBindingBuilder);
        expect(named).not.toBe(builder);
      });

      [
        textNodesBinding,
        elementsBinding,
        attributesBinding,
        emptyNodesArrayBinding,
      ].forEach((builder) => {
        const named = builder.withDefault(["string"]);
        expect(named).toBeInstanceOf(BaseLookupToDataExtractorBindingBuilder);
        expect(named).not.toBe(builder);
      });
    });
  });

  describe("withConversion() method", () => {
    it("should return new instance of BaseLookupToDataExtractorBindingBuilder", () => {
      [
        textNodeBinding,
        elementBinding,
        attributeBinding,
        emptySingleNodeBinding,
      ].forEach((builder) => {
        const named = builder.withConversion(parseFloat);
        expect(named).toBeInstanceOf(BaseLookupToDataExtractorBindingBuilder);
        expect(named).not.toBe(builder);
      });

      [
        textNodesBinding,
        elementsBinding,
        attributesBinding,
        emptyNodesArrayBinding,
      ].forEach((builder) => {
        const named = builder.withConversion((strings) =>
          strings.map(parseFloat)
        );
        expect(named).toBeInstanceOf(BaseLookupToDataExtractorBindingBuilder);
        expect(named).not.toBe(builder);
      });
    });
  });

  describe("Produced SingleNodeDataExtractorFn", () => {
    it("should return expected result", () => {
      expect(textNodeBinding.createNodeDataExtractor()(doc, xs)).toBe(
        "Element content"
      );
      expect(elementBinding.createNodeDataExtractor()(doc, xs)).toBe(
        "Element content"
      );
      expect(attributeBinding.createNodeDataExtractor()(doc, xs)).toBe(
        "element attribute"
      );
      expect(textNodesBinding.createNodeDataExtractor()(doc, xs)).toEqual([
        "1",
        "2",
        "3",
      ]);
      expect(elementsBinding.createNodeDataExtractor()(doc, xs)).toEqual([
        "1",
        "2",
        "3",
      ]);
      expect(attributesBinding.createNodeDataExtractor()(doc, xs)).toEqual([
        "id1",
        "id2",
        "id3",
      ]);
      expect(
        emptySingleNodeBinding.createNodeDataExtractor()(doc, xs)
      ).toBeUndefined();
      expect(
        emptyNodesArrayBinding.createNodeDataExtractor()(doc, xs)
      ).toBeUndefined();
    });

    it("should return converted value, when conversion callback was given", () => {
      const binding = elementBinding.withConversion((val) => val.length);
      expect(binding.createNodeDataExtractor()(doc, xs)).toBe(15);
    });

    it("should return undefined, when lookup returns undefined", () => {
      expect(
        emptyNodesArrayBinding.createNodeDataExtractor()(doc, xs)
      ).toBeUndefined();
      expect(
        emptySingleNodeBinding.createNodeDataExtractor()(doc, xs)
      ).toBeUndefined();
    });

    it("should return default value, when lookup returns undefined and default value was given", () => {
      expect(
        emptySingleNodeBinding
          .withDefault("fallback")
          .createNodeDataExtractor()(doc, xs)
      ).toBe("fallback");
      expect(
        emptyNodesArrayBinding
          .withDefault(["fall", "back"])
          .createNodeDataExtractor()(doc, xs)
      ).toEqual(["fall", "back"]);
    });

    it("should return default value, when data extractor returns undefined", () => {
      const binding = new BaseLookupToDataExtractorBindingBuilder(
        elementLookup,
        new CustomDataExtractorFactory((node) => {
          if (node.nodeValue === "it definitely is not equal") {
            return String(node.nodeValue);
          }
        })
      ).withDefault("fallback");

      expect(binding.createNodeDataExtractor()(doc, xs)).toBe("fallback");
    });

    it("should return undefined, when lookup returns undefined and default value was set and then dropped by setting conversion callback", () => {
      expect(
        emptySingleNodeBinding
          .withDefault("fallback")
          .withConversion((str) => str.length)
          .createNodeDataExtractor()(doc, xs)
      ).toBeUndefined();
    });

    it("should return default value, set after setting conversion callback, when lookup returns undefined", () => {
      expect(
        emptySingleNodeBinding
          .withDefault("fallback")
          .withConversion((str) => str.length)
          .withDefault(0)
          .createNodeDataExtractor()(doc, xs)
      ).toBe(0);
    });

    it("should return default value, when conversion callback returns undefined", () => {
      const binding = attributeBinding
        .withConversion((val) => {
          if (/^-?\d+$/.test(val)) {
            return parseInt(val);
          }
        })
        .withDefault(999);

      expect(binding.createNodeDataExtractor()(doc, xs)).toBe(999);
    });

    it("should throw error, containing binding name, when error occurs in lookup", () => {
      const errorBinding = new BaseLookupToDataExtractorBindingBuilder(
        unsuccessfulLookup.mandatory(),
        stringDataExtractorFactory,
        undefined,
        undefined,
        "Binding Name"
      );
      expect(() => errorBinding.createNodeDataExtractor()(doc, xs)).toThrow(
        "Binding Name"
      );
    });

    it("should throw error, containing binding name, when error occurs in data extractor factory", () => {
      vi.spyOn(
        stringDataExtractorFactory,
        "createNodeDataExtractor"
      ).mockImplementation(() => {
        throw "test error";
      });
      expect(() =>
        elementBinding.named("Binding Name").createNodeDataExtractor()(doc, xs)
      ).toThrow("Binding Name");
    });

    it("should throw error, containing binding name, when error occurs in conversion callback", () => {
      const binding = elementBinding
        .named("Binding Name")
        .withConversion(() => {
          throw "test error";
        });
      expect(() => binding.createNodeDataExtractor()(doc, xs)).toThrow(
        "Binding Name"
      );
    });
  });
});
