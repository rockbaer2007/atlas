# Sprint G2.5.9362 - Preserve literal Entity names before normalization

2026-10-18. App 0.1.320; HACS integration remains 0.1.306.

## Backup and scope

Before edits, full Git bundles for ATLAS, the App repository and external docs
are saved at `C:/Users/rockb/source/backups/atlas-literal-entity-names-20261018`.
No HA host is contacted or changed. Only .177/.68 are authorized network test
targets; both remain at the previously qualified App 0.1.319. User roadmaps and
untracked docs work are preserved. No settings, files or projects are migrated.

## Correction

- The parser retains explicit `type: entity` name strings verbatim, including
  empty, whitespace-only and outer spaces/tabs. A missing/non-string name still
  uses the existing fallback. Other card families retain their existing behavior.
- The existing raw Entity/Conditional Editor path preserves these strings through
  draft serialization, generation, Card packages and HACS without additional
  storage changes. Deliberate renaming and entity selection still work.
- Previously normalized names cannot be reconstructed automatically: reimport
  their original source or backup. UI field labels may use a compact display
  label; the raw exported Entity name is the authoritative preserved value.

## Verification

- 32 new original-source tests fail before the parser correction, reproducing
  the exact loss independently of the previous post-normalization oracle.
- 37 new tests cover four literal names in JSON/YAML, standalone and nested
  Conditionals, draft reload, actual Editor conversion, Card package reimport,
  eight HACS archive roundtrips, missing-name fallback and deliberate renaming.
- All 296 Home Assistant package tests pass. Full workspace build, source and
  generated bundle syntax checks, package preservation tests and canonical App
  synchronization checks pass. No local web/HA server is started.
- DE/EN/FR docs distinguish the local 0.1.320 fix from the qualified native
  0.1.319 state. External docs build passes. App copies have matching 0.1.320.

Next: qualify the update on .177/.68 after fresh full backups, including actual
browser imports, exports and reload, restoring original local Editors afterward.
