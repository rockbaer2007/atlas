import { describe, expect, it } from "vitest";

import { createCoreRuntimeHost, type CoreRuntimeHost } from "@atlas/core";

import type {
  RendererAdapter,
  RendererAdapterConflict,
  RendererAdapterConflictResolution,
  RendererAdapterLookupRequest,
  RendererAdapterLookupResult,
  RendererAdapterMountResult,
  RendererAdapterRegistry,
  RendererAdapterSelectionRequest,
  RendererAdapterSelectionResult,
  RendererHostContext,
  RendererMountDiagnosticReport,
  RendererMountRequest,
  RendererMountResult,
  RendererOutput,
  RendererOutputKind,
  RendererPipeline,
  RendererPipelineExecutionResult,
  RendererPlatformAdapter,
  RendererPlatformAdapterConflict,
  RendererPlatformAdapterConflictResolution,
  RendererPlatformAdapterLookupRequest,
  RendererPlatformAdapterLookupResult,
  RendererPlatformAdapterRegistry,
  RendererPlatformAdapterSelectionRequest,
  RendererPlatformAdapterSelectionResult,
  RendererPipelineStage,
  RendererPipelineStageResult,
  RendererTarget,
  RendererTargetKind,
} from "../src";
import * as Renderer from "../src";
import {
  createRendererAdapter,
  createRendererAdapterConflict,
  createRendererAdapterConflictResolution,
  createRendererAdapterLookupRequest,
  createRendererAdapterLookupResult,
  createRendererAdapterRegistry,
  createRendererAdapterSelectionRequest,
  createRendererAdapterSelectionResult,
  createRendererMountRequest,
  createRendererMountResult,
  createRendererOutput,
  createRendererHostContext,
  createRendererPipeline,
  createRendererPlatformAdapter,
  createRendererPlatformAdapterConflict,
  createRendererPlatformAdapterConflictResolution,
  createRendererPlatformAdapterLookupRequest,
  createRendererPlatformAdapterLookupResult,
  createRendererPlatformAdapterRegistry,
  createRendererPlatformAdapterSelectionRequest,
  createRendererPlatformAdapterSelectionResult,
  createRendererTarget,
  executeRendererPipeline,
  findRendererAdapter,
  findRendererAdapterConflicts,
  findRendererPlatformAdapter,
  findRendererPlatformAdapterConflicts,
  inspectRendererMountResult,
  mountResolvedRendererAdapter,
  resolveRendererAdapterConflictWithFirstCandidate,
  resolveRendererAdapterRegistryConflictsWithFirstCandidate,
  resolveRendererPlatformAdapterConflictWithFirstCandidate,
  resolveRendererPlatformAdapterRegistryConflictsWithFirstCandidate,
  selectFirstRendererAdapterCandidate,
  selectFirstRendererPlatformAdapterCandidate,
} from "../src";

describe("renderer public API", () => {
  it("exports the Renderer package value surface from the package root", () => {
    expect(Renderer.createRendererAdapter).toBeTypeOf("function");
    expect(Renderer.createRendererAdapterConflict).toBeTypeOf("function");
    expect(Renderer.createRendererAdapterConflictResolution).toBeTypeOf("function");
    expect(Renderer.createRendererAdapterLookupRequest).toBeTypeOf("function");
    expect(Renderer.createRendererAdapterLookupResult).toBeTypeOf("function");
    expect(Renderer.createRendererAdapterRegistry).toBeTypeOf("function");
    expect(Renderer.createRendererAdapterSelectionRequest).toBeTypeOf("function");
    expect(Renderer.createRendererAdapterSelectionResult).toBeTypeOf("function");
    expect(Renderer.createRendererHostContext).toBeTypeOf("function");
    expect(Renderer.createRendererMountRequest).toBeTypeOf("function");
    expect(Renderer.createRendererMountResult).toBeTypeOf("function");
    expect(Renderer.createRendererOutput).toBeTypeOf("function");
    expect(Renderer.createRendererPipeline).toBeTypeOf("function");
    expect(Renderer.createRendererPlatformAdapter).toBeTypeOf("function");
    expect(Renderer.createRendererPlatformAdapterConflict).toBeTypeOf("function");
    expect(Renderer.createRendererPlatformAdapterConflictResolution).toBeTypeOf("function");
    expect(Renderer.createRendererPlatformAdapterLookupRequest).toBeTypeOf("function");
    expect(Renderer.createRendererPlatformAdapterLookupResult).toBeTypeOf("function");
    expect(Renderer.createRendererPlatformAdapterRegistry).toBeTypeOf("function");
    expect(Renderer.createRendererPlatformAdapterSelectionRequest).toBeTypeOf("function");
    expect(Renderer.createRendererPlatformAdapterSelectionResult).toBeTypeOf("function");
    expect(Renderer.createRendererTarget).toBeTypeOf("function");
    expect(Renderer.executeRendererPipeline).toBeTypeOf("function");
    expect(Renderer.findRendererAdapter).toBeTypeOf("function");
    expect(Renderer.findRendererAdapterConflicts).toBeTypeOf("function");
    expect(Renderer.findRendererPlatformAdapter).toBeTypeOf("function");
    expect(Renderer.findRendererPlatformAdapterConflicts).toBeTypeOf("function");
    expect(Renderer.inspectRendererMountResult).toBeTypeOf("function");
    expect(Renderer.RendererMountDiagnosticCodes.MountFailed).toBe("renderer.mount.failed");
    expect(Renderer.mountResolvedRendererAdapter).toBeTypeOf("function");
    expect(Renderer.resolveRendererAdapterConflictWithFirstCandidate).toBeTypeOf("function");
    expect(Renderer.resolveRendererAdapterRegistryConflictsWithFirstCandidate).toBeTypeOf("function");
    expect(Renderer.resolveRendererPlatformAdapterConflictWithFirstCandidate).toBeTypeOf("function");
    expect(Renderer.resolveRendererPlatformAdapterRegistryConflictsWithFirstCandidate).toBeTypeOf("function");
    expect(Renderer.selectFirstRendererAdapterCandidate).toBeTypeOf("function");
    expect(Renderer.selectFirstRendererPlatformAdapterCandidate).toBeTypeOf("function");
  });

  it("exports the Renderer package type surface from the package root", () => {
    const runtime: CoreRuntimeHost = createCoreRuntimeHost({
      application: {
        name: "renderer-type-api",
        version: {
          major: 0,
          minor: 2,
          patch: 0,
        },
      },
    });

    const context: RendererHostContext = {
      runtime,
    };
    const stageResult: RendererPipelineStageResult = {
      stage: "prepare",
      completed: true,
    };
    const stage: RendererPipelineStage = {
      name: "prepare",
      run: () => stageResult,
    };
    const pipeline: RendererPipeline = createRendererPipeline([stage]);
    const execution: RendererPipelineExecutionResult = {
      completed: true,
      stages: [stageResult],
    };
    const outputKind: RendererOutputKind = "fragment";
    const output: RendererOutput = {
      kind: outputKind,
      name: "type-output",
      content: "ready",
    };
    const targetKind: RendererTargetKind = "memory";
    const target: RendererTarget = {
      kind: targetKind,
      name: "type-target",
    };
    const mountRequest: RendererMountRequest = {
      output,
      target,
    };
    const mountResult: RendererMountResult = {
      mounted: false,
      output,
      target,
    };
    const mountDiagnosticReport: RendererMountDiagnosticReport = {
      context: {
        component: "renderer.mount",
      },
      result: {
        ok: true,
        issues: [],
      },
    };
    const adapterResult: RendererAdapterMountResult = mountResult;
    const adapter: RendererAdapter = {
      name: "type-adapter",
      mount: () => adapterResult,
    };
    const platformAdapter: RendererPlatformAdapter = {
      platform: "type-platform",
      adapter,
      capabilities: ["mount"],
    };
    const platformAdapterRegistry: RendererPlatformAdapterRegistry = {
      platformAdapters: [platformAdapter],
    };
    const platformAdapterConflict: RendererPlatformAdapterConflict = {
      platform: platformAdapter.platform,
      platformAdapters: [platformAdapter],
    };
    const platformAdapterConflictResolution: RendererPlatformAdapterConflictResolution = {
      conflict: platformAdapterConflict,
      resolved: false,
    };
    const platformAdapterLookupRequest: RendererPlatformAdapterLookupRequest = {
      platform: platformAdapter.platform,
    };
    const platformAdapterLookupResult: RendererPlatformAdapterLookupResult = {
      platform: platformAdapter.platform,
      platformAdapter,
    };
    const platformAdapterSelectionRequest: RendererPlatformAdapterSelectionRequest = {
      platform: platformAdapter.platform,
      candidates: [platformAdapter],
    };
    const platformAdapterSelectionResult: RendererPlatformAdapterSelectionResult = {
      platform: platformAdapter.platform,
      platformAdapter,
    };
    const adapterConflict: RendererAdapterConflict = {
      name: adapter.name,
      adapters: [adapter],
    };
    const adapterConflictResolution: RendererAdapterConflictResolution = {
      conflict: adapterConflict,
      resolved: false,
    };
    const adapterRegistry: RendererAdapterRegistry = {
      adapters: [adapter],
    };
    const adapterSelectionRequest: RendererAdapterSelectionRequest = {
      name: adapter.name,
      candidates: [adapter],
    };
    const adapterSelectionResult: RendererAdapterSelectionResult = {
      name: adapter.name,
      adapter,
    };
    const adapterLookupRequest: RendererAdapterLookupRequest = {
      name: adapter.name,
    };
    const adapterLookupResult: RendererAdapterLookupResult = {
      name: adapter.name,
      adapter,
    };

    expect(adapter.name).toBe("type-adapter");
    expect(adapterConflict.adapters[0]).toBe(adapter);
    expect(adapterConflictResolution.conflict).toBe(adapterConflict);
    expect(adapterRegistry.adapters[0]).toBe(adapter);
    expect(adapterSelectionRequest.candidates[0]).toBe(adapter);
    expect(adapterSelectionResult.adapter).toBe(adapter);
    expect(adapterLookupRequest.name).toBe(adapter.name);
    expect(adapterLookupResult.adapter).toBe(adapter);
    expect(platformAdapter.adapter).toBe(adapter);
    expect(platformAdapter.capabilities).toEqual(["mount"]);
    expect(platformAdapterConflict.platformAdapters[0]).toBe(platformAdapter);
    expect(platformAdapterConflictResolution.conflict).toBe(platformAdapterConflict);
    expect(platformAdapterRegistry.platformAdapters[0]).toBe(platformAdapter);
    expect(platformAdapterLookupRequest.platform).toBe(platformAdapter.platform);
    expect(platformAdapterLookupResult.platformAdapter).toBe(platformAdapter);
    expect(platformAdapterSelectionRequest.candidates[0]).toBe(platformAdapter);
    expect(platformAdapterSelectionResult.platformAdapter).toBe(platformAdapter);
    expect(context.runtime.application.name).toBe("renderer-type-api");
    expect(output.kind).toBe("fragment");
    expect(target.kind).toBe("memory");
    expect(mountRequest.output.name).toBe("type-output");
    expect(mountResult.mounted).toBe(false);
    expect(mountDiagnosticReport.result.ok).toBe(true);
    expect(adapter.mount(mountRequest)).toBe(adapterResult);
    expect(pipeline[0]?.name).toBe("prepare");
    expect(execution.completed).toBe(true);
  });

  it("creates a Renderer host context from a Core Runtime host", () => {
    const runtime: CoreRuntimeHost = createCoreRuntimeHost({
      application: {
        name: "renderer-api",
        version: {
          major: 0,
          minor: 2,
          patch: 0,
        },
      },
    });

    const context: RendererHostContext = createRendererHostContext(runtime);

    expect(context.runtime).toBe(runtime);
    expect(context.runtime.application.name).toBe("renderer-api");
  });

  it("creates Renderer output without binding it to a render target", () => {
    const output = createRendererOutput({
      kind: "fragment",
      name: "status-card",
      content: "online",
    });

    expect(output).toEqual({
      kind: "fragment",
      name: "status-card",
      content: "online",
    });
  });

  it("creates Renderer output as an immutable copy of the source shape", () => {
    const source: RendererOutput = {
      kind: "document",
      name: "dashboard",
      content: "ready",
    };

    const output = createRendererOutput(source);

    expect(output).toEqual(source);
    expect(output).not.toBe(source);
  });

  it("creates Renderer output without optional content", () => {
    const output = createRendererOutput({
      kind: "fragment",
      name: "empty-fragment",
    });

    expect(output).toEqual({
      kind: "fragment",
      name: "empty-fragment",
    });
  });

  it("supports the current Renderer output kinds", () => {
    const fragment = createRendererOutput({
      kind: "fragment",
      name: "card-fragment",
    });
    const document = createRendererOutput({
      kind: "document",
      name: "dashboard-document",
    });

    expect([fragment.kind, document.kind]).toEqual(["fragment", "document"]);
  });

  it("creates Renderer targets without mounting behavior", () => {
    const target = createRendererTarget({
      kind: "memory",
      name: "preview",
      identifier: "preview-main",
    });

    expect(target).toEqual({
      kind: "memory",
      name: "preview",
      identifier: "preview-main",
    });
  });

  it("creates Renderer targets as immutable copies of the source shape", () => {
    const source: RendererTarget = {
      kind: "surface",
      name: "dashboard",
      identifier: "dashboard-root",
    };

    const target = createRendererTarget(source);

    expect(target).toEqual(source);
    expect(target).not.toBe(source);
  });

  it("creates Renderer targets without optional identifiers", () => {
    const target = createRendererTarget({
      kind: "memory",
      name: "scratch",
    });

    expect(target).toEqual({
      kind: "memory",
      name: "scratch",
    });
  });

  it("supports the current Renderer target kinds", () => {
    const memory = createRendererTarget({
      kind: "memory",
      name: "preview-buffer",
    });
    const surface = createRendererTarget({
      kind: "surface",
      name: "dashboard-surface",
    });

    expect([memory.kind, surface.kind]).toEqual(["memory", "surface"]);
  });

  it("creates Renderer mount requests without mounting output", () => {
    const output = createRendererOutput({
      kind: "fragment",
      name: "status-card",
      content: "online",
    });
    const target = createRendererTarget({
      kind: "memory",
      name: "preview",
    });

    const request = createRendererMountRequest({
      output,
      target,
    });

    expect(request).toEqual({
      output,
      target,
    });
  });

  it("creates Renderer mount requests as immutable copies of the source shape", () => {
    const request: RendererMountRequest = {
      output: createRendererOutput({
        kind: "document",
        name: "dashboard",
      }),
      target: createRendererTarget({
        kind: "surface",
        name: "dashboard-surface",
        identifier: "dashboard-root",
      }),
    };

    const created = createRendererMountRequest(request);

    expect(created).toEqual(request);
    expect(created).not.toBe(request);
  });

  it("creates Renderer mount results without platform adapters", () => {
    const output = createRendererOutput({
      kind: "fragment",
      name: "tile",
    });
    const target = createRendererTarget({
      kind: "surface",
      name: "wall-panel",
    });

    const result = createRendererMountResult({
      mounted: false,
      output,
      target,
    });

    expect(result).toEqual({
      mounted: false,
      output,
      target,
    });
  });

  it("creates Renderer mount results as immutable copies of the source shape", () => {
    const result: RendererMountResult = {
      mounted: true,
      output: createRendererOutput({
        kind: "document",
        name: "mounted-dashboard",
      }),
      target: createRendererTarget({
        kind: "surface",
        name: "dashboard-surface",
      }),
    };

    const created = createRendererMountResult(result);

    expect(created).toEqual(result);
    expect(created).not.toBe(result);
  });

  it("supports current Renderer mount result states", () => {
    const output = createRendererOutput({
      kind: "fragment",
      name: "state-tile",
    });
    const target = createRendererTarget({
      kind: "memory",
      name: "state-buffer",
    });

    const pending = createRendererMountResult({
      mounted: false,
      output,
      target,
    });
    const mounted = createRendererMountResult({
      mounted: true,
      output,
      target,
    });

    expect([pending.mounted, mounted.mounted]).toEqual([false, true]);
  });

  it("creates Renderer adapters without concrete platform implementations", () => {
    const output = createRendererOutput({
      kind: "fragment",
      name: "adapter-tile",
    });
    const target = createRendererTarget({
      kind: "memory",
      name: "adapter-buffer",
    });
    const request = createRendererMountRequest({
      output,
      target,
    });

    const adapter = createRendererAdapter({
      name: "memory-adapter",
      mount: mountRequest => createRendererMountResult({
        mounted: true,
        output: mountRequest.output,
        target: mountRequest.target,
      }),
    });

    expect(adapter.name).toBe("memory-adapter");
    expect(adapter.mount(request)).toEqual({
      mounted: true,
      output,
      target,
    });
  });

  it("creates Renderer adapters as immutable copies of the source shape", () => {
    const adapter: RendererAdapter = {
      name: "copy-adapter",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    };

    const created = createRendererAdapter(adapter);

    expect(created).toEqual(adapter);
    expect(created).not.toBe(adapter);
  });

  it("supports asynchronous Renderer adapter mount contracts", async () => {
    const request = createRendererMountRequest({
      output: createRendererOutput({
        kind: "document",
        name: "async-dashboard",
      }),
      target: createRendererTarget({
        kind: "surface",
        name: "async-surface",
      }),
    });
    const adapter = createRendererAdapter({
      name: "async-adapter",
      async mount(mountRequest) {
        await Promise.resolve();

        return createRendererMountResult({
          mounted: true,
          output: mountRequest.output,
          target: mountRequest.target,
        });
      },
    });

    await expect(adapter.mount(request)).resolves.toEqual({
      mounted: true,
      output: request.output,
      target: request.target,
    });
  });

  it("preserves Renderer adapter names for future registration", () => {
    const adapters = [
      createRendererAdapter({
        name: "memory-preview",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      createRendererAdapter({
        name: "surface-dashboard",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
    ];

    expect(adapters.map(adapter => adapter.name)).toEqual([
      "memory-preview",
      "surface-dashboard",
    ]);
  });

  it("passes Renderer mount requests to adapter mount handlers", () => {
    const request = createRendererMountRequest({
      output: createRendererOutput({
        kind: "fragment",
        name: "handler-tile",
      }),
      target: createRendererTarget({
        kind: "memory",
        name: "handler-buffer",
      }),
    });
    let receivedRequest: RendererMountRequest | undefined;
    const adapter = createRendererAdapter({
      name: "handler-adapter",
      mount(mountRequest) {
        receivedRequest = mountRequest;

        return createRendererMountResult({
          mounted: true,
          output: mountRequest.output,
          target: mountRequest.target,
        });
      },
    });

    const result = adapter.mount(request);

    expect(receivedRequest).toBe(request);
    expect(result).toEqual({
      mounted: true,
      output: request.output,
      target: request.target,
    });
  });

  it("creates Renderer platform adapters without concrete platform behavior", () => {
    const adapter = createRendererAdapter({
      name: "platform-adapter",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });

    const platformAdapter = createRendererPlatformAdapter({
      platform: "generic-platform",
      adapter,
      capabilities: ["mount"],
    });

    expect(platformAdapter).toEqual({
      platform: "generic-platform",
      adapter,
      capabilities: ["mount"],
    });
  });

  it("keeps Renderer platform adapter capabilities independent from source arrays", () => {
    const adapter = createRendererAdapter({
      name: "capability-adapter",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });
    const capabilities = ["mount"];

    const platformAdapter = createRendererPlatformAdapter({
      platform: "capability-platform",
      adapter,
      capabilities,
    });
    capabilities.push("theme");

    expect(platformAdapter.capabilities).toEqual(["mount"]);
    expect(platformAdapter.capabilities).not.toBe(capabilities);
  });

  it("creates Renderer platform adapters without declared capabilities", () => {
    const adapter = createRendererAdapter({
      name: "empty-capability-adapter",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });

    const platformAdapter = createRendererPlatformAdapter({
      platform: "empty-capability-platform",
      adapter,
      capabilities: [],
    });

    expect(platformAdapter).toEqual({
      platform: "empty-capability-platform",
      adapter,
      capabilities: [],
    });
  });

  it("creates Renderer platform adapter conflicts without detection behavior", () => {
    const first = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "first-conflict-platform-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const second = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "second-conflict-platform-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });

    const conflict = createRendererPlatformAdapterConflict({
      platform: "surface",
      platformAdapters: [first, second],
    });

    expect(conflict).toEqual({
      platform: "surface",
      platformAdapters: [first, second],
    });
  });

  it("keeps Renderer platform adapter conflicts independent from source arrays", () => {
    const first = createRendererPlatformAdapter({
      platform: "memory",
      adapter: createRendererAdapter({
        name: "first-copy-conflict-platform-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const second = createRendererPlatformAdapter({
      platform: "memory",
      adapter: createRendererAdapter({
        name: "second-copy-conflict-platform-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const platformAdapters = [first];

    const conflict = createRendererPlatformAdapterConflict({
      platform: "memory",
      platformAdapters,
    });
    platformAdapters.push(second);

    expect(conflict.platformAdapters).toEqual([first]);
    expect(conflict.platformAdapters).not.toBe(platformAdapters);
  });

  it("creates empty Renderer platform adapter conflicts", () => {
    const platformAdapters: RendererPlatformAdapter[] = [];

    const conflict = Renderer.createRendererPlatformAdapterConflict({
      platform: "empty-platform",
      platformAdapters,
    });

    expect(conflict).toEqual({
      platform: "empty-platform",
      platformAdapters: [],
    });
    expect(conflict.platformAdapters).not.toBe(platformAdapters);
  });

  it("finds Renderer platform adapter conflicts from registries", () => {
    const first = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "first-detected-platform-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const unique = createRendererPlatformAdapter({
      platform: "memory",
      adapter: createRendererAdapter({
        name: "unique-detected-platform-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const second = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "second-detected-platform-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const registry = createRendererPlatformAdapterRegistry([first, unique, second]);

    const conflicts = findRendererPlatformAdapterConflicts(registry);

    expect(conflicts).toEqual([{
      platform: "surface",
      platformAdapters: [first, second],
    }]);
  });

  it("reports no Renderer platform adapter conflicts for unique registries", () => {
    const first = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "surface-unique-platform-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const second = createRendererPlatformAdapter({
      platform: "memory",
      adapter: createRendererAdapter({
        name: "memory-unique-platform-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const registry = createRendererPlatformAdapterRegistry([first, second]);

    expect(Renderer.findRendererPlatformAdapterConflicts(registry)).toEqual([]);
  });

  it("reports no Renderer platform adapter conflicts for empty registries", () => {
    const registry = createRendererPlatformAdapterRegistry([]);

    expect(Renderer.findRendererPlatformAdapterConflicts(registry)).toEqual([]);
  });

  it("creates unresolved Renderer platform adapter conflict resolutions", () => {
    const platformAdapter = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "unresolved-platform-conflict-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const conflict = createRendererPlatformAdapterConflict({
      platform: "surface",
      platformAdapters: [platformAdapter],
    });

    const resolution = createRendererPlatformAdapterConflictResolution({
      conflict,
      resolved: false,
    });

    expect(resolution).toEqual({
      conflict,
      resolved: false,
    });
    expect(resolution.conflict).not.toBe(conflict);
  });

  it("creates resolved Renderer platform adapter conflict resolutions", () => {
    const platformAdapter = createRendererPlatformAdapter({
      platform: "memory",
      adapter: createRendererAdapter({
        name: "resolved-platform-conflict-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const conflict = createRendererPlatformAdapterConflict({
      platform: "memory",
      platformAdapters: [platformAdapter],
    });

    const resolution = createRendererPlatformAdapterConflictResolution({
      conflict,
      resolved: true,
      platformAdapter,
    });

    expect(resolution).toEqual({
      conflict,
      resolved: true,
      platformAdapter,
    });
    expect(resolution.platformAdapter).toBe(platformAdapter);
    expect(resolution.conflict).not.toBe(conflict);
  });

  it("keeps Renderer platform adapter conflict resolution conflicts independent from source arrays", () => {
    const first = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "first-resolution-copy-platform-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const second = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "second-resolution-copy-platform-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const platformAdapters = [first];
    const conflict: RendererPlatformAdapterConflict = {
      platform: "surface",
      platformAdapters,
    };

    const resolution = createRendererPlatformAdapterConflictResolution({
      conflict,
      resolved: true,
      platformAdapter: first,
    });
    platformAdapters.push(second);

    expect(resolution.conflict.platformAdapters).toEqual([first]);
    expect(resolution.conflict.platformAdapters).not.toBe(platformAdapters);
  });

  it("reviews Renderer platform adapter conflict resolutions through the package root", () => {
    const first = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "first-package-root-resolution-platform-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const second = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "second-package-root-resolution-platform-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const platformAdapters = [first];
    const conflict: RendererPlatformAdapterConflict = {
      platform: "surface",
      platformAdapters,
    };

    const resolution = Renderer.createRendererPlatformAdapterConflictResolution({
      conflict,
      resolved: true,
      platformAdapter: first,
    });
    platformAdapters.push(second);

    expect(resolution).toEqual({
      conflict: {
        platform: "surface",
        platformAdapters: [first],
      },
      resolved: true,
      platformAdapter: first,
    });
    expect(resolution.conflict.platformAdapters).not.toBe(platformAdapters);
  });

  it("resolves Renderer platform adapter conflicts with first-candidate selection", () => {
    const first = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "first-platform-conflict-integration-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const second = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "second-platform-conflict-integration-adapter",
        mount: request => createRendererMountResult({
          mounted: true,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const conflict = createRendererPlatformAdapterConflict({
      platform: "surface",
      platformAdapters: [first, second],
    });

    const resolution = resolveRendererPlatformAdapterConflictWithFirstCandidate(conflict);

    expect(resolution).toEqual({
      conflict,
      resolved: true,
      platformAdapter: first,
    });
    expect(resolution.conflict).not.toBe(conflict);
  });

  it("reports unresolved Renderer platform adapter conflicts when no candidates exist", () => {
    const conflict = createRendererPlatformAdapterConflict({
      platform: "surface",
      platformAdapters: [],
    });

    const resolution = resolveRendererPlatformAdapterConflictWithFirstCandidate(conflict);

    expect(resolution).toEqual({
      conflict,
      resolved: false,
    });
    expect(resolution.conflict).not.toBe(conflict);
  });

  it("keeps Renderer platform adapter conflict integrations independent from source arrays", () => {
    const first = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "first-platform-conflict-copy-integration-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const second = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "second-platform-conflict-copy-integration-adapter",
        mount: request => createRendererMountResult({
          mounted: true,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const platformAdapters = [first];
    const conflict: RendererPlatformAdapterConflict = {
      platform: "surface",
      platformAdapters,
    };

    const resolution = Renderer.resolveRendererPlatformAdapterConflictWithFirstCandidate(conflict);
    platformAdapters.push(second);

    expect(resolution).toEqual({
      conflict: {
        platform: "surface",
        platformAdapters: [first],
      },
      resolved: true,
      platformAdapter: first,
    });
    expect(resolution.conflict.platformAdapters).not.toBe(platformAdapters);
  });

  it("resolves Renderer platform adapter registry conflicts with first-candidate selection", () => {
    const first = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "first-platform-registry-resolution-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const unique = createRendererPlatformAdapter({
      platform: "memory",
      adapter: createRendererAdapter({
        name: "unique-platform-registry-resolution-adapter",
        mount: request => createRendererMountResult({
          mounted: true,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const second = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "second-platform-registry-resolution-adapter",
        mount: request => createRendererMountResult({
          mounted: true,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const registry = createRendererPlatformAdapterRegistry([first, unique, second]);

    const resolutions = resolveRendererPlatformAdapterRegistryConflictsWithFirstCandidate(registry);

    expect(resolutions).toEqual([{
      conflict: {
        platform: "surface",
        platformAdapters: [first, second],
      },
      resolved: true,
      platformAdapter: first,
    }]);
  });

  it("reports no Renderer platform adapter registry conflict resolutions for unique registries", () => {
    const first = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "surface-platform-registry-resolution-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const second = createRendererPlatformAdapter({
      platform: "memory",
      adapter: createRendererAdapter({
        name: "memory-platform-registry-resolution-adapter",
        mount: request => createRendererMountResult({
          mounted: true,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const registry = createRendererPlatformAdapterRegistry([first, second]);

    expect(resolveRendererPlatformAdapterRegistryConflictsWithFirstCandidate(registry)).toEqual([]);
  });

  it("preserves Renderer platform adapter registry conflict resolution order", () => {
    const firstSurface = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "first-surface-platform-registry-order-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const firstMemory = createRendererPlatformAdapter({
      platform: "memory",
      adapter: createRendererAdapter({
        name: "first-memory-platform-registry-order-adapter",
        mount: request => createRendererMountResult({
          mounted: true,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const secondSurface = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "second-surface-platform-registry-order-adapter",
        mount: request => createRendererMountResult({
          mounted: true,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const secondMemory = createRendererPlatformAdapter({
      platform: "memory",
      adapter: createRendererAdapter({
        name: "second-memory-platform-registry-order-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const registry = createRendererPlatformAdapterRegistry([
      firstSurface,
      firstMemory,
      secondSurface,
      secondMemory,
    ]);

    const resolutions = Renderer.resolveRendererPlatformAdapterRegistryConflictsWithFirstCandidate(registry);

    expect(resolutions).toEqual([
      {
        conflict: {
          platform: "surface",
          platformAdapters: [firstSurface, secondSurface],
        },
        resolved: true,
        platformAdapter: firstSurface,
      },
      {
        conflict: {
          platform: "memory",
          platformAdapters: [firstMemory, secondMemory],
        },
        resolved: true,
        platformAdapter: firstMemory,
      },
    ]);
  });

  it("creates Renderer platform adapter selection requests", () => {
    const platformAdapter = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "platform-selection-request-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });

    const request = createRendererPlatformAdapterSelectionRequest({
      platform: "surface",
      candidates: [platformAdapter],
    });

    expect(request).toEqual({
      platform: "surface",
      candidates: [platformAdapter],
    });
  });

  it("keeps Renderer platform adapter selection requests independent from source arrays", () => {
    const first = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "first-platform-selection-request-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const second = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "second-platform-selection-request-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const candidates = [first];

    const request = createRendererPlatformAdapterSelectionRequest({
      platform: "surface",
      candidates,
    });
    candidates.push(second);

    expect(request.candidates).toEqual([first]);
    expect(request.candidates).not.toBe(candidates);
  });

  it("reviews Renderer platform adapter selection requests with empty candidates through the package root", () => {
    const request = Renderer.createRendererPlatformAdapterSelectionRequest({
      platform: "surface",
      candidates: [],
    });

    expect(request).toEqual({
      platform: "surface",
      candidates: [],
    });
  });

  it("creates selected Renderer platform adapter selection results", () => {
    const platformAdapter = createRendererPlatformAdapter({
      platform: "memory",
      adapter: createRendererAdapter({
        name: "selected-platform-selection-result-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });

    const result = createRendererPlatformAdapterSelectionResult({
      platform: "memory",
      platformAdapter,
    });

    expect(result).toEqual({
      platform: "memory",
      platformAdapter,
    });
  });

  it("creates unselected Renderer platform adapter selection results", () => {
    const result = createRendererPlatformAdapterSelectionResult({
      platform: "surface",
    });

    expect(result).toEqual({
      platform: "surface",
    });
  });

  it("creates Renderer platform adapter registries without lookup behavior", () => {
    const memory = createRendererPlatformAdapter({
      platform: "memory",
      adapter: createRendererAdapter({
        name: "memory-platform-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const surface = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "surface-platform-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });

    const registry = createRendererPlatformAdapterRegistry([memory, surface]);

    expect(registry).toEqual({
      platformAdapters: [memory, surface],
    });
  });

  it("keeps Renderer platform adapter registries independent from source arrays", () => {
    const memory = createRendererPlatformAdapter({
      platform: "memory",
      adapter: createRendererAdapter({
        name: "memory-registry-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const surface = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "surface-registry-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const platformAdapters = [memory];

    const registry = createRendererPlatformAdapterRegistry(platformAdapters);
    platformAdapters.push(surface);

    expect(registry.platformAdapters).toEqual([memory]);
    expect(registry.platformAdapters).not.toBe(platformAdapters);
  });

  it("creates empty Renderer platform adapter registries", () => {
    const registry = Renderer.createRendererPlatformAdapterRegistry([]);

    expect(registry).toEqual({
      platformAdapters: [],
    });
  });

  it("creates Renderer platform adapter lookup requests without performing lookup", () => {
    const request = createRendererPlatformAdapterLookupRequest({
      platform: "memory",
    });

    expect(request).toEqual({
      platform: "memory",
    });
  });

  it("creates Renderer platform adapter lookup results with matched platform adapters", () => {
    const platformAdapter = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "surface-lookup-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });

    const result = createRendererPlatformAdapterLookupResult({
      platform: platformAdapter.platform,
      platformAdapter,
    });

    expect(result).toEqual({
      platform: "surface",
      platformAdapter,
    });
  });

  it("creates Renderer platform adapter lookup results without matched platform adapters", () => {
    const result = Renderer.createRendererPlatformAdapterLookupResult({
      platform: "missing-platform",
    });

    expect(result).toEqual({
      platform: "missing-platform",
    });
    expect(result.platformAdapter).toBeUndefined();
  });

  it("creates Renderer platform adapter lookup contracts as immutable copies", () => {
    const request: RendererPlatformAdapterLookupRequest = {
      platform: "copy-platform",
    };
    const platformAdapter = createRendererPlatformAdapter({
      platform: "copy-platform",
      adapter: createRendererAdapter({
        name: "copy-platform-adapter",
        mount: mountRequest => createRendererMountResult({
          mounted: false,
          output: mountRequest.output,
          target: mountRequest.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const result: RendererPlatformAdapterLookupResult = {
      platform: "copy-platform",
      platformAdapter,
    };

    const createdRequest = Renderer.createRendererPlatformAdapterLookupRequest(request);
    const createdResult = Renderer.createRendererPlatformAdapterLookupResult(result);

    expect(createdRequest).toEqual(request);
    expect(createdRequest).not.toBe(request);
    expect(createdResult).toEqual(result);
    expect(createdResult).not.toBe(result);
  });

  it("finds Renderer platform adapters by platform from registries", () => {
    const memory = createRendererPlatformAdapter({
      platform: "memory",
      adapter: createRendererAdapter({
        name: "memory-search-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const surface = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "surface-search-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const registry = createRendererPlatformAdapterRegistry([memory, surface]);

    const result = findRendererPlatformAdapter(
      registry,
      createRendererPlatformAdapterLookupRequest({
        platform: "surface",
      }),
    );

    expect(result).toEqual({
      platform: "surface",
      platformAdapter: surface,
    });
  });

  it("reports missing Renderer platform adapters from registries", () => {
    const registry = createRendererPlatformAdapterRegistry([]);

    const result = Renderer.findRendererPlatformAdapter(
      registry,
      createRendererPlatformAdapterLookupRequest({
        platform: "missing-platform",
      }),
    );

    expect(result).toEqual({
      platform: "missing-platform",
    });
    expect(result.platformAdapter).toBeUndefined();
  });

  it("finds the first Renderer platform adapter for duplicate platforms", () => {
    const first = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "first-surface-platform-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const second = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "second-surface-platform-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const registry = createRendererPlatformAdapterRegistry([first, second]);

    const result = Renderer.findRendererPlatformAdapter(
      registry,
      createRendererPlatformAdapterLookupRequest({
        platform: "surface",
      }),
    );

    expect(result).toEqual({
      platform: "surface",
      platformAdapter: first,
    });
  });

  it("creates Renderer adapter registries without lookup behavior", () => {
    const memory = createRendererAdapter({
      name: "memory-preview",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });
    const surface = createRendererAdapter({
      name: "surface-dashboard",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });

    const registry = createRendererAdapterRegistry([memory, surface]);

    expect(registry.adapters).toEqual([memory, surface]);
  });

  it("keeps Renderer adapter registries independent from source arrays", () => {
    const memory = createRendererAdapter({
      name: "memory-preview",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });
    const surface = createRendererAdapter({
      name: "surface-dashboard",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });
    const adapters = [memory];

    const registry = createRendererAdapterRegistry(adapters);
    adapters.push(surface);

    expect(registry.adapters).toEqual([memory]);
  });

  it("creates empty Renderer adapter registries", () => {
    const registry = createRendererAdapterRegistry([]);

    expect(registry).toEqual({
      adapters: [],
    });
  });

  it("creates Renderer adapter lookup requests without performing lookup", () => {
    const request = createRendererAdapterLookupRequest({
      name: "memory-preview",
    });

    expect(request).toEqual({
      name: "memory-preview",
    });
  });

  it("creates Renderer adapter lookup results with matched adapters", () => {
    const adapter = createRendererAdapter({
      name: "memory-preview",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });

    const result = createRendererAdapterLookupResult({
      name: adapter.name,
      adapter,
    });

    expect(result).toEqual({
      name: "memory-preview",
      adapter,
    });
  });

  it("creates Renderer adapter lookup results without matched adapters", () => {
    const result = createRendererAdapterLookupResult({
      name: "missing-adapter",
    });

    expect(result).toEqual({
      name: "missing-adapter",
    });
  });

  it("creates Renderer adapter lookup requests as immutable copies of the source shape", () => {
    const request: RendererAdapterLookupRequest = {
      name: "memory-preview",
    };

    const created = createRendererAdapterLookupRequest(request);

    expect(created).toEqual(request);
    expect(created).not.toBe(request);
  });

  it("creates Renderer adapter lookup results as immutable copies of the source shape", () => {
    const adapter = createRendererAdapter({
      name: "memory-preview",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });
    const result: RendererAdapterLookupResult = {
      name: adapter.name,
      adapter,
    };

    const created = createRendererAdapterLookupResult(result);

    expect(created).toEqual(result);
    expect(created).not.toBe(result);
  });

  it("finds Renderer adapters by name from registries", () => {
    const memory = createRendererAdapter({
      name: "memory-preview",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });
    const surface = createRendererAdapter({
      name: "surface-dashboard",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });
    const registry = createRendererAdapterRegistry([memory, surface]);

    const result = findRendererAdapter(
      registry,
      createRendererAdapterLookupRequest({
        name: "surface-dashboard",
      }),
    );

    expect(result).toEqual({
      name: "surface-dashboard",
      adapter: surface,
    });
  });

  it("reports missing Renderer adapters from registries", () => {
    const registry = createRendererAdapterRegistry([]);

    const result = findRendererAdapter(
      registry,
      createRendererAdapterLookupRequest({
        name: "missing-adapter",
      }),
    );

    expect(result).toEqual({
      name: "missing-adapter",
    });
  });

  it("returns the first matching Renderer adapter from registries", () => {
    const first = createRendererAdapter({
      name: "duplicate-adapter",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });
    const second = createRendererAdapter({
      name: "duplicate-adapter",
      mount: request => createRendererMountResult({
        mounted: true,
        output: request.output,
        target: request.target,
      }),
    });
    const registry = createRendererAdapterRegistry([first, second]);

    const result = findRendererAdapter(
      registry,
      createRendererAdapterLookupRequest({
        name: "duplicate-adapter",
      }),
    );

    expect(result).toEqual({
      name: "duplicate-adapter",
      adapter: first,
    });
  });

  it("creates Renderer adapter conflicts for duplicate adapter names", () => {
    const first = createRendererAdapter({
      name: "duplicate-adapter",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });
    const second = createRendererAdapter({
      name: "duplicate-adapter",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });

    const conflict = createRendererAdapterConflict({
      name: "duplicate-adapter",
      adapters: [first, second],
    });

    expect(conflict).toEqual({
      name: "duplicate-adapter",
      adapters: [first, second],
    });
  });

  it("keeps Renderer adapter conflicts independent from source arrays", () => {
    const first = createRendererAdapter({
      name: "duplicate-adapter",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });
    const second = createRendererAdapter({
      name: "duplicate-adapter",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });
    const adapters = [first];

    const conflict = createRendererAdapterConflict({
      name: "duplicate-adapter",
      adapters,
    });
    adapters.push(second);

    expect(conflict.adapters).toEqual([first]);
  });

  it("creates Renderer adapter conflicts without adapters", () => {
    const conflict = createRendererAdapterConflict({
      name: "empty-conflict",
      adapters: [],
    });

    expect(conflict).toEqual({
      name: "empty-conflict",
      adapters: [],
    });
  });

  it("finds Renderer adapter conflicts by duplicate names", () => {
    const first = createRendererAdapter({
      name: "duplicate-adapter",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });
    const unique = createRendererAdapter({
      name: "unique-adapter",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });
    const second = createRendererAdapter({
      name: "duplicate-adapter",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });
    const registry = createRendererAdapterRegistry([first, unique, second]);

    const conflicts = findRendererAdapterConflicts(registry);

    expect(conflicts).toEqual([{
      name: "duplicate-adapter",
      adapters: [first, second],
    }]);
  });

  it("reports no Renderer adapter conflicts for unique names", () => {
    const first = createRendererAdapter({
      name: "first-adapter",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });
    const second = createRendererAdapter({
      name: "second-adapter",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });
    const registry = createRendererAdapterRegistry([first, second]);

    expect(findRendererAdapterConflicts(registry)).toEqual([]);
  });

  it("reports no Renderer adapter conflicts for empty registries", () => {
    const registry = createRendererAdapterRegistry([]);

    expect(findRendererAdapterConflicts(registry)).toEqual([]);
  });

  it("creates unresolved Renderer adapter conflict resolutions", () => {
    const first = createRendererAdapter({
      name: "duplicate-adapter",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });
    const second = createRendererAdapter({
      name: "duplicate-adapter",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });
    const conflict = createRendererAdapterConflict({
      name: "duplicate-adapter",
      adapters: [first, second],
    });

    const resolution = createRendererAdapterConflictResolution({
      conflict,
      resolved: false,
    });

    expect(resolution).toEqual({
      conflict,
      resolved: false,
    });
    expect(resolution.conflict).not.toBe(conflict);
  });

  it("creates Renderer adapter conflict resolutions with explicit adapters", () => {
    const first = createRendererAdapter({
      name: "duplicate-adapter",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });
    const second = createRendererAdapter({
      name: "duplicate-adapter",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });
    const conflict = createRendererAdapterConflict({
      name: "duplicate-adapter",
      adapters: [first, second],
    });

    const resolution = createRendererAdapterConflictResolution({
      conflict,
      resolved: true,
      adapter: second,
    });

    expect(resolution).toEqual({
      conflict,
      resolved: true,
      adapter: second,
    });
  });

  it("keeps Renderer adapter conflict resolutions independent from source arrays", () => {
    const first = createRendererAdapter({
      name: "duplicate-adapter",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });
    const second = createRendererAdapter({
      name: "duplicate-adapter",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });
    const adapters = [first];
    const conflict = createRendererAdapterConflict({
      name: "duplicate-adapter",
      adapters,
    });

    const resolution = createRendererAdapterConflictResolution({
      conflict,
      resolved: false,
    });
    adapters.push(second);

    expect(resolution.conflict.adapters).toEqual([first]);
  });

  it("resolves Renderer adapter conflicts with first-candidate selection", () => {
    const first = createRendererAdapter({
      name: "duplicate-adapter",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });
    const second = createRendererAdapter({
      name: "duplicate-adapter",
      mount: request => createRendererMountResult({
        mounted: true,
        output: request.output,
        target: request.target,
      }),
    });
    const conflict = createRendererAdapterConflict({
      name: "duplicate-adapter",
      adapters: [first, second],
    });

    const resolution = resolveRendererAdapterConflictWithFirstCandidate(conflict);

    expect(resolution).toEqual({
      conflict,
      resolved: true,
      adapter: first,
    });
    expect(resolution.conflict).not.toBe(conflict);
  });

  it("keeps Renderer adapter conflicts unresolved when first-candidate selection is empty", () => {
    const conflict = createRendererAdapterConflict({
      name: "empty-conflict",
      adapters: [],
    });

    const resolution = resolveRendererAdapterConflictWithFirstCandidate(conflict);

    expect(resolution).toEqual({
      conflict,
      resolved: false,
    });
  });

  it("keeps Renderer adapter conflict integration independent from source arrays", () => {
    const first = createRendererAdapter({
      name: "duplicate-adapter",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });
    const second = createRendererAdapter({
      name: "duplicate-adapter",
      mount: request => createRendererMountResult({
        mounted: true,
        output: request.output,
        target: request.target,
      }),
    });
    const adapters = [first];
    const conflict = createRendererAdapterConflict({
      name: "duplicate-adapter",
      adapters,
    });

    const resolution = resolveRendererAdapterConflictWithFirstCandidate(conflict);
    adapters.push(second);

    expect(resolution).toEqual({
      conflict,
      resolved: true,
      adapter: first,
    });
    expect(resolution.conflict.adapters).toEqual([first]);
  });

  it("resolves Renderer adapter registry conflicts with first-candidate selection", () => {
    const first = createRendererAdapter({
      name: "duplicate-adapter",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });
    const unique = createRendererAdapter({
      name: "unique-adapter",
      mount: request => createRendererMountResult({
        mounted: true,
        output: request.output,
        target: request.target,
      }),
    });
    const second = createRendererAdapter({
      name: "duplicate-adapter",
      mount: request => createRendererMountResult({
        mounted: true,
        output: request.output,
        target: request.target,
      }),
    });
    const registry = createRendererAdapterRegistry([first, unique, second]);

    const resolutions = resolveRendererAdapterRegistryConflictsWithFirstCandidate(registry);

    expect(resolutions).toEqual([{
      conflict: {
        name: "duplicate-adapter",
        adapters: [first, second],
      },
      resolved: true,
      adapter: first,
    }]);
  });

  it("reports no Renderer adapter registry conflict resolutions for unique registries", () => {
    const first = createRendererAdapter({
      name: "first-adapter",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });
    const second = createRendererAdapter({
      name: "second-adapter",
      mount: request => createRendererMountResult({
        mounted: true,
        output: request.output,
        target: request.target,
      }),
    });
    const registry = createRendererAdapterRegistry([first, second]);

    const resolutions = resolveRendererAdapterRegistryConflictsWithFirstCandidate(registry);

    expect(resolutions).toEqual([]);
  });

  it("preserves Renderer adapter registry conflict resolution order", () => {
    const firstMemory = createRendererAdapter({
      name: "memory-adapter",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });
    const firstSurface = createRendererAdapter({
      name: "surface-adapter",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });
    const secondMemory = createRendererAdapter({
      name: "memory-adapter",
      mount: request => createRendererMountResult({
        mounted: true,
        output: request.output,
        target: request.target,
      }),
    });
    const secondSurface = createRendererAdapter({
      name: "surface-adapter",
      mount: request => createRendererMountResult({
        mounted: true,
        output: request.output,
        target: request.target,
      }),
    });
    const registry = createRendererAdapterRegistry([
      firstMemory,
      firstSurface,
      secondMemory,
      secondSurface,
    ]);

    const resolutions = resolveRendererAdapterRegistryConflictsWithFirstCandidate(registry);

    expect(resolutions).toEqual([{
      conflict: {
        name: "memory-adapter",
        adapters: [firstMemory, secondMemory],
      },
      resolved: true,
      adapter: firstMemory,
    }, {
      conflict: {
        name: "surface-adapter",
        adapters: [firstSurface, secondSurface],
      },
      resolved: true,
      adapter: firstSurface,
    }]);
  });

  it("mounts resolved Renderer adapter conflict resolutions", async () => {
    const output = createRendererOutput({
      kind: "fragment",
      name: "resolved-output",
    });
    const target = createRendererTarget({
      kind: "memory",
      name: "resolved-target",
    });
    const request = createRendererMountRequest({
      output,
      target,
    });
    const adapter = createRendererAdapter({
      name: "resolved-adapter",
      mount: mountRequest => createRendererMountResult({
        mounted: true,
        output: mountRequest.output,
        target: mountRequest.target,
      }),
    });
    const conflict = createRendererAdapterConflict({
      name: "resolved-adapter",
      adapters: [adapter],
    });
    const resolution = createRendererAdapterConflictResolution({
      conflict,
      resolved: true,
      adapter,
    });

    await expect(mountResolvedRendererAdapter(resolution, request)).resolves.toEqual({
      mounted: true,
      output,
      target,
    });
  });

  it("does not mount unresolved Renderer adapter conflict resolutions", async () => {
    const output = createRendererOutput({
      kind: "fragment",
      name: "unresolved-output",
    });
    const target = createRendererTarget({
      kind: "memory",
      name: "unresolved-target",
    });
    const request = createRendererMountRequest({
      output,
      target,
    });
    const adapter = createRendererAdapter({
      name: "unresolved-adapter",
      mount: () => createRendererMountResult({
        mounted: true,
        output,
        target,
      }),
    });
    const conflict = createRendererAdapterConflict({
      name: "unresolved-adapter",
      adapters: [adapter],
    });
    const resolution = createRendererAdapterConflictResolution({
      conflict,
      resolved: false,
    });

    await expect(mountResolvedRendererAdapter(resolution, request)).resolves.toEqual({
      mounted: false,
      output,
      target,
    });
  });

  it("awaits asynchronous resolved Renderer adapter mounts", async () => {
    const output = createRendererOutput({
      kind: "fragment",
      name: "async-resolved-output",
    });
    const target = createRendererTarget({
      kind: "memory",
      name: "async-resolved-target",
    });
    const request = createRendererMountRequest({
      output,
      target,
    });
    const adapter = createRendererAdapter({
      name: "async-resolved-adapter",
      async mount(mountRequest) {
        await Promise.resolve();

        return createRendererMountResult({
          mounted: true,
          output: mountRequest.output,
          target: mountRequest.target,
        });
      },
    });
    const conflict = createRendererAdapterConflict({
      name: "async-resolved-adapter",
      adapters: [adapter],
    });
    const resolution = createRendererAdapterConflictResolution({
      conflict,
      resolved: true,
      adapter,
    });

    await expect(mountResolvedRendererAdapter(resolution, request)).resolves.toEqual({
      mounted: true,
      output,
      target,
    });
  });

  it("reports rejected resolved Renderer adapter mounts as unmounted results", async () => {
    const output = createRendererOutput({
      kind: "fragment",
      name: "failed-output",
    });
    const target = createRendererTarget({
      kind: "memory",
      name: "failed-target",
    });
    const request = createRendererMountRequest({
      output,
      target,
    });
    const adapter = createRendererAdapter({
      name: "failed-adapter",
      async mount() {
        await Promise.resolve();

        throw new Error("adapter mount failed");
      },
    });
    const conflict = createRendererAdapterConflict({
      name: "failed-adapter",
      adapters: [adapter],
    });
    const resolution = createRendererAdapterConflictResolution({
      conflict,
      resolved: true,
      adapter,
    });

    await expect(mountResolvedRendererAdapter(resolution, request)).resolves.toEqual({
      mounted: false,
      output,
      target,
      error: "adapter mount failed",
    });
  });

  it("reports non-Error resolved Renderer adapter mount rejections as strings", async () => {
    const output = createRendererOutput({
      kind: "fragment",
      name: "string-failed-output",
    });
    const target = createRendererTarget({
      kind: "memory",
      name: "string-failed-target",
    });
    const request = createRendererMountRequest({
      output,
      target,
    });
    const adapter = createRendererAdapter({
      name: "string-failed-adapter",
      async mount() {
        await Promise.resolve();

        throw "adapter mount failed as string";
      },
    });
    const conflict = createRendererAdapterConflict({
      name: "string-failed-adapter",
      adapters: [adapter],
    });
    const resolution = createRendererAdapterConflictResolution({
      conflict,
      resolved: true,
      adapter,
    });

    await expect(mountResolvedRendererAdapter(resolution, request)).resolves.toEqual({
      mounted: false,
      output,
      target,
      error: "adapter mount failed as string",
    });
  });

  it("creates diagnostics for failed Renderer mount results", () => {
    const output = createRendererOutput({
      kind: "fragment",
      name: "diagnostic-output",
    });
    const target = createRendererTarget({
      kind: "memory",
      name: "diagnostic-target",
    });
    const result = createRendererMountResult({
      mounted: false,
      output,
      target,
      error: "adapter mount failed",
    });

    expect(inspectRendererMountResult(result)).toEqual({
      context: {
        component: "renderer.mount",
      },
      result: {
        ok: false,
        issues: [{
          code: "renderer.mount.failed",
          message: "adapter mount failed",
          severity: "error",
        }],
      },
    });
  });

  it("creates diagnostics for successful Renderer mount results", () => {
    const output = createRendererOutput({
      kind: "fragment",
      name: "successful-diagnostic-output",
    });
    const target = createRendererTarget({
      kind: "memory",
      name: "successful-diagnostic-target",
    });
    const result = createRendererMountResult({
      mounted: true,
      output,
      target,
    });

    expect(inspectRendererMountResult(result)).toEqual({
      context: {
        component: "renderer.mount",
      },
      result: {
        ok: true,
        issues: [],
      },
    });
  });

  it("creates Renderer adapter selection requests", () => {
    const first = createRendererAdapter({
      name: "candidate-adapter",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });
    const second = createRendererAdapter({
      name: "candidate-adapter",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });

    const selection = createRendererAdapterSelectionRequest({
      name: "candidate-adapter",
      candidates: [first, second],
    });

    expect(selection).toEqual({
      name: "candidate-adapter",
      candidates: [first, second],
    });
  });

  it("keeps Renderer adapter selection requests independent from source arrays", () => {
    const first = createRendererAdapter({
      name: "candidate-adapter",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });
    const second = createRendererAdapter({
      name: "candidate-adapter",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });
    const candidates = [first];

    const selection = createRendererAdapterSelectionRequest({
      name: "candidate-adapter",
      candidates,
    });
    candidates.push(second);

    expect(selection.candidates).toEqual([first]);
  });

  it("creates Renderer adapter selection requests without candidates", () => {
    const selection = createRendererAdapterSelectionRequest({
      name: "empty-selection",
      candidates: [],
    });

    expect(selection).toEqual({
      name: "empty-selection",
      candidates: [],
    });
  });

  it("creates Renderer adapter selection results with selected adapters", () => {
    const adapter = createRendererAdapter({
      name: "selected-adapter",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });

    const result = createRendererAdapterSelectionResult({
      name: "selected-adapter",
      adapter,
    });

    expect(result).toEqual({
      name: "selected-adapter",
      adapter,
    });
  });

  it("creates Renderer adapter selection results without selected adapters", () => {
    const result = createRendererAdapterSelectionResult({
      name: "missing-selection",
    });

    expect(result).toEqual({
      name: "missing-selection",
    });
  });

  it("selects the first Renderer adapter candidate", () => {
    const first = createRendererAdapter({
      name: "candidate-adapter",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });
    const second = createRendererAdapter({
      name: "candidate-adapter",
      mount: request => createRendererMountResult({
        mounted: true,
        output: request.output,
        target: request.target,
      }),
    });

    const result = selectFirstRendererAdapterCandidate(
      createRendererAdapterSelectionRequest({
        name: "candidate-adapter",
        candidates: [first, second],
      }),
    );

    expect(result).toEqual({
      name: "candidate-adapter",
      adapter: first,
    });
  });

  it("preserves Renderer adapter candidate order during first-candidate selection", () => {
    const first = createRendererAdapter({
      name: "candidate-adapter",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });
    const second = createRendererAdapter({
      name: "candidate-adapter",
      mount: request => createRendererMountResult({
        mounted: true,
        output: request.output,
        target: request.target,
      }),
    });

    const result = selectFirstRendererAdapterCandidate(
      createRendererAdapterSelectionRequest({
        name: "candidate-adapter",
        candidates: [second, first],
      }),
    );

    expect(result).toEqual({
      name: "candidate-adapter",
      adapter: second,
    });
  });

  it("reports missing Renderer adapter selection when no candidates exist", () => {
    const result = selectFirstRendererAdapterCandidate(
      createRendererAdapterSelectionRequest({
        name: "missing-selection",
        candidates: [],
      }),
    );

    expect(result).toEqual({
      name: "missing-selection",
    });
  });

  it("selects the first Renderer platform adapter candidate", () => {
    const first = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "first-platform-policy-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const second = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "second-platform-policy-adapter",
        mount: request => createRendererMountResult({
          mounted: true,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });

    const result = selectFirstRendererPlatformAdapterCandidate(
      createRendererPlatformAdapterSelectionRequest({
        platform: "surface",
        candidates: [first, second],
      }),
    );

    expect(result).toEqual({
      platform: "surface",
      platformAdapter: first,
    });
  });

  it("preserves Renderer platform adapter candidate order during first-candidate selection", () => {
    const first = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "first-platform-order-policy-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const second = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "second-platform-order-policy-adapter",
        mount: request => createRendererMountResult({
          mounted: true,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });

    const result = Renderer.selectFirstRendererPlatformAdapterCandidate(
      createRendererPlatformAdapterSelectionRequest({
        platform: "surface",
        candidates: [second, first],
      }),
    );

    expect(result).toEqual({
      platform: "surface",
      platformAdapter: second,
    });
  });

  it("reports missing Renderer platform adapter selection when no candidates exist", () => {
    const result = selectFirstRendererPlatformAdapterCandidate(
      createRendererPlatformAdapterSelectionRequest({
        platform: "surface",
        candidates: [],
      }),
    );

    expect(result).toEqual({
      platform: "surface",
    });
  });

  it("creates a Renderer pipeline from ordered stages", async () => {
    const runtime = createCoreRuntimeHost({
      application: {
        name: "renderer-pipeline",
        version: {
          major: 0,
          minor: 2,
          patch: 0,
        },
      },
    });
    const context = createRendererHostContext(runtime);
    const stage: RendererPipelineStage = {
      name: "prepare-output",
      run: rendererContext => ({
        stage: rendererContext.runtime.application.name,
        completed: true,
      }),
    };

    const pipeline = createRendererPipeline([stage]);
    const result = await pipeline[0]?.run(context);

    expect(pipeline).toHaveLength(1);
    expect(pipeline[0]).toBe(stage);
    expect(result).toEqual({
      stage: "renderer-pipeline",
      completed: true,
    });
  });

  it("keeps Renderer pipeline stage order independent from source arrays", () => {
    const first: RendererPipelineStage = {
      name: "first",
      run: () => ({
        stage: "first",
        completed: true,
      }),
    };
    const second: RendererPipelineStage = {
      name: "second",
      run: () => ({
        stage: "second",
        completed: true,
      }),
    };
    const stages = [first];

    const pipeline = createRendererPipeline(stages);
    stages.push(second);

    expect(pipeline.map(stage => stage.name)).toEqual(["first"]);
  });

  it("executes Renderer pipeline stages sequentially", async () => {
    const runtime = createCoreRuntimeHost({
      application: {
        name: "renderer-execution",
        version: {
          major: 0,
          minor: 2,
          patch: 0,
        },
      },
    });
    const context = createRendererHostContext(runtime);
    const order: string[] = [];
    const first: RendererPipelineStage = {
      name: "first",
      async run() {
        order.push("first");

        return {
          stage: "first",
          completed: true,
        };
      },
    };
    const second: RendererPipelineStage = {
      name: "second",
      run() {
        order.push("second");

        return {
          stage: "second",
          completed: true,
        };
      },
    };

    const result = await executeRendererPipeline(
      context,
      createRendererPipeline([first, second]),
    );

    expect(order).toEqual(["first", "second"]);
    expect(result).toEqual({
      completed: true,
      stages: [{
        stage: "first",
        completed: true,
      }, {
        stage: "second",
        completed: true,
      }],
    });
  });

  it("reports incomplete Renderer pipeline execution", async () => {
    const runtime = createCoreRuntimeHost({
      application: {
        name: "renderer-incomplete-execution",
        version: {
          major: 0,
          minor: 2,
          patch: 0,
        },
      },
    });
    const context = createRendererHostContext(runtime);
    const pipeline = createRendererPipeline([{
      name: "blocked",
      run: () => ({
        stage: "blocked",
        completed: false,
      }),
    }]);

    const result = await executeRendererPipeline(context, pipeline);

    expect(result.completed).toBe(false);
    expect(result.stages).toEqual([{
      stage: "blocked",
      completed: false,
    }]);
  });

  it("reports empty Renderer pipeline execution as completed", async () => {
    const runtime = createCoreRuntimeHost({
      application: {
        name: "renderer-empty-execution",
        version: {
          major: 0,
          minor: 2,
          patch: 0,
        },
      },
    });
    const context = createRendererHostContext(runtime);

    const result = await executeRendererPipeline(
      context,
      createRendererPipeline([]),
    );

    expect(result).toEqual({
      completed: true,
      stages: [],
    });
  });

  it("awaits asynchronous Renderer pipeline stages before continuing", async () => {
    const runtime = createCoreRuntimeHost({
      application: {
        name: "renderer-async-execution",
        version: {
          major: 0,
          minor: 2,
          patch: 0,
        },
      },
    });
    const context = createRendererHostContext(runtime);
    const order: string[] = [];
    const pipeline = createRendererPipeline([{
      name: "async-first",
      async run() {
        await Promise.resolve();
        order.push("async-first");

        return {
          stage: "async-first",
          completed: true,
        };
      },
    }, {
      name: "sync-second",
      run() {
        order.push("sync-second");

        return {
          stage: "sync-second",
          completed: true,
        };
      },
    }]);

    const result = await executeRendererPipeline(context, pipeline);

    expect(order).toEqual(["async-first", "sync-second"]);
    expect(result.completed).toBe(true);
  });
});
