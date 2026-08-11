# Sprint G2.5.3621 - Validate HACS Lovelace Example

## Summary

- Added HACS bundle example readiness diagnostics for `examples/lovelace-card.json`.
- Verified that the Lovelace example card type matches the embedded ATLAS card package custom card type.
- Rejected HACS bundle imports when the example card JSON is invalid, missing a type or points at a different custom card.
- Added review-line output for valid and invalid example card readiness.

## Verification

- `pnpm --filter @atlas/homeassistant check`
- `pnpm --filter @atlas/homeassistant test`
- `node --check examples/status-demo/app.js`
- `pnpm build`
- `git diff --check`
