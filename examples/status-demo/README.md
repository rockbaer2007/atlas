# ATLAS Status Demo

The demo renders the active Renderer and Theme integration in a browser.

Run `pnpm build`, then start it with:

```sh
node examples/status-demo/server.mjs
```

Open `http://127.0.0.1:4173/` and use the status controls to verify that each
selection replaces the current surface output while retaining the theme tokens.

The Home Assistant URL field validates a local connection target and shows the
derived WebSocket endpoint. It does not connect to an instance or request,
store or transmit an access token.
