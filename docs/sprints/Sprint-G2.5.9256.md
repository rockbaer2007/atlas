# Sprint G2.5.9256 - Real HA update and Ingress verification (A1)

2026-10-13. Framework remains 0.2.0-alpha.88; HA app 0.1.288.

## Finding and fix

The real Supervisor installation was already at 0.1.287. Ingress opened
the Hub with six active plugins. Administration incorrectly reported
`0.0.0-local` because the workspace root package has no version. Pass the
Supervisor BUILD_VERSION into ATLAS_APP_VERSION and use it in the runtime
status response. Options, installation identity and plugin paths are unchanged.

Published source fix: ATLAS `31990cd6`, add-on repository `539619f`.

## Safety and baseline

- Export Administration settings and the complete editor configuration to a
  local backup directory outside Git; do not publish secrets or Ingress paths.
- Create and verify a local encrypted HA backup named
  `ATLAS A1 vor Prüfung 2026-10-13` (4.67 GB), containing HA settings and ATLAS
  0.1.287. Cloud and SFTP destinations were not selected.
- Baseline: six active plugins; current Expert canvas has zero fields.
- Real HA connection loads 3707 entities and 143 Lovelace resources.
- No Home Assistant device actions, plugin removals or configuration changes.

## Validation

- JavaScript syntax, all workspace type checks and build passed.
- 159 Home Assistant tests and two source-package tests passed.
- All 469 generated source-package files match both repositories.
- HA amd64 Docker image builds; `/health` is ok and `/app` reports 0.1.288
  with Administration and Card Editor ready.

## Real Supervisor result

- Refresh the repository in HA, verify target 0.1.288, install through the
  Supervisor update dialog. HA reports installed/latest 0.1.288 and running.
- Administration now reports `ATLAS 0.1.288: ok`, with a new startup time.
- Compare local exports before/after update and after a separate app restart:
  settings, plugin descriptors, active IDs and secret-configured flags are
  identical. The complete editor export is identical except createdAt.
- All six plugin versions remain unchanged: Card Editor alpha.96, File Studio
  0.1.50, Automation Exporter 0.1.27, Terminal 0.1.9, Icon Library 0.1.8,
  Icon Studio 0.1.15. All six UI surfaces open through Ingress.
- File Studio loads approved paths; Icon Library loads 7447 MDI icons.
  Terminal remains disconnected; no terminal commands or device actions run.
- HA reconnects automatically after the separate restart: 3734 live entities
  at the final observation and 143 resources. Live entity counts can change.
- Keep backup and before/after exports outside Git at
  `C:/Users/rockb/source/backups/atlas-ha-a1-20261013`.

Status: A1 complete for the existing real installation state. Its Expert
canvas was empty, so populated-project upgrades and arbitrary plugin-owned
project formats are not claimed. Larger real projects remain A5, ARM64/mobile
remain A2. Update DE/EN/FR public status documentation with these boundaries.
