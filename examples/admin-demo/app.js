import {
  createRuntimePluginAdministrationView,
  RuntimePluginCatalog,
} from "@atlas/runtime";
import {
  createHomeAssistantCardEditorPlugin,
  createHomeAssistantCardEditorPluginInstallPackage,
  createHomeAssistantConnectionConfiguration,
  deriveHomeAssistantWebSocketUrl,
  HomeAssistantCardEditorPluginId,
} from "@atlas/homeassistant";

const languageButtons = Array.from(document.querySelectorAll("[data-language]"));
const homeAssistantUrl = document.querySelector("#home-assistant-url");
const homeAssistantToken = document.querySelector("#home-assistant-token");
const rememberAdminToken = document.querySelector("#remember-admin-token");
const saveAdminSettings = document.querySelector("#save-admin-settings");
const forgetAdminToken = document.querySelector("#forget-admin-token");
const openCardEditor = document.querySelector("#open-card-editor");
const adminSaveState = document.querySelector("#admin-save-state");
const pluginSummary = document.querySelector("#plugin-summary");
const pluginList = document.querySelector("#plugin-list");
const policySummary = document.querySelector("#policy-summary");
const adminStorageKey = "atlas.administration.configuration";
const editorOrigin = "http://127.0.0.1:4174";
const pluginCatalog = new RuntimePluginCatalog();
pluginCatalog.register(createHomeAssistantCardEditorPlugin());

let currentLanguage = "en";
let activePluginIds = new Set([HomeAssistantCardEditorPluginId]);

const translations = {
  en: {
    "page.title": "ATLAS Administration",
    "page.subtitle": "Manage plugins, install packages and central Home Assistant access.",
    "heading.access": "Connection settings",
    "heading.plugins": "Installed plugins",
    "heading.policy": "Plugin access policy",
    "label.haUrl": "Home Assistant URL",
    "label.accessToken": "Access token",
    "label.rememberToken": "Remember token locally for Administration",
    "label.version": "Version",
    "label.extensionPoints": "Extension points",
    "label.capabilities": "Capabilities",
    "button.saveSettings": "Save settings",
    "button.forgetToken": "Forget token",
    "button.openEditor": "Open Card Editor",
    "button.inspect": "Inspect",
    "button.activate": "Activate",
    "button.deactivate": "Deactivate",
    "button.exportPackage": "Export package",
    "aria.language": "Language",
    "message.accessHint": "Tokens stay in Administration. Plugins receive approved paths and capabilities only.",
    "message.pluginsHint": "The Home Assistant Card Editor is the first official reference plugin.",
    "message.pluginSummary": "{total} plugins, {active} active, {available} available, {disabled} disabled",
    "message.policySummary": "Current approved context: Home Assistant URL {url}, WebSocket path {websocket}.",
    "message.saved": "Settings saved.",
    "message.tokenForgotten": "Token forgotten.",
    "message.editorOpened": "Card Editor opened and connection settings handed over.",
    "message.editorTokenMissing": "Save or enter an access token before opening the Card Editor.",
    "message.pluginInspected": "{name}: {points} extension points, {capabilities} capabilities.",
    "message.pluginActivated": "{name} activated.",
    "message.pluginDeactivated": "{name} deactivated.",
    "message.pluginPackageExported": "{name} plugin package exported.",
    "policy.token": "The Card Editor receives the token only as a browser session handoff.",
    "policy.paths": "Plugins receive approved URLs, WebSocket paths and resource paths.",
    "policy.capabilities": "Capabilities are declared through the Runtime plugin manifest.",
    "text.pluginStatusAvailable": "Available",
    "text.pluginStatusActive": "Active",
    "text.pluginStatusDisabled": "Disabled",
  },
  de: {
    "page.title": "ATLAS Administration",
    "page.subtitle": "Plugins, Installpakete und zentralen Home-Assistant-Zugriff verwalten.",
    "heading.access": "Verbindungseinstellungen",
    "heading.plugins": "Installierte Plugins",
    "heading.policy": "Plugin-Zugriffsregel",
    "label.haUrl": "Home Assistant URL",
    "label.accessToken": "Access Token",
    "label.rememberToken": "Token lokal fuer die Administration merken",
    "label.version": "Version",
    "label.extensionPoints": "Extension Points",
    "label.capabilities": "Faehigkeiten",
    "button.saveSettings": "Einstellungen speichern",
    "button.forgetToken": "Token vergessen",
    "button.openEditor": "Card Editor oeffnen",
    "button.inspect": "Pruefen",
    "button.activate": "Aktivieren",
    "button.deactivate": "Deaktivieren",
    "button.exportPackage": "Paket exportieren",
    "aria.language": "Sprache",
    "message.accessHint": "Tokens bleiben in der Administration. Plugins erhalten nur freigegebene Pfade und Faehigkeiten.",
    "message.pluginsHint": "Der Home Assistant Card Editor ist das erste offizielle Referenz-Plugin.",
    "message.pluginSummary": "{total} Plugins, {active} aktiv, {available} verfuegbar, {disabled} deaktiviert",
    "message.policySummary": "Aktuell freigegebener Kontext: Home-Assistant-URL {url}, WebSocket-Pfad {websocket}.",
    "message.saved": "Einstellungen gespeichert.",
    "message.tokenForgotten": "Token vergessen.",
    "message.editorOpened": "Card Editor geoeffnet und Verbindungseinstellungen uebergeben.",
    "message.editorTokenMissing": "Gib zuerst einen Access Token ein oder speichere ihn, bevor du den Card Editor oeffnest.",
    "message.pluginInspected": "{name}: {points} Extension Points, {capabilities} Faehigkeiten.",
    "message.pluginActivated": "{name} aktiviert.",
    "message.pluginDeactivated": "{name} deaktiviert.",
    "message.pluginPackageExported": "{name} Plugin-Paket exportiert.",
    "policy.token": "Der Card Editor erhaelt den Token nur als Browser-Sitzungsuebergabe.",
    "policy.paths": "Plugins erhalten freigegebene URLs, WebSocket-Pfade und Ressourcenpfade.",
    "policy.capabilities": "Faehigkeiten werden ueber das Runtime-Plugin-Manifest deklariert.",
    "text.pluginStatusAvailable": "Verfuegbar",
    "text.pluginStatusActive": "Aktiv",
    "text.pluginStatusDisabled": "Deaktiviert",
  },
};

function t(key, values = {}) {
  let text = translations[currentLanguage]?.[key] ?? translations.en[key] ?? key;
  for (const [name, value] of Object.entries(values)) {
    text = text.replaceAll(`{${name}}`, String(value));
  }
  return text;
}

function applyTranslations() {
  document.documentElement.lang = currentLanguage;
  document.title = t("page.title");
  for (const element of document.querySelectorAll("[data-i18n]")) {
    element.textContent = t(element.dataset.i18n);
  }
  for (const element of document.querySelectorAll("[data-i18n-aria-label]")) {
    element.setAttribute("aria-label", t(element.dataset.i18nAriaLabel));
  }
  for (const button of languageButtons) {
    button.setAttribute("aria-pressed", String(button.dataset.language === currentLanguage));
  }
}

function currentWebSocketPath() {
  try {
    const configuration = createHomeAssistantConnectionConfiguration({ url: homeAssistantUrl.value });
    return deriveHomeAssistantWebSocketUrl(configuration);
  } catch {
    return "-";
  }
}

function persistConfiguration() {
  localStorage.setItem(adminStorageKey, JSON.stringify({
    language: currentLanguage,
    url: homeAssistantUrl.value,
    rememberToken: rememberAdminToken.checked,
    token: rememberAdminToken.checked ? homeAssistantToken.value : undefined,
  }));
}

function restoreConfiguration() {
  try {
    const saved = JSON.parse(localStorage.getItem(adminStorageKey) ?? "null");
    if (saved?.language === "de" || saved?.language === "en") {
      currentLanguage = saved.language;
    }
    if (typeof saved?.url === "string") {
      homeAssistantUrl.value = saved.url;
    }
    if (saved?.rememberToken === true) {
      rememberAdminToken.checked = true;
      if (typeof saved.token === "string") {
        homeAssistantToken.value = saved.token;
      }
    }
  } catch {
    localStorage.removeItem(adminStorageKey);
  }
}

function translatePluginStatus(status) {
  if (status === "active") return t("text.pluginStatusActive");
  if (status === "disabled") return t("text.pluginStatusDisabled");
  return t("text.pluginStatusAvailable");
}

function translatePluginAction(action) {
  if (action === "activate") return t("button.activate");
  if (action === "deactivate") return t("button.deactivate");
  if (action === "export-package") return t("button.exportPackage");
  return t("button.inspect");
}

function createDetail(label, values) {
  const detail = document.createElement("div");
  const caption = document.createElement("div");
  const chips = document.createElement("div");
  caption.className = "detail-label";
  chips.className = "chip-list";
  caption.textContent = label;

  for (const value of values) {
    const chip = document.createElement("span");
    chip.textContent = value;
    chips.append(chip);
  }

  detail.append(caption, chips);
  return detail;
}

function downloadTextFile(filename, content, type) {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(new Blob([content], { type }));
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

function createEditorConnectionHandoff() {
  return {
    type: "atlas.admin.connection.v1",
    url: homeAssistantUrl.value.trim(),
    token: homeAssistantToken.value,
    autoConnect: false,
    sentAt: new Date().toISOString(),
  };
}

function openEditorWithConnectionHandoff() {
  if (!homeAssistantToken.value) {
    adminSaveState.textContent = t("message.editorTokenMissing");
    return;
  }

  persistConfiguration();
  const editorWindow = window.open(`${editorOrigin}/?atlasAdminHandoff=1`, "atlas-card-editor");
  if (!editorWindow) {
    return;
  }

  const handoff = createEditorConnectionHandoff();
  let attempts = 0;
  const timer = window.setInterval(() => {
    attempts += 1;
    editorWindow.postMessage(handoff, editorOrigin);
    if (attempts >= 12) {
      window.clearInterval(timer);
    }
  }, 350);

  adminSaveState.textContent = t("message.editorOpened");
}

function handlePluginAction(action, plugin) {
  if (action === "activate") {
    activePluginIds.add(plugin.id);
    adminSaveState.textContent = t("message.pluginActivated", { name: plugin.name });
    renderAdministration();
    return;
  }

  if (action === "deactivate") {
    activePluginIds.delete(plugin.id);
    adminSaveState.textContent = t("message.pluginDeactivated", { name: plugin.name });
    renderAdministration();
    return;
  }

  if (action === "export-package") {
    const pluginPackage = createHomeAssistantCardEditorPluginInstallPackage();
    downloadTextFile(pluginPackage.filename, JSON.stringify(pluginPackage, null, 2), "application/json");
    adminSaveState.textContent = t("message.pluginPackageExported", { name: plugin.name });
    return;
  }

  adminSaveState.textContent = t("message.pluginInspected", {
    name: plugin.name,
    points: plugin.extensionPoints.length,
    capabilities: plugin.provides.length,
  });
}

function renderAdministration() {
  const view = createRuntimePluginAdministrationView({
    plugins: pluginCatalog,
    activePluginIds: [...activePluginIds],
  });
  pluginSummary.textContent = t("message.pluginSummary", view.summary);
  policySummary.textContent = t("message.policySummary", {
    url: homeAssistantUrl.value.trim() || "-",
    websocket: currentWebSocketPath(),
  });
  pluginList.replaceChildren();

  for (const plugin of view.plugins) {
    const item = document.createElement("article");
    const header = document.createElement("div");
    const titleGroup = document.createElement("div");
    const title = document.createElement("h3");
    const description = document.createElement("p");
    const status = document.createElement("span");
    const details = document.createElement("div");
    const actions = document.createElement("div");

    item.className = "plugin-card";
    header.className = "plugin-header";
    status.className = "plugin-status";
    details.className = "plugin-details";
    actions.className = "action-grid";

    title.textContent = plugin.name;
    description.textContent = plugin.description ?? plugin.id;
    status.textContent = translatePluginStatus(plugin.status);
    titleGroup.append(title, description);
    header.append(titleGroup, status);

    details.append(
      createDetail(t("label.version"), [plugin.version]),
      createDetail(t("label.extensionPoints"), plugin.extensionPoints),
      createDetail(t("label.capabilities"), plugin.provides),
    );

    for (const action of plugin.actions) {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = translatePluginAction(action);
      button.addEventListener("click", () => handlePluginAction(action, plugin));
      actions.append(button);
    }

    item.append(header, details, actions);
    pluginList.append(item);
  }
}

function setLanguage(language) {
  currentLanguage = language === "de" ? "de" : "en";
  applyTranslations();
  renderAdministration();
  persistConfiguration();
}

restoreConfiguration();
applyTranslations();
renderAdministration();

for (const button of languageButtons) {
  button.addEventListener("click", () => setLanguage(button.dataset.language));
}

homeAssistantUrl.addEventListener("input", () => {
  renderAdministration();
  persistConfiguration();
});

homeAssistantToken.addEventListener("input", () => {
  if (rememberAdminToken.checked) {
    persistConfiguration();
  }
});

rememberAdminToken.addEventListener("change", () => {
  if (!rememberAdminToken.checked) {
    homeAssistantToken.value = "";
  }
  persistConfiguration();
});

saveAdminSettings.addEventListener("click", () => {
  persistConfiguration();
  adminSaveState.textContent = t("message.saved");
});

openCardEditor.addEventListener("click", openEditorWithConnectionHandoff);

forgetAdminToken.addEventListener("click", () => {
  homeAssistantToken.value = "";
  rememberAdminToken.checked = false;
  persistConfiguration();
  adminSaveState.textContent = t("message.tokenForgotten");
});
