# Sprint G2.5.9292 - Native HACS commit updates and HA restarts

2026-10-15. Qualify the existing ATLAS Runtime HACS integration update path on
the real Raspberry Pi 5 and Proxmox HA VM, preserving existing user state.

## Backups and scope

Private evidence: `C:/Users/rockb/source/backups/atlas-hacs-update-20261015`.
Atlas/add-on Git bundles, Administration exports, normalized plugin-management
backups, original local workspace exports and existing server project exports
are retained before updates. No credentials or private exports are committed.

- Pi local encrypted native backup: `ATLAS Pi vor HACS Update 2026-10-15`,
  ID `fde4fdbe`, 11:21, 129.03 MB. HA settings/history and installed apps,
  including ATLAS 0.1.301, included.
- Proxmox local encrypted native backup: `ATLAS Proxmox vor HACS Update
  2026-10-15`, ID `0c16c182`, 11:21, 4.67 GB. HA settings/history and ATLAS
  0.1.301 included; unrelated apps omitted from this targeted backup.
- Both backup detail views confirmed completed before HACS downloads.

## Update and restart

- Refresh HACS repository information for the existing ATLAS Runtime repository.
- Pi installed commit `f93383d` and Proxmox `f2ee8fa` update to `42a56f1`.
- Use HACS download confirmation, then verify both report pending restart.
- Restart HA Core on each system using the native System restart controls.
  Both report no running automations/scripts in the confirmation dialog.
- Observe disconnection during restart and successful return. Proxmox takes
  longer; temporary connection refusal resolves without configuration changes.
- HACS returns to downloaded status on both, with downloaded commit `42a56f1`.
  Integration entries load successfully at version 0.1.301.

## Preservation and native panel verification

- Before/after Administration settings, plugin metadata and secret-status
  summaries compare structurally equal on each system.
- Normalized shared plugin state and revision compare exactly equal.
  Native HA panel Administration shows six plugins, all active, using the shared
  server state. No external plugin package update/removal performed.
- Original local editor exports compare equal after excluding export time.
- Open the existing named two-field server project in each embedded HA panel,
  using the existing backed-up preview/accept flow without saving a new revision.
  Fields, surface dimensions, grid size, card name and script filename compare
  exactly equal against the immediately preceding project exports.
- Reload both panel editors after inspection: original empty workspace returns.
- Hub, Card Editor and Administration work in both native HA panels. Existing
  runtime base addresses on port 4176 remain unchanged.
- App runtime stays healthy at 0.1.301. Original process starts remain
  Pi 2026-10-15 10:30:34 and Proxmox 2026-10-14 20:59:55; only HA Core restarted.

Private screenshots include native backup details, pending-restart state,
downloaded commits and both post-restart panel plugin managers.

## Qualification boundary

This is a real HACS commit update/download and HA restart test, not a manifest
version or config-entry schema migration. All tested commits have identical
`custom_components/atlas_frontend` source; integration versions stay 0.1.301.
A future changed integration version/schema and further HA releases still need
qualification. No rollback/restore drill or external-plugin function retest is
claimed. No runtime source/release change; therefore no package version bump.
Verification comprises native checks and structural export comparisons;
`git diff --check` covers this documentation-only repository increment.
