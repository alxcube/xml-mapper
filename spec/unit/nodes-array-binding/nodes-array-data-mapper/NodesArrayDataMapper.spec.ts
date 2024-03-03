import { beforeEach, describe, expect, it, test } from "vitest";
import xpath, { isElement } from "xpath";
import {
  CustomDataExtractorFactory,
  MappingError,
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
    <CorruptedList>
        <Item id="id1">1</Item>
        <Item>2</Item>
        <Item id="id3">3</Item>
    </CorruptedList>
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
      const nodes = xs("//List/Item", doc) as Element[];
      const arrayDataExtractor = mapper.createNodesArrayDataExtractor();
      expect(arrayDataExtractor(nodes, xs)).toEqual([1, 2, 3]);
    });

    it("should return NodesArrayDataExtractorFn, that takes array of nodes and maps them, using SingleNodeDataExtractorFnFactory, passed to constructor", () => {
      const mapper = new NodesArrayDataMapper(new StringExtractorFactory());
      const nodes = xs("//List/Item/@id", doc) as Attr[];
      const arrayDataExtractor = mapper.createNodesArrayDataExtractor();
      expect(arrayDataExtractor(nodes, xs)).toEqual(["id1", "id2", "id3"]);
    });

    test("created NodesArrayDataExtractorFn throws MappingError with error index", () => {
      const mapper = new NodesArrayDataMapper(
        new CustomDataExtractorFactory((node) => {
          if (!isElement(node)) {
            throw new Error("");
          }
          if (!node.hasAttribute("id")) {
            throw new RangeError(`Attribute "id" is not found`);
          }
          return node.getAttribute("id");
        })
      );

      const nodes = xs("//CorruptedList/Item", doc) as Element[];
      const arrayDataExtractor = mapper.createNodesArrayDataExtractor();

      try {
        arrayDataExtractor(nodes, xs);
        expect.fail("Should throw");
      } catch (e) {
        expect(e).toBeInstanceOf(MappingError);
        expect((e as MappingError).mappingPath).toEqual([1]);
      }
    });
  });
});
