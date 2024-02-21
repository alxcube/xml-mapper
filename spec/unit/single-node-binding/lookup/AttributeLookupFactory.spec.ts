import { beforeEach, describe, expect, it } from "vitest";
import xpath from "xpath";
import { AttributeLookupFactory } from "../../../../src";
import { parseXml } from "../../../helper/parseXml";

describe("AttributeLookupFactory class", () => {
  const xml = `
<Root>
    <Element attribute="1">
        Text Node
    </Element>
</Root>
  `;
  let factory: AttributeLookupFactory;
  let doc: Document;
  const xs = xpath.select;

  beforeEach(() => {
    factory = new AttributeLookupFactory();
    doc = parseXml(xml);
  });

  describe("createSingleNodeLookup() method", () => {
    it("should return function that returns Attr", () => {
      const singleNodeLookup = factory.createSingleNodeLookup(
        "//Element/@attribute"
      );
      const attr = singleNodeLookup(doc, xs);
      expect(attr).toBeAttr();
    });

    it("should return function that returns undefined, when xpath expression not founds attribute", () => {
      expect(
        factory.createSingleNodeLookup("//Element/@unknown-attr")(doc, xs)
      ).toBeUndefined();
    });

    it("should return function that throws TypeError, when xpath expression returns type, other than Attr, null (undefined)", () => {
      const lookup = factory.createSingleNodeLookup("//Element");
      expect(() => lookup(doc, xs)).toThrow(TypeError);
    });
  });
});
