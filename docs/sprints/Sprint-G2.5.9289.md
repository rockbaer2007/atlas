# Sprint G2.5.9289 - Native Pi shared editor project qualification

2026-10-15. Real Raspberry Pi 5 with 8 GB RAM, ARM64 Home Assistant.
Verify project transfer between original App/Ingress and direct Runtime.

## Backup and update

Private evidence directory:
`C:/Users/rockb/source/backups/atlas-pi-shared-projects-20261015`.

- Atlas, add-on and documentation Git bundles before work.
- Original App and Runtime Administration/editor exports and App plugin backup.
  Both original editor workspaces have zero Expert fields.
- Native local encrypted HA backup `ATLAS Pi Projektuebernahme vorher 2026-10-15`,
  detail ID `5de9235e`, 128.89 MB, created at 10:25. The detail page confirms
  HA settings/history, ATLAS 0.1.300, Get HACS and Matter Server are included.
  No restore or recovery-key change performed.
- HA initially reports healthy ATLAS 0.1.300. Apply the offered existing-App
  update to 0.1.301 after backup. HA App info and Runtime Administration confirm
  0.1.301, healthy, started at 10:30:34.
- Chrome initially holds editor exports; wait until completed JSON files exist
  and copy the originals to the private backup before project writes.

## Native results

- Direct Runtime port 4176 is already reachable; no network exposure changed.
- Save a new empty server project before editing, so subsequent fixture changes
  use the separate shared-project draft and leave the original local project.
- Populate only the own project with two Sensor cards, umlaut titles,
  `sensor.atlas_temperature`, separate grid positions, 4x2 dimensions,
  6x6 surface and `atlas-pi-uebernahme.js` script filename.
- App to Runtime and Runtime to App preview/open/save succeed. Deep comparisons
  of fields, surface size, grid size, name and script filename match both ways.
- Rename/save in Runtime while an older App save preview remains pending.
  Confirming the stale App save is rejected; the newer Runtime name survives.
- Reload retains the server project list and restores original local workspaces.
  The separate local draft preview still finds the two test fields.
- Full original editor exports match after excluding export timestamps on both
  origins. Both Administration settings, plugin settings and secret-status
  summaries compare equal. App normalized plugin-management state is identical.
- The original six active App plugins remain active. Their existing versions
  and repository metadata are preserved; no external plugin update is applied.

Evidence includes `ha-backup-before.png`, `runtime-adopted-project.png`,
`app-roundtrip-project.png`, `stale-save-conflict.png` and JSON before/after
exports. Do not commit private exports, credentials or Ingress addresses.

## Final state and limits

Keep the single own server example `ATLAS Pi Übernahmeprüfung 2026-10-15 Runtime`
and automatic project/workspace backups. Original local workspaces are restored.
The project list was initially empty; no existing server project was overwritten.

The Pi has no configured ATLAS Runtime HA integration/panel. This qualifies
App/Ingress versus direct Runtime, not embedded Pi panel behavior. Shared plugin
management is still unadopted on the Pi and remains unchanged. External-plugin
project migration, diverse real projects and a separate native restart test are
outside this increment. The App update itself restarts the old runtime before
test-project creation.

No runtime source change or new release is needed; the installed version is the
already published 0.1.301. Repository changes are qualification records only.
