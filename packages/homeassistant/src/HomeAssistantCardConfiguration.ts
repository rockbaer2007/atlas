export interface HomeAssistantEntitiesCardEntity {
  readonly entity: string;
}

export interface HomeAssistantEntitiesCardConfiguration {
  readonly type: "entities";
  readonly title: string;
  readonly entities: readonly HomeAssistantEntitiesCardEntity[];
}

export interface HomeAssistantEntitiesCardParseResult {
  readonly card: HomeAssistantEntitiesCardConfiguration;
  readonly format: "json" | "yaml";
}

export interface HomeAssistantEntitiesCardInput {
  readonly title?: string;
  readonly entityIds: readonly string[];
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
  card: HomeAssistantEntitiesCardConfiguration,
  format: "json" | "yaml",
): string {
  return format === "yaml"
    ? serializeHomeAssistantEntitiesCardYaml(card)
    : JSON.stringify(card, null, 2);
}

export function parseHomeAssistantEntitiesCardConfiguration(
  text: string,
): HomeAssistantEntitiesCardParseResult {
  try {
    return {
      card: normalizeHomeAssistantEntitiesCardConfiguration(JSON.parse(text)),
      format: "json",
    };
  } catch {
    return {
      card: normalizeHomeAssistantEntitiesCardConfiguration(parseHomeAssistantEntitiesCardYaml(text)),
      format: "yaml",
    };
  }
}

function normalizeHomeAssistantEntitiesCardConfiguration(card: unknown): HomeAssistantEntitiesCardConfiguration {
  if (!isRecord(card) || card.type !== "entities" || !Array.isArray(card.entities)) {
    throw new Error("Unsupported Home Assistant card.");
  }

  const entityIds = dedupeEntityIds(card.entities
    .map(entity => typeof entity === "string" ? entity : isRecord(entity) ? entity.entity : undefined)
    .filter((entity): entity is string => typeof entity === "string"));
  if (entityIds.length === 0) {
    throw new Error("Home Assistant card has no entities.");
  }

  return createHomeAssistantEntitiesCardConfiguration({
    title: typeof card.title === "string" ? card.title : "Imported HA card",
    entityIds,
  });
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

function parseHomeAssistantEntitiesCardYaml(text: string): unknown {
  const lines = text
    .split(/\r?\n/)
    .map(line => line.trimEnd())
    .filter(line => line.trim() && !line.trimStart().startsWith("#"));
  const card: { type?: string; title?: string; entities: Array<string | HomeAssistantEntitiesCardEntity> } = {
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

function parseYamlScalar(value: string): string {
  if ((value.startsWith("\"") && value.endsWith("\"")) || (value.startsWith("'") && value.endsWith("'"))) {
    return value.slice(1, -1);
  }
  return value;
}

function dedupeEntityIds(entityIds: readonly string[]): string[] {
  return [...new Set(entityIds.map(entityId => entityId.trim()).filter(Boolean))];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
