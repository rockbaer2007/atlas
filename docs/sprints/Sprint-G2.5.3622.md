# Sprint G2.5.3622 - Validate HACS README Readiness

## Summary

- Added README readiness diagnostics for ATLAS Home Assistant HACS card bundle imports.
- Verified that `README.md` documents the generated HACS resource path and custom card type.
- Rejected HACS bundle imports when the README omits the expected resource path or card type.
- Added review-line output and regression coverage for README readiness.

## Verification

- `pnpm --filter @atlas/homeassistant check`
- `pnpm --filter @atlas/homeassistant test`
- `node --check examples/status-demo/app.js`
- `pnpm build`
- `git diff --check`
