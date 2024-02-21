import { beforeEach, describe, expect, it } from "vitest";
import xpath from "xpath";
import {
  AnyNodesArrayLookupFactory,
  AttributesArrayLookupFactory,
  BaseNodesArrayBindingBuilder,
  BaseNodesArrayDataMapperBuilder,
  BaseNodesArrayLookupBuilder,
  ElementsArrayLookupFactory,
  type NodesArrayDataExtractorFn,
  type NodesArrayDataExtractorFnFactory,
} from "../../../../src";
import { parseXml } from "../../../helper/parseXml";

describe("BaseNodesArrayLookupBuilder class", () => {
  const xml = `
<Root>
    <List>
        <Item id="id1">1</Item>
        <Item id="id2">2</Item>
        <Item id="id3">3</Item>
    </List>
</Root>
  `;
  let doc: Document;
  const xs = xpath.select;
  let anyNodesArrayLookupFactory: AnyNodesArrayLookupFactory;
  let elementsArrayLookupFactory: ElementsArrayLookupFactory;
  let attributesArrayLookupFactory: AttributesArrayLookupFactory;
  const textNodesPath = "//List/Item/text()";
  const elementsPath = "//List/Item";
  const attributesPath = "//List/Item/@id";
  let textNodesLookupBuilder: BaseNodesArrayLookupBuilder<Node[] | undefined>;
  let elementsArrayLookupBuilder: BaseNodesArrayLookupBuilder<
    Element[] | undefined
  >;
  let attributesArrayLookupBuilder: BaseNodesArrayLookupBuilder<
    Attr[] | undefined
  >;
  const pathToNotExistingNodes = "//NotExisting";
  let unsuccessfulLookupBuilder: BaseNodesArrayLookupBuilder<
    Node[] | undefined
  >;

  beforeEach(() => {
    doc = parseXml(xml);
    anyNodesArrayLookupFactory = new AnyNodesArrayLookupFactory();
    elementsArrayLookupFactory = new ElementsArrayLookupFactory();
    attributesArrayLookupFactory = new AttributesArrayLookupFactory();
    textNodesLookupBuilder = new BaseNodesArrayLookupBuilder<
      Node[] | undefined
    >(anyNodesArrayLookupFactory, textNodesPath);
    elementsArrayLookupBuilder = new BaseNodesArrayLookupBuilder<
      Element[] | undefined
    >(elementsArrayLookupFactory, elementsPath);
    attributesArrayLookupBuilder = new BaseNodesArrayLookupBuilder<
      Attr[] | undefined
    >(attributesArrayLookupFactory, attributesPath);
    unsuccessfulLookupBuilder = new BaseNodesArrayLookupBuilder<
      Node[] | undefined
    >(anyNodesArrayLookupFactory, pathToNotExistingNodes);
  });

  describe("mandatory() method", () => {
    it("should return new instance of BaseNodesArrayLookupBuilder, that returns NodesArrayLookupFn callback, that throws RangeError, when nodes was not found", () => {
      const mandatory = unsuccessfulLookupBuilder.mandatory();
      expect(mandatory).toBeInstanceOf(BaseNodesArrayLookupBuilder);
      expect(mandatory).not.toBe(unsuccessfulLookupBuilder);
      const lookupFn = mandatory.buildNodesArrayLookup();
      expect(() => lookupFn(doc, xs)).toThrow(RangeError);
    });
  });

  describe("optional() method", () => {
    it("should return new instance of BaseNodesArrayLookupBuilder, that returns NodesArrayLookupFn callback, that returns undefined, when nodes was not found", () => {
      const optional = unsuccessfulLookupBuilder.mandatory().optional();
      expect(optional).toBeInstanceOf(BaseNodesArrayLookupBuilder);
      expect(optional).not.toBe(unsuccessfulLookupBuilder);
      const lookupFn = optional.buildNodesArrayLookup();
      expect(lookupFn(doc, xs)).toBeUndefined();
    });
  });

  describe("asArray() method", () => {
    it("should return instance of BaseNodesArrayDataMapperBuilder instance", () => {
      expect(elementsArrayLookupBuilder.asArray()).toBeInstanceOf(
        BaseNodesArrayDataMapperBuilder
      );
    });
  });

  describe("callback() method", () => {
    it("should take NodesArrayDataExtractorFn callback and return instance of BaseNodesArrayBindingBuilder", () => {
      expect(
        textNodesLookupBuilder.callback((nodes: Node[]) => {
          nodes.map((node) => node.nodeType);
        })
      ).toBeInstanceOf(BaseNodesArrayBindingBuilder);
    });

    it("should take NodesArrayDataExtractorFnFactory callback and return instance of BaseNodesArrayBindingBuilder", () => {
      const factory: NodesArrayDataExtractorFnFactory<string> = {
        createNodesArrayDataExtractor(): NodesArrayDataExtractorFn<string> {
          return (nodes: Node[]) =>
            nodes.map((node) => node.nodeType).join(", ");
        },
      };
      expect(attributesArrayLookupBuilder.callback(factory)).toBeInstanceOf(
        BaseNodesArrayBindingBuilder
      );
    });
  });
});
