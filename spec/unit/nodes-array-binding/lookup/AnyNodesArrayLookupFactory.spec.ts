import { beforeEach, describe, expect, it } from "vitest";
import xpath from "xpath";
import { AnyNodesArrayLookupFactory } from "../../../../src";
import { parseXml } from "../../../helper/parseXml";

describe("AnyNodesArrayLookupFactory class", () => {
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
  let factory: AnyNodesArrayLookupFactory;

  beforeEach(() => {
    doc = parseXml(xml);
    factory = new AnyNodesArrayLookupFactory();
  });

  describe("createNodesArrayLookup() method", () => {
    it("should return function that returns array of nodes", () => {
      const lookupFn = factory.createNodesArrayLookup("//List/Item/text()");
      const nodes = lookupFn(doc, xs);
      expect(Array.isArray(nodes)).toBe(true);
      expect(nodes?.length).toBe(3);
      nodes?.forEach((node) => expect(node).toBeTextNode());
    });

    it("should return function that returns undefined, when nodes was not found, using given xpath expression", () => {
      const lookupFn = factory.createNodesArrayLookup("//NotFound");
      expect(lookupFn(doc, xs)).toBeUndefined();
    });

    it("should return function that throws TypeError, when result, returned using given xpath expression returns other than array of nodes", () => {
      const lookupFn = factory.createNodesArrayLookup("string(//List/Item)");
      expect(() => lookupFn(doc, xs)).toThrow(TypeError);
    });
  });
});
