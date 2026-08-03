export type HomeAssistantCardArtifactKind =
  | "atlas-card-package"
  | "home-assistant-card"
  | "external-card-builder-artifact"
  | "unknown";

export interface HomeAssistantCardArtifactInspection {
  readonly kind: HomeAssistantCardArtifactKind;
  readonly format: "json" | "yaml" | "unknown";
  readonly importable: boolean;
  readonly requiresReview: boolean;
  readonly reason: string;
}

export type HomeAssistantCardArtifactImportAction =
  | "import"
  | "review"
  | "reject";

export interface HomeAssistantCardArtifactImportDecision {
  readonly action: HomeAssistantCardArtifactImportAction;
  readonly inspection: HomeAssistantCardArtifactInspection;
  readonly message: string;
}

export function inspectHomeAssistantCardArtifact(text: string): HomeAssistantCardArtifactInspection {
  const trimmed = text.trim();
  if (!trimmed) {
    return {
      kind: "unknown",
      format: "unknown",
      importable: false,
      requiresReview: true,
      reason: "The artifact is empty.",
    };
  }

  const json = parseJsonRecord(trimmed);
  if (json) {
    return inspectJsonCardArtifact(json);
  }

  if (looksLikeHomeAssistantCardYaml(trimmed)) {
    return {
      kind: "home-assistant-card",
      format: "yaml",
      importable: true,
      requiresReview: false,
      reason: "The artifact looks like a supported Home Assistant card YAML snippet.",
    };
  }

  return {
    kind: "unknown",
    format: "unknown",
    importable: false,
    requiresReview: true,
    reason: "The artifact does not match a supported ATLAS, Home Assistant or known external card-builder shape.",
  };
}

export function decideHomeAssistantCardArtifactImport(
  text: string,
): HomeAssistantCardArtifactImportDecision {
  const inspection = inspectHomeAssistantCardArtifact(text);

  if (inspection.importable && !inspection.requiresReview) {
    return {
      action: "import",
      inspection,
      message: "Import can continue with the supported ATLAS or Home Assistant card artifact.",
    };
  }

  if (inspection.kind === "external-card-builder-artifact") {
    return {
      action: "review",
      inspection,
      message: "Show a compatibility review before importing this external card-builder artifact.",
    };
  }

  return {
    action: "reject",
    inspection,
    message: "Reject this artifact because ATLAS cannot identify a safe import path.",
  };
}

function inspectJsonCardArtifact(json: Record<string, unknown>): HomeAssistantCardArtifactInspection {
  if (json.version === 1 && json.kind === "atlas.homeassistant.card" && typeof json.content === "string") {
    return {
      kind: "atlas-card-package",
      format: "json",
      importable: true,
      requiresReview: false,
      reason: "The artifact is an ATLAS Home Assistant card package.",
    };
  }

  if (isHomeAssistantCardRecord(json)) {
    return {
      kind: "home-assistant-card",
      format: "json",
      importable: true,
      requiresReview: false,
      reason: "The artifact is a supported raw Home Assistant card JSON object.",
    };
  }

  if (looksLikeExternalCardBuilderArtifact(json)) {
    return {
      kind: "external-card-builder-artifact",
      format: "json",
      importable: false,
      requiresReview: true,
      reason: "The artifact resembles an external card-builder export and needs explicit compatibility mapping before import.",
    };
  }

  return {
    kind: "unknown",
    format: "json",
    importable: false,
    requiresReview: true,
    reason: "The JSON artifact is not a supported ATLAS package or Home Assistant card.",
  };
}

function parseJsonRecord(text: string): Record<string, unknown> | undefined {
  try {
    const parsed: unknown = JSON.parse(text);
    return isRecord(parsed) ? parsed : undefined;
  } catch {
    return undefined;
  }
}

function looksLikeHomeAssistantCardYaml(text: string): boolean {
  return /^type:\s*(entities|horizontal-stack|vertical-stack|custom:mushroom-template-card|custom:bubble-card)\b/m.test(text);
}

function isHomeAssistantCardRecord(value: Record<string, unknown>): boolean {
  return value.type === "entities"
    || value.type === "horizontal-stack"
    || value.type === "vertical-stack"
    || value.type === "custom:mushroom-template-card"
    || value.type === "custom:bubble-card";
}

function looksLikeExternalCardBuilderArtifact(value: Record<string, unknown>): boolean {
  const candidateText = JSON.stringify(value).toLowerCase();
  return candidateText.includes("card-builder")
    || candidateText.includes("card_builder")
    || candidateText.includes("blocks")
    || candidateText.includes("entityslots")
    || candidateText.includes("entity_slots")
    || candidateText.includes("stylebindings")
    || candidateText.includes("style_bindings");
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
