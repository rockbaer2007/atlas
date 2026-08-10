import { describe, expect, it } from "vitest";

import {
  analyzeHomeAssistantCardEditorSurface,
  arrangeHomeAssistantCardEditorSurfaceFields,
  createAtlasFrontendResource,
  clampSurfaceFieldPlacement,
  createHomeAssistantCardBuilderInteropPlan,
  createHomeAssistantCardBuilderReference,
  createHomeAssistantCardConfiguration,
  createHomeAssistantCardEditorConfiguration,
  createHomeAssistantCardEditorDependencyPlan,
  createHomeAssistantCardEditorFieldFromTemplate,
  createHomeAssistantCardEditorHacsBundle,
  createHomeAssistantCardEditorHacsBundleArchive,
  createHomeAssistantCardEditorPackagePlan,
  createHomeAssistantCardEditorScriptExport,
  createHomeAssistantCardEditorFrontendIntegrationPlan,
  createHomeAssistantCardExportPackage,
  createHomeAssistantAtlasFrontendResourceReferences,
  createHomeAssistantAtlasFrontendIntegrationPlan,
  findHomeAssistantCardEditorTemplate,
  inspectHomeAssistantCardEditorHacsBundleArchive,
  listHomeAssistantCardEditorTemplates,
  normalizeHomeAssistantCustomElementName,
  normalizeHomeAssistantCardEditorScriptFilename,
  readHomeAssistantCardEditorHacsBundleArchivePackage,
  inspectAtlasFrontendResourceAvailability,
  serializeHomeAssistantCardEditorFrontendResourceReferences,
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

  it("keeps ATLAS and HACS frontend resource path matching case-sensitive", () => {
    const plan = createHomeAssistantAtlasFrontendIntegrationPlan({
      mode: "hacs",
      cardTarget: "bubble",
      resources: [
        "/hacsfiles/Atlas/atlas-homeassistant-panel.js",
        "/hacsfiles/bubble-card/bubble-card.js",
      ],
    });

    expect(plan.ready).toBe(false);
    expect(plan.atlasAvailability).toMatchObject({
      status: "missing",
      matchedResourcePaths: [],
      missingResourcePaths: ["/hacsfiles/atlas/atlas-homeassistant-panel.js"],
    });
    expect(plan.cardAvailability).toMatchObject({
      status: "missing",
      matchedResourcePaths: [],
      missingResourcePaths: ["/hacsfiles/Bubble-Card/bubble-card.js"],
    });
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
        "entity",
        "button",
        "sensor",
        "thermostat",
        "link",
        "webpage",
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
        bubbleButtonType: "state",
        entityId: "light.kitchen",
        layout: "card",
        entries: [],
        column: 1,
        row: 0,
        width: 2,
        height: 1,
      },
      {
        id: "mushroom-template-sensor.kitchen_temperature",
        target: "mushroom-template",
        entityId: "sensor.kitchen_temperature",
        layout: "card",
        entries: [],
        column: 3,
        row: 1,
        width: 1,
        height: 1,
      },
    ]);
  });

  it("lists visual sidebar templates for expert card placement", () => {
    expect(listHomeAssistantCardEditorTemplates().map(template => template.id)).toEqual([
      "entity-list",
      "entity-card",
      "button-card",
      "grid",
      "sensor-card",
      "thermostat-card",
      "link-card",
      "webpage-card",
      "state-button",
      "switch-button",
      "vertical-stack",
      "horizontal-stack",
    ]);
    expect(listHomeAssistantCardEditorTemplates().map(template => [template.id, template.defaultWidth, template.defaultHeight])).toEqual([
      ["entity-list", 4, 2],
      ["entity-card", 4, 2],
      ["button-card", 4, 2],
      ["grid", 6, 3],
      ["sensor-card", 4, 2],
      ["thermostat-card", 4, 3],
      ["link-card", 4, 2],
      ["webpage-card", 8, 4],
      ["state-button", 4, 2],
      ["switch-button", 4, 2],
      ["vertical-stack", 4, 2],
      ["horizontal-stack", 4, 2],
    ]);
    expect(findHomeAssistantCardEditorTemplate("switch-button")).toMatchObject({
      label: "Switch button",
      target: "bubble",
      defaultEntityDomain: "switch",
      preview: ["Switch", "On/off"],
    });
  });

  it("creates bounded expert fields from sidebar templates and selected card families", () => {
    expect(createHomeAssistantCardEditorFieldFromTemplate({
      template: "state-button",
      target: "mushroom-template",
      entityId: "sensor.office_temperature",
      id: "Office temperature",
      column: 11,
      row: 11,
      width: 4,
      height: 3,
      bounds: {
        columns: 12,
        rows: 12,
      },
    })).toEqual({
      id: "Office temperature",
      target: "mushroom-template",
      entityId: "sensor.office_temperature",
      layout: "card",
      entries: [],
      column: 8,
      row: 9,
      width: 4,
      height: 3,
    });
  });

  it("creates stack fields from sidebar templates", () => {
    expect(createHomeAssistantCardEditorFieldFromTemplate({
      template: "vertical-stack",
      target: "bubble",
      entityId: "switch.office_fan",
      column: 2,
      row: 1,
    })).toMatchObject({
      id: "Vertical stack",
      target: "bubble",
      entityId: "switch.office_fan",
      layout: "vertical-stack",
      entries: [
        {
          id: "Vertical stack item",
          target: "bubble",
          entityId: "switch.office_fan",
        },
      ],
      column: 2,
      row: 1,
      width: 4,
      height: 2,
    });
  });

  it("analyzes expert editor surface occupancy and empty fields", () => {
    expect(analyzeHomeAssistantCardEditorSurface([
      {
        id: "Kitchen light",
        target: "bubble",
        bubbleButtonType: "switch",
        entityId: "switch.kitchen_light",
        layout: "card",
        entries: [],
        column: 0,
        row: 0,
        width: 4,
        height: 2,
      },
      {
        id: "Climate links",
        target: "entities",
        entityId: "",
        layout: "horizontal-stack",
        entries: [
          {
            id: "Temperature",
            target: "mushroom-template",
            entityId: "sensor.kitchen_temperature",
          },
          {
            id: "Placeholder",
            target: "bubble",
            bubbleButtonType: "name",
            entityId: "",
          },
        ],
        column: 4,
        row: 0,
        width: 8,
        height: 2,
      },
      {
        id: "Empty field",
        target: "entities",
        entityId: "",
        layout: "card",
        entries: [],
        column: 0,
        row: 3,
        width: 4,
        height: 2,
      },
    ])).toEqual({
      fieldCount: 3,
      populatedFieldCount: 2,
      emptyFieldCount: 1,
      overlapCount: 0,
      rowCount: 2,
      usedColumns: 12,
      usedRows: 5,
      usedTargets: ["bubble", "mushroom-template", "entities"],
      layouts: ["card", "horizontal-stack"],
      emptyFieldIds: ["Empty field"],
      overlappingFieldIds: [],
      overlaps: [],
    });
  });

  it("detects overlapping expert editor surface fields", () => {
    expect(analyzeHomeAssistantCardEditorSurface([
      {
        id: "Top left",
        target: "entities",
        entityId: "sensor.top_left",
        column: 0,
        row: 0,
        width: 4,
        height: 2,
      },
      {
        id: "Touching edge",
        target: "entities",
        entityId: "sensor.touching_edge",
        column: 4,
        row: 0,
        width: 2,
        height: 2,
      },
      {
        id: "Overlapping",
        target: "button",
        entityId: "light.overlapping",
        column: 3,
        row: 1,
        width: 3,
        height: 2,
      },
    ])).toMatchObject({
      overlapCount: 2,
      overlappingFieldIds: ["Top left", "Overlapping", "Touching edge"],
      overlaps: [
        {
          firstFieldId: "Top left",
          secondFieldId: "Overlapping",
        },
        {
          firstFieldId: "Touching edge",
          secondFieldId: "Overlapping",
        },
      ],
    });
  });

  it("arranges expert editor fields into free grid positions", () => {
    const arrangedFields = arrangeHomeAssistantCardEditorSurfaceFields([
      {
        id: "Second",
        target: "entities",
        entityId: "sensor.second",
        column: 0,
        row: 0,
        width: 3,
        height: 2,
      },
      {
        id: "First",
        target: "entities",
        entityId: "sensor.first",
        column: 0,
        row: 0,
        width: 4,
        height: 2,
      },
      {
        id: "Third",
        target: "button",
        entityId: "light.third",
        column: 2,
        row: 1,
        width: 3,
        height: 2,
      },
    ], {
      columns: 8,
      rows: 4,
    });

    expect(arrangedFields.map(field => [field.id, field.column, field.row, field.width, field.height])).toEqual([
      ["First", 0, 0, 4, 2],
      ["Second", 4, 0, 3, 2],
      ["Third", 0, 2, 3, 2],
    ]);
    expect(analyzeHomeAssistantCardEditorSurface(arrangedFields).overlapCount).toBe(0);
  });

  it("uses custom titles for stack field entries", () => {
    expect(createHomeAssistantCardEditorFieldFromTemplate({
      template: "horizontal-stack",
      target: "mushroom-template",
      entityId: "sensor.office_temperature",
      id: "Office temperature",
      column: 0,
      row: 0,
    }).entries).toEqual([
      {
        id: "Office temperature item",
        target: "mushroom-template",
        entityId: "sensor.office_temperature",
      },
    ]);
  });

  it("clamps surface placement inside the editor grid", () => {
    expect(clampSurfaceFieldPlacement({
      column: 8.8,
      row: -1,
      width: 8,
      height: 0,
    }, {
      columns: 10,
      rows: 6,
    })).toEqual({
      column: 2,
      row: 0,
      width: 8,
      height: 1,
    });
  });

  it("tracks card builder as an attributed external reference instead of a copied dependency", () => {
    expect(createHomeAssistantCardBuilderReference()).toEqual({
      name: "studiobts/home-assistant-card-builder",
      repositoryUrl: "https://github.com/studiobts/home-assistant-card-builder",
      license: "AGPL-3.0",
      usage: ["inspiration", "interop-candidate", "fork-candidate"],
      attributionRequired: true,
      cloneRecommended: false,
      notes: [
        "Use as an external product and architecture reference for the ATLAS Home Assistant editor.",
        "Do not copy source code into ATLAS without explicitly accepting AGPL-3.0 obligations.",
        "If ATLAS ever becomes a fork or derivative, keep original copyright notices and publish source according to AGPL-3.0.",
        "Prefer independent ATLAS contracts, import/export compatibility and clear documentation references.",
      ],
    });
  });

  it("plans card builder interoperability without source copying", () => {
    const interopPlan = createHomeAssistantCardBuilderInteropPlan();

    expect(interopPlan.sourceCodePolicy).toBe("do-not-copy");
    expect(interopPlan.recommendedNextStep).toBe(
      "Keep ATLAS independent, then add import/export compatibility only through documented schemas and explicit attribution.",
    );
    expect(interopPlan.capabilities).toEqual([
      {
        id: "product-reference",
        label: "Use product concepts as an external reference",
        status: "supported",
        reason: "Public behavior, documentation and product ideas can inform independent ATLAS contracts.",
      },
      {
        id: "atlas-importer",
        label: "Evaluate import of exported card artifacts",
        status: "planned",
        reason: "Import compatibility can be designed around documented artifacts without copying implementation code.",
      },
      {
        id: "atlas-exporter",
        label: "Evaluate export toward compatible Home Assistant card artifacts",
        status: "planned",
        reason: "ATLAS can expose its own export model and later map it to compatible formats when license boundaries are clear.",
      },
      {
        id: "source-clone",
        label: "Copy source code directly into ATLAS",
        status: "blocked-by-license",
        reason: "The reference project is AGPL-3.0; copying source would require an explicit derivative-work decision and license compliance.",
      },
      {
        id: "silent-fork",
        label: "Create an unattributed fork",
        status: "not-planned",
        reason: "ATLAS must keep original attribution and license notices if a fork is ever intentionally created.",
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
          layout: "vertical-stack",
          entries: [
            {
              id: "temperature",
              target: "mushroom-template",
              entityId: "sensor.atlas_temperature",
            },
            {
              id: "status",
              target: "entities",
              entityId: "binary_sensor.atlas_status",
            },
            {
              id: "door",
              target: "bubble",
              entityId: "binary_sensor.atlas_door",
            },
          ],
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

  it("creates frontend resource references for mixed expert editor dependencies", () => {
    const editorPlan = {
      editorMode: "expert" as const,
      fields: [
        {
          id: "temperature",
          target: "mushroom-template" as const,
          entityId: "sensor.atlas_temperature",
          column: 0,
          row: 0,
          width: 2,
          height: 1,
        },
        {
          id: "door",
          target: "bubble" as const,
          entityId: "binary_sensor.atlas_door",
          column: 2,
          row: 0,
          width: 2,
          height: 1,
        },
      ],
    };

    const integrationPlan = createHomeAssistantCardEditorFrontendIntegrationPlan({
      mode: "server",
      editorPlan,
      resources: [
        "/local/atlas/atlas-homeassistant-panel.js",
        "/hacsfiles/lovelace-mushroom/mushroom.js",
      ],
    });

    expect(integrationPlan).toMatchObject({
      requiredResourcePaths: [
        "/local/atlas/atlas-homeassistant-panel.js",
        "/hacsfiles/lovelace-mushroom/mushroom.js",
        "/hacsfiles/Bubble-Card/bubble-card.js",
      ],
      matchedCardResourcePaths: ["/hacsfiles/lovelace-mushroom/mushroom.js"],
      missingCardResourcePaths: ["/hacsfiles/Bubble-Card/bubble-card.js"],
      ready: false,
    });
    expect(serializeHomeAssistantCardEditorFrontendResourceReferences({
      mode: "server",
      editorPlan,
    }, "yaml")).toBe([
      "- url: \"/local/atlas/atlas-homeassistant-panel.js\"",
      "  type: \"module\"",
      "- url: \"/hacsfiles/lovelace-mushroom/mushroom.js\"",
      "  type: \"module\"",
      "- url: \"/hacsfiles/Bubble-Card/bubble-card.js\"",
      "  type: \"module\"",
    ].join("\n"));
  });

  it("creates a simple editor card configuration from the selected target and demo entities", () => {
    expect(createHomeAssistantCardEditorConfiguration({
      cardName: "Demo Status",
      editorMode: "simple",
      simpleTarget: "entities",
    })).toEqual({
      type: "entities",
      title: "Demo Status",
      entities: [
        { entity: "binary_sensor.atlas_status" },
        { entity: "sensor.atlas_temperature" },
      ],
    });
  });

  it("creates an ordered stack card configuration from expert editor fields", () => {
    expect(createHomeAssistantCardEditorConfiguration({
      editorMode: "expert",
      fields: [
        {
          id: "Door",
          target: "bubble",
          entityId: "binary_sensor.atlas_door",
          column: 1,
          row: 1,
          width: 1,
          height: 1,
        },
        {
          id: "Temperature",
          target: "mushroom-template",
          entityId: "sensor.atlas_temperature",
          column: 0,
          row: 0,
          width: 1,
          height: 1,
        },
      ],
    })).toEqual({
      type: "vertical-stack",
      cards: [
        {
          type: "custom:mushroom-template-card",
          primary: "Temperature",
          secondary: "sensor.atlas_temperature",
          entity: "sensor.atlas_temperature",
        },
        {
          type: "custom:bubble-card",
          card_type: "button",
          button_type: "state",
          name: "Door",
          entity: "binary_sensor.atlas_door",
          show_state: true,
        },
      ],
    });
  });

  it("creates nested horizontal and vertical stacks from an arbitrary expert surface", () => {
    expect(createHomeAssistantCardEditorConfiguration({
      editorMode: "expert",
      fields: [
        {
          id: "Top left",
          target: "bubble",
          entityId: "light.top_left",
          column: 0,
          row: 0,
          width: 2,
          height: 1,
        },
        {
          id: "Top right",
          target: "mushroom-template",
          entityId: "sensor.top_right",
          column: 2,
          row: 0,
          width: 2,
          height: 1,
        },
        {
          id: "Middle row",
          target: "entities",
          entityId: "binary_sensor.middle",
          column: 0,
          row: 1,
          width: 4,
          height: 1,
        },
        {
          id: "Bottom stack",
          target: "entities",
          entityId: "",
          layout: "vertical-stack",
          entries: [
            {
              id: "First",
              target: "bubble",
              entityId: "switch.first",
            },
            {
              id: "Second",
              target: "mushroom-template",
              entityId: "sensor.second",
            },
          ],
          column: 0,
          row: 2,
          width: 2,
          height: 2,
        },
        {
          id: "Bottom right",
          target: "bubble",
          entityId: "light.bottom_right",
          column: 2,
          row: 2,
          width: 2,
          height: 2,
        },
      ],
    })).toEqual({
      type: "vertical-stack",
      cards: [
        {
          type: "horizontal-stack",
          cards: [
            {
              type: "custom:bubble-card",
              card_type: "button",
              button_type: "state",
              name: "Top left",
              entity: "light.top_left",
              show_state: true,
            },
            {
              type: "custom:mushroom-template-card",
              primary: "Top right",
              secondary: "sensor.top_right",
              entity: "sensor.top_right",
            },
          ],
        },
        {
          type: "entities",
          title: "Middle row",
          entities: [
            { entity: "binary_sensor.middle" },
          ],
        },
        {
          type: "horizontal-stack",
          cards: [
            {
              type: "vertical-stack",
              cards: [
                {
                  type: "custom:bubble-card",
                  card_type: "button",
                  button_type: "state",
                  name: "First",
                  entity: "switch.first",
                  show_state: true,
                },
                {
                  type: "custom:mushroom-template-card",
                  primary: "Second",
                  secondary: "sensor.second",
                  entity: "sensor.second",
                },
              ],
            },
            {
              type: "custom:bubble-card",
              card_type: "button",
              button_type: "state",
              name: "Bottom right",
              entity: "light.bottom_right",
              show_state: true,
            },
          ],
        },
      ],
    });
  });

  it("falls back to demo entities when an expert editor plan has no populated fields", () => {
    expect(createHomeAssistantCardEditorConfiguration({
      cardName: "Empty Expert",
      editorMode: "expert",
      fields: [],
    })).toEqual({
      type: "entities",
      title: "Empty Expert",
      entities: [
        { entity: "binary_sensor.atlas_status" },
        { entity: "sensor.atlas_temperature" },
      ],
    });
  });

  it("normalizes user-defined card editor script filenames", () => {
    expect(normalizeHomeAssistantCardEditorScriptFilename("My Fancy Card")).toBe("my-fancy-card.js");
    expect(normalizeHomeAssistantCardEditorScriptFilename("already-ready.js")).toBe("already-ready.js");
    expect(normalizeHomeAssistantCardEditorScriptFilename("")).toBe("atlas-card.js");
  });

  it("creates an installable custom card script export with demo entity defaults", () => {
    const scriptExport = createHomeAssistantCardEditorScriptExport({
      cardName: "Energy Kitchen",
      scriptFilename: "Energy Kitchen.js",
      defaultEntityIds: ["sensor.energy_today", "binary_sensor.energy_ready"],
    });

    expect(scriptExport).toMatchObject({
      filename: "energy-kitchen.js",
      customElementName: "energy-kitchen",
      cardType: "custom:energy-kitchen",
      resourcePath: "/hacsfiles/atlas/energy-kitchen.js",
      defaultConfig: {
        type: "custom:energy-kitchen",
        title: "Energy Kitchen",
        entities: ["sensor.energy_today", "binary_sensor.energy_ready"],
        replacement_hint: "Replace the demo entities with your own Home Assistant entities.",
      },
    });
    expect(scriptExport.source).toContain("class EnergyKitchenCard extends HTMLElement");
    expect(scriptExport.source).toContain("static getStubConfig()");
    expect(scriptExport.source).toContain("customElements.define(\"energy-kitchen\"");
    expect(normalizeHomeAssistantCustomElementName("Kitchen")).toBe("kitchen-card");
    expect(normalizeHomeAssistantCustomElementName("123 Kitchen")).toBe("atlas-123-kitchen");
  });

  it("creates a zip-ready HACS card bundle file list from an ATLAS card package", () => {
    const editorPlan = createHomeAssistantCardEditorPackagePlan({
      cardName: "Energy Kitchen",
      scriptFilename: "energy-kitchen.js",
      defaultEntityIds: ["sensor.energy_today"],
    });
    const cardPackage = createHomeAssistantCardExportPackage({
      card: createHomeAssistantCardConfiguration({
        target: "entities",
        title: "Energy Kitchen",
        entityIds: ["sensor.energy_today"],
      }),
      format: "json",
      name: "Energy Kitchen",
      languages: ["de", "fr"],
      editorPlan,
    });
    const bundle = createHomeAssistantCardEditorHacsBundle(cardPackage);

    expect(bundle).toMatchObject({
      version: 1,
      kind: "atlas.homeassistant.hacs-card-bundle",
      cardName: "Energy Kitchen",
      scriptFilename: "energy-kitchen.js",
      customElementName: "energy-kitchen",
      cardType: "custom:energy-kitchen",
      resourcePath: "/hacsfiles/atlas/energy-kitchen.js",
      installSteps: [
        "Create a HACS frontend repository with these files.",
        "Install the generated script as energy-kitchen.js.",
        "Register the Lovelace resource /hacsfiles/atlas/energy-kitchen.js as a JavaScript module.",
        "Add custom:energy-kitchen to a dashboard view.",
        "Replace the demo entities with your own Home Assistant entities.",
      ],
    });
    expect(bundle.files.map(file => file.path)).toEqual([
      "hacs.json",
      "energy-kitchen.js",
      "README.md",
      "examples/lovelace-card.json",
      "atlas/energy-kitchen.atlas-card.json",
      "locales/en.json",
      "locales/de.json",
      "locales/fr.json",
    ]);
    expect(JSON.parse(bundle.files.find(file => file.path === "hacs.json")?.content ?? "{}")).toEqual({
      name: "Energy Kitchen",
      render_readme: true,
      filename: "energy-kitchen.js",
    });
    expect(bundle.files.find(file => file.path === "energy-kitchen.js")?.content).toContain("customElements.define(\"energy-kitchen\"");
    expect(bundle.files.find(file => file.path === "README.md")?.content).toContain("/hacsfiles/atlas/energy-kitchen.js");
    expect(bundle.files.find(file => file.path === "README.md")?.content).toContain("Fallback language files: de, fr.");
    expect(JSON.parse(bundle.files.find(file => file.path === "locales/de.json")?.content ?? "{}")._meta).toMatchObject({
      language: "de",
      status: "fallback",
    });
  });

  it("materializes a HACS card bundle as a downloadable zip archive", () => {
    const editorPlan = createHomeAssistantCardEditorPackagePlan({
      cardName: "Energy Kitchen",
      scriptFilename: "energy-kitchen.js",
      defaultEntityIds: ["sensor.energy_today"],
    });
    const cardPackage = createHomeAssistantCardExportPackage({
      card: createHomeAssistantCardConfiguration({
        target: "entities",
        title: "Energy Kitchen",
        entityIds: ["sensor.energy_today"],
      }),
      format: "json",
      name: "Energy Kitchen",
      editorPlan,
    });
    const archive = createHomeAssistantCardEditorHacsBundleArchive(cardPackage);
    const archiveText = Buffer.from(archive.content).toString("latin1");

    expect(archive).toMatchObject({
      filename: "energy-kitchen.hacs.zip",
      mimeType: "application/zip",
    });
    expect(Array.from(archive.content.slice(0, 4))).toEqual([0x50, 0x4b, 0x03, 0x04]);
    expect(Array.from(archive.content.slice(-22, -18))).toEqual([0x50, 0x4b, 0x05, 0x06]);
    expect(archiveText).toContain("hacs.json");
    expect(archiveText).toContain("energy-kitchen.js");
    expect(archiveText).toContain("examples/lovelace-card.json");
    expect(archiveText).toContain("locales/en.json");
    expect(archive.content.length).toBeGreaterThan(1000);
  });

  it("inspects generated HACS card zip archives before import", () => {
    const editorPlan = createHomeAssistantCardEditorPackagePlan({
      cardName: "Energy Kitchen",
      scriptFilename: "energy-kitchen.js",
      defaultEntityIds: ["sensor.energy_today"],
    });
    const archive = createHomeAssistantCardEditorHacsBundleArchive(createHomeAssistantCardExportPackage({
      card: createHomeAssistantCardConfiguration({
        target: "entities",
        title: "Energy Kitchen",
        entityIds: ["sensor.energy_today"],
      }),
      format: "json",
      name: "Energy Kitchen",
      editorPlan,
    }));

    expect(inspectHomeAssistantCardEditorHacsBundleArchive(archive.content)).toMatchObject({
      kind: "atlas.homeassistant.hacs-card-bundle-archive",
      importable: true,
      fileCount: 6,
      missingFiles: [],
      scriptFiles: ["energy-kitchen.js"],
      atlasPackageFiles: ["atlas/energy-kitchen.atlas-card.json"],
    });
    expect(inspectHomeAssistantCardEditorHacsBundleArchive(new Uint8Array([1, 2, 3]))).toMatchObject({
      importable: false,
      fileCount: 0,
      reason: "The archive is not a readable ZIP file.",
    });
  });

  it("reads the embedded ATLAS card package from generated HACS card zip archives", () => {
    const editorPlan = createHomeAssistantCardEditorPackagePlan({
      cardName: "Energy Kitchen",
      scriptFilename: "energy-kitchen.js",
      defaultEntityIds: ["sensor.energy_today"],
    });
    const archive = createHomeAssistantCardEditorHacsBundleArchive(createHomeAssistantCardExportPackage({
      card: createHomeAssistantCardConfiguration({
        target: "entities",
        title: "Energy Kitchen",
        entityIds: ["sensor.energy_today"],
      }),
      format: "json",
      name: "Energy Kitchen",
      editorPlan,
    }));

    const packageRead = readHomeAssistantCardEditorHacsBundleArchivePackage(archive.content);
    const embeddedPackage = JSON.parse(packageRead.packageContent ?? "{}");

    expect(packageRead).toMatchObject({
      kind: "atlas.homeassistant.hacs-card-bundle-package",
      importable: true,
      packageFile: "atlas/energy-kitchen.atlas-card.json",
      summary: {
        title: "Energy Kitchen",
        entityIds: ["sensor.energy_today"],
        format: "json",
        target: "entities",
        layout: "single",
        packaged: true,
        editorPlan: {
          cardName: "Energy Kitchen",
          scriptFilename: "energy-kitchen.js",
        },
      },
      reason: "The archive contains a readable ATLAS card package file.",
    });
    expect(embeddedPackage).toMatchObject({
      version: 1,
      kind: "atlas.homeassistant.card",
      manifest: {
        name: "Energy Kitchen",
      },
      editorPlan: {
        cardName: "Energy Kitchen",
        scriptFilename: "energy-kitchen.js",
      },
    });
  });

  it("rejects HACS card zip archives with unreadable embedded ATLAS packages", () => {
    const archive = createHomeAssistantCardEditorHacsBundleArchive({
      version: 1,
      kind: "atlas.homeassistant.hacs-card-bundle",
      cardName: "Broken Card",
      scriptFilename: "broken-card.js",
      customElementName: "broken-card",
      cardType: "custom:broken-card",
      resourcePath: "/hacsfiles/atlas/broken-card.js",
      files: [
        {
          path: "hacs.json",
          mimeType: "application/json",
          content: "{}",
        },
        {
          path: "broken-card.js",
          mimeType: "text/javascript",
          content: "customElements.define('broken-card', class extends HTMLElement {});",
        },
        {
          path: "README.md",
          mimeType: "text/markdown",
          content: "# Broken Card\n",
        },
        {
          path: "examples/lovelace-card.json",
          mimeType: "application/json",
          content: "{}",
        },
        {
          path: "atlas/broken-card.atlas-card.json",
          mimeType: "application/json",
          content: "{\"version\":1,\"kind\":\"atlas.homeassistant.card\",\"manifest\":{},\"content\":\"type: markdown\\ncontent: unsupported\"}",
        },
      ],
      installSteps: [],
    });

    expect(readHomeAssistantCardEditorHacsBundleArchivePackage(archive.content)).toMatchObject({
      kind: "atlas.homeassistant.hacs-card-bundle-package",
      importable: false,
      reason: "The ATLAS card package file could not be read from the archive.",
    });
  });
});
