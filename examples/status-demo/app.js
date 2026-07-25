import {
  createThemeTokens,
} from "@atlas/theme";
import {
  createHomeAssistantStatusPanel,
  createHomeAssistantEntityState,
  createHomeAssistantConnectionConfiguration,
  createBrowserHomeAssistantWebSocket,
  createHomeAssistantRuntimeConnection,
  createHomeAssistantEntityPresentation,
  createHomeAssistantPanelGroup,
  createHomeAssistantServiceCommand,
  createHomeAssistantStatusPanelRegistry,
  createInMemoryHomeAssistantEntityStateTransport,
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
const connectButton = document.querySelector("#connect-home-assistant");
const disconnectButton = document.querySelector("#disconnect-home-assistant");
const homeAssistantEntity = document.querySelector("#home-assistant-entity");
const homeAssistantGroup = document.querySelector("#home-assistant-group");
const homeAssistantGroupName = document.querySelector("#home-assistant-group-name");
const saveHomeAssistantGroup = document.querySelector("#save-home-assistant-group");
const deleteHomeAssistantGroup = document.querySelector("#delete-home-assistant-group");
const duplicateHomeAssistantGroup = document.querySelector("#duplicate-home-assistant-group");
const exportHomeAssistantConfig = document.querySelector("#export-home-assistant-config");
const importHomeAssistantConfig = document.querySelector("#import-home-assistant-config");
const selectedEntity = document.querySelector("#selected-entity");
const entityList = document.querySelector("#atlas-entity-list");
const groupSummary = document.querySelector("#group-summary");
const groupIssues = document.querySelector("#group-issues");
const configurationStorageKey = "atlas.homeassistant.demo.configuration";
let connection;
let removeLifecycleListener;
let removeServiceResultListener;
let panelBinding;
let activeTransport;
let removeEntityListListener;
let reconnectToken;
let reconnectTimer;
let reconnectAttempts = 0;
const entitySnapshots = new Map();
let pendingImport;
let panelGroups = [
  createHomeAssistantPanelGroup({ id: "overview", title: "Overview", entityIds: ["binary_sensor.atlas_status", "sensor.atlas_temperature"] }),
  createHomeAssistantPanelGroup({ id: "energy", title: "Energy", entityIds: ["sensor.atlas_power", "sensor.atlas_energy"] }),
  createHomeAssistantPanelGroup({ id: "safety", title: "Safety", entityIds: ["binary_sensor.atlas_status", "binary_sensor.atlas_door"] }),
];

try {
  const savedConfiguration = JSON.parse(localStorage.getItem(configurationStorageKey) ?? "null");
  if (typeof savedConfiguration?.url === "string") {
    homeAssistantUrl.value = savedConfiguration.url;
  }
  if (typeof savedConfiguration?.entities === "string") {
    homeAssistantEntity.value = savedConfiguration.entities;
  }
  if (Array.isArray(savedConfiguration?.groups)) {
    panelGroups = savedConfiguration.groups.map(createHomeAssistantPanelGroup);
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

async function renderEntityState(state) {
  const registeredPanel = findHomeAssistantStatusPanel(panelRegistry, panel.id);
  if (!registeredPanel) {
    statusMessage.textContent = "Status panel is not registered.";
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
      entities: homeAssistantEntity.value,
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
  homeAssistantGroup.value = selectedId;
}

function currentEntityId() {
  return trackedEntityIds()[0] ?? "binary_sensor.atlas_status";
}

function trackedEntityIds() {
  return [...new Set(homeAssistantEntity.value.split(",").map(entityId => entityId.trim()).filter(Boolean))];
}

function renderEntityList() {
  entityList.replaceChildren();
  let ready = 0;
  let pending = 0;
  let blocked = 0;
  const blockedEntities = [];
  for (const entityId of trackedEntityIds()) {
    const entity = entitySnapshots.get(entityId);
    const card = document.createElement("article");
    const name = document.createElement("strong");
    const value = document.createElement("span");
    const detail = document.createElement("small");
    card.className = "atlas-entity-card";
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
    card.append(name, value, detail);
    const position = trackedEntityIds().indexOf(entityId);
    const moveUp = document.createElement("button");
    const moveDown = document.createElement("button");
    moveUp.type = "button";
    moveDown.type = "button";
    moveUp.textContent = "Up";
    moveDown.textContent = "Down";
    moveUp.addEventListener("click", () => moveEntity(entityId, -1));
    moveDown.addEventListener("click", () => moveEntity(entityId, 1));
    if (position > 0) card.append(moveUp);
    if (position < trackedEntityIds().length - 1) card.append(moveDown);
    if (entity && activeTransport !== transport && (entityId.startsWith("light.") || entityId.startsWith("switch."))) {
      const action = document.createElement("button");
      const service = entity.state === "on" ? "turn_off" : "turn_on";
      action.type = "button";
      action.textContent = service === "turn_on" ? "Turn on" : "Turn off";
      action.addEventListener("click", () => requestEntityService(entityId, service));
      card.append(action);
    }
    entityList.append(card);
  }
  groupSummary.textContent = `Group status: ${ready} ready, ${pending} pending, ${blocked} blocked.`;
  groupIssues.textContent = blockedEntities.length ? `Needs attention: ${blockedEntities.join(", ")}.` : "";
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
  activeTransport = nextTransport;
  entitySnapshots.clear();
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
    renderEntityList();
  });
  const usingLiveTransport = activeTransport !== transport;
  if (usingLiveTransport) {
    removeServiceResultListener = connection?.getClient()?.subscribeServiceResult(result => {
      statusMessage.textContent = result.success
        ? `Command completed for ${result.command.entityId}.`
        : `Command failed for ${result.command.entityId}: ${result.reason ?? "Unknown error."}`;
    });
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
  homeAssistantToken.value = "";
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
homeAssistantEntity.addEventListener("input", () => {
  persistConfiguration();
  bindSelectedEntity(activeTransport ?? transport);
  if (activeTransport === transport) {
    void renderEntityState("on");
  }
});
homeAssistantGroup.addEventListener("change", () => {
  const group = panelGroups.find(candidate => candidate.id === homeAssistantGroup.value);
  if (group) {
    homeAssistantEntity.value = group.entityIds.join(", ");
  }
  homeAssistantEntity.dispatchEvent(new Event("input"));
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
    groups: panelGroups,
  }, null, 2);
  const link = document.createElement("a");
  link.href = URL.createObjectURL(new Blob([payload], { type: "application/json" }));
  link.download = "atlas-homeassistant-panel.json";
  link.click();
  URL.revokeObjectURL(link.href);
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
    panelGroups = pendingImport.groups.map(createHomeAssistantPanelGroup);
    renderGroupOptions("custom");
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
connectButton.addEventListener("click", connectHomeAssistant);
disconnectButton.addEventListener("click", disconnectHomeAssistant);

void renderEntityState("on");
renderGroupOptions();
renderConnectionReadiness();
