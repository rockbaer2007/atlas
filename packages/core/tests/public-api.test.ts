import { describe, expect, it } from "vitest";

import type {
  CoreRuntimeDiagnosticReport,
  CoreRuntimeDiagnostics,
  CoreRuntimeHealthReport,
  CoreRuntimeHost,
  CoreRuntimeHostConfiguration,
} from "../src";
import { createCoreRuntimeHost, inspectCoreRuntimeHost } from "../src";

describe("core public API", () => {
  it("creates a Runtime host through the Core package root", () => {
    const configuration: CoreRuntimeHostConfiguration = {
      application: {
        name: "core-api",
        version: {
          major: 0,
          minor: 2,
          patch: 0,
        },
      },
    };

    const host: CoreRuntimeHost = createCoreRuntimeHost(configuration);

    expect(host.application.name).toBe("core-api");
    expect(host.state).toBe("created");
  });

  it("inspects Runtime health through the Core package root", () => {
    const host = createCoreRuntimeHost({
      application: {
        name: "core-diagnostics",
        version: {
          major: 0,
          minor: 2,
          patch: 0,
        },
      },
    });

    const diagnostics: CoreRuntimeDiagnostics = inspectCoreRuntimeHost(host);
    const health: CoreRuntimeHealthReport = diagnostics.health;
    const report: CoreRuntimeDiagnosticReport = diagnostics.report;

    expect(health.health).toBe("healthy");
    expect(report.result.ok).toBe(true);
    expect(report.result.issues).toEqual([]);
  });

  it("surfaces degraded Runtime diagnostics through Core", () => {
    const host = createCoreRuntimeHost({
      application: {
        name: "core-degraded-diagnostics",
        version: {
          major: 0,
          minor: 2,
          patch: 0,
        },
      },
      modules: [{
        manifest: {
          id: "registered-module",
          name: "Registered module",
          version: "1.0.0",
          dependencies: [],
        },
        module: { async initialize() {} },
      }],
    });

    const diagnostics = inspectCoreRuntimeHost(host);

    expect(diagnostics.health.health).toBe("degraded");
    expect(diagnostics.report.result.ok).toBe(false);
    expect(diagnostics.report.result.issues).toHaveLength(1);
    expect(diagnostics.report.result.issues[0]?.code).toBe("runtime.module.degraded");
  });
});
