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
  RendererMountRequest,
  RendererMountResult,
  RendererOutput,
  RendererOutputKind,
  RendererPipeline,
  RendererPipelineExecutionResult,
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
  createRendererTarget,
  executeRendererPipeline,
  findRendererAdapter,
  findRendererAdapterConflicts,
  selectFirstRendererAdapterCandidate,
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
    expect(Renderer.createRendererTarget).toBeTypeOf("function");
    expect(Renderer.executeRendererPipeline).toBeTypeOf("function");
    expect(Renderer.findRendererAdapter).toBeTypeOf("function");
    expect(Renderer.findRendererAdapterConflicts).toBeTypeOf("function");
    expect(Renderer.selectFirstRendererAdapterCandidate).toBeTypeOf("function");
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
    const adapterResult: RendererAdapterMountResult = mountResult;
    const adapter: RendererAdapter = {
      name: "type-adapter",
      mount: () => adapterResult,
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
    expect(context.runtime.application.name).toBe("renderer-type-api");
    expect(output.kind).toBe("fragment");
    expect(target.kind).toBe("memory");
    expect(mountRequest.output.name).toBe("type-output");
    expect(mountResult.mounted).toBe(false);
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
