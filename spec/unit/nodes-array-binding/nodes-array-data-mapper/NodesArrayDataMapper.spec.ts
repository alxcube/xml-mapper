import { beforeEach, describe, expect, it } from "vitest";
import xpath from "xpath";
import {
  NodesArrayDataMapper,
  NumberExtractorFactory,
  StringExtractorFactory,
} from "../../../../src";
import { parseXml } from "../../../helper/parseXml";

describe("NodesArrayDataMapper class", () => {
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

  beforeEach(() => {
    doc = parseXml(xml);
  });

  describe("createNodesArrayDataExtractor() method", () => {
    it("should return NodesArrayDataExtractorFn, that takes array of nodes and maps them, using SingleNodeDataExtractorFn callback, passed to constructor", () => {
      const mapper = new NodesArrayDataMapper(
        new NumberExtractorFactory().createNodeDataExtractor()
      );
      const nodes = xs("//Item", doc) as Element[];
      const arrayDataExtractor = mapper.createNodesArrayDataExtractor();
      expect(arrayDataExtractor(nodes, xs)).toEqual([1, 2, 3]);
    });

    it("should return NodesArrayDataExtractorFn, that takes array of nodes and maps them, using SingleNodeDataExtractorFnFactory, passed to constructor", () => {
      const mapper = new NodesArrayDataMapper(new StringExtractorFactory());
      const nodes = xs("//Item/@id", doc) as Attr[];
      const arrayDataExtractor = mapper.createNodesArrayDataExtractor();
      expect(arrayDataExtractor(nodes, xs)).toEqual(["id1", "id2", "id3"]);
    });
  });
});
