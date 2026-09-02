# Sprint G2.5.9200

## Goal

Start the next ATLAS File Studio expansion stage.

## Changes

- Added File Studio restore from backup history.
- Kept restore safe by creating a fresh backup before replacing the current
  file with a selected historical backup.
- Added GitHub issue URL preparation to the secret-free problem report.
- Expanded Home Assistant YAML hints for `configuration.yaml`,
  `automations.yaml`, `scripts.yaml` and package files.
- Bumped File Studio to `0.1.30` and the Home Assistant App/Add-on package to
  `0.1.92`.

## Verification

- `node --check scripts/atlas-app-server.mjs`
- `pnpm --filter @atlas/file-studio test`
- `pnpm build`
- `pnpm ha:app:prepare`
- File Studio API smoke test on `http://127.0.0.1:4276/` for write backup,
  history restore, secret-free diagnostics with GitHub issue URL and
  Home Assistant YAML structure hints.
