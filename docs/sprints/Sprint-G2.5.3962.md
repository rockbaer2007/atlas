# Sprint G2.5.3962 - Blocked Group Line

## Summary

- Documented blocked group line for the HACS readiness overview formatter workstream.
- Included this item in the shared HACS bundle readiness review output follow-up.
- Kept the Card Editor status demo aligned with package-level diagnostic formatter lines.

## Verification

- `pnpm --filter @atlas/homeassistant check`
- `pnpm --filter @atlas/homeassistant test`
- `node --check examples/status-demo/app.js`
- `pnpm build`
- `git diff --check`
