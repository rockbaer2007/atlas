# Sprint G2.5.3724 - Locale invalid count

## Summary

- Documented invalid locale count readiness.
- Included this checkpoint in the expanded HACS bundle readiness report workstream.
- Kept the Card Editor import review aligned with the package-level validation API.

## Verification

- `pnpm --filter @atlas/homeassistant check`
- `pnpm --filter @atlas/homeassistant test`
- `node --check examples/status-demo/app.js`
- `pnpm build`
- `git diff --check`
