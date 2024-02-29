import { beforeEach, describe, expect, test } from "vitest";
import xpath from "xpath";
import { map, type ObjectBlueprint } from "../../../src";
import { parseXml } from "../../helper/parseXml";

describe("object mappings", () => {
  const xml = `
<Users>
  <User id="123" verified="false">
      <FirstName>John</FirstName>
      <LastName>Doe</LastName>
      <ContactData>
          <Email>johndoe@example.com</Email>
      </ContactData>
  </User>
  <User id="456" verified="true">
      <FirstName>Jane</FirstName>
      <LastName>Doe</LastName>
      <ContactData>
          <Email>janedoe@example.com</Email>
          <Phone>+1234567890</Phone>
      </ContactData>
  </User>
</Users>
  `;

  interface TestUser {
    id: number;
    isVerified: boolean;
    firstName: string;
    lastName: string;
    contactData: {
      email?: string;
      phone?: string;
    };
  }

  let doc: Document;
  let userBlueprint: ObjectBlueprint<TestUser>;
  const xs = xpath.select;

  beforeEach(() => {
    doc = parseXml(xml);

    userBlueprint = {
      id: map().toNode("@id").mandatory().asNumber().named("id"),
      isVerified: map()
        .toNode("@verified")
        .mandatory()
        .asBoolean()
        .named("isVerified"),
      firstName: map()
        .toNode("FirstName")
        .mandatory()
        .asString()
        .named("firstName"),
      lastName: map()
        .toNode("LastName")
        .mandatory()
        .asString()
        .named("lastName"),
      contactData: map()
        .toNode("ContactData")
        .mandatory()
        .asObject({
          email: map().toNode("Email").asString().named("contactData.email"),
          phone: map().toNode("Phone").asString().named("contactData.phone"),
        })
        .named("contactData"),
    };
  });

  test("returning object values", () => {
    const mapper1 = map().toNode("/Users/User[1]").asObject(userBlueprint);
    const mapper2 = map().toNode("/Users/User[2]").asObject(userBlueprint);

    expect(mapper1.createNodeDataExtractor()(doc, xs)).toEqual({
      id: 123,
      isVerified: false,
      firstName: "John",
      lastName: "Doe",
      contactData: {
        email: "johndoe@example.com",
      },
    });

    expect(mapper2.createNodeDataExtractor()(doc, xs)).toEqual({
      id: 456,
      isVerified: true,
      firstName: "Jane",
      lastName: "Doe",
      contactData: {
        email: "janedoe@example.com",
        phone: "+1234567890",
      },
    });
  });

  test("returning undefined, when reference node not found", () => {
    expect(
      map()
        .toNode("/Users/User[999]")
        .asObject(userBlueprint)
        .createNodeDataExtractor()(doc, xs)
    ).toBeUndefined();
  });

  test("throwing error, when mandatory reference node not found", () => {
    expect(() =>
      map()
        .toNode("/Users/User[999]")
        .mandatory()
        .asObject(userBlueprint)
        .createNodeDataExtractor()(doc, xs)
    ).toThrow();
  });

  test("returning default value, when reference node not found", () => {
    expect(
      map()
        .toNode("/Users/User[999]")
        .asObject(userBlueprint)
        .withDefault({
          id: 0,
          isVerified: false,
          firstName: "First",
          lastName: "Last",
          contactData: {},
        })
        .createNodeDataExtractor()(doc, xs)
    ).toEqual({
      id: 0,
      isVerified: false,
      firstName: "First",
      lastName: "Last",
      contactData: {},
    });
  });

  describe("object conversion", () => {
    const conversionFn = (val: object): string => JSON.stringify(val);

    test("returning converted value", () => {
      expect(
        map()
          .toNode("/Users/User[1]")
          .asObject(userBlueprint)
          .withConversion(conversionFn)
          .createNodeDataExtractor()(doc, xs)
      ).toBe(
        '{"id":123,"isVerified":false,"firstName":"John","lastName":"Doe","contactData":{"email":"johndoe@example.com"}}'
      );
    });

    test("returning undefined, when got conversion callback, but reference node not found", () => {
      expect(
        map()
          .toNode("/Users/User[999]")
          .asObject(userBlueprint)
          .withConversion(conversionFn)
          .createNodeDataExtractor()(doc, xs)
      ).toBeUndefined();
    });

    test("reset default value, when conversion callback was set after default value", () => {
      expect(
        map()
          .toNode("/Users/User[999]")
          .asObject(userBlueprint)
          .withDefault({
            id: 0,
            isVerified: false,
            firstName: "First",
            lastName: "Last",
            contactData: {},
          })
          .withConversion(conversionFn)
          .createNodeDataExtractor()(doc, xs)
      ).toBeUndefined();
    });

    test("return default value of converted type, when conversion callback was set and reference node not found", () => {
      expect(
        map()
          .toNode("/Users/User[999]")
          .asObject(userBlueprint)
          .withConversion(conversionFn)
          .withDefault("")
          .createNodeDataExtractor()(doc, xs)
      ).toBe("");
    });
  });
});
