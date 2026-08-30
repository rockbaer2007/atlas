# Tabbed Card V2 Editor

Private/internal Home Assistant sidebar integration prototype for Tabbed Card V2.

The public direction is now:

- `tabbed-card-v2`: public HACS Lovelace card.
- `tabbed-card-v2-editor`: standalone visual editor app.

This integration target remains in Atlas as an internal test bed only.

## Internal HACS Test

Add this repository as a HACS custom repository with category `Integration`.

After installation:

1. Restart Home Assistant.
2. Open **Settings > Devices & services**.
3. Add **Tabbed Card V2 Editor**.
4. Open **Tabbed Card V2** in the sidebar.

The sidebar entry is enabled automatically after setup. You can change it later in the integration options:

- `Show in sidebar`
- `Show HACS update hint in the editor`

Repository auto-updates are controlled by HACS itself. Open this repository in HACS and enable auto-update there if you want new releases to install automatically.

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
