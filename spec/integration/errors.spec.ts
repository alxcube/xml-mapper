import { beforeEach, describe, expect, test } from "vitest";
import { createObjectMapper, map, MappingError } from "../../src";
import { parseXml } from "../helper/parseXml";

describe("Errors, containing mapping path", () => {
  let dummyDoc: Document;

  beforeEach(() => {
    dummyDoc = parseXml("<Root/>");
  });

  test("error when mandatory node is not found should contain mapping path and lookup path", () => {
    const mapper = createObjectMapper({
      requiredElement: map().toNode("/MissingElement").mandatory().asString(),
    });
    try {
      mapper(dummyDoc);
      expect.fail("Should throw MappingError");
    } catch (e) {
      expect(e).toBeInstanceOf(MappingError);
      expect((e as MappingError).message).toMatch("requiredElement");
      expect((e as MappingError).message).toMatch(
        `Lookup path: "/MissingElement"`
      );
    }
  });

  test("error when mandatory nodes array is not found should contain mapping path and lookup path", () => {
    const mapper = createObjectMapper({
      requiredElements: map()
        .toNodesArray("/MissingElement")
        .mandatory()
        .asArray()
        .ofStrings(),
    });
    try {
      mapper(dummyDoc);
      expect.fail("Should throw MappingError");
    } catch (e) {
      expect(e).toBeInstanceOf(MappingError);
      expect((e as MappingError).message).toMatch("requiredElements");
      expect((e as MappingError).message).toMatch(
        `Lookup path: "/MissingElement"`
      );
    }
  });

  test("error in lookup should contain mapping path and lookup path", () => {
    const mapper = createObjectMapper({
      requiredElement: map()
        .toNode("/Root]") // error "]" char
        .asString(),
    });
    try {
      mapper(dummyDoc);
      expect.fail("Should throw MappingError");
    } catch (e) {
      expect(e).toBeInstanceOf(MappingError);
      expect((e as MappingError).message).toMatch("requiredElement");
      expect((e as MappingError).message).toMatch(`Lookup path: "/Root]"`);
    }
  });

  test("error in array lookup should contain mapping path and lookup path", () => {
    const mapper = createObjectMapper({
      requiredElements: map()
        .toNodesArray("/Root]") // error "]" char
        .asArray()
        .ofStrings(),
    });
    try {
      mapper(dummyDoc);
      expect.fail("Should throw MappingError");
    } catch (e) {
      expect(e).toBeInstanceOf(MappingError);
      expect((e as MappingError).message).toMatch("requiredElements");
      expect((e as MappingError).message).toMatch(`Lookup path: "/Root]"`);
    }
  });

  test("error in lookup return type should contain mapping path and lookup path", () => {
    const mapper = createObjectMapper({
      requiredElement: map()
        .toNode("string(/Root)") // error: expression returns string, not Node
        .asString(),
    });
    try {
      mapper(dummyDoc);
      expect.fail("Should throw MappingError");
    } catch (e) {
      expect(e).toBeInstanceOf(MappingError);
      expect((e as MappingError).message).toMatch("requiredElement");
      expect((e as MappingError).message).toMatch(
        `Lookup path: "string(/Root)"`
      );
    }
  });

  test("error in lookup return type should contain mapping path and lookup path", () => {
    const mapper = createObjectMapper({
      requiredElements: map()
        .toNodesArray("string(/Root)") // error: expression returns string, not Node[]
        .asArray()
        .ofStrings(),
    });
    try {
      mapper(dummyDoc);
      expect.fail("Should throw MappingError");
    } catch (e) {
      expect(e).toBeInstanceOf(MappingError);
      expect((e as MappingError).message).toMatch("requiredElements");
      expect((e as MappingError).message).toMatch(
        `Lookup path: "string(/Root)"`
      );
    }
  });

  test("Error in single node data extractor should contain mapping path", () => {
    const mapper = createObjectMapper({
      root: map()
        .toNode("/Root")
        .callback(() => {
          throw new Error("test error");
        }),
    });

    try {
      mapper(dummyDoc);
      expect.fail("Should throw MappingError");
    } catch (e) {
      expect(e).toBeInstanceOf(MappingError);
      expect((e as MappingError).message).toMatch("root");
      expect((e as MappingError).message).toMatch(`test error`);
    }
  });

  test("error in nodes array data extractor should contain mapping path", () => {
    const mapper = createObjectMapper({
      roots: map()
        .toNodesArray("/Root")
        .asArray()
        .usingMapper(() => {
          throw new Error("test error");
        }),
    });

    try {
      mapper(dummyDoc);
      expect.fail("Should throw MappingError");
    } catch (e) {
      expect(e).toBeInstanceOf(MappingError);
      expect((e as MappingError).message).toMatch("roots[0]");
      expect((e as MappingError).message).toMatch(`test error`);
    }
  });

  test("error in conversion callback should contain mapping path", () => {
    const mapper = createObjectMapper({
      root: map()
        .toNode("/Root")
        .asString()
        .withConversion(() => {
          throw new Error("test error");
        }),
    });

    try {
      mapper(dummyDoc);
      expect.fail("Should throw MappingError");
    } catch (e) {
      expect(e).toBeInstanceOf(MappingError);
      expect((e as MappingError).message).toMatch("root");
      expect((e as MappingError).message).toMatch(`test error`);
    }
  });

  test("recursive array mappings should have full mapping path and lookup path in error message, when mandatory node not found", () => {
    const xml = `
<Categories>
    <Category id="1">
        <Name>Category 1</Name>
    </Category>
    <Category id="2">
        <Name>Category 2</Name>
        <Subcategories>
            <Category id="3">
                <Name>Category 3</Name>
                <Subcategories>
                    <Category id="4">
                        <Name>Category 4</Name>
                    </Category>
                    <Category><!-- "id" attribute is missing to throw error -->
                        <Name>Category 5</Name>
                    </Category>
                </Subcategories>
            </Category>
        </Subcategories>
    </Category>
    <Category id="6">
        <Name>Category 6</Name>
    </Category>
</Categories>      
`;
    interface Category {
      id: number;
      name: string;
      level: number;
      subcategories?: Category[];
    }

    const doc = parseXml(xml);

    const mapper = createObjectMapper<{ categories: Category[] }>({
      categories: map()
        .toNodesArray("/Categories/Category")
        .mandatory()
        .asArray()
        .ofRecursiveObjects((recursion) => ({
          id: map().toNode("@id").mandatory().asNumber(),
          name: map().toNode("Name").mandatory().asString(),
          level: map().constant(recursion.getDepth()),
          subcategories: map()
            .toNodesArray("Subcategories/Category")
            .asArray()
            .ofRecursiveObjects(recursion),
        })),
    });

    try {
      mapper(doc);
      expect.fail("Should throw MappingError");
    } catch (e) {
      expect(e).toBeInstanceOf(MappingError);
      expect((e as MappingError).message).toMatch(
        "categories[1].subcategories[0].subcategories[1].id"
      );
      expect((e as MappingError).message).toMatch('Lookup path: "@id"');
    }
  });
});
