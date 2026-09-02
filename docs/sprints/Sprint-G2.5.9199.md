# Sprint G2.5.9199

## Goal

Expand ATLAS File Studio follow-up workflow improvements.

## Changes

- Added an opt-in File Studio diagnostics endpoint and UI action for
  secret-free problem report previews.
- Added HA-oriented YAML validation hints and reload guidance for common
  Home Assistant files.
- Added automatic save backups plus a lightweight history listing.
- Improved search results with content line numbers and preview snippets.
- Added conflict-aware upload replacement/rename flow and session-tracked
  download names such as `configuration-1.yaml`.
- Bumped File Studio to `0.1.29` and the Home Assistant App/Add-on package to
  `0.1.91`.

## Verification

- `node --check scripts/atlas-app-server.mjs`
- `node --check examples/admin-demo/server.mjs`
- `pnpm --filter @atlas/file-studio test`
- `pnpm --filter @atlas/file-studio build`
- `pnpm build`
- `pnpm ha:app:prepare`
- File Studio API smoke test on `http://127.0.0.1:4276/` with temporary
  `/config` and `/addons` roots for tree, YAML validation, diagnostics, search,
  write backup and history.
- `git diff --check`
