import { beforeEach, describe, expect, it } from "vitest";
import xpath from "xpath";
import { AnyNodeLookupFactory } from "../../../../src";
import { parseXml } from "../../../helper/parseXml";

describe("AnyNodeLookupFactory class", () => {
  const xml = `
<Root>
    <Element attribute="1">
        Text Node
        <!-- comment -->
    </Element>
</Root>
  `;
  let factory: AnyNodeLookupFactory;
  let doc: Document;
  const xs = xpath.select;

  beforeEach(() => {
    factory = new AnyNodeLookupFactory();
    doc = parseXml(xml);
  });

  describe("createSingleNodeLookup() method", () => {
    it("should return function that returns Element", () => {
      const singleNodeLookup = factory.createSingleNodeLookup("//Element");
      const element = singleNodeLookup(doc, xs);
      expect(element).toBeElement();
    });

    it("should return function that returns Attr", () => {
      const singleNodeLookup = factory.createSingleNodeLookup(
        "//Element/@attribute"
      );
      const attr = singleNodeLookup(doc, xs);
      expect(attr).toBeAttr();
    });

    it("should return function that returns Text", () => {
      const singleNodeLookup = factory.createSingleNodeLookup(
        "//Element/text()[1]"
      );
      const text = singleNodeLookup(doc, xs);
      expect(text).toBeTextNode();
    });

    it("should return function that returns Comment", () => {
      const singleNodeLookup = factory.createSingleNodeLookup(
        "//Element/comment()[1]"
      );
      const comment = singleNodeLookup(doc, xs);
      expect(comment).toBeCommentNode();
    });

    it("should return function that returns undefined, when xpath expression not founds node", () => {
      expect(
        factory.createSingleNodeLookup("//NodeThatDoesntExist")(doc, xs)
      ).toBeUndefined();

      expect(
        factory.createSingleNodeLookup("//Element/@attr-that-doesnt-exist")(
          doc,
          xs
        )
      ).toBeUndefined();
    });

    it("should return function that throws TypeError, when xpath expression returns type, other than Node, null (undefined)", () => {
      const lookup = factory.createSingleNodeLookup("string(//Element)");
      expect(() => lookup(doc, xs)).toThrow(TypeError);
    });
  });
});
