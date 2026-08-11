# Sprint G2.5.3641 - HACS Readiness Name Declaration

## Summary

- Added the `hacs-name-declared` readiness check.
- Reported whether `hacs.json.name` is available in the manifest.
- Kept manifest naming visible before package name comparison.

## Verification

- `pnpm --filter @atlas/homeassistant check`
- `pnpm --filter @atlas/homeassistant test`
- `node --check examples/status-demo/app.js`
- `pnpm build`
- `git diff --check`
