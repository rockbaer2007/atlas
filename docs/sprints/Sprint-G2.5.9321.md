# Sprint G2.5.9321 - Tagged HACS Card update and recovery

2026-10-16. Verify real tagged releases, HACS update detection, installation and
manual older-version reinstallation in isolated HA. Pi 5 and Proxmox are neither
queried nor changed. No ATLAS runtime/storage implementation changes.

## Backup and isolation

- Verified ATLAS/documentation/Card Git bundles, both original user roadmaps,
  eight original runtime files and private evidence are retained under
  `C:/Users/rockb/source/backups/atlas-hacs-release-cycle-20261016`.
- `ha-before.tar` SHA256:
  `4a2f32d19c35fde9866eafae9a02672b5100e92a35be2edcd1be3d75c7f29ceb`.
  Clone the stopped Sprint9320 fixture into a new Docker volume/container,
  `atlas-hacs-release-cycle-20261016`, HA2026.10.1/HACS2.0.5, loopback4225.
  The original loopback4224 fixture remains stopped and unchanged. The clone
  retains the previously user-authorized HACS connection; no new grant is made.
- Before updating the tagged baseline, retain `ha-before-update.tar`, SHA256
  `bc5165dd709c3692a548001e700a7580deb21c9c6ce6448bc33eaad8be12f28f`.
  Also retain installed v0.1.1 files before reinstallation in
  `card-v011-before-restore.tar`, SHA256
  `219fee05bdb51950a69708c3ca988d9b791c4b8cc40f47052ca4cc48d40d7759`.

## Real releases and HACS cycle

- Publish [v0.1.0](https://github.com/rockbaer2007/atlas-hacs-delivery-card/releases/tag/v0.1.0)
  at `d62382db47a6901b736ac1b0268d9819e01512c6`, the original exported fixture.
  Install that tag through live HACS before publishing the next release.
- Publish [v0.1.1](https://github.com/rockbaer2007/atlas-hacs-delivery-card/releases/tag/v0.1.1)
  at `50cd6d50a3ed97fd8fe12674d2d92a2e105f6bcc`. Its script has a release
  comment, EN has a versioned title, and DE/FR have manually translated test
  text. README and embedded package metadata match. The editor plan, three
  fields, geometry, generated configuration and entity IDs remain identical.
  Reconstructing and importing the candidate bundle passes readiness checks.
- Both releases retain script/locales in dist, without standalone JS assets.
  All four unauthenticated GitHub runtime responses match the tagged Git blobs.
- Refresh repository information in the HACS UI. HACS reports installed v0.1.0,
  available v0.1.1 and a pending update while installed bytes remain v0.1.0.
  Redownload the offered v0.1.1, then accept browser reload.
- All four installed /hacsfiles/ responses match v0.1.1 and differ from v0.1.0.
  The existing module resource ID `313acc32c2d0463b80a9bfbff6903ad2` remains;
  HACS changes hacstag from `1422078272010` to `1422078272011`. Exactly one
  module exists; other resources remain unchanged.
- The actual mixed Core/Bubble/Mushroom Cards render localized headings
  `Wohnzimmer 0.1.1` and `Salon 0.1.1`. The fixture lamp changes off/on/off
  without reloading; both instances receive live state.
- In Redownload, expand Need a different version, select Release v0.1.0 and
  download. HACS explicitly advises backup restoration instead of this selector
  for rollback. This test qualifies manual Card-file reinstallation only.
- After reload, all four files and the complete resource URL equal the v0.1.0
  baseline. HACS confirms installed v0.1.0. Original fallback headings and all
  fields render again; live off/on/off also passes. Restart only this cloned
  HA container. Recheck exact bytes, resource identity, HACS installed version
  and complete rendered Cards: passed. v0.1.1 remains available/pending;
  selected_tag is null, so the old version is not permanently pinned.
- Runtime HACS repository-info is authoritative for stage checks. Its on-disk
  repository store can lag during runtime; no store is patched to force success.

## Preservation and delivery

- Baseline, updated, restored and restored-after-restart comparisons preserve
  72 other HA/dependency files, eight non-HACS HA configuration entries and
  eight original runtime files. Other resources and dashboard remain unchanged.
  Bubble3.4.2/Mushroom5.2.3 are retained. Only the own fixture lamp is toggled,
  with its original off state restored.
- Public DE/EN/FR documentation describes the release/update/reinstall flow,
  backup recommendation, reload requirement, unpinned state and exact scope.
  ROADMAP retains failure recovery and further HACS versions as open work.
- ATLAS stays0.1.309, HA integration0.1.306. Verification/documentation-only
  changes require no product version bump or add-on repository update.
- Retain backups, screenshots and private proof; stop the new test container
  and close its own browser tab after verification. Preserve original fixtures.
- Stopped-volume archive `ha-after-verification.tar` SHA256:
  `f5d99a2b9f4e816f762a509417bc8cf1f2e97cb978f0e3ff562f0fcdc196c6db`.
  Both original user roadmaps match their pre-test SHA256 hashes. Public docs
  build passes with the existing chunk-size advisory; git diff checks pass.

## Boundaries

No failed/interrupted download, low-disk condition, automatic rollback or
migrated-data restoration is qualified. This is not central HACS catalog
submission, another HACS version or native-host installation. Manual test
translations do not demonstrate automatic translation. Final commits, docs
build and GitHub CI outcome are recorded in the task report/private evidence.
