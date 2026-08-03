import { describe, expect, it } from "vitest";

import {
  createAtlasFrontendResource,
  createHomeAssistantAtlasFrontendIntegrationPlan,
  inspectAtlasFrontendResourceAvailability,
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
});
