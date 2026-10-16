# Sprint G2.5.9326 - Native App0.1.311 package consistency

2026-10-16. Verify the published App0.1.311 on Pi 5 ARM64 and Proxmox amd64,
with fresh backups and bounded preservation checks. No product code/version
change in this qualification increment. Integration remains0.1.306.

## Backup and update

- Private evidence: source/backups/atlas-native-0311-20261016. Before changes,
  retain main/add-on/docs Git bundles, both user roadmaps, full named project
  payloads/shared metadata, 33 external-plugin asset files per host, four HA YAML
  files, selected HA dashboard/resource/integration files and non-secret Admin
  controls. Do not publish private configurations or credentials.
- Create fresh local encrypted HA backups and inspect their contents before
  starting the corresponding App update. Pi23b58939, 134.06MB, 15:11 CEST:
  HA settings/history, SSL and all three installed Apps including ATLAS0.1.310.
  VMba5c2483, 4.67GB, 15:12 CEST: HA settings/history, SSL and ATLAS0.1.310.
  VM excludes unrelated Apps/media/share; it is not a full all-App backup.
- HA retains the default Custom backup2026.10.1 title despite the prepared name;
  identify these backups by ID/time. They remain on their hosts, not newly
  decrypted/downloaded on PC. VM has16.8GB free after backup.
- Refresh native App repository metadata and verify target0.1.311 before update.
  Both actual builds finish, /app and visible Administration report0.1.311.
  No HA Core/host restart. Retain the original disabled additional update-backup
  switch because fresh checked manual backups already exist.

## Preservation finding and manual recovery

- Active settings/shared state, full project payloads, external-plugin files,
  four checked YAML files and terminal capabilities match before/after exactly.
  Six active plugins and one project remain; shared revisions Pi10/VM9.
  Only the bundled reference plugin changes alpha.107 -> alpha.108 as intended.
  Non-secret visible Admin controls are identical. Authenticated HA discovery
  still returns2026.10.1 without entering credentials.
- The strict trash comparison initially FAILS on both hosts: the single previous
  own0310 test-folder entry disappears. No pre-existing user trash entry is present
  in either captured inventory. Defaults for File Studio trash/history resolve
  relative to /app, which the App container replacement discards. No persistent
  trash/history environment path is set in the current App launcher.
- Reconstruct ONLY those previous own test folders from known PC source copies
  through the already-enabled File Studio parent-of-config scope. Verify four
  reconstructed file contents per host and restore original entry metadata/ID.
  Re-read the trash API and require exact original metadata before continuing.
  This is explicit manual recovery, not proof of automatic retention by0.1.311.
- Persistent trash/history placement, migration/backup and container-replacement
  qualification remain an open priority. Prior history content was not inventoried
  in this task; do not claim it survived or that the storage defect is fixed.

## Native Card checks

- Generate two unique Expert Card exports A/B from published0.1.311 source with
  different package markers, EN/DE/FR and only read-only sun.sun references.
  Use own /config/www/atlas-native-0311-20261016 files, one module resource and
  an admin-only, hidden own dashboard per host: ATLAS0.1.311 Paketkonsistenz temporär.
  No existing dashboard, Card or named editor project is edited.
- Complete A: one mixed Core/Bubble/Mushroom Card per host renders with no notice.
  Replace only own FR with valid B-FR: both DE Cards report locales/fr.json,
  including the inactive FR language. Restore A, then valid B-EN: both report
  only locales/en.json. A-FR without packageId is also reported. All child fields
  remain rendered; no real entity is toggled.
- Restore all A language files and reload: each Card renders without a notice.
  New unique resource URLs avoid an older cached module. The large VM Card picker
  initially shows the already-known temporary all-locale read warning; normal
  saved-dashboard reload clears it before the controlled fault cases.
- This is manual /local/ generated-Card qualification, not another native HACS
  repository install or an automatic rewrite of previously deployed exports.

## Outcome and approved cleanup

- After repair, script and all three locales match the PC A export exactly on
  both hosts. After cleanup, all original selected HA files match exactly again
  (Pi4/VM18); original resource counts are Pi2/VM144. The reconstructed old trash
  metadata remains unchanged. Public DE/EN/FR docs build successfully.
- With explicit user confirmation, permanently remove only the new own dashboards
  and module resources. Retain own Card files/configuration in PC deployed-final
  and both release folders; move only the new own native folders into trash.
  Final checks permit exactly one new own trash entry per host and require all
  pre-existing entries unchanged. All active-state/file comparisons pass.
- Existing backups remain. Close only own test tabs after saving screenshots.
- Settings, named projects and checked external-plugin/configuration files are
  preserved. The Card tests pass; automatic trash/history retention does not.
  Record that limitation as the next corrective priority, not a completed fix.
- Private task evidence records authorization state, screenshots, commits and CI.
