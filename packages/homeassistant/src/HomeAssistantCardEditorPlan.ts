import type { HomeAssistantCardLayout, HomeAssistantCardTarget } from "./HomeAssistantCardConfiguration";

export type HomeAssistantCardEditorMode = "simple" | "expert";

export interface HomeAssistantCardEditorSurfaceField {
  readonly id: string;
  readonly target: HomeAssistantCardTarget;
  readonly entityId: string;
  readonly column: number;
  readonly row: number;
  readonly width: number;
  readonly height: number;
}

export interface HomeAssistantCardEditorPackagePlanInput {
  readonly cardName?: string;
  readonly scriptFilename?: string;
  readonly editorMode?: HomeAssistantCardEditorMode;
  readonly defaultEntityIds?: readonly string[];
  readonly supportedLayouts?: readonly HomeAssistantCardLayout[];
  readonly supportedFieldTargets?: readonly HomeAssistantCardTarget[];
  readonly fields?: readonly HomeAssistantCardEditorSurfaceField[];
}

export interface HomeAssistantCardEditorPackagePlan {
  readonly cardName: string;
  readonly scriptFilename: string;
  readonly resourcePath: string;
  readonly editorMode: HomeAssistantCardEditorMode;
  readonly defaultEntityIds: readonly string[];
  readonly supportedLayouts: readonly HomeAssistantCardLayout[];
  readonly supportedFieldTargets: readonly HomeAssistantCardTarget[];
  readonly fields: readonly HomeAssistantCardEditorSurfaceField[];
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

const defaultSupportedFieldTargets = [
  "entities",
  "bubble",
  "mushroom-template",
] as const satisfies readonly HomeAssistantCardTarget[];

export function createHomeAssistantCardEditorPackagePlan(
  input: HomeAssistantCardEditorPackagePlanInput = {},
): HomeAssistantCardEditorPackagePlan {
  const cardName = input.cardName?.trim() || "ATLAS card";
  const scriptFilename = normalizeHomeAssistantCardEditorScriptFilename(input.scriptFilename ?? cardName);
  const defaultEntityIds = dedupeStrings(input.defaultEntityIds ?? defaultHomeAssistantCardEditorEntityIds);
  const supportedLayouts = dedupeLayouts(input.supportedLayouts ?? defaultSupportedCardEditorLayouts);
  const supportedFieldTargets = dedupeCardTargets(input.supportedFieldTargets ?? defaultSupportedFieldTargets);

  return {
    cardName,
    scriptFilename,
    resourcePath: `/hacsfiles/atlas/${scriptFilename}`,
    editorMode: input.editorMode ?? "simple",
    defaultEntityIds,
    supportedLayouts,
    supportedFieldTargets,
    fields: (input.fields ?? []).map(normalizeSurfaceField),
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

function dedupeCardTargets(values: readonly HomeAssistantCardTarget[]): HomeAssistantCardTarget[] {
  return [...new Set(values)];
}

function normalizeSurfaceField(field: HomeAssistantCardEditorSurfaceField): HomeAssistantCardEditorSurfaceField {
  return {
    id: field.id.trim() || `${field.target}-${field.entityId}`,
    target: field.target,
    entityId: field.entityId.trim(),
    column: Math.max(0, Math.floor(field.column)),
    row: Math.max(0, Math.floor(field.row)),
    width: Math.max(1, Math.floor(field.width)),
    height: Math.max(1, Math.floor(field.height)),
  };
}
