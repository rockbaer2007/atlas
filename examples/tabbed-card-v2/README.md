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

Then create a manual card. Home Assistant will open the built-in editor, or you can paste YAML like this:

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

Home Assistant also shows a built-in visual editor for this card. It supports creating, selecting, reordering and deleting tabs, editing tab labels/icons/options, selecting entities from the current Home Assistant state list, and changing common card options.

Built-in editor card choices:

- Core: `entity`, `entities`, `button`, `tile`, `sensor`, `gauge`, `markdown`, `glance`, `history-graph`, `statistics-graph`, `thermostat`, `weather-forecast`, `picture`, `picture-entity`, `picture-elements`, `media-control`, `alarm-panel`, `map`, `logbook`
- Layout: `vertical-stack`, `horizontal-stack`, `grid`, `conditional`, `custom:tabbed-card-v2`
- Community / HACS: `custom:bubble-card`, `custom:mushroom-entity-card`, `custom:mushroom-template-card`, `custom:mushroom-chips-card`, `custom:mushroom-light-card`, `custom:mushroom-cover-card`, `custom:mushroom-climate-card`, `custom:mini-graph-card`, `custom:apexcharts-card`, `custom:button-card`, `custom:layout-card`

Layout and conditional cards can be edited with simple child-card lines in the form `type | entity | title`. Community cards show the required HACS resource path in the editor.
