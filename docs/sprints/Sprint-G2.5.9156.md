# Sprint G2.5.9156 - Standalone Docker Verification

## Summary

- Fixed the Docker build context by excluding TypeScript build-info files so a fresh container build emits package declarations.
- Switched the Docker health check to exec form so the Node health probe is not interpreted by the shell.
- Marked the standalone Docker target as verified in the Home Assistant Card Editor app-release readiness and Administration preview copy.
- Updated deployment notes to document the Docker build, Compose start and container health verification flow.

## Verification

- `node --check examples/status-demo/app.js`
- `node --check examples/admin-demo/app.js`
- `pnpm --filter @atlas/homeassistant test`
- `pnpm build`
- `pnpm docker:build`
- `docker compose up -d --build`
- `GET http://127.0.0.1:4176/health`
- `docker inspect atlas-atlas-1 --format '{{json .State.Health}}'`
- `git diff --check`
