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
`.atlas-plugin.json` package descriptor. Home Assistant tokens are stored only
in the admin page when the local remember option is selected or when Save
settings is used with a token in the field. The Card Editor receives the token
only through `postMessage` for the active browser session.
When the Auto-connect option is enabled, the editor connects immediately after
receiving the admin handoff.
Plugins receive only approved context such as URLs, WebSocket paths, resource
paths and declared capabilities.
