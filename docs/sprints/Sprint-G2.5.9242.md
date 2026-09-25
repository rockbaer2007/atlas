# Sprint G2.5.9242 - ATLAS Administration Plugin Generator

## Goal

Add a first guided UI for preparing a new ATLAS plugin package from its desired configuration.

## Changes

- Add a German/English plugin generator to ATLAS Administration.
- Generate an editable HTML/CSS/JavaScript starter, manifest, icons, install package and repository catalog.
- Validate the plugin ID, version, entry path and declared capabilities before enabling downloads.
- Document that generated files must be reviewed and published by the plugin author.
- Update the Home Assistant App/Add-on package to 0.1.231.

## Verification

- `node --check examples/admin-demo/app.js`
- `pnpm build`
- `pnpm ha:app:prepare`
- `pnpm --filter @atlas/homeassistant test`
- `npm run docs:build` in `ugso-opensource-docs`
- `git diff --check`

## Status

Completed.
