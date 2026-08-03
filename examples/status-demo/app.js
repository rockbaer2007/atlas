import {
  createThemeTokens,
} from "@atlas/theme";
import {
  createHomeAssistantStatusPanel,
  createHomeAssistantCardExportPackage,
  createHomeAssistantCardExportPayload,
  createHomeAssistantEntityState,
  createHomeAssistantConnectionConfiguration,
  createBrowserHomeAssistantWebSocket,
  createHomeAssistantRuntimeConnection,
  createHomeAssistantCardEditorConfiguration,
  createHomeAssistantCardEditorFieldFromTemplate,
  createHomeAssistantAtlasFrontendIntegrationPlan,
  decideHomeAssistantCardArtifactImport,
  formatHomeAssistantCardArtifactReviewLines,
  serializeHomeAssistantAtlasFrontendResourceReferences,
  createHomeAssistantEntityPresentation,
  createHomeAssistantEntityCatalog,
  createHomeAssistantCardConfiguration,
  createHomeAssistantPanelGroup,
  createHomeAssistantServiceCommand,
  createHomeAssistantStatusPanelRegistry,
  filterHomeAssistantEntityCatalog,
  listHomeAssistantEntityCatalogDomains,
  listHomeAssistantEntityDomainShortcuts,
  listHomeAssistantBubbleButtonTypes,
  createInMemoryHomeAssistantEntityStateTransport,
  inspectHomeAssistantCardDependency,
  inspectHomeAssistantCardDependencyAvailability,
  listHomeAssistantCardEditorTemplates,
  listHomeAssistantCardTargets,
  serializeHomeAssistantEntitiesCardConfiguration,
  summarizeHomeAssistantCardImport,
  deriveHomeAssistantWebSocketUrl,
  findHomeAssistantStatusPanel,
  inspectHomeAssistantConnectionReadiness,
  bindHomeAssistantEntityStatusPanel,
} from "@atlas/homeassistant";

const statusRoot = document.querySelector("#atlas-status-root");
const statusMessage = document.querySelector("#status-message");
const buttons = Array.from(document.querySelectorAll("[data-entity-state]"));
const homeAssistantUrl = document.querySelector("#home-assistant-url");
const connectionReadiness = document.querySelector("#connection-readiness");
const connectionState = document.querySelector("#connection-state");
const homeAssistantToken = document.querySelector("#home-assistant-token");
const rememberHomeAssistantToken = document.querySelector("#remember-home-assistant-token");
const connectButton = document.querySelector("#connect-home-assistant");
const disconnectButton = document.querySelector("#disconnect-home-assistant");
const homeAssistantEntity = document.querySelector("#home-assistant-entity");
const homeAssistantEntityDomain = document.querySelector("#home-assistant-entity-domain");
const homeAssistantEntityDomainShortcuts = document.querySelector("#home-assistant-entity-domain-shortcuts");
const homeAssistantEntitySearch = document.querySelector("#home-assistant-entity-search");
const clearHomeAssistantEntitySearch = document.querySelector("#clear-home-assistant-entity-search");
const homeAssistantEntityPicker = document.querySelector("#home-assistant-entity-picker");
const homeAssistantEntityPickerStatus = document.querySelector("#home-assistant-entity-picker-status");
const addHomeAssistantEntity = document.querySelector("#add-home-assistant-entity");
const refreshHomeAssistantEntities = document.querySelector("#refresh-home-assistant-entities");
const homeAssistantGroup = document.querySelector("#home-assistant-group");
const homeAssistantGroupName = document.querySelector("#home-assistant-group-name");
const haCardTarget = document.querySelector("#ha-card-target");
const haCardLayout = document.querySelector("#ha-card-layout");
const haCardFormat = document.querySelector("#ha-card-format");
const saveHomeAssistantGroup = document.querySelector("#save-home-assistant-group");
const deleteHomeAssistantGroup = document.querySelector("#delete-home-assistant-group");
const duplicateHomeAssistantGroup = document.querySelector("#duplicate-home-assistant-group");
const exportHomeAssistantConfig = document.querySelector("#export-home-assistant-config");
const exportHaCardConfig = document.querySelector("#export-ha-card-config");
const exportHaCardPackage = document.querySelector("#export-ha-card-package");
const copyHaCardConfig = document.querySelector("#copy-ha-card-config");
const copyHaCardResources = document.querySelector("#copy-ha-card-resources");
const checkHaCardResources = document.querySelector("#check-ha-card-resources");
const importHomeAssistantConfig = document.querySelector("#import-home-assistant-config");
const importHaCardConfig = document.querySelector("#import-ha-card-config");
const haCardPreview = document.querySelector("#ha-card-preview");
const haCardDependency = document.querySelector("#ha-card-dependency");
const haCardImportReview = document.querySelector("#ha-card-import-review");
const selectedEntity = document.querySelector("#selected-entity");
const editorModeButtons = document.querySelectorAll("[data-editor-mode]");
const cardLayoutControl = document.querySelector("#card-layout-control");
const simpleCardSection = document.querySelector("#simple-card-section");
const expertEditorSection = document.querySelector("#expert-editor-section");
const expertTemplate = document.querySelector("#expert-template");
const expertTarget = document.querySelector("#expert-target");
const expertBubbleTypeControl = document.querySelector("#expert-bubble-type-control");
const expertBubbleButtonType = document.querySelector("#expert-bubble-button-type");
const expertTitle = document.querySelector("#expert-title");
const applyExpertTitle = document.querySelector("#apply-expert-title");
const useEntityNameAsTitle = document.querySelector("#use-entity-name-as-title");
const expertEntity = document.querySelector("#expert-entity");
const expertColumn = document.querySelector("#expert-column");
const expertRow = document.querySelector("#expert-row");
const expertWidth = document.querySelector("#expert-width");
const expertHeight = document.querySelector("#expert-height");
const addExpertField = document.querySelector("#add-expert-field");
const editExpertField = document.querySelector("#edit-expert-field");
const clearExpertFields = document.querySelector("#clear-expert-fields");
const expertTemplatePalette = document.querySelector("#expert-template-palette");
const saveExpertPaletteFavorites = document.querySelector("#save-expert-palette-favorites");
const showAllExpertPaletteCards = document.querySelector("#show-all-expert-palette-cards");
const scanExpertPaletteCards = document.querySelector("#scan-expert-palette-cards");
const resetExpertPaletteFavorites = document.querySelector("#reset-expert-palette-favorites");
const expertEditorDropzone = document.querySelector("#expert-editor-dropzone");
const expertEditorSummary = document.querySelector("#expert-editor-summary");
const expertFieldList = document.querySelector("#expert-field-list");
const expertEditorPreview = document.querySelector("#expert-editor-preview");
const entityList = document.querySelector("#atlas-entity-list");
const stackSelectionSummary = document.querySelector("#stack-selection-summary");
const groupSummary = document.querySelector("#group-summary");
const groupIssues = document.querySelector("#group-issues");
const configurationStorageKey = "atlas.homeassistant.demo.configuration";
const emptyEntitySelectionMessage = "Select at least one entity.";
const cardTargets = listHomeAssistantCardTargets();
const cardEditorTemplates = listHomeAssistantCardEditorTemplates();
const bubbleButtonTypes = listHomeAssistantBubbleButtonTypes();
let expertPaletteCards = [
  { id: "core-entity", category: "Core", label: "Entity", templateId: "entity-card", target: "entity", preview: ["type: entity"] },
  { id: "core-entities", category: "Core", label: "Entities", templateId: "entity-list", target: "entities", preview: ["Entity list"] },
  { id: "core-button", category: "Core", label: "Button", templateId: "button-card", target: "button", preview: ["type: button"] },
  { id: "core-grid", category: "Core", label: "Grid", templateId: "grid", target: "entities", preview: ["type: grid"] },
  { id: "core-sensor", category: "Core", label: "Sensor", templateId: "sensor-card", target: "sensor", preview: ["type: sensor"] },
  { id: "core-horizontal-stack", category: "Core", label: "Horizontal stack", templateId: "horizontal-stack", target: "entities", preview: ["Cards in a row"] },
  { id: "core-vertical-stack", category: "Core", label: "Vertical stack", templateId: "vertical-stack", target: "entities", preview: ["Cards in a column"] },
  { id: "core-thermostat", category: "Core", label: "Thermostat", templateId: "thermostat-card", target: "thermostat", preview: ["type: thermostat"] },
  { id: "core-link", category: "Core", label: "Link", templateId: "link-card", target: "link", preview: ["navigate"] },
  { id: "core-webpage", category: "Core", label: "Webpage", templateId: "webpage-card", target: "webpage", preview: ["type: iframe"] },
  { id: "community-mushroom-template", category: "Community", label: "Mushroom template", templateId: "state-button", target: "mushroom-template", preview: ["Primary / secondary"] },
  { id: "community-bubble-state", category: "Community", label: "Bubble state", templateId: "state-button", target: "bubble", bubbleButtonType: "state", preview: ["button_type: state"] },
  { id: "community-bubble-switch", category: "Community", label: "Bubble switch", templateId: "switch-button", target: "bubble", bubbleButtonType: "switch", preview: ["button_type: switch"] },
  { id: "community-bubble-slider", category: "Community", label: "Bubble slider", templateId: "state-button", target: "bubble", bubbleButtonType: "slider", preview: ["button_type: slider"] },
  { id: "community-bubble-name", category: "Community", label: "Bubble name", templateId: "state-button", target: "bubble", bubbleButtonType: "name", preview: ["button_type: name"] },
];
const expertEditorFields = [];
const expertPaletteFavoriteIds = new Set();
const expertPaletteDraftFavoriteIds = new Set();
const expertTemplateSizing = new Map(cardEditorTemplates.map(template => [
  template.id,
  {
    columns: String(template.defaultWidth),
    rows: "auto",
  },
]));
const expertGridColumns = 12;
const expertGridRows = 12;
const expertFieldMaxResizeDelta = 5;
let connection;
let removeLifecycleListener;
let removeServiceResultListener;
let removeEntityStateListListener;
let removeLovelaceResourceListener;
let panelBinding;
let activeTransport;
let removeEntityListListener;
let reconnectToken;
let reconnectTimer;
let reconnectAttempts = 0;
let lovelaceResources = [];
let lovelaceResourcesChecked = false;
let activeEditorMode = "simple";
let expertPaletteShowAllCards = false;
let selectedExpertFieldIndex = -1;
let expertFieldEditing = false;
const entitySnapshots = new Map();
const knownEntityIds = new Set();
const stackSelectedEntityIds = new Set();
let statusPreviewEntityId;
let pendingImport;
let initialGroupSelection = "overview";
let initialCardTarget = "entities";
let panelGroups = [
  createHomeAssistantPanelGroup({ id: "overview", title: "Overview", entityIds: ["binary_sensor.atlas_status", "sensor.atlas_temperature"] }),
  createHomeAssistantPanelGroup({ id: "energy", title: "Energy", entityIds: ["sensor.atlas_power", "sensor.atlas_energy"] }),
  createHomeAssistantPanelGroup({ id: "safety", title: "Safety", entityIds: ["binary_sensor.atlas_status", "binary_sensor.atlas_door"] }),
];
for (const group of panelGroups) {
  for (const entityId of group.entityIds) {
    knownEntityIds.add(entityId);
  }
}

try {
  const savedConfiguration = JSON.parse(localStorage.getItem(configurationStorageKey) ?? "null");
  if (typeof savedConfiguration?.url === "string") {
    homeAssistantUrl.value = savedConfiguration.url;
  }
  if (savedConfiguration?.rememberToken === true) {
    rememberHomeAssistantToken.checked = true;
    if (typeof savedConfiguration?.token === "string") {
      homeAssistantToken.value = savedConfiguration.token;
    }
  }
  if (typeof savedConfiguration?.entities === "string") {
    homeAssistantEntity.value = savedConfiguration.entities;
    initialGroupSelection = "custom";
  }
  if (typeof savedConfiguration?.entityDomain === "string") {
    homeAssistantEntityDomain.value = savedConfiguration.entityDomain;
  }
  if (typeof savedConfiguration?.entitySearch === "string") {
    homeAssistantEntitySearch.value = savedConfiguration.entitySearch;
  }
  if (Array.isArray(savedConfiguration?.stackEntityIds)) {
    for (const entityId of savedConfiguration.stackEntityIds) {
      if (typeof entityId === "string" && entityId.trim()) {
        stackSelectedEntityIds.add(entityId.trim());
      }
    }
  }
  if (Array.isArray(savedConfiguration?.expertPaletteFavoriteIds)) {
    for (const paletteId of savedConfiguration.expertPaletteFavoriteIds) {
      if (typeof paletteId === "string" && paletteId.trim()) {
        expertPaletteFavoriteIds.add(paletteId);
        expertPaletteDraftFavoriteIds.add(paletteId);
      }
    }
  }
  if (Array.isArray(savedConfiguration?.groups)) {
    panelGroups = savedConfiguration.groups.map(createHomeAssistantPanelGroup);
  }
  if (typeof savedConfiguration?.cardTarget === "string" && cardTargets.some(descriptor => descriptor.target === savedConfiguration.cardTarget)) {
    initialCardTarget = savedConfiguration.cardTarget;
  }
  if (savedConfiguration?.cardLayout === "single" || savedConfiguration?.cardLayout === "horizontal-stack" || savedConfiguration?.cardLayout === "vertical-stack") {
    haCardLayout.value = savedConfiguration.cardLayout;
  }
  if (savedConfiguration?.cardFormat === "json" || savedConfiguration?.cardFormat === "yaml") {
    haCardFormat.value = savedConfiguration.cardFormat;
  }
  if (typeof savedConfiguration?.selectedGroup === "string") {
    initialGroupSelection = savedConfiguration.selectedGroup;
  }
} catch {
  // The demo remains usable when browser storage is unavailable or malformed.
}

const tokens = createThemeTokens({
  colorBackground: "#f5f7fb",
  colorSurface: "#ffffff",
  colorText: "#172033",
  colorAccent: "#0f766e",
  spacing: "20px",
});
const panel = createHomeAssistantStatusPanel({
  id: "atlas-status-demo",
  title: "ATLAS status",
  targetIdentifier: "atlas-status-root",
});
const panelRegistry = createHomeAssistantStatusPanelRegistry([panel]);
const transport = createInMemoryHomeAssistantEntityStateTransport();

function renderCardTargetOptions(selectedTarget = haCardTarget.value || "entities") {
  haCardTarget.replaceChildren();
  for (const descriptor of cardTargets) {
    const option = document.createElement("option");
    option.value = descriptor.target;
    option.textContent = descriptor.label;
    haCardTarget.append(option);
  }
  haCardTarget.value = cardTargets.some(descriptor => descriptor.target === selectedTarget) ? selectedTarget : "entities";
  syncCardLayoutState();
}

function renderEditorMode(mode = "simple") {
  const expert = mode === "expert";
  activeEditorMode = expert ? "expert" : "simple";
  cardLayoutControl.hidden = expert;
  simpleCardSection.hidden = expert;
  expertEditorSection.hidden = !expert;
  for (const button of editorModeButtons) {
    button.setAttribute("aria-pressed", String(button.dataset.editorMode === activeEditorMode));
  }
  exportHaCardConfig.textContent = expert ? "Export Expert HA card" : "Export HA card";
  copyHaCardConfig.textContent = expert ? "Copy Expert HA card" : "Copy HA card";
  copyHaCardResources.textContent = expert ? "Copy Expert resources" : "Copy resources";
  renderHaCardPreview();
  renderExpertEditorPreview();
}

function renderExpertEditorOptions() {
  expertTemplate.replaceChildren();
  for (const template of cardEditorTemplates) {
    const option = document.createElement("option");
    option.value = template.id;
    option.textContent = template.label;
    expertTemplate.append(option);
  }

  expertTarget.replaceChildren();
  for (const descriptor of cardTargets) {
    const option = document.createElement("option");
    option.value = descriptor.target;
    option.textContent = descriptor.label;
    expertTarget.append(option);
  }
  expertTarget.value = "bubble";
  expertBubbleButtonType.replaceChildren();
  for (const type of bubbleButtonTypes) {
    const option = document.createElement("option");
    option.value = type;
    option.textContent = type;
    expertBubbleButtonType.append(option);
  }
  expertBubbleButtonType.value = "state";
  syncExpertBubbleTypeControl();
}

function syncExpertBubbleTypeControl() {
  const isBubble = expertTarget.value === "bubble";
  expertBubbleTypeControl.hidden = !isBubble;
  expertBubbleButtonType.disabled = !isBubble;
}

function syncCardLayoutState() {
  const supportsStackLayout = haCardTarget.value === "mushroom-template" || haCardTarget.value === "bubble";
  haCardLayout.disabled = !supportsStackLayout;
  if (!supportsStackLayout) {
    haCardLayout.value = "single";
  }
}

async function renderEntityState(state) {
  const registeredPanel = findHomeAssistantStatusPanel(panelRegistry, panel.id);
  if (!registeredPanel) {
    statusMessage.textContent = "Status panel is not registered.";
    return;
  }
  if (trackedEntityIds().length === 0) {
    renderEmptyStatusPreview();
    statusMessage.textContent = emptyEntitySelectionMessage;
    return;
  }

  await transport.publish(createHomeAssistantEntityState({
    entityId: currentEntityId(),
    state,
  }));
}

function renderConnectionReadiness() {
  const configuration = createHomeAssistantConnectionConfiguration({ url: homeAssistantUrl.value });
  const readiness = inspectHomeAssistantConnectionReadiness(configuration);
  connectionReadiness.textContent = readiness.ready
    ? `Connection URL ready: ${deriveHomeAssistantWebSocketUrl(configuration)}`
    : readiness.reason;
}

function renderConnectionLifecycle(lifecycle) {
  const subscription = lifecycle.subscription ? `, subscription ${lifecycle.subscription}` : "";
  connectionState.dataset.state = lifecycle.state;
  connectionState.textContent = lifecycle.reason
    ? `Connection: ${lifecycle.state} (${lifecycle.reason})`
    : `Connection: ${lifecycle.state}${subscription}`;
  connectButton.disabled = lifecycle.state === "connecting" || lifecycle.state === "authenticating" || lifecycle.state === "connected";
  disconnectButton.disabled = lifecycle.state === "closed" || lifecycle.state === "failed";
  checkHaCardResources.disabled = lifecycle.state !== "connected";

  if (lifecycle.state === "connected") {
    reconnectAttempts = 0;
    clearTimeout(reconnectTimer);
    bindSelectedEntity(connection?.getClient()?.transport);
  } else if (lifecycle.state === "closed" || lifecycle.state === "failed") {
    bindSelectedEntity(transport);
    if (lifecycle.state === "closed") {
      scheduleReconnect();
    }
  }
  refreshHomeAssistantEntities.disabled = lifecycle.state !== "connected";
}

function scheduleReconnect() {
  if (!connection || !reconnectToken || reconnectTimer || reconnectAttempts >= 3) {
    return;
  }

  reconnectAttempts += 1;
  const delay = reconnectAttempts * 1000;
  statusMessage.textContent = `Reconnecting in ${delay / 1000}s (${reconnectAttempts}/3).`;
  reconnectTimer = window.setTimeout(() => {
    reconnectTimer = undefined;
    connection?.reconnect(reconnectToken);
  }, delay);
}

function persistConfiguration() {
  try {
    localStorage.setItem(configurationStorageKey, JSON.stringify({
      url: homeAssistantUrl.value,
      rememberToken: rememberHomeAssistantToken.checked,
      token: rememberHomeAssistantToken.checked ? homeAssistantToken.value : undefined,
      entities: homeAssistantEntity.value,
      entityDomain: homeAssistantEntityDomain.value,
      entitySearch: homeAssistantEntitySearch.value,
      selectedGroup: homeAssistantGroup.value,
      cardTarget: haCardTarget.value,
      cardLayout: haCardLayout.value,
      cardFormat: haCardFormat.value,
      stackEntityIds: selectedStackEntityIds(),
      expertPaletteFavoriteIds: [...expertPaletteFavoriteIds],
      groups: panelGroups,
    }));
  } catch {
    // Connection configuration remains session-only when storage is unavailable.
  }
}

function renderGroupOptions(selectedId = homeAssistantGroup.value) {
  homeAssistantGroup.replaceChildren();
  for (const group of panelGroups) {
    const option = document.createElement("option");
    option.value = group.id;
    option.textContent = group.title;
    homeAssistantGroup.append(option);
  }
  const custom = document.createElement("option");
  custom.value = "custom";
  custom.textContent = "Custom";
  homeAssistantGroup.append(custom);
  homeAssistantGroup.value = [...homeAssistantGroup.options].some(option => option.value === selectedId) ? selectedId : "custom";
}

function currentEntityId() {
  const entityIds = trackedEntityIds();
  if (statusPreviewEntityId && entityIds.includes(statusPreviewEntityId)) {
    return statusPreviewEntityId;
  }
  return entityIds[0] ?? "binary_sensor.atlas_status";
}

function trackedEntityIds() {
  const entityIds = [...new Set(homeAssistantEntity.value.split(",").map(entityId => entityId.trim()).filter(Boolean))];
  for (const entityId of entityIds) {
    knownEntityIds.add(entityId);
  }
  return entityIds;
}

function renderEmptyStatusPreview() {
  const emptyState = document.createElement("div");
  emptyState.className = "empty-selection-state";
  emptyState.textContent = emptyEntitySelectionMessage;
  statusRoot.replaceChildren(emptyState);
}

function knownEntityPickerIds() {
  return [...new Set([
    ...knownEntityIds,
    ...trackedEntityIds(),
    ...panelGroups.flatMap(group => group.entityIds),
    ...entitySnapshots.keys(),
  ])].sort((left, right) => left.localeCompare(right));
}

function createEntityPickerCatalog() {
  return createHomeAssistantEntityCatalog({
    entityIds: knownEntityPickerIds(),
    entities: [...entitySnapshots.values()],
  });
}

function renderEntityDomainOptions() {
  const selected = homeAssistantEntityDomain.value || "all";
  const domains = listHomeAssistantEntityCatalogDomains(createEntityPickerCatalog());

  homeAssistantEntityDomain.replaceChildren();
  const allOption = document.createElement("option");
  allOption.value = "all";
  allOption.textContent = "All entity types";
  homeAssistantEntityDomain.append(allOption);
  for (const domain of domains) {
    const option = document.createElement("option");
    option.value = domain;
    option.textContent = domain;
    homeAssistantEntityDomain.append(option);
  }
  homeAssistantEntityDomain.value = selected === "all" || domains.includes(selected) ? selected : "all";
  renderEntityDomainShortcuts(domains);
}

function renderEntityDomainShortcuts(domains) {
  const selected = homeAssistantEntityDomain.value || "all";
  const shortcutDomains = listHomeAssistantEntityDomainShortcuts(domains);

  homeAssistantEntityDomainShortcuts.replaceChildren();
  for (const domain of shortcutDomains) {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.entityDomain = domain;
    button.textContent = domain === "all" ? "All" : domain;
    button.setAttribute("aria-pressed", String(domain === selected));
    button.title = domain === "all" ? "Show all entity types" : `Show ${domain} entities`;
    homeAssistantEntityDomainShortcuts.append(button);
  }
}

function usesStackEntitySelection() {
  return activeEditorMode === "simple"
    && haCardTarget.value !== "entities"
    && (haCardLayout.value === "horizontal-stack" || haCardLayout.value === "vertical-stack");
}

function reconcileStackEntitySelection() {
  const entityIds = trackedEntityIds();
  for (const entityId of [...stackSelectedEntityIds]) {
    if (!entityIds.includes(entityId)) {
      stackSelectedEntityIds.delete(entityId);
    }
  }
  if (stackSelectedEntityIds.size === 0) {
    for (const entityId of entityIds) {
      stackSelectedEntityIds.add(entityId);
    }
  }
}

function selectedStackEntityIds() {
  reconcileStackEntitySelection();
  return trackedEntityIds().filter(entityId => stackSelectedEntityIds.has(entityId));
}

function cardPreviewEntityIds() {
  return usesStackEntitySelection() ? selectedStackEntityIds() : trackedEntityIds();
}

function renderStackSelectionSummary() {
  const entityIds = trackedEntityIds();
  if (entityIds.length === 0) {
    stackSelectionSummary.textContent = emptyEntitySelectionMessage;
    return;
  }

  if (usesStackEntitySelection()) {
    const selectedIds = selectedStackEntityIds();
    stackSelectionSummary.textContent = `Stack-selected entities: ${selectedIds.length}/${entityIds.length}${selectedIds.length ? ` - ${selectedIds.join(", ")}` : ""}`;
    return;
  }

  stackSelectionSummary.textContent = entityIds[0]
    ? `Simple uses the first entity: ${entityIds[0]}`
    : "Simple uses the first entity.";
}

function renderEntityPickerOptions() {
  const selected = homeAssistantEntityPicker.value;
  renderEntityDomainOptions();
  const selectedDomain = homeAssistantEntityDomain.value;
  const searchTerm = homeAssistantEntitySearch.value;
  clearHomeAssistantEntitySearch.disabled = searchTerm.trim().length === 0;
  const entityEntries = filterHomeAssistantEntityCatalog(createEntityPickerCatalog(), {
    domain: selectedDomain,
    search: searchTerm,
  });
  const entityIds = entityEntries.map(entry => entry.entityId);

  homeAssistantEntityPicker.replaceChildren();
  for (const entry of entityEntries) {
    const option = document.createElement("option");
    option.value = entry.entityId;
    option.textContent = entry.label !== entry.entityId
      ? `${entry.label} (${entry.entityId})`
      : entry.entityId;
    homeAssistantEntityPicker.append(option);
  }
  homeAssistantEntityPicker.value = entityIds.includes(selected) ? selected : entityIds[0] ?? "";
  addHomeAssistantEntity.disabled = !homeAssistantEntityPicker.value;
  homeAssistantEntityPicker.disabled = entityIds.length === 0;
  const domainLabel = selectedDomain === "all" ? "all types" : selectedDomain;
  homeAssistantEntityPickerStatus.textContent = entityIds.length === 0
    ? `No entities found for ${domainLabel}${searchTerm.trim() ? ` and "${searchTerm.trim()}"` : ""}.`
    : `${entityIds.length} ${entityIds.length === 1 ? "entity" : "entities"} found for ${domainLabel}.`;
}

function addSelectedEntityFromPicker() {
  const entityId = homeAssistantEntityPicker.value.trim();
  if (!entityId) {
    statusMessage.textContent = "Select an entity first.";
    return;
  }
  if (usesStackEntitySelection()) {
    addEntityForStatusPreview(entityId);
    return;
  }
  if (activeEditorMode === "expert") {
    applyEntityToSelectedExpertField(entityId);
    return;
  }
  selectPrimaryEntity(entityId);
}

function refreshLiveEntityStates() {
  const client = connection?.getClient();
  const entityResult = client?.requestEntityStates();
  statusMessage.textContent = entityResult?.accepted
    ? `Entity list requested from Home Assistant (${entityResult.requestId}).`
    : entityResult?.reason ?? "Connect to Home Assistant before refreshing entities.";
  checkLiveLovelaceResources({ appendStatus: true });
}

function checkLiveLovelaceResources(options = {}) {
  const result = connection?.getClient()?.requestLovelaceResources();
  const message = result?.accepted
    ? `Lovelace resources requested (${result.requestId}).`
    : result?.reason ?? "Connect to Home Assistant before checking resources.";
  statusMessage.textContent = options.appendStatus
    ? `${statusMessage.textContent} ${message}`
    : message;
  if (result?.accepted) {
    lovelaceResourcesChecked = false;
    renderHaCardPreview();
  }
}

function normalizeLovelaceResourceUrl(resource) {
  const url = typeof resource === "string" ? resource : resource?.url;
  return typeof url === "string" ? url.split("?")[0].toLowerCase() : "";
}

function formatLovelaceResourceLabel(url) {
  const fileName = url.split("/").filter(Boolean).pop() ?? url;
  return fileName.replace(/\.js$/i, "").replace(/[-_]+/g, " ");
}

function createLovelaceResourcePaletteId(url, index) {
  const slug = url.replace(/^https?:\/\//, "").replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase();
  return `ha-resource-${slug || index}`;
}

function isHacsLovelaceResourceUrl(url) {
  return url.includes("/hacsfiles/");
}

const ignoredLovelaceResourceTerms = [
  "card-mad",
  "card-tools",
  "wallpanel",
  "lovelace-buuble-room",
  "lovelace-bubble-room",
  "mushroom-strategy",
  "ha-dashboard",
  "swipe-navigation",
  "auto-entities",
  "floorplan",
  "view-assistant",
  "sidebar-card",
  "cardbuilder.zip",
  "icon",
  "andy",
];

function normalizeLovelaceResourceSearchText(url) {
  return url.replace(/[^a-z0-9.]+/g, "-");
}

function shouldIgnoreLovelaceResourceUrl(url) {
  const normalizedUrl = normalizeLovelaceResourceSearchText(url);
  return ignoredLovelaceResourceTerms.some(term => normalizedUrl.includes(term));
}

function isMappedLovelaceResourceUrl(url) {
  return url.includes("/bubble-card/")
    || url.includes("bubble-card.js")
    || url.includes("/lovelace-mushroom/")
    || url.includes("mushroom.js");
}

function createScannedExpertPaletteCards(resources) {
  const urls = [...new Set(resources.map(normalizeLovelaceResourceUrl).filter(Boolean))]
    .filter(url => !shouldIgnoreLovelaceResourceUrl(url));

  const resourceCards = urls
    .filter(url => !url.includes("/atlas/") && !url.includes("atlas-card") && !isMappedLovelaceResourceUrl(url))
    .map((url, index) => ({
      id: createLovelaceResourcePaletteId(url, index),
      category: isHacsLovelaceResourceUrl(url) ? "HACS resource" : "HA resource",
      label: formatLovelaceResourceLabel(url),
      templateId: "entity-list",
      target: "entities",
      preview: [url],
      resourceUrl: url,
      disabled: true,
      scanned: true,
    }));

  return dedupeExpertPaletteCards(resourceCards);
}

function dedupeExpertPaletteCards(cards) {
  const seen = new Set();
  return cards.filter(card => {
    const key = card.resourceUrl
      ? `resource:${normalizeLovelaceResourceSearchText(card.resourceUrl)}`
      : `${card.category}:${card.label}:${card.templateId}:${card.target}:${card.bubbleButtonType ?? ""}`.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function refreshScannedExpertPaletteCards() {
  const staticCards = expertPaletteCards.filter(card => !card.scanned);
  const scannedCards = createScannedExpertPaletteCards(lovelaceResources);
  expertPaletteCards = dedupeExpertPaletteCards([...staticCards, ...scannedCards]);
  return {
    total: scannedCards.length,
    hacs: scannedCards.filter(card => card.resourceUrl && isHacsLovelaceResourceUrl(card.resourceUrl)).length,
  };
}

function scanExpertPaletteCardsFromHomeAssistant() {
  const detectedCards = refreshScannedExpertPaletteCards();
  expertPaletteShowAllCards = true;
  renderExpertTemplatePalette();
  const clientReady = Boolean(connection?.getClient());
  if (clientReady) {
    checkLiveLovelaceResources({ appendStatus: true });
  }
  const scanMessage = detectedCards.total
    ? `${detectedCards.total} palette entries detected from loaded HA resources, including ${detectedCards.hacs} /hacsfiles resources.`
    : "No additional scan-only palette entries detected from loaded HA resources.";
  statusMessage.textContent = clientReady
    ? `${scanMessage} Refreshing Lovelace resources from Home Assistant.`
    : `${scanMessage} Connect to Home Assistant and scan again to refresh the list.`;
}

function createHaCardConfig() {
  const group = panelGroups.find(candidate => candidate.id === homeAssistantGroup.value);
  return createHomeAssistantCardConfiguration({
    target: haCardTarget.value,
    layout: haCardLayout.value,
    title: group?.title ?? (homeAssistantGroupName.value.trim() || "ATLAS panel"),
    entityIds: cardPreviewEntityIds(),
  });
}

function createExpertHaCardConfig() {
  return createHomeAssistantCardEditorConfiguration({
    cardName: homeAssistantGroupName.value.trim() || "ATLAS Expert card",
    editorMode: "expert",
    fields: expertEditorFields,
  });
}

function createActiveHaCardConfig() {
  return activeEditorMode === "expert" ? createExpertHaCardConfig() : createHaCardConfig();
}

function currentHaCardExportName() {
  const group = panelGroups.find(candidate => candidate.id === homeAssistantGroup.value);
  return group?.title ?? (homeAssistantGroupName.value.trim() || "ATLAS Home Assistant card");
}

function renderHaCardPreview() {
  if (cardPreviewEntityIds().length === 0) {
    haCardPreview.textContent = emptyEntitySelectionMessage;
    haCardDependency.dataset.required = "false";
    haCardDependency.dataset.status = "not-required";
    haCardDependency.textContent = emptyEntitySelectionMessage;
    copyHaCardResources.disabled = true;
    return;
  }

  const card = createHaCardConfig();
  haCardPreview.textContent = serializeHomeAssistantEntitiesCardConfiguration(card, haCardFormat.value);
  renderHaCardDependency(card);
}

function renderHaCardDependency(card) {
  const dependency = inspectHomeAssistantCardDependency(card);
  const availability = inspectHomeAssistantCardDependencyAvailability(card, lovelaceResources);
  const integrationPlan = createHomeAssistantAtlasFrontendIntegrationPlan({
    mode: "server",
    card,
    resources: lovelaceResources,
  });
  haCardDependency.dataset.required = String(dependency.required);
  haCardDependency.dataset.status = lovelaceResourcesChecked
    ? integrationPlan.ready ? "installed" : "missing"
    : dependency.required ? "unchecked" : "not-required";
  copyHaCardResources.disabled = false;
  const resourceHint = dependency.resourcePaths.length ? ` Resource: ${dependency.resourcePaths.join(", ")}.` : "";
  const installHint = dependency.installPaths.length ? ` Install path: ${dependency.installPaths.join(", ")}.` : "";
  const atlasHint = ` ATLAS frontend: ${integrationPlan.atlasResource.resourcePaths.join(", ")}.`;
  if (!dependency.required) {
    haCardDependency.textContent = `Uses built-in Home Assistant card.${atlasHint}`;
  } else if (!lovelaceResourcesChecked) {
    haCardDependency.textContent = `Requires ${dependency.label}.${resourceHint}${installHint}${atlasHint} Connect to Home Assistant or check resources.`;
  } else if (integrationPlan.ready) {
    haCardDependency.textContent = `${dependency.label} and ATLAS frontend resources found.${resourceHint}${atlasHint}`;
  } else if (availability.status === "installed") {
    haCardDependency.textContent = `${dependency.label} resource found.${resourceHint}${atlasHint} Missing ATLAS frontend: ${integrationPlan.atlasAvailability.missingResourcePaths.join(", ")}.`;
  } else {
    haCardDependency.textContent = `Requires ${dependency.label}.${resourceHint}${installHint}${atlasHint} Missing: ${[
      ...integrationPlan.atlasAvailability.missingResourcePaths,
      ...availability.missingResourcePaths,
    ].join(", ")}.`;
  }
}

function renderHaCardImportDecision(text) {
  const decision = decideHomeAssistantCardArtifactImport(text);
  haCardImportReview.dataset.action = decision.action;

  if (decision.action === "import") {
    haCardImportReview.textContent = decision.message;
    return decision;
  }

  if (decision.action === "review") {
    haCardImportReview.textContent = formatHomeAssistantCardArtifactReviewLines(text).join("\n");
    return decision;
  }

  haCardImportReview.textContent = `${decision.message} ${decision.inspection.reason}`;
  return decision;
}

function renderExpertTemplatePalette() {
  expertTemplatePalette.replaceChildren();
  const visibleCards = expertPaletteFavoriteIds.size && !expertPaletteShowAllCards
    ? expertPaletteCards.filter(card => expertPaletteFavoriteIds.has(card.id))
    : expertPaletteCards;
  saveExpertPaletteFavorites.disabled = !isExpertPaletteFavoriteDraftDirty();
  showAllExpertPaletteCards.disabled = expertPaletteFavoriteIds.size === 0;
  showAllExpertPaletteCards.textContent = expertPaletteShowAllCards ? "Show favorites" : "Show all cards";
  resetExpertPaletteFavorites.disabled = expertPaletteFavoriteIds.size === 0;
  for (const card of visibleCards) {
    const template = cardEditorTemplates.find(candidate => candidate.id === card.templateId);
    if (!template) continue;
    const item = document.createElement("article");
    item.className = "expert-template-card";
    item.classList.toggle("selected", isExpertPaletteCardSelected(card));
    item.classList.toggle("disabled", card.disabled === true);
    item.draggable = card.disabled !== true;
    item.tabIndex = 0;
    item.setAttribute("role", "button");
    item.setAttribute("aria-disabled", String(card.disabled === true));
    item.dataset.paletteCard = card.id;

    const main = document.createElement("div");
    main.className = "expert-template-main";
    const meta = document.createElement("div");
    meta.className = "expert-template-meta";
    const category = document.createElement("span");
    category.className = "palette-category";
    category.textContent = card.category;
    const title = document.createElement("strong");
    title.textContent = card.label;
    const detail = document.createElement("small");
    const bubbleType = card.target === "bubble" ? `, ${card.bubbleButtonType}` : "";
    detail.textContent = card.disabled === true
      ? `${card.category} registered, not mapped yet`
      : `${template.layout}, ${template.defaultWidth}x${template.defaultHeight}, ${card.target}${bubbleType}`;
    const preview = document.createElement("span");
    preview.textContent = card.preview.join(" / ");
    const availability = document.createElement("span");
    availability.textContent = card.disabled === true ? "Scanned only" : formatExpertTemplateAvailability(card.target);

    main.append(category, title);
    meta.append(detail, preview, availability);
    const favorite = document.createElement("label");
    favorite.className = "favorite-toggle";
    const favoriteCheckbox = document.createElement("input");
    favoriteCheckbox.type = "checkbox";
    favoriteCheckbox.checked = expertPaletteDraftFavoriteIds.has(card.id);
    favorite.append(favoriteCheckbox, "Favorite");
    main.append(favorite);
    favorite.addEventListener("click", event => event.stopPropagation());
    favoriteCheckbox.addEventListener("change", event => {
      event.stopPropagation();
      setExpertPaletteFavoriteDraft(card.id, favoriteCheckbox.checked);
    });

    if (card.disabled !== true) {
      const sizing = createExpertTemplateSizingControls(template);
      meta.append(sizing);
    }
    item.append(main, meta);

    item.addEventListener("click", () => {
      if (card.disabled === true) {
        statusMessage.textContent = `${card.label} is registered in Home Assistant, but ATLAS does not map this custom card yet.`;
        return;
      }
      selectExpertPaletteCard(card.id);
    });
    item.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        if (card.disabled === true) {
          statusMessage.textContent = `${card.label} is registered in Home Assistant, but ATLAS does not map this custom card yet.`;
          return;
        }
        selectExpertPaletteCard(card.id);
      }
    });
    item.addEventListener("dragstart", event => {
      if (card.disabled === true) {
        event.preventDefault();
        return;
      }
      event.dataTransfer?.setData("text/plain", card.templateId);
      event.dataTransfer?.setData("application/x-atlas-template", card.templateId);
      event.dataTransfer?.setData("application/x-atlas-palette-card", card.id);
      event.dataTransfer?.setDragImage(item, 12, 12);
      item.classList.add("dragging");
    });
    item.addEventListener("dragend", () => {
      item.classList.remove("dragging");
    });
    expertTemplatePalette.append(item);
  }
}

function isExpertPaletteFavoriteDraftDirty() {
  if (expertPaletteDraftFavoriteIds.size !== expertPaletteFavoriteIds.size) return true;
  for (const cardId of expertPaletteDraftFavoriteIds) {
    if (!expertPaletteFavoriteIds.has(cardId)) return true;
  }
  return false;
}

function isExpertPaletteCardSelected(card) {
  return expertTemplate.value === card.templateId
    && expertTarget.value === card.target
    && (card.target !== "bubble" || expertBubbleButtonType.value === (card.bubbleButtonType ?? "state"));
}

function setExpertPaletteFavoriteDraft(cardId, favorite) {
  if (favorite) {
    expertPaletteDraftFavoriteIds.add(cardId);
  } else {
    expertPaletteDraftFavoriteIds.delete(cardId);
  }
  renderExpertTemplatePalette();
  statusMessage.textContent = "Favorite selection changed. Use Save favorites to apply it.";
}

function toggleExpertPaletteAllCards() {
  expertPaletteShowAllCards = !expertPaletteShowAllCards;
  renderExpertTemplatePalette();
  statusMessage.textContent = expertPaletteShowAllCards
    ? "Full Core and Community card list is visible for favorite selection."
    : "Saved favorites are visible.";
}

function saveExpertPaletteFavoriteSelection() {
  expertPaletteFavoriteIds.clear();
  for (const cardId of expertPaletteDraftFavoriteIds) {
    expertPaletteFavoriteIds.add(cardId);
  }
  expertPaletteShowAllCards = false;
  persistConfiguration();
  renderExpertTemplatePalette();
  statusMessage.textContent = expertPaletteFavoriteIds.size
    ? `${expertPaletteFavoriteIds.size} favorite cards saved.`
    : "Favorite selection saved. All cards remain visible.";
}

function resetExpertPaletteFavoriteSelection() {
  expertPaletteFavoriteIds.clear();
  expertPaletteDraftFavoriteIds.clear();
  expertPaletteShowAllCards = false;
  persistConfiguration();
  renderExpertTemplatePalette();
  statusMessage.textContent = "All Core and Community cards are visible again.";
}

function createExpertTemplateSizingControls(template) {
  const sizing = expertTemplateSizing.get(template.id) ?? { columns: String(template.defaultWidth), rows: "auto" };
  const controls = document.createElement("span");
  controls.className = "expert-template-sizing";

  const columns = document.createElement("select");
  columns.setAttribute("aria-label", `${template.label} columns`);
  for (let index = 1; index <= expertGridColumns; index += 1) {
    const option = document.createElement("option");
    option.value = String(index);
    option.textContent = `${index} col`;
    columns.append(option);
  }
  const full = document.createElement("option");
  full.value = "full";
  full.textContent = "full";
  columns.append(full);
  columns.value = sizing.columns;

  const rows = document.createElement("select");
  rows.setAttribute("aria-label", `${template.label} rows`);
  const auto = document.createElement("option");
  auto.value = "auto";
  auto.textContent = "auto";
  rows.append(auto);
  for (let index = 1; index <= 8; index += 1) {
    const option = document.createElement("option");
    option.value = String(index);
    option.textContent = `${index} row`;
    rows.append(option);
  }
  rows.value = sizing.rows;

  const update = () => {
    expertTemplateSizing.set(template.id, {
      columns: columns.value,
      rows: rows.value,
    });
    if (expertTemplate.value === template.id) {
      syncExpertInputsFromTemplateSizing(template.id);
    }
  };
  for (const control of [columns, rows]) {
    control.addEventListener("click", event => event.stopPropagation());
    control.addEventListener("mousedown", event => event.stopPropagation());
    control.addEventListener("dragstart", event => event.stopPropagation());
    control.addEventListener("change", update);
  }

  controls.append(columns, rows);
  return controls;
}

function formatExpertTemplateAvailability(target) {
  const dependency = inspectHomeAssistantCardDependency(target);
  if (!dependency.required) return "Built-in";
  if (!lovelaceResourcesChecked) return "Resource unchecked";
  const availability = inspectHomeAssistantCardDependencyAvailability(target, lovelaceResources);
  return availability.status === "installed" ? "Resource installed" : "Resource missing";
}

function selectExpertTemplate(templateId) {
  const template = cardEditorTemplates.find(candidate => candidate.id === templateId);
  if (!template) return;
  expertTemplate.value = template.id;
  syncExpertInputsFromTemplateSizing(template.id);
  expertTarget.value = template.target;
  syncExpertBubbleTypeControl();
  renderExpertTemplatePalette();
}

function selectExpertPaletteCard(cardId) {
  const card = expertPaletteCards.find(candidate => candidate.id === cardId);
  const template = cardEditorTemplates.find(candidate => candidate.id === card?.templateId);
  if (!card || !template) return undefined;
  if (card.disabled === true) {
    statusMessage.textContent = `${card.label} is registered in Home Assistant, but ATLAS does not map this custom card yet.`;
    return undefined;
  }
  expertTemplate.value = template.id;
  syncExpertInputsFromTemplateSizing(template.id);
  expertTarget.value = card.target;
  expertBubbleButtonType.value = card.bubbleButtonType ?? "state";
  syncExpertBubbleTypeControl();
  renderExpertTemplatePalette();
  statusMessage.textContent = `${card.label} selected from the card list.`;
  return card;
}

function syncExpertInputsFromTemplateSizing(templateId) {
  const template = cardEditorTemplates.find(candidate => candidate.id === templateId);
  if (!template) return;
  const sizing = expertTemplateSizing.get(templateId) ?? { columns: String(template.defaultWidth), rows: "auto" };
  expertWidth.value = sizing.columns === "full" ? String(expertGridColumns) : sizing.columns;
  expertHeight.value = sizing.rows === "auto" ? String(template.defaultHeight) : sizing.rows;
}

function renderExpertFieldList() {
  expertFieldList.replaceChildren();
  renderExpertEditButton();
  if (expertEditorFields.length === 0) {
    const empty = document.createElement("p");
    empty.textContent = "No expert fields added.";
    expertFieldList.append(empty);
    return;
  }

  expertEditorFields.forEach((field, index) => {
    const item = document.createElement("div");
    item.className = "expert-field-row";
    item.classList.toggle("selected", index === selectedExpertFieldIndex);
    const text = document.createElement("span");
    const bubbleType = field.target === "bubble" ? `, ${field.bubbleButtonType ?? "state"}` : "";
    text.textContent = `${field.id}: ${field.target}${bubbleType}, ${field.layout ?? "card"}, ${field.width}x${field.height}, ${field.entityId || "demo entity"}, c${field.column + 1}/r${field.row + 1}`;
    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "icon-button";
    remove.textContent = "🗑";
    remove.title = `Remove ${field.id}`;
    remove.setAttribute("aria-label", `Remove ${field.id}`);
    remove.addEventListener("click", event => {
      event.stopPropagation();
      expertEditorFields.splice(index, 1);
      if (selectedExpertFieldIndex === index) {
        selectedExpertFieldIndex = -1;
        expertFieldEditing = false;
      } else if (selectedExpertFieldIndex > index) {
        selectedExpertFieldIndex -= 1;
      }
      renderExpertEditorPreview();
      statusMessage.textContent = `${field.id} removed from the Expert editor preview.`;
    });
    item.addEventListener("click", () => {
      selectExpertEditorField(index);
    });
    item.append(text, remove);
    expertFieldList.append(item);
  });
}

function formatEntityIdAsTitle(entityId) {
  const localName = entityId.includes(".") ? entityId.split(".").slice(1).join(".") : entityId;
  return localName
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, character => character.toUpperCase());
}

function currentExpertEntityTitle(entityId = expertEntity.value.trim() || currentEntityId()) {
  const entity = entitySnapshots.get(entityId);
  if (entity) {
    return createHomeAssistantEntityPresentation(entity).label;
  }
  return formatEntityIdAsTitle(entityId) || entityId;
}

function updateSelectedExpertFieldTitle(title) {
  const field = expertEditorFields[selectedExpertFieldIndex];
  const nextTitle = title.trim();
  if (!nextTitle) {
    statusMessage.textContent = "Enter a title before applying it.";
    return false;
  }
  if (!field) {
    statusMessage.textContent = `${nextTitle} prepared for the next Expert field.`;
    return false;
  }
  expertEditorFields[selectedExpertFieldIndex] = {
    ...field,
    id: nextTitle,
    entries: renameExpertFieldEntries(field, nextTitle),
  };
  renderExpertEditorPreview();
  statusMessage.textContent = `${nextTitle} set as Expert field title.`;
  return true;
}

function renameExpertFieldEntries(field, title) {
  if ((field.layout ?? "card") === "card" || !field.entries?.length) return field.entries;
  return field.entries.map((entry, index) => ({
    ...entry,
    id: field.entries.length === 1 ? title : `${title} ${index + 1}`,
    ...(entry.target === "bubble" ? { bubbleButtonType: entry.bubbleButtonType ?? "state" } : {}),
  }));
}

function updateSelectedExpertFieldTarget() {
  syncExpertBubbleTypeControl();
  const field = expertEditorFields[selectedExpertFieldIndex];
  if (!field) return;
  const nextTarget = expertTarget.value;
  const nextBubbleButtonType = nextTarget === "bubble" ? expertBubbleButtonType.value : undefined;
  expertEditorFields[selectedExpertFieldIndex] = {
    ...field,
    target: nextTarget,
    ...(nextBubbleButtonType ? { bubbleButtonType: nextBubbleButtonType } : { bubbleButtonType: undefined }),
    entries: (field.entries ?? []).map(entry => ({
      ...entry,
      target: nextTarget,
      ...(nextBubbleButtonType ? { bubbleButtonType: nextBubbleButtonType } : { bubbleButtonType: undefined }),
    })),
  };
  renderExpertEditorPreview();
  statusMessage.textContent = `${field.id} card family updated to ${nextTarget}.`;
}

function updateSelectedExpertFieldBubbleType() {
  const field = expertEditorFields[selectedExpertFieldIndex];
  if (!field || expertTarget.value !== "bubble") return;
  expertEditorFields[selectedExpertFieldIndex] = {
    ...field,
    bubbleButtonType: expertBubbleButtonType.value,
    entries: (field.entries ?? []).map(entry => ({
      ...entry,
      bubbleButtonType: expertBubbleButtonType.value,
    })),
  };
  renderExpertEditorPreview();
  statusMessage.textContent = `${field.id} Bubble button type set to ${expertBubbleButtonType.value}.`;
}

function getExpertFieldResizeBase(field) {
  return {
    width: Math.max(1, Math.floor(Number(field.resizeBaseWidth ?? field.width))),
    height: Math.max(1, Math.floor(Number(field.resizeBaseHeight ?? field.height))),
  };
}

function getExpertFieldResizeLimit(field) {
  const base = getExpertFieldResizeBase(field);
  return {
    width: Math.min(expertGridColumns, base.width + expertFieldMaxResizeDelta),
    height: Math.min(expertGridRows, base.height + expertFieldMaxResizeDelta),
  };
}

function clampExpertFieldSpan(value, fallback, limit) {
  const numericValue = Number(value);
  const nextValue = Number.isFinite(numericValue) ? Math.floor(numericValue) : fallback;
  return Math.max(1, Math.min(limit, nextValue));
}

function clampExpertFieldOffset(value, fallback, max) {
  const numericValue = Number(value);
  const nextValue = Number.isFinite(numericValue) ? Math.floor(numericValue) : fallback;
  return Math.max(0, Math.min(max, nextValue));
}

function updateSelectedExpertFieldGeometry() {
  const field = expertEditorFields[selectedExpertFieldIndex];
  if (!field) {
    statusMessage.textContent = "Select an Expert field before changing its size.";
    return false;
  }

  const base = getExpertFieldResizeBase(field);
  const limit = getExpertFieldResizeLimit(field);
  const width = clampExpertFieldSpan(expertWidth.value, field.width, limit.width);
  const height = clampExpertFieldSpan(expertHeight.value, field.height, limit.height);
  const column = clampExpertFieldOffset(expertColumn.value, field.column, expertGridColumns - width);
  const row = clampExpertFieldOffset(expertRow.value, field.row, expertGridRows - height);
  expertEditorFields[selectedExpertFieldIndex] = {
    ...field,
    column,
    row,
    width,
    height,
    resizeBaseWidth: base.width,
    resizeBaseHeight: base.height,
  };
  expertColumn.value = String(column);
  expertRow.value = String(row);
  expertWidth.value = String(width);
  expertHeight.value = String(height);
  renderExpertEditorPreview();
  statusMessage.textContent = `${field.id} resized to ${width}x${height}.`;
  return true;
}

function applyEntityToSelectedExpertField(entityId) {
  const title = currentExpertEntityTitle(entityId);
  expertEntity.value = entityId;
  expertTitle.value = title;
  const field = expertEditorFields[selectedExpertFieldIndex];
  if (!field) {
    statusMessage.textContent = `${entityId} prepared for the next Expert field.`;
    return false;
  }

  const entries = (field.layout ?? "card") === "card"
    ? field.entries
    : [{ id: title, target: field.target, bubbleButtonType: field.bubbleButtonType, entityId }];
  expertEditorFields[selectedExpertFieldIndex] = {
    ...field,
    id: title,
    entityId,
    entries,
  };
  renderExpertEditorPreview();
  statusMessage.textContent = `${entityId} assigned to ${title}.`;
  return true;
}

function renderExpertEditButton() {
  if (selectedExpertFieldIndex < 0 || !expertEditorFields[selectedExpertFieldIndex]) {
    editExpertField.disabled = true;
    editExpertField.textContent = "Edit selected";
    editExpertField.setAttribute("aria-pressed", "false");
    return;
  }

  editExpertField.disabled = false;
  editExpertField.textContent = expertFieldEditing ? "Stop editing" : "Edit selected";
  editExpertField.setAttribute("aria-pressed", String(expertFieldEditing));
}

function selectExpertEditorField(index) {
  const field = expertEditorFields[index];
  if (!field) return;
  selectedExpertFieldIndex = index;
  const limit = getExpertFieldResizeLimit(field);
  expertColumn.value = String(field.column);
  expertRow.value = String(field.row);
  expertWidth.value = String(field.width);
  expertHeight.value = String(field.height);
  expertWidth.max = String(limit.width);
  expertHeight.max = String(limit.height);
  expertTarget.value = field.target;
  expertBubbleButtonType.value = field.bubbleButtonType ?? "state";
  syncExpertBubbleTypeControl();
  expertTitle.value = field.id;
  expertEntity.value = field.entityId;
  renderExpertFieldList();
  renderExpertEditorSurface();
  statusMessage.textContent = `${field.id} selected on the Expert editor surface.`;
}

function toggleExpertFieldEditing() {
  const field = expertEditorFields[selectedExpertFieldIndex];
  if (!field) {
    expertFieldEditing = false;
    renderExpertEditButton();
    statusMessage.textContent = "Select an Expert field before editing.";
    return;
  }

  expertFieldEditing = !expertFieldEditing;
  renderExpertEditButton();
  renderExpertEditorSurface();
  statusMessage.textContent = expertFieldEditing
    ? `${field.id} editing handles enabled.`
    : `${field.id} editing handles hidden.`;
}

function renderExpertEditorSurface() {
  expertEditorDropzone.replaceChildren();
  const grid = document.createElement("div");
  grid.className = "expert-surface-grid";
  if (expertEditorFields.length === 0) {
    const empty = document.createElement("p");
    empty.textContent = "Drag a card from the left into this editor surface.";
    grid.append(empty);
    expertEditorDropzone.append(grid);
    return;
  }

  expertEditorFields.forEach((field, index) => {
    const tile = document.createElement("div");
    tile.tabIndex = 0;
    tile.className = "expert-surface-field";
    tile.classList.toggle("selected", index === selectedExpertFieldIndex);
    tile.classList.toggle("editing", index === selectedExpertFieldIndex && expertFieldEditing);
    tile.setAttribute("role", "button");
    tile.setAttribute("aria-label", `${field.id} on column ${field.column + 1}, row ${field.row + 1}`);
    tile.setAttribute("aria-pressed", String(index === selectedExpertFieldIndex));
    tile.draggable = true;
    tile.style.gridColumn = `${field.column + 1} / span ${Math.min(expertGridColumns, field.width)}`;
    tile.style.gridRow = `${field.row + 1} / span ${Math.min(expertGridRows, field.height)}`;
    const title = document.createElement("strong");
    title.textContent = field.id;
    const target = document.createElement("span");
    target.textContent = field.target;
    const entity = document.createElement("small");
    entity.textContent = field.entityId || "demo entity";
    tile.append(title, target, entity);
    tile.addEventListener("click", () => {
      selectExpertEditorField(index);
    });
    tile.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectExpertEditorField(index);
      }
    });
    tile.addEventListener("dragstart", event => {
      event.dataTransfer?.setData("application/x-atlas-field-index", String(index));
      tile.classList.add("dragging");
    });
    tile.addEventListener("dragend", () => {
      tile.classList.remove("dragging");
    });
    if (index === selectedExpertFieldIndex && expertFieldEditing) {
      const handle = document.createElement("span");
      handle.className = "expert-resize-handle";
      handle.dataset.corner = "se";
      handle.setAttribute("aria-hidden", "true");
      handle.addEventListener("pointerdown", event => {
        startExpertFieldResize(event, index, "se", tile);
      });
      tile.append(handle);
    }
    grid.append(tile);
  });
  expertEditorDropzone.append(grid);
}

function startExpertFieldResize(event, index, corner, tile) {
  const field = expertEditorFields[index];
  if (!field) return;
  event.preventDefault();
  event.stopPropagation();
  tile.draggable = false;
  const grid = tile.closest(".expert-surface-grid");
  const gridBounds = grid.getBoundingClientRect();
  const starting = {
    column: field.column,
    row: field.row,
    width: field.width,
    height: field.height,
  };
  const base = getExpertFieldResizeBase(field);
  const limit = getExpertFieldResizeLimit(field);

  const pointerToGridCell = pointerEvent => ({
    column: Math.max(0, Math.min(expertGridColumns - 1, Math.floor(((pointerEvent.clientX - gridBounds.left) / gridBounds.width) * expertGridColumns))),
    row: Math.max(0, Math.min(expertGridRows - 1, Math.floor(((pointerEvent.clientY - gridBounds.top) / gridBounds.height) * expertGridRows))),
  });

  const applyResize = pointerEvent => {
    const pointer = pointerToGridCell(pointerEvent);
    const next = { ...starting };
    if (corner.includes("e")) {
      const right = Math.max(starting.column + 1, Math.min(expertGridColumns, pointer.column + 1));
      next.width = right - starting.column;
    }
    if (corner.includes("s")) {
      const bottom = Math.max(starting.row + 1, Math.min(expertGridRows, pointer.row + 1));
      next.height = bottom - starting.row;
    }
    if (corner.includes("w")) {
      next.column = Math.max(0, Math.min(starting.column + starting.width - 1, pointer.column));
      next.width = starting.column + starting.width - next.column;
    }
    if (corner.includes("n")) {
      next.row = Math.max(0, Math.min(starting.row + starting.height - 1, pointer.row));
      next.height = starting.row + starting.height - next.row;
    }
    if (next.width > limit.width) {
      if (corner.includes("w")) {
        next.column = Math.max(0, starting.column + starting.width - limit.width);
      }
      next.width = limit.width;
    }
    if (next.height > limit.height) {
      if (corner.includes("n")) {
        next.row = Math.max(0, starting.row + starting.height - limit.height);
      }
      next.height = limit.height;
    }
    next.column = Math.max(0, Math.min(expertGridColumns - next.width, next.column));
    next.row = Math.max(0, Math.min(expertGridRows - next.height, next.row));

    expertEditorFields[index] = {
      ...field,
      column: next.column,
      row: next.row,
      width: next.width,
      height: next.height,
      resizeBaseWidth: base.width,
      resizeBaseHeight: base.height,
    };
    expertColumn.value = String(next.column);
    expertRow.value = String(next.row);
    expertWidth.value = String(next.width);
    expertHeight.value = String(next.height);
    tile.style.gridColumn = `${next.column + 1} / span ${next.width}`;
    tile.style.gridRow = `${next.row + 1} / span ${next.height}`;
  };

  const finishResize = () => {
    window.removeEventListener("pointermove", applyResize);
    window.removeEventListener("pointerup", finishResize);
    tile.draggable = true;
    renderExpertEditorPreview();
    const resizedField = expertEditorFields[index];
    statusMessage.textContent = `${resizedField.id} resized to ${resizedField.width}x${resizedField.height}.`;
  };

  window.addEventListener("pointermove", applyResize);
  window.addEventListener("pointerup", finishResize, { once: true });
}

function renderExpertEditorPreview() {
  if (expertEditorFields.length === 0) {
    expertEditorSummary.textContent = "Expert fields: 0.";
    expertEditorPreview.textContent = "Add a template field to preview the Expert editor output.";
    if (activeEditorMode === "expert") {
      haCardDependency.textContent = "Add a template field before exporting an Expert HA card.";
      haCardDependency.dataset.required = "false";
      haCardDependency.dataset.status = "not-required";
      copyHaCardResources.disabled = true;
    }
    renderExpertFieldList();
    renderExpertEditorSurface();
    return;
  }

  const card = createExpertHaCardConfig();
  expertEditorSummary.textContent = `Expert fields: ${expertEditorFields.length}.`;
  expertEditorPreview.textContent = serializeHomeAssistantEntitiesCardConfiguration(card, haCardFormat.value);
  if (activeEditorMode === "expert") renderHaCardDependency(card);
  renderExpertFieldList();
  renderExpertEditorSurface();
}

function addExpertEditorField() {
  const entityId = expertEntity.value.trim() || currentEntityId();
  const sizing = resolveExpertTemplateSizing(expertTemplate.value);
  const fieldTitle = expertTitle.value.trim() || undefined;
  const field = createExpertEditorField({
    templateId: expertTemplate.value,
    entityId,
    title: fieldTitle,
    column: Number(expertColumn.value),
    row: Number(expertRow.value),
    width: sizing.width,
    height: sizing.height,
  });
  expertEditorFields.push(field);
  selectedExpertFieldIndex = expertEditorFields.length - 1;
  expertFieldEditing = false;
  expertTitle.value = field.id;
  expertEntity.value = "";
  renderExpertEditorPreview();
  statusMessage.textContent = `${field.id} added to the Expert editor preview.`;
}

function createExpertEditorField(input) {
  const template = cardEditorTemplates.find(candidate => candidate.id === input.templateId);
  const supportsMultipleEntries = template?.layout === "horizontal-stack"
    || template?.layout === "vertical-stack"
    || template?.layout === "grid";
  const stackEntityIds = supportsMultipleEntries
    ? selectedStackEntityIds()
    : [];
  const width = template?.layout === "horizontal-stack"
    ? Math.min(expertGridColumns, Math.max(1, input.width) * Math.max(1, stackEntityIds.length))
    : input.width;
  const field = createHomeAssistantCardEditorFieldFromTemplate({
    template: input.templateId,
    target: expertTarget.value,
    bubbleButtonType: expertTarget.value === "bubble" ? expertBubbleButtonType.value : undefined,
    entityId: input.entityId,
    id: input.title ?? `${expertTemplate.options[expertTemplate.selectedIndex]?.textContent ?? "Field"} ${expertEditorFields.length + 1}`,
    column: input.column,
    row: input.row,
    width,
    height: input.height,
  });
  const fieldWithResizeBase = {
    ...field,
    resizeBaseWidth: field.width,
    resizeBaseHeight: field.height,
    templateId: input.templateId,
  };
  if (stackEntityIds.length > 1 && field.layout !== "card") {
    return {
      ...fieldWithResizeBase,
      entityId: "",
      entries: stackEntityIds.map((entityId, index) => ({
        id: `${field.id} ${index + 1}`,
        target: expertTarget.value,
        ...(expertTarget.value === "bubble" ? { bubbleButtonType: expertBubbleButtonType.value } : {}),
        entityId,
      })),
    };
  }
  return {
    ...fieldWithResizeBase,
    entries: renameExpertFieldEntries(field, field.id),
  };
}

function addExpertEditorFieldFromTemplate(templateId, placement = calculateExpertDropPlacement(), options = {}) {
  if (!options.preserveSelection) {
    selectExpertTemplate(templateId);
  }
  const sizing = resolveExpertTemplateSizing(templateId);
  const fieldTitle = expertTitle.value.trim() || undefined;
  const field = createExpertEditorField({
    templateId,
    entityId: expertEntity.value.trim() || currentEntityId(),
    title: fieldTitle,
    column: placement.column,
    row: placement.row,
    width: sizing.width,
    height: sizing.height,
  });
  expertEditorFields.push(field);
  selectedExpertFieldIndex = expertEditorFields.length - 1;
  expertFieldEditing = false;
  expertTitle.value = field.id;
  expertEntity.value = "";
  renderExpertEditorPreview();
  statusMessage.textContent = `${field.id} placed on the Expert editor surface.`;
}

function addExpertEditorFieldFromPaletteCard(cardId, placement = calculateExpertDropPlacement()) {
  const card = selectExpertPaletteCard(cardId);
  if (!card) return;
  addExpertEditorFieldFromTemplate(card.templateId, placement, { preserveSelection: true });
}

function resolveExpertTemplateSizing(templateId) {
  const template = cardEditorTemplates.find(candidate => candidate.id === templateId);
  const sizing = expertTemplateSizing.get(templateId);
  return {
    width: sizing?.columns === "full" ? expertGridColumns : Number(sizing?.columns ?? template?.defaultWidth ?? expertWidth.value),
    height: sizing?.rows === "auto" ? template?.defaultHeight ?? Number(expertHeight.value) : Number(sizing?.rows ?? expertHeight.value),
  };
}

function calculateExpertDropPlacement(event) {
  if (!event) {
    return {
      column: Number(expertColumn.value),
      row: Number(expertRow.value),
    };
  }
  const bounds = expertEditorDropzone.getBoundingClientRect();
  const column = Math.max(0, Math.min(expertGridColumns - 1, Math.floor(((event.clientX - bounds.left) / bounds.width) * expertGridColumns)));
  const row = Math.max(0, Math.min(expertGridRows - 1, Math.floor(((event.clientY - bounds.top) / bounds.height) * expertGridRows)));
  return { column, row };
}

function moveExpertEditorField(index, placement) {
  const field = expertEditorFields[index];
  if (!field) return;
  expertEditorFields[index] = {
    ...field,
    column: Math.max(0, Math.min(expertGridColumns - field.width, placement.column)),
    row: Math.max(0, Math.min(expertGridRows - field.height, placement.row)),
  };
  selectedExpertFieldIndex = index;
  renderExpertEditorPreview();
  statusMessage.textContent = `${field.id} moved on the Expert editor surface.`;
}

function createHaCardExportPayload() {
  const card = createActiveHaCardConfig();
  return createHomeAssistantCardExportPayload({
    card,
    format: haCardFormat.value,
    name: currentHaCardExportName(),
  });
}

function createHaCardExportPackage() {
  const card = createActiveHaCardConfig();
  return createHomeAssistantCardExportPackage({
    card,
    format: haCardFormat.value,
    name: currentHaCardExportName(),
  });
}

function canExportHaCard() {
  return activeEditorMode === "expert" ? expertEditorFields.length > 0 : cardPreviewEntityIds().length > 0;
}

async function writeClipboardText(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.inset = "0 auto auto 0";
  textarea.style.opacity = "0";
  document.body.append(textarea);
  textarea.select();
  const copied = document.execCommand("copy");
  textarea.remove();
  if (!copied) {
    throw new Error("Clipboard copy was rejected.");
  }
}

function createGroupId(title) {
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "home-assistant-card";
  let candidate = `group-${slug}`;
  let counter = 2;
  while (panelGroups.some(group => group.id === candidate)) {
    candidate = `group-${slug}-${counter}`;
    counter += 1;
  }
  return candidate;
}

function renderEntityList() {
  entityList.replaceChildren();
  reconcileStackEntitySelection();
  const entityIds = trackedEntityIds();
  if (entityIds.length === 0) {
    const emptyState = document.createElement("div");
    emptyState.className = "empty-selection-state";
    emptyState.textContent = emptyEntitySelectionMessage;
    entityList.append(emptyState);
    groupSummary.textContent = emptyEntitySelectionMessage;
    groupIssues.textContent = "";
    selectedEntity.textContent = emptyEntitySelectionMessage;
    renderStackSelectionSummary();
    renderHaCardPreview();
    renderEmptyStatusPreview();
    return;
  }

  let ready = 0;
  let pending = 0;
  let blocked = 0;
  const blockedEntities = [];
  for (const entityId of entityIds) {
    const entity = entitySnapshots.get(entityId);
    const card = document.createElement("article");
    const name = document.createElement("strong");
    const value = document.createElement("span");
    const detail = document.createElement("small");
    const controls = document.createElement("div");
    card.className = "atlas-entity-card";
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `Show ${entityId} in the ATLAS Status Preview`);
    const presentation = entity ? createHomeAssistantEntityPresentation(entity) : undefined;
    card.dataset.category = presentation?.category ?? "status";
    if (presentation?.category === "battery" && entity?.value) {
      const batteryPercent = Number(entity.value);
      card.dataset.batteryLevel = batteryPercent <= 20 ? "low" : batteryPercent <= 50 ? "medium" : "normal";
    }
    name.textContent = presentation?.label ?? entityId;
    value.textContent = entity?.value && presentation?.category === "battery" && !entity.unit
      ? `${entity.value}%`
      : entity?.value ?? entity?.state ?? "Waiting";
    detail.textContent = entity?.updatedAt
      ? `${presentation?.detail ?? entityId.split(".", 1)[0]} · ${formatRelativeTime(entity.updatedAt)}`
      : presentation?.detail ?? entityId.split(".", 1)[0];
    if (entity?.state === "on" || entity?.state === "available") ready += 1;
    else if (entity?.state === "off") pending += 1;
    else if (entity) {
      blocked += 1;
      blockedEntities.push(presentation?.label ?? entityId);
    }
    card.addEventListener("click", () => handleEntityCardSelection(entityId));
    card.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handleEntityCardSelection(entityId);
      }
    });
    controls.className = "atlas-entity-card-actions";
    card.append(name, value, detail);
    const position = entityIds.indexOf(entityId);
    if (entityId === currentEntityId()) {
      card.dataset.primary = "true";
    }
    if (usesStackEntitySelection() && stackSelectedEntityIds.has(entityId)) {
      card.dataset.stackSelected = "true";
    }
    const moveUp = document.createElement("button");
    const moveDown = document.createElement("button");
    const remove = document.createElement("button");
    const stackToggle = document.createElement("input");
    moveUp.type = "button";
    moveDown.type = "button";
    remove.type = "button";
    stackToggle.type = "checkbox";
    moveUp.className = "icon-button";
    moveDown.className = "icon-button";
    moveUp.textContent = "↑";
    moveDown.textContent = "↓";
    moveUp.title = `Move ${entityId} up`;
    moveDown.title = `Move ${entityId} down`;
    moveUp.setAttribute("aria-label", `Move ${entityId} up`);
    moveDown.setAttribute("aria-label", `Move ${entityId} down`);
    remove.className = "icon-button";
    remove.textContent = "🗑";
    remove.title = `Remove ${entityId}`;
    remove.setAttribute("aria-label", `Remove ${entityId}`);
    stackToggle.className = "stack-checkbox";
    stackToggle.checked = stackSelectedEntityIds.has(entityId);
    stackToggle.title = `Use ${entityId} in stack export`;
    stackToggle.setAttribute("aria-label", `Use ${entityId} in stack export`);
    stackToggle.addEventListener("click", event => event.stopPropagation());
    stackToggle.addEventListener("change", event => {
      event.stopPropagation();
      setStackEntitySelected(entityId, stackToggle.checked);
    });
    moveUp.addEventListener("click", event => {
      event.stopPropagation();
      moveEntity(entityId, -1);
    });
    moveDown.addEventListener("click", event => {
      event.stopPropagation();
      moveEntity(entityId, 1);
    });
    remove.addEventListener("click", event => {
      event.stopPropagation();
      removeEntity(entityId);
    });
    if (usesStackEntitySelection()) controls.append(stackToggle);
    if (position > 0) controls.append(moveUp);
    if (position < entityIds.length - 1) controls.append(moveDown);
    controls.append(remove);
    if (entity && activeTransport !== transport && (entityId.startsWith("light.") || entityId.startsWith("switch."))) {
      const action = document.createElement("button");
      const service = entity.state === "on" ? "turn_off" : "turn_on";
      action.type = "button";
      action.textContent = service === "turn_on" ? "Turn on" : "Turn off";
      action.addEventListener("click", event => {
        event.stopPropagation();
        requestEntityService(entityId, service);
      });
      controls.append(action);
    }
    card.append(controls);
    entityList.append(card);
  }
  groupSummary.textContent = `Group status: ${ready} ready, ${pending} pending, ${blocked} blocked.`;
  groupIssues.textContent = blockedEntities.length ? `Needs attention: ${blockedEntities.join(", ")}.` : "";
  renderStackSelectionSummary();
  renderHaCardPreview();
}

function moveEntity(entityId, direction) {
  const entityIds = trackedEntityIds();
  const index = entityIds.indexOf(entityId);
  const destination = index + direction;
  if (destination < 0 || destination >= entityIds.length) return;
  [entityIds[index], entityIds[destination]] = [entityIds[destination], entityIds[index]];
  homeAssistantEntity.value = entityIds.join(", ");
  homeAssistantEntity.dispatchEvent(new Event("input"));
}

function selectPrimaryEntity(entityId) {
  const entityIds = trackedEntityIds();
  homeAssistantEntity.value = [entityId, ...entityIds.filter(candidate => candidate !== entityId)].join(", ");
  statusPreviewEntityId = entityId;
  stackSelectedEntityIds.add(entityId);
  homeAssistantEntity.dispatchEvent(new Event("input"));
  statusMessage.textContent = `${entityId} selected for the HA card preview.`;
}

function handleEntityCardSelection(entityId) {
  if (usesStackEntitySelection()) {
    selectStatusPreviewEntity(entityId);
    return;
  }
  if (activeEditorMode === "expert") {
    applyEntityToSelectedExpertField(entityId);
    return;
  }

  selectPrimaryEntity(entityId);
}

function selectStatusPreviewEntity(entityId) {
  statusPreviewEntityId = entityId;
  bindSelectedEntity(activeTransport ?? transport);
  if (activeTransport === transport) {
    void renderEntityState("on");
  }
  statusMessage.textContent = `${entityId} shown in the ATLAS Status Preview.`;
}

function addEntityForStatusPreview(entityId) {
  const entityIds = trackedEntityIds();
  if (!entityIds.includes(entityId)) {
    homeAssistantEntity.value = [...entityIds, entityId].join(", ");
  }
  statusPreviewEntityId = entityId;
  homeAssistantEntity.dispatchEvent(new Event("input"));
  statusMessage.textContent = `${entityId} shown in the ATLAS Status Preview. Use the checkbox to include it in the stack export.`;
}

function setStackEntitySelected(entityId, selected) {
  if (selected) {
    stackSelectedEntityIds.add(entityId);
  } else {
    stackSelectedEntityIds.delete(entityId);
  }
  if (stackSelectedEntityIds.size === 0) {
    stackSelectedEntityIds.add(entityId);
    statusMessage.textContent = `${entityId} remains selected; stack export needs at least one entity.`;
  } else {
    statusMessage.textContent = selected
      ? `${entityId} added to the stack preview.`
      : `${entityId} removed from the stack preview.`;
  }
  persistConfiguration();
  renderEntityList();
}

function removeEntity(entityId) {
  const entityIds = trackedEntityIds().filter(candidate => candidate !== entityId);
  stackSelectedEntityIds.delete(entityId);
  if (statusPreviewEntityId === entityId) {
    statusPreviewEntityId = entityIds[0];
  }
  homeAssistantEntity.value = entityIds.join(", ");
  homeAssistantEntity.dispatchEvent(new Event("input"));
  statusMessage.textContent = entityIds.length
    ? `${entityId} removed.`
    : emptyEntitySelectionMessage;
}

function formatRelativeTime(timestamp) {
  const seconds = Math.max(0, Math.floor((Date.now() - timestamp) / 1000));
  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
  return `${Math.floor(seconds / 3600)} h ago`;
}

function requestEntityService(entityId, service) {
  const command = createHomeAssistantServiceCommand(entityId, service);
  if (!command || !window.confirm(`Send ${service} to ${entityId}?`)) {
    return;
  }

  const result = connection?.getClient()?.callService(command);
  statusMessage.textContent = result?.accepted
    ? `Command sent for ${entityId}.`
    : result?.reason ?? "No active Home Assistant connection.";
}

function bindSelectedEntity(nextTransport) {
  if (!registeredPanel || !nextTransport) {
    return;
  }

  panelBinding?.dispose();
  removeEntityListListener?.();
  removeServiceResultListener?.();
  removeEntityStateListListener?.();
  removeLovelaceResourceListener?.();
  removeEntityListListener = undefined;
  removeServiceResultListener = undefined;
  removeEntityStateListListener = undefined;
  removeLovelaceResourceListener = undefined;
  lovelaceResources = [];
  lovelaceResourcesChecked = false;
  renderExpertTemplatePalette();
  activeTransport = nextTransport;
  entitySnapshots.clear();
  if (trackedEntityIds().length === 0) {
    renderEmptyStatusPreview();
    selectedEntity.textContent = emptyEntitySelectionMessage;
    statusMessage.textContent = emptyEntitySelectionMessage;
    renderEntityPickerOptions();
    renderEntityList();
    return;
  }

  panelBinding = bindHomeAssistantEntityStatusPanel({
    transport: activeTransport,
    panel: registeredPanel,
    entityId: currentEntityId(),
    element: statusRoot,
    tokens,
  });
  removeEntityListListener = activeTransport.subscribe(entity => {
    if (!trackedEntityIds().includes(entity.entityId)) {
      return;
    }

    entitySnapshots.set(entity.entityId, { ...entity, updatedAt: Date.now() });
    knownEntityIds.add(entity.entityId);
    renderEntityPickerOptions();
    renderEntityList();
  });
  const usingLiveTransport = activeTransport !== transport;
  if (usingLiveTransport) {
    removeServiceResultListener = connection?.getClient()?.subscribeServiceResult(result => {
      statusMessage.textContent = result.success
        ? `Command completed for ${result.command.entityId}.`
        : `Command failed for ${result.command.entityId}: ${result.reason ?? "Unknown error."}`;
    });
    removeEntityStateListListener = connection?.getClient()?.subscribeEntityStateList(result => {
      for (const entity of result.entities) {
        knownEntityIds.add(entity.entityId);
      }
      renderEntityPickerOptions();
      statusMessage.textContent = result.success
        ? `Loaded ${result.entities.length} entities from Home Assistant.`
        : `Entity list failed: ${result.reason ?? "Unknown error."}`;
    });
    removeLovelaceResourceListener = connection?.getClient()?.subscribeLovelaceResources(result => {
      lovelaceResources = result.resources;
      lovelaceResourcesChecked = result.success;
      const scannedCards = result.success ? refreshScannedExpertPaletteCards() : { total: 0, hacs: 0 };
      renderHaCardPreview();
      renderExpertTemplatePalette();
      statusMessage.textContent = result.success
        ? `Loaded ${result.resources.length} Lovelace resources from Home Assistant. ${scannedCards.total} palette entries detected, including ${scannedCards.hacs} /hacsfiles resources.`
        : `Lovelace resources failed: ${result.reason ?? "Unknown error."}`;
    });
    refreshLiveEntityStates();
  }
  for (const button of buttons) {
    button.disabled = usingLiveTransport;
  }
  selectedEntity.textContent = usingLiveTransport
    ? `Live entity: ${currentEntityId()}`
    : `Demo entity: ${currentEntityId()}`;
  statusMessage.textContent = usingLiveTransport
    ? `Waiting for updates from ${currentEntityId()}.`
    : `Demo controls target ${currentEntityId()}.`;
  renderEntityPickerOptions();
  renderEntityList();
}

function connectHomeAssistant() {
  const configuration = createHomeAssistantConnectionConfiguration({ url: homeAssistantUrl.value });
  const readiness = inspectHomeAssistantConnectionReadiness(configuration);
  if (!readiness.ready) {
    renderConnectionLifecycle({ state: "failed", reason: readiness.reason });
    return;
  }

  if (!homeAssistantToken.value) {
    renderConnectionLifecycle({ state: "failed", reason: "An access token is required to connect." });
    return;
  }

  removeLifecycleListener?.();
  clearTimeout(reconnectTimer);
  reconnectTimer = undefined;
  reconnectAttempts = 0;
  connection?.disconnect();
  connection = createHomeAssistantRuntimeConnection(configuration, createBrowserHomeAssistantWebSocket);
  removeLifecycleListener = connection.subscribeLifecycle(renderConnectionLifecycle);
  reconnectToken = homeAssistantToken.value;
  connection.connect(reconnectToken);
  if (!rememberHomeAssistantToken.checked) {
    homeAssistantToken.value = "";
  }
  persistConfiguration();
}

function disconnectHomeAssistant() {
  reconnectToken = undefined;
  reconnectAttempts = 0;
  clearTimeout(reconnectTimer);
  reconnectTimer = undefined;
  connection?.disconnect();
}

const registeredPanel = findHomeAssistantStatusPanel(panelRegistry, panel.id);
if (!registeredPanel) {
  statusMessage.textContent = "Status panel is not registered.";
} else {
  bindSelectedEntity(transport);
  transport.subscribe(entity => {
    if (entity.entityId !== currentEntityId()) {
      return;
    }

    for (const button of buttons) {
      button.setAttribute("aria-pressed", String(button.dataset.entityState === entity.state));
    }
    statusMessage.textContent = `Entity state updated: ${entity.state}.`;
  });
}

for (const button of buttons) {
  button.addEventListener("click", () => {
    void renderEntityState(button.dataset.entityState);
  });
}

homeAssistantUrl.addEventListener("input", () => {
  renderConnectionReadiness();
  persistConfiguration();
});
homeAssistantToken.addEventListener("input", () => {
  if (rememberHomeAssistantToken.checked) {
    persistConfiguration();
  }
});
rememberHomeAssistantToken.addEventListener("change", () => {
  persistConfiguration();
});
homeAssistantEntity.addEventListener("input", () => {
  persistConfiguration();
  renderEntityPickerOptions();
  bindSelectedEntity(activeTransport ?? transport);
  if (activeTransport === transport) {
    void renderEntityState("on");
  }
  renderHaCardPreview();
});
homeAssistantEntityDomain.addEventListener("change", () => {
  persistConfiguration();
  renderEntityPickerOptions();
});
homeAssistantEntityDomainShortcuts.addEventListener("click", event => {
  const button = event.target.closest("[data-entity-domain]");
  if (!button) return;
  homeAssistantEntityDomain.value = button.dataset.entityDomain;
  persistConfiguration();
  renderEntityPickerOptions();
});
homeAssistantEntitySearch.addEventListener("input", () => {
  persistConfiguration();
  renderEntityPickerOptions();
});
clearHomeAssistantEntitySearch.addEventListener("click", () => {
  homeAssistantEntitySearch.value = "";
  persistConfiguration();
  renderEntityPickerOptions();
  homeAssistantEntitySearch.focus();
});
addHomeAssistantEntity.addEventListener("click", addSelectedEntityFromPicker);
homeAssistantEntityPicker.addEventListener("change", addSelectedEntityFromPicker);
refreshHomeAssistantEntities.addEventListener("click", refreshLiveEntityStates);
checkHaCardResources.addEventListener("click", () => checkLiveLovelaceResources());
homeAssistantGroup.addEventListener("change", () => {
  const group = panelGroups.find(candidate => candidate.id === homeAssistantGroup.value);
  if (group) {
    homeAssistantEntity.value = group.entityIds.join(", ");
    homeAssistantGroupName.value = group.title;
  }
  homeAssistantEntity.dispatchEvent(new Event("input"));
});
homeAssistantGroupName.addEventListener("input", renderHaCardPreview);
haCardTarget.addEventListener("change", () => {
  syncCardLayoutState();
  persistConfiguration();
  renderEntityList();
});
haCardLayout.addEventListener("change", () => {
  persistConfiguration();
  renderEntityList();
});
haCardFormat.addEventListener("change", () => {
  persistConfiguration();
  renderHaCardPreview();
  renderExpertEditorPreview();
});
for (const button of editorModeButtons) {
  button.addEventListener("click", () => {
    renderEditorMode(button.dataset.editorMode);
  });
}
expertTemplate.addEventListener("change", () => {
  selectExpertTemplate(expertTemplate.value);
});
expertTarget.addEventListener("change", updateSelectedExpertFieldTarget);
expertBubbleButtonType.addEventListener("change", updateSelectedExpertFieldBubbleType);
for (const control of [expertColumn, expertRow, expertWidth, expertHeight]) {
  control.addEventListener("change", updateSelectedExpertFieldGeometry);
}
applyExpertTitle.addEventListener("click", () => {
  updateSelectedExpertFieldTitle(expertTitle.value);
});
useEntityNameAsTitle.addEventListener("click", () => {
  const title = currentExpertEntityTitle();
  expertTitle.value = title;
  updateSelectedExpertFieldTitle(title);
  statusMessage.textContent = `${title} copied from the selected entity.`;
});
addExpertField.addEventListener("click", addExpertEditorField);
editExpertField.addEventListener("click", toggleExpertFieldEditing);
saveExpertPaletteFavorites.addEventListener("click", saveExpertPaletteFavoriteSelection);
showAllExpertPaletteCards.addEventListener("click", toggleExpertPaletteAllCards);
scanExpertPaletteCards.addEventListener("click", scanExpertPaletteCardsFromHomeAssistant);
resetExpertPaletteFavorites.addEventListener("click", resetExpertPaletteFavoriteSelection);
clearExpertFields.addEventListener("click", () => {
  expertEditorFields.length = 0;
  selectedExpertFieldIndex = -1;
  expertFieldEditing = false;
  expertTitle.value = "";
  renderExpertEditorPreview();
  statusMessage.textContent = "Expert editor preview cleared.";
});
expertEditorDropzone.addEventListener("dragover", event => {
  event.preventDefault();
  expertEditorDropzone.classList.add("drag-over");
});
expertEditorDropzone.addEventListener("dragleave", event => {
  if (!(event.relatedTarget instanceof Node) || !expertEditorDropzone.contains(event.relatedTarget)) {
    expertEditorDropzone.classList.remove("drag-over");
  }
});
expertEditorDropzone.addEventListener("drop", event => {
  event.preventDefault();
  expertEditorDropzone.classList.remove("drag-over");
  const fieldIndex = event.dataTransfer?.getData("application/x-atlas-field-index");
  if (fieldIndex) {
    moveExpertEditorField(Number(fieldIndex), calculateExpertDropPlacement(event));
    return;
  }
  const paletteCardId = event.dataTransfer?.getData("application/x-atlas-palette-card");
  if (paletteCardId) {
    addExpertEditorFieldFromPaletteCard(paletteCardId, calculateExpertDropPlacement(event));
    return;
  }
  const templateId = event.dataTransfer?.getData("application/x-atlas-template")
    || event.dataTransfer?.getData("text/plain")
    || expertTemplate.value;
  addExpertEditorFieldFromTemplate(templateId, calculateExpertDropPlacement(event));
});
saveHomeAssistantGroup.addEventListener("click", () => {
  const title = homeAssistantGroupName.value.trim();
  const entityIds = trackedEntityIds();
  if (!title || entityIds.length === 0) {
    statusMessage.textContent = "A group name and at least one entity are required.";
    return;
  }
  const id = `group-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
  panelGroups = [...panelGroups.filter(group => group.id !== id), createHomeAssistantPanelGroup({ id, title, entityIds })];
  renderGroupOptions(id);
  persistConfiguration();
  statusMessage.textContent = `Group ${title} saved.`;
});
deleteHomeAssistantGroup.addEventListener("click", () => {
  const id = homeAssistantGroup.value;
  if (!id.startsWith("group-")) {
    statusMessage.textContent = "Built-in groups cannot be deleted.";
    return;
  }
  panelGroups = panelGroups.filter(group => group.id !== id);
  renderGroupOptions("custom");
  persistConfiguration();
  statusMessage.textContent = "Group deleted.";
});
duplicateHomeAssistantGroup.addEventListener("click", () => {
  const source = panelGroups.find(group => group.id === homeAssistantGroup.value);
  if (!source) {
    statusMessage.textContent = "Select a group to duplicate.";
    return;
  }
  const title = `${source.title} copy`;
  const id = `group-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
  panelGroups = [...panelGroups, createHomeAssistantPanelGroup({ id, title, entityIds: source.entityIds })];
  homeAssistantGroupName.value = title;
  renderGroupOptions(id);
  persistConfiguration();
  statusMessage.textContent = `Group ${title} created.`;
});
exportHomeAssistantConfig.addEventListener("click", () => {
  const payload = JSON.stringify({
    version: 1,
    name: homeAssistantGroup.value === "custom" ? "ATLAS custom panel" : homeAssistantGroup.value,
    createdAt: new Date().toISOString(),
    url: homeAssistantUrl.value,
    entities: homeAssistantEntity.value,
    entityDomain: homeAssistantEntityDomain.value,
    entitySearch: homeAssistantEntitySearch.value,
    selectedGroup: homeAssistantGroup.value,
    cardTarget: haCardTarget.value,
    cardLayout: haCardLayout.value,
    cardFormat: haCardFormat.value,
    stackEntityIds: selectedStackEntityIds(),
    expertPaletteFavoriteIds: [...expertPaletteFavoriteIds],
    groups: panelGroups,
  }, null, 2);
  const link = document.createElement("a");
  link.href = URL.createObjectURL(new Blob([payload], { type: "application/json" }));
  const exportName = homeAssistantGroup.value === "custom" ? "atlas-custom-panel" : `atlas-${homeAssistantGroup.value}-panel`;
  link.download = `${exportName.replace(/[^a-z0-9-]+/gi, "-")}.json`;
  link.click();
  URL.revokeObjectURL(link.href);
});
exportHaCardConfig.addEventListener("click", () => {
  if (!canExportHaCard()) {
    statusMessage.textContent = emptyEntitySelectionMessage;
    return;
  }

  const link = document.createElement("a");
  const payload = createHaCardExportPayload();
  link.href = URL.createObjectURL(new Blob([payload.content], { type: payload.manifest.mimeType }));
  link.download = payload.manifest.filename;
  link.click();
  URL.revokeObjectURL(link.href);
});
exportHaCardPackage.addEventListener("click", () => {
  if (!canExportHaCard()) {
    statusMessage.textContent = emptyEntitySelectionMessage;
    return;
  }

  const cardPackage = createHaCardExportPackage();
  const link = document.createElement("a");
  link.href = URL.createObjectURL(new Blob([JSON.stringify(cardPackage, null, 2)], { type: "application/json" }));
  link.download = cardPackage.manifest.filename.replace(/\.(json|yaml)$/i, ".atlas-card.json");
  link.click();
  URL.revokeObjectURL(link.href);
});
copyHaCardConfig.addEventListener("click", async () => {
  if (!canExportHaCard()) {
    statusMessage.textContent = emptyEntitySelectionMessage;
    return;
  }

  try {
    const payload = createHaCardExportPayload();
    await writeClipboardText(payload.content);
    statusMessage.textContent = `HA card ${haCardFormat.value.toUpperCase()} copied to clipboard.`;
  } catch {
    statusMessage.textContent = "Copy failed: use the preview text instead.";
  }
});
copyHaCardResources.addEventListener("click", async () => {
  if (!canExportHaCard()) {
    statusMessage.textContent = emptyEntitySelectionMessage;
    return;
  }

  const card = createActiveHaCardConfig();
  const dependency = inspectHomeAssistantCardDependency(card);

  try {
    await writeClipboardText(serializeHomeAssistantAtlasFrontendResourceReferences({
      mode: "server",
      card,
      resources: lovelaceResources,
    }, haCardFormat.value));
    statusMessage.textContent = dependency.required
      ? `ATLAS and ${dependency.label} Lovelace resources ${haCardFormat.value.toUpperCase()} copied to clipboard.`
      : `ATLAS Lovelace resource ${haCardFormat.value.toUpperCase()} copied to clipboard.`;
  } catch {
    statusMessage.textContent = "Copy failed: use the dependency path instead.";
  }
});
importHomeAssistantConfig.addEventListener("change", async () => {
  const file = importHomeAssistantConfig.files?.[0];
  if (!file) return;
  try {
    const imported = JSON.parse(await file.text());
    if (imported.version !== 1 || typeof imported.url !== "string" || typeof imported.entities !== "string" || !Array.isArray(imported.groups)) throw new Error();
    pendingImport = imported;
    const importedName = typeof imported.name === "string" ? imported.name : "Unnamed configuration";
    if (!window.confirm(`Import ${importedName}: ${imported.groups.length} groups and ${imported.entities.split(",").filter(Boolean).length} entities?`)) return;
    homeAssistantUrl.value = pendingImport.url;
    homeAssistantEntity.value = pendingImport.entities;
    if (typeof pendingImport.entityDomain === "string") {
      homeAssistantEntityDomain.value = pendingImport.entityDomain;
    }
    if (typeof pendingImport.entitySearch === "string") {
      homeAssistantEntitySearch.value = pendingImport.entitySearch;
    }
    panelGroups = pendingImport.groups.map(createHomeAssistantPanelGroup);
    if (typeof pendingImport.cardTarget === "string" && cardTargets.some(descriptor => descriptor.target === pendingImport.cardTarget)) {
      haCardTarget.value = pendingImport.cardTarget;
    }
    if (pendingImport.cardLayout === "single" || pendingImport.cardLayout === "horizontal-stack" || pendingImport.cardLayout === "vertical-stack") {
      haCardLayout.value = pendingImport.cardLayout;
    }
    if (pendingImport.cardFormat === "json" || pendingImport.cardFormat === "yaml") {
      haCardFormat.value = pendingImport.cardFormat;
    }
    stackSelectedEntityIds.clear();
    if (Array.isArray(pendingImport.stackEntityIds)) {
      for (const entityId of pendingImport.stackEntityIds) {
        if (typeof entityId === "string" && entityId.trim()) {
          stackSelectedEntityIds.add(entityId.trim());
        }
      }
    }
    syncCardLayoutState();
    renderGroupOptions(typeof pendingImport.selectedGroup === "string" ? pendingImport.selectedGroup : "custom");
    persistConfiguration();
    homeAssistantEntity.dispatchEvent(new Event("input"));
    renderConnectionReadiness();
    statusMessage.textContent = `Configuration imported: ${panelGroups.length} groups and ${trackedEntityIds().length} entities.`;
  } catch {
    statusMessage.textContent = "Import failed: invalid configuration.";
  } finally {
    importHomeAssistantConfig.value = "";
  }
});
importHaCardConfig.addEventListener("change", async () => {
  const file = importHaCardConfig.files?.[0];
  if (!file) return;
  try {
    const text = await file.text();
    const decision = renderHaCardImportDecision(text);
    if (decision.action !== "import") {
      statusMessage.textContent = decision.action === "review"
        ? "Import paused: review the compatibility details before mapping this artifact."
        : "Import rejected: unsupported Home Assistant card artifact.";
      return;
    }

    const summary = summarizeHomeAssistantCardImport(text);
    const entityIds = [...summary.entityIds];
    const title = summary.title;
    const id = createGroupId(title);
    panelGroups = [...panelGroups, createHomeAssistantPanelGroup({ id, title, entityIds })];
    homeAssistantEntity.value = entityIds.join(", ");
    homeAssistantGroupName.value = title;
    stackSelectedEntityIds.clear();
    for (const entityId of entityIds) {
      stackSelectedEntityIds.add(entityId);
    }
    haCardTarget.value = summary.target;
    haCardLayout.value = summary.layout;
    haCardFormat.value = summary.format;
    syncCardLayoutState();
    renderGroupOptions(id);
    persistConfiguration();
    homeAssistantEntity.dispatchEvent(new Event("input"));
    statusMessage.textContent = `${summary.packaged ? "ATLAS card package" : "HA card"} ${summary.format.toUpperCase()} imported: ${title} with ${entityIds.length} entities.`;
  } catch {
    statusMessage.textContent = "Import failed: invalid Home Assistant entities card JSON or YAML.";
  } finally {
    importHaCardConfig.value = "";
  }
});
connectButton.addEventListener("click", connectHomeAssistant);
disconnectButton.addEventListener("click", disconnectHomeAssistant);

void renderEntityState("on");
renderCardTargetOptions(initialCardTarget);
renderExpertEditorOptions();
renderExpertTemplatePalette();
syncCardLayoutState();
renderGroupOptions(initialGroupSelection);
renderEntityPickerOptions();
renderConnectionReadiness();
renderEditorMode("simple");
