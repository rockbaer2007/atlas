# @atlas/homeassistant

Home Assistant status panel integration for the ATLAS Framework.

---

# Status

Active status panel integration package.

The package provides a first themed status panel through the active Renderer and
Theme surface path. It intentionally excludes websocket clients, entity access,
service calls and general card infrastructure.

The package root exports the status panel contract and renderer-backed panel
execution only. Its dependency direction runs through Theme rather than a direct
Renderer dependency.

Local entity state contracts map `on`, `off`, `unavailable` and `unknown` into
the panel states. Status panels can be collected in a registry, and connection
configuration is validated without opening a network connection.

An in-memory entity transport supports local publishing and panel subscriptions.
The same contract will be implemented by a future authenticated WebSocket
transport; configuration can already derive its eventual `/api/websocket` URL.

The current WebSocket client is fully testable through an injected socket. It
models authentication, event subscription, state changes and lifecycle states,
but it does not open a network connection or persist access tokens.

A browser-compatible socket adapter and runtime connection controller are ready
for a future instance. Tokens are supplied per connect or reconnect call and
are not retained by the controller.

The integration boundary remains intentionally narrow: status panels can mount
to a configured DOM-compatible surface, while all runtime and Home Assistant
transport concerns remain outside the package.

Concrete Home Assistant websocket clients, entity abstraction, service calls and
general card infrastructure remain planned future work.

---

# Build Output

Compiled artifacts are emitted to `dist`.

Source files remain under `src`.
