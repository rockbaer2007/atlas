import {
  createThemeTokens,
} from "@atlas/theme";
import {
  createHomeAssistantStatusPanel,
  renderHomeAssistantStatusPanel,
} from "@atlas/homeassistant";

const statusRoot = document.querySelector("#atlas-status-root");
const statusMessage = document.querySelector("#status-message");
const buttons = Array.from(document.querySelectorAll("[data-status]"));

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

async function renderStatus(status) {
  const execution = await renderHomeAssistantStatusPanel({
    panel,
    status,
    element: statusRoot,
    tokens,
  });

  if (!execution.result.mounted) {
    statusMessage.textContent = execution.result.error ?? "Status could not be mounted.";
    return;
  }

  for (const button of buttons) {
    button.setAttribute("aria-pressed", String(button.dataset.status === status));
  }
  statusMessage.textContent = `Status updated: ${status}.`;
}

for (const button of buttons) {
  button.addEventListener("click", () => {
    void renderStatus(button.dataset.status);
  });
}

void renderStatus("ready");
