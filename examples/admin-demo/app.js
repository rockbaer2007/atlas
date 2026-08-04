import {
  createRuntimePluginAdministrationView,
  createRuntimePluginInstallPackage,
  parseRuntimePluginInstallPackage,
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
const translationProvider = document.querySelector("#translation-provider");
const translationApiEndpoint = document.querySelector("#translation-api-endpoint");
const rememberAdminToken = document.querySelector("#remember-admin-token");
const autoConnectEditor = document.querySelector("#auto-connect-editor");
const saveAdminSettings = document.querySelector("#save-admin-settings");
const forgetAdminToken = document.querySelector("#forget-admin-token");
const openCardEditor = document.querySelector("#open-card-editor");
const importPluginPackage = document.querySelector("#import-plugin-package");
const pluginPackageFile = document.querySelector("#plugin-package-file");
const adminSaveState = document.querySelector("#admin-save-state");
const pluginSummary = document.querySelector("#plugin-summary");
const pluginList = document.querySelector("#plugin-list");
const policySummary = document.querySelector("#policy-summary");
const adminStorageKey = "atlas.administration.configuration";
const adminPluginStorageKey = "atlas.administration.importedPlugins";
const adminPluginStateStorageKey = "atlas.administration.pluginState";
const adminConnectionCookieName = "atlas_admin_connection";
const adminConnectionApiPath = "/api/admin-connection";
const defaultTranslationApiEndpoint = "https://api.deepl.com/v2/translate";
const editorOrigin = "http://127.0.0.1:4174";
const pluginCatalog = new RuntimePluginCatalog();
pluginCatalog.register(createHomeAssistantCardEditorPlugin());

let currentLanguage = "en";
let activePluginIds = new Set([HomeAssistantCardEditorPluginId]);
let importedPluginDescriptors = [];
let lastEditorWindow;

const translations = {
  en: {
    "page.title": "ATLAS Administration",
    "page.subtitle": "Manage plugins, install packages and central Home Assistant access.",
    "heading.access": "Connection settings",
    "heading.plugins": "Installed plugins",
    "heading.policy": "Plugin access policy",
    "label.haUrl": "Home Assistant URL",
    "label.accessToken": "Access token",
    "label.translationProvider": "Translation module",
    "label.translationApiEndpoint": "Translation API endpoint",
    "label.rememberToken": "Remember token locally for Administration",
    "label.autoConnectEditor": "Auto-connect Card Editor after handoff",
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
    "button.importPackage": "Import package",
    "button.removeImportedPackage": "Remove import",
    "provider.none": "None / fallback files",
    "provider.chatgpt": "ChatGPT / OpenAI",
    "provider.deeplFree": "DeepL API Free",
    "provider.deeplPro": "DeepL API Pro",
    "provider.customAi": "Custom AI provider",
    "aria.language": "Language",
    "message.accessHint": "Tokens stay in Administration. Plugins receive approved paths and capabilities only.",
    "message.translationApiEndpointHint": "DeepL translate request reference:",
    "message.pluginsHint": "The Home Assistant Card Editor is the first official reference plugin.",
    "message.pluginSummary": "{total} plugins, {active} active, {available} available, {disabled} disabled",
    "message.policySummary": "Current approved context: Home Assistant URL {url}, WebSocket path {websocket}.",
    "message.saved": "Settings saved.",
    "message.savedWithToken": "Token saved.",
    "message.tokenForgotten": "Token forgotten.",
    "message.autoConnectNeedsToken": "Auto-connect needs a saved access token.",
    "message.editorOpened": "Card Editor opened and connection settings handed over.",
    "message.editorReady": "Card Editor requested connection settings.",
    "message.editorTokenMissing": "Save or enter an access token before opening the Card Editor.",
    "message.pluginInspected": "{name}: {points} extension points, {capabilities} capabilities.",
    "message.pluginActivated": "{name} activated.",
    "message.pluginDeactivated": "{name} deactivated.",
    "message.pluginPackageExported": "{name} plugin package exported.",
    "message.pluginPackageImported": "{name} plugin package imported.",
    "message.pluginPackageDuplicate": "{name} is already installed.",
    "message.pluginPackageImportFailed": "Plugin package could not be imported.",
    "message.pluginPackageRemoved": "{name} imported package removed.",
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
    "label.translationProvider": "Uebersetzungsmodul",
    "label.translationApiEndpoint": "Uebersetzungs-API-Endpunkt",
    "label.rememberToken": "Token lokal fuer die Administration merken",
    "label.autoConnectEditor": "Card Editor nach Uebergabe automatisch verbinden",
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
    "button.importPackage": "Paket importieren",
    "button.removeImportedPackage": "Import entfernen",
    "provider.none": "Keins / Fallback-Dateien",
    "provider.chatgpt": "ChatGPT / OpenAI",
    "provider.deeplFree": "DeepL API Free",
    "provider.deeplPro": "DeepL API Pro",
    "provider.customAi": "Eigener KI-Anbieter",
    "aria.language": "Sprache",
    "message.accessHint": "Tokens bleiben in der Administration. Plugins erhalten nur freigegebene Pfade und Faehigkeiten.",
    "message.translationApiEndpointHint": "DeepL-Translate-Request-Referenz:",
    "message.pluginsHint": "Der Home Assistant Card Editor ist das erste offizielle Referenz-Plugin.",
    "message.pluginSummary": "{total} Plugins, {active} aktiv, {available} verfuegbar, {disabled} deaktiviert",
    "message.policySummary": "Aktuell freigegebener Kontext: Home-Assistant-URL {url}, WebSocket-Pfad {websocket}.",
    "message.saved": "Einstellungen gespeichert.",
    "message.savedWithToken": "Token gespeichert.",
    "message.tokenForgotten": "Token vergessen.",
    "message.autoConnectNeedsToken": "Auto-connect braucht einen gespeicherten Access Token.",
    "message.editorOpened": "Card Editor geoeffnet und Verbindungseinstellungen uebergeben.",
    "message.editorReady": "Card Editor hat Verbindungseinstellungen angefordert.",
    "message.editorTokenMissing": "Gib zuerst einen Access Token ein oder speichere ihn, bevor du den Card Editor oeffnest.",
    "message.pluginInspected": "{name}: {points} Extension Points, {capabilities} Faehigkeiten.",
    "message.pluginActivated": "{name} aktiviert.",
    "message.pluginDeactivated": "{name} deaktiviert.",
    "message.pluginPackageExported": "{name} Plugin-Paket exportiert.",
    "message.pluginPackageImported": "{name} Plugin-Paket importiert.",
    "message.pluginPackageDuplicate": "{name} ist bereits installiert.",
    "message.pluginPackageImportFailed": "Plugin-Paket konnte nicht importiert werden.",
    "message.pluginPackageRemoved": "{name} importiertes Paket entfernt.",
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

function normalizeTranslationProvider(value) {
  return ["none", "chatgpt", "deepl-free", "deepl-pro", "custom-ai"].includes(value) ? value : "none";
}

function normalizeTranslationApiEndpoint(value) {
  if (typeof value !== "string" || !value.trim()) {
    return defaultTranslationApiEndpoint;
  }

  try {
    const url = new URL(value.trim());
    return url.protocol === "https:" ? url.toString() : defaultTranslationApiEndpoint;
  } catch {
    return defaultTranslationApiEndpoint;
  }
}

function persistConfiguration() {
  const token = homeAssistantToken.value.trim();
  const configuration = {
    language: currentLanguage,
    url: homeAssistantUrl.value,
    translationProvider: normalizeTranslationProvider(translationProvider.value),
    translationApiEndpoint: normalizeTranslationApiEndpoint(translationApiEndpoint.value),
    rememberToken: rememberAdminToken.checked,
    autoConnectEditor: autoConnectEditor.checked && rememberAdminToken.checked && Boolean(token),
    token: rememberAdminToken.checked ? token : undefined,
  };
  localStorage.setItem(adminStorageKey, JSON.stringify(configuration));
  persistSharedConnectionCookie(configuration);
  void persistServerConnectionSettings(configuration);
}

async function persistServerConnectionSettings(configuration) {
  await fetch(adminConnectionApiPath, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      url: configuration.url,
      token: configuration.rememberToken ? configuration.token : "",
      autoConnectEditor: configuration.autoConnectEditor,
      translationProvider: configuration.translationProvider,
      translationApiEndpoint: configuration.translationApiEndpoint,
    }),
  });
}

function persistSharedConnectionCookie(configuration) {
  if (!configuration.rememberToken || !configuration.token) {
    deleteSharedConnectionCookie();
    return;
  }

  document.cookie = [
    `${adminConnectionCookieName}=${encodeURIComponent(JSON.stringify({
      url: configuration.url,
      token: configuration.token,
      autoConnectEditor: configuration.autoConnectEditor,
      translationProvider: configuration.translationProvider,
      translationApiEndpoint: configuration.translationApiEndpoint,
      updatedAt: new Date().toISOString(),
    }))}`,
    "path=/",
    "max-age=2592000",
    "SameSite=Lax",
  ].join("; ");
}

function deleteSharedConnectionCookie() {
  document.cookie = `${adminConnectionCookieName}=; path=/; max-age=0; SameSite=Lax`;
}

function saveConnectionSettings() {
  const token = homeAssistantToken.value.trim();
  if (token) {
    rememberAdminToken.checked = true;
  }
  if (autoConnectEditor.checked && !token) {
    autoConnectEditor.checked = false;
    adminSaveState.textContent = t("message.autoConnectNeedsToken");
  } else {
    adminSaveState.textContent = token ? t("message.savedWithToken") : t("message.saved");
  }
  persistConfiguration();
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
    if (typeof saved?.translationProvider === "string") {
      translationProvider.value = normalizeTranslationProvider(saved.translationProvider);
    }
    if (typeof saved?.translationApiEndpoint === "string") {
      translationApiEndpoint.value = normalizeTranslationApiEndpoint(saved.translationApiEndpoint);
    }
    if (saved?.rememberToken === true) {
      rememberAdminToken.checked = true;
      if (typeof saved.token === "string") {
        homeAssistantToken.value = saved.token;
      }
    }
    if (saved?.autoConnectEditor === true && saved?.rememberToken === true && typeof saved.token === "string" && saved.token) {
      autoConnectEditor.checked = true;
    }
  } catch {
    localStorage.removeItem(adminStorageKey);
  }
}

function restoreImportedPlugins() {
  try {
    const saved = JSON.parse(localStorage.getItem(adminPluginStorageKey) ?? "[]");
    importedPluginDescriptors = Array.isArray(saved)
      ? saved.filter(plugin =>
        plugin
        && typeof plugin.id === "string"
        && typeof plugin.name === "string"
        && typeof plugin.version === "string",
      )
      : [];
  } catch {
    importedPluginDescriptors = [];
    localStorage.removeItem(adminPluginStorageKey);
  }
}

function persistImportedPlugins() {
  localStorage.setItem(adminPluginStorageKey, JSON.stringify(importedPluginDescriptors));
}

function restorePluginState() {
  try {
    const saved = JSON.parse(localStorage.getItem(adminPluginStateStorageKey) ?? "null");
    const savedPluginIds = Array.isArray(saved?.activePluginIds)
      ? saved.activePluginIds.filter(pluginId => typeof pluginId === "string")
      : undefined;
    activePluginIds = new Set(savedPluginIds ?? [HomeAssistantCardEditorPluginId]);
  } catch {
    activePluginIds = new Set([HomeAssistantCardEditorPluginId]);
    localStorage.removeItem(adminPluginStateStorageKey);
  }
}

function persistPluginState() {
  localStorage.setItem(adminPluginStateStorageKey, JSON.stringify({
    activePluginIds: [...activePluginIds],
  }));
}

function currentPluginDescriptors() {
  return [
    ...pluginCatalog.list(),
    ...importedPluginDescriptors,
  ];
}

function isImportedPlugin(pluginId) {
  return importedPluginDescriptors.some(plugin => plugin.id === pluginId);
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
    autoConnect: autoConnectEditor.checked,
    translationProvider: normalizeTranslationProvider(translationProvider.value),
    translationApiEndpoint: normalizeTranslationApiEndpoint(translationApiEndpoint.value),
    sentAt: new Date().toISOString(),
  };
}

function postEditorConnectionHandoff(editorWindow) {
  if (!editorWindow || !homeAssistantToken.value) {
    return false;
  }

  editorWindow.postMessage(createEditorConnectionHandoff(), editorOrigin);
  return true;
}

function openEditorWithConnectionHandoff() {
  if (!homeAssistantToken.value) {
    adminSaveState.textContent = t("message.editorTokenMissing");
    return;
  }

  persistConfiguration();
  lastEditorWindow = window.open(`${editorOrigin}/?atlasAdminHandoff=1`, "atlas-card-editor");
  if (!lastEditorWindow) {
    return;
  }

  let attempts = 0;
  const timer = window.setInterval(() => {
    attempts += 1;
    postEditorConnectionHandoff(lastEditorWindow);
    if (attempts >= 12) {
      window.clearInterval(timer);
    }
  }, 350);

  adminSaveState.textContent = t("message.editorOpened");
}

function receiveEditorReady(event) {
  if (event.origin !== editorOrigin || event.data?.type !== "atlas.editor.ready.v1") {
    return;
  }

  lastEditorWindow = event.source;
  adminSaveState.textContent = t("message.editorReady");
  postEditorConnectionHandoff(lastEditorWindow);
}

function handlePluginAction(action, plugin) {
  if (action === "activate") {
    activePluginIds.add(plugin.id);
    persistPluginState();
    adminSaveState.textContent = t("message.pluginActivated", { name: plugin.name });
    renderAdministration();
    return;
  }

  if (action === "deactivate") {
    activePluginIds.delete(plugin.id);
    persistPluginState();
    adminSaveState.textContent = t("message.pluginDeactivated", { name: plugin.name });
    renderAdministration();
    return;
  }

  if (action === "export-package") {
    const pluginPackage = plugin.id === HomeAssistantCardEditorPluginId
      ? createHomeAssistantCardEditorPluginInstallPackage()
      : createRuntimePluginInstallPackage({ plugin });
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

function removeImportedPluginPackage(plugin) {
  if (!isImportedPlugin(plugin.id)) {
    return;
  }

  importedPluginDescriptors = importedPluginDescriptors.filter(entry => entry.id !== plugin.id);
  activePluginIds.delete(plugin.id);
  persistImportedPlugins();
  persistPluginState();
  renderAdministration();
  adminSaveState.textContent = t("message.pluginPackageRemoved", { name: plugin.name });
}

async function importSelectedPluginPackage() {
  const file = pluginPackageFile.files?.[0];
  if (!file) {
    return;
  }

  try {
    const installPackage = parseRuntimePluginInstallPackage(await file.text());
    const plugin = installPackage.plugin;
    const existing = currentPluginDescriptors().find(entry => entry.id === plugin.id);

    if (existing) {
      adminSaveState.textContent = t("message.pluginPackageDuplicate", { name: existing.name });
      return;
    }

    importedPluginDescriptors = [...importedPluginDescriptors, plugin];
    persistImportedPlugins();
    renderAdministration();
    adminSaveState.textContent = t("message.pluginPackageImported", { name: plugin.name });
  } catch {
    adminSaveState.textContent = t("message.pluginPackageImportFailed");
  } finally {
    pluginPackageFile.value = "";
  }
}

function renderAdministration() {
  const view = createRuntimePluginAdministrationView({
    plugins: currentPluginDescriptors(),
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

    if (isImportedPlugin(plugin.id)) {
      const removeButton = document.createElement("button");
      removeButton.type = "button";
      removeButton.className = "secondary";
      removeButton.textContent = t("button.removeImportedPackage");
      removeButton.addEventListener("click", () => removeImportedPluginPackage(plugin));
      actions.append(removeButton);
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
restoreImportedPlugins();
restorePluginState();
if (rememberAdminToken.checked && homeAssistantToken.value.trim()) {
  persistConfiguration();
}
applyTranslations();
renderAdministration();

for (const button of languageButtons) {
  button.addEventListener("click", () => setLanguage(button.dataset.language));
}

homeAssistantUrl.addEventListener("input", () => {
  renderAdministration();
  persistConfiguration();
});

translationProvider.addEventListener("change", persistConfiguration);
translationApiEndpoint.addEventListener("input", persistConfiguration);

homeAssistantToken.addEventListener("input", () => {
  if (rememberAdminToken.checked) {
    persistConfiguration();
  }
});

rememberAdminToken.addEventListener("change", () => {
  if (!rememberAdminToken.checked) {
    homeAssistantToken.value = "";
    autoConnectEditor.checked = false;
  }
  persistConfiguration();
});

autoConnectEditor.addEventListener("change", () => {
  if (autoConnectEditor.checked) {
    rememberAdminToken.checked = true;
    if (!homeAssistantToken.value.trim()) {
      adminSaveState.textContent = t("message.autoConnectNeedsToken");
    }
  }
  persistConfiguration();
});

window.addEventListener("message", receiveEditorReady);

saveAdminSettings.addEventListener("click", saveConnectionSettings);

openCardEditor.addEventListener("click", openEditorWithConnectionHandoff);
importPluginPackage.addEventListener("click", () => pluginPackageFile.click());
pluginPackageFile.addEventListener("change", importSelectedPluginPackage);

forgetAdminToken.addEventListener("click", () => {
  homeAssistantToken.value = "";
  rememberAdminToken.checked = false;
  autoConnectEditor.checked = false;
  persistConfiguration();
  adminSaveState.textContent = t("message.tokenForgotten");
});
