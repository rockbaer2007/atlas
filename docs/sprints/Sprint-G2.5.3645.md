# Sprint G2.5.3645 - HACS Readiness Script Readability

## Summary

- Added the `script-file-readable` readiness check.
- Reported whether the generated root script file was read from the archive.
- Kept script presence and script content validation as separate checks.

## Verification

- `pnpm --filter @atlas/homeassistant check`
- `pnpm --filter @atlas/homeassistant test`
- `node --check examples/status-demo/app.js`
- `pnpm build`
- `git diff --check`
