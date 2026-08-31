import {
  createRuntimePluginAdministrationView,
  createRuntimePluginInstallPackage,
  parseRuntimePluginInstallPackage,
  RuntimePluginCatalog,
} from "@atlas/runtime";
import {
  createHomeAssistantCardEditorAppReleaseReadiness,
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
const refreshAppRuntime = document.querySelector("#refresh-app-runtime");
const appRuntimeSummary = document.querySelector("#app-runtime-summary");
const appRuntimeStatus = document.querySelector("#app-runtime-status");
const appRuntimeSurfaces = document.querySelector("#app-runtime-surfaces");
const appRuntimeLinks = document.querySelector("#app-runtime-links");
const appRuntimeDistribution = document.querySelector("#app-runtime-distribution");
const appReleaseSummary = document.querySelector("#app-release-summary");
const appReleaseChecks = document.querySelector("#app-release-checks");
const appReleaseTargets = document.querySelector("#app-release-targets");
const parcelProviderSummary = document.querySelector("#parcel-provider-summary");
const parcelProviderList = document.querySelector("#parcel-provider-list");
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
const parcelProviderDefaults = [
  {
    id: "dhl",
    name: "DHL",
    region: "DE/EU",
    authMode: "public-tracking",
    status: "ready",
    trackingUrl: "https://www.dhl.de/de/privatkunden/dhl-sendungsverfolgung.html?piececode={trackingNumber}",
    capabilities: ["tracking-link", "tracking-number"],
  },
  {
    id: "deutsche-post",
    name: "Deutsche Post",
    region: "DE",
    authMode: "public-tracking",
    status: "ready",
    trackingUrl: "https://www.deutschepost.de/sendung/simpleQuery.html?piececode={trackingNumber}",
    capabilities: ["tracking-link", "tracking-number"],
  },
  {
    id: "hermes",
    name: "Hermes",
    region: "DE",
    authMode: "public-tracking",
    status: "ready",
    trackingUrl: "https://www.myhermes.de/empfangen/sendungsverfolgung/sendungsinformation/#{trackingNumber}",
    capabilities: ["tracking-link", "tracking-number"],
  },
  {
    id: "dpd",
    name: "DPD",
    region: "DE/EU",
    authMode: "public-tracking",
    status: "ready",
    trackingUrl: "https://tracking.dpd.de/status/de_DE/parcel/{trackingNumber}",
    capabilities: ["tracking-link", "tracking-number"],
  },
  {
    id: "gls",
    name: "GLS",
    region: "DE/EU",
    authMode: "public-tracking",
    status: "ready",
    trackingUrl: "https://gls-group.com/DE/de/paketverfolgung?match={trackingNumber}",
    capabilities: ["tracking-link", "tracking-number"],
  },
  {
    id: "ups",
    name: "UPS",
    region: "Global",
    authMode: "public-tracking",
    status: "ready",
    trackingUrl: "https://www.ups.com/track?loc=de_DE&tracknum={trackingNumber}",
    capabilities: ["tracking-link", "tracking-number"],
  },
  {
    id: "fedex",
    name: "FedEx",
    region: "Global",
    authMode: "public-tracking",
    status: "ready",
    trackingUrl: "https://www.fedex.com/fedextrack/?trknbr={trackingNumber}",
    capabilities: ["tracking-link", "tracking-number"],
  },
  {
    id: "amazon",
    name: "Amazon Logistics",
    region: "Global",
    authMode: "account-required",
    status: "manual-account",
    trackingUrl: "https://www.amazon.de/progress-tracker/package",
    capabilities: ["account-link", "manual-status"],
  },
];
const editorOrigin = "http://127.0.0.1:4174";
const appRuntimeApiUrl = "http://127.0.0.1:4176/app";
const longTermCookieMaxAge = 31536000;
const pluginCatalog = new RuntimePluginCatalog();
pluginCatalog.register(createHomeAssistantCardEditorPlugin());

let currentLanguage = "en";
let activePluginIds = new Set([HomeAssistantCardEditorPluginId]);
let importedPluginDescriptors = [];
let lastEditorWindow;
let lastAppRuntime;
let currentAdminDeviceBinding;
let currentParcelProviderSettings = normalizeParcelProviderSettings();

const translations = {
  en: {
    "page.title": "ATLAS Administration",
    "page.subtitle": "Manage plugins, install packages and central Home Assistant access.",
    "heading.access": "Connection settings",
    "heading.haConnection": "Home Assistant connection",
    "heading.translationSettings": "Card translation",
    "heading.parcelSettings": "Parcel service providers",
    "heading.appRuntime": "App runtime status",
    "heading.runtimeSurfaces": "Surfaces",
    "heading.runtimeLinks": "Links",
    "heading.appRelease": "App release readiness",
    "heading.releaseChecks": "Release checks",
    "heading.releaseTargets": "Distribution targets",
    "heading.plugins": "Installed plugins",
    "heading.policy": "Plugin access policy",
    "label.haUrl": "Home Assistant URL",
    "label.accessToken": "Access token",
    "label.translationProvider": "Translation module",
    "label.rememberToken": "Remember token locally for Administration",
    "label.autoConnectEditor": "Auto-connect Card Editor after handoff",
    "label.appUrl": "App",
    "label.adminUrl": "Administration",
    "label.editorUrl": "Card Editor",
    "label.healthUrl": "Health",
    "label.distributionOrder": "Distribution order",
    "label.version": "Version",
    "label.extensionPoints": "Extension points",
    "label.capabilities": "Capabilities",
    "label.parcelEnabled": "Enabled",
    "button.saveSettings": "Save settings",
    "button.forgetToken": "Forget token",
    "button.exportSettings": "Export settings",
    "button.openEditor": "Open Card Editor",
    "button.refreshRuntime": "Refresh status",
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
    "message.appRuntimeHint": "Read the combined app server status exposed on port 4176.",
    "message.appRuntimeLoading": "Loading app runtime status...",
    "message.appRuntimeSummary": "{name} {version}: {status}, started {startedAt}.",
    "message.appRuntimeUnavailable": "App runtime status is unavailable.",
    "message.runtimeSurfaceReady": "Port {port} is ready.",
    "message.runtimeSurfaceUnavailable": "Port {port} is not answering yet.",
    "message.appReleaseHint": "Track the local app path before the later Home Assistant/HACS integration.",
    "message.appReleaseSummary": "{ready} ready, {inProgress} in progress, {planned} planned",
    "message.parcelProviderSummary": "{enabled} of {total} service providers enabled. Public tracking links are prefilled automatically; account-only providers stay marked for later connection.",
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
    "text.releaseStatusReady": "Ready",
    "text.releaseStatusInProgress": "In progress",
    "text.releaseStatusPlanned": "Planned",
    "text.runtimeReady": "Ready",
    "text.runtimeUnavailable": "Unavailable",
    "release.admin-session-handoff.label": "Administration session handoff",
    "release.admin-session-handoff.reason": "The editor receives Home Assistant connection settings from Administration without shared token storage.",
    "release.problem-report-preview.label": "Opt-in problem reports",
    "release.problem-report-preview.reason": "The editor previews sanitized debug data before copy or GitHub issue creation.",
    "release.plugin-install-package.label": "Reference plugin package",
    "release.plugin-install-package.reason": "Administration can export the Home Assistant Card Editor as an .atlas-plugin.json package.",
    "release.hacs-card-bundle.label": "HACS card bundle export",
    "release.hacs-card-bundle.reason": "Card bundles can be exported and imported, while the final installable repository flow still needs release wiring.",
    "release.home-assistant-frontend.label": "Home Assistant frontend integration",
    "release.home-assistant-frontend.reason": "The local app and reference plugin path come before the later native Home Assistant/HACS frontend integration.",
    "release.standalone-docker.label": "Standalone Docker container",
    "release.standalone-docker.reason": "Dockerfile and Compose wiring build the local image, start the app surfaces and pass the container health check.",
    "release.home-assistant-app.label": "Home Assistant App / Add-on",
    "release.home-assistant-app.reason": "The App/Add-on scaffold builds a local preview image from the verified container runtime and reports its app target through /app.",
    "release.linux-installer.label": "Linux VM / LXC installer",
    "release.linux-installer.reason": "Add a systemd-based installer for VM, LXC or bare Linux after the container path is stable.",
    "release.atlas-plugin.label": "ATLAS reference plugin",
    "release.atlas-plugin.reason": "The Card Editor is registered as the first official ATLAS reference plugin and can be exported as a plugin package.",
    "release.home-assistant-hacs.label": "Home Assistant / HACS integration",
    "release.home-assistant-hacs.reason": "HACS-oriented card bundles exist first; native Home Assistant frontend installation remains a later integration target.",
    "text.parcelStatusReady": "Ready",
    "text.parcelStatusManualAccount": "Account required",
    "text.parcelAuthPublicTracking": "Public tracking link",
    "text.parcelAuthAccountRequired": "Account sign-in required",
  },
  de: {
    "page.title": "ATLAS Administration",
    "page.subtitle": "Plugins, Installpakete und zentralen Home-Assistant-Zugriff verwalten.",
    "heading.access": "Verbindungseinstellungen",
    "heading.haConnection": "Home-Assistant-Verbindung",
    "heading.translationSettings": "Card-Uebersetzung",
    "heading.parcelSettings": "Paket-Dienstleister",
    "heading.appRuntime": "App-Laufzeitstatus",
    "heading.runtimeSurfaces": "Oberflaechen",
    "heading.runtimeLinks": "Links",
    "heading.appRelease": "App-Freigabe",
    "heading.releaseChecks": "Freigabe-Checks",
    "heading.releaseTargets": "Ausgabeziele",
    "heading.plugins": "Installierte Plugins",
    "heading.policy": "Plugin-Zugriffsregel",
    "label.haUrl": "Home Assistant URL",
    "label.accessToken": "Access Token",
    "label.translationProvider": "Uebersetzungsmodul",
    "label.rememberToken": "Token lokal fuer die Administration merken",
    "label.autoConnectEditor": "Card Editor nach Übergabe automatisch verbinden",
    "label.appUrl": "App",
    "label.adminUrl": "Administration",
    "label.editorUrl": "Card Editor",
    "label.healthUrl": "Health",
    "label.distributionOrder": "Distributionsreihenfolge",
    "label.version": "Version",
    "label.extensionPoints": "Extension Points",
    "label.capabilities": "Faehigkeiten",
    "label.parcelEnabled": "Aktiv",
    "button.saveSettings": "Einstellungen speichern",
    "button.forgetToken": "Token vergessen",
    "button.exportSettings": "Einstellungen exportieren",
    "button.openEditor": "Card Editor oeffnen",
    "button.refreshRuntime": "Status aktualisieren",
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
    "message.appRuntimeHint": "Liest den gemeinsamen App-Server-Status auf Port 4176.",
    "message.appRuntimeLoading": "App-Laufzeitstatus wird geladen...",
    "message.appRuntimeSummary": "{name} {version}: {status}, gestartet {startedAt}.",
    "message.appRuntimeUnavailable": "App-Laufzeitstatus ist nicht erreichbar.",
    "message.runtimeSurfaceReady": "Port {port} ist bereit.",
    "message.runtimeSurfaceUnavailable": "Port {port} antwortet noch nicht.",
    "message.appReleaseHint": "Verfolge den lokalen App-Pfad vor der späteren Home-Assistant/HACS-Integration.",
    "message.appReleaseSummary": "{ready} bereit, {inProgress} in Arbeit, {planned} geplant",
    "message.parcelProviderSummary": "{enabled} von {total} Dienstleistern aktiv. Oeffentliche Tracking-Links sind automatisch vorbelegt; Konto-Dienstleister bleiben fuer die spaetere Anbindung markiert.",
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
    "text.releaseStatusReady": "Bereit",
    "text.releaseStatusInProgress": "In Arbeit",
    "text.releaseStatusPlanned": "Geplant",
    "text.runtimeReady": "Bereit",
    "text.runtimeUnavailable": "Nicht erreichbar",
    "release.admin-session-handoff.label": "Administration-Sitzungsübergabe",
    "release.admin-session-handoff.reason": "Der Editor erhält Home-Assistant-Verbindungseinstellungen aus der Administration ohne gemeinsam gespeicherten Token.",
    "release.problem-report-preview.label": "Opt-in-Problemberichte",
    "release.problem-report-preview.reason": "Der Editor zeigt bereinigte Debug-Daten vor dem Kopieren oder Öffnen eines GitHub-Issues als Vorschau.",
    "release.plugin-install-package.label": "Referenz-Plugin-Paket",
    "release.plugin-install-package.reason": "Die Administration kann den Home Assistant Card Editor als .atlas-plugin.json-Paket exportieren.",
    "release.hacs-card-bundle.label": "HACS-Card-Bundle-Export",
    "release.hacs-card-bundle.reason": "Card-Bundles können exportiert und importiert werden; der finale installierbare Repository-Flow braucht noch Release-Verdrahtung.",
    "release.home-assistant-frontend.label": "Home-Assistant-Frontend-Integration",
    "release.home-assistant-frontend.reason": "Der lokale App- und Referenz-Plugin-Pfad kommt vor der späteren nativen Home-Assistant/HACS-Frontend-Integration.",
    "release.standalone-docker.label": "Standalone-Docker-Container",
    "release.standalone-docker.reason": "Dockerfile und Compose-Verdrahtung bauen das lokale Image, starten die App-Oberflächen und bestehen den Container-Healthcheck.",
    "release.home-assistant-app.label": "Home Assistant App / Add-on",
    "release.home-assistant-app.reason": "Der App/Add-on-Scaffold baut ein lokales Preview-Image aus der verifizierten Container-Runtime und meldet sein App-Ziel ueber /app.",
    "release.linux-installer.label": "Linux-VM-/LXC-Installer",
    "release.linux-installer.reason": "Ergänze nach dem stabilen Container-Pfad einen systemd-basierten Installer für VM, LXC oder bare Linux.",
    "release.atlas-plugin.label": "ATLAS-Referenz-Plugin",
    "release.atlas-plugin.reason": "Der Card Editor ist als erstes offizielles ATLAS-Referenz-Plugin registriert und kann als Plugin-Paket exportiert werden.",
    "release.home-assistant-hacs.label": "Home Assistant / HACS-Integration",
    "release.home-assistant-hacs.reason": "HACS-orientierte Card-Bundles existieren zuerst; die native Home-Assistant-Frontend-Installation bleibt ein späteres Integrationsziel.",
    "text.parcelStatusReady": "Fertig",
    "text.parcelStatusManualAccount": "Konto noetig",
    "text.parcelAuthPublicTracking": "Oeffentlicher Tracking-Link",
    "text.parcelAuthAccountRequired": "Konto-Anmeldung erforderlich",
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

function normalizeParcelProviderSettings(value) {
  const savedProviders = Array.isArray(value?.providers) ? value.providers : Array.isArray(value) ? value : [];
  const savedById = new Map(savedProviders
    .filter(provider => provider && typeof provider.id === "string")
    .map(provider => [provider.id, provider]));

  return {
    version: 1,
    providers: parcelProviderDefaults.map(provider => {
      const saved = savedById.get(provider.id);
      return {
        ...provider,
        enabled: typeof saved?.enabled === "boolean"
          ? saved.enabled
          : provider.status === "ready",
        trackingUrl: typeof saved?.trackingUrl === "string" && saved.trackingUrl.trim()
          ? saved.trackingUrl.trim()
          : provider.trackingUrl,
      };
    }),
  };
}

function readParcelProviderSettings() {
  if (!parcelProviderList.children.length) {
    return currentParcelProviderSettings;
  }

  const providers = parcelProviderDefaults.map(provider => {
    const enabledInput = document.querySelector(`[data-parcel-provider-enabled="${provider.id}"]`);
    const trackingUrlInput = document.querySelector(`[data-parcel-provider-url="${provider.id}"]`);
    return {
      ...provider,
      enabled: enabledInput ? enabledInput.checked : provider.status === "ready",
      trackingUrl: trackingUrlInput?.value.trim() || provider.trackingUrl,
    };
  });

  currentParcelProviderSettings = {
    version: 1,
    providers,
  };
  return currentParcelProviderSettings;
}

function applyParcelProviderSettings(settings) {
  const normalized = normalizeParcelProviderSettings(settings);
  currentParcelProviderSettings = normalized;
  for (const provider of normalized.providers) {
    const enabledInput = document.querySelector(`[data-parcel-provider-enabled="${provider.id}"]`);
    const trackingUrlInput = document.querySelector(`[data-parcel-provider-url="${provider.id}"]`);
    if (enabledInput) {
      enabledInput.checked = provider.enabled;
    }
    if (trackingUrlInput) {
      trackingUrlInput.value = provider.trackingUrl;
    }
  }
  renderParcelProviderSummary(normalized);
}

function translateParcelProviderStatus(status) {
  if (status === "manual-account") return t("text.parcelStatusManualAccount");
  return t("text.parcelStatusReady");
}

function translateParcelProviderAuthMode(authMode) {
  if (authMode === "account-required") return t("text.parcelAuthAccountRequired");
  return t("text.parcelAuthPublicTracking");
}

function renderParcelProviderSummary(settings = readParcelProviderSettings()) {
  currentParcelProviderSettings = normalizeParcelProviderSettings(settings);
  const providers = settings.providers ?? [];
  parcelProviderSummary.textContent = t("message.parcelProviderSummary", {
    enabled: providers.filter(provider => provider.enabled).length,
    total: providers.length,
  });
}

function renderParcelProviders() {
  const settings = readParcelProviderSettings();
  parcelProviderList.replaceChildren();

  for (const provider of normalizeParcelProviderSettings(settings).providers) {
    const row = document.createElement("label");
    const option = document.createElement("span");
    const checkbox = document.createElement("input");
    const optionText = document.createElement("span");
    const meta = document.createElement("span");
    const name = document.createElement("span");
    const detail = document.createElement("span");
    const urlInput = document.createElement("input");

    row.className = "parcel-provider-row";
    option.className = "provider-option";
    meta.className = "parcel-provider-meta";
    name.className = "parcel-provider-name";
    detail.className = "parcel-provider-detail";
    urlInput.className = "provider-key";
    urlInput.type = "url";
    urlInput.inputMode = "url";
    urlInput.spellcheck = false;
    urlInput.value = provider.trackingUrl;
    urlInput.dataset.parcelProviderUrl = provider.id;
    checkbox.type = "checkbox";
    checkbox.checked = provider.enabled;
    checkbox.dataset.parcelProviderEnabled = provider.id;
    optionText.textContent = t("label.parcelEnabled");
    name.textContent = provider.name;
    detail.textContent = [
      provider.region,
      translateParcelProviderStatus(provider.status),
      translateParcelProviderAuthMode(provider.authMode),
    ].join(" - ");

    checkbox.addEventListener("change", () => {
      renderParcelProviderSummary();
      persistConfiguration();
    });
    urlInput.addEventListener("input", () => {
      renderParcelProviderSummary();
      persistConfiguration();
    });

    option.append(checkbox, optionText);
    meta.append(name, detail);
    row.append(option, meta, urlInput);
    parcelProviderList.append(row);
  }

  renderParcelProviderSummary();
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

function createTranslationApiKeyConfiguredByProvider(keys = readTranslationApiKeys()) {
  return Object.fromEntries(
    translationProviderValues
      .filter(provider => provider !== "none")
      .map(provider => [provider, hasTranslationApiKey(provider, keys)]),
  );
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
    translationApiKeyConfiguredByProvider: createTranslationApiKeyConfiguredByProvider(translationApiKeys),
    parcelProviders: readParcelProviderSettings(),
    rememberToken: rememberAdminToken.checked,
    autoConnectEditor: autoConnectEditor.checked,
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
      parcelProviders: configuration.parcelProviders,
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
      translationApiKeyConfigured: configuration.translationApiKeyConfigured,
      translationApiKeyConfiguredByProvider: configuration.translationApiKeyConfiguredByProvider,
      parcelProviders: configuration.parcelProviders,
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
    applyParcelProviderSettings(saved?.parcelProviders);
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
    if (saved?.autoConnectEditor === true) {
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
    applyParcelProviderSettings(saved.parcelProviders);
    if (typeof saved.token === "string" && saved.token && !homeAssistantToken.value.trim()) {
      homeAssistantToken.value = saved.token;
      rememberAdminToken.checked = true;
    }
    void persistEncryptedAdminSecretsCookie(readAdminSecrets());
    if (saved.autoConnectEditor === true) {
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

function translateReleaseStatus(status) {
  if (status === "ready") return t("text.releaseStatusReady");
  if (status === "in-progress") return t("text.releaseStatusInProgress");
  return t("text.releaseStatusPlanned");
}

function translatePluginAction(action) {
  if (action === "activate") return t("button.activate");
  if (action === "deactivate") return t("button.deactivate");
  if (action === "export-package") return t("button.exportPackage");
  return t("button.inspect");
}

function createReadinessItem(entry) {
  const item = document.createElement("div");
  const title = document.createElement("div");
  const reason = document.createElement("div");
  const status = document.createElement("span");

  item.className = "readiness-item";
  title.className = "readiness-title";
  reason.className = "readiness-reason";
  status.className = "readiness-status";
  status.dataset.status = entry.status;

  title.textContent = t(`release.${entry.id}.label`) === `release.${entry.id}.label`
    ? entry.label
    : t(`release.${entry.id}.label`);
  reason.textContent = t(`release.${entry.id}.reason`) === `release.${entry.id}.reason`
    ? entry.reason
    : t(`release.${entry.id}.reason`);
  status.textContent = translateReleaseStatus(entry.status);

  item.append(title, reason, status);
  return item;
}

function renderAppReleaseReadiness() {
  const readiness = createHomeAssistantCardEditorAppReleaseReadiness();

  appReleaseSummary.textContent = t("message.appReleaseSummary", readiness.summary);
  appReleaseChecks.replaceChildren(
    ...readiness.checks.map(check => createReadinessItem(check)),
  );
  appReleaseTargets.replaceChildren(
    ...readiness.targets.map(target => createReadinessItem(target)),
  );
}

function formatRuntimeDate(value) {
  if (!value) {
    return "-";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat(currentLanguage === "de" ? "de-DE" : "en-US", {
    dateStyle: "short",
    timeStyle: "medium",
  }).format(date);
}

function translateRuntimeStatus(ready) {
  return ready ? t("text.runtimeReady") : t("text.runtimeUnavailable");
}

function createRuntimeSurfaceItem(id, surface) {
  const item = document.createElement("div");
  const title = document.createElement("div");
  const reason = document.createElement("div");
  const status = document.createElement("span");
  const labelKey = id === "administration" ? "label.adminUrl" : "label.editorUrl";

  item.className = "readiness-item";
  title.className = "readiness-title";
  reason.className = "readiness-reason";
  status.className = "readiness-status";
  status.dataset.status = surface.ready ? "ready" : "planned";

  title.textContent = t(labelKey);
  reason.textContent = surface.ready
    ? t("message.runtimeSurfaceReady", { port: surface.port })
    : t("message.runtimeSurfaceUnavailable", { port: surface.port });
  status.textContent = translateRuntimeStatus(surface.ready);

  item.append(title, reason, status);
  return item;
}

function createRuntimeLink(label, url) {
  const item = document.createElement("div");
  const title = document.createElement("span");
  const link = document.createElement("a");

  item.className = "runtime-link";
  title.textContent = label;
  link.href = url;
  link.target = "_blank";
  link.rel = "noreferrer";
  link.textContent = url;

  item.append(title, link);
  return item;
}

function renderAppRuntimeStatus(runtime) {
  lastAppRuntime = runtime;

  if (!runtime) {
    appRuntimeSummary.textContent = t("message.appRuntimeUnavailable");
    appRuntimeStatus.textContent = "";
    appRuntimeSurfaces.replaceChildren();
    appRuntimeLinks.replaceChildren();
    appRuntimeDistribution.replaceChildren();
    return;
  }

  const surfaces = runtime.surfaces ?? {};
  appRuntimeSummary.textContent = t("message.appRuntimeSummary", {
    name: runtime.name ?? "ATLAS",
    version: runtime.version ?? "-",
    status: runtime.status ?? "-",
    startedAt: formatRuntimeDate(runtime.startedAt),
  });
  appRuntimeStatus.textContent = "";
  appRuntimeSurfaces.replaceChildren(
    ...Object.entries(surfaces).map(([id, surface]) => createRuntimeSurfaceItem(id, surface)),
  );
  appRuntimeLinks.replaceChildren(
    createRuntimeLink(t("label.appUrl"), runtime.urls?.app ?? appRuntimeApiUrl),
    createRuntimeLink(t("label.adminUrl"), runtime.urls?.admin ?? editorOrigin.replace(":4174", ":4175")),
    createRuntimeLink(t("label.editorUrl"), runtime.urls?.editor ?? editorOrigin),
    createRuntimeLink(t("label.healthUrl"), runtime.urls?.health ?? appRuntimeApiUrl.replace("/app", "/health")),
  );
  appRuntimeDistribution.replaceChildren(
    ...(runtime.distribution?.order ?? []).map(target => {
      const chip = document.createElement("span");
      const translationKey = `release.${target}.label`;
      const translated = t(translationKey);
      chip.textContent = translated === translationKey ? target : translated;
      return chip;
    }),
  );
}

async function loadAppRuntimeStatus() {
  appRuntimeSummary.textContent = t("message.appRuntimeLoading");
  appRuntimeStatus.textContent = "";

  try {
    const response = await fetch(appRuntimeApiUrl, { cache: "no-store" });
    renderAppRuntimeStatus(await response.json());
  } catch {
    renderAppRuntimeStatus(undefined);
  }
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
      parcelProviders: readParcelProviderSettings(),
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
  const translationApiKeyConfiguredByProvider = createTranslationApiKeyConfiguredByProvider();
  return {
    type: "atlas.admin.connection.v1",
    url: homeAssistantUrl.value.trim(),
    token: homeAssistantToken.value,
    autoConnect: autoConnectEditor.checked,
    translationProvider: provider,
    translationApiEndpoint: defaultTranslationApiEndpoint,
    translationApiKeyConfigured: translationApiKeyConfiguredByProvider[provider] === true,
    translationApiKeyConfiguredByProvider,
    parcelProviders: readParcelProviderSettings(),
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
  lastEditorWindow = window.open(`${editorOrigin}/?atlasAdminHandoff=1`, "_blank", "noopener=false,noreferrer=false");
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
  renderAppReleaseReadiness();
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
  renderParcelProviders();
  renderAdministration();
  renderAppRuntimeStatus(lastAppRuntime);
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
  renderParcelProviders();
  renderAdministration();
  void loadAppRuntimeStatus();
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
refreshAppRuntime.addEventListener("click", () => {
  void loadAppRuntimeStatus();
});

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
