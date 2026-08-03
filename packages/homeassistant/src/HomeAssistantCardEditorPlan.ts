import type { HomeAssistantCardLayout } from "./HomeAssistantCardConfiguration";

export interface HomeAssistantCardEditorPackagePlanInput {
  readonly cardName?: string;
  readonly scriptFilename?: string;
  readonly defaultEntityIds?: readonly string[];
  readonly supportedLayouts?: readonly HomeAssistantCardLayout[];
}

export interface HomeAssistantCardEditorPackagePlan {
  readonly cardName: string;
  readonly scriptFilename: string;
  readonly resourcePath: string;
  readonly defaultEntityIds: readonly string[];
  readonly supportedLayouts: readonly HomeAssistantCardLayout[];
  readonly layoutMode: "drag-and-drop";
  readonly replacementHint: string;
}

export const defaultHomeAssistantCardEditorEntityIds = [
  "binary_sensor.atlas_status",
  "sensor.atlas_temperature",
] as const;

const defaultSupportedCardEditorLayouts = [
  "single",
  "horizontal-stack",
  "vertical-stack",
] as const satisfies readonly HomeAssistantCardLayout[];

export function createHomeAssistantCardEditorPackagePlan(
  input: HomeAssistantCardEditorPackagePlanInput = {},
): HomeAssistantCardEditorPackagePlan {
  const cardName = input.cardName?.trim() || "ATLAS card";
  const scriptFilename = normalizeHomeAssistantCardEditorScriptFilename(input.scriptFilename ?? cardName);
  const defaultEntityIds = dedupeStrings(input.defaultEntityIds ?? defaultHomeAssistantCardEditorEntityIds);
  const supportedLayouts = dedupeLayouts(input.supportedLayouts ?? defaultSupportedCardEditorLayouts);

  return {
    cardName,
    scriptFilename,
    resourcePath: `/hacsfiles/atlas/${scriptFilename}`,
    defaultEntityIds,
    supportedLayouts,
    layoutMode: "drag-and-drop",
    replacementHint: "Replace the demo entities with your own Home Assistant entities.",
  };
}

export function normalizeHomeAssistantCardEditorScriptFilename(name: string): string {
  const withoutExtension = name
    .trim()
    .toLowerCase()
    .replace(/\.js$/i, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `${withoutExtension || "atlas-card"}.js`;
}

function dedupeStrings(values: readonly string[]): string[] {
  return [...new Set(values.map(value => value.trim()).filter(Boolean))];
}

function dedupeLayouts(values: readonly HomeAssistantCardLayout[]): HomeAssistantCardLayout[] {
  return [...new Set(values)];
}
