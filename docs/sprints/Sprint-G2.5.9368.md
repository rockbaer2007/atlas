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

Native update/import qualification is pending at this implementation commit.
After completion, retain three complete HA backups per test host, preserve
installed updates and existing data, and update DE/EN/FR public documentation.
