import { beforeEach, describe, expect, it } from "vitest";
import xpath from "xpath";
import { ElementsArrayLookupFactory } from "../../../../src";
import { parseXml } from "../../../helper/parseXml";

describe("ElementsArrayLookupFactory class", () => {
  const xml = `
<Root>
    <List>
        <Item>1</Item>
        <Item>2</Item>
        <Item>3</Item>
    </List>
</Root>
  `;
  let doc: Document;
  const xs = xpath.select;
  let factory: ElementsArrayLookupFactory;

  beforeEach(() => {
    doc = parseXml(xml);
    factory = new ElementsArrayLookupFactory();
  });

  describe("createNodesArrayLookup() method", () => {
    it("should return function that returns array of Element's", () => {
      const lookupFn = factory.createNodesArrayLookup("//List/Item");
      const elements = lookupFn(doc, xs);
      expect(Array.isArray(elements)).toBe(true);
      expect(elements?.length).toBe(3);
      elements?.forEach((node) => expect(node).toBeElement());
    });

    it("should return function that returns undefined, when elements was not found, using given xpath expression", () => {
      const lookupFn = factory.createNodesArrayLookup("//NotFound");
      expect(lookupFn(doc, xs)).toBeUndefined();
    });

    it("should return function that throws TypeError, when result, returned using given xpath expression returns other than array of Element's", () => {
      const lookupFn = factory.createNodesArrayLookup("string(//List/Item)");
      expect(() => lookupFn(doc, xs)).toThrow(TypeError);
    });

    it("should return function that throws TypeError, when result, returned using given xpath expression returns array of nodes, other than Element type", () => {
      const lookupFn = factory.createNodesArrayLookup("//List/Item/text()");
      expect(() => lookupFn(doc, xs)).toThrow(TypeError);
    });
  });
});
