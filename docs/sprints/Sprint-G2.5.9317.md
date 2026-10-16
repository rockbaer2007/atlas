# Sprint G2.5.9317 - Deterministic project backup CI checks

2026-10-16. Fix the failed GitHub CI project-backup test while preserving all
existing settings, files, projects and plugins. Pi 5 and Proxmox are neither
queried nor changed.

## Backup and diagnosis

- Complete-history Git bundles for ATLAS and the add-on repository, original
  test/store files and copies of the two user-owned untracked roadmaps are
  retained in `C:/Users/rockb/source/backups/atlas-ci-project-backup-20261016`.
- Failed CI run38886718074 selected a740-byte older backup instead of the
  expected1,405-byte previous project store. The test sorted timestamp/random
  directory names and assumed the lexicographically last folder was newest.
- Reproduce with Date.now fixed to one millisecond: the correct backup exists,
  but the old selection picks another folder. Private reproduction.json records
  the evidence; no user project data is needed.

## Correction

- Freeze Date.now in the Editor project test so consecutive saves explicitly
  share a timestamp. Identify the newly created backup by directory-set
  difference rather than timestamp/random-suffix sorting.
- Check exactly one new folder, exact previous file bytes, unchanged older
  backup contents, unchanged complete independent project entry and the updated
  project's new revision/name. Workspace backup checks remain intact.
- Remove the identical folder-order assumption from the plugin-management
  backup test, using the same new-folder identity check.
- No changes to either production store, schema, runtime behavior or package
  versions. App remains0.1.307 and HA integration0.1.306. Test-only package
  copies are synchronized into both502-file add-on source inventories.

## Verification

- Targeted Editor tests pass on Windows; full39 App tests pass.
- Both suites pass30 repeated runs in a private Linux container on
  Node22.23.3:240 tests total, including the forced same-millisecond condition.
- Linux and canonical Editor store SHA256 are identical:
  `f9fbfab6193af60cd07d37bb877fbe6e6594648a5c16c8b3e623c4feeb09e732`.
- No existing runtime or Home Assistant instance is started. Only disposable
  test fixtures run; the repetition container stops after completion. Private
  backups/evidence remain on PC. External documentation needs no behavior edit.

Final GitHub CI outcome is recorded in the task report and private evidence.
