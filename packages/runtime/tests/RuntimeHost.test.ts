import { describe, expect, it } from "vitest";

import type { Application } from "@atlas/kernel";

import {
  RuntimeHost,
  type RuntimeDiagnosticEvent,
  RuntimeDiagnosticIssueCodes,
  RuntimeHealthStates,
  type RuntimeModule,
  RuntimeModuleStatuses,
  RuntimeServiceKeys,
} from "../src";

const application: Application = {
  name: "demo",
  version: {
    major: 0,
    minor: 2,
    patch: 0,
  },
};

describe("RuntimeHost", () => {
  it("initializes, starts and publishes lifecycle events", async () => {
    const host = new RuntimeHost(application);
    const types: string[] = [];

    host.events.subscribe("runtime.initialized", event => {
      types.push(event.type);
    });
    host.events.subscribe("runtime.started", event => {
      types.push(event.type);
    });

    await host.start();

    expect(host.state).toBe("running");
    expect(types).toEqual(["runtime.initialized", "runtime.started"]);
  });

  it("restarts an active host", async () => {
    const host = new RuntimeHost(application);
    const types: string[] = [];

    host.events.subscribe("runtime.stopped", event => {
      types.push(event.type);
    });
    host.events.subscribe("runtime.started", event => {
      types.push(event.type);
    });

    await host.start();
    await host.restart();

    expect(host.state).toBe("running");
    expect(types).toEqual(["runtime.started", "runtime.stopped", "runtime.started"]);
  });

  it("disposes once and rejects further startup", async () => {
    const host = new RuntimeHost(application);

    await host.dispose();
    await host.dispose();

    expect(host.state).toBe("disposed");
    await expect(host.start()).rejects.toThrow("disposed");
  });

  it("owns application services for its lifecycle", async () => {
    const host = new RuntimeHost(application);

    await host.start();

    expect(host.services.resolve(RuntimeServiceKeys.application)).toBe(application);
    expect(host.services.resolve(RuntimeServiceKeys.events)).toBe(host.events);
  });

  it("creates a host from runtime configuration", async () => {
    const host = new RuntimeHost({
      application,
      modules: [{
        manifest: {
          id: "configured.module",
          name: "Configured module",
          version: "1.0.0",
          dependencies: [],
        },
        module: { async initialize() {} },
      }],
    });

    await host.start();

    expect(host.application).toBe(application);
    expect(host.moduleDiagnostics).toMatchObject([{
      moduleId: "configured.module",
      status: RuntimeModuleStatuses.Initialized,
    }]);
  });

  it("rejects invalid runtime application configuration", () => {
    expect(() => new RuntimeHost({
      ...application,
      name: " ",
    })).toThrow("Runtime application name is required.");

    expect(() => new RuntimeHost({
      ...application,
      version: {
        major: 0,
        minor: -1,
        patch: 0,
      },
    })).toThrow("Runtime application version minor must be a non-negative integer.");
  });

  it("rejects invalid runtime module configuration before startup", () => {
    const host = new RuntimeHost(application);

    expect(() => host.registerModule({
      manifest: {
        id: " ",
        name: "Invalid module",
        version: "1.0.0",
        dependencies: [],
      },
      module: { async initialize() {} },
    })).toThrow("Runtime module id is required.");

    expect(host.state).toBe("created");
  });

  it("rejects invalid runtime module dependency configuration before startup", () => {
    const host = new RuntimeHost(application);

    expect(() => host.registerModule({
      manifest: {
        id: "invalid-dependency",
        name: "Invalid dependency",
        version: "1.0.0",
        dependencies: [{ id: "dependency", version: " " }],
      },
      module: { async initialize() {} },
    })).toThrow("Runtime module dependency version is required");

    expect(host.state).toBe("created");
  });

  it("initializes registered modules and exposes their services", async () => {
    const moduleServiceKey = Symbol("module-service");
    const host = new RuntimeHost(application);
    const types: string[] = [];
    const runtimeModule: RuntimeModule = {
      manifest: {
        id: "demo.module",
        name: "Demo module",
        version: "1.0.0",
        dependencies: [],
      },
      module: {
        async initialize(context) {
          context.services.add({
            key: moduleServiceKey,
            lifetime: "singleton",
            instance: "ready",
          });
        },
      },
    };

    host.events.subscribe("runtime.module.initialized", event => {
      types.push(event.type);
    });
    host.registerModule(runtimeModule);

    await host.start();

    expect(host.services.resolve(moduleServiceKey)).toBe("ready");
    expect(types).toEqual(["runtime.module.initialized"]);
  });

  it("keeps the host initialized when module activation fails", async () => {
    const host = new RuntimeHost(application);

    host.registerModule({
      manifest: {
        id: "broken.module",
        name: "Broken module",
        version: "1.0.0",
        dependencies: [],
      },
      module: {
        async initialize() {
          throw new Error("module failure");
        },
      },
    });

    await expect(host.start()).rejects.toThrow("module failure");
    expect(host.state).toBe("initialized");
    expect(host.moduleDiagnostics).toMatchObject([{
      moduleId: "broken.module",
      status: RuntimeModuleStatuses.Failed,
      error: "module failure",
    }]);
  });

  it("activates module dependencies before dependents", async () => {
    const host = new RuntimeHost(application);
    const order: string[] = [];

    host.registerModule({
      manifest: {
        id: "dependent.module",
        name: "Dependent module",
        version: "1.0.0",
        dependencies: [{ id: "dependency.module", version: "1.0.0" }],
      },
      module: {
        async initialize() {
          order.push("dependent");
        },
      },
    });
    host.registerModule({
      manifest: {
        id: "dependency.module",
        name: "Dependency module",
        version: "1.0.0",
        dependencies: [],
      },
      module: {
        async initialize() {
          order.push("dependency");
        },
      },
    });

    await host.start();

    expect(order).toEqual(["dependency", "dependent"]);
  });

  it("rejects missing and cyclic module dependencies", async () => {
    const missing = new RuntimeHost(application);
    missing.registerModule({
      manifest: {
        id: "missing-dependent",
        name: "Missing dependent",
        version: "1.0.0",
        dependencies: [{ id: "missing", version: "1.0.0" }],
      },
      module: { async initialize() {} },
    });

    await expect(missing.start()).rejects.toThrow("Module dependency not found");
    expect(missing.state).toBe("initialized");

    const cyclic = new RuntimeHost(application);
    cyclic.registerModule({
      manifest: {
        id: "first",
        name: "First",
        version: "1.0.0",
        dependencies: [{ id: "second", version: "1.0.0" }],
      },
      module: { async initialize() {} },
    });
    cyclic.registerModule({
      manifest: {
        id: "second",
        name: "Second",
        version: "1.0.0",
        dependencies: [{ id: "first", version: "1.0.0" }],
      },
      module: { async initialize() {} },
    });

    await expect(cyclic.start()).rejects.toThrow("Module dependency cycle detected");
    expect(cyclic.state).toBe("initialized");
  });

  it("rejects an incompatible module dependency version", async () => {
    const host = new RuntimeHost(application);
    host.registerModule({
      manifest: {
        id: "dependent",
        name: "Dependent",
        version: "1.0.0",
        dependencies: [{ id: "dependency", version: "^1.0.0" }],
      },
      module: { async initialize() {} },
    });
    host.registerModule({
      manifest: {
        id: "dependency",
        name: "Dependency",
        version: "2.0.0",
        dependencies: [],
      },
      module: { async initialize() {} },
    });

    await expect(host.start()).rejects.toThrow("Module dependency version incompatible");
    expect(host.state).toBe("initialized");
  });

  it("shuts modules down in reverse dependency order during disposal", async () => {
    const host = new RuntimeHost(application);
    const order: string[] = [];

    host.registerModule({
      manifest: {
        id: "dependent",
        name: "Dependent",
        version: "1.0.0",
        dependencies: [{ id: "dependency", version: "1.0.0" }],
      },
      module: {
        async initialize() { order.push("initialize dependent"); },
        async stop() { order.push("stop dependent"); },
        async dispose() { order.push("dispose dependent"); },
      },
    });
    host.registerModule({
      manifest: {
        id: "dependency",
        name: "Dependency",
        version: "1.0.0",
        dependencies: [],
      },
      module: {
        async initialize() { order.push("initialize dependency"); },
        async stop() { order.push("stop dependency"); },
        async dispose() { order.push("dispose dependency"); },
      },
    });

    await host.start();
    await host.dispose();

    expect(order).toEqual([
      "initialize dependency",
      "initialize dependent",
      "stop dependent",
      "dispose dependent",
      "stop dependency",
      "dispose dependency",
    ]);
    expect(host.state).toBe("disposed");
    expect(host.moduleDiagnostics).toMatchObject([
      { moduleId: "dependent", status: RuntimeModuleStatuses.Disposed },
      { moduleId: "dependency", status: RuntimeModuleStatuses.Disposed },
    ]);
  });

  it("does not dispose the host when module shutdown fails", async () => {
    const host = new RuntimeHost(application);
    host.registerModule({
      manifest: {
        id: "failing-stop",
        name: "Failing stop",
        version: "1.0.0",
        dependencies: [],
      },
      module: {
        async initialize() {},
        async stop() { throw new Error("shutdown failure"); },
      },
    });

    await host.start();

    await expect(host.dispose()).rejects.toThrow("shutdown failure");
    expect(host.state).toBe("stopped");
    expect(host.moduleDiagnostics).toMatchObject([{
      moduleId: "failing-stop",
      status: RuntimeModuleStatuses.Failed,
      error: "shutdown failure",
    }]);
  });

  it("reports activation timing and lifecycle state for modules", async () => {
    const host = new RuntimeHost(application);
    host.registerModule({
      manifest: {
        id: "diagnostic-module",
        name: "Diagnostic module",
        version: "1.0.0",
        dependencies: [],
      },
      module: { async initialize() {} },
    });

    expect(host.moduleDiagnostics).toEqual([{
      moduleId: "diagnostic-module",
      moduleVersion: "1.0.0",
      status: RuntimeModuleStatuses.Registered,
    }]);

    await host.start();

    expect(host.moduleDiagnostics).toMatchObject([{
      moduleId: "diagnostic-module",
      status: RuntimeModuleStatuses.Initialized,
      activationDurationMs: expect.any(Number),
      initializedAt: expect.any(Number),
    }]);
  });

  it("reports degraded health for registered modules before startup", () => {
    const host = new RuntimeHost(application);
    host.registerModule({
      manifest: {
        id: "waiting-module",
        name: "Waiting module",
        version: "1.0.0",
        dependencies: [],
      },
      module: { async initialize() {} },
    });

    expect(host.health).toMatchObject({
      applicationName: "demo",
      applicationVersion: "0.2.0",
      state: "created",
      health: RuntimeHealthStates.Degraded,
      summary: {
        healthy: 0,
        degraded: 1,
        failed: 0,
      },
      modules: [{
        moduleId: "waiting-module",
        moduleVersion: "1.0.0",
        status: RuntimeModuleStatuses.Registered,
        health: RuntimeHealthStates.Degraded,
      }],
    });
  });

  it("reports healthy runtime health after successful startup", async () => {
    const host = new RuntimeHost(application);
    host.registerModule({
      manifest: {
        id: "healthy-module",
        name: "Healthy module",
        version: "1.0.0",
        dependencies: [],
      },
      module: { async initialize() {} },
    });

    await host.start();

    expect(host.health).toMatchObject({
      state: "running",
      health: RuntimeHealthStates.Healthy,
      summary: {
        healthy: 1,
        degraded: 0,
        failed: 0,
      },
      modules: [{
        moduleId: "healthy-module",
        status: RuntimeModuleStatuses.Initialized,
        health: RuntimeHealthStates.Healthy,
      }],
    });
  });

  it("reports failed runtime health when module activation fails", async () => {
    const host = new RuntimeHost(application);
    host.registerModule({
      manifest: {
        id: "unhealthy-module",
        name: "Unhealthy module",
        version: "1.0.0",
        dependencies: [],
      },
      module: {
        async initialize() {
          throw new Error("health failure");
        },
      },
    });

    await expect(host.start()).rejects.toThrow("health failure");

    expect(host.health).toMatchObject({
      state: "initialized",
      health: RuntimeHealthStates.Failed,
      summary: {
        healthy: 0,
        degraded: 0,
        failed: 1,
      },
      modules: [{
        moduleId: "unhealthy-module",
        status: RuntimeModuleStatuses.Failed,
        health: RuntimeHealthStates.Failed,
        error: "health failure",
      }],
    });
  });

  it("reports healthy runtime diagnostics without issues", async () => {
    const host = new RuntimeHost(application);
    host.registerModule({
      manifest: {
        id: "diagnostic-healthy",
        name: "Diagnostic healthy",
        version: "1.0.0",
        dependencies: [],
      },
      module: { async initialize() {} },
    });

    await host.start();

    expect(host.diagnostics).toEqual({
      context: {
        component: "runtime:demo",
        version: "0.2.0",
      },
      result: {
        ok: true,
        issues: [],
      },
    });
  });

  it("reports degraded runtime diagnostics as warnings", () => {
    const host = new RuntimeHost(application);
    host.registerModule({
      manifest: {
        id: "diagnostic-waiting",
        name: "Diagnostic waiting",
        version: "1.0.0",
        dependencies: [],
      },
      module: { async initialize() {} },
    });

    expect(host.diagnostics).toEqual({
      context: {
        component: "runtime:demo",
        version: "0.2.0",
      },
      result: {
        ok: false,
        issues: [{
          code: RuntimeDiagnosticIssueCodes.ModuleDegraded,
          message: "Runtime module is degraded: diagnostic-waiting (registered)",
          severity: "warning",
        }],
      },
    });
  });

  it("reports failed runtime diagnostics as errors", async () => {
    const host = new RuntimeHost(application);
    host.registerModule({
      manifest: {
        id: "diagnostic-failed",
        name: "Diagnostic failed",
        version: "1.0.0",
        dependencies: [],
      },
      module: {
        async initialize() {
          throw new Error("diagnostic failure");
        },
      },
    });

    await expect(host.start()).rejects.toThrow("diagnostic failure");

    expect(host.diagnostics).toEqual({
      context: {
        component: "runtime:demo",
        version: "0.2.0",
      },
      result: {
        ok: false,
        issues: [{
          code: RuntimeDiagnosticIssueCodes.ModuleFailed,
          message: "Runtime module failed: diagnostic-failed - diagnostic failure",
          severity: "error",
        }],
      },
    });
  });

  it("does not publish hidden async diagnostic events during module registration", () => {
    const host = new RuntimeHost(application);
    const events: RuntimeDiagnosticEvent[] = [];

    host.events.subscribe<RuntimeDiagnosticEvent>("runtime.diagnostics.changed", event => {
      events.push(event);
    });

    host.registerModule({
      manifest: {
        id: "event-registration",
        name: "Event registration",
        version: "1.0.0",
        dependencies: [],
      },
      module: { async initialize() {} },
    });

    expect(host.health.health).toBe(RuntimeHealthStates.Degraded);
    expect(events).toEqual([]);
  });

  it("publishes diagnostic events when runtime health changes during startup", async () => {
    const host = new RuntimeHost(application);
    const events: RuntimeDiagnosticEvent[] = [];

    host.events.subscribe<RuntimeDiagnosticEvent>("runtime.diagnostics.changed", event => {
      events.push(event);
    });

    host.registerModule({
      manifest: {
        id: "event-healthy",
        name: "Event healthy",
        version: "1.0.0",
        dependencies: [],
      },
      module: { async initialize() {} },
    });

    await host.start();

    expect(events).toMatchObject([
      {
        previousHealth: undefined,
        currentHealth: RuntimeHealthStates.Healthy,
        report: {
          health: RuntimeHealthStates.Healthy,
        },
      },
    ]);
  });

  it("publishes failed diagnostic events when module activation fails", async () => {
    const host = new RuntimeHost(application);
    const events: RuntimeDiagnosticEvent[] = [];

    host.events.subscribe<RuntimeDiagnosticEvent>("runtime.diagnostics.changed", event => {
      events.push(event);
    });

    host.registerModule({
      manifest: {
        id: "event-failed",
        name: "Event failed",
        version: "1.0.0",
        dependencies: [],
      },
      module: {
        async initialize() {
          throw new Error("event failure");
        },
      },
    });

    await expect(host.start()).rejects.toThrow("event failure");

    expect(events).toMatchObject([
      {
        previousHealth: undefined,
        currentHealth: RuntimeHealthStates.Failed,
        report: {
          health: RuntimeHealthStates.Failed,
          modules: [{
            moduleId: "event-failed",
            health: RuntimeHealthStates.Failed,
            error: "event failure",
          }],
        },
      },
    ]);
  });

  it("publishes lifecycle and diagnostic events in startup order", async () => {
    const host = new RuntimeHost(application);
    const events: string[] = [];

    host.events.subscribe("runtime.initialized", event => {
      events.push(event.type);
    });
    host.events.subscribe("runtime.module.initialized", event => {
      events.push(`${event.type}:${event.moduleId}`);
    });
    host.events.subscribe<RuntimeDiagnosticEvent>("runtime.diagnostics.changed", event => {
      events.push(`${event.type}:${event.currentHealth}`);
    });
    host.events.subscribe("runtime.started", event => {
      events.push(event.type);
    });

    host.registerModule({
      manifest: {
        id: "first-order",
        name: "First order",
        version: "1.0.0",
        dependencies: [],
      },
      module: { async initialize() {} },
    });
    host.registerModule({
      manifest: {
        id: "second-order",
        name: "Second order",
        version: "1.0.0",
        dependencies: [],
      },
      module: { async initialize() {} },
    });

    await host.start();

    expect(events).toEqual([
      "runtime.initialized",
      "runtime.module.initialized:first-order",
      "runtime.diagnostics.changed:degraded",
      "runtime.module.initialized:second-order",
      "runtime.diagnostics.changed:healthy",
      "runtime.started",
    ]);
  });
});
