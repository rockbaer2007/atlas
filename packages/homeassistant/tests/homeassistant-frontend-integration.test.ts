import { describe, expect, it } from "vitest";

import {
  createAtlasFrontendResource,
  createHomeAssistantCardEditorDependencyPlan,
  createHomeAssistantCardEditorPackagePlan,
  createHomeAssistantAtlasFrontendResourceReferences,
  createHomeAssistantAtlasFrontendIntegrationPlan,
  normalizeHomeAssistantCardEditorScriptFilename,
  inspectAtlasFrontendResourceAvailability,
  serializeHomeAssistantAtlasFrontendResourceReferences,
} from "../src";

describe("Home Assistant frontend integration planning", () => {
  it("creates a self-hosted ATLAS frontend resource with a normalized resource path", () => {
    expect(createAtlasFrontendResource("server", "https://atlas.local/local/atlas/panel.js?v=1")).toEqual({
      id: "atlas-server",
      label: "ATLAS self-hosted frontend",
      required: true,
      resourcePaths: ["/local/atlas/panel.js"],
      installSteps: [
        "Serve the ATLAS Home Assistant panel from the ATLAS server",
        "/local/atlas/panel.js",
      ],
    });
  });

  it("creates the planned HACS ATLAS frontend resource", () => {
    expect(createAtlasFrontendResource("hacs")).toEqual({
      id: "atlas-hacs",
      label: "ATLAS HACS frontend integration",
      required: true,
      resourcePaths: ["/hacsfiles/atlas/atlas-homeassistant-panel.js"],
      installSteps: [
        "HACS > Custom repositories > ATLAS",
        "HACS > Frontend > ATLAS",
        "/hacsfiles/atlas/atlas-homeassistant-panel.js",
      ],
    });
  });

  it("checks whether the ATLAS frontend resource is registered in Lovelace", () => {
    const resource = createAtlasFrontendResource("server", "/local/atlas/panel.js");

    expect(inspectAtlasFrontendResourceAvailability(resource, [
      "https://homeassistant.local/local/atlas/panel.js?v=2026.8",
    ])).toMatchObject({
      status: "installed",
      matchedResourcePaths: ["/local/atlas/panel.js"],
      missingResourcePaths: [],
    });

    expect(inspectAtlasFrontendResourceAvailability(resource, [
      "/local/atlas/other-panel.js",
    ])).toMatchObject({
      status: "missing",
      matchedResourcePaths: [],
      missingResourcePaths: ["/local/atlas/panel.js"],
    });
  });

  it("combines ATLAS and card dependency readiness in one integration plan", () => {
    const plan = createHomeAssistantAtlasFrontendIntegrationPlan({
      mode: "hacs",
      cardTarget: "bubble",
      resources: [
        "/hacsfiles/atlas/atlas-homeassistant-panel.js",
        "/hacsfiles/Bubble-Card/bubble-card.js",
      ],
    });

    expect(plan.ready).toBe(true);
    expect(plan.requiredResourcePaths).toEqual([
      "/hacsfiles/atlas/atlas-homeassistant-panel.js",
      "/hacsfiles/Bubble-Card/bubble-card.js",
    ]);
    expect(plan.installSteps).toContain("HACS > Frontend > ATLAS");
    expect(plan.installSteps).toContain("HACS > Frontend > Bubble Card");
  });

  it("reports missing custom card resources even when ATLAS itself is installed", () => {
    const plan = createHomeAssistantAtlasFrontendIntegrationPlan({
      mode: "server",
      serverResourcePath: "/local/atlas/panel.js",
      cardTarget: "mushroom-template",
      resources: ["/local/atlas/panel.js"],
    });

    expect(plan.ready).toBe(false);
    expect(plan.atlasAvailability.status).toBe("installed");
    expect(plan.cardAvailability).toMatchObject({
      status: "missing",
      missingResourcePaths: ["/hacsfiles/lovelace-mushroom/mushroom.js"],
    });
  });

  it("creates copy-ready Lovelace resources for ATLAS and the selected card dependency", () => {
    const input = {
      mode: "server" as const,
      serverResourcePath: "/local/atlas/panel.js",
      cardTarget: "bubble" as const,
    };

    expect(createHomeAssistantAtlasFrontendResourceReferences(input)).toEqual([
      {
        url: "/local/atlas/panel.js",
        type: "module",
      },
      {
        url: "/hacsfiles/Bubble-Card/bubble-card.js",
        type: "module",
      },
    ]);
    expect(serializeHomeAssistantAtlasFrontendResourceReferences(input, "yaml")).toBe([
      "- url: \"/local/atlas/panel.js\"",
      "  type: \"module\"",
      "- url: \"/hacsfiles/Bubble-Card/bubble-card.js\"",
      "  type: \"module\"",
    ].join("\n"));
    expect(serializeHomeAssistantAtlasFrontendResourceReferences({
      mode: "hacs",
      cardTarget: "entities",
    }, "json")).toBe(JSON.stringify([
      {
        url: "/hacsfiles/atlas/atlas-homeassistant-panel.js",
        type: "module",
      },
    ], null, 2));
  });

  it("plans a HACS card editor package with demo entities and a custom script filename", () => {
    expect(createHomeAssistantCardEditorPackagePlan({
      cardName: "Energy Kitchen",
      scriptFilename: "energy-kitchen.js",
    })).toEqual({
      cardName: "Energy Kitchen",
      scriptFilename: "energy-kitchen.js",
      resourcePath: "/hacsfiles/atlas/energy-kitchen.js",
      editorMode: "simple",
      simpleTarget: "entities",
      defaultEntityIds: [
        "binary_sensor.atlas_status",
        "sensor.atlas_temperature",
      ],
      supportedLayouts: [
        "single",
        "horizontal-stack",
        "vertical-stack",
      ],
      supportedFieldTargets: [
        "entities",
        "bubble",
        "mushroom-template",
      ],
      fields: [],
      layoutMode: "drag-and-drop",
      replacementHint: "Replace the demo entities with your own Home Assistant entities.",
    });
  });

  it("plans expert card editor fields with per-field card targets", () => {
    expect(createHomeAssistantCardEditorPackagePlan({
      cardName: "Kitchen Panel",
      editorMode: "expert",
      fields: [
        {
          id: " main light ",
          target: "bubble",
          entityId: " light.kitchen ",
          column: 1.8,
          row: -1,
          width: 2.2,
          height: 0,
        },
        {
          id: "",
          target: "mushroom-template",
          entityId: "sensor.kitchen_temperature",
          column: 3,
          row: 1,
          width: 1,
          height: 1,
        },
      ],
    }).fields).toEqual([
      {
        id: "main light",
        target: "bubble",
        entityId: "light.kitchen",
        column: 1,
        row: 0,
        width: 2,
        height: 1,
      },
      {
        id: "mushroom-template-sensor.kitchen_temperature",
        target: "mushroom-template",
        entityId: "sensor.kitchen_temperature",
        column: 3,
        row: 1,
        width: 1,
        height: 1,
      },
    ]);
  });

  it("tracks the selected simple editor card target dependency", () => {
    expect(createHomeAssistantCardEditorDependencyPlan({
      editorMode: "simple",
      simpleTarget: "bubble",
    })).toMatchObject({
      usedTargets: ["bubble"],
      requiredResourcePaths: ["/hacsfiles/Bubble-Card/bubble-card.js"],
      installSteps: ["HACS > Frontend > Bubble Card", "/hacsfiles/Bubble-Card/bubble-card.js"],
    });
  });

  it("combines dependencies from mixed expert editor fields", () => {
    const dependencyPlan = createHomeAssistantCardEditorDependencyPlan({
      editorMode: "expert",
      fields: [
        {
          id: "status",
          target: "entities",
          entityId: "binary_sensor.atlas_status",
          column: 0,
          row: 0,
          width: 1,
          height: 1,
        },
        {
          id: "temperature",
          target: "mushroom-template",
          entityId: "sensor.atlas_temperature",
          column: 1,
          row: 0,
          width: 1,
          height: 1,
        },
        {
          id: "door",
          target: "bubble",
          entityId: "binary_sensor.atlas_door",
          column: 0,
          row: 1,
          width: 2,
          height: 1,
        },
      ],
    });

    expect(dependencyPlan.usedTargets).toEqual(["entities", "mushroom-template", "bubble"]);
    expect(dependencyPlan.requiredResourcePaths).toEqual([
      "/hacsfiles/lovelace-mushroom/mushroom.js",
      "/hacsfiles/Bubble-Card/bubble-card.js",
    ]);
    expect(dependencyPlan.installSteps).toContain("HACS > Frontend > Mushroom");
    expect(dependencyPlan.installSteps).toContain("HACS > Frontend > Bubble Card");
  });

  it("normalizes user-defined card editor script filenames", () => {
    expect(normalizeHomeAssistantCardEditorScriptFilename("My Fancy Card")).toBe("my-fancy-card.js");
    expect(normalizeHomeAssistantCardEditorScriptFilename("already-ready.js")).toBe("already-ready.js");
    expect(normalizeHomeAssistantCardEditorScriptFilename("")).toBe("atlas-card.js");
  });
});
