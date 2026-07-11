import type { RendererHostContext } from "./RendererHostContext";

export type RendererPipelineStageResult = Readonly<{
  stage: string;
  completed: boolean;
}>;

export type RendererPipelineStage = Readonly<{
  name: string;
  run(
    context: RendererHostContext,
  ): RendererPipelineStageResult | Promise<RendererPipelineStageResult>;
}>;

export type RendererPipeline = readonly RendererPipelineStage[];

export function createRendererPipeline(
  stages: readonly RendererPipelineStage[],
): RendererPipeline {
  return [...stages];
}
