# Sprint G2.5.9172

## Goal

Make the custom repository workflow feel closer to Home Assistant/HACS while
keeping it visually distinct as ATLAS.

## Changes

- Added an orange ATLAS "Add repository" action to Administration.
- Added an Atlas-hosted add-repository dialog with URL entry, source type
  selection, repository preview and final confirmation.
- Kept the managed repository list and installable repository plugin preview
  separated for clearer scanning.
- Applied the orange Atlas accent to future repository install actions.
- Documented the add-repository intermediate view in the roadmap and plugin
  specification.
- Bumped the Home Assistant App/Add-on package version to `0.1.12`.

## Verification

- `node --check examples/admin-demo/app.js`
- `pnpm ha:app:prepare`
- Local app smoke test on test ports: `/health`, Administration HTML and
  `/api/plugins`
- `docker build -t atlas-ha-app:0.1.12 output/home-assistant-app/atlas`
- Container smoke test on test ports: `/health`, Administration HTML and
  `/api/plugins`
- `git diff --check`
