# Tabbed Card V2 Visual Editor

Standalone visual editor demo for the Home Assistant `custom:tabbed-card-v2` configuration.

Run locally:

```powershell
node examples/tabbed-card-v2/server.mjs
```

Open:

```text
http://127.0.0.1:4176/
```

The standalone editor is intentionally independent from ATLAS internals. It generates a plain Home Assistant Lovelace YAML card using the `custom:tabbed-card-v2` schema.

## Test in Home Assistant

Copy this file into your Home Assistant config:

```text
examples/tabbed-card-v2/home-assistant/tabbed-card-v2.js
```

Recommended target path:

```text
/config/www/tabbed-card-v2.js
```

Add this Lovelace resource:

```yaml
url: /local/tabbed-card-v2.js
type: module
```

Then create a manual card. The Home Assistant editor shows a compact pointer to the standalone editor app and keeps YAML editing available through Home Assistant's code editor. You can paste YAML like this:

```yaml
type: custom:tabbed-card-v2
options:
  defaultTabIndex: 0
tabs:
  - attributes:
      label: Light
      icon: mdi:lightbulb
    card:
      type: button
      entity: light.bed_light
      tap_action:
        action: toggle
      show_name: true
      show_icon: true
      show_state: true
  - attributes:
      label: Sensors
      icon: mdi:thermometer
    card:
      type: entities
      title: Room climate
      entities:
        - sensor.living_room_temperature
        - sensor.living_room_humidity
```

The built-in Home Assistant editor is intentionally small. The full visual editor is delivered as a standalone app so complex tab layouts, nested cards, previews, imports and dependency checks do not overload the Lovelace card dialog.

## HACS package targets

This demo contains the public HACS card target and a private/internal Home Assistant integration prototype:

- `hacs-card/`: Lovelace card package for HACS category `Dashboard`.
- `hacs-app/`: private/internal Home Assistant sidebar integration prototype.

The standalone editor app is published separately as `tabbed-card-v2-editor`.
