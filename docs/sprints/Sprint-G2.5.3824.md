# Sprint G2.5.3824 - Overview locale triage

## Summary

- Documented locale triage for translation bundle issues.
- Included this item in the HACS bundle readiness overview workstream.
- Kept the Card Editor import review aligned with grouped readiness diagnostics.

## Verification

- `pnpm --filter @atlas/homeassistant check`
- `pnpm --filter @atlas/homeassistant test`
- `node --check examples/status-demo/app.js`
- `pnpm build`
- `git diff --check`
