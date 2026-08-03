import type {
  HomeAssistantBubbleButtonType,
  HomeAssistantCardConfiguration,
  HomeAssistantCardDependency,
  HomeAssistantCardLayout,
  HomeAssistantCardTarget,
} from "./HomeAssistantCardConfiguration";
import { createHomeAssistantCardConfiguration, inspectHomeAssistantCardDependency } from "./HomeAssistantCardConfiguration";

export type HomeAssistantCardEditorMode = "simple" | "expert";
export type HomeAssistantCardEditorSurfaceFieldLayout = "card" | "grid" | "horizontal-stack" | "vertical-stack";
export type HomeAssistantCardEditorTemplateId =
  | "entity-list"
  | "entity-card"
  | "state-button"
  | "switch-button"
  | "button-card"
  | "grid"
  | "sensor-card"
  | "thermostat-card"
  | "link-card"
  | "webpage-card"
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
  readonly bubbleButtonType?: HomeAssistantBubbleButtonType;
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
  readonly bubbleButtonType?: HomeAssistantBubbleButtonType;
  readonly entityId: string;
}

export interface HomeAssistantCardEditorSurfaceField {
  readonly id: string;
  readonly target: HomeAssistantCardTarget;
  readonly bubbleButtonType?: HomeAssistantBubbleButtonType;
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

export interface HomeAssistantCardEditorSurfaceOverlap {
  readonly firstFieldId: string;
  readonly secondFieldId: string;
}

export interface HomeAssistantCardEditorSurfaceAnalysis {
  readonly fieldCount: number;
  readonly populatedFieldCount: number;
  readonly emptyFieldCount: number;
  readonly overlapCount: number;
  readonly rowCount: number;
  readonly usedColumns: number;
  readonly usedRows: number;
  readonly usedTargets: readonly HomeAssistantCardTarget[];
  readonly layouts: readonly HomeAssistantCardEditorSurfaceFieldLayout[];
  readonly emptyFieldIds: readonly string[];
  readonly overlappingFieldIds: readonly string[];
  readonly overlaps: readonly HomeAssistantCardEditorSurfaceOverlap[];
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
  "entity",
  "button",
  "sensor",
  "thermostat",
  "link",
  "webpage",
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
    id: "entity-card",
    label: "Entity",
    layout: "card",
    target: "entity",
    defaultWidth: 4,
    defaultHeight: 2,
    preview: ["State", "Attributes"],
  },
  {
    id: "button-card",
    label: "Button",
    layout: "card",
    target: "button",
    defaultWidth: 4,
    defaultHeight: 2,
    preview: ["Icon", "Tap action"],
  },
  {
    id: "grid",
    label: "Grid",
    layout: "grid",
    target: "entities",
    defaultWidth: 6,
    defaultHeight: 3,
    preview: ["Card", "Card", "Card"],
  },
  {
    id: "sensor-card",
    label: "Sensor",
    layout: "card",
    target: "sensor",
    defaultWidth: 4,
    defaultHeight: 2,
    defaultEntityDomain: "sensor",
    preview: ["Graph", "State"],
  },
  {
    id: "thermostat-card",
    label: "Thermostat",
    layout: "card",
    target: "thermostat",
    defaultWidth: 4,
    defaultHeight: 3,
    defaultEntityDomain: "climate",
    preview: ["Setpoint", "Mode"],
  },
  {
    id: "link-card",
    label: "Link",
    layout: "card",
    target: "link",
    defaultWidth: 4,
    defaultHeight: 2,
    preview: ["Navigation", "Tap"],
  },
  {
    id: "webpage-card",
    label: "Webpage",
    layout: "card",
    target: "webpage",
    defaultWidth: 8,
    defaultHeight: 4,
    preview: ["iframe", "URL"],
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
  const bubbleButtonType = target === "bubble" ? input.bubbleButtonType ?? "state" : undefined;
  return normalizeSurfaceField({
    id: input.id ?? template.label,
    target,
    ...(bubbleButtonType ? { bubbleButtonType } : {}),
    entityId: input.entityId ?? "",
    layout: template.layout,
    entries: template.layout === "card" ? [] : [
      {
        id: `${input.id ?? template.label} item`,
        target,
        ...(bubbleButtonType ? { bubbleButtonType } : {}),
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

export function analyzeHomeAssistantCardEditorSurface(
  fields: readonly HomeAssistantCardEditorSurfaceField[] = [],
): HomeAssistantCardEditorSurfaceAnalysis {
  const normalizedFields = fields.map(normalizeSurfaceField);
  const populatedFields = normalizedFields.filter(hasSurfaceFieldContent);
  const emptyFields = normalizedFields.filter(field => !hasSurfaceFieldContent(field));
  const overlaps = listSurfaceFieldOverlaps(normalizedFields);
  const rightEdge = normalizedFields.map(field => field.column + field.width);
  const bottomEdge = normalizedFields.map(field => field.row + field.height);

  return {
    fieldCount: normalizedFields.length,
    populatedFieldCount: populatedFields.length,
    emptyFieldCount: emptyFields.length,
    overlapCount: overlaps.length,
    rowCount: new Set(normalizedFields.map(field => field.row)).size,
    usedColumns: rightEdge.length ? Math.max(...rightEdge) : 0,
    usedRows: bottomEdge.length ? Math.max(...bottomEdge) : 0,
    usedTargets: dedupeCardTargets(normalizedFields.flatMap(listSurfaceFieldTargets)),
    layouts: dedupeSurfaceFieldLayouts(normalizedFields.map(field => field.layout ?? "card")),
    emptyFieldIds: emptyFields.map(field => field.id),
    overlappingFieldIds: dedupeStrings(overlaps.flatMap(overlap => [overlap.firstFieldId, overlap.secondFieldId])),
    overlaps,
  };
}

export function arrangeHomeAssistantCardEditorSurfaceFields(
  fields: readonly HomeAssistantCardEditorSurfaceField[] = [],
  bounds: HomeAssistantCardEditorGridBounds = defaultGridBounds,
): HomeAssistantCardEditorSurfaceField[] {
  const placedFields: HomeAssistantCardEditorSurfaceField[] = [];
  const sortedFields = fields.map(normalizeSurfaceField).sort(compareSurfaceFields);
  for (const field of sortedFields) {
    const placement = findFirstAvailableSurfacePlacement(field, placedFields, bounds)
      ?? clampSurfaceFieldPlacement(field, bounds);
    placedFields.push({
      ...field,
      ...placement,
    });
  }
  return placedFields;
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

function dedupeSurfaceFieldLayouts(
  values: readonly HomeAssistantCardEditorSurfaceFieldLayout[],
): HomeAssistantCardEditorSurfaceFieldLayout[] {
  return [...new Set(values)];
}

function normalizeSurfaceField(field: HomeAssistantCardEditorSurfaceField): HomeAssistantCardEditorSurfaceField {
  return {
    id: field.id.trim() || `${field.target}-${field.entityId}`,
    target: field.target,
    ...(field.target === "bubble" ? { bubbleButtonType: normalizeBubbleButtonType(field.bubbleButtonType) } : {}),
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
    ...(entry.target === "bubble" ? { bubbleButtonType: normalizeBubbleButtonType(entry.bubbleButtonType) } : {}),
    entityId: entry.entityId.trim(),
  };
}

function normalizeBubbleButtonType(value: HomeAssistantBubbleButtonType | undefined): HomeAssistantBubbleButtonType {
  return value === "name" || value === "slider" || value === "switch" ? value : "state";
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

function hasSurfaceFieldContent(field: HomeAssistantCardEditorSurfaceField): boolean {
  if (field.entityId) return true;
  if (field.target === "link" || field.target === "webpage") return true;
  return (field.entries ?? []).some(entry => Boolean(entry.entityId));
}

function listSurfaceFieldOverlaps(
  fields: readonly HomeAssistantCardEditorSurfaceField[],
): HomeAssistantCardEditorSurfaceOverlap[] {
  const overlaps: HomeAssistantCardEditorSurfaceOverlap[] = [];
  for (let firstIndex = 0; firstIndex < fields.length; firstIndex += 1) {
    for (let secondIndex = firstIndex + 1; secondIndex < fields.length; secondIndex += 1) {
      const first = fields[firstIndex]!;
      const second = fields[secondIndex]!;
      if (surfaceFieldsOverlap(first, second)) {
        overlaps.push({
          firstFieldId: first.id,
          secondFieldId: second.id,
        });
      }
    }
  }
  return overlaps;
}

function findFirstAvailableSurfacePlacement(
  field: HomeAssistantCardEditorSurfaceField,
  placedFields: readonly HomeAssistantCardEditorSurfaceField[],
  bounds: HomeAssistantCardEditorGridBounds,
): Pick<HomeAssistantCardEditorSurfaceField, "column" | "row" | "width" | "height"> | undefined {
  const clamped = clampSurfaceFieldPlacement(field, bounds);
  const maxColumn = Math.max(0, Math.floor(bounds.columns) - clamped.width);
  const maxRow = Math.max(0, Math.floor(bounds.rows) - clamped.height);
  for (let row = 0; row <= maxRow; row += 1) {
    for (let column = 0; column <= maxColumn; column += 1) {
      const candidate = {
        ...field,
        ...clamped,
        column,
        row,
      };
      if (!placedFields.some(placedField => surfaceFieldsOverlap(candidate, placedField))) {
        return {
          column,
          row,
          width: clamped.width,
          height: clamped.height,
        };
      }
    }
  }
  return undefined;
}

function surfaceFieldsOverlap(
  first: HomeAssistantCardEditorSurfaceField,
  second: HomeAssistantCardEditorSurfaceField,
): boolean {
  return first.column < second.column + second.width
    && first.column + first.width > second.column
    && first.row < second.row + second.height
    && first.row + first.height > second.row;
}

function createSurfaceFieldCardConfiguration(
  field: HomeAssistantCardEditorSurfaceField,
): HomeAssistantCardConfiguration | undefined {
  const layout = field.layout ?? "card";
  const entries = (field.entries ?? []).filter(entry => entry.entityId);
  if (layout !== "card" && entries.length > 0) {
    if (layout === "grid") {
      return {
        type: "grid",
        columns: Math.min(4, Math.max(1, entries.length)),
        square: false,
        cards: entries.map(entry => createHomeAssistantCardConfiguration({
          target: entry.target,
          bubbleButtonType: entry.bubbleButtonType,
          title: entry.id,
          entityIds: [entry.entityId],
        })),
      };
    }

    return {
      type: layout,
      cards: entries.map(entry => createHomeAssistantCardConfiguration({
        target: entry.target,
        bubbleButtonType: entry.bubbleButtonType,
        title: entry.id,
        entityIds: [entry.entityId],
      })),
    };
  }

  if (!field.entityId && field.target !== "link" && field.target !== "webpage") return undefined;
  return createHomeAssistantCardConfiguration({
    target: field.target,
    bubbleButtonType: field.bubbleButtonType,
    title: field.id,
    entityIds: [field.entityId || defaultEntityForTarget(field.target)],
  });
}

function defaultEntityForTarget(target: HomeAssistantCardTarget): string {
  if (target === "webpage") return "https://www.home-assistant.io";
  if (target === "link") return "/lovelace";
  return "";
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
