export interface HomeAssistantEntitiesCardEntity {
  readonly entity: string;
}

export type HomeAssistantCardTarget = "entities" | "mushroom-template" | "bubble";

export interface HomeAssistantEntitiesCardConfiguration {
  readonly type: "entities";
  readonly title: string;
  readonly entities: readonly HomeAssistantEntitiesCardEntity[];
}

export interface HomeAssistantMushroomTemplateCardConfiguration {
  readonly type: "custom:mushroom-template-card";
  readonly primary: string;
  readonly secondary: string;
  readonly entity: string;
}

export interface HomeAssistantBubbleCardConfiguration {
  readonly type: "custom:bubble-card";
  readonly card_type: "button";
  readonly button_type: "state";
  readonly name: string;
  readonly entity: string;
  readonly show_state: true;
}

export type HomeAssistantCardConfiguration =
  | HomeAssistantEntitiesCardConfiguration
  | HomeAssistantMushroomTemplateCardConfiguration
  | HomeAssistantBubbleCardConfiguration;

export interface HomeAssistantEntitiesCardParseResult {
  readonly card: HomeAssistantCardConfiguration;
  readonly format: "json" | "yaml";
  readonly target: HomeAssistantCardTarget;
}

export interface HomeAssistantEntitiesCardInput {
  readonly target?: HomeAssistantCardTarget;
  readonly title?: string;
  readonly entityIds: readonly string[];
}

export interface HomeAssistantCardDependency {
  readonly id: "home-assistant" | "mushroom" | "bubble-card";
  readonly label: string;
  readonly required: boolean;
}

export interface HomeAssistantCardTargetDescriptor {
  readonly target: HomeAssistantCardTarget;
  readonly label: string;
  readonly type: HomeAssistantCardConfiguration["type"];
  readonly dependency: HomeAssistantCardDependency;
}

const cardTargetDescriptors: readonly HomeAssistantCardTargetDescriptor[] = [
  {
    target: "entities",
    label: "Entities",
    type: "entities",
    dependency: { id: "home-assistant", label: "Home Assistant built-in", required: false },
  },
  {
    target: "mushroom-template",
    label: "Mushroom template",
    type: "custom:mushroom-template-card",
    dependency: { id: "mushroom", label: "Mushroom", required: true },
  },
  {
    target: "bubble",
    label: "Bubble button",
    type: "custom:bubble-card",
    dependency: { id: "bubble-card", label: "Bubble Card", required: true },
  },
];

export function listHomeAssistantCardTargets(): readonly HomeAssistantCardTargetDescriptor[] {
  return cardTargetDescriptors;
}

export function findHomeAssistantCardTargetDescriptor(
  target: HomeAssistantCardTarget,
): HomeAssistantCardTargetDescriptor | undefined {
  return cardTargetDescriptors.find(descriptor => descriptor.target === target);
}

export function createHomeAssistantCardConfiguration(
  input: HomeAssistantEntitiesCardInput,
): HomeAssistantCardConfiguration {
  const entityIds = dedupeEntityIds(input.entityIds);
  const title = input.title?.trim() || "ATLAS panel";
  const primaryEntity = entityIds[0] ?? "";

  if (input.target === "mushroom-template") {
    return {
      type: "custom:mushroom-template-card",
      primary: title,
      secondary: primaryEntity,
      entity: primaryEntity,
    };
  }

  if (input.target === "bubble") {
    return {
      type: "custom:bubble-card",
      card_type: "button",
      button_type: "state",
      name: title,
      entity: primaryEntity,
      show_state: true,
    };
  }

  return createHomeAssistantEntitiesCardConfiguration({ title, entityIds });
}

export function createHomeAssistantEntitiesCardConfiguration(
  input: HomeAssistantEntitiesCardInput,
): HomeAssistantEntitiesCardConfiguration {
  return {
    type: "entities",
    title: input.title?.trim() || "ATLAS panel",
    entities: dedupeEntityIds(input.entityIds).map(entity => ({ entity })),
  };
}

export function serializeHomeAssistantEntitiesCardConfiguration(
  card: HomeAssistantCardConfiguration,
  format: "json" | "yaml",
): string {
  if (format === "json") {
    return JSON.stringify(card, null, 2);
  }

  return card.type === "entities"
    ? serializeHomeAssistantEntitiesCardYaml(card)
    : serializeHomeAssistantCustomCardYaml(card);
}

export function parseHomeAssistantEntitiesCardConfiguration(
  text: string,
): HomeAssistantEntitiesCardParseResult {
  try {
    return {
      ...normalizeHomeAssistantCardConfiguration(JSON.parse(text)),
      format: "json",
    };
  } catch {
    return {
      ...normalizeHomeAssistantCardConfiguration(parseHomeAssistantCardYaml(text)),
      format: "yaml",
    };
  }
}

export function inspectHomeAssistantCardDependency(
  cardOrTarget: HomeAssistantCardConfiguration | HomeAssistantCardTarget,
): HomeAssistantCardDependency {
  const target = typeof cardOrTarget === "string" ? cardOrTarget : getHomeAssistantCardTarget(cardOrTarget);
  return findHomeAssistantCardTargetDescriptor(target)?.dependency
    ?? { id: "home-assistant", label: "Home Assistant built-in", required: false };
}

export function getHomeAssistantCardTarget(card: HomeAssistantCardConfiguration): HomeAssistantCardTarget {
  if (card.type === "custom:mushroom-template-card") return "mushroom-template";
  if (card.type === "custom:bubble-card") return "bubble";
  return "entities";
}

function normalizeHomeAssistantCardConfiguration(
  card: unknown,
): { readonly card: HomeAssistantCardConfiguration; readonly target: HomeAssistantCardTarget } {
  if (!isRecord(card)) {
    throw new Error("Unsupported Home Assistant card.");
  }

  if (card.type === "custom:mushroom-template-card") {
    const entity = typeof card.entity === "string" ? card.entity.trim() : "";
    if (!entity) throw new Error("Mushroom card has no entity.");
    return {
      card: {
        type: "custom:mushroom-template-card",
        primary: typeof card.primary === "string" && card.primary.trim() ? card.primary.trim() : "Imported Mushroom card",
        secondary: typeof card.secondary === "string" ? card.secondary : entity,
        entity,
      },
      target: "mushroom-template",
    };
  }

  if (card.type === "custom:bubble-card") {
    const entity = typeof card.entity === "string" ? card.entity.trim() : "";
    if (!entity) throw new Error("Bubble card has no entity.");
    return {
      card: {
        type: "custom:bubble-card",
        card_type: "button",
        button_type: "state",
        name: typeof card.name === "string" && card.name.trim() ? card.name.trim() : "Imported Bubble card",
        entity,
        show_state: true,
      },
      target: "bubble",
    };
  }

  if (card.type !== "entities" || !Array.isArray(card.entities)) {
    throw new Error("Unsupported Home Assistant card.");
  }

  const entityIds = dedupeEntityIds(card.entities
    .map(entity => typeof entity === "string" ? entity : isRecord(entity) ? entity.entity : undefined)
    .filter((entity): entity is string => typeof entity === "string"));
  if (entityIds.length === 0) {
    throw new Error("Home Assistant card has no entities.");
  }

  return {
    card: createHomeAssistantEntitiesCardConfiguration({
      title: typeof card.title === "string" ? card.title : "Imported HA card",
      entityIds,
    }),
    target: "entities",
  };
}

function serializeHomeAssistantEntitiesCardYaml(card: HomeAssistantEntitiesCardConfiguration): string {
  const lines = [
    "type: entities",
    `title: ${JSON.stringify(card.title)}`,
    "entities:",
  ];
  for (const item of card.entities) {
    lines.push(`  - entity: ${JSON.stringify(item.entity)}`);
  }
  return lines.join("\n");
}

function serializeHomeAssistantCustomCardYaml(card: Exclude<HomeAssistantCardConfiguration, HomeAssistantEntitiesCardConfiguration>): string {
  return Object.entries(card)
    .map(([key, value]) => `${key}: ${serializeYamlScalar(value)}`)
    .join("\n");
}

function parseHomeAssistantCardYaml(text: string): unknown {
  const lines = text
    .split(/\r?\n/)
    .map(line => line.trimEnd())
    .filter(line => line.trim() && !line.trimStart().startsWith("#"));
  const card: Record<string, unknown> & { entities: Array<string | HomeAssistantEntitiesCardEntity> } = {
    entities: [],
  };
  let inEntities = false;
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed === "entities:") {
      inEntities = true;
      continue;
    }
    if (!inEntities && trimmed.startsWith("type:")) {
      card.type = parseYamlScalar(trimmed.slice("type:".length).trim());
      continue;
    }
    if (!inEntities && trimmed.startsWith("title:")) {
      card.title = parseYamlScalar(trimmed.slice("title:".length).trim());
      continue;
    }
    if (!inEntities && trimmed.includes(":")) {
      const separator = trimmed.indexOf(":");
      card[trimmed.slice(0, separator)] = parseYamlScalar(trimmed.slice(separator + 1).trim());
      continue;
    }
    if (inEntities && trimmed.startsWith("- entity:")) {
      card.entities.push({ entity: parseYamlScalar(trimmed.slice("- entity:".length).trim()) });
      continue;
    }
    if (inEntities && trimmed.startsWith("- ")) {
      card.entities.push(parseYamlScalar(trimmed.slice(2).trim()));
    }
  }
  return card;
}

function serializeYamlScalar(value: unknown): string {
  if (typeof value === "boolean") return String(value);
  if (typeof value === "number") return String(value);
  return JSON.stringify(String(value));
}

function parseYamlScalar(value: string): string {
  if (value.startsWith("\"") && value.endsWith("\"")) {
    try {
      const parsed = JSON.parse(value);
      return typeof parsed === "string" ? parsed : value.slice(1, -1);
    } catch {
      return value.slice(1, -1);
    }
  }
  if (value.startsWith("'") && value.endsWith("'")) {
    return value.slice(1, -1).replace(/''/g, "'");
  }
  return value;
}

function dedupeEntityIds(entityIds: readonly string[]): string[] {
  return [...new Set(entityIds.map(entityId => entityId.trim()).filter(Boolean))];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
