import {
  createThemeTokens,
} from "@atlas/theme";
import {
  createHomeAssistantStatusPanel,
  createHomeAssistantEntityState,
  createHomeAssistantStatusPanelRegistry,
  findHomeAssistantStatusPanel,
  renderHomeAssistantEntityStatusPanel,
} from "@atlas/homeassistant";

const statusRoot = document.querySelector("#atlas-status-root");
const statusMessage = document.querySelector("#status-message");
const buttons = Array.from(document.querySelectorAll("[data-entity-state]"));

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

async function renderEntityState(state) {
  const registeredPanel = findHomeAssistantStatusPanel(panelRegistry, panel.id);
  if (!registeredPanel) {
    statusMessage.textContent = "Status panel is not registered.";
    return;
  }

  const execution = await renderHomeAssistantEntityStatusPanel({
    panel: registeredPanel,
    entity: createHomeAssistantEntityState({
      entityId: "binary_sensor.atlas_status",
      state,
    }),
    element: statusRoot,
    tokens,
  });

  if (!execution.result.mounted) {
    statusMessage.textContent = execution.result.error ?? "Status could not be mounted.";
    return;
  }

  for (const button of buttons) {
    button.setAttribute("aria-pressed", String(button.dataset.entityState === state));
  }
  statusMessage.textContent = `Entity state updated: ${state}.`;
}

for (const button of buttons) {
  button.addEventListener("click", () => {
    void renderEntityState(button.dataset.entityState);
  });
}

void renderEntityState("on");
