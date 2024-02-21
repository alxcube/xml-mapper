import { beforeEach, describe, expect, it } from "vitest";
import xpath from "xpath";
import { AttributesArrayLookupFactory } from "../../../../src";
import { parseXml } from "../../../helper/parseXml";

describe("AttributesArrayLookupFactory class", () => {
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
  let factory: AttributesArrayLookupFactory;

  beforeEach(() => {
    doc = parseXml(xml);
    factory = new AttributesArrayLookupFactory();
  });

  describe("createNodesArrayLookup() method", () => {
    it("should return function that returns array of Attr's", () => {
      const lookupFn = factory.createNodesArrayLookup("//List/Item/@id");
      const elements = lookupFn(doc, xs);
      expect(Array.isArray(elements)).toBe(true);
      expect(elements?.length).toBe(3);
      elements?.forEach((node) => expect(node).toBeAttr());
    });

    it("should return function that returns undefined, when attributes was not found, using given xpath expression", () => {
      const lookupFn = factory.createNodesArrayLookup("//List/Item/@name");
      expect(lookupFn(doc, xs)).toBeUndefined();
    });

    it("should return function that throws TypeError, when result, returned using given xpath expression returns other than array of Attr's", () => {
      const lookupFn = factory.createNodesArrayLookup("string(//List/Item)");
      expect(() => lookupFn(doc, xs)).toThrow(TypeError);
    });

    it("should return function that throws TypeError, when result, returned using given xpath expression returns array of nodes, other than Attr type", () => {
      const lookupFn = factory.createNodesArrayLookup("//List/Item/text()");
      expect(() => lookupFn(doc, xs)).toThrow(TypeError);
    });
  });
});
