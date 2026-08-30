const storageKey = "tabbed-card-v2.demo.config";

const initialState = {
  selectedIndex: 0,
  outputMode: "yaml",
  config: {
    type: "custom:tabbed-card-v2",
    options: { defaultTabIndex: 0 },
    styles: {
      "--mdc-theme-primary": "#087f8c",
      "--mdc-tab-text-label-color-default": "rgba(var(--rgb-primary-text-color), 0.72)",
      "--mdc-typography-button-font-size": "14px",
    },
    tabs: [
      {
        attributes: { label: "Licht", icon: "mdi:lightbulb" },
        card: {
          type: "button",
          entity: "light.bed_light",
          tap_action: { action: "toggle" },
          show_name: true,
          show_icon: true,
          show_state: true,
        },
      },
      {
        attributes: { label: "Sensoren", icon: "mdi:thermometer" },
        card: {
          type: "entities",
          title: "Raumklima",
          entities: ["sensor.living_room_temperature", "sensor.living_room_humidity"],
        },
      },
      {
        attributes: { label: "Info", icon: "mdi:information" },
        card: {
          type: "markdown",
          title: "Hinweis",
          content: "Tabbed Card V2 visuell gebaut. Entities bitte an deine Home-Assistant-Installation anpassen.",
        },
      },
    ],
  },
};

let state = loadState();

const elements = {
  addTab: document.querySelector("#add-tab"),
  tabsList: document.querySelector("#tabs-list"),
  moveTabUp: document.querySelector("#move-tab-up"),
  moveTabDown: document.querySelector("#move-tab-down"),
  duplicateTab: document.querySelector("#duplicate-tab"),
  deleteTab: document.querySelector("#delete-tab"),
  defaultTab: document.querySelector("#default-tab"),
  primaryColor: document.querySelector("#primary-color"),
  inactiveColor: document.querySelector("#inactive-color"),
  fontSize: document.querySelector("#font-size"),
  tabLabel: document.querySelector("#tab-label"),
  tabIcon: document.querySelector("#tab-icon"),
  tabStacked: document.querySelector("#tab-stacked"),
  tabMinWidth: document.querySelector("#tab-min-width"),
  tabMinIndicator: document.querySelector("#tab-min-indicator"),
  tabFading: document.querySelector("#tab-fading"),
  cardType: document.querySelector("#card-type"),
  cardTitle: document.querySelector("#card-title"),
  cardEntity: document.querySelector("#card-entity"),
  cardEntities: document.querySelector("#card-entities"),
  tapAction: document.querySelector("#tap-action"),
  bubbleType: document.querySelector("#bubble-type"),
  showName: document.querySelector("#show-name"),
  showIcon: document.querySelector("#show-icon"),
  showState: document.querySelector("#show-state"),
  previewTabs: document.querySelector("#preview-tabs"),
  cardPreview: document.querySelector("#card-preview"),
  yamlOutput: document.querySelector("#yaml-output"),
  outputMode: document.querySelector("#output-mode"),
  copyYaml: document.querySelector("#copy-yaml"),
  downloadYaml: document.querySelector("#download-yaml"),
  importFile: document.querySelector("#import-file"),
  importButton: document.querySelector("#import-button"),
  resetEditor: document.querySelector("#reset-editor"),
  statusMessage: document.querySelector("#status-message"),
};

bindEvents();
render();

function bindEvents() {
  elements.addTab.addEventListener("click", addTab);
  elements.moveTabUp.addEventListener("click", () => moveSelectedTab(-1));
  elements.moveTabDown.addEventListener("click", () => moveSelectedTab(1));
  elements.duplicateTab.addEventListener("click", duplicateSelectedTab);
  elements.deleteTab.addEventListener("click", deleteSelectedTab);
  elements.defaultTab.addEventListener("change", () => {
    state.config.options.defaultTabIndex = Number(elements.defaultTab.value);
    persistAndRender("Start-Tab aktualisiert.");
  });
  elements.outputMode.addEventListener("change", () => {
    state.outputMode = elements.outputMode.value;
    persistAndRender();
  });
  elements.primaryColor.addEventListener("input", () => updateStyle("--mdc-theme-primary", elements.primaryColor.value));
  elements.inactiveColor.addEventListener("input", () => updateStyle("--mdc-tab-text-label-color-default", elements.inactiveColor.value));
  elements.fontSize.addEventListener("input", () => updateStyle("--mdc-typography-button-font-size", elements.fontSize.value));
  elements.tabLabel.addEventListener("input", syncTabForm);
  elements.tabIcon.addEventListener("input", syncTabForm);
  elements.tabStacked.addEventListener("change", syncTabForm);
  elements.tabMinWidth.addEventListener("change", syncTabForm);
  elements.tabMinIndicator.addEventListener("change", syncTabForm);
  elements.tabFading.addEventListener("change", syncTabForm);
  elements.cardType.addEventListener("change", syncCardForm);
  elements.cardTitle.addEventListener("input", syncCardForm);
  elements.cardEntity.addEventListener("input", syncCardForm);
  elements.cardEntities.addEventListener("input", syncCardForm);
  elements.tapAction.addEventListener("change", syncCardForm);
  elements.bubbleType.addEventListener("change", syncCardForm);
  elements.showName.addEventListener("change", syncCardForm);
  elements.showIcon.addEventListener("change", syncCardForm);
  elements.showState.addEventListener("change", syncCardForm);
  elements.copyYaml.addEventListener("click", copyOutput);
  elements.downloadYaml.addEventListener("click", downloadOutput);
  elements.importButton.addEventListener("click", () => elements.importFile.click());
  elements.importFile.addEventListener("change", importConfiguration);
  elements.resetEditor.addEventListener("click", resetEditor);
}

function render(message = "") {
  normalizeState();
  renderTabsList();
  renderDefaultTabs();
  renderForms();
  renderPreview();
  renderOutput();
  renderButtons();
  if (message) {
    elements.statusMessage.textContent = message;
  }
}

function renderTabsList() {
  elements.tabsList.replaceChildren(...state.config.tabs.map((tab, index) => {
    const button = document.createElement("button");
    button.className = "tab-item";
    button.type = "button";
    button.setAttribute("aria-pressed", String(index === state.selectedIndex));
    button.addEventListener("click", () => {
      state.selectedIndex = index;
      persistAndRender();
    });

    const label = document.createElement("strong");
    label.textContent = tab.attributes?.label || `Tab ${index + 1}`;
    const type = document.createElement("span");
    type.textContent = tab.card?.type ?? "card";
    const icon = document.createElement("span");
    icon.textContent = tab.attributes?.icon || "";

    const text = document.createElement("span");
    text.append(label, type);
    button.append(text, icon);
    return button;
  }));
}

function renderDefaultTabs() {
  elements.defaultTab.replaceChildren(...state.config.tabs.map((tab, index) => {
    const option = document.createElement("option");
    option.value = String(index);
    option.textContent = `${index + 1}: ${tab.attributes?.label || "Tab"}`;
    return option;
  }));
  elements.defaultTab.value = String(state.config.options.defaultTabIndex ?? 0);
}

function renderForms() {
  const tab = selectedTab();
  const attributes = tab.attributes ?? {};
  const card = tab.card ?? {};
  const styles = state.config.styles ?? {};

  elements.primaryColor.value = normalizeColorInput(styles["--mdc-theme-primary"] ?? "#087f8c");
  elements.inactiveColor.value = styles["--mdc-tab-text-label-color-default"] ?? "";
  elements.fontSize.value = styles["--mdc-typography-button-font-size"] ?? "";
  elements.tabLabel.value = attributes.label ?? "";
  elements.tabIcon.value = attributes.icon ?? "";
  elements.tabStacked.checked = attributes.stacked === true;
  elements.tabMinWidth.checked = attributes.minWidth === true;
  elements.tabMinIndicator.checked = attributes.isMinWidthIndicator === true;
  elements.tabFading.checked = attributes.isFadingIndicator === true;
  elements.cardType.value = knownCardType(card.type) ? card.type : "entity";
  elements.cardTitle.value = card.title ?? card.name ?? "";
  elements.cardEntity.value = card.entity ?? "";
  elements.cardEntities.value = arrayFromEntities(card.entities).join("\n");
  elements.tapAction.value = card.tap_action?.action ?? "";
  elements.bubbleType.value = card.button_type ?? "state";
  elements.showName.checked = card.show_name !== false;
  elements.showIcon.checked = card.show_icon !== false;
  elements.showState.checked = card.show_state !== false;
}

function renderPreview() {
  const primary = state.config.styles?.["--mdc-theme-primary"] ?? "#087f8c";
  document.documentElement.style.setProperty("--tabbed-primary", primary);
  elements.previewTabs.replaceChildren(...state.config.tabs.map((tab, index) => {
    const attributes = tab.attributes ?? {};
    const button = document.createElement("button");
    button.type = "button";
    button.className = [
      "ha-tab",
      index === state.selectedIndex ? "active" : "",
      attributes.stacked ? "stacked" : "",
      attributes.minWidth ? "min-width" : "",
      attributes.isFadingIndicator ? "fade-indicator" : "",
    ].filter(Boolean).join(" ");
    button.style.setProperty("--indicator-inset", attributes.isMinWidthIndicator ? "18px" : "0");
    button.addEventListener("click", () => {
      state.selectedIndex = index;
      persistAndRender();
    });
    if (attributes.icon) {
      const icon = document.createElement("span");
      icon.textContent = iconLabel(attributes.icon);
      button.append(icon);
    }
    const label = document.createElement("span");
    label.textContent = attributes.label || `Tab ${index + 1}`;
    button.append(label);
    return button;
  }));
  elements.cardPreview.replaceChildren(createMockCard(selectedTab().card ?? {}));
}

function renderOutput() {
  elements.outputMode.value = state.outputMode;
  elements.yamlOutput.textContent = state.outputMode === "json"
    ? JSON.stringify(publicConfig(), null, 2)
    : toYaml(publicConfig());
}

function renderButtons() {
  const oneTab = state.config.tabs.length <= 1;
  elements.moveTabUp.disabled = state.selectedIndex === 0;
  elements.moveTabDown.disabled = state.selectedIndex >= state.config.tabs.length - 1;
  elements.deleteTab.disabled = oneTab;
}

function createMockCard(card) {
  const root = document.createElement("article");
  root.className = "mock-card";

  const header = document.createElement("div");
  header.className = "mock-card-header";
  header.textContent = card.title || card.name || card.type || "Card";

  const body = document.createElement("div");
  body.className = "mock-card-body";

  if (card.type === "button" || card.type === "entity" || card.type === "sensor" || card.type?.includes("mushroom") || card.type?.includes("bubble")) {
    const preview = document.createElement("div");
    preview.className = "button-preview";
    const icon = document.createElement("div");
    icon.className = "big-icon";
    icon.textContent = iconLabel(selectedTab().attributes?.icon || "mdi:home");
    const entity = document.createElement("strong");
    entity.textContent = card.entity || "entity.id";
    const detail = document.createElement("span");
    detail.className = "state-pill";
    detail.textContent = card.button_type ? `Bubble ${card.button_type}` : "on";
    preview.append(icon, entity, detail);
    body.append(preview);
  } else if (card.type === "markdown") {
    const content = document.createElement("p");
    content.textContent = card.content || "Markdown content";
    body.append(content);
  } else {
    const entities = arrayFromEntities(card.entities);
    for (const entityId of entities.length ? entities : ["sensor.example"]) {
      const line = document.createElement("div");
      line.className = "entity-line";
      const entity = document.createElement("span");
      entity.textContent = typeof entityId === "string" ? entityId : entityId.entity;
      const statePill = document.createElement("span");
      statePill.className = "state-pill";
      statePill.textContent = "ok";
      line.append(entity, statePill);
      body.append(line);
    }
  }

  root.append(header, body);
  return root;
}

function syncTabForm() {
  const tab = selectedTab();
  tab.attributes = cleanObject({
    label: elements.tabLabel.value.trim(),
    icon: elements.tabIcon.value.trim(),
    stacked: elements.tabStacked.checked,
    minWidth: elements.tabMinWidth.checked,
    isMinWidthIndicator: elements.tabMinIndicator.checked,
    isFadingIndicator: elements.tabFading.checked,
  });
  persistAndRender();
}

function syncCardForm() {
  const type = elements.cardType.value;
  const title = elements.cardTitle.value.trim();
  const entity = elements.cardEntity.value.trim();
  const entities = elements.cardEntities.value
    .split(/\r?\n|,/)
    .map(value => value.trim())
    .filter(Boolean);
  const tapAction = elements.tapAction.value;

  const card = cleanObject({
    type,
    title,
    entity: type === "entities" || type === "markdown" ? "" : entity,
    entities: type === "entities" ? entities : undefined,
    content: type === "markdown" ? (title ? `# ${title}` : "Markdown content") : undefined,
    button_type: type === "custom:bubble-card" ? elements.bubbleType.value : undefined,
    tap_action: tapAction ? { action: tapAction } : undefined,
    show_name: supportsDisplayToggles(type) ? elements.showName.checked : undefined,
    show_icon: supportsDisplayToggles(type) ? elements.showIcon.checked : undefined,
    show_state: supportsDisplayToggles(type) ? elements.showState.checked : undefined,
  });

  selectedTab().card = card;
  persistAndRender();
}

function updateStyle(name, value) {
  state.config.styles = cleanObject({
    ...state.config.styles,
    [name]: value.trim(),
  });
  persistAndRender();
}

function addTab() {
  const nextNumber = state.config.tabs.length + 1;
  state.config.tabs.push({
    attributes: { label: `Tab ${nextNumber}`, icon: "mdi:view-dashboard" },
    card: {
      type: "entity",
      entity: "sensor.example",
      title: `Tab ${nextNumber}`,
    },
  });
  state.selectedIndex = state.config.tabs.length - 1;
  persistAndRender("Tab angelegt.");
}

function duplicateSelectedTab() {
  const copy = deepClone(selectedTab());
  copy.attributes = {
    ...copy.attributes,
    label: `${copy.attributes?.label || "Tab"} Kopie`,
  };
  state.config.tabs.splice(state.selectedIndex + 1, 0, copy);
  state.selectedIndex += 1;
  persistAndRender("Tab dupliziert.");
}

function deleteSelectedTab() {
  if (state.config.tabs.length <= 1) return;
  state.config.tabs.splice(state.selectedIndex, 1);
  state.selectedIndex = Math.max(0, state.selectedIndex - 1);
  state.config.options.defaultTabIndex = Math.min(state.config.options.defaultTabIndex ?? 0, state.config.tabs.length - 1);
  persistAndRender("Tab gelöscht.");
}

function moveSelectedTab(direction) {
  const nextIndex = state.selectedIndex + direction;
  if (nextIndex < 0 || nextIndex >= state.config.tabs.length) return;
  const [tab] = state.config.tabs.splice(state.selectedIndex, 1);
  state.config.tabs.splice(nextIndex, 0, tab);
  if (state.config.options.defaultTabIndex === state.selectedIndex) {
    state.config.options.defaultTabIndex = nextIndex;
  }
  state.selectedIndex = nextIndex;
  persistAndRender("Tab verschoben.");
}

async function copyOutput() {
  const text = elements.yamlOutput.textContent;
  try {
    await navigator.clipboard.writeText(text);
    elements.statusMessage.textContent = `${state.outputMode.toUpperCase()} kopiert.`;
  } catch {
    elements.statusMessage.textContent = "Kopieren ist im Browser blockiert.";
  }
}

function downloadOutput() {
  const extension = state.outputMode === "json" ? "json" : "yaml";
  const contentType = state.outputMode === "json" ? "application/json" : "application/yaml";
  const link = document.createElement("a");
  link.href = URL.createObjectURL(new Blob([elements.yamlOutput.textContent], { type: `${contentType}; charset=utf-8` }));
  link.download = `tabbed-card-v2.${extension}`;
  link.click();
  URL.revokeObjectURL(link.href);
  elements.statusMessage.textContent = "Export erstellt.";
}

async function importConfiguration() {
  const file = elements.importFile.files?.[0];
  if (!file) return;
  try {
    const text = await file.text();
    const imported = file.name.endsWith(".json") ? JSON.parse(text) : parseGeneratedYaml(text);
    state.config = normalizeImportedConfig(imported);
    state.selectedIndex = state.config.options.defaultTabIndex ?? 0;
    persistAndRender("Konfiguration importiert.");
  } catch (error) {
    elements.statusMessage.textContent = `Import fehlgeschlagen: ${error instanceof Error ? error.message : "unbekannter Fehler"}`;
  } finally {
    elements.importFile.value = "";
  }
}

function resetEditor() {
  state = deepClone(initialState);
  persistAndRender("Editor zurückgesetzt.");
}

function publicConfig() {
  const config = deepClone(state.config);
  config.options = cleanObject(config.options ?? {});
  config.styles = cleanObject(config.styles ?? {});
  config.attributes = cleanObject(config.attributes ?? {});
  config.tabs = config.tabs.map(tab => cleanObject({
    attributes: cleanObject(tab.attributes ?? {}),
    styles: cleanObject(tab.styles ?? {}),
    card: cleanObject(tab.card ?? {}),
  }));
  return cleanObject(config);
}

function normalizeState() {
  state.config = normalizeImportedConfig(state.config);
  state.selectedIndex = Math.max(0, Math.min(state.selectedIndex, state.config.tabs.length - 1));
  state.outputMode = state.outputMode === "json" ? "json" : "yaml";
}

function normalizeImportedConfig(config) {
  if (!config || typeof config !== "object") {
    throw new Error("Keine gültige Card-Konfiguration.");
  }

  const tabs = Array.isArray(config.tabs) && config.tabs.length
    ? config.tabs.map((tab, index) => ({
        attributes: cleanObject({
          label: tab?.attributes?.label ?? `Tab ${index + 1}`,
          icon: tab?.attributes?.icon ?? "",
          stacked: tab?.attributes?.stacked === true,
          minWidth: tab?.attributes?.minWidth === true,
          isMinWidthIndicator: tab?.attributes?.isMinWidthIndicator === true,
          isFadingIndicator: tab?.attributes?.isFadingIndicator === true,
        }),
        styles: cleanObject(tab?.styles ?? {}),
        card: normalizeCard(tab?.card),
      }))
    : deepClone(initialState.config.tabs);

  return cleanObject({
    type: "custom:tabbed-card-v2",
    options: {
      defaultTabIndex: clampIndex(config.options?.defaultTabIndex ?? 0, tabs.length),
    },
    styles: cleanObject({
      "--mdc-theme-primary": config.styles?.["--mdc-theme-primary"] ?? "#087f8c",
      "--mdc-tab-text-label-color-default": config.styles?.["--mdc-tab-text-label-color-default"] ?? "rgba(var(--rgb-primary-text-color), 0.72)",
      "--mdc-typography-button-font-size": config.styles?.["--mdc-typography-button-font-size"] ?? "14px",
    }),
    attributes: cleanObject(config.attributes ?? {}),
    tabs,
  });
}

function normalizeCard(card = {}) {
  const type = typeof card.type === "string" ? card.type : "entity";
  return cleanObject({
    ...card,
    type,
    entity: typeof card.entity === "string" ? card.entity : undefined,
    entities: Array.isArray(card.entities) ? card.entities : undefined,
    title: typeof card.title === "string" ? card.title : undefined,
  });
}

function selectedTab() {
  return state.config.tabs[state.selectedIndex];
}

function cleanObject(object) {
  return Object.fromEntries(Object.entries(object)
    .filter(([, value]) => value !== undefined && value !== "" && value !== false)
    .map(([key, value]) => [key, value && typeof value === "object" && !Array.isArray(value) ? cleanObject(value) : value])
    .filter(([, value]) => !(value && typeof value === "object" && !Array.isArray(value) && Object.keys(value).length === 0)));
}

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function persistAndRender(message = "") {
  localStorage.setItem(storageKey, JSON.stringify(state));
  render(message);
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) ?? "");
    return {
      ...deepClone(initialState),
      ...saved,
      config: normalizeImportedConfig(saved.config),
    };
  } catch {
    return deepClone(initialState);
  }
}

function supportsDisplayToggles(type) {
  return ["button", "entity", "sensor", "custom:bubble-card", "custom:mushroom-entity-card"].includes(type);
}

function knownCardType(type) {
  return Array.from(elements.cardType.options).some(option => option.value === type);
}

function arrayFromEntities(entities) {
  if (!Array.isArray(entities)) return [];
  return entities.map(entity => typeof entity === "string" ? entity : entity?.entity).filter(Boolean);
}

function clampIndex(value, length) {
  return Math.max(0, Math.min(Number(value) || 0, Math.max(0, length - 1)));
}

function normalizeColorInput(value) {
  return /^#[0-9a-f]{6}$/i.test(value) ? value : "#087f8c";
}

function iconLabel(icon) {
  const name = String(icon).replace(/^mdi:/, "").split("-")[0] || "card";
  return name.slice(0, 2).toUpperCase();
}

function toYaml(value, indent = 0) {
  if (Array.isArray(value)) {
    return value.map(item => `${" ".repeat(indent)}- ${yamlArrayValue(item, indent)}`).join("\n");
  }

  if (value && typeof value === "object") {
    return Object.entries(value).map(([key, entry]) => {
      if (Array.isArray(entry)) {
        return `${" ".repeat(indent)}${key}:\n${toYaml(entry, indent + 2)}`;
      }
      if (entry && typeof entry === "object") {
        return `${" ".repeat(indent)}${key}:\n${toYaml(entry, indent + 2)}`;
      }
      return `${" ".repeat(indent)}${key}: ${formatYamlScalar(entry)}`;
    }).join("\n");
  }

  return `${" ".repeat(indent)}${formatYamlScalar(value)}`;
}

function yamlArrayValue(item, indent) {
  if (item && typeof item === "object" && !Array.isArray(item)) {
    const entries = Object.entries(item);
    if (entries.length === 0) return "{}";
    const [firstKey, firstValue] = entries[0];
    const firstLine = firstValue && typeof firstValue === "object"
      ? `${firstKey}:\n${toYaml(firstValue, indent + 4)}`
      : `${firstKey}: ${formatYamlScalar(firstValue)}`;
    const rest = entries.slice(1).map(([key, value]) => {
      if (value && typeof value === "object") {
        return `${" ".repeat(indent + 2)}${key}:\n${toYaml(value, indent + 4)}`;
      }
      return `${" ".repeat(indent + 2)}${key}: ${formatYamlScalar(value)}`;
    });
    return [firstLine, ...rest].join("\n");
  }
  return formatYamlScalar(item);
}

function formatYamlScalar(value) {
  if (typeof value === "boolean" || typeof value === "number") return String(value);
  if (value === null) return "null";
  const text = String(value ?? "");
  if (!text || /[:#\n\r[\]{}&,*>!|%@`"]/.test(text) || /^\s|\s$|^(true|false|null|\d+)$/i.test(text)) {
    return JSON.stringify(text);
  }
  return text;
}

function parseGeneratedYaml(text) {
  const lines = text.split(/\r?\n/);
  const config = { type: "custom:tabbed-card-v2", options: {}, styles: {}, tabs: [] };
  let currentTab = null;
  let currentSection = "";
  let currentCardSubsection = "";

  for (const rawLine of lines) {
    const line = rawLine.replace(/\s+$/g, "");
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const indent = rawLine.length - rawLine.trimStart().length;

    if (indent === 0 && trimmed.endsWith(":")) {
      currentSection = trimmed.slice(0, -1);
      currentCardSubsection = "";
      continue;
    }

    if (currentSection === "tabs" && indent === 2 && trimmed.startsWith("- ")) {
      currentTab = { attributes: {}, card: {} };
      config.tabs.push(currentTab);
      const rest = trimmed.slice(2);
      if (rest.startsWith("attributes:")) currentCardSubsection = "attributes";
      if (rest.startsWith("card:")) currentCardSubsection = "card";
      continue;
    }

    if (currentSection === "tabs" && currentTab && indent === 4 && trimmed.endsWith(":")) {
      currentCardSubsection = trimmed.slice(0, -1);
      continue;
    }

    const pair = parseYamlPair(trimmed);
    if (!pair) continue;

    if (currentSection === "options") {
      config.options[pair.key] = pair.value;
    } else if (currentSection === "styles") {
      config.styles[pair.key] = pair.value;
    } else if (currentSection === "tabs" && currentTab) {
      if (currentCardSubsection === "attributes") {
        currentTab.attributes[pair.key] = pair.value;
      } else if (currentCardSubsection === "card") {
        if (pair.key === "entities") {
          currentTab.card.entities = [];
        } else {
          currentTab.card[pair.key] = pair.value;
        }
      }
    }

    if (currentSection === "tabs" && currentTab && currentCardSubsection === "card" && indent >= 8 && trimmed.startsWith("- ")) {
      currentTab.card.entities = currentTab.card.entities ?? [];
      currentTab.card.entities.push(parseYamlScalar(trimmed.slice(2)));
    }
  }

  if (!config.tabs.length) {
    throw new Error("YAML enthält keine Tabs.");
  }
  return config;
}

function parseYamlPair(trimmed) {
  const index = trimmed.indexOf(":");
  if (index < 0) return null;
  return {
    key: trimmed.slice(0, index).trim(),
    value: parseYamlScalar(trimmed.slice(index + 1).trim()),
  };
}

function parseYamlScalar(value) {
  if (value === "true") return true;
  if (value === "false") return false;
  if (/^-?\d+$/.test(value)) return Number(value);
  if ((value.startsWith("\"") && value.endsWith("\"")) || (value.startsWith("'") && value.endsWith("'"))) {
    try {
      return JSON.parse(value);
    } catch {
      return value.slice(1, -1);
    }
  }
  return value;
}
