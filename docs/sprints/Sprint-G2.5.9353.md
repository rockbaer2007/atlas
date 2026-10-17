# Sprint G2.5.9353 - Native live theme switches on Proxmox and Pi 5

2026-10-17. App 0.1.316 and HACS integration 0.1.306 unchanged. Qualification
and documentation only; no runtime/package update or migration.

## Backup and preservation

- Private evidence: `C:/Users/rockb/source/backups/atlas-native-live-themes-20261017`.
  Main/docs Git bundles and persistent ATLAS mirrors/tars precede test writes.
- Fresh native HA backups completed at 15:23 CEST: Proxmox `f51cb62d`,
  "ATLAS Proxmox vor Live-Theme-Test 2026-10-17", 4.63 GB; Pi `9ecea37b`,
  "Custom backup 2026.10.1", 137.43 MB. The Pi name field did not apply;
  ID, time and contents were checked. Both include HA configuration/history,
  SSL and ATLAS; Pi also includes its other two Apps. Other Proxmox Apps are
  outside this targeted backup. Native archives remain on the hosts; PC mirrors
  are not represented as complete HA backup archives. No backups deleted.
- Baselines: Proxmox 252 persistent files, five projects, six plugins and four
  original trash entries; Pi 316 files, five projects, six plugins and six
  original trash entries. Additional private mirrors cover original themes,
  frontend preferences, integration entries and selected HA configuration.

## Native qualification

- HA 2026.10.1, Card-Mod 4.2.1 and UIX 8.4.0, engines tested separately on each
  host. Mushroom 5.2.3 on both; original Bubble versions remain 3.4.2 on
  Proxmox and 3.4.1 on Pi. Approved official assets only.
- Six native reference cards and six generated cards per engine/host: inherited
  and fixed-override Core, Bubble and Mushroom. Four bundles generated through
  the current export API each pass 112 package checks. This is not another
  actual Editor UI export/import roundtrip; existing Editor local state is not
  opened or changed.
- Passive existing sensors only: Proxmox CPU speed and Pi backup-manager state.
  No device commands, new entities or automation changes.
- Fixture buttons dispatch native HA `settheme` events with theme/mode choices;
  they do not inject CSS variables or alter hidden browser state. Setup reloads,
  integration switches and HA restarts finish outside each measured sequence.
- Eight snapshots per case: custom dark -> light -> dark -> light -> default
  light -> default dark -> custom dark -> custom light. Seven transitions per
  case, 28 total; no page reload/navigation during measured sequences.
- All 1,920 native/export computed-CSS comparisons pass: ten nodes, six
  properties, eight snapshots, four cases. Explicit expectations additionally
  verify green/violet inherited accents, changing backgrounds and 18/26px radii,
  fixed pink/purple child overrides and Bubble CSS. All twelve card instances,
  generated root, probe session and document time origin remain stable per case.
- Direct individual generated-script resources are used, matching normal bundle
  instructions. An initial aggregate-loader fixture caused locale-base warnings
  and a native style-engine load-order issue; that setup was corrected and all
  four cases remeasured. An initial probe UUID call also needed a LAN-HTTP-safe
  implementation. These are private fixture corrections, not ATLAS runtime fixes.
  Early evidence is retained separately and excluded from final proof.
- `verify.mjs` / `proof.json` pass. Final light/dark screenshots visually reviewed.
  Chrome runs on the PC against the actual hosts; no ARM-browser benchmark,
  pixel-equality, timing SLA or universal theme/version claim.

## Cleanup and final preservation

- Original default/dark theme restored on both hosts. All three original
  Proxmox frontend-preference files match as JSON; Pi now has normal HA theme
  bookkeeping containing only the original default-theme choice.
- Existing Proxmox UIX entry and original resource restored. Temporary Pi UIX
  entry removed with explicit user approval, its files moved to File Studio
  trash, and Pi HA restarted successfully without that component.
- With explicit user approval, both owned test dashboards and all nine owned
  resource entries removed. Own WWW/theme files moved to recoverable File Studio
  trash; no purge. Original themes, dashboards and resources remain intact.
- Final `preserve.mjs` / `preservation-proof.json` pass: original persistent
  files, all projects, plugins, management state, terminal configuration,
  connection/version state and original trash entries preserved. New persistent
  files are confined to recoverable trash. No additional Lovelace files remain.
- The strict Proxmox resource-file hash check detected a concurrent Easy Floorplan
  HACS URL change from `1245294334300` to `1245294334310`. The user confirmed
  their own update and requested retaining it. Final resource comparison permits
  exactly that URL change on its original resource ID; all other data matches.
  No automatic restoration overwrites the user's update.
- DE/EN/FR Card Editor and development-status docs updated together. Docs build
  and whitespace checks pass; existing Vite large-chunk advisory only. Runtime
  checks/build are not repeated because no runtime source changed.

## Remaining scope

Broader real user projects, additional themes, browser/OS color-scheme events
and further HA/styling versions remain separate qualification work.
