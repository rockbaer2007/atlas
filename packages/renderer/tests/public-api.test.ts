import { describe, expect, it } from "vitest";

import { createCoreRuntimeHost, type CoreRuntimeHost } from "@atlas/core";

import type {
  RendererHostContext,
  RendererPipeline,
  RendererPipelineStage,
  RendererPipelineStageResult,
} from "../src";
import * as Renderer from "../src";
import {
  createRendererHostContext,
  createRendererPipeline,
} from "../src";

describe("renderer public API", () => {
  it("exports the Renderer package value surface from the package root", () => {
    expect(Renderer.createRendererHostContext).toBeTypeOf("function");
    expect(Renderer.createRendererPipeline).toBeTypeOf("function");
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

    expect(context.runtime.application.name).toBe("renderer-type-api");
    expect(pipeline[0]?.name).toBe("prepare");
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
});
