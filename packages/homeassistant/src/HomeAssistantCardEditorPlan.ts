import type {
  HomeAssistantCardConfiguration,
  HomeAssistantCardDependency,
  HomeAssistantCardLayout,
  HomeAssistantCardTarget,
} from "./HomeAssistantCardConfiguration";
import { createHomeAssistantCardConfiguration, inspectHomeAssistantCardDependency } from "./HomeAssistantCardConfiguration";

export type HomeAssistantCardEditorMode = "simple" | "expert";
export type HomeAssistantCardEditorSurfaceFieldLayout = "card" | "horizontal-stack" | "vertical-stack";
export type HomeAssistantCardEditorTemplateId =
  | "entity-list"
  | "state-button"
  | "switch-button"
  | "vertical-stack"
  | "horizontal-stack";

export interface HomeAssistantCardEditorGridBounds {
  readonly columns: number;
  readonly rows: number;
}

export interface HomeAssistantCardEditorTemplate {
  readonly id: HomeAssistantCardEditorTemplateId;
  readonly label: string;
  readonly layout: HomeAssistantCardEditorSurfaceFieldLayout;
  readonly target: HomeAssistantCardTarget;
  readonly defaultWidth: number;
  readonly defaultHeight: number;
  readonly defaultEntityDomain?: string;
  readonly preview: readonly string[];
}

export interface HomeAssistantCardEditorTemplatePlacementInput {
  readonly template: HomeAssistantCardEditorTemplate | HomeAssistantCardEditorTemplateId;
  readonly target?: HomeAssistantCardTarget;
  readonly entityId?: string;
  readonly id?: string;
  readonly column: number;
  readonly row: number;
  readonly width?: number;
  readonly height?: number;
  readonly bounds?: HomeAssistantCardEditorGridBounds;
}

export interface HomeAssistantCardEditorSurfaceFieldEntry {
  readonly id: string;
  readonly target: HomeAssistantCardTarget;
  readonly entityId: string;
}

export interface HomeAssistantCardEditorSurfaceField {
  readonly id: string;
  readonly target: HomeAssistantCardTarget;
  readonly entityId: string;
  readonly layout?: HomeAssistantCardEditorSurfaceFieldLayout;
  readonly entries?: readonly HomeAssistantCardEditorSurfaceFieldEntry[];
  readonly column: number;
  readonly row: number;
  readonly width: number;
  readonly height: number;
}

export interface HomeAssistantCardEditorPackagePlanInput {
  readonly cardName?: string;
  readonly scriptFilename?: string;
  readonly editorMode?: HomeAssistantCardEditorMode;
  readonly simpleTarget?: HomeAssistantCardTarget;
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
  readonly simpleTarget: HomeAssistantCardTarget;
  readonly defaultEntityIds: readonly string[];
  readonly supportedLayouts: readonly HomeAssistantCardLayout[];
  readonly supportedFieldTargets: readonly HomeAssistantCardTarget[];
  readonly fields: readonly HomeAssistantCardEditorSurfaceField[];
  readonly layoutMode: "drag-and-drop";
  readonly replacementHint: string;
}

export interface HomeAssistantCardEditorDependencyPlan {
  readonly editorPlan: HomeAssistantCardEditorPackagePlan;
  readonly usedTargets: readonly HomeAssistantCardTarget[];
  readonly dependencies: readonly HomeAssistantCardDependency[];
  readonly requiredResourcePaths: readonly string[];
  readonly installSteps: readonly string[];
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

const defaultGridBounds: HomeAssistantCardEditorGridBounds = {
  columns: 12,
  rows: 12,
};

const cardEditorTemplates: readonly HomeAssistantCardEditorTemplate[] = [
  {
    id: "entity-list",
    label: "Entity list",
    layout: "card",
    target: "entities",
    defaultWidth: 4,
    defaultHeight: 2,
    preview: ["Entity", "Value"],
  },
  {
    id: "state-button",
    label: "State button",
    layout: "card",
    target: "bubble",
    defaultWidth: 4,
    defaultHeight: 2,
    preview: ["Name", "State"],
  },
  {
    id: "switch-button",
    label: "Switch button",
    layout: "card",
    target: "bubble",
    defaultWidth: 4,
    defaultHeight: 2,
    defaultEntityDomain: "switch",
    preview: ["Switch", "On/off"],
  },
  {
    id: "vertical-stack",
    label: "Vertical stack",
    layout: "vertical-stack",
    target: "entities",
    defaultWidth: 4,
    defaultHeight: 2,
    preview: ["Card", "Card", "Card"],
  },
  {
    id: "horizontal-stack",
    label: "Horizontal stack",
    layout: "horizontal-stack",
    target: "entities",
    defaultWidth: 4,
    defaultHeight: 2,
    preview: ["Card | Card"],
  },
];

export function listHomeAssistantCardEditorTemplates(): readonly HomeAssistantCardEditorTemplate[] {
  return cardEditorTemplates;
}

export function findHomeAssistantCardEditorTemplate(
  templateId: HomeAssistantCardEditorTemplateId,
): HomeAssistantCardEditorTemplate | undefined {
  return cardEditorTemplates.find(template => template.id === templateId);
}

export function createHomeAssistantCardEditorFieldFromTemplate(
  input: HomeAssistantCardEditorTemplatePlacementInput,
): HomeAssistantCardEditorSurfaceField {
  const template = typeof input.template === "string"
    ? findHomeAssistantCardEditorTemplate(input.template)
    : input.template;
  if (!template) {
    throw new Error("Unknown Home Assistant card editor template.");
  }

  const target = input.target ?? template.target;
  return normalizeSurfaceField({
    id: input.id ?? template.label,
    target,
    entityId: input.entityId ?? "",
    layout: template.layout,
    entries: template.layout === "card" ? [] : [
      {
        id: `${input.id ?? template.label} item`,
        target,
        entityId: input.entityId ?? "",
      },
    ],
    ...clampSurfaceFieldPlacement({
      column: input.column,
      row: input.row,
      width: input.width ?? template.defaultWidth,
      height: input.height ?? template.defaultHeight,
    }, input.bounds ?? defaultGridBounds),
  });
}

export function createHomeAssistantCardEditorPackagePlan(
  input: HomeAssistantCardEditorPackagePlanInput = {},
): HomeAssistantCardEditorPackagePlan {
  const cardName = input.cardName?.trim() || "ATLAS card";
  const scriptFilename = normalizeHomeAssistantCardEditorScriptFilename(input.scriptFilename ?? cardName);
  const defaultEntityIds = dedupeStrings(input.defaultEntityIds ?? defaultHomeAssistantCardEditorEntityIds);
  const supportedLayouts = dedupeLayouts(input.supportedLayouts ?? defaultSupportedCardEditorLayouts);
  const supportedFieldTargets = dedupeCardTargets(input.supportedFieldTargets ?? defaultSupportedFieldTargets);
  const simpleTarget = input.simpleTarget ?? "entities";

  return {
    cardName,
    scriptFilename,
    resourcePath: `/hacsfiles/atlas/${scriptFilename}`,
    editorMode: input.editorMode ?? "simple",
    simpleTarget,
    defaultEntityIds,
    supportedLayouts,
    supportedFieldTargets,
    fields: (input.fields ?? []).map(normalizeSurfaceField),
    layoutMode: "drag-and-drop",
    replacementHint: "Replace the demo entities with your own Home Assistant entities.",
  };
}

export function createHomeAssistantCardEditorDependencyPlan(
  input: HomeAssistantCardEditorPackagePlanInput = {},
): HomeAssistantCardEditorDependencyPlan {
  const editorPlan = createHomeAssistantCardEditorPackagePlan(input);
  const usedTargets = dedupeCardTargets(editorPlan.editorMode === "expert"
    ? editorPlan.fields.flatMap(field => listSurfaceFieldTargets(field))
    : [editorPlan.simpleTarget]);
  const dependencies = usedTargets.map(inspectHomeAssistantCardDependency);

  return {
    editorPlan,
    usedTargets,
    dependencies,
    requiredResourcePaths: dedupeStrings(dependencies.flatMap(dependency => dependency.resourcePaths)),
    installSteps: dedupeStrings(dependencies.flatMap(dependency => dependency.installPaths)),
  };
}

export function createHomeAssistantCardEditorConfiguration(
  input: HomeAssistantCardEditorPackagePlanInput = {},
): HomeAssistantCardConfiguration {
  const editorPlan = createHomeAssistantCardEditorPackagePlan(input);

  if (editorPlan.editorMode === "simple") {
    return createHomeAssistantCardConfiguration({
      target: editorPlan.simpleTarget,
      title: editorPlan.cardName,
      entityIds: editorPlan.defaultEntityIds,
    });
  }

  const fieldCards = [...editorPlan.fields]
    .map(field => ({
      field,
      card: createSurfaceFieldCardConfiguration(field),
    }))
    .filter((fieldCard): fieldCard is { readonly field: HomeAssistantCardEditorSurfaceField; readonly card: HomeAssistantCardConfiguration } =>
      fieldCard.card !== undefined,
    )
    .sort((first, second) => compareSurfaceFields(first.field, second.field));

  if (fieldCards.length === 0) {
    return createHomeAssistantCardConfiguration({
      target: "entities",
      title: editorPlan.cardName,
      entityIds: editorPlan.defaultEntityIds,
    });
  }

  if (fieldCards.length === 1) {
    return fieldCards[0]!.card;
  }

  return createStackFromSurfaceRows(fieldCards);
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

export function clampSurfaceFieldPlacement(
  placement: Pick<HomeAssistantCardEditorSurfaceField, "column" | "row" | "width" | "height">,
  bounds: HomeAssistantCardEditorGridBounds = defaultGridBounds,
): Pick<HomeAssistantCardEditorSurfaceField, "column" | "row" | "width" | "height"> {
  const columns = Math.max(1, Math.floor(bounds.columns));
  const rows = Math.max(1, Math.floor(bounds.rows));
  const width = Math.min(columns, Math.max(1, Math.floor(placement.width)));
  const height = Math.min(rows, Math.max(1, Math.floor(placement.height)));
  const column = Math.min(columns - width, Math.max(0, Math.floor(placement.column)));
  const row = Math.min(rows - height, Math.max(0, Math.floor(placement.row)));

  return {
    column,
    row,
    width,
    height,
  };
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
    layout: field.layout ?? "card",
    entries: (field.entries ?? []).map(normalizeSurfaceFieldEntry),
    column: Math.max(0, Math.floor(field.column)),
    row: Math.max(0, Math.floor(field.row)),
    width: Math.max(1, Math.floor(field.width)),
    height: Math.max(1, Math.floor(field.height)),
  };
}

function normalizeSurfaceFieldEntry(
  entry: HomeAssistantCardEditorSurfaceFieldEntry,
): HomeAssistantCardEditorSurfaceFieldEntry {
  return {
    id: entry.id.trim() || `${entry.target}-${entry.entityId}`,
    target: entry.target,
    entityId: entry.entityId.trim(),
  };
}

function compareSurfaceFields(
  first: HomeAssistantCardEditorSurfaceField,
  second: HomeAssistantCardEditorSurfaceField,
): number {
  return first.row - second.row || first.column - second.column || first.id.localeCompare(second.id);
}

function listSurfaceFieldTargets(field: HomeAssistantCardEditorSurfaceField): HomeAssistantCardTarget[] {
  const entryTargets = (field.entries ?? []).map(entry => entry.target);
  return entryTargets.length > 0 ? entryTargets : [field.target];
}

function createSurfaceFieldCardConfiguration(
  field: HomeAssistantCardEditorSurfaceField,
): HomeAssistantCardConfiguration | undefined {
  const layout = field.layout ?? "card";
  const entries = (field.entries ?? []).filter(entry => entry.entityId);
  if (layout !== "card" && entries.length > 0) {
    return {
      type: layout,
      cards: entries.map(entry => createHomeAssistantCardConfiguration({
        target: entry.target,
        title: entry.id,
        entityIds: [entry.entityId],
      })),
    };
  }

  if (!field.entityId) return undefined;
  return createHomeAssistantCardConfiguration({
    target: field.target,
    title: field.id,
    entityIds: [field.entityId],
  });
}

function createStackFromSurfaceRows(
  fieldCards: readonly { readonly field: HomeAssistantCardEditorSurfaceField; readonly card: HomeAssistantCardConfiguration }[],
): HomeAssistantCardConfiguration {
  const rows = groupSurfaceFieldCardsByRow(fieldCards);
  const rowCards = rows.map(row => {
    if (row.length === 1) return row[0]!.card;
    return {
      type: "horizontal-stack",
      cards: row.map(item => item.card),
    } satisfies HomeAssistantCardConfiguration;
  });

  if (rowCards.length === 1) return rowCards[0]!;
  return {
    type: "vertical-stack",
    cards: rowCards,
  };
}

function groupSurfaceFieldCardsByRow(
  fieldCards: readonly { readonly field: HomeAssistantCardEditorSurfaceField; readonly card: HomeAssistantCardConfiguration }[],
): Array<Array<{ readonly field: HomeAssistantCardEditorSurfaceField; readonly card: HomeAssistantCardConfiguration }>> {
  const rows = new Map<number, Array<{ readonly field: HomeAssistantCardEditorSurfaceField; readonly card: HomeAssistantCardConfiguration }>>();
  for (const item of fieldCards) {
    const row = rows.get(item.field.row) ?? [];
    row.push(item);
    rows.set(item.field.row, row);
  }

  return [...rows.entries()]
    .sort(([first], [second]) => first - second)
    .map(([, row]) => row.sort((first, second) => first.field.column - second.field.column || first.field.id.localeCompare(second.field.id)));
}
