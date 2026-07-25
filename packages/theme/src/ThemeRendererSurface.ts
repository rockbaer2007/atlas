import {
  createRendererDomSurfaceMountAdapterRegistry,
  createRendererOutput,
  executeRendererTargetMountWithReport,
  type RendererOutput,
  type RendererTarget,
  type RendererUnifiedMountExecution,
} from "@atlas/renderer";

import { applyThemeTokens, type ThemeStyleTarget, type ThemeTokens } from "./ThemeTokens";

export type ThemeRendererStatus = "ready" | "blocked" | "pending";

export type ThemeRendererSurfaceElement = ThemeStyleTarget & Readonly<{
  innerHTML: string;
}>;

export type ThemedRendererDomSurfaceScenario = Readonly<{
  output: RendererOutput;
  target: RendererTarget;
  element: ThemeRendererSurfaceElement;
  tokens: ThemeTokens;
}>;

export function createThemeRendererStatusOutput(
  status: ThemeRendererStatus,
): RendererOutput {
  const label = status === "ready"
    ? "Ready"
    : status === "blocked"
      ? "Blocked"
      : "Pending";

  return createRendererOutput({
    kind: "fragment",
    name: `atlas-status-${status}`,
    content:
      `<section class="atlas-status" data-status="${status}">`
      + `<strong>ATLAS</strong><span>${label}</span></section>`,
  });
}

export async function executeThemedRendererDomSurfaceScenario(
  scenario: ThemedRendererDomSurfaceScenario,
): Promise<RendererUnifiedMountExecution> {
  const identifier = scenario.target.identifier ?? "";
  const routing = createRendererDomSurfaceMountAdapterRegistry([{
    identifier,
    element: scenario.element,
  }]);
  const execution = await executeRendererTargetMountWithReport({
    output: scenario.output,
    target: scenario.target,
    registry: routing.registry,
  });

  if (execution.result.mounted) {
    applyThemeTokens(scenario.element, scenario.tokens);
  }

  return execution;
}
