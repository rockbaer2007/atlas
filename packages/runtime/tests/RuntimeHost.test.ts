import { describe, expect, it } from "vitest";

import type { Application } from "@atlas/kernel";

import { RuntimeHost, RuntimeServiceKeys } from "../src";

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
});
