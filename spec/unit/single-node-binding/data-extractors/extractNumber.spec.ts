import { beforeEach, describe, expect, it } from "vitest";
import xpath from "xpath";
import { extractNumber } from "../../../../src";
import { parseXml } from "../../../helper/parseXml";

describe("extractNumber() function", () => {
  const xml = `
<Root>
    <ElementWithNumber>123</ElementWithNumber>
    <ElementWithNotNumber>Not a number</ElementWithNotNumber> 
    <AttributeWithNumber count="456" />
    <!-- 789 -->
</Root>
  `;
  const xs = xpath.select;

  let doc: Document;

  beforeEach(() => {
    doc = parseXml(xml);
  });

  it("should return number from element content", () => {
    const el = xs("//ElementWithNumber", doc, true) as Element;
    expect(extractNumber(el, xs)).toBe(123);
  });

  it("should return NaN when element content is not a number", () => {
    const el = xs("//ElementWithNotNumber", doc, true) as Element;
    expect(extractNumber(el, xs)).toBeNaN();
  });

  it("should return number from attribute", () => {
    const attr = xs("//AttributeWithNumber/@count", doc, true) as Attr;
    expect(extractNumber(attr, xs)).toBe(456);
  });

  it("should return number from comment", () => {
    const comment = xs("/Root/comment()[1]", doc, true) as Comment;
    expect(extractNumber(comment, xs)).toBe(789);
  });
});
