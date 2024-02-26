import { beforeEach, describe, expect, test } from "vitest";
import xpath from "xpath";
import { map, type RecursiveObjectFactory } from "../../../src";
import { parseXml } from "../../helper/parseXml";

describe("recursive object array mappings", () => {
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
                    <Category id="5">
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

  let doc: Document;
  const xs = xpath.select;
  let recursiveObjectBlueprintFactory: RecursiveObjectFactory<Category>;

  beforeEach(() => {
    doc = parseXml(xml);
    recursiveObjectBlueprintFactory = (recursion) => ({
      id: map().toAttribute("@id").mandatory().asNumber(),
      name: map().toElement("Name").mandatory().asString(),
      level: () => recursion.getDepth(),
      subcategories: map()
        .toElementsArray("Subcategories/Category")
        .asArray()
        .ofRecursiveObjects(recursion),
    });
  });

  test("returning recursive objects array", () => {
    expect(
      map()
        .toElementsArray("/Categories/Category")
        .asArray()
        .ofRecursiveObjects(recursiveObjectBlueprintFactory)
        .createNodeDataExtractor()(doc, xs)
    ).toEqual([
      { id: 1, name: "Category 1", level: 0 },
      {
        id: 2,
        name: "Category 2",
        level: 0,
        subcategories: [
          {
            id: 3,
            name: "Category 3",
            level: 1,
            subcategories: [
              { id: 4, name: "Category 4", level: 2 },
              { id: 5, name: "Category 5", level: 2 },
            ],
          },
        ],
      },
      { id: 6, name: "Category 6", level: 0 },
    ]);
  });

  test("returning undefined, when reference nodes not found", () => {
    expect(
      map()
        .toElementsArray("/MissingCategories/Category")
        .asArray()
        .ofRecursiveObjects(recursiveObjectBlueprintFactory)
        .createNodeDataExtractor()(doc, xs)
    ).toBeUndefined();
  });

  test("throwing error, when mandatory reference nodes not found", () => {
    expect(() =>
      map()
        .toElementsArray("/MissingCategories/Category")
        .mandatory()
        .asArray()
        .ofRecursiveObjects(recursiveObjectBlueprintFactory)
        .createNodeDataExtractor()(doc, xs)
    ).toThrow();
  });

  test("returning default value, when reference nodes not found", () => {
    expect(
      map()
        .toElementsArray("/MissingCategories/Category")
        .asArray()
        .ofRecursiveObjects(recursiveObjectBlueprintFactory)
        .withDefault([{ id: 0, name: "Fallback", level: 0 }])
        .createNodeDataExtractor()(doc, xs)
    ).toEqual([{ id: 0, name: "Fallback", level: 0 }]);
  });

  describe("value conversion", () => {
    const conversionFn = (categories: Category[]): string[] => {
      const paths: string[] = [];
      for (const category of categories) {
        paths.push(`${category.id}`);
        if (category.subcategories) {
          const subpaths = conversionFn(category.subcategories);
          for (const subpath of subpaths) {
            paths.push(`${category.id}/${subpath}`);
          }
        }
      }
      return paths;
    };

    test("returning converted value", () => {
      expect(
        map()
          .toElementsArray("/Categories/Category")
          .asArray()
          .ofRecursiveObjects(recursiveObjectBlueprintFactory)
          .withConversion(conversionFn)
          .createNodeDataExtractor()(doc, xs)
      ).toEqual(["1", "2", "2/3", "2/3/4", "2/3/5", "6"]);
    });

    test("returning undefined, when got conversion callback, but reference nodes not found", () => {
      expect(
        map()
          .toElementsArray("/MissingCategories/Category")
          .asArray()
          .ofRecursiveObjects(recursiveObjectBlueprintFactory)
          .withConversion(conversionFn)
          .createNodeDataExtractor()(doc, xs)
      ).toBeUndefined();
    });

    test("reset default value, when conversion callback was set after default value", () => {
      expect(
        map()
          .toElementsArray("/MissingCategories/Category")
          .asArray()
          .ofRecursiveObjects(recursiveObjectBlueprintFactory)
          .withDefault([{ id: 0, name: "", level: 0 }])
          .withConversion(conversionFn)
          .createNodeDataExtractor()(doc, xs)
      ).toBeUndefined();
    });

    test("return default value of converted type, when conversion callback was set and reference node not found", () => {
      expect(
        map()
          .toElementsArray("/MissingCategories/Category")
          .asArray()
          .ofRecursiveObjects(recursiveObjectBlueprintFactory)
          .withConversion(conversionFn)
          .withDefault([""])
          .createNodeDataExtractor()(doc, xs)
      ).toEqual([""]);
    });
  });
});
