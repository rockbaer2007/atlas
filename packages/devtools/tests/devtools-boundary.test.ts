import { describe, expect, it } from "vitest";

import {
  createDevtoolsActivationBoundary,
  isDevtoolsPublicApiClosed,
} from "../src/DevtoolsActivationBoundary";
import { inspectDevtoolsActivationGate } from "../src/DevtoolsActivationGate";
import { inspectDevtoolsDependencyBoundary } from "../src/DevtoolsDependencyBoundary";
import * as Devtools from "../src";

describe("devtools activation boundary", () => {
  it("defines the planned Devtools activation boundary above diagnostics layers", () => {
    const boundary = createDevtoolsActivationBoundary();

    expect(boundary).toEqual({
      packageName: "@atlas/devtools",
      domain: "devtools",
      status: "planned",
      requiredLayers: ["foundation", "kernel", "runtime", "core"],
      publicApi: {
        state: "closed",
        reason: "Devtools activation waits for stable framework diagnostic inspection points.",
      },
      diagnosticsBoundary: {
        inspectionOnly: true,
        mutationEnabled: false,
      },
    });
  });

  it("keeps the Devtools public API closed before activation", () => {
    const boundary = createDevtoolsActivationBoundary();

    expect(isDevtoolsPublicApiClosed(boundary)).toBe(true);
    expect(Object.keys(Devtools)).toEqual([]);
  });

  it("reports Devtools activation as inactive until required layers are stable", () => {
    const boundary = createDevtoolsActivationBoundary();

    expect(inspectDevtoolsActivationGate(boundary)).toEqual({
      active: false,
      missingLayers: ["foundation", "kernel", "runtime", "core"],
      publicApiClosed: true,
      reason: "Devtools activation waits for stable framework diagnostic inspection points.",
    });
  });

  it("copies activation gate layer requirements away from the boundary object", () => {
    const boundary = createDevtoolsActivationBoundary();
    const gate = inspectDevtoolsActivationGate(boundary);

    expect(gate.missingLayers).toEqual(boundary.requiredLayers);
    expect(gate.missingLayers).not.toBe(boundary.requiredLayers);
  });

  it("keeps concrete Devtools dependencies outside the package before activation", () => {
    expect(inspectDevtoolsDependencyBoundary([])).toEqual({
      ok: true,
      forbiddenDependencies: [],
    });

    expect(inspectDevtoolsDependencyBoundary([
      "@atlas/renderer",
      "@atlas/theme",
      "vite",
    ])).toEqual({
      ok: false,
      forbiddenDependencies: ["@atlas/renderer", "@atlas/theme", "vite"],
    });
  });
});
