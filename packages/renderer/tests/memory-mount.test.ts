import { describe, expect, it } from "vitest";

import {
  executeRendererMemoryMountPlan,
  createRendererMemoryMountAdapter,
  createRendererMemoryMountPlan,
  createRendererMountRequest,
  createRendererOutput,
  createRendererTarget,
  findRendererMemoryMountRecords,
  summarizeRendererMemoryMountStore,
} from "../src";

describe("renderer memory mounting", () => {
  it("mounts Renderer output into a memory target", () => {
    const adapter = createRendererMemoryMountAdapter("memory");
    const output = createRendererOutput({
      kind: "fragment",
      name: "welcome-fragment",
      content: "<h1>Welcome</h1>",
    });
    const target = createRendererTarget({
      kind: "memory",
      name: "preview",
      identifier: "preview-root",
    });

    const result = adapter.mount(createRendererMountRequest({
      output,
      target,
    }));

    expect(result).toEqual({
      mounted: true,
      output,
      target,
    });
    expect(adapter.store.records).toEqual([{
      outputName: "welcome-fragment",
      outputKind: "fragment",
      targetName: "preview",
      targetIdentifier: "preview-root",
      content: "<h1>Welcome</h1>",
    }]);
  });

  it("preserves empty Renderer output content in memory records", () => {
    const adapter = createRendererMemoryMountAdapter("memory");
    const output = createRendererOutput({
      kind: "document",
      name: "empty-document",
    });
    const target = createRendererTarget({
      kind: "memory",
      name: "empty-preview",
    });

    adapter.mount(createRendererMountRequest({
      output,
      target,
    }));

    expect(adapter.store.records[0]).toEqual({
      outputName: "empty-document",
      outputKind: "document",
      targetName: "empty-preview",
      content: "",
    });
  });

  it("rejects non-memory targets without mutating the memory store", () => {
    const adapter = createRendererMemoryMountAdapter("memory");
    const output = createRendererOutput({
      kind: "fragment",
      name: "surface-fragment",
      content: "<p>Surface</p>",
    });
    const target = createRendererTarget({
      kind: "surface",
      name: "surface-preview",
    });

    const result = adapter.mount(createRendererMountRequest({
      output,
      target,
    }));

    expect(result).toEqual({
      mounted: false,
      output,
      target,
      error: "Renderer memory adapter cannot mount to surface targets",
    });
    expect(adapter.store.records).toEqual([]);
  });

  it("copies initial memory store records before mounting", () => {
    const seedRecords = [{
      outputName: "seed",
      outputKind: "fragment" as const,
      targetName: "seed-target",
      content: "seed-content",
    }];
    const adapter = createRendererMemoryMountAdapter("memory", {
      records: seedRecords,
    });

    seedRecords.push({
      outputName: "late",
      outputKind: "document",
      targetName: "late-target",
      content: "late-content",
    });

    expect(adapter.store.records).toEqual([{
      outputName: "seed",
      outputKind: "fragment",
      targetName: "seed-target",
      content: "seed-content",
    }]);
  });

  it("finds memory mount records by output and target metadata", () => {
    const adapter = createRendererMemoryMountAdapter("memory", {
      records: [{
        outputName: "first",
        outputKind: "fragment",
        targetName: "preview",
        targetIdentifier: "preview-root",
        content: "first-content",
      }, {
        outputName: "second",
        outputKind: "document",
        targetName: "preview",
        content: "second-content",
      }],
    });

    expect(findRendererMemoryMountRecords(adapter.store, {
      targetName: "preview",
      targetIdentifier: "preview-root",
    })).toEqual([{
      outputName: "first",
      outputKind: "fragment",
      targetName: "preview",
      targetIdentifier: "preview-root",
      content: "first-content",
    }]);
    expect(findRendererMemoryMountRecords(adapter.store, {
      outputName: "missing",
    })).toEqual([]);
  });

  it("summarizes memory mount store records", () => {
    const adapter = createRendererMemoryMountAdapter("memory", {
      records: [{
        outputName: "first",
        outputKind: "fragment",
        targetName: "preview",
        content: "first-content",
      }, {
        outputName: "second",
        outputKind: "document",
        targetName: "preview",
        content: "",
      }],
    });

    expect(summarizeRendererMemoryMountStore(adapter.store)).toEqual({
      recordCount: 2,
      outputCount: 2,
      targetCount: 1,
      emptyContentCount: 1,
    });
  });

  it("creates adapter-based memory mount plans", () => {
    const output = createRendererOutput({
      kind: "fragment",
      name: "planned-fragment",
      content: "planned-content",
    });
    const target = createRendererTarget({
      kind: "memory",
      name: "planned-target",
    });
    const request = createRendererMountRequest({
      output,
      target,
    });

    expect(createRendererMemoryMountPlan(request)).toEqual({
      name: "memory:planned-fragment->planned-target",
      status: "planned",
      strategy: "adapter",
      request,
      qualityGates: ["request", "output", "target", "diagnostics"],
    });
  });

  it("executes memory mount plans through the renderer plan executor", async () => {
    const adapter = createRendererMemoryMountAdapter("memory");
    const output = createRendererOutput({
      kind: "fragment",
      name: "executed-fragment",
      content: "executed-content",
    });
    const target = createRendererTarget({
      kind: "memory",
      name: "executed-target",
    });
    const plan = createRendererMemoryMountPlan(createRendererMountRequest({
      output,
      target,
    }));

    await expect(executeRendererMemoryMountPlan(plan, adapter)).resolves.toEqual({
      mounted: true,
      output,
      target,
    });
    expect(adapter.store.records).toEqual([{
      outputName: "executed-fragment",
      outputKind: "fragment",
      targetName: "executed-target",
      content: "executed-content",
    }]);
  });
});
