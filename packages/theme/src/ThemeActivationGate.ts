import type {
  ThemeActivationBoundary,
  ThemeActivationLayer,
} from "./ThemeActivationBoundary";
import { isThemePublicApiClosed } from "./ThemeActivationBoundary";

export interface ThemeActivationGate {
  readonly active: false;
  readonly missingLayers: readonly ThemeActivationLayer[];
  readonly publicApiClosed: boolean;
  readonly reason: string;
}

export function inspectThemeActivationGate(
  boundary: ThemeActivationBoundary,
): ThemeActivationGate {
  return {
    active: false,
    missingLayers: [...boundary.requiredLayers],
    publicApiClosed: isThemePublicApiClosed(boundary),
    reason: boundary.publicApi.reason,
  };
}
