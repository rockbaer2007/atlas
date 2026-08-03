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
cleared from the form immediately after starting the connection unless the
local remember option is selected. Remembered tokens stay in browser storage
only and are not logged by the demo.

Enter one or more comma-separated Entity IDs before connecting, or use the
domain-filtered entity picker to add known demo entities. Once a live event
subscription is active, the demo requests Home Assistant `get_states` and
populates the picker from the returned entity list. The type selector filters
the picker by entity domain, such as `sensor`, `binary_sensor`, `switch` or
`light`, and quick buttons expose the common domains directly. The picker is
backed by the shared `@atlas/homeassistant` entity catalog, so domain filtering,
deduplication, live labels and partial search can be reused by future hosts.
The search field narrows the filtered picker further by matching parts of the
entity ID or friendly name, with a visible result count or empty state. The
primary entity drives the status panel and the list shows updates for all
selected entities.
Numeric and other available sensor values render as ready; `off` remains
pending, while unavailable or unknown entities render as blocked.

For a live `light` or `switch` entity, its card offers a single confirmed
turn-on or turn-off action. Commands are unavailable until the subscription is
active and are not available for other entity domains.

The URL, selected entities and optional token preference are stored only in this
browser. After an unexpected socket close, the open page retries up to three
times with its in-memory token; a manual disconnect stops retries. A normal
browser close with code `1000` is shown as a regular ATLAS connection close
instead of a raw WebSocket code.

The panel-group selector provides quick entity sets for overview, energy and
safety. Selecting a group only updates the local entity list.

The same group selection also renders Home Assistant card code for built-in
Entities, Mushroom template or Bubble button targets. The preview can be copied
or exported as JSON or YAML for use in Home Assistant dashboards. Simple
Entities, Mushroom template and Bubble button card JSON or YAML can be imported
back into the demo as a new panel group through the shared import summary API.
HA card exports use target- and layout-specific filenames so the downloaded file
reflects whether it contains Entities, Mushroom or Bubble card code. Copy and
download use the same export payload and require at least one selected entity.
The card package export wraps the manifest and serialized card content in a
portable Atlas JSON envelope that can be imported back through the same HA card
import control.
When Expert mode is active, the simple card-layout selector and simple HA card
code block are hidden. Copy and export actions then use the Expert HA card code
generated from the editor surface.
Before the HA card import is parsed, the demo now runs the shared artifact
inspection. Supported ATLAS packages and raw Home Assistant cards continue
directly. External card-builder-shaped artifacts pause on a compatibility
review that shows license, block, entity-slot, mapping and field-preview
details. Unknown artifacts are rejected before parsing.

When the demo is connected to Home Assistant, it requests Lovelace resources and
marks Mushroom or Bubble dependencies as found, missing or not yet checked. The
resource check can also be run manually from the card export controls. The
export manifest includes both the expected Lovelace resource and a HACS install
hint for custom cards. Mushroom uses `/hacsfiles/lovelace-mushroom/mushroom.js`.
Bubble Card uses the case-sensitive HACS resource path
`/hacsfiles/Bubble-Card/bubble-card.js`. Without an active connection, the
dependency line keeps showing these paths as installation hints. The resource
snippet can be copied as JSON or YAML through the same card format selector.
It includes the ATLAS frontend resource and, when needed, the selected
Mushroom or Bubble Card dependency.

The visual status surface below the code block is an ATLAS status preview, not a
Home Assistant Lovelace renderer.

The demo also exposes the first Expert editor preview behind a Simple/Expert
mode switch. It renders the shared template palette as a left sidebar, lets a
host choose or drag a card template into the editor surface, places the field on
the bounded expert grid and renders the resulting nested Home Assistant card
code. Added fields are shown as movable tiles on the surface and are also listed
with a remove button so the preview can be adjusted without clearing the whole
surface. The surface now uses a larger visible 12-column Home Assistant-like
grid. Each sidebar template exposes its own column and row controls, including
`full` width and `auto` height. Entity List, State Button, Switch Button,
horizontal-stack and vertical-stack start from the same default footprint so
layout adjustments are predictable. The sidebar uses loaded Lovelace resources
to mark custom card families as installed, missing or unchecked. Surface tiles
can be selected and then switched into edit mode, where corner handles resize
the field inside the 12-column grid. This is still a preview surface, not the
final drag-and-drop editor.
Expert field titles are editable from the surface controls. The title is reused
as the generated Home Assistant card title, Bubble name or Mushroom primary
text. A manual apply button writes the edited title to the selected field, and
the current Home Assistant entity name can still be copied into the title field
as a starting point.
In Expert mode, selecting an entity from the picker or entity list assigns it to
the currently selected surface field and also prefills the field title from the
entity name.
Bubble fields expose a Bubble button type dropdown with the supported
`state`, `switch`, `slider` and `name` values. The selected type is written into
the generated Bubble Card configuration.
The left Expert palette now lists Core cards and Community cards. Individual
cards can be marked as favorites with a checkbox; when favorites exist, the
palette shows only those cards until the reset button restores the full list.
