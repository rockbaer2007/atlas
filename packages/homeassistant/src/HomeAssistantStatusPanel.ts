import {
  createThemeRendererStatusOutput,
  executeThemedRendererDomSurfaceScenario,
  type ThemeRendererStatus,
  type ThemeRendererSurfaceElement,
  type ThemeTokens,
} from "@atlas/theme";

export type HomeAssistantStatusPanel = Readonly<{
  id: string;
  title: string;
  targetIdentifier: string;
}>;

export type HomeAssistantStatusPanelScenario = Readonly<{
  panel: HomeAssistantStatusPanel;
  status: ThemeRendererStatus;
  element: ThemeRendererSurfaceElement;
  tokens: ThemeTokens;
}>;

export function createHomeAssistantStatusPanel(
  panel: HomeAssistantStatusPanel,
): HomeAssistantStatusPanel {
  return { ...panel };
}

export async function renderHomeAssistantStatusPanel(
  scenario: HomeAssistantStatusPanelScenario,
): ReturnType<typeof executeThemedRendererDomSurfaceScenario> {
  return executeThemedRendererDomSurfaceScenario({
    output: createThemeRendererStatusOutput(scenario.status),
    target: {
      kind: "surface",
      name: scenario.panel.id,
      identifier: scenario.panel.targetIdentifier,
    },
    element: scenario.element,
    tokens: scenario.tokens,
  });
}
