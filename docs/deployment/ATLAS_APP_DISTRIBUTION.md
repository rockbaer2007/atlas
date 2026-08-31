# ATLAS App Distribution

ATLAS ships the Administration surface and the Home Assistant Card Editor as
one local app runtime first. The same runtime is the source for later packaged
targets instead of maintaining separate implementations per platform.

## Current Runtime

Run the local app preview with:

```sh
pnpm build
pnpm start:app
```

The app server starts both browser surfaces and exposes these endpoints:

| Endpoint | Default URL | Purpose |
| --- | --- | --- |
| App runtime | `http://127.0.0.1:4176/app` | Runtime metadata, surface links, ports and distribution order. |
| Health | `http://127.0.0.1:4176/health` | Machine-readable readiness for Docker, Home Assistant App/Add-on and Linux service checks. |
| Administration | `http://127.0.0.1:4175/` | Plugin management, Home Assistant connection settings and provider configuration. |
| Card Editor | `http://127.0.0.1:4174/` | The Home Assistant card editor reference plugin. |

The Administration page also reads `/app` and renders the runtime status for
manual preview checks.

## Distribution Order

1. Standalone Docker container
2. Home Assistant App/Add-on package derived from the same container/runtime
3. Linux VM/LXC/bare-Linux installer with a systemd service
4. Native Home Assistant/HACS frontend integration

The standalone Docker path proves the runtime, ports, health check and instance
identity rules in an isolated environment. The local image now builds and the
Compose service reports healthy when `/health` is ready. The Home Assistant
App/Add-on should reuse that container contract. The Linux installer should run
the same `scripts/atlas-app-server.mjs` entrypoint behind a service manager.

## Home Assistant App/Add-on Preview

The first Home Assistant App/Add-on scaffold lives in
`packaging/home-assistant-app/atlas`. It follows the Home Assistant app layout
with `config.yaml`, `Dockerfile`, `run.sh`, user docs, changelog and
translations.
The scaffold builds a local preview image from the same ATLAS runtime and sets
`ATLAS_DISTRIBUTION_TARGET=home-assistant-app-preview`, so `/app` can
distinguish it from the standalone Docker preview.

Prepare a local Home Assistant test copy with:

```sh
pnpm ha:app:prepare
```

The command writes `output/home-assistant-app/atlas`. Copy that `atlas` folder
to a Home Assistant `/addons` directory for local app testing, then refresh the
App/Add-on store. The generated output contains the scaffold plus the ATLAS
source files needed by the package Dockerfile.

## Runtime Configuration

| Variable | Default | Notes |
| --- | --- | --- |
| `ATLAS_HOST` | `127.0.0.1` locally, `0.0.0.0` in Docker | Shared bind host for the app surfaces. |
| `ATLAS_APP_HOST` | `ATLAS_HOST` or `127.0.0.1` | Bind host for the app status server. |
| `ATLAS_APP_PORT` | `4176` | App runtime and health endpoints. |
| `ATLAS_ADMIN_PORT` | `4175` | Administration surface. |
| `ATLAS_DEMO_PORT` | `4174` | Home Assistant Card Editor surface. |
| `ATLAS_DISTRIBUTION_TARGET` | `standalone-docker-preview`, `home-assistant-app-preview` in the App/Add-on scaffold | Runtime target reported by `/app`. |
| `ATLAS_INSTANCE_ID` | generated outside the repo | Optional stable identity pin for Docker/server deployments. |

`ATLAS_INSTANCE_ID` should be set deliberately when encrypted Administration
secrets must survive container recreation or server service restarts. If the
identity changes, encrypted secrets from another installation are treated as
invalid unless a future migration/passphrase flow is added.

## Packaging Contract

Packaged targets should preserve these boundaries:

- Home Assistant tokens and provider API keys stay in Atlas Administration.
- The Card Editor receives only a session handoff and key-configured flags.
- Plugins receive approved URLs, resource paths and declared capabilities, not
  raw secrets.
- `/health` is the readiness check for package supervisors.
- `/app` is the human and automation preview for links, ports and target order.
- The Card Editor remains the first official ATLAS reference plugin.

## Verification Notes

Use these checks before publishing a package preview:

```sh
pnpm build
pnpm start:app
```

Then verify:

- `GET /health` returns `status: "ok"`.
- `GET /app` shows Administration and Card Editor with `ready: true`.
- The Administration runtime panel shows both surfaces as ready.
- No Home Assistant token or provider API key appears in `/app`, `/health`,
  plugin descriptors or Card Editor handoff storage.

Docker verification uses `pnpm docker:build`, `docker compose up -d --build`
and the container health state.
