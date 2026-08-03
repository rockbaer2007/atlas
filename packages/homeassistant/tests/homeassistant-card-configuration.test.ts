import { describe, expect, it } from "vitest";

import {
  createHomeAssistantCardExportManifest,
  createHomeAssistantCardExportPackage,
  createHomeAssistantCardExportPayload,
  createHomeAssistantCardConfiguration,
  createHomeAssistantEntitiesCardConfiguration,
  createHomeAssistantLovelaceResourceReferences,
  createHomeAssistantCardArtifactReview,
  decideHomeAssistantCardArtifactImport,
  findHomeAssistantCardTargetDescriptor,
  inspectHomeAssistantCardArtifact,
  inspectHomeAssistantCardDependency,
  inspectHomeAssistantCardDependencyAvailability,
  listHomeAssistantCardTargets,
  parseHomeAssistantEntitiesCardConfiguration,
  previewHomeAssistantCardArtifactFields,
  previewHomeAssistantCardArtifactMapping,
  serializeHomeAssistantLovelaceResourceReferences,
  serializeHomeAssistantEntitiesCardConfiguration,
  summarizeHomeAssistantCardImport,
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
      installPaths: ["HACS > Frontend > Mushroom", "/hacsfiles/lovelace-mushroom/mushroom.js"],
    });
    expect(inspectHomeAssistantCardDependency(bubble)).toEqual({
      id: "bubble-card",
      label: "Bubble Card",
      required: true,
      resourcePaths: ["/hacsfiles/Bubble-Card/bubble-card.js"],
      installPaths: ["HACS > Frontend > Bubble Card", "/hacsfiles/Bubble-Card/bubble-card.js"],
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
          installPaths: ["HACS > Frontend > Mushroom", "/hacsfiles/lovelace-mushroom/mushroom.js"],
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
          installPaths: ["HACS > Frontend > Bubble Card", "/hacsfiles/Bubble-Card/bubble-card.js"],
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

  it("creates copy-ready Lovelace resource references for custom card targets", () => {
    expect(createHomeAssistantLovelaceResourceReferences("entities")).toEqual([]);
    expect(createHomeAssistantLovelaceResourceReferences("bubble")).toEqual([
      {
        url: "/hacsfiles/Bubble-Card/bubble-card.js",
        type: "module",
      },
    ]);
    expect(serializeHomeAssistantLovelaceResourceReferences("bubble", "yaml")).toBe([
      "- url: \"/hacsfiles/Bubble-Card/bubble-card.js\"",
      "  type: \"module\"",
    ].join("\n"));
    expect(serializeHomeAssistantLovelaceResourceReferences("mushroom-template", "json")).toBe(JSON.stringify([
      {
        url: "/hacsfiles/lovelace-mushroom/mushroom.js",
        type: "module",
      },
    ], null, 2));
  });

  it("creates export manifests with stable filenames and dependency metadata", () => {
    const card = createHomeAssistantCardConfiguration({
      target: "bubble",
      layout: "vertical-stack",
      title: "Office controls",
      entityIds: ["light.office", "switch.office_fan"],
    });

    expect(createHomeAssistantCardExportManifest({
      card,
      format: "yaml",
      name: "Office Controls",
    })).toEqual({
      name: "Office Controls",
      filename: "office-controls-bubble-vertical-stack.yaml",
      format: "yaml",
      mimeType: "text/yaml",
      target: "bubble",
      layout: "vertical-stack",
      dependency: {
        id: "bubble-card",
        label: "Bubble Card",
        required: true,
        resourcePaths: ["/hacsfiles/Bubble-Card/bubble-card.js"],
        installPaths: ["HACS > Frontend > Bubble Card", "/hacsfiles/Bubble-Card/bubble-card.js"],
      },
    });

    expect(createHomeAssistantCardExportManifest({
      card: createHomeAssistantEntitiesCardConfiguration({ title: "Overview", entityIds: ["sensor.office"] }),
      format: "json",
    })).toMatchObject({
      name: "ATLAS Home Assistant card",
      filename: "atlas-home-assistant-card-entities-single.json",
      mimeType: "application/json",
      target: "entities",
      layout: "single",
    });
  });

  it("creates export payloads with serialized content and manifest metadata", () => {
    const card = createHomeAssistantCardConfiguration({
      target: "mushroom-template",
      title: "Office climate",
      entityIds: ["sensor.office_temperature"],
    });
    const payload = createHomeAssistantCardExportPayload({
      card,
      format: "json",
      name: "Office Climate",
    });

    expect(payload.manifest).toMatchObject({
      filename: "office-climate-mushroom-template-single.json",
      mimeType: "application/json",
      target: "mushroom-template",
      layout: "single",
    });
    expect(JSON.parse(payload.content)).toEqual(card);
  });

  it("creates and imports ATLAS Home Assistant card packages", () => {
    const card = createHomeAssistantCardConfiguration({
      target: "bubble",
      title: "Office light",
      entityIds: ["light.office"],
    });
    const cardPackage = createHomeAssistantCardExportPackage({
      card,
      format: "yaml",
      name: "Office Light",
    });

    expect(cardPackage).toMatchObject({
      version: 1,
      kind: "atlas.homeassistant.card",
      manifest: {
        filename: "office-light-bubble-single.yaml",
        format: "yaml",
        target: "bubble",
        layout: "single",
      },
    });
    expect(cardPackage.content).toContain("type: \"custom:bubble-card\"");

    expect(summarizeHomeAssistantCardImport(JSON.stringify(cardPackage))).toMatchObject({
      title: "Office light",
      entityIds: ["light.office"],
      format: "yaml",
      target: "bubble",
      layout: "single",
      packaged: true,
    });
    expect(summarizeHomeAssistantCardImport(cardPackage.content)).toMatchObject({
      packaged: false,
    });
  });

  it("inspects import artifacts before parsing them", () => {
    const cardPackage = createHomeAssistantCardExportPackage({
      card: createHomeAssistantCardConfiguration({
        target: "bubble",
        title: "Door",
        entityIds: ["binary_sensor.door"],
      }),
      format: "json",
      name: "Door",
    });

    expect(inspectHomeAssistantCardArtifact(JSON.stringify(cardPackage))).toEqual({
      kind: "atlas-card-package",
      format: "json",
      importable: true,
      requiresReview: false,
      reason: "The artifact is an ATLAS Home Assistant card package.",
    });
    expect(inspectHomeAssistantCardArtifact(JSON.stringify({
      type: "custom:bubble-card",
      entity: "light.office",
    }))).toMatchObject({
      kind: "home-assistant-card",
      format: "json",
      importable: true,
      requiresReview: false,
    });
    expect(inspectHomeAssistantCardArtifact("type: entities\nentities:\n  - light.office")).toMatchObject({
      kind: "home-assistant-card",
      format: "yaml",
      importable: true,
      requiresReview: false,
    });
  });

  it("flags external card-builder shaped artifacts for explicit review", () => {
    expect(inspectHomeAssistantCardArtifact(JSON.stringify({
      name: "Imported Builder Card",
      blocks: [
        {
          id: "state",
          type: "entity-state",
        },
      ],
      entity_slots: [
        "main",
      ],
    }))).toEqual({
      kind: "external-card-builder-artifact",
      format: "json",
      importable: false,
      requiresReview: true,
      reason: "The artifact resembles an external card-builder export and needs explicit compatibility mapping before import.",
    });
    expect(inspectHomeAssistantCardArtifact("hello")).toEqual({
      kind: "unknown",
      format: "unknown",
      importable: false,
      requiresReview: true,
      reason: "The artifact does not match a supported ATLAS, Home Assistant or known external card-builder shape.",
    });
  });

  it("decides whether inspected artifacts can import, require review or must be rejected", () => {
    expect(decideHomeAssistantCardArtifactImport(JSON.stringify({
      type: "entities",
      title: "Office",
      entities: [
        "sensor.office",
      ],
    }))).toMatchObject({
      action: "import",
      message: "Import can continue with the supported ATLAS or Home Assistant card artifact.",
      inspection: {
        kind: "home-assistant-card",
        importable: true,
      },
    });
    expect(decideHomeAssistantCardArtifactImport(JSON.stringify({
      card_builder_version: "2.6.0",
      blocks: [],
    }))).toMatchObject({
      action: "review",
      message: "Show a compatibility review before importing this external card-builder artifact.",
      inspection: {
        kind: "external-card-builder-artifact",
        requiresReview: true,
      },
    });
    expect(decideHomeAssistantCardArtifactImport("not a card")).toMatchObject({
      action: "reject",
      message: "Reject this artifact because ATLAS cannot identify a safe import path.",
      inspection: {
        kind: "unknown",
        importable: false,
      },
    });
  });

  it("creates a compatibility review for external card-builder artifacts", () => {
    expect(createHomeAssistantCardArtifactReview(JSON.stringify({
      card_builder_version: "2.6.0",
      blocks: [
        { id: "title" },
        { id: "state" },
      ],
      entitySlots: [
        "main",
      ],
    }))).toEqual({
      inspection: {
        kind: "external-card-builder-artifact",
        format: "json",
        importable: false,
        requiresReview: true,
        reason: "The artifact resembles an external card-builder export and needs explicit compatibility mapping before import.",
      },
      items: [
        {
          id: "license",
          label: "License boundary",
          severity: "warning",
          detail: "External card-builder artifacts require explicit compatibility mapping and attribution review before import.",
        },
        {
          id: "blocks",
          label: "Block model",
          severity: "info",
          detail: "2 possible visual blocks detected.",
        },
        {
          id: "entity-slots",
          label: "Entity slots",
          severity: "info",
          detail: "1 possible entity slots detected.",
        },
        {
          id: "next-step",
          label: "Next step",
          severity: "info",
          detail: "Map the external artifact into ATLAS template fields before enabling import.",
        },
      ],
      recommendedAction: "map-schema",
    });
  });

  it("rejects compatibility review for unsupported artifacts", () => {
    expect(createHomeAssistantCardArtifactReview("type: entities\nentities:\n  - sensor.office")).toMatchObject({
      inspection: {
        kind: "home-assistant-card",
      },
      items: [
        {
          id: "unsupported-review",
          severity: "blocked",
        },
      ],
      recommendedAction: "reject",
    });
  });

  it("previews schema mappings from external blocks to ATLAS templates", () => {
    expect(previewHomeAssistantCardArtifactMapping(JSON.stringify({
      card_builder_version: "2.6.0",
      blocks: [
        { id: "main", type: "entity-state" },
        { id: "fan", type: "switch-control" },
        { id: "row", type: "horizontal-layout" },
        { id: "custom", type: "chart" },
      ],
    }))).toEqual({
      inspection: {
        kind: "external-card-builder-artifact",
        format: "json",
        importable: false,
        requiresReview: true,
        reason: "The artifact resembles an external card-builder export and needs explicit compatibility mapping before import.",
      },
      mappings: [
        {
          sourceId: "main",
          sourceType: "entity-state",
          templateId: "state-button",
          confidence: "high",
          reason: "State-like blocks map to the ATLAS state button template.",
        },
        {
          sourceId: "fan",
          sourceType: "switch-control",
          templateId: "switch-button",
          confidence: "high",
          reason: "Switch-like blocks map to the ATLAS switch button template.",
        },
        {
          sourceId: "row",
          sourceType: "horizontal-layout",
          templateId: "horizontal-stack",
          confidence: "medium",
          reason: "Horizontal layout blocks can map to an ATLAS horizontal stack template.",
        },
      ],
      unmappedBlocks: ["custom"],
    });
  });

  it("does not preview mappings for already supported Home Assistant cards", () => {
    expect(previewHomeAssistantCardArtifactMapping(JSON.stringify({
      type: "entities",
      entities: ["sensor.office"],
    }))).toMatchObject({
      inspection: {
        kind: "home-assistant-card",
      },
      mappings: [],
      unmappedBlocks: [],
    });
  });

  it("previews ATLAS editor fields from mapped external blocks", () => {
    expect(previewHomeAssistantCardArtifactFields(JSON.stringify({
      card_builder_version: "2.6.0",
      blocks: [
        { id: "main", type: "entity-state" },
        { id: "fan", type: "switch-control" },
        { id: "unknown", type: "chart" },
      ],
    }))).toMatchObject({
      inspection: {
        kind: "external-card-builder-artifact",
      },
      fields: [
        {
          id: "main",
          target: "bubble",
          layout: "card",
          column: 0,
          row: 0,
          width: 3,
          height: 2,
        },
        {
          id: "fan",
          target: "bubble",
          layout: "card",
          column: 6,
          row: 0,
          width: 3,
          height: 2,
        },
      ],
      unmappedBlocks: ["unknown"],
      requiresReview: true,
    });
  });

  it("serializes nested Home Assistant stack cards recursively", () => {
    expect(serializeHomeAssistantEntitiesCardConfiguration({
      type: "vertical-stack",
      cards: [
        {
          type: "horizontal-stack",
          cards: [
            {
              type: "custom:bubble-card",
              card_type: "button",
              button_type: "state",
              name: "Door",
              entity: "binary_sensor.door",
              show_state: true,
            },
            {
              type: "entities",
              title: "Status",
              entities: [
                { entity: "sensor.status" },
              ],
            },
          ],
        },
      ],
    }, "yaml")).toBe([
      "type: vertical-stack",
      "cards:",
      "  - type: horizontal-stack",
      "    cards:",
      "      - type: \"custom:bubble-card\"",
      "        card_type: \"button\"",
      "        button_type: \"state\"",
      "        name: \"Door\"",
      "        entity: \"binary_sensor.door\"",
      "        show_state: true",
      "      - type: entities",
      "        title: \"Status\"",
      "        entities:",
      "          - entity: \"sensor.status\"",
    ].join("\n"));
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

  it("summarizes imported cards for host editors", () => {
    const summary = summarizeHomeAssistantCardImport([
      "type: horizontal-stack",
      "cards:",
      "  - type: \"custom:bubble-card\"",
      "    card_type: \"button\"",
      "    button_type: \"state\"",
      "    name: \"Office light\"",
      "    entity: \"light.office\"",
      "    show_state: true",
      "  - type: \"custom:bubble-card\"",
      "    card_type: \"button\"",
      "    button_type: \"state\"",
      "    name: \"Office fan\"",
      "    entity: \"switch.office_fan\"",
      "    show_state: true",
    ].join("\n"));

    expect(summary).toMatchObject({
      title: "Office light",
      entityIds: ["light.office", "switch.office_fan"],
      format: "yaml",
      target: "bubble",
      layout: "horizontal-stack",
      packaged: false,
      dependency: {
        id: "bubble-card",
        label: "Bubble Card",
        required: true,
        resourcePaths: ["/hacsfiles/Bubble-Card/bubble-card.js"],
        installPaths: ["HACS > Frontend > Bubble Card", "/hacsfiles/Bubble-Card/bubble-card.js"],
      },
    });
  });

  it("rejects cards without supported entities", () => {
    expect(() => parseHomeAssistantEntitiesCardConfiguration("type: markdown\ncontent: test")).toThrow();
    expect(() => parseHomeAssistantEntitiesCardConfiguration("{\"type\":\"entities\",\"entities\":[]}")).toThrow();
  });
});
