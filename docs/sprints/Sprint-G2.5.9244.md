# Sprint G2.5.9244 - Compact Plugin Hub Status Badge

## Goal

Prevent the Plugin Hub status badge from stretching when a plugin has no icon.

## Changes

- Use a two-column title layout for plugins without an icon and reserve the icon column only when needed.
- Keep status labels compact and on one line.
- Update the Home Assistant App/Add-on package to 0.1.233.

## Verification

- `node --check examples/plugin-hub/app.js`
- `pnpm build`
- `pnpm ha:app:prepare`
- `git diff --check`

## Status

Completed.
