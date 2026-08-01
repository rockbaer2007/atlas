import {
  createThemeTokens,
} from "@atlas/theme";
import {
  createHomeAssistantStatusPanel,
  createHomeAssistantCardExportPayload,
  createHomeAssistantEntityState,
  createHomeAssistantConnectionConfiguration,
  createBrowserHomeAssistantWebSocket,
  createHomeAssistantRuntimeConnection,
  createHomeAssistantEntityPresentation,
  createHomeAssistantCardConfiguration,
  createHomeAssistantPanelGroup,
  createHomeAssistantServiceCommand,
  createHomeAssistantStatusPanelRegistry,
  createInMemoryHomeAssistantEntityStateTransport,
  inspectHomeAssistantCardDependency,
  inspectHomeAssistantCardDependencyAvailability,
  listHomeAssistantCardTargets,
  parseHomeAssistantEntitiesCardConfiguration,
  serializeHomeAssistantEntitiesCardConfiguration,
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
const copyHaCardConfig = document.querySelector("#copy-ha-card-config");
const checkHaCardResources = document.querySelector("#check-ha-card-resources");
const importHomeAssistantConfig = document.querySelector("#import-home-assistant-config");
const importHaCardConfig = document.querySelector("#import-ha-card-config");
const haCardPreview = document.querySelector("#ha-card-preview");
const haCardDependency = document.querySelector("#ha-card-dependency");
const selectedEntity = document.querySelector("#selected-entity");
const entityList = document.querySelector("#atlas-entity-list");
const stackSelectionSummary = document.querySelector("#stack-selection-summary");
const groupSummary = document.querySelector("#group-summary");
const groupIssues = document.querySelector("#group-issues");
const configurationStorageKey = "atlas.homeassistant.demo.configuration";
const emptyEntitySelectionMessage = "Wählen Sie mindestens eine Entität aus.";
const cardTargets = listHomeAssistantCardTargets();
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
const entitySnapshots = new Map();
const knownEntityIds = new Set();
const stackSelectedEntityIds = new Set();
const preferredEntityDomains = ["sensor", "binary_sensor", "switch", "light"];
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
  if (Array.isArray(savedConfiguration?.groups)) {
    panelGroups = savedConfiguration.groups.map(createHomeAssistantPanelGroup);
  }
  if (savedConfiguration?.cardTarget === "entities" || savedConfiguration?.cardTarget === "mushroom-template" || savedConfiguration?.cardTarget === "bubble") {
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
  checkHaCardResources.disabled = lifecycle.state !== "connected" || lifecycle.subscription !== "active";

  if (lifecycle.state === "connected" && lifecycle.subscription === "active") {
    reconnectAttempts = 0;
    clearTimeout(reconnectTimer);
    bindSelectedEntity(connection?.getClient()?.transport);
  } else if (lifecycle.state === "closed" || lifecycle.state === "failed") {
    bindSelectedEntity(transport);
    if (lifecycle.state === "closed") {
      scheduleReconnect();
    }
  }
  refreshHomeAssistantEntities.disabled = lifecycle.state !== "connected" || lifecycle.subscription !== "active";
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

function entityDomain(entityId) {
  return entityId.includes(".") ? entityId.split(".", 1)[0] : "other";
}

function knownEntityPickerIds() {
  return [...new Set([
    ...knownEntityIds,
    ...trackedEntityIds(),
    ...panelGroups.flatMap(group => group.entityIds),
    ...entitySnapshots.keys(),
  ])].sort((left, right) => left.localeCompare(right));
}

function renderEntityDomainOptions() {
  const selected = homeAssistantEntityDomain.value || "all";
  const domains = [...new Set(knownEntityPickerIds().map(entityDomain))]
    .sort((left, right) => left.localeCompare(right));

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
  const shortcutDomains = ["all", ...preferredEntityDomains, ...domains]
    .filter((domain, index, list) => list.indexOf(domain) === index)
    .filter(domain => domain === "all" || domains.includes(domain));

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

function entityMatchesSearch(entityId, searchTerm) {
  const term = searchTerm.trim().toLowerCase();
  if (!term) return true;

  const entity = entitySnapshots.get(entityId);
  const presentation = entity ? createHomeAssistantEntityPresentation(entity) : undefined;
  return entityId.toLowerCase().includes(term)
    || presentation?.label.toLowerCase().includes(term)
    || entity?.name?.toLowerCase().includes(term);
}

function usesStackEntitySelection() {
  return haCardTarget.value !== "entities" && (haCardLayout.value === "horizontal-stack" || haCardLayout.value === "vertical-stack");
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
    stackSelectionSummary.textContent = `Bei Stapel selektierte Entitäten: ${selectedIds.length}/${entityIds.length}${selectedIds.length ? ` - ${selectedIds.join(", ")}` : ""}`;
    return;
  }

  stackSelectionSummary.textContent = entityIds[0]
    ? `Simple nutzt die erste Entität: ${entityIds[0]}`
    : "Simple nutzt die erste Entität.";
}

function renderEntityPickerOptions() {
  const selected = homeAssistantEntityPicker.value;
  renderEntityDomainOptions();
  const selectedDomain = homeAssistantEntityDomain.value;
  const searchTerm = homeAssistantEntitySearch.value;
  clearHomeAssistantEntitySearch.disabled = searchTerm.trim().length === 0;
  const entityIds = knownEntityPickerIds()
    .filter(entityId => selectedDomain === "all" || entityDomain(entityId) === selectedDomain)
    .filter(entityId => entityMatchesSearch(entityId, searchTerm));

  homeAssistantEntityPicker.replaceChildren();
  for (const entityId of entityIds) {
    const option = document.createElement("option");
    const entity = entitySnapshots.get(entityId);
    const presentation = entity ? createHomeAssistantEntityPresentation(entity) : undefined;
    option.value = entityId;
    option.textContent = presentation && presentation.label !== entityId
      ? `${presentation.label} (${entityId})`
      : entityId;
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

function createHaCardConfig() {
  const group = panelGroups.find(candidate => candidate.id === homeAssistantGroup.value);
  return createHomeAssistantCardConfiguration({
    target: haCardTarget.value,
    layout: haCardLayout.value,
    title: group?.title ?? (homeAssistantGroupName.value.trim() || "ATLAS panel"),
    entityIds: cardPreviewEntityIds(),
  });
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
    return;
  }

  const card = createHaCardConfig();
  const dependency = inspectHomeAssistantCardDependency(card);
  const availability = inspectHomeAssistantCardDependencyAvailability(card, lovelaceResources);
  haCardPreview.textContent = serializeHomeAssistantEntitiesCardConfiguration(card, haCardFormat.value);
  haCardDependency.dataset.required = String(dependency.required);
  haCardDependency.dataset.status = dependency.required
    ? lovelaceResourcesChecked ? availability.status : "unchecked"
    : "not-required";
  const resourceHint = dependency.resourcePaths.length ? ` Resource: ${dependency.resourcePaths.join(", ")}.` : "";
  const installHint = dependency.installPaths.length ? ` Install path: ${dependency.installPaths.join(", ")}.` : "";
  if (!dependency.required) {
    haCardDependency.textContent = "Uses built-in Home Assistant card.";
  } else if (!lovelaceResourcesChecked) {
    haCardDependency.textContent = `Requires ${dependency.label}.${resourceHint}${installHint} Connect to Home Assistant or check resources.`;
  } else if (availability.status === "installed") {
    haCardDependency.textContent = `${dependency.label} resource found.${resourceHint}`;
  } else {
    haCardDependency.textContent = `Requires ${dependency.label}.${resourceHint}${installHint} Missing: ${availability.missingResourcePaths.join(", ")}.`;
  }
}

function createHaCardExportPayload() {
  const card = createHaCardConfig();
  return createHomeAssistantCardExportPayload({
    card,
    format: haCardFormat.value,
    name: currentHaCardExportName(),
  });
}

function canExportHaCard() {
  return cardPreviewEntityIds().length > 0;
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
      renderHaCardPreview();
      statusMessage.textContent = result.success
        ? `Loaded ${result.resources.length} Lovelace resources from Home Assistant.`
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
    if (pendingImport.cardTarget === "entities" || pendingImport.cardTarget === "mushroom-template" || pendingImport.cardTarget === "bubble") {
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
    const parsed = parseHomeAssistantEntitiesCardConfiguration(await file.text());
    const card = parsed.card;
    const primaryCard = card.type === "horizontal-stack" || card.type === "vertical-stack" ? card.cards[0] : card;
    const entityIds = card.type === "entities"
      ? card.entities.map(entity => entity.entity)
      : card.type === "horizontal-stack" || card.type === "vertical-stack"
        ? card.cards.map(child => child.type === "entities" ? child.entities.map(entity => entity.entity) : [child.entity]).flat()
        : [card.entity];
    const title = primaryCard.type === "entities"
      ? primaryCard.title
      : primaryCard.type === "custom:bubble-card"
        ? primaryCard.name
        : primaryCard.primary;
    const id = createGroupId(title);
    panelGroups = [...panelGroups, createHomeAssistantPanelGroup({ id, title, entityIds })];
    homeAssistantEntity.value = entityIds.join(", ");
    homeAssistantGroupName.value = title;
    stackSelectedEntityIds.clear();
    for (const entityId of entityIds) {
      stackSelectedEntityIds.add(entityId);
    }
    haCardTarget.value = parsed.target;
    haCardLayout.value = parsed.layout;
    haCardFormat.value = parsed.format;
    syncCardLayoutState();
    renderGroupOptions(id);
    persistConfiguration();
    homeAssistantEntity.dispatchEvent(new Event("input"));
    statusMessage.textContent = `HA card ${parsed.format.toUpperCase()} imported: ${title} with ${entityIds.length} entities.`;
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
syncCardLayoutState();
renderGroupOptions(initialGroupSelection);
renderEntityPickerOptions();
renderConnectionReadiness();
renderHaCardPreview();
