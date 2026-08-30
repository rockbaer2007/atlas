class TabbedCardV2 extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._config = undefined;
    this._hass = undefined;
    this._helpers = undefined;
    this._cards = [];
    this._selectedTabIndex = 0;
  }

  static async getConfigElement() {
    return document.createElement("tabbed-card-v2-editor");
  }

  static getStubConfig() {
    return {
      type: "custom:tabbed-card-v2",
      options: {
        defaultTabIndex: 0,
      },
      tabs: [
        {
          attributes: {
            label: "Sun",
            icon: "mdi:white-balance-sunny",
          },
          card: {
            type: "entity",
            entity: "sun.sun",
          },
        },
      ],
    };
  }

  set hass(hass) {
    this._hass = hass;
    for (const card of this._cards) {
      card.hass = hass;
    }
  }

  setConfig(config) {
    if (!config || config.type !== "custom:tabbed-card-v2") {
      throw new Error("Tabbed Card V2 requires type: custom:tabbed-card-v2");
    }
    if (!Array.isArray(config.tabs) || config.tabs.length === 0) {
      throw new Error("Tabbed Card V2 requires at least one tab.");
    }

    this._config = {
      ...config,
      options: config.options ?? {},
      styles: config.styles ?? {},
      attributes: config.attributes ?? {},
      tabs: config.tabs.map((tab) => ({
        ...tab,
        attributes: {
          ...(config.attributes ?? {}),
          ...(tab.attributes ?? {}),
        },
        styles: tab.styles ?? {},
        card: tab.card ?? { type: "entity", entity: "sun.sun" },
      })),
    };
    this._selectedTabIndex = clampIndex(
      this._config.options.defaultTabIndex ?? 0,
      this._config.tabs.length,
    );
    void this._buildCards();
  }

  getCardSize() {
    const activeCard = this._cards[this._selectedTabIndex];
    if (activeCard?.getCardSize) {
      return activeCard.getCardSize() + 1;
    }
    return 3;
  }

  async _buildCards() {
    this._helpers = this._helpers ?? await this._loadCardHelpers();
    this._cards = await Promise.all(
      this._config.tabs.map(async (tab) => {
        const card = await this._helpers.createCardElement(tab.card);
        if (this._hass) {
          card.hass = this._hass;
        }
        card.addEventListener("ll-rebuild", (event) => {
          event.stopPropagation();
          void this._buildCards();
        }, { once: true });
        return card;
      }),
    );
    this._render();
  }

  async _loadCardHelpers() {
    if (window.loadCardHelpers) {
      return window.loadCardHelpers();
    }
    throw new Error("Home Assistant card helpers are not available.");
  }

  _render() {
    if (!this._config || !this._cards.length) {
      return;
    }

    const styleValues = {
      "--tabbed-card-v2-active-color": "var(--primary-color)",
      "--tabbed-card-v2-inactive-color": "var(--secondary-text-color)",
      "--tabbed-card-v2-font-size": "14px",
      ...mapKnownStyles(this._config.styles),
    };
    const tabButtons = this._config.tabs.map((tab, index) => {
      const attributes = tab.attributes ?? {};
      const active = index === this._selectedTabIndex;
      const classes = [
        "tab",
        active ? "active" : "",
        attributes.stacked ? "stacked" : "",
        attributes.minWidth ? "min-width" : "",
        attributes.isFadingIndicator ? "fade-indicator" : "",
        attributes.isMinWidthIndicator ? "min-indicator" : "",
      ].filter(Boolean).join(" ");

      return `
        <button
          class="${classes}"
          type="button"
          data-tab-index="${index}"
          aria-selected="${String(active)}"
          role="tab"
        >
          ${attributes.icon ? `<ha-icon icon="${escapeHtml(attributes.icon)}"></ha-icon>` : ""}
          ${attributes.label ? `<span>${escapeHtml(attributes.label)}</span>` : ""}
        </button>
      `;
    }).join("");

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          ${Object.entries(styleValues).map(([key, value]) => `${key}: ${value};`).join("\n")}
        }

        ha-card {
          display: block;
          overflow: hidden;
        }

        .tabs {
          display: flex;
          overflow-x: auto;
          scrollbar-width: thin;
          border-bottom: 1px solid var(--divider-color);
        }

        .tab {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-width: 90px;
          min-height: 48px;
          border: 0;
          border-radius: 0;
          background: transparent;
          color: var(--tabbed-card-v2-inactive-color);
          cursor: pointer;
          font: inherit;
          font-size: var(--tabbed-card-v2-font-size);
          font-weight: 500;
          padding: 8px 16px;
          white-space: nowrap;
        }

        .tab:hover,
        .tab:focus-visible {
          background: var(--secondary-background-color);
          outline: none;
        }

        .tab.active {
          color: var(--tabbed-card-v2-active-color);
        }

        .tab.active::after {
          position: absolute;
          right: 0;
          bottom: 0;
          left: 0;
          height: 3px;
          background: var(--tabbed-card-v2-active-color);
          content: "";
        }

        .tab.min-indicator.active::after {
          right: 22px;
          left: 22px;
        }

        .tab.fade-indicator.active::after {
          transition: opacity 160ms ease;
        }

        .tab.min-width {
          min-width: 54px;
          padding-inline: 12px;
        }

        .tab.stacked {
          display: grid;
          gap: 3px;
          min-height: 64px;
        }

        .content {
          display: block;
        }
      </style>
      <ha-card>
        <div class="tabs" role="tablist">${tabButtons}</div>
        <div class="content"></div>
      </ha-card>
    `;

    const content = this.shadowRoot.querySelector(".content");
    const activeCard = this._cards[this._selectedTabIndex];
    if (activeCard) {
      content.append(activeCard);
    }

    for (const button of this.shadowRoot.querySelectorAll("[data-tab-index]")) {
      button.addEventListener("click", () => {
        this._selectedTabIndex = Number(button.dataset.tabIndex);
        this._render();
      });
    }
  }
}

const editorCardGroups = [
  {
    label: "Core",
    cards: [
      "entity",
      "entities",
      "button",
      "tile",
      "sensor",
      "gauge",
      "markdown",
      "glance",
      "history-graph",
      "statistics-graph",
      "thermostat",
      "weather-forecast",
      "picture",
      "picture-entity",
      "picture-elements",
      "media-control",
      "alarm-panel",
      "map",
      "logbook",
    ],
  },
  {
    label: "Layout",
    cards: [
      "vertical-stack",
      "horizontal-stack",
      "grid",
      "conditional",
      "custom:tabbed-card-v2",
    ],
  },
  {
    label: "Community / HACS",
    cards: [
      "custom:bubble-card",
      "custom:mushroom-entity-card",
      "custom:mushroom-template-card",
      "custom:mushroom-chips-card",
      "custom:mushroom-light-card",
      "custom:mushroom-cover-card",
      "custom:mushroom-climate-card",
      "custom:mini-graph-card",
      "custom:apexcharts-card",
      "custom:button-card",
      "custom:layout-card",
    ],
  },
];

const editorCommunityResources = {
  "custom:bubble-card": "/hacsfiles/Bubble-Card/bubble-card.js",
  "custom:mushroom-entity-card": "/hacsfiles/lovelace-mushroom/mushroom.js",
  "custom:mushroom-template-card": "/hacsfiles/lovelace-mushroom/mushroom.js",
  "custom:mushroom-chips-card": "/hacsfiles/lovelace-mushroom/mushroom.js",
  "custom:mushroom-light-card": "/hacsfiles/lovelace-mushroom/mushroom.js",
  "custom:mushroom-cover-card": "/hacsfiles/lovelace-mushroom/mushroom.js",
  "custom:mushroom-climate-card": "/hacsfiles/lovelace-mushroom/mushroom.js",
  "custom:mini-graph-card": "/hacsfiles/mini-graph-card/mini-graph-card-bundle.js",
  "custom:apexcharts-card": "/hacsfiles/apexcharts-card/apexcharts-card.js",
  "custom:button-card": "/hacsfiles/button-card/button-card.js",
  "custom:layout-card": "/hacsfiles/lovelace-layout-card/layout-card.js",
};

const editorEntityCardTypes = new Set([
  "entity",
  "button",
  "tile",
  "sensor",
  "gauge",
  "thermostat",
  "weather-forecast",
  "picture-entity",
  "media-control",
  "alarm-panel",
  "custom:bubble-card",
  "custom:mushroom-entity-card",
  "custom:mushroom-template-card",
  "custom:mushroom-light-card",
  "custom:mushroom-cover-card",
  "custom:mushroom-climate-card",
  "custom:mini-graph-card",
  "custom:apexcharts-card",
  "custom:button-card",
]);
const editorEntitiesCardTypes = new Set(["entities", "glance", "history-graph", "statistics-graph", "map", "logbook"]);
const editorLayoutCardTypes = new Set(["vertical-stack", "horizontal-stack", "grid", "custom:layout-card"]);
const editorNestedTabbedCardTypes = new Set(["custom:tabbed-card-v2"]);
const editorPictureCardTypes = new Set(["picture", "picture-entity", "picture-elements"]);
const editorDisplayToggleCardTypes = new Set([
  "entity",
  "button",
  "tile",
  "sensor",
  "picture-entity",
  "custom:mushroom-entity-card",
  "custom:mushroom-light-card",
  "custom:mushroom-cover-card",
  "custom:mushroom-climate-card",
]);

class TabbedCardV2Editor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._config = TabbedCardV2.getStubConfig();
    this._hass = undefined;
    this._selectedIndex = 0;
  }

  set hass(hass) {
    this._hass = hass;
    this._render();
  }

  setConfig(config) {
    this._config = normalizeEditorConfig(config);
    this._selectedIndex = clampIndex(
      this._config.options?.defaultTabIndex ?? 0,
      this._config.tabs.length,
    );
    this._render();
  }

  _render() {
    const tab = this._config.tabs[this._selectedIndex] ?? this._config.tabs[0];
    const attributes = tab.attributes ?? {};
    const card = tab.card ?? {};
    const cardType = card.type ?? "entity";
    const entities = listEditorEntities(this._hass);
    const resourceHint = editorCommunityResources[cardType] ?? "";

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }

        .editor {
          display: grid;
          gap: 14px;
          padding: 8px 0;
        }

        .section {
          display: grid;
          gap: 10px;
          padding: 12px;
          border: 1px solid var(--divider-color);
          border-radius: 8px;
          background: var(--card-background-color);
        }

        .section-title {
          margin: 0;
          color: var(--primary-text-color);
          font-size: 14px;
          font-weight: 700;
        }

        .tabs {
          display: grid;
          gap: 8px;
        }

        .tab-list {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        button {
          min-height: 36px;
          border: 1px solid var(--divider-color);
          border-radius: 6px;
          background: var(--secondary-background-color);
          color: var(--primary-text-color);
          cursor: pointer;
          font: inherit;
          padding: 6px 10px;
        }

        button.primary {
          border-color: var(--primary-color);
          background: var(--primary-color);
          color: var(--text-primary-color);
          font-weight: 700;
        }

        button.selected {
          border-color: var(--primary-color);
          box-shadow: inset 0 0 0 1px var(--primary-color);
        }

        button.danger {
          color: var(--error-color);
        }

        button:disabled {
          cursor: not-allowed;
          opacity: 0.45;
        }

        .actions {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 6px;
        }

        .grid {
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

        .hint {
          margin: 0;
          color: var(--secondary-text-color);
          font-size: 12px;
          line-height: 1.35;
        }

        .resource-hint {
          margin: 0;
          padding: 8px 10px;
          border: 1px solid var(--warning-color, #f0b429);
          border-radius: 6px;
          color: var(--primary-text-color);
          font-size: 12px;
          line-height: 1.35;
        }

        label {
          color: var(--secondary-text-color);
          font-size: 12px;
          font-weight: 700;
        }

        input,
        select,
        textarea {
          width: 100%;
          min-width: 0;
          min-height: 36px;
          box-sizing: border-box;
          border: 1px solid var(--divider-color);
          border-radius: 6px;
          background: var(--card-background-color);
          color: var(--primary-text-color);
          font: inherit;
          padding: 7px 9px;
        }

        textarea {
          min-height: 86px;
          resize: vertical;
        }

        .checks {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 6px 10px;
        }

        .check {
          display: flex;
          align-items: center;
          gap: 7px;
          min-height: 28px;
          color: var(--primary-text-color);
          font-size: 13px;
        }

        .check input {
          width: 16px;
          min-height: 16px;
          accent-color: var(--primary-color);
        }

        @media (max-width: 600px) {
          .grid,
          .actions,
          .checks {
            grid-template-columns: 1fr;
          }
        }
      </style>
      <div class="editor">
        <section class="section tabs">
          <h3 class="section-title">Tabs</h3>
          <div class="tab-list">
            ${this._config.tabs.map((item, index) => `
              <button class="${index === this._selectedIndex ? "selected" : ""}" data-action="select-tab" data-index="${index}" type="button">
                ${index + 1}. ${escapeHtml(item.attributes?.label || "Tab")}
              </button>
            `).join("")}
          </div>
          <div class="actions">
            <button data-action="add-tab" class="primary" type="button">Neu</button>
            <button data-action="move-up" type="button" ${this._selectedIndex === 0 ? "disabled" : ""}>Hoch</button>
            <button data-action="move-down" type="button" ${this._selectedIndex >= this._config.tabs.length - 1 ? "disabled" : ""}>Runter</button>
            <button data-action="delete-tab" class="danger" type="button" ${this._config.tabs.length <= 1 ? "disabled" : ""}>Loeschen</button>
          </div>
        </section>

        <section class="section">
          <h3 class="section-title">Globale Einstellungen</h3>
          <div class="grid">
            <div class="field">
              <label for="default-tab">Start-Tab</label>
              <select id="default-tab" data-field="defaultTabIndex">
                ${this._config.tabs.map((item, index) => `
                  <option value="${index}" ${index === (this._config.options?.defaultTabIndex ?? 0) ? "selected" : ""}>
                    ${index + 1}. ${escapeHtml(item.attributes?.label || "Tab")}
                  </option>
                `).join("")}
              </select>
            </div>
            <div class="field">
              <label for="active-color">Aktivfarbe</label>
              <input id="active-color" data-style="--mdc-theme-primary" value="${escapeAttribute(this._config.styles?.["--mdc-theme-primary"] ?? "")}" placeholder="var(--primary-color)">
            </div>
            <div class="field full">
              <label for="font-size">Tab-Schriftgroesse</label>
              <input id="font-size" data-style="--mdc-typography-button-font-size" value="${escapeAttribute(this._config.styles?.["--mdc-typography-button-font-size"] ?? "")}" placeholder="14px">
            </div>
          </div>
        </section>

        <section class="section">
          <h3 class="section-title">Ausgewaehlter Tab</h3>
          <div class="grid">
            <div class="field">
              <label for="tab-label">Label</label>
              <input id="tab-label" data-attribute="label" value="${escapeAttribute(attributes.label ?? "")}">
            </div>
            <div class="field">
              <label for="tab-icon">Icon</label>
              <input id="tab-icon" data-attribute="icon" value="${escapeAttribute(attributes.icon ?? "")}" placeholder="mdi:lightbulb">
            </div>
          </div>
          <div class="checks">
            <label class="check"><input data-attribute="stacked" type="checkbox" ${attributes.stacked ? "checked" : ""}>Icon gestapelt</label>
            <label class="check"><input data-attribute="minWidth" type="checkbox" ${attributes.minWidth ? "checked" : ""}>Schmaler Tab</label>
            <label class="check"><input data-attribute="isMinWidthIndicator" type="checkbox" ${attributes.isMinWidthIndicator ? "checked" : ""}>Schmaler Indikator</label>
            <label class="check"><input data-attribute="isFadingIndicator" type="checkbox" ${attributes.isFadingIndicator ? "checked" : ""}>Fade-Indikator</label>
          </div>
        </section>

        <section class="section">
          <h3 class="section-title">Card im Tab</h3>
          <div class="grid">
            <div class="field">
              <label for="card-type">Card-Typ</label>
              <select id="card-type" data-card="type">
                ${renderEditorCardTypeOptions(cardType)}
              </select>
            </div>
            <div class="field">
              <label for="card-title">Titel</label>
              <input id="card-title" data-card="title" value="${escapeAttribute(card.title ?? card.name ?? "")}">
            </div>
            <div class="field">
              <label for="card-name">Name</label>
              <input id="card-name" data-card="name" value="${escapeAttribute(card.name ?? "")}">
            </div>
            <div class="field">
              <label for="card-icon">Icon</label>
              <input id="card-icon" data-card="icon" value="${escapeAttribute(card.icon ?? "")}" placeholder="mdi:home">
            </div>
            <div class="field full" ${editorEntityCardTypes.has(cardType) ? "" : "hidden"}>
              <label for="card-entity">Entity</label>
              <input id="card-entity" data-card="entity" list="tabbed-card-v2-entities" value="${escapeAttribute(card.entity ?? "")}" placeholder="light.bed_light">
              <datalist id="tabbed-card-v2-entities">
                ${entities.map(entityId => `<option value="${escapeAttribute(entityId)}"></option>`).join("")}
              </datalist>
            </div>
            <div class="field full" ${editorEntitiesCardTypes.has(cardType) ? "" : "hidden"}>
              <label for="card-entities">Entities-Liste</label>
              <textarea id="card-entities" data-card="entities" placeholder="sensor.temperature&#10;binary_sensor.motion">${escapeTextarea(editorEntityLines(card.entities))}</textarea>
            </div>
            <div class="field full" ${cardType === "markdown" ? "" : "hidden"}>
              <label for="card-content">Markdown-Inhalt</label>
              <textarea id="card-content" data-card="content" placeholder="## Status&#10;Alles im Blick.">${escapeTextarea(card.content ?? "")}</textarea>
            </div>
            <div class="field full" ${editorPictureCardTypes.has(cardType) ? "" : "hidden"}>
              <label for="card-image">Bild oder Kamera</label>
              <input id="card-image" data-card="image" value="${escapeAttribute(card.image ?? card.camera_image ?? "")}" placeholder="/local/image.jpg oder camera.front_door">
            </div>
            <div class="field full" ${editorLayoutCardTypes.has(cardType) || editorNestedTabbedCardTypes.has(cardType) || cardType === "conditional" ? "" : "hidden"}>
              <label for="child-cards">Unterkarten</label>
              <textarea id="child-cards" data-card="cards" placeholder="button | light.kitchen | Kueche&#10;entity | sensor.temperature | Temperatur">${escapeTextarea(serializeEditorCards(cardType === "conditional" ? [card.card].filter(Boolean) : editorNestedTabbedCardTypes.has(cardType) ? editorCardsFromNestedTabs(card.tabs) : card.cards))}</textarea>
              <p class="hint">Eine Unterkarte pro Zeile: type | entity | title. Bei verschachtelter Tabbed Card wird daraus je eine innere Registerkarte.</p>
            </div>
            <div class="field" ${cardType === "grid" || cardType === "custom:layout-card" ? "" : "hidden"}>
              <label for="grid-columns">Spalten</label>
              <input id="grid-columns" data-card="columns" type="number" min="1" max="12" value="${escapeAttribute(card.columns ?? 2)}">
            </div>
            <div class="field" ${cardType === "grid" ? "" : "hidden"}>
              <label class="check"><input data-card="square" type="checkbox" ${card.square === true ? "checked" : ""}>Quadratisch</label>
            </div>
            <div class="field" ${cardType === "conditional" ? "" : "hidden"}>
              <label for="condition-entity">Bedingungs-Entity</label>
              <input id="condition-entity" data-card="condition_entity" list="tabbed-card-v2-entities" value="${escapeAttribute(card.conditions?.[0]?.entity ?? "")}" placeholder="binary_sensor.motion">
            </div>
            <div class="field" ${cardType === "conditional" ? "" : "hidden"}>
              <label for="condition-state">Bedingungs-State</label>
              <input id="condition-state" data-card="condition_state" value="${escapeAttribute(card.conditions?.[0]?.state ?? "on")}">
            </div>
            <div class="field">
              <label for="tap-action">Tap Action</label>
              <select id="tap-action" data-card="tap_action">
                ${["", "toggle", "more-info", "navigate"].map(action => `
                  <option value="${action}" ${(card.tap_action?.action ?? "") === action ? "selected" : ""}>${action || "Keine"}</option>
                `).join("")}
              </select>
            </div>
            <div class="field" ${card.tap_action?.action === "navigate" ? "" : "hidden"}>
              <label for="navigation-path">Navigation Path</label>
              <input id="navigation-path" data-card="navigation_path" value="${escapeAttribute(card.tap_action?.navigation_path ?? "")}" placeholder="/lovelace/energy">
            </div>
            <div class="field" ${cardType === "custom:bubble-card" ? "" : "hidden"}>
              <label for="bubble-type">Bubble Button</label>
              <select id="bubble-type" data-card="button_type">
                ${["state", "switch", "slider", "name"].map(type => `
                  <option value="${type}" ${(card.button_type ?? "state") === type ? "selected" : ""}>${type}</option>
                `).join("")}
              </select>
            </div>
            <div class="field" ${cardType === "gauge" ? "" : "hidden"}>
              <label for="gauge-min">Gauge Min</label>
              <input id="gauge-min" data-card="min" type="number" value="${escapeAttribute(card.min ?? 0)}">
            </div>
            <div class="field" ${cardType === "gauge" ? "" : "hidden"}>
              <label for="gauge-max">Gauge Max</label>
              <input id="gauge-max" data-card="max" type="number" value="${escapeAttribute(card.max ?? 100)}">
            </div>
            <div class="field" ${cardType === "history-graph" || cardType === "statistics-graph" || cardType === "custom:mini-graph-card" ? "" : "hidden"}>
              <label for="hours-to-show">Stunden anzeigen</label>
              <input id="hours-to-show" data-card="hours_to_show" type="number" min="1" max="168" value="${escapeAttribute(card.hours_to_show ?? 24)}">
            </div>
          </div>
          ${resourceHint ? `<p class="resource-hint">HACS Resource noetig: ${escapeHtml(resourceHint)}</p>` : ""}
          <div class="checks" ${editorDisplayToggleCardTypes.has(cardType) ? "" : "hidden"}>
            <label class="check"><input data-card="show_name" type="checkbox" ${card.show_name !== false ? "checked" : ""}>Name zeigen</label>
            <label class="check"><input data-card="show_icon" type="checkbox" ${card.show_icon !== false ? "checked" : ""}>Icon zeigen</label>
            <label class="check"><input data-card="show_state" type="checkbox" ${card.show_state !== false ? "checked" : ""}>State zeigen</label>
          </div>
        </section>
      </div>
    `;
    this._bindEditorEvents();
  }

  _bindEditorEvents() {
    for (const button of this.shadowRoot.querySelectorAll("[data-action]")) {
      button.addEventListener("click", () => this._handleAction(button.dataset.action, Number(button.dataset.index)));
    }
    for (const input of this.shadowRoot.querySelectorAll("[data-field], [data-style], [data-attribute], [data-card]")) {
      input.addEventListener("change", () => this._handleInput(input));
      input.addEventListener("input", () => {
        if (input.tagName !== "SELECT" && input.type !== "checkbox") {
          this._handleInput(input, { deferRender: true });
        }
      });
    }
  }

  _handleAction(action, index) {
    if (action === "select-tab") {
      this._selectedIndex = index;
      this._render();
      return;
    }
    if (action === "add-tab") {
      const next = this._config.tabs.length + 1;
      this._config.tabs.push({
        attributes: { label: `Tab ${next}`, icon: "mdi:view-dashboard" },
        card: { type: "entity", entity: "sun.sun", title: `Tab ${next}` },
      });
      this._selectedIndex = this._config.tabs.length - 1;
    }
    if (action === "delete-tab" && this._config.tabs.length > 1) {
      this._config.tabs.splice(this._selectedIndex, 1);
      this._selectedIndex = clampIndex(this._selectedIndex, this._config.tabs.length);
    }
    if (action === "move-up" || action === "move-down") {
      const direction = action === "move-up" ? -1 : 1;
      const nextIndex = this._selectedIndex + direction;
      if (nextIndex >= 0 && nextIndex < this._config.tabs.length) {
        const [tab] = this._config.tabs.splice(this._selectedIndex, 1);
        this._config.tabs.splice(nextIndex, 0, tab);
        this._selectedIndex = nextIndex;
      }
    }
    this._config.options.defaultTabIndex = clampIndex(this._config.options.defaultTabIndex ?? 0, this._config.tabs.length);
    this._emitConfigChanged();
  }

  _handleInput(input, { deferRender = false } = {}) {
    const tab = this._config.tabs[this._selectedIndex];
    if (input.dataset.field === "defaultTabIndex") {
      this._config.options.defaultTabIndex = Number(input.value);
    }
    if (input.dataset.style) {
      this._config.styles = cleanEditorObject({
        ...(this._config.styles ?? {}),
        [input.dataset.style]: input.value.trim(),
      });
    }
    if (input.dataset.attribute) {
      tab.attributes = cleanEditorObject({
        ...(tab.attributes ?? {}),
        [input.dataset.attribute]: input.type === "checkbox" ? input.checked : input.value.trim(),
      });
    }
    if (input.dataset.card) {
      tab.card = this._updateCardValue(tab.card ?? {}, input);
    }
    this._emitConfigChanged({ deferRender });
  }

  _updateCardValue(card, input) {
    const key = input.dataset.card;
    const nextCard = { ...card };
    if (key === "type") {
      nextCard.type = input.value;
      return normalizeEditorCard(nextCard);
    }
    if (key === "tap_action") {
      if (input.value) {
        nextCard.tap_action = {
          action: input.value,
          ...(input.value === "navigate" && card.tap_action?.navigation_path
            ? { navigation_path: card.tap_action.navigation_path }
            : {}),
        };
      } else {
        delete nextCard.tap_action;
      }
      return normalizeEditorCard(nextCard);
    }
    if (key === "navigation_path") {
      nextCard.tap_action = cleanEditorObject({
        ...(nextCard.tap_action ?? { action: "navigate" }),
        action: "navigate",
        navigation_path: input.value.trim(),
      });
      return normalizeEditorCard(nextCard);
    }
    if (key === "entities") {
      const entities = input.value.split(/\r?\n|,/).map(value => value.trim()).filter(Boolean);
      if (entities.length) {
        nextCard.entities = entities;
      } else {
        delete nextCard.entities;
      }
      return normalizeEditorCard(nextCard);
    }
    if (key === "cards") {
      const cards = parseEditorCards(input.value);
      if (nextCard.type === "conditional") {
        nextCard.card = cards[0] ?? nextCard.card ?? { type: "entity", entity: "sun.sun" };
      } else if (editorNestedTabbedCardTypes.has(nextCard.type)) {
        nextCard.tabs = cards.length
          ? cards.map((card, index) => ({
              attributes: {
                label: card.title || card.name || `Tab ${index + 1}`,
              },
              card,
            }))
          : undefined;
      } else if (cards.length) {
        nextCard.cards = cards;
      } else {
        delete nextCard.cards;
      }
      return normalizeEditorCard(nextCard);
    }
    if (key === "condition_entity" || key === "condition_state") {
      const currentCondition = nextCard.conditions?.[0] ?? { condition: "state" };
      const condition = cleanEditorObject({
        condition: "state",
        entity: key === "condition_entity" ? input.value.trim() : currentCondition.entity,
        state: key === "condition_state" ? input.value.trim() : currentCondition.state ?? "on",
      });
      nextCard.conditions = condition.entity ? [condition] : [];
      return normalizeEditorCard(nextCard);
    }
    if (input.type === "checkbox") {
      nextCard[key] = input.checked;
      return normalizeEditorCard(nextCard);
    }
    if (input.type === "number") {
      const value = Number(input.value);
      if (Number.isFinite(value)) {
        nextCard[key] = value;
      } else {
        delete nextCard[key];
      }
      return normalizeEditorCard(nextCard);
    }
    if (key === "image") {
      const value = input.value.trim();
      delete nextCard.image;
      delete nextCard.camera_image;
      if (value.startsWith("camera.")) {
        nextCard.camera_image = value;
      } else if (value) {
        nextCard.image = value;
      }
      return normalizeEditorCard(nextCard);
    }
    if (input.value.trim()) {
      nextCard[key] = input.value.trim();
    } else {
      delete nextCard[key];
    }
    return normalizeEditorCard(nextCard);
  }

  _emitConfigChanged({ deferRender = false } = {}) {
    const event = new CustomEvent("config-changed", {
      bubbles: true,
      composed: true,
      detail: { config: cleanEditorConfig(this._config) },
    });
    this.dispatchEvent(event);
    if (!deferRender) {
      this._render();
    }
  }
}

function normalizeEditorConfig(config) {
  const source = config && typeof config === "object" ? config : TabbedCardV2.getStubConfig();
  const tabs = Array.isArray(source.tabs) && source.tabs.length
    ? source.tabs.map((tab, index) => ({
        attributes: cleanEditorObject({
          label: tab?.attributes?.label ?? `Tab ${index + 1}`,
          icon: tab?.attributes?.icon ?? "",
          stacked: tab?.attributes?.stacked === true,
          minWidth: tab?.attributes?.minWidth === true,
          isMinWidthIndicator: tab?.attributes?.isMinWidthIndicator === true,
          isFadingIndicator: tab?.attributes?.isFadingIndicator === true,
        }),
        styles: cleanEditorObject(tab?.styles ?? {}),
        card: normalizeEditorCard(tab?.card),
      }))
    : TabbedCardV2.getStubConfig().tabs;

  return {
    type: "custom:tabbed-card-v2",
    options: {
      defaultTabIndex: clampIndex(source.options?.defaultTabIndex ?? 0, tabs.length),
    },
    styles: cleanEditorObject(source.styles ?? {}),
    attributes: cleanEditorObject(source.attributes ?? {}),
    tabs,
  };
}

function renderEditorCardTypeOptions(selectedType) {
  return editorCardGroups.map(group => `
    <optgroup label="${escapeAttribute(group.label)}">
      ${group.cards.map(type => `
        <option value="${escapeAttribute(type)}" ${selectedType === type ? "selected" : ""}>${escapeHtml(type)}</option>
      `).join("")}
    </optgroup>
  `).join("");
}

function serializeEditorCards(cards) {
  if (!Array.isArray(cards)) {
    return "";
  }
  return cards.map(card => {
    if (!card || typeof card !== "object") {
      return "";
    }
    const type = card.type ?? "entity";
    const entity = card.entity ?? editorEntityLines(card.entities);
    const title = card.title ?? card.name ?? "";
    return [type, entity, title].filter(value => String(value ?? "").trim()).join(" | ");
  }).filter(Boolean).join("\n");
}

function editorCardsFromNestedTabs(tabs) {
  if (!Array.isArray(tabs)) {
    return [];
  }
  return tabs.map(tab => cleanEditorObject({
    ...(tab?.card ?? {}),
    title: tab?.card?.title ?? tab?.card?.name ?? tab?.attributes?.label,
  }));
}

function parseEditorCards(value) {
  return String(value ?? "")
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(Boolean)
    .map(line => {
      if (line.startsWith("{")) {
        try {
          return normalizeEditorCard(JSON.parse(line));
        } catch {
          return undefined;
        }
      }
      const [typeValue, entityValue, titleValue] = line.split("|").map(part => part.trim());
      return normalizeEditorCard(cleanEditorObject({
        type: typeValue || "entity",
        entity: entityValue && !entityValue.includes(",") ? entityValue : undefined,
        entities: entityValue?.includes(",") ? entityValue.split(",").map(entity => entity.trim()).filter(Boolean) : undefined,
        title: titleValue,
      }));
    })
    .filter(Boolean);
}

function normalizeEditorCard(card = {}) {
  const nextCard = {
    ...card,
    type: typeof card.type === "string" ? card.type : "entity",
  };
  if (editorEntitiesCardTypes.has(nextCard.type) && !Array.isArray(nextCard.entities)) {
    nextCard.entities = nextCard.entity ? [nextCard.entity] : ["sun.sun"];
    delete nextCard.entity;
  }
  if (!editorEntitiesCardTypes.has(nextCard.type)) {
    delete nextCard.entities;
  }
  if (editorEntityCardTypes.has(nextCard.type) && !nextCard.entity) {
    nextCard.entity = "sun.sun";
  }
  if (!editorEntityCardTypes.has(nextCard.type)) {
    delete nextCard.entity;
  }
  if (editorLayoutCardTypes.has(nextCard.type) && !Array.isArray(nextCard.cards)) {
    nextCard.cards = [{ type: "entity", entity: "sun.sun" }];
  }
  if (!editorLayoutCardTypes.has(nextCard.type)) {
    delete nextCard.cards;
  }
  if (editorNestedTabbedCardTypes.has(nextCard.type)) {
    nextCard.tabs = Array.isArray(nextCard.tabs) && nextCard.tabs.length
      ? nextCard.tabs.map((tab, index) => ({
          attributes: cleanEditorObject({
            label: tab?.attributes?.label ?? tab?.card?.title ?? tab?.card?.name ?? `Tab ${index + 1}`,
            icon: tab?.attributes?.icon ?? "",
          }),
          card: normalizeEditorCard(tab?.card ?? { type: "entity", entity: "sun.sun" }),
        }))
      : [
          {
            attributes: { label: "Tab 1" },
            card: { type: "entity", entity: "sun.sun" },
          },
        ];
  } else {
    delete nextCard.tabs;
  }
  if (nextCard.type === "conditional") {
    nextCard.conditions = Array.isArray(nextCard.conditions) && nextCard.conditions.length
      ? nextCard.conditions
      : [{ condition: "state", entity: "sun.sun", state: "above_horizon" }];
    nextCard.card = nextCard.card ?? { type: "entity", entity: "sun.sun" };
  } else {
    delete nextCard.conditions;
    delete nextCard.card;
  }
  if (nextCard.type === "markdown" && !nextCard.content) {
    nextCard.content = "## Status\nAlles im Blick.";
  }
  if (nextCard.type !== "markdown") {
    delete nextCard.content;
  }
  if (!editorPictureCardTypes.has(nextCard.type)) {
    delete nextCard.image;
    delete nextCard.camera_image;
  }
  if (nextCard.type === "gauge") {
    nextCard.min = Number.isFinite(Number(nextCard.min)) ? Number(nextCard.min) : 0;
    nextCard.max = Number.isFinite(Number(nextCard.max)) ? Number(nextCard.max) : 100;
  } else {
    delete nextCard.min;
    delete nextCard.max;
  }
  if (nextCard.type === "custom:bubble-card" && !nextCard.button_type) {
    nextCard.button_type = "state";
  } else if (nextCard.type !== "custom:bubble-card") {
    delete nextCard.button_type;
  }
  if (!["history-graph", "statistics-graph", "custom:mini-graph-card"].includes(nextCard.type)) {
    delete nextCard.hours_to_show;
  } else if (nextCard.hours_to_show !== undefined) {
    nextCard.hours_to_show = Number(nextCard.hours_to_show);
  }
  if (!editorDisplayToggleCardTypes.has(nextCard.type)) {
    delete nextCard.show_name;
    delete nextCard.show_icon;
    delete nextCard.show_state;
  }
  return cleanEditorObject(nextCard);
}

function cleanEditorConfig(config) {
  return cleanEditorObject({
    ...config,
    options: cleanEditorObject(config.options ?? {}),
    styles: cleanEditorObject(config.styles ?? {}),
    attributes: cleanEditorObject(config.attributes ?? {}),
    tabs: config.tabs.map(tab => cleanEditorObject({
      attributes: cleanEditorObject(tab.attributes ?? {}),
      styles: cleanEditorObject(tab.styles ?? {}),
      card: normalizeEditorCard(tab.card ?? {}),
    })),
  });
}

function cleanEditorObject(object) {
  return Object.fromEntries(Object.entries(object)
    .filter(([key, value]) => value !== undefined && value !== "" && (value !== false || ["show_name", "show_icon", "show_state", "square"].includes(key)))
    .map(([key, value]) => [key, value && typeof value === "object" && !Array.isArray(value) ? cleanEditorObject(value) : value])
    .filter(([, value]) => !(value && typeof value === "object" && !Array.isArray(value) && Object.keys(value).length === 0)));
}

function listEditorEntities(hass) {
  return Object.keys(hass?.states ?? {}).sort((left, right) => left.localeCompare(right));
}

function editorEntityLines(entities) {
  if (!Array.isArray(entities)) {
    return "";
  }
  return entities.map(entity => typeof entity === "string" ? entity : entity?.entity).filter(Boolean).join("\n");
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll("'", "&#39;");
}

function escapeTextarea(value) {
  return escapeHtml(value);
}

function mapKnownStyles(styles) {
  return {
    ...(styles["--mdc-theme-primary"] ? { "--tabbed-card-v2-active-color": styles["--mdc-theme-primary"] } : {}),
    ...(styles["--mdc-tab-text-label-color-default"] ? { "--tabbed-card-v2-inactive-color": styles["--mdc-tab-text-label-color-default"] } : {}),
    ...(styles["--mdc-typography-button-font-size"] ? { "--tabbed-card-v2-font-size": styles["--mdc-typography-button-font-size"] } : {}),
  };
}

function clampIndex(value, length) {
  return Math.max(0, Math.min(Number(value) || 0, Math.max(0, length - 1)));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

customElements.define("tabbed-card-v2", TabbedCardV2);
customElements.define("tabbed-card-v2-editor", TabbedCardV2Editor);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "tabbed-card-v2",
  name: "Tabbed Card V2",
  description: "A tabbed Home Assistant card with a standalone visual editor.",
});
