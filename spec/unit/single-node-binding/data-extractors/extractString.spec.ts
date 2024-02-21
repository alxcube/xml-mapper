import { beforeEach, describe, expect, it } from "vitest";
import xpath from "xpath";
import { extractString } from "../../../../src";
import { parseXml } from "../../../helper/parseXml";

describe("extractString() function", () => {
  const xml = `
<Root>
    <ElementWithStringContent>Element with string content</ElementWithStringContent>
    <ElementWithNoContent></ElementWithNoContent>
    <AttributeWithString value="Attribute with string" />
    <EmptyElement/>
    <ElementWithTextNode>Text node</ElementWithTextNode>
    <!-- Comment node -->
</Root>
  `;

  const xs = xpath.select;
  let doc: Document;

  beforeEach(() => {
    doc = parseXml(xml);
  });

  it("should return element text content", () => {
    const el = xs("//ElementWithStringContent", doc, true) as Element;
    expect(extractString(el, xs)).toBe("Element with string content");
  });

  it("should return empty string when element has no content", () => {
    const el = xs("//ElementWithNoContent", doc, true) as Element;
    expect(extractString(el, xs)).toBe("");
  });

  it("should return attribute value string", () => {
    const attr = xs("//AttributeWithString/@value", doc, true) as Attr;
    expect(extractString(attr, xs)).toBe("Attribute with string");
  });

  it("should return empty string when element is self-closing", () => {
    const el = xs("//EmptyElement", doc, true) as Element;
    expect(extractString(el, xs)).toBe("");
  });

  it("should return text node content", () => {
    const text = xs("//ElementWithTextNode/text()[1]", doc, true) as Text;
    expect(extractString(text, xs)).toMatch("Text node");
  });

  it("should return comment node content", () => {
    const comment = xs("/Root/comment()[1]", doc, true) as Comment;
    expect(extractString(comment, xs)).toMatch("Comment node");
  });
});
