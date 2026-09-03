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

## Bubble Card and Mushroom

Bubble Card and Mushroom can be used inside tabs because Tabbed Card V2 renders normal Home Assistant card configs.

Install the dependencies in Home Assistant before using these presets:

- Bubble Card: `type: custom:bubble-card` with `card_type: button`
- Mushroom Entity: `type: custom:mushroom-entity-card`

If the dependency is missing, Home Assistant will show a custom-element error for that nested card.

## Stack cards

Use `vertical-stack` or `horizontal-stack` when one tab should contain multiple cards.

In the editor, write one child card per line:

```text
entity | sensor.living_room_temperature | Temperature
custom:mushroom-entity-card | light.living_room | Living room
custom:bubble-card | switch.coffee_machine | Coffee machine
```

You can also use the child-card row below the list: choose the child card type, enter an entity and optional title, then click **Unterkarte hinzufügen**.

The export uses Home Assistant's normal stack syntax:

```yaml
card:
  type: vertical-stack
  cards:
    - type: entity
      entity: sensor.living_room_temperature
      title: Temperature
```

## Individual card export

The editor can export individual Home Assistant card files. Enter a suffix such as `wohnzimmer`; the generated card type becomes:

```yaml
type: custom:tabbed-card-v2-wohnzimmer
```

The matching JavaScript export is named:

```text
tabbed-card-v2-wohnzimmer.js
```

Add that file to Home Assistant as a Lovelace resource, for example:

```yaml
url: /local/tabbed-card-v2-wohnzimmer.js
type: module
```

## HACS package targets

This demo contains the public HACS card target and a private/internal Home Assistant integration prototype:

- `hacs-card/`: Lovelace card package for HACS category `Dashboard`.
- `hacs-app/`: private/internal Home Assistant sidebar integration prototype.

The standalone editor app is published separately as `tabbed-card-v2-editor`.
