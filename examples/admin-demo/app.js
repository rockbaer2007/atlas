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
const translationProviderInputs = Array.from(document.querySelectorAll('input[name="translation-provider"]'));
const translationApiKeyInputs = {
  chatgpt: document.querySelector("#translation-api-key-chatgpt"),
  gemini: document.querySelector("#translation-api-key-gemini"),
  "deepl-free": document.querySelector("#translation-api-key-deepl-free"),
  "deepl-pro": document.querySelector("#translation-api-key-deepl-pro"),
  "custom-ai": document.querySelector("#translation-api-key-custom-ai"),
};
const rememberAdminToken = document.querySelector("#remember-admin-token");
const autoConnectEditor = document.querySelector("#auto-connect-editor");
const saveAdminSettings = document.querySelector("#save-admin-settings");
const forgetAdminToken = document.querySelector("#forget-admin-token");
const exportAdminSettings = document.querySelector("#export-admin-settings");
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
const adminSecretsCookieName = "atlas_admin_secrets";
const adminSecretsKeyStorageKey = "atlas.administration.secretsCookieKey";
const legacyAdminTranslationApiKeysCookieName = "atlas_admin_translation_api_keys";
const legacyAdminTranslationApiKeysKeyStorageKey = "atlas.administration.translationApiKeysCookieKey";
const adminConnectionApiPath = "/api/admin-connection";
const adminDeviceApiPath = "/api/admin-device";
const defaultTranslationApiEndpoint = "https://api.deepl.com/v2/translate";
const translationProviderValues = ["none", "chatgpt", "gemini", "deepl-free", "deepl-pro", "custom-ai"];
const editorOrigin = "http://127.0.0.1:4174";
const longTermCookieMaxAge = 31536000;
const pluginCatalog = new RuntimePluginCatalog();
pluginCatalog.register(createHomeAssistantCardEditorPlugin());

let currentLanguage = "en";
let activePluginIds = new Set([HomeAssistantCardEditorPluginId]);
let importedPluginDescriptors = [];
let lastEditorWindow;
let currentAdminDeviceBinding;

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
    "label.rememberToken": "Remember token locally for Administration",
    "label.autoConnectEditor": "Auto-connect Card Editor after handoff",
    "label.version": "Version",
    "label.extensionPoints": "Extension points",
    "label.capabilities": "Capabilities",
    "button.saveSettings": "Save settings",
    "button.forgetToken": "Forget token",
    "button.exportSettings": "Export settings",
    "button.openEditor": "Open Card Editor",
    "button.inspect": "Inspect",
    "button.activate": "Activate",
    "button.deactivate": "Deactivate",
    "button.exportPackage": "Export package",
    "button.importPackage": "Import package",
    "button.removeImportedPackage": "Remove import",
    "provider.none": "Default / fallback files",
    "provider.chatgpt": "ChatGPT / OpenAI",
    "provider.gemini": "Gemini",
    "provider.deeplFree": "DeepL API Free",
    "provider.deeplPro": "DeepL API Pro",
    "provider.customAi": "Custom AI provider",
    "placeholder.chatgptApiKey": "OpenAI API key later",
    "placeholder.geminiApiKey": "Gemini API key later",
    "placeholder.deeplFreeApiKey": "Free API key later",
    "placeholder.deeplProApiKey": "Pro API key later",
    "placeholder.customAiApiKey": "Custom provider API key later",
    "aria.language": "Language",
    "message.accessHint": "Tokens stay in Administration. Plugins receive approved paths and capabilities only.",
    "message.openAiApiKeyLink": "Get OpenAI API key:",
    "message.geminiApiKeyLink": "Get Gemini API key:",
    "message.deeplApiKeyLink": "Get DeepL API key:",
    "message.pluginsHint": "The Home Assistant Card Editor is the first official reference plugin.",
    "message.pluginSummary": "{total} plugins, {active} active, {available} available, {disabled} disabled",
    "message.policySummary": "Current approved context: Home Assistant URL {url}, WebSocket path {websocket}.",
    "message.saved": "Settings saved.",
    "message.savedWithToken": "Token saved.",
    "message.tokenForgotten": "Token forgotten.",
    "message.settingsExported": "Settings exported.",
    "message.secretsInvalidForDevice": "Saved secrets belong to another Atlas Administration instance and were ignored.",
    "message.autoConnectNeedsToken": "Auto-connect needs a saved access token.",
    "message.editorOpened": "Card Editor opened and connection settings handed over.",
    "message.editorOpenedWithoutToken": "Card Editor opened. Home Assistant connection still needs a saved access token.",
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
    "label.rememberToken": "Token lokal fuer die Administration merken",
    "label.autoConnectEditor": "Card Editor nach Uebergabe automatisch verbinden",
    "label.version": "Version",
    "label.extensionPoints": "Extension Points",
    "label.capabilities": "Faehigkeiten",
    "button.saveSettings": "Einstellungen speichern",
    "button.forgetToken": "Token vergessen",
    "button.exportSettings": "Einstellungen exportieren",
    "button.openEditor": "Card Editor oeffnen",
    "button.inspect": "Pruefen",
    "button.activate": "Aktivieren",
    "button.deactivate": "Deaktivieren",
    "button.exportPackage": "Paket exportieren",
    "button.importPackage": "Paket importieren",
    "button.removeImportedPackage": "Import entfernen",
    "provider.none": "Standard / Fallback-Dateien",
    "provider.chatgpt": "ChatGPT / OpenAI",
    "provider.gemini": "Gemini",
    "provider.deeplFree": "DeepL API Free",
    "provider.deeplPro": "DeepL API Pro",
    "provider.customAi": "Eigener KI-Anbieter",
    "placeholder.chatgptApiKey": "OpenAI API-Key spaeter",
    "placeholder.geminiApiKey": "Gemini API-Key spaeter",
    "placeholder.deeplFreeApiKey": "Kostenloser API-Key spaeter",
    "placeholder.deeplProApiKey": "Kostenpflichtiger API-Key spaeter",
    "placeholder.customAiApiKey": "Eigener Provider-API-Key spaeter",
    "aria.language": "Sprache",
    "message.accessHint": "Tokens bleiben in der Administration. Plugins erhalten nur freigegebene Pfade und Faehigkeiten.",
    "message.openAiApiKeyLink": "OpenAI API-Key erhalten:",
    "message.geminiApiKeyLink": "Gemini API-Key erhalten:",
    "message.deeplApiKeyLink": "DeepL API-Key erhalten:",
    "message.pluginsHint": "Der Home Assistant Card Editor ist das erste offizielle Referenz-Plugin.",
    "message.pluginSummary": "{total} Plugins, {active} aktiv, {available} verfuegbar, {disabled} deaktiviert",
    "message.policySummary": "Aktuell freigegebener Kontext: Home-Assistant-URL {url}, WebSocket-Pfad {websocket}.",
    "message.saved": "Einstellungen gespeichert.",
    "message.savedWithToken": "Token gespeichert.",
    "message.tokenForgotten": "Token vergessen.",
    "message.settingsExported": "Einstellungen exportiert.",
    "message.secretsInvalidForDevice": "Gespeicherte Secrets gehoeren zu einer anderen Atlas-Administration-Instanz und wurden ignoriert.",
    "message.autoConnectNeedsToken": "Auto-connect braucht einen gespeicherten Access Token.",
    "message.editorOpened": "Card Editor geoeffnet und Verbindungseinstellungen uebergeben.",
    "message.editorOpenedWithoutToken": "Card Editor geoeffnet. Die Home-Assistant-Verbindung braucht noch einen gespeicherten Access Token.",
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
  for (const element of document.querySelectorAll("[data-i18n-placeholder]")) {
    element.setAttribute("placeholder", t(element.dataset.i18nPlaceholder));
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
  return translationProviderValues.includes(value) ? value : "none";
}

function currentTranslationProvider() {
  return normalizeTranslationProvider(translationProviderInputs.find(input => input.checked)?.value);
}

function setTranslationProvider(value) {
  const normalizedProvider = normalizeTranslationProvider(value);
  for (const input of translationProviderInputs) {
    input.checked = input.value === normalizedProvider;
  }
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

function readTranslationApiKeys() {
  return Object.fromEntries(
    Object.entries(translationApiKeyInputs).map(([provider, input]) => [provider, input?.value.trim() ?? ""]),
  );
}

function applyTranslationApiKeys(keys) {
  if (!keys || typeof keys !== "object") {
    return;
  }

  for (const [provider, input] of Object.entries(translationApiKeyInputs)) {
    if (input && typeof keys[provider] === "string") {
      input.value = keys[provider];
    }
  }
}

function hasTranslationApiKey(provider, keys = readTranslationApiKeys()) {
  return Boolean(keys[normalizeTranslationProvider(provider)]?.trim());
}

function readAdminSecrets() {
  return {
    token: rememberAdminToken.checked ? homeAssistantToken.value.trim() : "",
    translationApiKeys: readTranslationApiKeys(),
  };
}

function applyAdminSecrets(secrets) {
  if (!secrets || typeof secrets !== "object") {
    return;
  }

  if (typeof secrets.token === "string" && secrets.token) {
    homeAssistantToken.value = secrets.token;
    rememberAdminToken.checked = true;
  }
  applyTranslationApiKeys(secrets.translationApiKeys);
}

function hasAnyAdminSecret(secrets) {
  return Boolean(secrets?.token?.trim()) || hasAnyTranslationApiKey(secrets?.translationApiKeys);
}

async function fetchAdminDeviceBinding() {
  try {
    const response = await fetch(adminDeviceApiPath, { cache: "no-store" });
    if (!response.ok) {
      return undefined;
    }
    const binding = await response.json();
    return normalizeAdminDeviceBinding(binding);
  } catch {
    return undefined;
  }
}

function normalizeAdminDeviceBinding(binding) {
  if (
    !binding
    || typeof binding !== "object"
    || binding.version !== 1
    || typeof binding.installationId !== "string"
    || typeof binding.bindingFingerprint !== "string"
  ) {
    return undefined;
  }

  return {
    version: 1,
    installationId: binding.installationId,
    bindingFingerprint: binding.bindingFingerprint,
    source: typeof binding.source === "string" ? binding.source : "unknown",
  };
}

async function restoreAdminDeviceBinding() {
  currentAdminDeviceBinding = await fetchAdminDeviceBinding();
}

function validateAdminSecretsDeviceBinding(secrets) {
  const binding = normalizeAdminDeviceBinding(secrets?.deviceBinding);
  if (!binding) {
    return true;
  }

  return Boolean(currentAdminDeviceBinding)
    && binding.bindingFingerprint === currentAdminDeviceBinding.bindingFingerprint;
}

function persistConfiguration() {
  const token = homeAssistantToken.value.trim();
  const secrets = readAdminSecrets();
  const translationApiKeys = secrets.translationApiKeys;
  const configuration = {
    language: currentLanguage,
    url: homeAssistantUrl.value,
    translationProvider: currentTranslationProvider(),
    translationApiEndpoint: defaultTranslationApiEndpoint,
    translationApiKeyConfigured: hasTranslationApiKey(currentTranslationProvider(), translationApiKeys),
    rememberToken: rememberAdminToken.checked,
    autoConnectEditor: autoConnectEditor.checked && rememberAdminToken.checked && Boolean(token),
    tokenConfigured: rememberAdminToken.checked && Boolean(token),
  };
  localStorage.setItem(adminStorageKey, JSON.stringify(configuration));
  void persistEncryptedAdminSecretsCookie(secrets);
  persistSharedConnectionCookie(configuration);
  void persistServerConnectionSettings({
    ...configuration,
    token: secrets.token,
    translationApiKeys: secrets.translationApiKeys,
  });
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
      translationApiKeys: configuration.translationApiKeys,
    }),
  });
}

function persistSharedConnectionCookie(configuration) {
  if (!configuration.rememberToken || !configuration.tokenConfigured) {
    deleteSharedConnectionCookie();
    return;
  }

  document.cookie = [
    `${adminConnectionCookieName}=${encodeURIComponent(JSON.stringify({
      url: configuration.url,
      autoConnectEditor: configuration.autoConnectEditor,
      translationProvider: configuration.translationProvider,
      translationApiEndpoint: configuration.translationApiEndpoint,
      tokenConfigured: configuration.tokenConfigured,
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

function hasAnyTranslationApiKey(keys) {
  return Object.values(keys ?? {}).some(value => typeof value === "string" && value.trim());
}

function readCookieValue(name) {
  const cookie = document.cookie
    .split("; ")
    .find(entry => entry.startsWith(`${name}=`));
  return cookie ? decodeURIComponent(cookie.slice(name.length + 1)) : "";
}

function deleteCookie(name) {
  document.cookie = `${name}=; path=/; max-age=0; SameSite=Lax`;
}

function encodeBase64(bytes) {
  return btoa(String.fromCharCode(...bytes));
}

function decodeBase64(value) {
  const binary = atob(value);
  return Uint8Array.from(binary, character => character.charCodeAt(0));
}

async function getAdminSecretsCryptoKey() {
  if (!globalThis.crypto?.subtle) {
    return undefined;
  }

  let keyBytes;
  const savedKey = localStorage.getItem(adminSecretsKeyStorageKey);
  if (savedKey) {
    keyBytes = decodeBase64(savedKey);
  } else {
    keyBytes = new Uint8Array(32);
    crypto.getRandomValues(keyBytes);
    localStorage.setItem(adminSecretsKeyStorageKey, encodeBase64(keyBytes));
  }

  return crypto.subtle.importKey("raw", keyBytes, { name: "AES-GCM" }, false, ["encrypt", "decrypt"]);
}

async function getLegacyTranslationApiKeysCryptoKey() {
  if (!globalThis.crypto?.subtle) {
    return undefined;
  }

  const savedKey = localStorage.getItem(legacyAdminTranslationApiKeysKeyStorageKey);
  if (!savedKey) {
    return undefined;
  }

  return crypto.subtle.importKey("raw", decodeBase64(savedKey), { name: "AES-GCM" }, false, ["decrypt"]);
}

async function encryptAdminSecrets(secrets) {
  const cryptoKey = await getAdminSecretsCryptoKey();
  if (!cryptoKey) {
    return "";
  }
  if (!currentAdminDeviceBinding) {
    await restoreAdminDeviceBinding();
  }

  const iv = new Uint8Array(12);
  crypto.getRandomValues(iv);
  const payload = new TextEncoder().encode(JSON.stringify({
    ...secrets,
    deviceBinding: currentAdminDeviceBinding,
  }));
  const encrypted = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, cryptoKey, payload);
  return JSON.stringify({
    v: 1,
    alg: "A256GCM",
    binding: currentAdminDeviceBinding
      ? {
          version: currentAdminDeviceBinding.version,
          fingerprint: currentAdminDeviceBinding.bindingFingerprint,
          source: currentAdminDeviceBinding.source,
        }
      : undefined,
    iv: encodeBase64(iv),
    data: encodeBase64(new Uint8Array(encrypted)),
    updatedAt: new Date().toISOString(),
  });
}

async function decryptAdminSecrets(value, { legacy = false } = {}) {
  const payload = JSON.parse(value);
  if (payload?.v !== 1 || payload.alg !== "A256GCM" || typeof payload.iv !== "string" || typeof payload.data !== "string") {
    return undefined;
  }

  const cryptoKey = legacy ? await getLegacyTranslationApiKeysCryptoKey() : await getAdminSecretsCryptoKey();
  if (!cryptoKey) {
    return undefined;
  }

  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: decodeBase64(payload.iv) },
    cryptoKey,
    decodeBase64(payload.data),
  );
  const secrets = JSON.parse(new TextDecoder().decode(decrypted));
  if (!validateAdminSecretsDeviceBinding(secrets)) {
    throw new Error("Admin secrets belong to another Atlas Administration instance.");
  }
  return secrets && typeof secrets === "object" ? secrets : undefined;
}

async function persistEncryptedAdminSecretsCookie(secrets) {
  if (!hasAnyAdminSecret(secrets)) {
    deleteCookie(adminSecretsCookieName);
    return;
  }

  try {
    const encryptedSecrets = await encryptAdminSecrets(secrets);
    if (!encryptedSecrets) {
      return;
    }
    document.cookie = [
      `${adminSecretsCookieName}=${encodeURIComponent(encryptedSecrets)}`,
      "path=/",
      `max-age=${longTermCookieMaxAge}`,
      "SameSite=Lax",
    ].join("; ");
  } catch {
    // Keep the current in-memory fields usable if the browser blocks Web Crypto or cookies.
  }
}

async function restoreEncryptedAdminSecretsCookie() {
  const encryptedSecrets = readCookieValue(adminSecretsCookieName);
  if (encryptedSecrets) {
    try {
      applyAdminSecrets(await decryptAdminSecrets(encryptedSecrets));
      return;
    } catch {
      deleteCookie(adminSecretsCookieName);
      adminSaveState.textContent = t("message.secretsInvalidForDevice");
    }
  }

  await restoreLegacyEncryptedTranslationApiKeysCookie();
}

async function restoreLegacyEncryptedTranslationApiKeysCookie() {
  const encryptedKeys = readCookieValue(legacyAdminTranslationApiKeysCookieName);
  if (!encryptedKeys) {
    return;
  }

  try {
    const legacyKeys = await decryptAdminSecrets(encryptedKeys, { legacy: true });
    if (legacyKeys) {
      applyTranslationApiKeys(legacyKeys);
      void persistEncryptedAdminSecretsCookie(readAdminSecrets());
    }
  } catch {
    deleteCookie(legacyAdminTranslationApiKeysCookieName);
  }
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
    let migratedConfiguration = false;
    if (saved?.language === "de" || saved?.language === "en") {
      currentLanguage = saved.language;
    }
    if (typeof saved?.url === "string") {
      homeAssistantUrl.value = saved.url;
    }
    if (typeof saved?.translationProvider === "string") {
      setTranslationProvider(saved.translationProvider);
    }
    if (saved?.translationApiKeys && typeof saved.translationApiKeys === "object") {
      applyTranslationApiKeys(saved.translationApiKeys);
      void persistEncryptedAdminSecretsCookie(readAdminSecrets());
      delete saved.translationApiKeys;
      migratedConfiguration = true;
    }
    if (saved?.rememberToken === true) {
      rememberAdminToken.checked = true;
      if (typeof saved.token === "string") {
        homeAssistantToken.value = saved.token;
        void persistEncryptedAdminSecretsCookie(readAdminSecrets());
        delete saved.token;
        migratedConfiguration = true;
      }
    }
    if (saved?.autoConnectEditor === true && saved?.rememberToken === true && homeAssistantToken.value.trim()) {
      autoConnectEditor.checked = true;
    }
    if (migratedConfiguration) {
      saved.tokenConfigured = Boolean(homeAssistantToken.value.trim());
      localStorage.setItem(adminStorageKey, JSON.stringify(saved));
    }
  } catch {
    localStorage.removeItem(adminStorageKey);
  }
}

async function restoreServerConnectionSettings() {
  try {
    const response = await fetch(`${adminConnectionApiPath}?includeSecrets=1`, {
      cache: "no-store",
    });
    if (!response.ok) {
      return;
    }

    const saved = await response.json();
    if (typeof saved.url === "string" && saved.url) {
      homeAssistantUrl.value = saved.url;
    }
    if (
      typeof saved.translationProvider === "string"
      && (normalizeTranslationProvider(saved.translationProvider) !== "none" || currentTranslationProvider() === "none")
    ) {
      setTranslationProvider(saved.translationProvider);
    }
    applyTranslationApiKeys(saved.translationApiKeys);
    if (typeof saved.token === "string" && saved.token && !homeAssistantToken.value.trim()) {
      homeAssistantToken.value = saved.token;
      rememberAdminToken.checked = true;
    }
    void persistEncryptedAdminSecretsCookie(readAdminSecrets());
    if (saved.autoConnectEditor === true && homeAssistantToken.value.trim()) {
      autoConnectEditor.checked = true;
    }
    renderAdministration();
  } catch {
    // The Admin server may not have saved settings yet; local settings remain usable.
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

function createSecretSummary(secrets) {
  return {
    tokenConfigured: Boolean(secrets.token?.trim()),
    translationApiKeyConfiguredByProvider: Object.fromEntries(
      Object.entries(secrets.translationApiKeys ?? {}).map(([provider, key]) => [provider, Boolean(key?.trim())]),
    ),
  };
}

async function createAdminSettingsExport() {
  const secrets = readAdminSecrets();
  const encryptedSecretText = hasAnyAdminSecret(secrets) ? await encryptAdminSecrets(secrets) : "";
  const encryptedSecrets = encryptedSecretText ? JSON.parse(encryptedSecretText) : undefined;
  return {
    kind: "atlas.administration.settings",
    version: 1,
    exportedAt: new Date().toISOString(),
    encryption: {
      secrets: encryptedSecrets
        ? "aes-gcm-browser-local-admin-key"
        : "none",
      deviceBinding: currentAdminDeviceBinding
        ? {
            version: currentAdminDeviceBinding.version,
            fingerprint: currentAdminDeviceBinding.bindingFingerprint,
            source: currentAdminDeviceBinding.source,
          }
        : undefined,
      note: "Encrypted secrets can be restored by the same browser profile while the local Admin encryption key and Atlas Admin instance binding match.",
    },
    settings: {
      language: currentLanguage,
      url: homeAssistantUrl.value.trim(),
      translationProvider: currentTranslationProvider(),
      translationApiEndpoint: defaultTranslationApiEndpoint,
      rememberToken: rememberAdminToken.checked,
      autoConnectEditor: autoConnectEditor.checked,
    },
    plugins: {
      activePluginIds: [...activePluginIds],
      importedPluginDescriptors,
    },
    secretSummary: createSecretSummary(secrets),
    ...(encryptedSecrets ? { encryptedSecrets } : {}),
  };
}

async function exportAdministrationSettings() {
  persistConfiguration();
  const settingsExport = await createAdminSettingsExport();
  downloadTextFile(
    "atlas-admin-settings.json",
    JSON.stringify(settingsExport, null, 2),
    "application/json",
  );
  adminSaveState.textContent = t("message.settingsExported");
}

function createEditorConnectionHandoff() {
  const provider = currentTranslationProvider();
  const providerKeyConfigured = hasTranslationApiKey(provider);
  return {
    type: "atlas.admin.connection.v1",
    url: homeAssistantUrl.value.trim(),
    token: homeAssistantToken.value,
    autoConnect: autoConnectEditor.checked,
    translationProvider: provider,
    translationApiEndpoint: defaultTranslationApiEndpoint,
    ...(providerKeyConfigured ? { translationApiKeyConfigured: true } : {}),
    sentAt: new Date().toISOString(),
  };
}

function postEditorConnectionHandoff(editorWindow) {
  if (!editorWindow) {
    return false;
  }

  editorWindow.postMessage(createEditorConnectionHandoff(), editorOrigin);
  return true;
}

function openEditorWithConnectionHandoff() {
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

  adminSaveState.textContent = homeAssistantToken.value
    ? t("message.editorOpened")
    : t("message.editorOpenedWithoutToken");
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

void initializeAdministration();

async function initializeAdministration() {
  restoreConfiguration();
  await restoreAdminDeviceBinding();
  await restoreEncryptedAdminSecretsCookie();
  restoreImportedPlugins();
  restorePluginState();
  if (
    (rememberAdminToken.checked && homeAssistantToken.value.trim())
    || hasAnyTranslationApiKey(readTranslationApiKeys())
  ) {
    persistConfiguration();
  }
  applyTranslations();
  renderAdministration();
  void restoreServerConnectionSettings();
}

for (const button of languageButtons) {
  button.addEventListener("click", () => setLanguage(button.dataset.language));
}

homeAssistantUrl.addEventListener("input", () => {
  renderAdministration();
  persistConfiguration();
});

for (const input of translationProviderInputs) {
  input.addEventListener("change", persistConfiguration);
}
for (const input of Object.values(translationApiKeyInputs)) {
  input?.addEventListener("input", persistConfiguration);
}

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

exportAdminSettings.addEventListener("click", () => {
  void exportAdministrationSettings();
});

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
