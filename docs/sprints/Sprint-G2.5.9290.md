# Sprint G2.5.9290 - Native Pi HACS Runtime setup and embedded panel

2026-10-15. Install the already published ATLAS Runtime integration on the real
Pi 5, configure its existing App backend and verify the native HA panel.

## Backup and authorized installation

Private evidence directory:
`C:/Users/rockb/source/backups/atlas-pi-runtime-panel-20261015`.

- Atlas and add-on Git bundles before work.
- Native local encrypted HA backup `ATLAS Pi vor Runtime Panel 2026-10-15`,
  detail ID `0fdb0494`, created at 10:59, 128.9 MB. The detail view confirms HA
  settings/history, ATLAS 0.1.301, Get HACS and Matter Server are included.
  This backs up the existing server example and App data before setup.
- Register `rockbaer2007/atlas` as a HACS custom Integration repository.
- Prepare the exact download, then obtain the user's action-time approval to
  install commit `f93383d` and restart HA. HACS installs into
  `/config/custom_components/atlas_frontend` and reports pending restart.
- Restart HA Core through its normal UI, then add ATLAS Runtime under
  Devices & services using `http://192.168.178.177:4176`.
- HA confirms configuration success, integration version 0.1.301 and the new
  ATLAS Runtime sidebar entry. Existing App Ingress remains available.

## Native panel verification

- Hub embeds the existing backend and shows six active plugins.
- Toolbar navigation to Card Editor and Administration works. The configured
  backend URL remains the existing direct Runtime address; no port exposure,
  access token, provider key or plugin installation is changed.
- The existing server project `ATLAS Pi Übernahmeprüfung 2026-10-15 Runtime`
  survives the HA Core restart and opens through preview/backup/apply in the
  embedded editor. No new server project or new server revision is written.
- Export comparison against the previous direct Runtime fixture confirms all
  five project sections match: fields, surface size, grid size, name and script
  filename. Both Sensor cards, umlauts, entities and positions are preserved.
- Administration loads and reports healthy 0.1.301. Panel Reload works.
- Returning to Card Editor restores the original empty local workspace while
  retaining the named server project. Full editor exports match the prior
  original configuration, excluding export timestamp.
- App and direct Runtime Administration settings, plugin preferences and
  secret-status summaries match previous private exports. Normalized App
  plugin-management metadata also compares equal.

Screenshots include `ha-backup-before.png`, `hacs-install-preview.png`,
`hacs-installed-pending-restart.png` and `native-panel-project-opened.png`.
Keep private exports and Ingress addresses out of Git.

## Final state and limits

ATLAS Runtime 0.1.301 is configured at `/atlas-runtime`; the original App route
and all six active Hub plugins remain available. The own server example and
automatic workspace/project backups remain intact. No existing project is saved
over or deleted, and no external plugin is updated.

Pi shared plugin management is still unadopted: the original App Administration
has six active plugin entries while direct Runtime Administration retains its
existing four-entry browser catalog (one active). This known separate browser
state is preserved, not silently merged during panel setup. Explicit backed-up
plugin adoption remains open.

This is first native Pi integration installation/setup, not an integration
upgrade test. HA Core restarted; the App backend remained on its existing
10:30:34 process, so this does not claim a new backend restart test. No runtime
source or release change is required; repository edits are qualification records.
