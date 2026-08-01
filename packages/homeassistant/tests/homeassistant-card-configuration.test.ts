import { describe, expect, it } from "vitest";

import {
  createHomeAssistantEntitiesCardConfiguration,
  parseHomeAssistantEntitiesCardConfiguration,
  serializeHomeAssistantEntitiesCardConfiguration,
} from "../src";

describe("Home Assistant entities card configuration", () => {
  it("creates and serializes Home Assistant entities cards", () => {
    const card = createHomeAssistantEntitiesCardConfiguration({
      title: "Office",
      entityIds: ["sensor.office_temperature", " light.office ", "sensor.office_temperature", ""],
    });

    expect(card).toEqual({
      type: "entities",
      title: "Office",
      entities: [
        { entity: "sensor.office_temperature" },
        { entity: "light.office" },
      ],
    });
    expect(serializeHomeAssistantEntitiesCardConfiguration(card, "json")).toContain("\"type\": \"entities\"");
    expect(serializeHomeAssistantEntitiesCardConfiguration(card, "yaml")).toBe([
      "type: entities",
      "title: \"Office\"",
      "entities:",
      "  - entity: \"sensor.office_temperature\"",
      "  - entity: \"light.office\"",
    ].join("\n"));
  });

  it("parses JSON entities cards", () => {
    const parsed = parseHomeAssistantEntitiesCardConfiguration(JSON.stringify({
      type: "entities",
      title: "Energy",
      entities: ["sensor.power", { entity: "sensor.energy" }],
    }));

    expect(parsed.format).toBe("json");
    expect(parsed.card).toEqual({
      type: "entities",
      title: "Energy",
      entities: [
        { entity: "sensor.power" },
        { entity: "sensor.energy" },
      ],
    });
  });

  it("parses YAML entities cards", () => {
    const parsed = parseHomeAssistantEntitiesCardConfiguration([
      "type: entities",
      "title: Workshop",
      "entities:",
      "  - entity: sensor.workshop_temperature",
      "  - light.workshop",
    ].join("\n"));

    expect(parsed.format).toBe("yaml");
    expect(parsed.card).toEqual({
      type: "entities",
      title: "Workshop",
      entities: [
        { entity: "sensor.workshop_temperature" },
        { entity: "light.workshop" },
      ],
    });
  });

  it("rejects cards without supported entities", () => {
    expect(() => parseHomeAssistantEntitiesCardConfiguration("type: markdown\ncontent: test")).toThrow();
    expect(() => parseHomeAssistantEntitiesCardConfiguration("{\"type\":\"entities\",\"entities\":[]}")).toThrow();
  });
});
