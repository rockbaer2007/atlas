# Sprint G2.5.3643 - HACS Readiness Filename Match

## Summary

- Added the `hacs-filename-matches-package` readiness check.
- Reported whether `hacs.json.filename` matches the embedded package script filename.
- Kept package filename drift visible in the readiness report.

## Verification

- `pnpm --filter @atlas/homeassistant check`
- `pnpm --filter @atlas/homeassistant test`
- `node --check examples/status-demo/app.js`
- `pnpm build`
- `git diff --check`
