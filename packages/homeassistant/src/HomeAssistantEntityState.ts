import type { ThemeRendererStatus } from "@atlas/theme";

export type HomeAssistantEntityStateValue = "on" | "off" | "unavailable" | "unknown";

export type HomeAssistantEntityState = Readonly<{
  entityId: string;
  state: HomeAssistantEntityStateValue;
}>;

export function createHomeAssistantEntityState(
  entity: HomeAssistantEntityState,
): HomeAssistantEntityState {
  return { ...entity };
}

export function mapHomeAssistantEntityStateToStatus(
  entity: HomeAssistantEntityState,
): ThemeRendererStatus {
  if (entity.state === "on") {
    return "ready";
  }

  if (entity.state === "off") {
    return "pending";
  }

  return "blocked";
}
