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
reference plugin, renders Runtime plugin status and capabilities, and exports
the generated `.atlas-plugin.json` package descriptor. Home Assistant tokens are
stored only in the admin page when the local remember option is selected.
Plugins receive only approved context such as URLs, WebSocket paths, resource
paths and declared capabilities.
