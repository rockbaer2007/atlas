import { describe, expect, it } from "vitest";

import { createCoreRuntimeHost, type CoreRuntimeHost } from "@atlas/core";

import type {
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
  createRendererMountRequest,
  createRendererMountResult,
  createRendererOutput,
  createRendererHostContext,
  createRendererPipeline,
  createRendererTarget,
  executeRendererPipeline,
} from "../src";

describe("renderer public API", () => {
  it("exports the Renderer package value surface from the package root", () => {
    expect(Renderer.createRendererHostContext).toBeTypeOf("function");
    expect(Renderer.createRendererMountRequest).toBeTypeOf("function");
    expect(Renderer.createRendererMountResult).toBeTypeOf("function");
    expect(Renderer.createRendererOutput).toBeTypeOf("function");
    expect(Renderer.createRendererPipeline).toBeTypeOf("function");
    expect(Renderer.createRendererTarget).toBeTypeOf("function");
    expect(Renderer.executeRendererPipeline).toBeTypeOf("function");
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

    expect(context.runtime.application.name).toBe("renderer-type-api");
    expect(output.kind).toBe("fragment");
    expect(target.kind).toBe("memory");
    expect(mountRequest.output.name).toBe("type-output");
    expect(mountResult.mounted).toBe(false);
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
