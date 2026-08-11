# Sprint G2.5.3634 - HACS Readiness Filename Declaration

## Summary

- Added the `hacs-filename-declared` readiness check.
- Surfaced whether `hacs.json.filename` was read successfully.
- Marked the check pending when the manifest could not yet be inspected.

## Verification

- `pnpm --filter @atlas/homeassistant check`
- `pnpm --filter @atlas/homeassistant test`
- `node --check examples/status-demo/app.js`
- `pnpm build`
- `git diff --check`
