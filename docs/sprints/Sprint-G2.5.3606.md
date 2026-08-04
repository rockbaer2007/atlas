# Sprint G2.5.3606 - Persistent Translation Module Status

## Summary

- Kept the Card Editor translation module status visible after Admin handoff.
- Prevented the export preparation flow from clearing the configured module display when automatic translation is disabled.
- Refreshed the module status after language changes and initial rendering.

## Verification

- `node --check examples/status-demo/app.js`
- `git diff --check`
- `pnpm build`
