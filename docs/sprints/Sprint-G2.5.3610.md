# Sprint G2.5.3610 - Provider Key Status Handoff

## Summary

- Added provider-specific translation API-key configured flags to the Administration handoff.
- Persisted the provider key-status map without exposing raw provider API keys.
- Updated the Card Editor to prefer explicit provider key-status values over stale single-provider state.
- Documented that ChatGPT/OpenAI is the first connected provider while planned providers remain key-status-only.

## Verification

- `node --check examples/status-demo/app.js`
- `node --check examples/admin-demo/app.js`
- `git diff --check`
- `pnpm build`
