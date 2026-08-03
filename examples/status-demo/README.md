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
`light`, and quick buttons expose the common domains directly. The search field
narrows the filtered picker further by matching parts of the entity ID or
friendly name, with a visible result count or empty state. The primary entity
drives the status panel and the list shows updates for all selected entities.
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

When the demo is connected to Home Assistant, it requests Lovelace resources and
marks Mushroom or Bubble dependencies as found, missing or not yet checked. The
resource check can also be run manually from the card export controls. The
export manifest includes both the expected Lovelace resource and a HACS install
hint for custom cards. Mushroom uses `/hacsfiles/lovelace-mushroom/mushroom.js`.
Bubble Card uses the case-sensitive HACS resource path
`/hacsfiles/Bubble-Card/bubble-card.js`. Without an active connection, the
dependency line keeps showing these paths as installation hints. The resource
snippet can be copied as JSON or YAML through the same card format selector.

The visual status surface below the code block is an ATLAS status preview, not a
Home Assistant Lovelace renderer.
