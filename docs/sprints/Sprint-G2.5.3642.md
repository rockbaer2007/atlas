# Sprint G2.5.3642 - HACS Readiness Name Match

## Summary

- Added the `hacs-name-matches-package` readiness check.
- Reported whether `hacs.json.name` matches the embedded package title.
- Made manifest-name drift visible in the 30-check report.

## Verification

- `pnpm --filter @atlas/homeassistant check`
- `pnpm --filter @atlas/homeassistant test`
- `node --check examples/status-demo/app.js`
- `pnpm build`
- `git diff --check`
