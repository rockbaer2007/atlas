export type ThemeActivationLayer = "core" | "renderer";

export type ThemeActivationStatus = "planned";

export type ThemePublicApiState = "closed";

export interface ThemeActivationBoundary {
  readonly packageName: "@atlas/theme";
  readonly domain: "theme";
  readonly status: ThemeActivationStatus;
  readonly requiredLayers: readonly ThemeActivationLayer[];
  readonly publicApi: {
    readonly state: ThemePublicApiState;
    readonly reason: string;
  };
  readonly rendererBoundary: {
    readonly tokensOnly: true;
    readonly styleInjectionEnabled: false;
  };
}

export function createThemeActivationBoundary(): ThemeActivationBoundary {
  return {
    packageName: "@atlas/theme",
    domain: "theme",
    status: "planned",
    requiredLayers: ["core", "renderer"],
    publicApi: {
      state: "closed",
      reason: "Theme activation waits for stable Core and Renderer extension points.",
    },
    rendererBoundary: {
      tokensOnly: true,
      styleInjectionEnabled: false,
    },
  };
}

export function isThemePublicApiClosed(boundary: ThemeActivationBoundary): boolean {
  return boundary.publicApi.state === "closed";
}
