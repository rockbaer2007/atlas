# Tabbed Card V2 App

Tabbed Card V2 App is a Home Assistant integration that adds a sidebar editor panel for building `custom:tabbed-card-v2` Lovelace YAML.

## HACS

Add this repository as a HACS custom repository with category `Integration`.

After installation:

1. Restart Home Assistant.
2. Open **Settings > Devices & services**.
3. Add or enable **Tabbed Card V2 App** if Home Assistant asks for setup.
4. Open **Tabbed Card V2** in the sidebar.

The integration also serves the card module from:

```yaml
url: /tabbed_card_v2/frontend/tabbed-card-v2.js
type: module
```

## Current scope

- Sidebar editor panel
- Tab create, edit, reorder and delete
- Simple entity, entities, button, markdown, Bubble and Mushroom card presets
- YAML copy/export workflow

Saving directly into a Lovelace dashboard is planned for a later step.
