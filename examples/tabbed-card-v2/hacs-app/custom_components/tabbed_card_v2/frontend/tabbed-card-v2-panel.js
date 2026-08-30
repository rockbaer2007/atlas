class TabbedCardV2Panel extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._hass = undefined;
    this._config = createDefaultConfig();
    this._selectedIndex = 0;
    this._output = "";
  }

  set hass(hass) {
    this._hass = hass;
    this._render();
  }

  set panel(panel) {
    this._panel = panel;
    this._render();
  }

  connectedCallback() {
    this._render();
  }

  _render() {
    const tab = this._config.tabs[this._selectedIndex] ?? this._config.tabs[0];
    this._output = toYaml(this._config);
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          min-height: 100vh;
          background: var(--primary-background-color);
          color: var(--primary-text-color);
          font-family: var(--paper-font-body1_-_font-family, Roboto, sans-serif);
        }

        .page {
          display: grid;
          gap: 16px;
          max-width: 1420px;
          margin: 0 auto;
          padding: 24px;
        }

        header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 16px;
        }

        h1 {
          margin: 0;
          font-size: 28px;
          letter-spacing: 0;
        }

        p {
          margin: 6px 0 0;
          color: var(--secondary-text-color);
        }

        .toolbar,
        .actions {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        button,
        select,
        input,
        textarea {
          box-sizing: border-box;
          min-height: 38px;
          border: 1px solid var(--divider-color);
          border-radius: 6px;
          background: var(--card-background-color);
          color: var(--primary-text-color);
          font: inherit;
          padding: 7px 10px;
        }

        button {
          cursor: pointer;
          font-weight: 700;
        }

        button.primary {
          border-color: var(--primary-color);
          background: var(--primary-color);
          color: var(--text-primary-color);
        }

        button.selected {
          border-color: var(--primary-color);
          box-shadow: inset 0 0 0 1px var(--primary-color);
        }

        button:disabled {
          cursor: not-allowed;
          opacity: 0.48;
        }

        .workbench {
          display: grid;
          grid-template-columns: 260px minmax(320px, 420px) minmax(0, 1fr);
          gap: 14px;
          align-items: start;
        }

        .panel {
          display: grid;
          gap: 12px;
          min-width: 0;
          border: 1px solid var(--divider-color);
          border-radius: 8px;
          background: var(--card-background-color);
          padding: 14px;
        }

        h2 {
          margin: 0;
          font-size: 16px;
        }

        .tabs-list {
          display: grid;
          gap: 8px;
        }

        .tab-button {
          justify-content: flex-start;
          text-align: left;
          width: 100%;
        }

        .field-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
        }

        .field {
          display: grid;
          gap: 5px;
          min-width: 0;
        }

        .field.full {
          grid-column: 1 / -1;
        }

        label {
          color: var(--secondary-text-color);
          font-size: 12px;
          font-weight: 700;
        }

        textarea {
          width: 100%;
          min-height: 98px;
          resize: vertical;
        }

        pre {
          min-height: 520px;
          overflow: auto;
          margin: 0;
          border-radius: 8px;
          background: #111827;
          color: #e5f2ff;
          padding: 14px;
          font: 13px/1.5 ui-monospace, SFMono-Regular, Consolas, "Liberation Mono", monospace;
          white-space: pre-wrap;
          overflow-wrap: anywhere;
        }

        .hint {
          color: var(--secondary-text-color);
          font-size: 12px;
          line-height: 1.35;
        }

        .status {
          min-height: 22px;
          color: var(--primary-color);
          font-weight: 700;
        }

        @media (max-width: 1100px) {
          .workbench {
            grid-template-columns: 250px minmax(0, 1fr);
          }

          .output {
            grid-column: 1 / -1;
          }
        }

        @media (max-width: 760px) {
          .page {
            padding: 12px;
          }

          header,
          .workbench,
          .field-grid {
            grid-template-columns: 1fr;
            display: grid;
          }
        }
      </style>
      <main class="page">
        <header>
          <div>
            <h1>Tabbed Card V2</h1>
            <p>Visual Editor fuer tabbasierte Lovelace-Karten.</p>
          </div>
          ${this._panel?.config?.showUpdateHint === false ? "" : `
            <p>Updates steuerst du in HACS bei diesem Repository. Aktiviere dort Auto-Update, wenn neue Releases automatisch installiert werden sollen.</p>
          `}
          <div class="toolbar">
            <button class="primary" data-action="copy" type="button">YAML kopieren</button>
            <button data-action="download" type="button">YAML exportieren</button>
            <button data-action="reset" type="button">Zuruecksetzen</button>
          </div>
        </header>
        <section class="workbench">
          <aside class="panel">
            <h2>Tabs</h2>
            <div class="tabs-list">
              ${this._config.tabs.map((item, index) => `
                <button class="tab-button ${index === this._selectedIndex ? "selected" : ""}" data-action="select-tab" data-index="${index}" type="button">
                  ${index + 1}. ${escapeHtml(item.attributes?.label || "Tab")}
                </button>
              `).join("")}
            </div>
            <div class="actions">
              <button class="primary" data-action="add-tab" type="button">Neu</button>
              <button data-action="move-up" type="button" ${this._selectedIndex === 0 ? "disabled" : ""}>Hoch</button>
              <button data-action="move-down" type="button" ${this._selectedIndex >= this._config.tabs.length - 1 ? "disabled" : ""}>Runter</button>
              <button data-action="delete-tab" type="button" ${this._config.tabs.length <= 1 ? "disabled" : ""}>Loeschen</button>
            </div>
          </aside>
          <section class="panel">
            <h2>Auswahl</h2>
            <div class="field-grid">
              <label class="field">
                Start-Tab
                <select data-global="defaultTabIndex">
                  ${this._config.tabs.map((item, index) => `
                    <option value="${index}" ${this._config.options.defaultTabIndex === index ? "selected" : ""}>${index + 1}. ${escapeHtml(item.attributes?.label || "Tab")}</option>
                  `).join("")}
                </select>
              </label>
              <label class="field">
                Aktivfarbe
                <input data-style="--mdc-theme-primary" value="${escapeAttribute(this._config.styles["--mdc-theme-primary"] ?? "")}" placeholder="var(--primary-color)">
              </label>
              <label class="field">
                Tab-Label
                <input data-attribute="label" value="${escapeAttribute(tab.attributes?.label ?? "")}">
              </label>
              <label class="field">
                Tab-Icon
                <input data-attribute="icon" value="${escapeAttribute(tab.attributes?.icon ?? "")}" placeholder="mdi:lightbulb">
              </label>
              <label class="field">
                Card-Typ
                <select data-card="type">${renderCardOptions(tab.card?.type)}</select>
              </label>
              <label class="field">
                Titel
                <input data-card="title" value="${escapeAttribute(tab.card?.title ?? tab.card?.name ?? "")}">
              </label>
              <label class="field full">
                Entity
                <input data-card="entity" list="tabbed-card-v2-entities" value="${escapeAttribute(tab.card?.entity ?? "")}" placeholder="light.kitchen">
                <datalist id="tabbed-card-v2-entities">${listEntities(this._hass).map(entityId => `<option value="${escapeAttribute(entityId)}"></option>`).join("")}</datalist>
              </label>
              <label class="field full">
                Entities / Unterkarten
                <textarea data-card="entities" placeholder="sensor.temperature&#10;binary_sensor.motion">${escapeTextarea(serializeCardList(tab.card))}</textarea>
              </label>
              <label class="field full">
                Markdown
                <textarea data-card="content" placeholder="## Status">${escapeTextarea(tab.card?.content ?? "")}</textarea>
              </label>
            </div>
            <p class="hint">Bei Layout-Karten wird die Liste als einfache Unterkarten interpretiert. Format: type | entity | title.</p>
            <output class="status">${escapeHtml(this._status ?? "")}</output>
          </section>
          <section class="panel output">
            <h2>YAML</h2>
            <pre>${escapeHtml(this._output)}</pre>
          </section>
        </section>
      </main>
    `;
    this._bind();
  }

  _bind() {
    for (const element of this.shadowRoot.querySelectorAll("[data-action]")) {
      element.addEventListener("click", () => this._handleAction(element.dataset.action, Number(element.dataset.index)));
    }
    for (const element of this.shadowRoot.querySelectorAll("[data-global], [data-style], [data-attribute], [data-card]")) {
      element.addEventListener("change", () => this._handleInput(element));
    }
  }

  _handleAction(action, index) {
    if (action === "select-tab") {
      this._selectedIndex = index;
    } else if (action === "add-tab") {
      this._config.tabs.push(createDefaultTab(this._config.tabs.length + 1));
      this._selectedIndex = this._config.tabs.length - 1;
    } else if (action === "delete-tab" && this._config.tabs.length > 1) {
      this._config.tabs.splice(this._selectedIndex, 1);
      this._selectedIndex = Math.max(0, this._selectedIndex - 1);
    } else if (action === "move-up" || action === "move-down") {
      const nextIndex = this._selectedIndex + (action === "move-up" ? -1 : 1);
      if (nextIndex >= 0 && nextIndex < this._config.tabs.length) {
        const [tab] = this._config.tabs.splice(this._selectedIndex, 1);
        this._config.tabs.splice(nextIndex, 0, tab);
        this._selectedIndex = nextIndex;
      }
    } else if (action === "copy") {
      void navigator.clipboard.writeText(this._output);
      this._status = "YAML kopiert.";
    } else if (action === "download") {
      downloadText("tabbed-card-v2.yaml", this._output);
      this._status = "YAML exportiert.";
    } else if (action === "reset") {
      this._config = createDefaultConfig();
      this._selectedIndex = 0;
      this._status = "Editor zurueckgesetzt.";
    }
    this._config.options.defaultTabIndex = clampIndex(this._config.options.defaultTabIndex, this._config.tabs.length);
    this._render();
  }

  _handleInput(element) {
    const tab = this._config.tabs[this._selectedIndex];
    if (element.dataset.global === "defaultTabIndex") {
      this._config.options.defaultTabIndex = Number(element.value);
    }
    if (element.dataset.style) {
      this._config.styles[element.dataset.style] = element.value.trim();
    }
    if (element.dataset.attribute) {
      tab.attributes[element.dataset.attribute] = element.value.trim();
    }
    if (element.dataset.card) {
      tab.card = updatePanelCard(tab.card ?? {}, element.dataset.card, element.value);
    }
    this._status = "Aktualisiert.";
    this._render();
  }
}

function createDefaultConfig() {
  return {
    type: "custom:tabbed-card-v2",
    options: { defaultTabIndex: 0 },
    styles: { "--mdc-theme-primary": "var(--primary-color)" },
    tabs: [
      {
        attributes: { label: "Licht", icon: "mdi:lightbulb" },
        card: { type: "button", entity: "light.kitchen", tap_action: { action: "toggle" } },
      },
      {
        attributes: { label: "Sensoren", icon: "mdi:thermometer" },
        card: { type: "entities", title: "Sensoren", entities: ["sensor.temperature", "sensor.humidity"] },
      },
    ],
  };
}

function createDefaultTab(index) {
  return {
    attributes: { label: `Tab ${index}`, icon: "mdi:view-dashboard" },
    card: { type: "entity", entity: "sun.sun" },
  };
}

function updatePanelCard(card, key, value) {
  const next = { ...card };
  if (key === "type") {
    return normalizePanelCard({ type: value });
  }
  if (key === "entities") {
    if (isLayoutCard(next.type)) {
      next.cards = parseChildCards(value);
    } else {
      next.entities = value.split(/\r?\n|,/).map(item => item.trim()).filter(Boolean);
    }
    return normalizePanelCard(next);
  }
  if (key === "content") {
    next.content = value;
    return normalizePanelCard(next);
  }
  if (value.trim()) {
    next[key] = value.trim();
  } else {
    delete next[key];
  }
  return normalizePanelCard(next);
}

function normalizePanelCard(card) {
  const type = card.type || "entity";
  if (isLayoutCard(type)) {
    return { type, cards: Array.isArray(card.cards) && card.cards.length ? card.cards : [{ type: "entity", entity: "sun.sun" }] };
  }
  if (type === "entities") {
    return { type, title: card.title, entities: Array.isArray(card.entities) && card.entities.length ? card.entities : ["sun.sun"] };
  }
  if (type === "markdown") {
    return { type, title: card.title, content: card.content || "## Status" };
  }
  return cleanObject({ ...card, type, entity: card.entity || "sun.sun" });
}

function renderCardOptions(selectedType = "entity") {
  const groups = {
    Core: ["entity", "entities", "button", "tile", "sensor", "gauge", "markdown", "glance", "history-graph", "statistics-graph", "thermostat", "weather-forecast", "media-control"],
    Layout: ["vertical-stack", "horizontal-stack", "grid", "conditional"],
    HACS: ["custom:bubble-card", "custom:mushroom-entity-card", "custom:mushroom-template-card", "custom:mini-graph-card", "custom:button-card"],
  };
  return Object.entries(groups).map(([label, values]) => `
    <optgroup label="${escapeAttribute(label)}">
      ${values.map(value => `<option value="${escapeAttribute(value)}" ${value === selectedType ? "selected" : ""}>${escapeHtml(value)}</option>`).join("")}
    </optgroup>
  `).join("");
}

function serializeCardList(card) {
  if (isLayoutCard(card?.type)) {
    return (card.cards ?? []).map(item => [item.type, item.entity, item.title].filter(Boolean).join(" | ")).join("\n");
  }
  return (card?.entities ?? []).map(item => typeof item === "string" ? item : item.entity).filter(Boolean).join("\n");
}

function parseChildCards(value) {
  return value.split(/\r?\n/).map(line => line.trim()).filter(Boolean).map(line => {
    const [type, entity, title] = line.split("|").map(item => item.trim());
    return cleanObject({ type: type || "entity", entity, title });
  });
}

function isLayoutCard(type) {
  return ["vertical-stack", "horizontal-stack", "grid", "conditional"].includes(type);
}

function listEntities(hass) {
  return Object.keys(hass?.states ?? {}).sort((left, right) => left.localeCompare(right));
}

function toYaml(value, indent = 0) {
  if (Array.isArray(value)) {
    return value.map(item => `${" ".repeat(indent)}- ${yamlArrayValue(item, indent)}`).join("\n");
  }
  if (value && typeof value === "object") {
    return Object.entries(cleanObject(value)).map(([key, entry]) => {
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
    const entries = Object.entries(cleanObject(item));
    const [firstKey, firstValue] = entries[0] ?? ["", ""];
    const firstLine = firstValue && typeof firstValue === "object"
      ? `${firstKey}:\n${toYaml(firstValue, indent + 4)}`
      : `${firstKey}: ${formatYamlScalar(firstValue)}`;
    return [firstLine, ...entries.slice(1).map(([key, value]) => value && typeof value === "object"
      ? `${" ".repeat(indent + 2)}${key}:\n${toYaml(value, indent + 4)}`
      : `${" ".repeat(indent + 2)}${key}: ${formatYamlScalar(value)}`)].join("\n");
  }
  return formatYamlScalar(item);
}

function formatYamlScalar(value) {
  if (typeof value === "boolean" || typeof value === "number") return String(value);
  const text = String(value ?? "");
  return !text || /[:#\n\r[\]{}&,*>!|%@`"]/.test(text) || /^\s|\s$|^(true|false|null|\d+)$/i.test(text)
    ? JSON.stringify(text)
    : text;
}

function cleanObject(object) {
  return Object.fromEntries(Object.entries(object)
    .filter(([, value]) => value !== undefined && value !== "" && value !== false)
    .map(([key, value]) => [key, value && typeof value === "object" && !Array.isArray(value) ? cleanObject(value) : value])
    .filter(([, value]) => !(value && typeof value === "object" && !Array.isArray(value) && Object.keys(value).length === 0)));
}

function downloadText(filename, text) {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(new Blob([text], { type: "application/yaml;charset=utf-8" }));
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll("'", "&#39;");
}

function escapeTextarea(value) {
  return escapeHtml(value);
}

customElements.define("tabbed-card-v2-panel", TabbedCardV2Panel);
