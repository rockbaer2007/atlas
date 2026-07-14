import { describe, expect, it } from "vitest";

import type {
  CoreRuntimeDiagnosticReport,
  CoreRuntimeDiagnostics,
  CoreRuntimeEvent,
  CoreRuntimeEventHandler,
  CoreRuntimeEventSubscription,
  CoreRuntimeEventType,
  CoreRuntimeHealthReport,
  CoreRuntimeHost,
  CoreRuntimeHostConfiguration,
  CoreRuntimeLifecycleAction,
  CoreRuntimeLifecycleResult,
  CoreRuntimeLifecycleState,
} from "../src";
import * as Core from "../src";
import {
  createCoreRuntimeHost,
  inspectCoreRuntimeHost,
  subscribeToCoreRuntimeEvent,
  transitionCoreRuntimeHost,
} from "../src";

describe("core public API", () => {
  it("exports the Core package value surface from the package root", () => {
    expect(Core.createCoreRuntimeHost).toBeTypeOf("function");
    expect(Core.inspectCoreRuntimeHost).toBeTypeOf("function");
    expect(Core.transitionCoreRuntimeHost).toBeTypeOf("function");
    expect(Core.subscribeToCoreRuntimeEvent).toBeTypeOf("function");
  });

  it("exports the Core package type surface from the package root", () => {
    const configuration: CoreRuntimeHostConfiguration = {
      application: {
        name: "core-type-api",
        version: {
          major: 0,
          minor: 2,
          patch: 0,
        },
      },
    };
    const host: CoreRuntimeHost = createCoreRuntimeHost(configuration);
    const diagnostics: CoreRuntimeDiagnostics = inspectCoreRuntimeHost(host);
    const health: CoreRuntimeHealthReport = diagnostics.health;
    const report: CoreRuntimeDiagnosticReport = diagnostics.report;
    const action: CoreRuntimeLifecycleAction = "start";
    const state: CoreRuntimeLifecycleState = "created";
    const result: CoreRuntimeLifecycleResult = { action, state };
    const eventType: CoreRuntimeEventType = "runtime.started";
    const handler: CoreRuntimeEventHandler = event => event.type;
    const subscription: CoreRuntimeEventSubscription = subscribeToCoreRuntimeEvent(
      host,
      eventType,
      handler,
    );
    const event: CoreRuntimeEvent = {
      type: "runtime.started",
      timestamp: new Date(),
    };

    expect(health.applicationName).toBe("core-type-api");
    expect(report.context.component).toBe("runtime:core-type-api");
    expect(result.state).toBe("created");
    expect(subscription.eventType).toBe(eventType);
    expect(event.type).toBe(eventType);
  });

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

  it("reads live Runtime diagnostics through Core without caching reports", async () => {
    const host = createCoreRuntimeHost({
      application: {
        name: "core-live-diagnostics",
        version: {
          major: 0,
          minor: 2,
          patch: 0,
        },
      },
      modules: [{
        manifest: {
          id: "live-module",
          name: "Live module",
          version: "1.0.0",
          dependencies: [],
        },
        module: { async initialize() {} },
      }],
    });

    const before = inspectCoreRuntimeHost(host);
    await host.start();
    const after = inspectCoreRuntimeHost(host);

    expect(before.health.health).toBe("degraded");
    expect(before.report.result.ok).toBe(false);
    expect(after.health.health).toBe("healthy");
    expect(after.report.result.ok).toBe(true);
    expect(after.report.result.issues).toEqual([]);
  });

  it("preserves Runtime diagnostic context through Core inspection", () => {
    const host = createCoreRuntimeHost({
      application: {
        name: "core-context-diagnostics",
        version: {
          major: 0,
          minor: 2,
          patch: 3,
        },
      },
    });

    const diagnostics = inspectCoreRuntimeHost(host);

    expect(diagnostics.report.context).toEqual({
      component: "runtime:core-context-diagnostics",
      version: "0.2.3",
    });
  });

  it("preserves Runtime diagnostic issue severity through Core inspection", async () => {
    const host = createCoreRuntimeHost({
      application: {
        name: "core-failed-diagnostics",
        version: {
          major: 0,
          minor: 2,
          patch: 0,
        },
      },
      modules: [{
        manifest: {
          id: "failed-module",
          name: "Failed module",
          version: "1.0.0",
          dependencies: [],
        },
        module: {
          async initialize() {
            throw new Error("core diagnostic failure");
          },
        },
      }],
    });

    await expect(host.start()).rejects.toThrow("core diagnostic failure");
    const diagnostics = inspectCoreRuntimeHost(host);

    expect(diagnostics.health.health).toBe("failed");
    expect(diagnostics.report.result.issues).toEqual([{
      code: "runtime.module.failed",
      message: "Runtime module failed: failed-module - core diagnostic failure",
      severity: "error",
    }]);
  });

  it("keeps Core diagnostic inspection separate from Runtime module snapshots", () => {
    const host = createCoreRuntimeHost({
      application: {
        name: "core-snapshot-diagnostics",
        version: {
          major: 0,
          minor: 2,
          patch: 0,
        },
      },
      modules: [{
        manifest: {
          id: "snapshot-module",
          name: "Snapshot module",
          version: "1.0.0",
          dependencies: [],
        },
        module: { async initialize() {} },
      }],
    });

    const diagnostics = inspectCoreRuntimeHost(host);

    expect(diagnostics.health.modules).toEqual([{
      moduleId: "snapshot-module",
      moduleVersion: "1.0.0",
      health: "degraded",
      status: "registered",
    }]);
    expect(diagnostics.report.result.issues[0]?.message).toBe(
      "Runtime module is degraded: snapshot-module (registered)",
    );
  });

  it("transitions Runtime lifecycle through the Core package root", async () => {
    const host = createCoreRuntimeHost({
      application: {
        name: "core-lifecycle",
        version: {
          major: 0,
          minor: 2,
          patch: 0,
        },
      },
    });

    const startAction: CoreRuntimeLifecycleAction = "start";
    const started: CoreRuntimeLifecycleResult = await transitionCoreRuntimeHost(
      host,
      startAction,
    );
    const running: CoreRuntimeLifecycleState = started.state;

    expect(started).toEqual({
      action: "start",
      state: "running",
    });
    expect(running).toBe("running");

    const stopped = await transitionCoreRuntimeHost(host, "stop");

    expect(stopped).toEqual({
      action: "stop",
      state: "stopped",
    });
  });

  it("disposes Runtime lifecycle through Core", async () => {
    const host = createCoreRuntimeHost({
      application: {
        name: "core-dispose",
        version: {
          major: 0,
          minor: 2,
          patch: 0,
        },
      },
    });

    const disposed = await transitionCoreRuntimeHost(host, "dispose");

    expect(disposed).toEqual({
      action: "dispose",
      state: "disposed",
    });
  });

  it("subscribes to Runtime lifecycle events through Core", async () => {
    const host = createCoreRuntimeHost({
      application: {
        name: "core-events",
        version: {
          major: 0,
          minor: 2,
          patch: 0,
        },
      },
    });
    const eventType: CoreRuntimeEventType = "runtime.started";
    const received: CoreRuntimeEvent[] = [];
    const handler: CoreRuntimeEventHandler = event => {
      received.push(event);
    };

    const subscription: CoreRuntimeEventSubscription = subscribeToCoreRuntimeEvent(
      host,
      eventType,
      handler,
    );

    await transitionCoreRuntimeHost(host, "start");

    expect(subscription.eventType).toBe("runtime.started");
    expect(received.map(event => event.type)).toEqual(["runtime.started"]);
  });

  it("preserves Runtime lifecycle event payloads through Core subscriptions", async () => {
    const host = createCoreRuntimeHost({
      application: {
        name: "core-event-payload",
        version: {
          major: 0,
          minor: 2,
          patch: 0,
        },
      },
    });
    const received: CoreRuntimeEvent[] = [];

    subscribeToCoreRuntimeEvent(host, "runtime.initialized", event => {
      received.push(event);
    });
    subscribeToCoreRuntimeEvent(host, "runtime.started", event => {
      received.push(event);
    });

    await transitionCoreRuntimeHost(host, "start");

    expect(received.map(event => event.type)).toEqual([
      "runtime.initialized",
      "runtime.started",
    ]);
    expect(received[0]?.timestamp).toBeInstanceOf(Date);
    expect(received[1]?.timestamp).toBeInstanceOf(Date);
  });

  it("awaits Runtime lifecycle event handlers subscribed through Core", async () => {
    const host = createCoreRuntimeHost({
      application: {
        name: "core-event-await",
        version: {
          major: 0,
          minor: 2,
          patch: 0,
        },
      },
    });
    const order: string[] = [];

    subscribeToCoreRuntimeEvent(host, "runtime.initialized", async event => {
      order.push(`${event.type}:start`);
      await Promise.resolve();
      order.push(`${event.type}:end`);
    });
    subscribeToCoreRuntimeEvent(host, "runtime.started", event => {
      order.push(event.type);
    });

    await transitionCoreRuntimeHost(host, "start");

    expect(order).toEqual([
      "runtime.initialized:start",
      "runtime.initialized:end",
      "runtime.started",
    ]);
  });

  it("preserves Runtime module lifecycle event payloads through Core subscriptions", async () => {
    const host = createCoreRuntimeHost({
      application: {
        name: "core-module-events",
        version: {
          major: 0,
          minor: 2,
          patch: 0,
        },
      },
      modules: [{
        manifest: {
          id: "core-module-event",
          name: "Core module event",
          version: "1.0.0",
          dependencies: [],
        },
        module: {
          async initialize() {},
          async stop() {},
          async dispose() {},
        },
      }],
    });
    const received: string[] = [];

    subscribeToCoreRuntimeEvent(host, "runtime.module.initialized", event => {
      received.push(`${event.type}:${event.moduleId}:${event.timestamp instanceof Date}`);
    });
    subscribeToCoreRuntimeEvent(host, "runtime.module.stopped", event => {
      received.push(`${event.type}:${event.moduleId}:${event.timestamp instanceof Date}`);
    });
    subscribeToCoreRuntimeEvent(host, "runtime.module.disposed", event => {
      received.push(`${event.type}:${event.moduleId}:${event.timestamp instanceof Date}`);
    });

    await transitionCoreRuntimeHost(host, "start");
    await transitionCoreRuntimeHost(host, "dispose");

    expect(received).toEqual([
      "runtime.module.initialized:core-module-event:true",
      "runtime.module.stopped:core-module-event:true",
      "runtime.module.disposed:core-module-event:true",
    ]);
  });

  it("preserves Runtime diagnostic event payloads through Core subscriptions", async () => {
    const host = createCoreRuntimeHost({
      application: {
        name: "core-diagnostic-events",
        version: {
          major: 0,
          minor: 2,
          patch: 0,
        },
      },
      modules: [{
        manifest: {
          id: "core-diagnostic-event",
          name: "Core diagnostic event",
          version: "1.0.0",
          dependencies: [],
        },
        module: { async initialize() {} },
      }],
    });
    const received: CoreRuntimeEvent[] = [];

    subscribeToCoreRuntimeEvent(host, "runtime.diagnostics.changed", event => {
      received.push(event);
    });

    await transitionCoreRuntimeHost(host, "start");

    expect(received).toMatchObject([{
      type: "runtime.diagnostics.changed",
      previousHealth: undefined,
      currentHealth: "healthy",
      report: {
        applicationName: "core-diagnostic-events",
        health: "healthy",
      },
    }]);
    expect(received[0]?.timestamp).toBeInstanceOf(Date);
  });

  it("returns disposable Core Runtime event subscriptions", async () => {
    const host = createCoreRuntimeHost({
      application: {
        name: "core-event-dispose",
        version: {
          major: 0,
          minor: 2,
          patch: 0,
        },
      },
    });
    const received: CoreRuntimeEventType[] = [];
    const subscription = subscribeToCoreRuntimeEvent(
      host,
      "runtime.started",
      event => {
        received.push(event.type);
      },
    );

    await subscription.dispose();
    await transitionCoreRuntimeHost(host, "start");

    expect(received).toEqual([]);
  });

  it("disposes Runtime event subscriptions created through Core without affecting others", async () => {
    const host = createCoreRuntimeHost({
      application: {
        name: "core-event-dispose-one",
        version: {
          major: 0,
          minor: 2,
          patch: 0,
        },
      },
    });
    const received: string[] = [];
    const first = subscribeToCoreRuntimeEvent(host, "runtime.started", event => {
      received.push(`first:${event.type}`);
    });

    subscribeToCoreRuntimeEvent(host, "runtime.started", event => {
      received.push(`second:${event.type}`);
    });

    await first.dispose();
    await transitionCoreRuntimeHost(host, "start");

    expect(received).toEqual(["second:runtime.started"]);
  });
});
