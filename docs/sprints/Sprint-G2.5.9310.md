# Sprint G2.5.9310 - Pi 4 host reboot exposes HA credential restoration failure

Date: 2026-10-15

## Scope and backups

Qualify a real reboot of the existing native App0.1.304 Pi 4 installation,
preserving settings, files, projects and plugins. No source/package update.
The temporary SSH test key stays revoked; user performs backup and reboot
in their own authenticated terminal. No credential is read or posted.

User confirms fresh installer backup:
`/var/backups/atlas/2026-10-15T17-41-35-330Z-aU6K2G`.
This backup path is user-confirmed, not independently copied/verified on PC.
Private PC evidence in `source/backups/atlas-pi4-reboot-20261015` includes
sanitized health/App/catalog/shared plugin/project snapshots and parsed
Administration UI exports before and after. Earlier PC-verified backups remain.

## Observed results

- User confirms issuing the requested host reboot, with no manual ATLAS start.
- Initial PC request times out. Subsequent health/App requests succeed with
  native linux-installer distribution and unchanged App0.1.304.
- App start timestamp changes from the pre-reboot monitor observation
  `2026-10-15T17:41:35.879Z` to `2026-10-15T17:44:07.314Z` (UTC).
  This supports automatic runtime availability after the user-reported reboot.
  User-supplied host output subsequently confirms `enabled` and `active`, with
  ExecMainStartTimestamp and ActiveEnterTimestamp at 19:44:06 CEST. Reported
  `uptime -s` is 19:44:21, later than the service timestamp; retain that anomaly
  without claiming an exact boot duration or independently audited boot clock.
- Catalog, shared plugin state and named project list match before exactly.
  Administration UI exports preserve all non-secret settings and plugin metadata.
- The already-open Editor retains its direct connection to remote Proxmox HA.
  That connection does not by itself prove restoration by the restarted App.
- A fresh Editor reload stays disconnected. Reloading Administration restores
  the URL and checked remember-token/auto-connect choices but leaves Access Token
  empty. Automatic HA credential restoration after host reboot therefore FAILS.

Existing workspace remains at zero Expert fields. No HA entity, service,
automation, dashboard or project is written. No host file edit or package change
is performed; no new filesystem-wide hash audit is claimed.

## Follow-up and diagnosis boundary

Source inspection finds that `getAdminSecretsCryptoKey` returns undefined when
Web Crypto subtle is unavailable; encrypted persistence then silently skips
saving while Save can still report a saved token. The LAN uses plain HTTP.
This is a diagnostic lead, not independently confirmed browser crypto evidence.
Do not weaken encryption, store a raw token or bypass browser security to pass.

Ask the user to re-enter their existing token directly into Pi4 Administration
and save to restore the session. User confirms token saved; Administration
reload then shows the restored redacted credential. The normal Administration
handoff reconnects the Editor with 3,734 live entities; workspace stays at zero
fields. Repeat catalog/shared-state/project assertions pass. Save an inspected
connected screenshot privately. Durable credential restoration remains open;
the overall reboot/HA-connection acceptance is not passed.

Private preservation assertions and whitespace checks pass. No runtime build
is needed for this evidence-only increment. Screenshots of disconnected Editor
and empty-token Administration are retained privately.
