# Sprint G2.5.9166 - Loopback-Free Editor Links

## Summary

- Removed static loopback URLs from the visible Card Editor Administration link.
- Added a `/admin` redirect on the Card Editor server that derives the
  Administration URL from the current request host and port `4175`.
- Derived browser-side Admin, Editor and app-runtime URLs from the current host.
- Bumped the Home Assistant App/Add-on preview package to `0.1.6`.

## Verification

- `rg` check for static `127.0.0.1` UI links in Admin and Editor runtime files
- `node --check examples/admin-demo/app.js`
- `node --check examples/admin-demo/server.mjs`
- `node --check examples/status-demo/app.js`
- `node --check examples/status-demo/server.mjs`
- `pnpm ha:app:prepare`
- `docker build --no-cache -t atlas-home-assistant-app:local output\home-assistant-app\atlas`
- `/admin` redirect test with `Host: 192.168.178.36:4174`
- Docker health check
- `git diff --check`
