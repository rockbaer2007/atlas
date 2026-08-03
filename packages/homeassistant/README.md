# @atlas/homeassistant

Home Assistant status panel integration for the ATLAS Framework.

---

# Status

Active status panel integration package.

The package provides a themed status panel through the active Renderer and Theme
surface path, plus narrow Home Assistant runtime helpers for entity state,
service calls, Lovelace resources and card configuration.

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
connection when explicitly used by a host application; it maps normal close
code `1000` to a user-facing ATLAS close message and never persists access
tokens.

The client can send explicit `turn_on` and `turn_off` requests only for `light`
and `switch` entities after a successful event subscription. Hosts remain
responsible for requiring a user confirmation before invoking these commands.
Service results are exposed to the host so a command can be reported as
completed or failed.

Reusable panel groups collect entity IDs under a stable title. Entity
presentations classify common temperature, power, battery, light and switch
states. Basic Home Assistant card configuration can be created for built-in
Entities, Mushroom template and Bubble button targets, serialized as JSON or
YAML, parsed back into normalized entity groups, and inspected for required
frontend dependencies. Hosts can list the supported card targets from the same
package API they use for export and import; dependency metadata includes
expected HACS resource paths and can be compared with Lovelace resources
returned by Home Assistant. Card export manifests provide stable filenames,
formats, MIME types, target, layout and dependency metadata for host UIs. Card
export payloads pair that manifest metadata with the serialized card content so
copy and download flows can share one source. Card packages wrap the manifest
and content in a portable Atlas JSON envelope for round-tripping through editor
UIs. Lovelace resource references can be derived from the selected card target
and serialized as JSON or YAML, which lets host UIs offer copy-ready HACS
resource snippets for Mushroom and Bubble Card. Card import summaries normalize
raw card text or Atlas packages into title, entity IDs, target, layout, format
and dependency metadata. The WebSocket client can request `get_states` and
`lovelace/resources` as soon as authentication succeeds, even while the live
event subscription is still pending. Lights can receive a validated brightness
percentage from 1 through 100 when a host explicitly invokes the command.

Frontend integration plans describe the resource that makes ATLAS itself
available inside Home Assistant. Hosts can choose the current self-hosted server
mode, which defaults to `/local/atlas/atlas-homeassistant-panel.js`, or the
planned HACS mode at `/hacsfiles/atlas/atlas-homeassistant-panel.js`. The same
plan combines ATLAS frontend availability with the selected card dependency, so
a host can report whether ATLAS, Mushroom or Bubble Card resources are ready or
which Lovelace resource paths are still missing. Hosts can also serialize that
combined plan as JSON or YAML Lovelace resources, giving the UI one copy action
for ATLAS plus any selected Mushroom or Bubble Card dependency.

A browser-compatible socket adapter and runtime connection controller are
available for an instance. Tokens are supplied per connect or reconnect call
and are not retained by the controller.

The integration boundary remains intentionally narrow: status panels can mount
to a configured DOM-compatible surface, while all runtime and Home Assistant
transport concerns remain outside the package.

Richer Home Assistant card infrastructure remains planned future work.

---

# Build Output

Compiled artifacts are emitted to `dist`.

Source files remain under `src`.
