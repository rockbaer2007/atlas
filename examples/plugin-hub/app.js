const pluginGrid = document.querySelector("#plugin-grid");
const pluginSummary = document.querySelector("#plugin-summary");

loadPlugins();

async function loadPlugins() {
  try {
    const response = await fetch("/api/plugins", { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Plugin catalog returned HTTP ${response.status}.`);
    }
    const catalog = await response.json();
    renderPlugins(Array.isArray(catalog.plugins) ? catalog.plugins : []);
  } catch (error) {
    pluginSummary.textContent = "Plugin catalog unavailable.";
    pluginGrid.innerHTML = "";
    const message = document.createElement("p");
    message.className = "plugin-description";
    message.textContent = error instanceof Error ? error.message : "Unknown plugin catalog error.";
    pluginGrid.append(message);
  }
}

function renderPlugins(plugins) {
  pluginSummary.textContent = `${plugins.length} plugins detected`;
  pluginGrid.innerHTML = "";
  for (const plugin of plugins) {
    pluginGrid.append(createPluginCard(plugin));
  }
}

function createPluginCard(plugin) {
  const card = document.createElement("article");
  card.className = "plugin-card";

  const preview = document.createElement("img");
  preview.className = "plugin-preview";
  preview.src = plugin.previewUrl || plugin.iconUrl;
  preview.alt = `${plugin.name} preview`;
  card.append(preview);

  const body = document.createElement("div");
  body.className = "plugin-body";

  const titleRow = document.createElement("div");
  titleRow.className = "plugin-title-row";

  const icon = document.createElement("img");
  icon.className = "plugin-icon";
  icon.src = plugin.iconUrl;
  icon.alt = "";

  const title = document.createElement("div");
  const name = document.createElement("h2");
  name.className = "plugin-name";
  name.textContent = plugin.name;
  const version = document.createElement("div");
  version.className = "plugin-version";
  version.textContent = plugin.version;
  title.append(name, version);

  const status = document.createElement("span");
  status.className = "plugin-status";
  status.dataset.status = plugin.status;
  status.textContent = plugin.status;

  titleRow.append(icon, title, status);
  body.append(titleRow);

  const description = document.createElement("p");
  description.className = "plugin-description";
  description.textContent = plugin.description;
  body.append(description);

  const capabilities = document.createElement("div");
  capabilities.className = "capability-list";
  for (const capability of plugin.capabilities ?? []) {
    const tag = document.createElement("span");
    tag.textContent = capability;
    capabilities.append(tag);
  }
  body.append(capabilities);

  const action = document.createElement("a");
  action.className = "plugin-action";
  action.textContent = plugin.entryUrl ? "Open" : "Planned";
  if (plugin.entryUrl) {
    action.href = plugin.entryUrl;
  } else {
    action.href = "#";
    action.setAttribute("aria-disabled", "true");
    action.addEventListener("click", event => event.preventDefault());
  }
  body.append(action);

  card.append(body);
  return card;
}
