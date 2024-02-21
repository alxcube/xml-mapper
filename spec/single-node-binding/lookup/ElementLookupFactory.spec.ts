import { beforeEach, describe, expect, it } from "vitest";
import xpath from "xpath";
import { ElementLookupFactory } from "../../../src";
import { parseXml } from "../../helper/parseXml";

describe("ElementLookupFactory class", () => {
  const xml = `
<Root>
    <Element attribute="1">
        Text Node
    </Element>
</Root>
  `;
  let factory: ElementLookupFactory;
  let doc: Document;
  const xs = xpath.select;

  beforeEach(() => {
    factory = new ElementLookupFactory();
    doc = parseXml(xml);
  });

  describe("createSingleNodeLookup() method", () => {
    it("should return function that returns Element", () => {
      const singleNodeLookup = factory.createSingleNodeLookup("//Element");
      const element = singleNodeLookup(doc, xs);
      expect(element).toBeElement();
    });

    it("should return function that returns undefined, when xpath expression not founds element", () => {
      expect(
        factory.createSingleNodeLookup("//NodeThatDoesntExist")(doc, xs)
      ).toBeUndefined();
    });

    it("should return function that throws TypeError, when xpath expression returns type, other than Element, null (undefined)", () => {
      const lookup = factory.createSingleNodeLookup("//Element/@attribute");
      expect(() => lookup(doc, xs)).toThrow(TypeError);
    });
  });
});
