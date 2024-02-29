import { beforeEach, describe, expect, test } from "vitest";
import { createObjectMapper, map } from "../../src";
import { parseXml } from "../helper/parseXml";

describe("binding error containing path in calls tree", () => {
  const xml = `
<Root>
    <Level1>
        <Level2>
            <Level3></Level3>
        </Level2>
    </Level1>
</Root>
`;
  let doc: Document;

  beforeEach(() => {
    doc = parseXml(xml);
  });

  test("error when mandatory node not found", () => {
    const mapper = createObjectMapper({
      level1: map("level1")
        .toNode("/Root/Level1")
        .mandatory()
        .asObject({
          level2: map("level2")
            .toNode("Level2")
            .mandatory()
            .asObject({
              level3: map("level3")
                .toNode("Level3")
                .mandatory()
                .asObject({
                  level4: map("level4").toNode("Level4").mandatory().asString(),
                }),
            }),
        }),
    });

    expect(() => mapper(doc)).toThrow(
      "level1: /Root/Level1 > level2: Level2 > level3: Level3 > level4: Level4"
    );
  });

  test("error in data extractor", () => {
    const mapper = createObjectMapper({
      level1: map("level1")
        .toNode("/Root/Level1")
        .mandatory()
        .asObject({
          level2: map("level2")
            .toNode("Level2")
            .mandatory()
            .asObject({
              level3: map("level3")
                .toNode("Level3")
                .mandatory()
                .callback(() => {
                  throw new TypeError("Test error");
                }),
            }),
        }),
    });

    expect(() => mapper(doc)).toThrow(
      "level1: /Root/Level1 > level2: Level2 > level3: Level3"
    );
  });
});
