import { describe, expect, it } from "vitest";

import type {
  RuntimeDiagnosticEvent,
  RuntimeEvent,
  RuntimeHealthReport,
  RuntimeHealthState,
  RuntimeHostConfiguration,
  RuntimeModule,
  RuntimeModuleHealthReport,
  RuntimeModuleSnapshot,
  RuntimeModuleStatus,
} from "../src";
import {
  RuntimeConfigurationValidator,
  RuntimeDiagnosticIssueCodes,
  RuntimeHealthStates,
  RuntimeHost,
  RuntimeModuleStatuses,
  RuntimeServiceKeys,
} from "../src";

describe("runtime public API", () => {
  it("exports the Runtime package value surface from the package root", () => {
    expect(RuntimeHost).toBeTypeOf("function");
    expect(RuntimeConfigurationValidator).toBeTypeOf("function");
    expect(RuntimeDiagnosticIssueCodes.ModuleDegraded).toBe("runtime.module.degraded");
    expect(RuntimeDiagnosticIssueCodes.ModuleFailed).toBe("runtime.module.failed");
    expect(RuntimeHealthStates.Healthy).toBe("healthy");
    expect(RuntimeHealthStates.Degraded).toBe("degraded");
    expect(RuntimeHealthStates.Failed).toBe("failed");
    expect(RuntimeModuleStatuses.Registered).toBe("registered");
    expect(RuntimeModuleStatuses.Initialized).toBe("initialized");
    expect(RuntimeModuleStatuses.Stopped).toBe("stopped");
    expect(RuntimeModuleStatuses.Disposed).toBe("disposed");
    expect(RuntimeModuleStatuses.Failed).toBe("failed");
    expect(RuntimeServiceKeys.application).toBeTypeOf("symbol");
    expect(RuntimeServiceKeys.application.description).toBe("@atlas/runtime/application");
    expect(RuntimeServiceKeys.events).toBeTypeOf("symbol");
    expect(RuntimeServiceKeys.events.description).toBe("@atlas/runtime/events");
  });

  it("exports the Runtime package type surface from the package root", () => {
    const healthState: RuntimeHealthState = RuntimeHealthStates.Healthy;
    const moduleStatus: RuntimeModuleStatus = RuntimeModuleStatuses.Registered;
    const moduleSnapshot: RuntimeModuleSnapshot = {
      moduleId: "api-module",
      moduleVersion: "1.0.0",
      status: moduleStatus,
    };
    const moduleHealth: RuntimeModuleHealthReport = {
      moduleId: moduleSnapshot.moduleId,
      moduleVersion: moduleSnapshot.moduleVersion,
      health: healthState,
      status: moduleStatus,
    };
    const healthReport: RuntimeHealthReport = {
      applicationName: "api",
      applicationVersion: "1.0.0",
      state: "created",
      health: healthState,
      modules: [moduleHealth],
      summary: {
        healthy: 1,
        degraded: 0,
        failed: 0,
      },
    };
    const diagnosticEvent: RuntimeDiagnosticEvent = {
      type: "runtime.diagnostics.changed",
      timestamp: new Date(),
      currentHealth: healthState,
      report: healthReport,
    };
    const runtimeEvent: RuntimeEvent = diagnosticEvent;
    const runtimeModule: RuntimeModule = {
      manifest: {
        id: "api-module",
        name: "API module",
        version: "1.0.0",
        dependencies: [],
      },
      module: {
        async initialize() {},
      },
    };
    const configuration: RuntimeHostConfiguration = {
      application: {
        name: "api",
        version: {
          major: 1,
          minor: 0,
          patch: 0,
        },
      },
      modules: [runtimeModule],
    };

    expect(runtimeEvent.type).toBe("runtime.diagnostics.changed");
    expect(configuration.modules).toEqual([runtimeModule]);
  });
});
