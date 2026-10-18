# Sprint G2.5.9368 - Validate ZIP integrity before HACS Editor import

2026-10-18. App 0.1.322; HACS integration stays 0.1.306.

## Backup and scope

Before edits, Git bundles of ATLAS, the App repository and public docs are saved
at `C:/Users/rockb/source/backups/atlas-hacs-crc-fix-20261018`. Fresh full encrypted
HA backups finish on .177 (3193821e, 138.54 MB) and .68 (71391a3e, 139.73 MB),
both at 14:00 CEST with HA 2026.10.2 and App 0.1.321. Native restore listings
include settings/history, SSL, media, share and all installed Apps. No additional
PC download of these complete HA archives is claimed. Fresh local Editor exports,
405 persistent files on .177, its checked HA/config files and nine approved
HA/config files on .68 are independently captured; seven projects and six plugins
per host remain the baseline. Private .68 plugin files stay covered by its HA
backup, without granting a new file capability.

Only .177/.68 are authorized network/UI test hosts. Local unit/static builds
do not start preview servers or other HA instances. User roadmaps are untouched.

## Correction and local verification

- The initial ZIP inspection validates every stored entry's CRC32 against its
  unchanged bytes, including README, locales and unreferenced extra files.
- Local/central header filenames, flags, methods, CRCs and sizes must agree.
  Directory bounds/counts, local data boundaries and overlapping entry spans
  are checked. Normal ZIP comments remain supported. Invalid archives expose
  neither embedded package content nor an importable summary to the UI.
- Unsupported compressed import entries are refused, including optional extras,
  because their decoded content cannot be CRC-checked by the stored-entry reader.
  Encryption, data descriptors, multi-disk and ZIP64 are explicitly refused.
  This does not add general-purpose ZIP decompression or signature verification.
- All 376 package tests pass, including 52 new JSON/YAML integrity tests. Tests
  use independently decoded ZIP offsets and native zlib CRCs, not the importer
  checksum helper, and assert input immutability and literal-name preservation.
  The first new fixture setup lacked an Editor plan; it was corrected before
  measuring results. No fixture-setup failure is treated as product evidence.
- The full workspace build, source/bundle syntax checks and two package
  preservation tests pass. Both App copies match 514 canonical files at 0.1.322.
- The original failed CRC fixture now rejects locally. All 32 native fixtures
  have their expected local results: 30 blocked, two valid at 112/112. The four
  original literal-name failure ZIPs still reexport byte-identically.

## Native qualification and preservation

Both authorized hosts update from 0.1.321 to 0.1.322 with HA 2026.10.2 after the
fresh full backups above. Only the ATLAS Apps restart; no HA Core restart is
needed. There are 32 actual file-picker imports per host: 30 invalid archives
and two valid original JSON/YAML controls. All 60 invalid imports reject before
adoption. Complete Editor exports remain equal to their baseline after each
rejection and reload. All four valid controls pass 112/112, preserve source cards
including literal empty/spaced names and Conditional conditions, and are followed
by restoration of the original Editor configuration.

`native-results.json` records all 64 distinct host/case results. `verify.mjs`
confirms original Editors restored, source cards exact, fixture hashes unchanged
and existing data unchanged. The final comparison preserves 405 persistent files
on .177, nine approved config files on .68, seven projects and six plugins per
host, including checked management, trash and history data. Private .68 plugin
files retain the full-backup coverage described above. These native controls do
not claim a new native ZIP reexport; byte-identical archive roundtrips are local.

The browser helper timed out at its 30-second tool boundary after all 64 results
were saved and both Editors restored. Fresh recovery tabs completed the remaining
final Editor exports and verification. This tool timeout is not a product fault.
The recovery tabs are closed. No HA dashboard, resource, synthetic entity or WWW
test folder is created by this qualification.

With explicit user confirmation, only old full backups a84e5539 (.177) and
f9df37a6 (.68), both 18 October at 12:46, are deleted. Unfiltered native backup
lists confirm exactly three remain on each host:

- .177: 3193821e, 6cb9f8fc, 62d3a495.
- .68: 71391a3e, a98ca2b0, 66524782.

PC backups and installed updates remain. `deleted-backups.json` and final native
backup-list text/screenshots record the cleanup. DE/EN/FR public documentation
describes the fix, native scope and supported ZIP boundaries.
The VitePress documentation build passes; only the existing large-chunk advisory
is emitted. Main repository and public documentation whitespace checks pass.

## Remaining diagnostic limitation

After a CRC failure, the inventory is discarded and the report also lists
generic missing-file checks. The CRC/integrity cause is correct and import is
blocked; these secondary messages do not demonstrate actually missing files.
Improving that classification is the next documented follow-up, not an open
integrity bypass. CRC32 detects corruption, not package authenticity.
