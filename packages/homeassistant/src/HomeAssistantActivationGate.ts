import type {
  HomeAssistantIntegrationBoundary,
  HomeAssistantIntegrationLayer,
} from "./HomeAssistantIntegrationBoundary";
import { isHomeAssistantPublicApiClosed } from "./HomeAssistantIntegrationBoundary";

export interface HomeAssistantActivationGate {
  readonly active: false;
  readonly missingLayers: readonly HomeAssistantIntegrationLayer[];
  readonly publicApiClosed: boolean;
  readonly reason: string;
}

export function inspectHomeAssistantActivationGate(
  boundary: HomeAssistantIntegrationBoundary,
): HomeAssistantActivationGate {
  return {
    active: false,
    missingLayers: [...boundary.requiredLayers],
    publicApiClosed: isHomeAssistantPublicApiClosed(boundary),
    reason: boundary.publicApi.reason,
  };
}
