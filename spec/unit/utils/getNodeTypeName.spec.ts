import { beforeEach, describe, expect, it } from "vitest";
import { getNodeTypeName } from "../../../src";
import { parseXml } from "../../helper/parseXml";
import xpath from "xpath";

describe("getNodeTypeName() function", () => {
  let doc: Document;
  const xml = `
<RootNode id="root">
  <!-- comment #1 -->
  <!-- comment #2 -->
  Text
  <!-- comment #3 -->
</RootNode>
`;

  beforeEach(() => {
    doc = parseXml(xml);
  });

  it("should return 'Document' for document node", () => {
    expect(getNodeTypeName(doc)).toBe("Document");
  });

  it("should return 'Element' for element node", () => {
    const element = xpath.select("/RootNode", doc, true) as Node;
    expect(getNodeTypeName(element)).toBe("Element");
  });

  it("should return 'Attr' for attribute node", () => {
    const attr = xpath.select("/RootNode/@id", doc, true) as Node;
    expect(getNodeTypeName(attr)).toBe("Attr");
  });

  it("should return 'Text' for text node", () => {
    const text = xpath.select("/RootNode/text()[1]", doc, true) as Node;
    expect(getNodeTypeName(text)).toBe("Text");
  });

  it("should return 'Comment' for comment node", () => {
    const comment = xpath.select("/RootNode/comment()[1]", doc, true) as Node;
    expect(getNodeTypeName(comment)).toBe("Comment");
  });
});
