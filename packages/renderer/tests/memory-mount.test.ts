import { describe, expect, it } from "vitest";

import {
  createRendererMemoryMountAdapter,
  createRendererMountRequest,
  createRendererOutput,
  createRendererTarget,
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
});

