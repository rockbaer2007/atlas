# Sprint G2.5.9221 - Honest Hub Clipboard Feedback

## Goal

Avoid false success messages when Home Assistant or the browser blocks Plugin
Hub clipboard access.

## Changes

- Removed the unreliable hidden `execCommand` success path from the Plugin Hub
  sidebar helper.
- Kept direct Clipboard API copying when available.
- Added an inline, selected manual-copy field when direct copying is blocked.
- Bumped the Home Assistant App/Add-on package to `0.1.113`.

## Verification

- `node --check examples/plugin-hub/app.js`
- `pnpm build`
- `git diff --check`
- `pnpm ha:app:prepare`
