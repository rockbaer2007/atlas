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

Set an Entity ID before connecting. Once the event subscription is active, the
panel listens only to that live entity. Numeric and other available sensor
values render as ready; `off` remains pending, while unavailable or unknown
entities render as blocked.
