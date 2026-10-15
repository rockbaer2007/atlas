# Sprint G2.5.9309 - Native Pi 4 connection to Proxmox HA

Date: 2026-10-15

## Backup and scope

Connect the existing native Pi 4 App0.1.304 to the user's Proxmox Home
Assistant and qualify the live entity picker in Chrome. No runtime/package
source change and no version bump. Existing installer/LAN qualification is
recorded in Sprints9307/9308.

Before changes, capture sanitized connection settings, plugin catalog/shared
state and server projects. Export Administration settings through its UI,
parse the downloaded JSON and retain it in the private PC evidence folder
`source/backups/atlas-pi4-ha-connection-20261015`. The user runs the installer
backup and confirms its path:
`/var/backups/atlas/2026-10-15T17-21-46-112Z-u1xnsB`.
This new host backup is user-confirmed, not independently inspected or copied
to the PC. Earlier PC-verified installer/system backups remain retained.

## Connection and real browser checks

The user enters their existing HA token directly in a separate Pi 4
Administration tab. On claiming that tab, token remembering and automatic
Editor connection are already checked by the user. Preserve those choices;
never extract the token or include it in logs, screenshots or Git.

Set the HA URL to the approved Proxmox address, save through Administration,
and use its Plugin Hub button for the normal Editor session handoff.

- Editor connects and loads 3,736 real Proxmox entities.
- Searching `sun.sun` returns the real `Sun (sun.sun)` picker option.
- Selecting the `sun` domain filter retains exactly one matching entity.
- Clear search/domain filters, then directly reload the Editor. It reconnects
  automatically and again displays 3,736 entities without new token entry.
- Reload Administration: the intended URL, remember-token and auto-connect
  settings are restored. Export a second settings snapshot through the UI.
- Retain inspected screenshots of the live selection and connected Editor
  outside Git. Leave Administration and connected Editor available to the user.

No entity is added to the card, no Expert field is created and no named project
is saved. The existing workspace stays at zero fields. No HA service, entity,
automation, dashboard or system-file write is performed.

## Preservation and limits

Compare before/after API responses: plugin catalog, shared plugin store and
server project list match exactly. Compare exported Administration settings:
only HA URL, rememberToken and autoConnectEditor differ from the pre-user-input
baseline. Other settings and plugin metadata match exactly.

This fresh Pi installation has only the built-in reference plugin, no named
server projects and an uninitialized shared plugin store. Do not claim a
populated external-plugin/project migration. No host files are edited during
this connection check; a new filesystem-wide hash audit, service/OS restart,
network-outage test and cross-browser credential restoration are outside scope.
Direct browser reload is verified, not long-term recovery after a host restart.

Private comparison assertions and `git diff --check` pass. Runtime builds are
not repeated for this evidence-only change.
