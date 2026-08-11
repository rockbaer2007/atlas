# Sprint G2.5.3624 - Validate HACS Manifest Name

## Summary

- Added HACS manifest name matching for ATLAS Home Assistant HACS card bundle imports.
- Verified that `hacs.json.name` matches the embedded ATLAS card package title.
- Rejected HACS bundle imports when the manifest name drifts from the packaged card.
- Added review-line output and regression coverage for manifest name readiness.

## Verification

- `pnpm --filter @atlas/homeassistant check`
- `pnpm --filter @atlas/homeassistant test`
- `node --check examples/status-demo/app.js`
- `pnpm build`
- `git diff --check`
