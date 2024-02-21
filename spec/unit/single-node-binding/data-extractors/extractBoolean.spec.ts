import { beforeEach, describe, expect, it } from "vitest";
import xpath from "xpath";
import { extractBoolean } from "../../../../src";
import { parseXml } from "../../../helper/parseXml";

describe("extractBoolean() function", () => {
  const xml = `
<Root>
  <TrueElementWithText>Text</TrueElementWithText>
  <TrueElementWithPositiveNumber>123</TrueElementWithPositiveNumber>
  <TrueElementWithNegativeNumber>-123</TrueElementWithNegativeNumber>
  <FalseElementWithoutContent></FalseElementWithoutContent>
  <FalseElementWithZero>0</FalseElementWithZero>
  <FalseElementWithPositiveZero>+0</FalseElementWithPositiveZero>
  <FalseElementWithNegativeZero>-0</FalseElementWithNegativeZero>
  <FalseSingleTag/>
  <TrueAttributeWithStringValue disabled="any string value" />
  <TrueAttributeWithNumericValue disabled="123" />
  <FalseAttributeWithFalseNumericValue disabled="0"/>
  <FalseAttributeWithFalseStringValue disabled="false" />
  <FalseAttributeWithNullStringValue disabled="null" />
</Root>
  `;

  let doc: Document;
  let execTest: (path: string, expectedValue: boolean) => void;

  beforeEach(() => {
    doc = parseXml(xml);
    execTest = (path: string, expectedValue: boolean) => {
      const node = xpath.select(path, doc, true) as Node;
      expect(extractBoolean(node, xpath.select)).toBe(expectedValue);
    };
  });

  it("should return true when element text has text", () => {
    execTest("//TrueElementWithText", true);
  });

  it("should return true when element text is positive number", () => {
    execTest("//TrueElementWithPositiveNumber", true);
  });

  it("should return true when element text is negative number", () => {
    execTest("//TrueElementWithNegativeNumber", true);
  });

  it("should return false when element has no content", () => {
    execTest("//FalseElementWithoutContent", false);
  });

  it("should return false when element content is numeric 0", () => {
    execTest("//FalseElementWithZero", false);
  });

  it("should return false when element content is numeric +0", () => {
    execTest("//FalseElementWithPositiveZero", false);
  });

  it("should return false when element content is numeric -0", () => {
    execTest("//FalseElementWithNegativeZero", false);
  });

  it("should return false when element is self-closing", () => {
    execTest("//FalseSingleTag", false);
  });

  it("should return true when attribute has any string value (except 'false' and 'null')", () => {
    execTest("//TrueAttributeWithStringValue/@disabled", true);
  });

  it("should return true when attribute has any number value (except '0', '+0' and '-0')", () => {
    execTest("//TrueAttributeWithNumericValue/@disabled", true);
  });

  it("should return false when attribute has number value of 0", () => {
    execTest("//FalseAttributeWithFalseNumericValue/@disabled", false);
  });

  it("should return false when attribute has value of 'false'", () => {
    execTest("//FalseAttributeWithFalseStringValue/@disabled", false);
  });

  it("should return false when attribute has value of 'null'", () => {
    execTest("//FalseAttributeWithNullStringValue/@disabled", false);
  });
});
