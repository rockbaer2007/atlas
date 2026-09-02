# Sprint G2.5.9219 - Plugin Hub Copy Fallback

## Goal

Make the Plugin Hub sidebar helper copy actions reliable in restricted browser
and Home Assistant embedding contexts.

## Changes

- Hardened URL and YAML copy handling with a focused textarea fallback.
- Added the missing hidden-textarea styling used by the fallback.
- Added localized copy failure feedback.
- Bumped the Home Assistant App/Add-on package to `0.1.111`.

## Verification

- `node --check examples/plugin-hub/app.js`
- `pnpm build`
- `git diff --check`
- `pnpm ha:app:prepare`
