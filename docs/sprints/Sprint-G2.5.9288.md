# Sprint G2.5.9288 - Native Proxmox shared editor project qualification

2026-10-15. Qualify the already installed ATLAS 0.1.301 through the original
Home Assistant App Ingress access and ATLAS Runtime on Proxmox. No runtime code,
package version, HA system files or plugin installations changed.

## Backups before project writes

Private evidence directory:
`C:/Users/rockb/source/backups/atlas-native-shared-projects-20261015`.

- Atlas, add-on and documentation repository Git bundles.
- Administration exports and plugin-management backup exports.
- Original App and Runtime editor JSON exports: three groups, zero Expert fields.
- Native local encrypted HA backup, detail ID `1ae13cc0`, created 2026-10-15
  at 10:11, displayed as `Custom backup 2026.10.1`, 4.66 GB. The detail page
  confirms Home Assistant settings/history and ATLAS 0.1.301 are included.
  The requested custom name was not reflected in HA's final backup name.
  No restore was performed; no recovery key was displayed or changed.

## Native results

- Administration confirms 0.1.301 and healthy runtime; six plugins remain active.
- Save the original empty workspace as a new server project first, switching
  subsequent fixture edits to the separate shared-project draft.
- Populate only that new project with two Sensor cards, umlaut titles,
  `sensor.atlas_temperature`, distinct grid positions, 4x2 field dimensions,
  a 6x6 surface and a custom script filename.
- App to Runtime: preview/open succeeds. Deep comparisons of exported fields,
  surface size, grid size, project name and script filename are equal; JSON
  property ordering differs without changing data.
- Runtime to App: rename/save the same test project, then preview/open it in
  the App. The same five exported project sections match in both directions.
- A pending App save against the older revision is rejected after the Runtime
  saves a newer revision. The newer project name remains intact.
- The embedded native HA Runtime Card Editor also lists and opens the project;
  both cards and geometry are visible inside the HA panel.
- Reload preserves the server project list and restores the original local
  workspace on each origin. The separate draft preview still finds two fields.
- Full original App and Runtime editor exports compare equal after excluding
  export timestamps. App Administration settings, plugin settings, secret-status
  summary and normalized shared plugin-management state also compare equal.

Evidence includes `ha-backup-before.png`, `native-runtime-panel-project.png`,
`stale-save-conflict.png` and before/after JSON exports in the private directory.
Do not commit private exports or Ingress addresses.

## Final state and limits

Original local editor workspaces are restored by normal reload. The single
new server project `ATLAS Übernahmeprüfung 2026-10-15 Runtime` is retained as
an inspectable test example, together with automatic project/workspace backups.
No existing server project was overwritten (the initial server list was empty).

This qualifies project transfer on native Proxmox through App, direct Runtime
and the embedded Runtime panel. It does not claim Pi project adoption, a native
server restart test, external-plugin project migration or broad card diversity.
