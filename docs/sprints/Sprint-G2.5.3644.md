# Sprint G2.5.3644 - HACS Readiness Custom Element Known

## Summary

- Added the `script-custom-element-known` readiness check.
- Reported whether the embedded package declares the expected custom element.
- Kept script matching dependent on package metadata instead of filename guesses.

## Verification

- `pnpm --filter @atlas/homeassistant check`
- `pnpm --filter @atlas/homeassistant test`
- `node --check examples/status-demo/app.js`
- `pnpm build`
- `git diff --check`
