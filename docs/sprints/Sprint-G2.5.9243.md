# Sprint G2.5.9243 - Show Imported Plugin Packages in Hub

## Goal

Make manually imported packages visible in the Plugin Hub without pretending their files are executable pages.

## Changes

- Include imported package descriptors in the shared Hub catalog.
- Keep package imports without a served launch page visible but non-launchable.
- Show a localized Hub action explaining that a launch page is not available yet.
- Update the Home Assistant App/Add-on package to 0.1.232.

## Verification

- `node --check examples/admin-demo/app.js`
- `node --check examples/plugin-hub/app.js`
- `pnpm build`
- `pnpm ha:app:prepare`
- `npm run docs:build` in `ugso-opensource-docs`
- `git diff --check`

## Status

Completed.
