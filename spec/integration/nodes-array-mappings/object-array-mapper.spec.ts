import { beforeEach, describe, expect, test } from "vitest";
import xpath from "xpath";
import { map, type ObjectBlueprint } from "../../../src";
import { parseXml } from "../../helper/parseXml";

describe("object array mappings", () => {
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
      id: map().toAttribute("@id").mandatory().asNumber().named("id"),
      isVerified: map()
        .toAttribute("@verified")
        .mandatory()
        .asBoolean()
        .named("isVerified"),
      firstName: map()
        .toElement("FirstName")
        .mandatory()
        .asString()
        .named("firstName"),
      lastName: map()
        .toElement("LastName")
        .mandatory()
        .asString()
        .named("lastName"),
      contactData: map()
        .toElement("ContactData")
        .mandatory()
        .asObject({
          email: map().toElement("Email").asString().named("contactData.email"),
          phone: map().toElement("Phone").asString().named("contactData.phone"),
        })
        .named("contactData"),
    };
  });

  test("returning objects array", () => {
    expect(
      map()
        .toElementsArray("/Users/User")
        .asArray()
        .ofObjects(userBlueprint)
        .createNodeDataExtractor()(doc, xs)
    ).toEqual([
      {
        id: 123,
        isVerified: false,
        firstName: "John",
        lastName: "Doe",
        contactData: { email: "johndoe@example.com" },
      },
      {
        id: 456,
        isVerified: true,
        firstName: "Jane",
        lastName: "Doe",
        contactData: {
          email: "janedoe@example.com",
          phone: "+1234567890",
        },
      },
    ]);
  });

  test("returning undefined, when reference nodes not found", () => {
    expect(
      map()
        .toElementsArray("/MissingUsers/User")
        .asArray()
        .ofObjects(userBlueprint)
        .createNodeDataExtractor()(doc, xs)
    ).toBeUndefined();
  });

  test("throwing error, when mandatory reference nodes not found", () => {
    expect(() =>
      map()
        .toElementsArray("/MissingUsers/User")
        .mandatory()
        .asArray()
        .ofObjects(userBlueprint)
        .createNodeDataExtractor()(doc, xs)
    ).toThrow();
  });

  test("returning default value, when reference nodes not found", () => {
    expect(
      map()
        .toElementsArray("/MissingUsers/User")
        .asArray()
        .ofObjects(userBlueprint)
        .withDefault([
          {
            id: 0,
            isVerified: false,
            firstName: "First",
            lastName: "Last",
            contactData: {},
          },
        ])
        .createNodeDataExtractor()(doc, xs)
    ).toEqual([
      {
        id: 0,
        isVerified: false,
        firstName: "First",
        lastName: "Last",
        contactData: {},
      },
    ]);
  });

  describe("value conversion", () => {
    const conversionFn = (users: TestUser[]): number[] =>
      users.map((user) => user.id);

    test("returning converted array", () => {
      expect(
        map()
          .toElementsArray("/Users/User")
          .asArray()
          .ofObjects(userBlueprint)
          .withConversion(conversionFn)
          .createNodeDataExtractor()(doc, xs)
      ).toEqual([123, 456]);
    });

    test("returning undefined, when got conversion callback, but reference nodes not found", () => {
      expect(
        map()
          .toElementsArray("/MissingUsers/User")
          .asArray()
          .ofObjects(userBlueprint)
          .withConversion(conversionFn)
          .createNodeDataExtractor()(doc, xs)
      ).toBeUndefined();
    });

    test("reset default value, when conversion callback was set after default value", () => {
      expect(
        map()
          .toElementsArray("/MissingUsers/User")
          .asArray()
          .ofObjects(userBlueprint)
          .withDefault([
            {
              id: 0,
              isVerified: false,
              firstName: "First",
              lastName: "Last",
              contactData: {},
            },
          ])
          .withConversion(conversionFn)
          .createNodeDataExtractor()(doc, xs)
      ).toBeUndefined();
    });

    test("return default value of converted type, when conversion callback was set and reference node not found", () => {
      expect(
        map()
          .toElementsArray("/MissingUsers/User")
          .asArray()
          .ofObjects(userBlueprint)
          .withConversion(conversionFn)
          .withDefault([0, 1])
          .createNodeDataExtractor()(doc, xs)
      ).toEqual([0, 1]);
    });
  });
});
