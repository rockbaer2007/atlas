# ATLAS Status Demo

The demo renders the active Renderer and Theme integration in a browser.

Run `pnpm build`, then start it with:

```sh
node examples/status-demo/server.mjs
```

Open `http://127.0.0.1:4173/` and use the status controls to verify that each
selection replaces the current surface output while retaining the theme tokens.

The Home Assistant controls validate a connection target, show the derived
WebSocket endpoint and can connect to an instance. The supplied access token is
cleared from the form immediately after starting the connection and is not
stored or logged by the demo.

Enter one or more comma-separated Entity IDs before connecting. Once the event
subscription is active, the primary entity drives the status panel and the list
shows updates for all selected entities. Numeric and other available sensor
values render as ready; `off` remains pending, while unavailable or unknown
entities render as blocked.

For a live `light` or `switch` entity, its card offers a single confirmed
turn-on or turn-off action. Commands are unavailable until the subscription is
active and are not available for other entity domains.

The URL and selected entities are stored only in this browser. Access tokens are
never stored. After an unexpected socket close, the open page retries up to
three times with its in-memory token; a manual disconnect stops retries.

The panel-group selector provides quick entity sets for overview, energy and
safety. Selecting a group only updates the local entity list.

The same group selection also renders a Home Assistant `entities` card preview
and can copy or export that card as JSON or YAML for use in Home Assistant
dashboards.
Simple Home Assistant `entities` card JSON can be imported back into the demo
as a new panel group.
