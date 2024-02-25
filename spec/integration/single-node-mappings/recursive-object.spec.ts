import { beforeEach, describe, expect, test } from "vitest";
import xpath from "xpath";
import { map, type RecursiveObjectFactory } from "../../../src";
import { parseXml } from "../../helper/parseXml";

describe("recursive object mappings", () => {
  const xml = `
<Root>
    <Child>
        <Title>Level 0</Title>
        <Child>
            <Title>Level 1</Title>
            <Child>
                <Title>Level 2</Title>
            </Child>
        </Child>    
    </Child>
</Root>
      `;

  interface TestRecursion {
    title: string;
    child?: TestRecursion;
  }

  let doc: Document;
  const xs = xpath.select;
  let recursiveObjectFactory: RecursiveObjectFactory<TestRecursion>;

  beforeEach(() => {
    doc = parseXml(xml);
    recursiveObjectFactory = (recursion) => ({
      title: map().toElement("Title").mandatory().asString(),
      child: map().toElement("Child").asRecursiveObject(recursion),
    });
  });

  test("returning recursive object", () => {
    expect(
      map()
        .toElement("/Root/Child")
        .mandatory()
        .asRecursiveObject(recursiveObjectFactory)
        .createNodeDataExtractor()(doc, xs)
    ).toEqual({
      title: "Level 0",
      child: { title: "Level 1", child: { title: "Level 2" } },
    });
  });

  test("returning undefined, when reference node not found", () => {
    expect(
      map()
        .toElement("//MissingElement")
        .asRecursiveObject(recursiveObjectFactory)
        .createNodeDataExtractor()(doc, xs)
    ).toBeUndefined();
  });

  test("throwing error, when mandatory reference node not found", () => {
    expect(() =>
      map()
        .toElement("//MissingElement")
        .mandatory()
        .asRecursiveObject(recursiveObjectFactory)
        .createNodeDataExtractor()(doc, xs)
    ).toThrow();
  });

  test("returning default value, when reference node not found", () => {
    expect(
      map()
        .toElement("//MissingElement")
        .asRecursiveObject(recursiveObjectFactory)
        .withDefault({ title: "Fallback" })
        .createNodeDataExtractor()(doc, xs)
    ).toEqual({ title: "Fallback" });
  });

  describe("recursive object conversion", () => {
    const conversionFn = (obj: TestRecursion): string => {
      let result = obj.title;
      if (obj.child) {
        result += "/" + conversionFn(obj.child);
      }
      return result;
    };

    test("returning converted value", () => {
      expect(
        map()
          .toElement("/Root/Child")
          .asRecursiveObject(recursiveObjectFactory)
          .withConversion(conversionFn)
          .createNodeDataExtractor()(doc, xs)
      ).toBe("Level 0/Level 1/Level 2");
    });

    test("returning undefined, when got conversion callback, but reference node not found", () => {
      expect(
        map()
          .toElement("/Root/MissingElement")
          .asRecursiveObject(recursiveObjectFactory)
          .withConversion(conversionFn)
          .createNodeDataExtractor()(doc, xs)
      ).toBeUndefined();
    });

    test("reset default value, when conversion callback was set after default value", () => {
      expect(
        map()
          .toElement("/Root/MissingElement")
          .asRecursiveObject(recursiveObjectFactory)
          .withDefault({ title: "Fallback" })
          .withConversion(conversionFn)
          .createNodeDataExtractor()(doc, xs)
      ).toBeUndefined();
    });

    test("return default value of converted type, when conversion callback was set and reference node not found", () => {
      expect(
        map()
          .toElement("/Root/MissingElement")
          .asRecursiveObject(recursiveObjectFactory)
          .withConversion(conversionFn)
          .withDefault("")
          .createNodeDataExtractor()(doc, xs)
      ).toBe("");
    });
  });
});
