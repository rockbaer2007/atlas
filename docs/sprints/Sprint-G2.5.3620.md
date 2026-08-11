# Sprint G2.5.3620 - Cover HACS Locale Error Reasons

## Summary

- Added regression coverage for invalid JSON in declared HACS locale files.
- Added regression coverage for declared HACS locale files missing `_meta.language`.
- Verified that HACS ZIP review lines expose both locale error reasons.

## Verification

- `pnpm --filter @atlas/homeassistant check`
- `pnpm --filter @atlas/homeassistant test`
- `node --check examples/status-demo/app.js`
- `pnpm build`
- `git diff --check`
