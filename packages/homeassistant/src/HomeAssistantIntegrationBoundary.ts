export type HomeAssistantIntegrationLayer = "runtime" | "renderer" | "theme";

export type HomeAssistantIntegrationStatus = "planned";

export type HomeAssistantPublicApiState = "closed";

export interface HomeAssistantIntegrationBoundary {
  readonly packageName: "@atlas/homeassistant";
  readonly integration: "home-assistant";
  readonly status: HomeAssistantIntegrationStatus;
  readonly requiredLayers: readonly HomeAssistantIntegrationLayer[];
  readonly publicApi: {
    readonly state: HomeAssistantPublicApiState;
    readonly reason: string;
  };
  readonly rendererBoundary: {
    readonly platformMetadataOnly: true;
    readonly concreteMountingEnabled: false;
  };
}

export function createHomeAssistantIntegrationBoundary(): HomeAssistantIntegrationBoundary {
  return {
    packageName: "@atlas/homeassistant",
    integration: "home-assistant",
    status: "planned",
    requiredLayers: ["runtime", "renderer", "theme"],
    publicApi: {
      state: "closed",
      reason: "Home Assistant activation waits for stable runtime, renderer and theme extension points.",
    },
    rendererBoundary: {
      platformMetadataOnly: true,
      concreteMountingEnabled: false,
    },
  };
}

export function isHomeAssistantPublicApiClosed(
  boundary: HomeAssistantIntegrationBoundary,
): boolean {
  return boundary.publicApi.state === "closed";
}
