# Sprint G2.5.9206

## Goal

Clarify that parcel service providers in Atlas Administration are prepared for
later use.

## Changes

- Added an orange prepared-for-later-use note to the parcel service provider
  section heading.
- Bumped the Home Assistant App/Add-on package to `0.1.98`.

## Verification

- `node --check examples/admin-demo/app.js`
- `node --check examples/admin-demo/server.mjs`
- `git diff --check`
- `pnpm ha:app:prepare`
