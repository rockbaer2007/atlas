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
states. Entity catalogs normalize known and live entity IDs into a sorted,
deduplicated list with domains, labels and searchable text so hosts can provide
the same entity picker behavior outside the demo. Basic Home Assistant card
configuration can be created for built-in Entities, Mushroom template and
Bubble button targets, serialized as JSON or YAML, parsed back into normalized
entity groups, and inspected for required frontend dependencies. Hosts can list
the supported card targets from the same package API they use for export and
import; dependency metadata includes expected HACS resource paths and can be
compared with Lovelace resources returned by Home Assistant. Card export
manifests provide stable filenames, formats, MIME types, target, layout and
dependency metadata for host UIs. Card export payloads pair that manifest
metadata with the serialized card content so copy and download flows can share
one source. Card packages wrap the manifest and content in a portable Atlas JSON
envelope for round-tripping through editor UIs. Lovelace resource references can
be derived from the selected card target and serialized as JSON or YAML, which
lets host UIs offer copy-ready HACS resource snippets for Mushroom and Bubble
Card. Card import summaries normalize raw card text or Atlas packages into
title, entity IDs, target, layout, format and dependency metadata. The WebSocket
client can request `get_states` and `lovelace/resources` as soon as
authentication succeeds, even while the live event subscription is still
pending. Lights can receive a validated brightness percentage from 1 through
100 when a host explicitly invokes the command.

Frontend integration plans describe the resource that makes ATLAS itself
available inside Home Assistant. Hosts can choose the current self-hosted server
mode, which defaults to `/local/atlas/atlas-homeassistant-panel.js`, or the
planned HACS mode at `/hacsfiles/atlas/atlas-homeassistant-panel.js`. The same
plan combines ATLAS frontend availability with the selected card dependency, so
a host can report whether ATLAS, Mushroom or Bubble Card resources are ready or
which Lovelace resource paths are still missing. Hosts can also serialize that
combined plan as JSON or YAML Lovelace resources, giving the UI one copy action
for ATLAS plus any selected Mushroom or Bubble Card dependency.

A first HACS card editor package plan is available for the later installable
custom card workflow. It describes a drag-and-drop layout editor, keeps the
visible card name separate from the generated JavaScript filename, normalizes
user-defined filenames such as `Energy Kitchen` to `energy-kitchen.js`, and
uses demo entities (`binary_sensor.atlas_status`, `sensor.atlas_temperature`)
with a clear replacement hint for Home Assistant users.

The card editor plan separates a simple mode from an expert mode. Simple mode
is intended for fast button stacks. Expert mode describes a free editor surface
where every positioned field can choose its own card target: built-in Entities,
Bubble Card or Mushroom template. The dependency plan can derive the actually
used card targets from the editor mode and fields, so mixed expert layouts can
produce one combined list of required HACS resources.

Editor plans can now also be projected into Home Assistant card configurations.
Simple mode creates the selected target from the plan entities. Expert mode
orders populated surface fields by row and column. Multiple fields on the same
row become a `horizontal-stack`; multiple rows become a wrapping
`vertical-stack`. A field can also be marked as its own `horizontal-stack` or
`vertical-stack`, so a selected surface area can contain several child entries.
Empty expert plans fall back to the safe demo entities, preserving a usable
export while the user still has to replace them with real Home Assistant
entities.

The expert editor model also exposes a sidebar template palette. Hosts can list
visual templates for entity lists, state buttons, switch buttons,
`vertical-stack` and `horizontal-stack` areas. A selected template can be
combined with a chosen card family, such as Bubble Card or Mushroom, and placed
inside a bounded editor grid. Placement is clamped to the configured grid so
fields cannot be dropped outside the valid surface.

The visual editor direction is informed by existing Home Assistant projects,
including `studiobts/home-assistant-card-builder`. That project is tracked as
an external AGPL-3.0 reference for inspiration, interoperability and possible
future fork evaluation. ATLAS does not copy its source code by default; any
future derivative use must keep attribution and satisfy the AGPL-3.0 license.
The current interoperability plan allows product-level reference and planned
schema-based import/export evaluation, while direct source copying is explicitly
blocked unless ATLAS intentionally accepts the derivative-work and AGPL-3.0
obligations.

Import flows can inspect artifacts before parsing. The inspection classifies
ATLAS card packages, raw Home Assistant card snippets, possible external
card-builder exports and unknown content. External card-builder-shaped files
are deliberately marked as requiring review until an explicit compatibility
mapping exists.
Hosts can turn that inspection into an import decision: supported artifacts can
continue directly, external card-builder-shaped files open a compatibility
review, and unknown content is rejected.
Compatibility reviews currently report the license boundary, detected visual
block count, detected entity-slot count and the next mapping step. This gives a
host UI enough information to show a review dialog before any external artifact
is converted into ATLAS fields.
Mapping previews can classify common external block types into ATLAS templates:
state-like blocks become state buttons, switch-like blocks become switch
buttons, and horizontal or vertical layout blocks become matching stack
templates. Unmapped blocks remain visible for manual review.
ATLAS can also preview editor fields from mapped external blocks. These fields
are placed onto the expert grid with empty entities and remain marked as
review-required, so a host can show the conversion result without silently
importing it.

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
