import { beforeEach, describe, expect, it } from "vitest";
import xpath, { type XPathSelect } from "xpath";
import {
  CustomArrayDataExtractorFactory,
  type NodesArrayDataExtractorFn,
  type NodesArrayDataExtractorFnFactory,
} from "../../../../src";
import { parseXml } from "../../../helper/parseXml";

describe("CustomArrayDataExtractorFactory class", () => {
  const xml = `
<Users>
    <User>
        <FirstName>John</FirstName>
        <LastName>Doe</LastName>
    </User>
    <User>
        <FirstName>Jane</FirstName>
        <LastName>Doe</LastName>
    </User>
</Users>
  `;

  let doc: Document;
  const xs = xpath.select;
  let customArrayDataExtractorFn: NodesArrayDataExtractorFn<string>;
  let customArrayDataExtractorFnFactory: NodesArrayDataExtractorFnFactory<string>;

  beforeEach(() => {
    doc = parseXml(xml);
    customArrayDataExtractorFn = (nodes: Node[], xpathSelect: XPathSelect) => {
      const fullNames = nodes.map((node) => {
        const firstName = xpathSelect("string(FirstName)", node);
        const lastName = xpathSelect("string(LastName)", node);
        return `${firstName} ${lastName}`;
      });
      return fullNames.join(", ");
    };
    customArrayDataExtractorFnFactory = {
      createNodesArrayDataExtractor(): NodesArrayDataExtractorFn<string> {
        return customArrayDataExtractorFn;
      },
    };
  });

  describe("createNodesArrayDataExtractor() method", () => {
    it("should return NodesArrayDataExtractorFn callback, passed to constructor", () => {
      const factory = new CustomArrayDataExtractorFactory(
        customArrayDataExtractorFn
      );
      expect(factory.createNodesArrayDataExtractor()).toBe(
        customArrayDataExtractorFn
      );
    });

    it("should return NodesArrayDataExtractorFn, produced by NodesArrayDataExtractorFnFactory, passed to constructor", () => {
      const factory = new CustomArrayDataExtractorFactory(
        customArrayDataExtractorFnFactory
      );
      const extractor = factory.createNodesArrayDataExtractor();
      expect(extractor).toBe(customArrayDataExtractorFn);
      expect(extractor(xs("//User", doc) as Node[], xs)).toBe(
        "John Doe, Jane Doe"
      );
    });
  });
});
