# Tabbed Card V2 App

[![HACS Custom](https://img.shields.io/badge/HACS-Custom-orange.svg?style=for-the-badge)](https://github.com/hacs/integration)

[![Open your Home Assistant instance and add this repository to HACS.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=rockbaer2007&repository=tabbed-card-v2-app&category=integration)

Tabbed Card V2 App is a Home Assistant integration that adds a sidebar editor panel for building `custom:tabbed-card-v2` Lovelace YAML.

## HACS

Add this repository as a HACS custom repository with category `Integration`.

After installation:

1. Restart Home Assistant.
2. Open **Settings > Devices & services**.
3. Add **Tabbed Card V2 App**.
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
