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
    const entities = listEditorEntities(this._hass);

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
                ${["entity", "button", "entities", "sensor", "markdown", "custom:bubble-card", "custom:mushroom-entity-card"].map(type => `
                  <option value="${type}" ${card.type === type ? "selected" : ""}>${type}</option>
                `).join("")}
              </select>
            </div>
            <div class="field">
              <label for="card-title">Titel</label>
              <input id="card-title" data-card="title" value="${escapeAttribute(card.title ?? card.name ?? "")}">
            </div>
            <div class="field full">
              <label for="card-entity">Entity</label>
              <input id="card-entity" data-card="entity" list="tabbed-card-v2-entities" value="${escapeAttribute(card.entity ?? "")}" placeholder="light.bed_light">
              <datalist id="tabbed-card-v2-entities">
                ${entities.map(entityId => `<option value="${escapeAttribute(entityId)}"></option>`).join("")}
              </datalist>
            </div>
            <div class="field full">
              <label for="card-entities">Entities-Liste</label>
              <textarea id="card-entities" data-card="entities" placeholder="sensor.temperature&#10;binary_sensor.motion">${escapeTextarea(editorEntityLines(card.entities))}</textarea>
            </div>
            <div class="field">
              <label for="tap-action">Tap Action</label>
              <select id="tap-action" data-card="tap_action">
                ${["", "toggle", "more-info", "navigate"].map(action => `
                  <option value="${action}" ${(card.tap_action?.action ?? "") === action ? "selected" : ""}>${action || "Keine"}</option>
                `).join("")}
              </select>
            </div>
            <div class="field">
              <label for="bubble-type">Bubble Button</label>
              <select id="bubble-type" data-card="button_type">
                ${["state", "switch", "slider", "name"].map(type => `
                  <option value="${type}" ${(card.button_type ?? "state") === type ? "selected" : ""}>${type}</option>
                `).join("")}
              </select>
            </div>
          </div>
          <div class="checks">
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
    if (key === "tap_action") {
      if (input.value) {
        nextCard.tap_action = { action: input.value };
      } else {
        delete nextCard.tap_action;
      }
      return nextCard;
    }
    if (key === "entities") {
      const entities = input.value.split(/\r?\n|,/).map(value => value.trim()).filter(Boolean);
      if (entities.length) {
        nextCard.entities = entities;
      } else {
        delete nextCard.entities;
      }
      return nextCard;
    }
    if (input.type === "checkbox") {
      nextCard[key] = input.checked;
      return nextCard;
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

function normalizeEditorCard(card = {}) {
  const nextCard = {
    ...card,
    type: typeof card.type === "string" ? card.type : "entity",
  };
  if (nextCard.type === "entities" && !Array.isArray(nextCard.entities)) {
    nextCard.entities = nextCard.entity ? [nextCard.entity] : ["sun.sun"];
    delete nextCard.entity;
  }
  if (nextCard.type !== "entities") {
    delete nextCard.entities;
  }
  if (nextCard.type === "custom:bubble-card" && !nextCard.button_type) {
    nextCard.button_type = "state";
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
    .filter(([key, value]) => value !== undefined && value !== "" && (value !== false || ["show_name", "show_icon", "show_state"].includes(key)))
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
