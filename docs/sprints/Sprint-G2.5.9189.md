# Sprint G2.5.9189

## Goal

Make the ATLAS repository entry point visually distinct and ready for the
future hosted repository install page.

## Changes

- Replaced the plain `Add ATLAS repository` action with an ATLAS-branded
  capsule button.
- Added teal/cyan button styling with an orange ATLAS accent and inline logo
  mark.
- Kept the button connected to the existing custom repository dialog.
- Bumped the Home Assistant App/Add-on preview package to `0.1.26`.

## Verification

- `node --check examples/admin-demo/app.js`
- `pnpm build`
- `pnpm --filter @atlas/homeassistant test`
- `git diff --check -- examples/admin-demo/index.html packaging/home-assistant-app/atlas/config.yaml packaging/home-assistant-app/atlas/CHANGELOG.md docs/sprints/Sprint-G2.5.9189.md`
- `pnpm ha:app:prepare`
- Confirmed prepared Home Assistant App/Add-on `config.yaml` version is
  `0.1.26`.
- Confirmed prepared Administration output contains the ATLAS repository button
  and inline logo mark.
- `docker build -t atlas-ha-app:0.1.26 output/home-assistant-app/atlas`
