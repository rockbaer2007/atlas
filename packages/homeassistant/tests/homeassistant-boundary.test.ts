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

  it("keeps the Home Assistant boundary limited to planned integration metadata", () => {
    const boundary = createHomeAssistantIntegrationBoundary();

    expect(Object.keys(boundary).sort()).toEqual([
      "integration",
      "packageName",
      "publicApi",
      "rendererBoundary",
      "requiredLayers",
      "status",
    ]);
    expect(boundary).not.toHaveProperty("cards");
    expect(boundary).not.toHaveProperty("websocket");
    expect(boundary).not.toHaveProperty("services");
  });

  it("keeps Home Assistant required layers in activation order", () => {
    const boundary = createHomeAssistantIntegrationBoundary();

    expect(boundary.requiredLayers).toEqual(["runtime", "renderer", "theme"]);
  });

  it("creates independent Home Assistant boundary layer lists", () => {
    const first = createHomeAssistantIntegrationBoundary();
    const second = createHomeAssistantIntegrationBoundary();

    expect(first.requiredLayers).toEqual(second.requiredLayers);
    expect(first.requiredLayers).not.toBe(second.requiredLayers);
  });

  it("keeps the Home Assistant renderer boundary metadata-only", () => {
    const boundary = createHomeAssistantIntegrationBoundary();

    expect(boundary.rendererBoundary).toEqual({
      platformMetadataOnly: true,
      concreteMountingEnabled: false,
    });
    expect(boundary.rendererBoundary).not.toHaveProperty("cardMountingEnabled");
    expect(boundary.rendererBoundary).not.toHaveProperty("themeBindingEnabled");
  });

  it("keeps the Home Assistant public API closed before activation", () => {
    const boundary = createHomeAssistantIntegrationBoundary();

    expect(isHomeAssistantPublicApiClosed(boundary)).toBe(true);
    expect(Object.keys(HomeAssistant)).toEqual([]);
  });

  it("keeps the Home Assistant package root free of concrete integration exports", () => {
    expect(Object.hasOwn(HomeAssistant, "createHomeAssistantCard")).toBe(false);
    expect(Object.hasOwn(HomeAssistant, "connectHomeAssistantWebSocket")).toBe(false);
    expect(Object.hasOwn(HomeAssistant, "mountHomeAssistantDashboard")).toBe(false);
  });

  it("keeps the Home Assistant public API closure reason stable", () => {
    const boundary = createHomeAssistantIntegrationBoundary();

    expect(boundary.publicApi).toEqual({
      state: "closed",
      reason: "Home Assistant activation waits for stable runtime, renderer and theme extension points.",
    });
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

  it("keeps activation gate reports independent from later layer mutations", () => {
    const requiredLayers = ["runtime"] as Array<"runtime" | "renderer" | "theme">;
    const boundary = {
      ...createHomeAssistantIntegrationBoundary(),
      requiredLayers,
    };

    const gate = inspectHomeAssistantActivationGate(boundary);
    requiredLayers.push("renderer");

    expect(gate.missingLayers).toEqual(["runtime"]);
  });

  it("copies the activation gate reason from the public API closure", () => {
    const boundary = createHomeAssistantIntegrationBoundary();

    expect(inspectHomeAssistantActivationGate(boundary).reason).toBe(boundary.publicApi.reason);
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

  it("allows foundation and core dependencies before Home Assistant activation", () => {
    expect(inspectHomeAssistantDependencyBoundary([
      "@atlas/foundation",
      "@atlas/core",
    ])).toEqual({
      ok: true,
      forbiddenDependencies: [],
    });
  });

  it("preserves forbidden Home Assistant dependency order and duplicates", () => {
    expect(inspectHomeAssistantDependencyBoundary([
      "@atlas/theme",
      "@atlas/renderer",
      "@atlas/theme",
      "home-assistant-js-websocket",
    ])).toEqual({
      ok: false,
      forbiddenDependencies: [
        "@atlas/theme",
        "@atlas/renderer",
        "@atlas/theme",
        "home-assistant-js-websocket",
      ],
    });
  });

  it("keeps dependency boundary reports independent from source arrays", () => {
    const dependencies = ["@atlas/renderer"];

    const report = inspectHomeAssistantDependencyBoundary(dependencies);
    dependencies.push("@atlas/runtime");

    expect(report.forbiddenDependencies).toEqual(["@atlas/renderer"]);
    expect(report.forbiddenDependencies).not.toBe(dependencies);
  });
});
