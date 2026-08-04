# ATLAS Administration Demo

The administration demo is the first separate management surface for ATLAS
plugins and central Home Assistant connection settings.

Run `pnpm build`, then start it with:

```sh
node examples/admin-demo/server.mjs
```

Open `http://127.0.0.1:4175/`.

The Home Assistant Card Editor demo remains separate on
`http://127.0.0.1:4174/`.

The admin surface currently shows the Home Assistant Card Editor as the first
reference plugin, renders Runtime plugin status and capabilities, opens the Card
Editor with a browser-session handoff, and exports the generated
`.atlas-plugin.json` package descriptor. It can also import `.atlas-plugin.json`
packages back into the local administration list as validated descriptors. The
import path does not execute plugin code; it only reads package metadata so the
plugin can be inspected, activated in the demo state, exported again or removed
from the local import list.
Plugin activation state is also stored locally so the demo administration view
survives reloads without turning imported plugins back into a fresh list.

Home Assistant tokens are stored only in the admin page when the local remember
option is selected or when Save settings is used with a token in the field. The
Card Editor receives the token only through `postMessage` for the active
browser session.
The local Administration server also exposes saved connection settings to the
Card Editor on port `4174`, so reloads and direct editor opens can recover the
handoff after `Save settings`.
When the Auto-connect option is enabled, the editor connects immediately after
receiving the admin handoff.
Plugins receive only approved context such as URLs, WebSocket paths, resource
paths and declared capabilities.
