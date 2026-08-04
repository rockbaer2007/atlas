# Sprint G2.5.3607 - Align Connection And Translation Status Layout

## Summary

- Stacked Admin handoff, connection URL readiness and connection state as separate status lines.
- Moved the translation module status into a dedicated visible line in the Card export translation area.
- Kept the translation status above the auto-translate checkbox for clearer scanning.

## Verification

- `node --check examples/status-demo/app.js`
- `git diff --check`
- `pnpm build`
