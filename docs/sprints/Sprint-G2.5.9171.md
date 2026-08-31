# Sprint G2.5.9171

## Goal

Shape the ATLAS plugin repository workflow closer to the Home Assistant/HACS
custom repository experience and keep dark design work visible on the roadmap.

## Changes

- Replaced the single Administration repository preview with a managed custom
  repository list.
- Added repository type selection for plugin, card, integration, tool and theme
  sources.
- Added add, refresh and remove controls for repository entries.
- Preserved repository plugin preview as a separate installable-candidate list.
- Migrated older single repository URL storage into the new repository list.
- Documented the dark ATLAS design requirement for Administration, Hub and
  plugin surfaces.
- Bumped the Home Assistant App/Add-on package version to `0.1.11`.

## Verification

- `node --check examples/admin-demo/app.js`
- `pnpm ha:app:prepare`
- Local app smoke test on test ports: `/health`, Administration and
  `/api/plugins`
- `docker build -t atlas-ha-app:0.1.11 output/home-assistant-app/atlas`
- Container smoke test on test ports: `/health`, Administration and
  `/api/plugins`
- `git diff --check`
