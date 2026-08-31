# ATLAS Home Assistant App

This is the first Home Assistant App/Add-on packaging scaffold for ATLAS. It
wraps the same runtime used by the standalone Docker preview:

- ATLAS app runtime and health endpoint on port `4176`
- ATLAS Administration on port `4175`
- Home Assistant Card Editor reference plugin on port `4174`

Prepare a local test copy from the repository root:

```sh
pnpm ha:app:prepare
```

Copy `output/home-assistant-app/atlas` into the Home Assistant `/addons`
directory for local app testing, then refresh the App/Add-on store.

The package Dockerfile mirrors the verified standalone container path. For a
local smoke test, build the prepared app folder and check the runtime health
endpoint:

```sh
docker build -t atlas-home-assistant-app:local output/home-assistant-app/atlas
docker run --rm -p 4176:4176 -p 4175:4175 -p 4174:4174 atlas-home-assistant-app:local
```

Then open `http://127.0.0.1:4176/health` and confirm that Administration and
the Card Editor are ready.
