import { describe, expect, it } from "vitest";

import {
  createHomeAssistantCardConfiguration,
  createHomeAssistantEntitiesCardConfiguration,
  findHomeAssistantCardTargetDescriptor,
  inspectHomeAssistantCardDependency,
  inspectHomeAssistantCardDependencyAvailability,
  listHomeAssistantCardTargets,
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
    expect(parsed.target).toBe("entities");
    expect(parsed.layout).toBe("single");
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
    expect(parsed.target).toBe("entities");
    expect(parsed.layout).toBe("single");
    expect(parsed.card).toEqual({
      type: "entities",
      title: "Workshop",
      entities: [
        { entity: "sensor.workshop_temperature" },
        { entity: "light.workshop" },
      ],
    });
  });

  it("round-trips quoted YAML card values", () => {
    const card = createHomeAssistantEntitiesCardConfiguration({
      title: "Owner's Office",
      entityIds: ["sensor.owner_office_temperature", "sensor.owner_office_power"],
    });
    const parsed = parseHomeAssistantEntitiesCardConfiguration(
      serializeHomeAssistantEntitiesCardConfiguration(card, "yaml"),
    );

    expect(parsed).toEqual({
      format: "yaml",
      card,
      target: "entities",
      layout: "single",
    });
  });

  it("creates Mushroom and Bubble card targets", () => {
    const mushroom = createHomeAssistantCardConfiguration({
      target: "mushroom-template",
      title: "Office climate",
      entityIds: ["sensor.office_temperature"],
    });
    const bubble = createHomeAssistantCardConfiguration({
      target: "bubble",
      title: "Office light",
      entityIds: ["light.office"],
    });

    expect(mushroom).toEqual({
      type: "custom:mushroom-template-card",
      primary: "Office climate",
      secondary: "sensor.office_temperature",
      entity: "sensor.office_temperature",
    });
    expect(bubble).toEqual({
      type: "custom:bubble-card",
      card_type: "button",
      button_type: "state",
      name: "Office light",
      entity: "light.office",
      show_state: true,
    });
    expect(inspectHomeAssistantCardDependency(mushroom)).toEqual({
      id: "mushroom",
      label: "Mushroom",
      required: true,
      resourcePaths: ["/hacsfiles/lovelace-mushroom/mushroom.js"],
      installPaths: [],
    });
    expect(inspectHomeAssistantCardDependency(bubble)).toEqual({
      id: "bubble-card",
      label: "Bubble Card",
      required: true,
      resourcePaths: ["/hacsfiles/Bubble-Card/bubble-card.js"],
      installPaths: [],
    });
  });

  it("creates stacked Bubble and Mushroom card targets for multiple entities", () => {
    const bubble = createHomeAssistantCardConfiguration({
      target: "bubble",
      layout: "horizontal-stack",
      title: "Office",
      entityIds: ["light.office", "switch.office_fan"],
    });
    const mushroom = createHomeAssistantCardConfiguration({
      target: "mushroom-template",
      layout: "vertical-stack",
      title: "Climate",
      entityIds: ["sensor.office_temperature", "sensor.office_humidity"],
    });

    expect(bubble).toEqual({
      type: "horizontal-stack",
      cards: [
        {
          type: "custom:bubble-card",
          card_type: "button",
          button_type: "state",
          name: "light.office",
          entity: "light.office",
          show_state: true,
        },
        {
          type: "custom:bubble-card",
          card_type: "button",
          button_type: "state",
          name: "switch.office_fan",
          entity: "switch.office_fan",
          show_state: true,
        },
      ],
    });
    expect(mushroom).toEqual({
      type: "vertical-stack",
      cards: [
        {
          type: "custom:mushroom-template-card",
          primary: "sensor.office_temperature",
          secondary: "sensor.office_temperature",
          entity: "sensor.office_temperature",
        },
        {
          type: "custom:mushroom-template-card",
          primary: "sensor.office_humidity",
          secondary: "sensor.office_humidity",
          entity: "sensor.office_humidity",
        },
      ],
    });
    expect(serializeHomeAssistantEntitiesCardConfiguration(bubble, "yaml")).toBe([
      "type: horizontal-stack",
      "cards:",
      "  - type: \"custom:bubble-card\"",
      "    card_type: \"button\"",
      "    button_type: \"state\"",
      "    name: \"light.office\"",
      "    entity: \"light.office\"",
      "    show_state: true",
      "  - type: \"custom:bubble-card\"",
      "    card_type: \"button\"",
      "    button_type: \"state\"",
      "    name: \"switch.office_fan\"",
      "    entity: \"switch.office_fan\"",
      "    show_state: true",
    ].join("\n"));
    expect(parseHomeAssistantEntitiesCardConfiguration(JSON.stringify(mushroom))).toEqual({
      format: "json",
      target: "mushroom-template",
      layout: "vertical-stack",
      card: mushroom,
    });
    expect(parseHomeAssistantEntitiesCardConfiguration(serializeHomeAssistantEntitiesCardConfiguration(bubble, "yaml"))).toEqual({
      format: "yaml",
      target: "bubble",
      layout: "horizontal-stack",
      card: bubble,
    });
  });

  it("lists supported card targets with dependency metadata", () => {
    expect(listHomeAssistantCardTargets()).toEqual([
      {
        target: "entities",
        label: "Entities",
        type: "entities",
        dependency: { id: "home-assistant", label: "Home Assistant built-in", required: false, resourcePaths: [], installPaths: [] },
      },
      {
        target: "mushroom-template",
        label: "Mushroom template",
        type: "custom:mushroom-template-card",
        dependency: {
          id: "mushroom",
          label: "Mushroom",
          required: true,
          resourcePaths: ["/hacsfiles/lovelace-mushroom/mushroom.js"],
          installPaths: [],
        },
      },
      {
        target: "bubble",
        label: "Bubble button",
        type: "custom:bubble-card",
        dependency: {
          id: "bubble-card",
          label: "Bubble Card",
          required: true,
          resourcePaths: ["/hacsfiles/Bubble-Card/bubble-card.js"],
          installPaths: [],
        },
      },
    ]);
    expect(findHomeAssistantCardTargetDescriptor("bubble")?.label).toBe("Bubble button");
  });

  it("inspects custom card dependency availability from Lovelace resources", () => {
    expect(inspectHomeAssistantCardDependencyAvailability("entities", [])).toMatchObject({
      status: "not-required",
      matchedResourcePaths: [],
      missingResourcePaths: [],
    });
    expect(inspectHomeAssistantCardDependencyAvailability("bubble", [
      "/hacsfiles/Bubble-Card/bubble-card.js?v=2.4.0",
      { url: "https://atlas.local/hacsfiles/lovelace-mushroom/mushroom.js" },
    ])).toMatchObject({
      status: "installed",
      matchedResourcePaths: ["/hacsfiles/Bubble-Card/bubble-card.js"],
      missingResourcePaths: [],
    });
    expect(inspectHomeAssistantCardDependencyAvailability("bubble", [
      "/hacsfiles/bubble-card/bubble-card.js",
    ])).toMatchObject({
      status: "missing",
      matchedResourcePaths: [],
      missingResourcePaths: ["/hacsfiles/Bubble-Card/bubble-card.js"],
    });
    expect(inspectHomeAssistantCardDependencyAvailability("mushroom-template", [
      "/hacsfiles/lovelace-mushroom/mushroom.js",
    ])).toMatchObject({
      status: "installed",
      matchedResourcePaths: ["/hacsfiles/lovelace-mushroom/mushroom.js"],
      missingResourcePaths: [],
    });
  });

  it("parses Mushroom and Bubble cards", () => {
    expect(parseHomeAssistantEntitiesCardConfiguration([
      "type: custom:mushroom-template-card",
      "primary: Office climate",
      "secondary: sensor.office_temperature",
      "entity: sensor.office_temperature",
    ].join("\n"))).toEqual({
      format: "yaml",
      target: "mushroom-template",
      layout: "single",
      card: {
        type: "custom:mushroom-template-card",
        primary: "Office climate",
        secondary: "sensor.office_temperature",
        entity: "sensor.office_temperature",
      },
    });
    expect(parseHomeAssistantEntitiesCardConfiguration(JSON.stringify({
      type: "custom:bubble-card",
      card_type: "button",
      button_type: "state",
      name: "Office light",
      entity: "light.office",
    }))).toEqual({
      format: "json",
      target: "bubble",
      layout: "single",
      card: {
        type: "custom:bubble-card",
        card_type: "button",
        button_type: "state",
        name: "Office light",
        entity: "light.office",
        show_state: true,
      },
    });
  });

  it("rejects cards without supported entities", () => {
    expect(() => parseHomeAssistantEntitiesCardConfiguration("type: markdown\ncontent: test")).toThrow();
    expect(() => parseHomeAssistantEntitiesCardConfiguration("{\"type\":\"entities\",\"entities\":[]}")).toThrow();
  });
});
