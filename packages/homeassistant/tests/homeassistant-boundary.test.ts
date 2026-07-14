import { describe, expect, it } from "vitest";

import {
  createHomeAssistantIntegrationBoundary,
  isHomeAssistantPublicApiClosed,
} from "../src/HomeAssistantIntegrationBoundary";
import { inspectHomeAssistantActivationGate } from "../src/HomeAssistantActivationGate";
import { inspectHomeAssistantDependencyBoundary } from "../src/HomeAssistantDependencyBoundary";
import * as HomeAssistant from "../src";

describe("homeassistant integration boundary", () => {
  it("defines the planned Home Assistant integration boundary above Renderer", () => {
    const boundary = createHomeAssistantIntegrationBoundary();

    expect(boundary).toEqual({
      packageName: "@atlas/homeassistant",
      integration: "home-assistant",
      status: "planned",
      requiredLayers: ["runtime", "renderer", "theme"],
      publicApi: {
        state: "closed",
        reason: "Home Assistant activation waits for stable runtime, renderer and theme extension points.",
      },
      rendererBoundary: {
        platformMetadataOnly: true,
        concreteMountingEnabled: false,
      },
    });
  });

  it("keeps the Home Assistant public API closed before activation", () => {
    const boundary = createHomeAssistantIntegrationBoundary();

    expect(isHomeAssistantPublicApiClosed(boundary)).toBe(true);
    expect(Object.keys(HomeAssistant)).toEqual([]);
  });

  it("reports Home Assistant activation as inactive until required layers are stable", () => {
    const boundary = createHomeAssistantIntegrationBoundary();

    expect(inspectHomeAssistantActivationGate(boundary)).toEqual({
      active: false,
      missingLayers: ["runtime", "renderer", "theme"],
      publicApiClosed: true,
      reason: "Home Assistant activation waits for stable runtime, renderer and theme extension points.",
    });
  });

  it("copies activation gate layer requirements away from the boundary object", () => {
    const boundary = createHomeAssistantIntegrationBoundary();
    const gate = inspectHomeAssistantActivationGate(boundary);

    expect(gate.missingLayers).toEqual(boundary.requiredLayers);
    expect(gate.missingLayers).not.toBe(boundary.requiredLayers);
  });

  it("keeps concrete Home Assistant dependencies outside the package before activation", () => {
    expect(inspectHomeAssistantDependencyBoundary([])).toEqual({
      ok: true,
      forbiddenDependencies: [],
    });

    expect(inspectHomeAssistantDependencyBoundary([
      "@atlas/renderer",
      "home-assistant-js-websocket",
    ])).toEqual({
      ok: false,
      forbiddenDependencies: ["@atlas/renderer", "home-assistant-js-websocket"],
    });
  });
});
