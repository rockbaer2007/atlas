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

Local entity state contracts map `on`, `off`, available non-binary values,
`unavailable` and `unknown` into panel states. Status panels can be collected
in a registry. Entity updates preserve their display name, original value and
unit where Home Assistant provides them, and connection configuration is
validated without opening a network connection.

An in-memory entity transport supports local publishing and panel subscriptions.
The same contract will be implemented by a future authenticated WebSocket
transport; configuration can already derive its eventual `/api/websocket` URL.

The current WebSocket client is fully testable through an injected socket. It
models authentication, subscription confirmation or rejection, state changes,
close reasons and subscribable lifecycle states. The browser adapter can open a
connection when explicitly used by a host application; it never persists access
tokens.

The client can send explicit `turn_on` and `turn_off` requests only for `light`
and `switch` entities after a successful event subscription. Hosts remain
responsible for requiring a user confirmation before invoking these commands.
Service results are exposed to the host so a command can be reported as
completed or failed.

Reusable panel groups collect entity IDs under a stable title. Entity
presentations classify common temperature, power, battery, light and switch
states. Lights can receive a validated brightness percentage from 1 through 100
when a host explicitly invokes the command.

A browser-compatible socket adapter and runtime connection controller are
available for an instance. Tokens are supplied per connect or reconnect call
and are not retained by the controller.

The integration boundary remains intentionally narrow: status panels can mount
to a configured DOM-compatible surface, while all runtime and Home Assistant
transport concerns remain outside the package.

Concrete Home Assistant websocket clients, entity abstraction, service calls and
general card infrastructure remain planned future work.

---

# Build Output

Compiled artifacts are emitted to `dist`.

Source files remain under `src`.
