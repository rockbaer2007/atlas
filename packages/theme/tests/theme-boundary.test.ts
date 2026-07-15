import { describe, expect, it } from "vitest";

import {
  createThemeActivationBoundary,
  isThemePublicApiClosed,
} from "../src/ThemeActivationBoundary";
import { inspectThemeActivationGate } from "../src/ThemeActivationGate";
import { inspectThemeDependencyBoundary } from "../src/ThemeDependencyBoundary";
import * as Theme from "../src";

describe("theme activation boundary", () => {
  it("defines the planned Theme activation boundary above Core and Renderer", () => {
    const boundary = createThemeActivationBoundary();

    expect(boundary).toEqual({
      packageName: "@atlas/theme",
      domain: "theme",
      status: "planned",
      requiredLayers: ["core", "renderer"],
      publicApi: {
        state: "closed",
        reason: "Theme activation waits for stable Core and Renderer extension points.",
      },
      rendererBoundary: {
        tokensOnly: true,
        styleInjectionEnabled: false,
      },
    });
  });

  it("keeps the Theme boundary limited to planned token metadata", () => {
    const boundary = createThemeActivationBoundary();

    expect(Object.keys(boundary).sort()).toEqual([
      "domain",
      "packageName",
      "publicApi",
      "rendererBoundary",
      "requiredLayers",
      "status",
    ]);
    expect(boundary).not.toHaveProperty("tokens");
    expect(boundary).not.toHaveProperty("stylesheets");
    expect(boundary).not.toHaveProperty("themes");
  });

  it("keeps Theme required layers in activation order", () => {
    const boundary = createThemeActivationBoundary();

    expect(boundary.requiredLayers).toEqual(["core", "renderer"]);
  });

  it("creates independent Theme boundary layer lists", () => {
    const first = createThemeActivationBoundary();
    const second = createThemeActivationBoundary();

    expect(first.requiredLayers).toEqual(second.requiredLayers);
    expect(first.requiredLayers).not.toBe(second.requiredLayers);
  });

  it("keeps the Theme renderer boundary token-only", () => {
    const boundary = createThemeActivationBoundary();

    expect(boundary.rendererBoundary).toEqual({
      tokensOnly: true,
      styleInjectionEnabled: false,
    });
    expect(boundary.rendererBoundary).not.toHaveProperty("stylesheetInjectionEnabled");
    expect(boundary.rendererBoundary).not.toHaveProperty("homeAssistantThemeBindingEnabled");
  });

  it("keeps the Theme public API closed before activation", () => {
    const boundary = createThemeActivationBoundary();

    expect(isThemePublicApiClosed(boundary)).toBe(true);
    expect(Object.keys(Theme)).toEqual([]);
  });

  it("keeps the Theme package root free of concrete theme exports", () => {
    expect(Object.hasOwn(Theme, "createThemeTokens")).toBe(false);
    expect(Object.hasOwn(Theme, "injectThemeStyles")).toBe(false);
    expect(Object.hasOwn(Theme, "bindHomeAssistantTheme")).toBe(false);
  });

  it("keeps the Theme public API closure reason stable", () => {
    const boundary = createThemeActivationBoundary();

    expect(boundary.publicApi).toEqual({
      state: "closed",
      reason: "Theme activation waits for stable Core and Renderer extension points.",
    });
  });

  it("reports Theme activation as inactive until required layers are stable", () => {
    const boundary = createThemeActivationBoundary();

    expect(inspectThemeActivationGate(boundary)).toEqual({
      active: false,
      missingLayers: ["core", "renderer"],
      publicApiClosed: true,
      reason: "Theme activation waits for stable Core and Renderer extension points.",
    });
  });

  it("copies activation gate layer requirements away from the boundary object", () => {
    const boundary = createThemeActivationBoundary();
    const gate = inspectThemeActivationGate(boundary);

    expect(gate.missingLayers).toEqual(boundary.requiredLayers);
    expect(gate.missingLayers).not.toBe(boundary.requiredLayers);
  });

  it("keeps Theme activation gate reports independent from later layer mutations", () => {
    const requiredLayers = ["core"] as Array<"core" | "renderer">;
    const boundary = {
      ...createThemeActivationBoundary(),
      requiredLayers,
    };

    const gate = inspectThemeActivationGate(boundary);
    requiredLayers.push("renderer");

    expect(gate.missingLayers).toEqual(["core"]);
  });

  it("copies the Theme activation gate reason from the public API closure", () => {
    const boundary = createThemeActivationBoundary();

    expect(inspectThemeActivationGate(boundary).reason).toBe(boundary.publicApi.reason);
  });

  it("keeps concrete Theme dependencies outside the package before activation", () => {
    expect(inspectThemeDependencyBoundary([])).toEqual({
      ok: true,
      forbiddenDependencies: [],
    });

    expect(inspectThemeDependencyBoundary([
      "@atlas/renderer",
      "@atlas/homeassistant",
      "lit",
    ])).toEqual({
      ok: false,
      forbiddenDependencies: ["@atlas/renderer", "@atlas/homeassistant", "lit"],
    });
  });

  it("allows foundation and core dependencies before Theme activation", () => {
    expect(inspectThemeDependencyBoundary([
      "@atlas/foundation",
      "@atlas/core",
    ])).toEqual({
      ok: true,
      forbiddenDependencies: [],
    });
  });

  it("preserves forbidden Theme dependency order and duplicates", () => {
    expect(inspectThemeDependencyBoundary([
      "@atlas/homeassistant",
      "@atlas/renderer",
      "@atlas/homeassistant",
      "lit",
    ])).toEqual({
      ok: false,
      forbiddenDependencies: [
        "@atlas/homeassistant",
        "@atlas/renderer",
        "@atlas/homeassistant",
        "lit",
      ],
    });
  });

  it("keeps Theme dependency boundary reports independent from source arrays", () => {
    const dependencies = ["@atlas/renderer"];

    const report = inspectThemeDependencyBoundary(dependencies);
    dependencies.push("lit");

    expect(report.forbiddenDependencies).toEqual(["@atlas/renderer"]);
    expect(report.forbiddenDependencies).not.toBe(dependencies);
  });
});
