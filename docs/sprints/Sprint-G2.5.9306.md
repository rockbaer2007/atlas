# Sprint G2.5.9306 - Qualify Terminal 0.1.10 update and UI recovery

Date: 2026-10-15

## ATLAS scope

Qualify the existing ATLAS package-update and safe-recovery surface using the
external Terminal 0.1.10 release, after the stored descriptor correction in
Sprint 9305. No ATLAS runtime, add-on, integration or external plugin source
changes. App remains 0.1.304; integration remains 0.1.301. Terminal development
belongs in its separate repository (release b2b8565).

## Backups before native changes

- Pi: new encrypted full local HA backup `202812c7`, 133.18 MB, containing
  HA settings/history/media/SSL/share and all three apps, including ATLAS 0.1.304.
- Proxmox: only 4.7 GB free on its 122.3 GB data filesystem. Retain the verified
  encrypted 4.67 GB HA settings/SSL/ATLAS backup `632964a0` from Sprint 9305;
  create a fresh ATLAS-app-only partial backup `6384337c`, 109.93 MB, for the
  current settings and plugin/project state. The fresh CLI-created partial is
  unencrypted and stored locally; it is not described as a new full HA backup.
  No existing backup is deleted, no host restart and no security setting change.

Additional PC evidence is outside Git under
`source/backups/atlas-terminal-010-recovery-20261015`: source bundle, Admin
exports, exact eight original Terminal assets, catalog/shared state, named
projects, four selected config-file hashes/size/mtime and screenshots. No raw
HA or Terminal tokens are extracted or printed. A partially transferred shell
command is discarded by disconnecting before execution; the final backup
command completes and its product details are checked before plugin mutation.

## Sequence and results

1. Use separate local runtime data roots and fixture config/project state.
   UI-import the published 0.1.10 package over 0.1.9, recover the newly captured
   original 0.1.9 through the UI, then recover retained 0.1.10 through the UI.
   App/host match; the isolated fixture has no authenticated HA and deliberately
   reviews the unknown HA-version constraint. No known incompatibility is bypassed.
2. After isolated verification, perform the real repository-catalog update on
   Proxmox, recover original 0.1.9, then retained 0.1.10. Repeat on the Pi only
   after Proxmox passes. Both native hosts finish on Terminal 0.1.10.
3. Native recovery previews match App 0.1.304 and the HA app host. The 0.1.10
   preview also matches authenticated HA Core 2026.10.1 against `>=2026.8`, with
   apply enabled and no unknown-compatibility review override.

Shared revisions: Proxmox 6 -> 7 -> 8 -> 9; Pi 7 -> 8 -> 9 -> 10. Each host
retains three recovery records (0.1.9, 0.1.10, 0.1.9). No recovery history is
deleted or edited. Original 0.1.9 recovery matches all eight pre-test files
byte-for-byte. Final 0.1.10 recovery matches the first installed 0.1.10 bytes
and all eight parsed release-package files.

At each native phase, compare the four selected config files
(`configuration.yaml`, `automations.yaml`, `scripts.yaml`, `scenes.yaml`), named
project list/content/revisions, public Terminal runtime config, other catalog
entries and shared state. They match the baseline except intended Terminal
version/compatibility changes and state revision/timestamp. Six plugins stay
active. Proxmox File Studio 0.1.50 and Pi File Studio 0.1.51 remain distinct.
Final Admin exports preserve settings/file-access policy and configured-secret
summaries; exported plugin state differs only as expected for Terminal 0.1.10.

Native local shell connections succeed after initial update and final recovery,
using the existing browser-held Terminal credentials. Final read-only `uname -m`
returns `x86_64` on Proxmox and `aarch64` on Pi. Theme/font preferences remain
aliens/14 px on Proxmox and Standard/14 px on Pi. Own test shell sessions are
disconnected afterwards. No config file or editor project is edited.

## Verification boundaries

External release `npm test` passes: catalog/descriptor/embedded manifest and
eight unique asset bytes agree. Private phase assertions and final Admin-export/
release-byte assertions pass. ATLAS whitespace checks pass. Unchanged runtime
code is not rebuilt for this evidence-only increment.

The isolated Windows test qualifies package/update/recovery behavior, not a
Linux PTY or generic plugin-data migration. Actual shell functionality is
qualified on the two Linux HA hosts. Docker is unavailable this turn; the
separate Pi 4 Raspberry Pi OS SSH access is not authenticated and no installation
or reconfiguration is attempted there. Generic plugin-owned data rollback,
further distributions and additional HA versions remain separate qualification.
