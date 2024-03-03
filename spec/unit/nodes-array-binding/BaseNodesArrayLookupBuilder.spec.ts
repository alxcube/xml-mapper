import { beforeEach, describe, expect, it } from "vitest";
import xpath from "xpath";
import {
  BaseNodesArrayDataMapperBuilder,
  BaseNodesArrayLookupBuilder,
  type NodesArrayDataExtractorFn,
  type NodesArrayDataExtractorFnFactory,
} from "../../../src";
import { BaseLookupToDataExtractorBindingBuilder } from "../../../src";
import { parseXml } from "../../helper/parseXml";

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

  const textNodesPath = "//List/Item/text()";
  const elementsPath = "//List/Item";
  const attributesPath = "//List/Item/@id";
  let textNodesLookupBuilder: BaseNodesArrayLookupBuilder<Node[] | undefined>;
  let elementsArrayLookupBuilder: BaseNodesArrayLookupBuilder<
    Node[] | undefined
  >;
  let attributesArrayLookupBuilder: BaseNodesArrayLookupBuilder<
    Node[] | undefined
  >;
  const pathToNotExistingNodes = "//NotExisting";
  let unsuccessfulLookupBuilder: BaseNodesArrayLookupBuilder<
    Node[] | undefined
  >;

  beforeEach(() => {
    doc = parseXml(xml);

    textNodesLookupBuilder = new BaseNodesArrayLookupBuilder<
      Node[] | undefined
    >(textNodesPath);
    elementsArrayLookupBuilder = new BaseNodesArrayLookupBuilder<
      Node[] | undefined
    >(elementsPath);
    attributesArrayLookupBuilder = new BaseNodesArrayLookupBuilder<
      Node[] | undefined
    >(attributesPath);
    unsuccessfulLookupBuilder = new BaseNodesArrayLookupBuilder<
      Node[] | undefined
    >(pathToNotExistingNodes);
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
      ).toBeInstanceOf(BaseLookupToDataExtractorBindingBuilder);
    });

    it("should take NodesArrayDataExtractorFnFactory callback and return instance of BaseNodesArrayBindingBuilder", () => {
      const factory: NodesArrayDataExtractorFnFactory<string> = {
        createNodesArrayDataExtractor(): NodesArrayDataExtractorFn<string> {
          return (nodes: Node[]) =>
            nodes.map((node) => node.nodeType).join(", ");
        },
      };
      expect(attributesArrayLookupBuilder.callback(factory)).toBeInstanceOf(
        BaseLookupToDataExtractorBindingBuilder
      );
    });
  });

  describe("getPath() method", () => {
    it("should return xpath expression, used for nodes lookup", () => {
      expect(textNodesLookupBuilder.getPath()).toBe(textNodesPath);
      expect(attributesArrayLookupBuilder.getPath()).toBe(attributesPath);
      expect(elementsArrayLookupBuilder.getPath()).toBe(elementsPath);
    });
  });
});
