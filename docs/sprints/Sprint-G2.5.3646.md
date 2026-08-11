# Sprint G2.5.3646 - HACS Readiness Script Definition

## Summary

- Added the `script-defines-custom-element` readiness check.
- Reported whether the script defines the expected ATLAS custom element.
- Connected existing script readiness validation to the 30-check report.

## Verification

- `pnpm --filter @atlas/homeassistant check`
- `pnpm --filter @atlas/homeassistant test`
- `node --check examples/status-demo/app.js`
- `pnpm build`
- `git diff --check`
