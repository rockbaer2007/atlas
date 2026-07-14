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

  it("keeps the Theme public API closed before activation", () => {
    const boundary = createThemeActivationBoundary();

    expect(isThemePublicApiClosed(boundary)).toBe(true);
    expect(Object.keys(Theme)).toEqual([]);
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
});
