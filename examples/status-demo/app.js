import {
  createThemeTokens,
} from "@atlas/theme";
import {
  createHomeAssistantStatusPanel,
  createHomeAssistantEntityState,
  createHomeAssistantConnectionConfiguration,
  createBrowserHomeAssistantWebSocket,
  createHomeAssistantRuntimeConnection,
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
const selectedEntity = document.querySelector("#selected-entity");
const entityList = document.querySelector("#atlas-entity-list");
let connection;
let removeLifecycleListener;
let panelBinding;
let activeTransport;
let removeEntityListListener;
const entitySnapshots = new Map();

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
    bindSelectedEntity(connection?.getClient()?.transport);
  } else if (lifecycle.state === "closed" || lifecycle.state === "failed") {
    bindSelectedEntity(transport);
  }
}

function currentEntityId() {
  return trackedEntityIds()[0] ?? "binary_sensor.atlas_status";
}

function trackedEntityIds() {
  return [...new Set(homeAssistantEntity.value.split(",").map(entityId => entityId.trim()).filter(Boolean))];
}

function renderEntityList() {
  entityList.replaceChildren();
  for (const entityId of trackedEntityIds()) {
    const entity = entitySnapshots.get(entityId);
    const card = document.createElement("article");
    const name = document.createElement("strong");
    const value = document.createElement("span");
    const detail = document.createElement("small");
    card.className = "atlas-entity-card";
    name.textContent = entity?.name ?? entityId;
    value.textContent = entity?.value ?? entity?.state ?? "Waiting";
    detail.textContent = entity?.unit ?? entityId;
    card.append(name, value, detail);
    entityList.append(card);
  }
}

function bindSelectedEntity(nextTransport) {
  if (!registeredPanel || !nextTransport) {
    return;
  }

  panelBinding?.dispose();
  removeEntityListListener?.();
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

    entitySnapshots.set(entity.entityId, entity);
    renderEntityList();
  });
  const usingLiveTransport = activeTransport !== transport;
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
  connection?.disconnect();
  connection = createHomeAssistantRuntimeConnection(configuration, createBrowserHomeAssistantWebSocket);
  removeLifecycleListener = connection.subscribeLifecycle(renderConnectionLifecycle);
  connection.connect(homeAssistantToken.value);
  homeAssistantToken.value = "";
}

function disconnectHomeAssistant() {
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

homeAssistantUrl.addEventListener("input", renderConnectionReadiness);
homeAssistantEntity.addEventListener("input", () => {
  bindSelectedEntity(activeTransport ?? transport);
  if (activeTransport === transport) {
    void renderEntityState("on");
  }
});
connectButton.addEventListener("click", connectHomeAssistant);
disconnectButton.addEventListener("click", disconnectHomeAssistant);

void renderEntityState("on");
renderConnectionReadiness();
