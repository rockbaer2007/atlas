# Home Assistant Integration

ATLAS provides a focused Home Assistant integration package through
`@atlas/homeassistant`. The package currently covers themed status panels,
entity state handling, runtime connection helpers, service calls and Home
Assistant card export/import utilities.

## Current Scope

- Status panel rendering through the ATLAS Renderer and Theme path.
- Local and live entity state handling.
- Home Assistant WebSocket lifecycle and reconnect-aware demo usage.
- Entity list loading through `get_states`.
- Lovelace resource loading through `lovelace/resources`.
- Card targets for built-in Entities, Mushroom template and Bubble Card.
- Simple, horizontal-stack and vertical-stack layouts for Mushroom and Bubble
  exports.
- JSON/YAML card export, card packages and import summaries.

## Card Targets

| Target | Home Assistant type | Dependency |
| --- | --- | --- |
| Entities | `entities` | Built in |
| Mushroom template | `custom:mushroom-template-card` | Mushroom |
| Bubble button | `custom:bubble-card` | Bubble Card |

Bubble Card uses the case-sensitive HACS resource path:

```text
/hacsfiles/Bubble-Card/bubble-card.js
```

Linux-based Home Assistant installations treat the path case sensitively. The
demo and package metadata intentionally preserve `Bubble-Card`.

## Export Model

ATLAS separates card export into three layers:

1. Card configuration: the Home Assistant card object.
2. Export manifest: filename, format, MIME type, target, layout and dependency.
3. Export payload: manifest plus serialized JSON or YAML content.

The status demo uses the same payload for copy and download so both workflows
stay consistent.

## Atlas Card Packages

For editor round-trips, ATLAS can export a portable JSON package:

```json
{
  "version": 1,
  "kind": "atlas.homeassistant.card",
  "manifest": {
    "name": "Office Light",
    "filename": "office-light-bubble-single.yaml",
    "format": "yaml",
    "mimeType": "text/yaml",
    "target": "bubble",
    "layout": "single"
  },
  "content": "type: \"custom:bubble-card\"\n..."
}
```

Package files use the `.atlas-card.json` suffix in the demo. The same import
control accepts raw Home Assistant card JSON, raw YAML and Atlas card packages.

## Import Model

Imports are normalized into a summary:

- card configuration
- title
- entity IDs
- format
- target
- layout
- dependency
- whether the source was an Atlas card package

This keeps editor UI logic out of the demo and inside the Home Assistant
package API.

## Lovelace Resource Checks

When connected to Home Assistant, the demo can request Lovelace resources and
compare them with the selected card target dependency.

The dependency status can be:

- `not-required` for built-in Entities cards
- `unchecked` before a Lovelace resource request has completed
- `installed` when the expected resource path is present
- `missing` when the expected resource path is not present

## Demo

Run the status demo after building the workspace:

```sh
pnpm build
node examples/status-demo/server.mjs
```

Open:

```text
http://127.0.0.1:4173/
```

When using the Codex workspace demo server override, the current local demo may
run on:

```text
http://127.0.0.1:4174/
```

## Roadmap Notes

The Home Assistant roadmap keeps two deployment modes in view:

- self-hosted ATLAS server/editor
- Home Assistant frontend integration, including a future HACS-installable path

The current card package model is a stepping stone toward that future HACS and
in-Home-Assistant editor workflow.
