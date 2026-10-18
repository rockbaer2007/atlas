# Sprint G2.5.9371 - Block ambiguous HACS imports and script identity conflicts

2026-10-18. App 0.1.324; HACS integration remains 0.1.306.

## Backup and scope

Before edits, Git bundles of ATLAS, its App repository and public documentation
are saved at `C:/Users/rockb/source/backups/atlas-hacs-ambiguity-fix-20261018`.
Fresh encrypted full HA backups finish with HA 2026.10.2 and ATLAS 0.1.323:
.177 eb88cc4a, 138.60 MB at 15:10 CEST; .68 a3308ae6, 139.75 MB at 15:11 CEST.
Native restore listings include settings/history, SSL, media, share and all Apps.
No complete PC download of these HA archives is claimed. Additional PC captures
cover complete original Editor JSON, 405 persistent files plus checked config/
theme/supplement data on .177 and nine approved config files on .68. Seven
projects and six plugins per host remain the baseline. Private .68 plugin storage
retains full-backup coverage without additional permissions.

Network and native browser work are restricted to .177/.68. Local unit/static
checks start no other servers. Existing user roadmaps remain untouched.

## Correction and local verification

- Verified inventories with multiple embedded projects or scripts reject before
  package selection. Reversing ZIP order cannot select a different project.
  Existing duplicate-path and logical root/dist alias rejection remains intact.
- HACS/package/Editor plan script filenames must agree. Resource paths must name
  that same script; legacy plan /hacsfiles/atlas prefixes remain supported.
  Script custom element, Card type and default type use the exporter derivation.
- The Reader returns an importable result only with approved complete readiness.
  The actual Editor handler independently checks readiness immediately before
  adoption. It cannot apply a stale importable flag with a blocked report.
- The first stricter gate exposed an existing false report for valid one-word
  filenames: temperature.js legitimately derives temperature-card. The check now
  uses the exporter normalizer, also preserving numeric-prefix filenames.
  Rejection retains available diagnostics rather than replacing them with pending
  metadata checks. Existing malformed-entity diagnostics still pass.
- All 418 package tests pass, including 40 new JSON/YAML ambiguity/identity and
  actual shipped file-handler regressions. The new fixture initially expected
  an untrimmed field ID even though the plan creator normalizes IDs; it was
  corrected before final results. Literal authored Entity names retain their
  separate existing source-based regression coverage.
- Full workspace build, source/bundle syntax, two package preservation tests and
  canonical comparison of 515 files in each App copy pass. The original 23
  ambiguity fixtures remain byte-identical; seven additional identity/one-word
  fixtures yield 26 blocked and four valid cases per host locally. All 32 previous
  CRC fixtures keep expected outcomes, and four original name archives still
  reexport byte-identically. No persisted data migration is introduced.

Native update/qualification and final three-backup retention are pending at
this implementation commit. Public DE/EN/FR documentation will record final scope.
