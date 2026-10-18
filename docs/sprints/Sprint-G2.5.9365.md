# Sprint G2.5.9365 - Use package identity for HACS title-presence checks

2026-10-18. App 0.1.321; HACS integration remains 0.1.306.

## Backup and scope

Before edits, complete Git bundles for ATLAS, the App repository and external docs
are saved at `C:/Users/rockb/source/backups/atlas-hacs-title-fix-20261018`.
No HA host or local web server is contacted/started. Only .177/.68 are authorized
for future network tests; both remain at the qualified App 0.1.320 state.
Existing settings, files, projects, plugins, user roadmaps and docs work untouched.

## Correction

- Both package-title-present and import-summary-title-present now use the existing
  packageTitle resolution shared by manifest/script/example consistency checks.
  This prefers the verified matching HACS/package name, with existing Editor-plan
  and summary fallbacks. It does not rewrite an empty Entity display name.
- A nonempty package identity is still required. Missing/mismatched HACS manifest
  names remain rejected by their independent checks; unknown summaries remain
  pending. Check identifiers and the 112-check report shape remain stable.
- The readiness function does not mutate its input, source Card names, exported
  content, scripts or archives. No data migration is introduced.

## Verification

- 24 regressions fail before the fix, covering empty, space-only, outer-space
  and outer-tab names in JSON/YAML for Entity, stack and Conditional cards.
  They pass after the correction. Four negative tests cover missing/blank or
  mismatched manifest names and absence of all package/display title sources.
- All 324 Home Assistant tests pass, including all28 new readiness regressions.
  Tests verify literal source names, 112/112 readiness, input non-mutation,
  Editor-plan generation and byte-identical archive reexport.
- The four actual native failure ZIPs from Sprint9364 and four control ZIPs are
  read unchanged from their saved backup folder. All eight now pass112/112 and
  reexport byte-identically. Embedded card entries/names remain exact; grid
  column metadata is checked semantically according to the existing importer.
  Reports are saved separately in the new backup folder; original ZIPs untouched.
- Full workspace build, source/bundle syntax checks, two package-preservation
  tests and canonical App synchronization checks pass. Both App copies match
  0.1.321, including the regression tests and runtime source/bundle.
- DE/EN/FR public docs distinguish the local correction from native deployment;
  external docs build and git diff checks pass. No browser-session changes.

Next: fresh full backups, native 0.1.321 update qualification on .177/.68, then
actual original-ZIP import and reload without a leading control card. Preserve
original Editors and all existing data; previous 0.1.320 HA rendering evidence
does not replace that new readiness/update test.
