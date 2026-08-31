# Sprint G2.5.9165 - Editor Admin Host Link

## Summary

- Updated the Card Editor "Open Atlas Administration" link to derive the
  Administration URL from the current browser host instead of `127.0.0.1`.
- Bumped the Home Assistant App/Add-on preview package to `0.1.5`.

## Verification

- `node --check examples/status-demo/app.js`
- `pnpm ha:app:prepare`
- `docker build --no-cache -t atlas-home-assistant-app:local output\home-assistant-app\atlas`
- `git diff --check`
