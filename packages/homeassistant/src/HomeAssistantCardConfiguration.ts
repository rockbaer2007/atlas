export interface HomeAssistantEntitiesCardEntity {
  readonly entity: string;
}

export type HomeAssistantCardTarget = "entities" | "mushroom-template" | "bubble";
export type HomeAssistantCardLayout = "single" | "horizontal-stack" | "vertical-stack";

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

export interface HomeAssistantStackCardConfiguration {
  readonly type: "horizontal-stack" | "vertical-stack";
  readonly cards: readonly HomeAssistantSingleCardConfiguration[];
}

export type HomeAssistantSingleCardConfiguration =
  | HomeAssistantEntitiesCardConfiguration
  | HomeAssistantMushroomTemplateCardConfiguration
  | HomeAssistantBubbleCardConfiguration;

export type HomeAssistantCustomCardConfiguration =
  | HomeAssistantMushroomTemplateCardConfiguration
  | HomeAssistantBubbleCardConfiguration;

export type HomeAssistantCardConfiguration =
  | HomeAssistantSingleCardConfiguration
  | HomeAssistantStackCardConfiguration;

export interface HomeAssistantEntitiesCardParseResult {
  readonly card: HomeAssistantCardConfiguration;
  readonly format: "json" | "yaml";
  readonly target: HomeAssistantCardTarget;
  readonly layout: HomeAssistantCardLayout;
}

export interface HomeAssistantEntitiesCardInput {
  readonly target?: HomeAssistantCardTarget;
  readonly layout?: HomeAssistantCardLayout;
  readonly title?: string;
  readonly entityIds: readonly string[];
}

export interface HomeAssistantCardDependency {
  readonly id: "home-assistant" | "mushroom" | "bubble-card";
  readonly label: string;
  readonly required: boolean;
  readonly resourcePaths: readonly string[];
  readonly installPaths: readonly string[];
}

export interface HomeAssistantLovelaceResource {
  readonly url: string;
}

export interface HomeAssistantCardDependencyAvailability {
  readonly dependency: HomeAssistantCardDependency;
  readonly status: "not-required" | "installed" | "missing";
  readonly matchedResourcePaths: readonly string[];
  readonly missingResourcePaths: readonly string[];
}

export interface HomeAssistantCardTargetDescriptor {
  readonly target: HomeAssistantCardTarget;
  readonly label: string;
  readonly type: HomeAssistantSingleCardConfiguration["type"];
  readonly dependency: HomeAssistantCardDependency;
}

const cardTargetDescriptors: readonly HomeAssistantCardTargetDescriptor[] = [
  {
    target: "entities",
    label: "Entities",
    type: "entities",
    dependency: { id: "home-assistant", label: "Home Assistant built-in", required: false, resourcePaths: [], installPaths: [] },
  },
  {
    target: "mushroom-template",
    label: "Mushroom template",
    type: "custom:mushroom-template-card",
    dependency: {
      id: "mushroom",
      label: "Mushroom",
      required: true,
      resourcePaths: ["/hacsfiles/lovelace-mushroom/mushroom.js"],
      installPaths: [],
    },
  },
  {
    target: "bubble",
    label: "Bubble button",
    type: "custom:bubble-card",
    dependency: {
      id: "bubble-card",
      label: "Bubble Card",
      required: true,
      resourcePaths: ["/hacsfiles/Bubble-Card/bubble-card.js"],
      installPaths: [],
    },
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
  const target = input.target ?? "entities";
  const layout = input.layout ?? "single";
  const title = input.title?.trim() || "ATLAS panel";

  if (target !== "entities" && layout !== "single" && entityIds.length > 1) {
    return {
      type: layout,
      cards: entityIds.map(entityId => createHomeAssistantSingleCardConfiguration({
        target,
        title: entityId,
        entityIds: [entityId],
      })),
    };
  }

  return createHomeAssistantSingleCardConfiguration({ target, title, entityIds });
}

function createHomeAssistantSingleCardConfiguration(
  input: Required<Pick<HomeAssistantEntitiesCardInput, "target" | "title" | "entityIds">>,
): HomeAssistantSingleCardConfiguration {
  const entityIds = dedupeEntityIds(input.entityIds);
  const title = input.title;
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

  if (card.type === "entities") {
    return serializeHomeAssistantEntitiesCardYaml(card);
  }

  if (isHomeAssistantStackCardConfiguration(card)) {
    return serializeHomeAssistantStackCardYaml(card);
  }

  if (isHomeAssistantCustomCardConfiguration(card)) {
    return serializeHomeAssistantCustomCardYaml(card);
  }

  throw new Error("Unsupported Home Assistant card.");
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
    ?? { id: "home-assistant", label: "Home Assistant built-in", required: false, resourcePaths: [], installPaths: [] };
}

export function inspectHomeAssistantCardDependencyAvailability(
  cardOrTarget: HomeAssistantCardConfiguration | HomeAssistantCardTarget,
  resources: readonly (HomeAssistantLovelaceResource | string)[],
): HomeAssistantCardDependencyAvailability {
  const dependency = inspectHomeAssistantCardDependency(cardOrTarget);
  if (!dependency.required) {
    return {
      dependency,
      status: "not-required",
      matchedResourcePaths: [],
      missingResourcePaths: [],
    };
  }

  const resourcePaths = resources
    .map(resource => typeof resource === "string" ? resource : resource.url)
    .map(normalizeHomeAssistantResourcePath)
    .filter((resource): resource is string => resource !== undefined);
  const matchedResourcePaths = dependency.resourcePaths.filter(path => resourcePaths.includes(path));
  const missingResourcePaths = dependency.resourcePaths.filter(path => !matchedResourcePaths.includes(path));

  return {
    dependency,
    status: missingResourcePaths.length === 0 ? "installed" : "missing",
    matchedResourcePaths,
    missingResourcePaths,
  };
}

export function getHomeAssistantCardTarget(card: HomeAssistantCardConfiguration): HomeAssistantCardTarget {
  if (isHomeAssistantStackCardConfiguration(card)) {
    return card.cards[0] ? getHomeAssistantCardTarget(card.cards[0]) : "entities";
  }
  if (card.type === "custom:mushroom-template-card") return "mushroom-template";
  if (card.type === "custom:bubble-card") return "bubble";
  return "entities";
}

function normalizeHomeAssistantCardConfiguration(
  card: unknown,
): { readonly card: HomeAssistantCardConfiguration; readonly target: HomeAssistantCardTarget; readonly layout: HomeAssistantCardLayout } {
  if (!isRecord(card)) {
    throw new Error("Unsupported Home Assistant card.");
  }

  if ((card.type === "horizontal-stack" || card.type === "vertical-stack") && Array.isArray(card.cards)) {
    const normalizedCards = card.cards.map(candidate => normalizeHomeAssistantCardConfiguration(candidate).card);
    const singleCards = normalizedCards.filter((candidate): candidate is HomeAssistantSingleCardConfiguration =>
      candidate.type !== "horizontal-stack" && candidate.type !== "vertical-stack",
    );
    if (singleCards.length === 0 || singleCards.length !== normalizedCards.length) {
      throw new Error("Home Assistant stack card has no supported cards.");
    }
    const normalizedCard = {
      type: card.type,
      cards: singleCards,
    } satisfies HomeAssistantStackCardConfiguration;
    return {
      card: normalizedCard,
      target: getHomeAssistantCardTarget(normalizedCard),
      layout: card.type,
    };
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
      layout: "single",
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
      layout: "single",
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
    layout: "single",
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

function serializeHomeAssistantCustomCardYaml(
  card: HomeAssistantCustomCardConfiguration,
): string {
  return Object.entries(card)
    .map(([key, value]) => `${key}: ${serializeYamlScalar(value)}`)
    .join("\n");
}

function serializeHomeAssistantStackCardYaml(card: HomeAssistantStackCardConfiguration): string {
  const lines = [
    `type: ${card.type}`,
    "cards:",
  ];
  for (const child of card.cards) {
    const childLines = (child.type === "entities"
      ? serializeHomeAssistantEntitiesCardYaml(child)
      : serializeHomeAssistantCustomCardYaml(child)).split("\n");
    childLines.forEach((line, index) => {
      lines.push(index === 0 ? `  - ${line}` : `    ${line}`);
    });
  }
  return lines.join("\n");
}

function normalizeHomeAssistantResourcePath(resourcePath: string): string | undefined {
  const trimmed = resourcePath.trim();
  if (!trimmed) return undefined;

  try {
    return new URL(trimmed, "http://homeassistant.local").pathname;
  } catch {
    const [withoutHash] = trimmed.split("#", 1);
    const [withoutQuery] = withoutHash.split("?", 1);
    return withoutQuery || undefined;
  }
}

function parseHomeAssistantCardYaml(text: string): unknown {
  const lines = text
    .split(/\r?\n/)
    .map(line => line.trimEnd())
    .filter(line => line.trim() && !line.trimStart().startsWith("#"));
  const card: Record<string, unknown> & {
    entities: Array<string | HomeAssistantEntitiesCardEntity>;
    cards?: Array<Record<string, unknown>>;
  } = {
    entities: [],
  };
  let inEntities = false;
  let inCards = false;
  let currentChild: Record<string, unknown> | undefined;
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed === "cards:") {
      inCards = true;
      inEntities = false;
      card.cards = [];
      continue;
    }
    if (trimmed === "entities:") {
      inEntities = true;
      inCards = false;
      continue;
    }
    if (inCards && trimmed.startsWith("- ")) {
      currentChild = {};
      card.cards?.push(currentChild);
      parseYamlKeyValueInto(trimmed.slice(2).trim(), currentChild);
      continue;
    }
    if (inCards && currentChild && trimmed.includes(":")) {
      parseYamlKeyValueInto(trimmed, currentChild);
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

function parseYamlKeyValueInto(line: string, target: Record<string, unknown>): void {
  if (!line.includes(":")) return;
  const separator = line.indexOf(":");
  target[line.slice(0, separator)] = parseYamlScalar(line.slice(separator + 1).trim());
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

function isHomeAssistantStackCardConfiguration(
  card: HomeAssistantCardConfiguration,
): card is HomeAssistantStackCardConfiguration {
  return card.type === "horizontal-stack" || card.type === "vertical-stack";
}

function isHomeAssistantCustomCardConfiguration(
  card: HomeAssistantCardConfiguration,
): card is HomeAssistantCustomCardConfiguration {
  return card.type === "custom:mushroom-template-card" || card.type === "custom:bubble-card";
}
