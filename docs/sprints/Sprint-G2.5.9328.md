# Sprint G2.5.9328 - Native App0.1.312 retention update

2026-10-16. Qualify the published0.1.312 on Proxmox amd64 and Pi 5 ARM64,
including old-container preparation. No product changes or version bump in
this verification increment. Integration remains0.1.306; external plugins unchanged.

## Backup and migration before update

- Private evidence: source/backups/atlas-native-0312-20261016. Retain Git bundles,
  user roadmaps, full named-project/shared-state payloads,33 external-plugin
  assets per host, non-secret Admin controls and selected HA configuration files.
- Fresh protected/encrypted local HA backups: Pi03296fec,140574720bytes,
  HA settings/history, SSL and all3 installed Apps; VMa2d05191,5014220800bytes,
  HA settings/history, SSL and ATLAS. VM excludes unrelated Apps/media/share;
  this is not a full all-App backup. CLI lists confirm completed backup scopes.
- Back up old stores AND persistent plugin data to tar inside each OLD0.1.311
  container, then use the reviewed standalone0.1.312 helper there. Back up the
  prepared persistent data too. Download both18MB archives per host directly
  through the existing approved scoped file API; verify content lengths and
  archive readability, retain SHA256 manifests and PC migration reports.
- Each host has two original trash entries (old own0310/0311 folders),10 trash
  files and12 history files. Source copies remain untouched until the old
  container is replaced. Exact content, directory identities and metadata match.
- Pi proof harness initially rejects submillisecond mtime rounding despite a
  successful copy. Keep the original archive, adjust only the proof tolerance
  to less than1ms, then verify on rerun. No product change or data overwrite.
  A separate history harness assumption of4 versions per locale was incorrect;
  compare the actual saved names instead. All12 originals match.

## Update and preservation

- Refresh native repository metadata, inspect old0.1.311/target0.1.312 dialogs,
  then start actual App builds. Existing additional update-backup switch stays
  off because fresh verified backups/prepared PC archives already exist.
- Both actual builds/startups finish at0.1.312. No HA Core or host reboot.
  Existing autostart/watchdog/automatic-update settings are not edited.
- Before/after/final comparisons preserve all6 plugin catalog entries/shared
  state, one full named project,33 selected plugin assets per host, terminal
  capabilities, Admin controls and selected HA files (VM22/Pi8) exactly.
- Compare every original persistent plugin/project/management file from the old
  archive against a native post-update hash scan: VM169 and Pi174 files exact.
  This excludes the intended new .file-studio migration/stores, checked separately.
- Persistent trash/history inventories match the old stores, with original
  entry IDs/JSON and all22 file hashes per host intact. History APIs expose all12
  original version names; both old trash entries appear in the File Studio UI.
- Administration visibly reports0.1.312 and6 active plugins. Both editors
  automatically authenticate without entering credentials: VM3736 live entities,
  Pi32 live entities. Authenticated HA discovery returns2026.10.1 on both.
  Non-secret Admin settings exactly match before/after. Screenshots retained.
- Read/check original retention entries only; do not restore/delete them for
  another test. Actual restore operations already pass in isolated Sprint9327.
  No new dashboards/resources/config files or user projects created/modified.
  Only own transient audit helpers/reports remain under current container /tmp;
  old preparation helpers disappear with the replaced containers. Backups kept.

## Publication and limits

- Update roadmap and DE/EN/FR retention documentation; documentation build before
  separate docs publication, diff checks before commits. No new source changes
  requiring another App build/test cycle; published312 CI was already green.
- This verifies native App replacement after deliberate preparation. It does
  not test HAOS-native backup restoration, another HACS integration update or
  recovery of data already discarded before preparation.
