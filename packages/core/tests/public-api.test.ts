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
import {
  createCoreRuntimeHost,
  inspectCoreRuntimeHost,
  subscribeToCoreRuntimeEvent,
  transitionCoreRuntimeHost,
} from "../src";

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
});
