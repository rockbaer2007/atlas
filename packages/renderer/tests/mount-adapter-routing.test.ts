import { describe, expect, it } from "vitest";

import {
  createDefaultRendererMountAdapterRegistry,
  createRendererAdapterRegistry,
  createRendererOutput,
  createRendererTarget,
  executeRendererTargetMount,
  executeRendererTargetMountWithReport,
  findLatestRendererDomMountRecord,
  findLatestRendererMemoryMountRecord,
  RendererDefaultMountAdapterNames,
  resolveRendererTargetMountAdapter,
} from "../src";

describe("renderer mount adapter routing", () => {
  it("creates a default Memory and DOM mount adapter registry", () => {
    const routing = createDefaultRendererMountAdapterRegistry();

    expect(routing.registry.adapters.map(adapter => adapter.name)).toEqual([
      RendererDefaultMountAdapterNames.Memory,
      RendererDefaultMountAdapterNames.Dom,
    ]);
    expect(routing.memoryAdapter.store.records).toEqual([]);
    expect(routing.domAdapter.store.records).toEqual([]);
  });

  it("resolves memory targets to the Memory mount adapter", () => {
    const routing = createDefaultRendererMountAdapterRegistry();
    const target = createRendererTarget({
      kind: "memory",
      name: "preview-cache",
    });

    const resolution = resolveRendererTargetMountAdapter(routing.registry, target);

    expect(resolution).toEqual({
      target,
      adapterName: RendererDefaultMountAdapterNames.Memory,
      adapter: routing.memoryAdapter,
    });
  });

  it("resolves surface targets to the DOM mount adapter", () => {
    const routing = createDefaultRendererMountAdapterRegistry();
    const target = createRendererTarget({
      kind: "surface",
      name: "preview-surface",
      identifier: "atlas-preview",
    });

    const resolution = resolveRendererTargetMountAdapter(routing.registry, target);

    expect(resolution).toEqual({
      target,
      adapterName: RendererDefaultMountAdapterNames.Dom,
      adapter: routing.domAdapter,
    });
  });

  it("reports missing target adapters before mounting", () => {
    const registry = createRendererAdapterRegistry([]);
    const target = createRendererTarget({
      kind: "memory",
      name: "preview-cache",
    });

    const resolution = resolveRendererTargetMountAdapter(registry, target);

    expect(resolution).toEqual({
      target,
      adapterName: RendererDefaultMountAdapterNames.Memory,
      error: "Renderer mount adapter renderer.memory was not found.",
    });
  });

  it("mounts memory targets through the unified target mount flow", async () => {
    const routing = createDefaultRendererMountAdapterRegistry();
    const output = createRendererOutput({
      kind: "fragment",
      name: "preview-fragment",
      content: "<p>Atlas preview</p>",
    });
    const target = createRendererTarget({
      kind: "memory",
      name: "preview-cache",
    });

    const result = await executeRendererTargetMount({
      output,
      target,
      registry: routing.registry,
    });

    expect(result).toEqual({
      mounted: true,
      output,
      target,
    });
    expect(findLatestRendererMemoryMountRecord(routing.memoryAdapter.store, {
      outputName: output.name,
      targetName: target.name,
    })).toEqual({
      outputName: output.name,
      outputKind: output.kind,
      targetName: target.name,
      content: output.content,
    });
    expect(routing.domAdapter.store.records).toEqual([]);
  });

  it("mounts surface targets through the unified target mount flow", async () => {
    const routing = createDefaultRendererMountAdapterRegistry();
    const output = createRendererOutput({
      kind: "document",
      name: "preview-document",
      content: "<main>Atlas surface</main>",
    });
    const target = createRendererTarget({
      kind: "surface",
      name: "preview-surface",
      identifier: "atlas-root",
    });

    const result = await executeRendererTargetMount({
      output,
      target,
      registry: routing.registry,
    });

    expect(result).toEqual({
      mounted: true,
      output,
      target,
    });
    expect(findLatestRendererDomMountRecord(routing.domAdapter.store, {
      outputName: output.name,
      targetName: target.name,
      elementId: target.identifier,
    })).toEqual({
      outputName: output.name,
      outputKind: output.kind,
      targetName: target.name,
      elementId: target.identifier,
      html: output.content,
    });
    expect(routing.memoryAdapter.store.records).toEqual([]);
  });

  it("returns mount failures when unified routing cannot find an adapter", async () => {
    const output = createRendererOutput({
      kind: "fragment",
      name: "orphan-fragment",
    });
    const target = createRendererTarget({
      kind: "memory",
      name: "orphan-cache",
    });

    const result = await executeRendererTargetMount({
      output,
      target,
      registry: createRendererAdapterRegistry([]),
    });

    expect(result).toEqual({
      mounted: false,
      output,
      target,
      error: "Renderer mount adapter renderer.memory was not found.",
    });
  });

  it("returns mount failures for surface targets without identifiers", async () => {
    const routing = createDefaultRendererMountAdapterRegistry();
    const output = createRendererOutput({
      kind: "fragment",
      name: "invalid-surface-fragment",
    });
    const target = createRendererTarget({
      kind: "surface",
      name: "invalid-surface",
    });

    const result = await executeRendererTargetMount({
      output,
      target,
      registry: routing.registry,
    });

    expect(result).toEqual({
      mounted: false,
      output,
      target,
      error: "Renderer surface targets require identifiers before adapter routing.",
    });
    expect(routing.memoryAdapter.store.records).toEqual([]);
    expect(routing.domAdapter.store.records).toEqual([]);
  });

  it("reports successful memory mounts through lifecycle records", async () => {
    const routing = createDefaultRendererMountAdapterRegistry();
    const output = createRendererOutput({
      kind: "fragment",
      name: "reported-memory-fragment",
      content: "reported content",
    });
    const target = createRendererTarget({
      kind: "memory",
      name: "reported-memory-cache",
    });

    const execution = await executeRendererTargetMountWithReport({
      output,
      target,
      registry: routing.registry,
    });

    expect(execution.result.mounted).toBe(true);
    expect(execution.lifecycleRecord.state).toBe("reported");
    expect(execution.lifecycleRecord.result).toBe(execution.result);
    expect(execution.lifecycleRecord.report).toBe(execution.diagnosticReport);
    expect(execution.diagnosticReport).toEqual({
      context: {
        component: "renderer.mount",
      },
      result: {
        ok: true,
        issues: [],
      },
    });
    expect(execution.report).toEqual({
      state: "reported",
      planName: "target:reported-memory-fragment->reported-memory-cache",
      strategy: "adapter",
      outputName: output.name,
      targetName: target.name,
      qualityGates: ["request", "output", "target", "diagnostics"],
      planned: false,
      executed: false,
      reported: true,
      issueCount: 0,
      issues: [],
      mounted: true,
      diagnosticsOk: true,
    });
  });

  it("reports successful DOM mounts through lifecycle records", async () => {
    const routing = createDefaultRendererMountAdapterRegistry();
    const output = createRendererOutput({
      kind: "document",
      name: "reported-dom-document",
      content: "<section>Reported DOM</section>",
    });
    const target = createRendererTarget({
      kind: "surface",
      name: "reported-dom-surface",
      identifier: "reported-dom-root",
    });

    const execution = await executeRendererTargetMountWithReport({
      output,
      target,
      registry: routing.registry,
    });

    expect(execution.result).toEqual({
      mounted: true,
      output,
      target,
    });
    expect(execution.report.mounted).toBe(true);
    expect(execution.report.diagnosticsOk).toBe(true);
    expect(execution.report.planName).toBe(
      "target:reported-dom-document->reported-dom-surface",
    );
    expect(findLatestRendererDomMountRecord(routing.domAdapter.store, {
      outputName: output.name,
      targetName: target.name,
      elementId: target.identifier,
    })?.html).toBe(output.content);
  });

  it("reports missing adapter failures through diagnostics", async () => {
    const output = createRendererOutput({
      kind: "fragment",
      name: "missing-adapter-fragment",
    });
    const target = createRendererTarget({
      kind: "memory",
      name: "missing-adapter-cache",
    });

    const execution = await executeRendererTargetMountWithReport({
      output,
      target,
      registry: createRendererAdapterRegistry([]),
    });

    expect(execution.result.mounted).toBe(false);
    expect(execution.diagnosticReport.result).toEqual({
      ok: false,
      issues: [{
        code: "renderer.mount.failed",
        message: "Renderer mount adapter renderer.memory was not found.",
        severity: "error",
      }],
    });
    expect(execution.report).toMatchObject({
      state: "reported",
      mounted: false,
      diagnosticsOk: false,
      issueCount: 1,
    });
  });

  it("reports invalid surface targets through diagnostics without store mutation", async () => {
    const routing = createDefaultRendererMountAdapterRegistry();
    const output = createRendererOutput({
      kind: "fragment",
      name: "reported-invalid-surface-fragment",
    });
    const target = createRendererTarget({
      kind: "surface",
      name: "reported-invalid-surface",
    });

    const execution = await executeRendererTargetMountWithReport({
      output,
      target,
      registry: routing.registry,
    });

    expect(execution.result.error).toBe(
      "Renderer surface targets require identifiers before adapter routing.",
    );
    expect(execution.report).toMatchObject({
      state: "reported",
      mounted: false,
      diagnosticsOk: false,
      issueCount: 1,
    });
    expect(routing.memoryAdapter.store.records).toEqual([]);
    expect(routing.domAdapter.store.records).toEqual([]);
  });
});
