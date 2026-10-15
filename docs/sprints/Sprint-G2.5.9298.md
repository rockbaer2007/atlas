# Sprint G2.5.9298 - Native 0.1.303 and HA discovery qualification

2026-10-15. App updates on Pi 5 ARM64 and Proxmox amd64. No source/runtime
behavior change, schema migration, HA Core restart or HACS integration update.

## Recovery boundary

Before updates, keep source Git bundle and private Admin/shared-plugin/editor
exports in `C:/Users/rockb/source/backups/atlas-native-0303-20261015`.
Archive both original zero-field drafts and existing named two-field server
projects without a server save or new revision. Existing backups retained.

Native encrypted local backups completed before each host's update:

- Pi `ca6f7b01`: ATLAS Pi vor 0.1.303 2026-10-15, 15:03, 129.3 MB;
  HA settings/history, media/SSL/share and all three installed apps.
- Proxmox `929a305e`: ATLAS Proxmox vor 0.1.303 2026-10-15, 15:03, 4.67 GB;
  targeted HA settings and ATLAS backup; media/share and unrelated apps omitted.
  Detail labels the HA component settings/history; history retention is not
  independently verified. Local system only, no Cloud/SFTP upload.

## Native updates and discovery

- Pi native ARM64 build/update succeeds; healthy 0.1.303 starts at 15:09:48.
  Proxmox native amd64 build completes at 15:11:52; healthy 0.1.303 starts at
  15:11:56. Update one host at a time after its backup completion.
- Both native `/api/homeassistant/version` responses report `available`,
  `admin-rest`, version/rawVersion `2026.10.1`. No browser version is supplied
  and no HA URL, token or permissions are changed.
- Actual package-import UI rejects the own disposable HA >=2027 candidate on
  both hosts, displaying detected 2026.10.1 and preserving the installed version.
  No fixture is installed, no real external plugin replaced and no cleanup
  deletion is necessary. Private screenshots preserve the response and reason.

## Data and access preservation

- Each before/after Admin settings, plugin metadata and secret-status summary
  matches. Shared plugin current state and revision match exactly.
- Complete original editor and named server project exports match, excluding
  only export timestamp `createdAt`. Reload restores original empty drafts.
  Both existing two-field server projects remain intact; no save/new revision.
- Six plugins remain active on each host. Direct editor reconnects to HA.
  Embedded HA Runtime Administration reports healthy 0.1.303 and six active
  plugins on both systems. Pi original App/Ingress access works. On Proxmox,
  clicking Open Web UI in App info works, followed by a working sidebar click.
  A fresh load of `/app/a5967f93_atlas` or legacy `/a5967f93_atlas` remains at
  Loading; this access issue is not resolved or attributed to a specific cause.
  Keep the App-info button as the verified entry point.
  Follow-up: the user subsequently confirms normal F5 reload on Proxmox and
  working Pi access. The manually reloaded Proxmox tab visibly shows all six
  active plugins; the loading symptom persists only in the automated test
  path. See Sprint G2.5.9299 for the corrected qualification boundary.
- Only qualification records/roadmap change in Git; whitespace check passes.
  Runtime checks/build evidence for 0.1.303 remains in Sprint G2.5.9297; native
  Supervisor builds now additionally verify ARM64 and amd64 packaging.

## Limits and follow-up

Native checks qualify authenticated stable HA discovery and known-mismatch
refusal. Unavailable/unauthorized HA, timeout, redirects, prereleases, stale
preview and client-version forgery are covered by isolated tests, not induced
on the live systems. Real external-plugin replacement, additional HA versions
and real HA integration version/schema migration remain open. HA integration
code/version stays at 0.1.301; no production compatibility matrix is claimed.
