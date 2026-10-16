# Sprint G2.5.9322 - Failed and interrupted HACS Card updates

2026-10-16. Qualify reported download failure, hard process interruption and
safe recovery in isolated HA. Pi 5 and Proxmox are neither queried nor changed.
No ATLAS runtime or data schema changes; App0.1.309/integration0.1.306 remain.

## Backup and fault scope

- Retain ATLAS/documentation Git bundles, both user roadmaps, original runtime
  files and full HA configuration archive under
  `C:/Users/rockb/source/backups/atlas-hacs-update-failures-20261016`.
- `ha-before.tar` SHA256:
  `f5d99a2b9f4e816f762a509417bc8cf1f2e97cb978f0e3ff562f0fcdc196c6db`.
  This is the stopped v0.1.0 fixture snapshot from Sprint9321, not a native HAOS
  backup archive. Clone into new volume/container
  `atlas-hacs-update-failures-20261016`, loopback4226, HA2026.10.1/HACS2.0.5.
  Earlier fixtures stay stopped and unchanged. Private generated test-account
  and existing authorized HACS credentials remain local to isolated fixtures.
- Inject a narrow test seam into only the cloned HACS repository download
  method, scoped to rockbaer2007/atlas-hacs-delivery-card. Preserve original
  source/hash. The JS still downloads from real GitHub and is written by HACS.
  Locale downloads then return None (reported failure), or pause until an
  external container kill. Actual HACS backup, validation, restore, metadata,
  resource and file-writing logic execute normally. This is not an unchanged
  end-to-end physical network outage test. No global network/firewall changes.

## Reported download error

- Baseline: exact four v0.1.0 runtime files, installed_version v0.1.0, original
  module identity and other resources retained.
- Through the real HACS UI, redownload offered v0.1.1. The new script is written
  before all three locale requests fail. HACS displays a failed-download error.
- HACS automatically restores all four original v0.1.0 files and complete
  resource URL, retains installed_version v0.1.0 and cleans its temporary backup.
  Browser renders both complete mixed Core/Bubble/Mushroom Cards again.

## Hard interruption and recovery boundary

- Repeat v0.1.1 download with locale tasks paused after actual new JS write.
  Confirm new script hash equals v0.1.1, three locale HTTP404 responses and
  installed_version still v0.1.0. HACS has moved the old directory to
  /tmp/hacs_backup/atlas-hacs-delivery-card before downloading.
- Kill only the new test container. Copy its temporary backup to private PC
  evidence; all five files (including compressed JS) match the pre-test archive.
  Restart the same container: new JS and three missing locales persist. HACS
  does not automatically restore the interrupted directory on startup.
- The Card remains visible via embedded EN fallback, even though its installed
  files are incomplete. Rendering and the HACS version label alone are therefore
  insufficient integrity checks. No automatic crash rollback is claimed.
- Disable fault injection. Use the normal HACS UI version selector to reinstall
  v0.1.0. All four files, full module URL and installed metadata match baseline;
  other resources remain unchanged. Reload renders both complete Cards. HACS
  still advises restoring a backup rather than using this selector for rollback.

## Independent full snapshot recovery

- Extract the pre-test archive into another new empty volume,
  `atlas-hacs-update-recovered-20261016`. Compare all 2,500 regular files against
  archive bytes before HA starts: exact. No fault markers; HACS source equals
  the original uninstrumented source byte for byte.
- Stop the fault-test instance; start only the restored-volume instance at the
  same loopback4226 address. Refresh private test authentication, check real
  /hacsfiles/ responses and HACS repository-info: all four v0.1.0 files, module
  identity/URL and installed_version restored; no duplicate or changed other
  resources. Browser login after restore uses the existing test account.
- Verify rendered Cards and live fixture lamp off/on/off, preserving original
  off state. Compare 72 other HA/dependency files, eight non-HACS configuration
  entries and eight retained original runtime files at baseline, after reported
  error, after interrupted restart, after HACS retry and after snapshot restore:
  unchanged. Both user roadmaps are retained unchanged.

## Documentation and limits

- DE/EN/FR public Card documentation distinguishes automatic recovery of reported
  errors from absent automatic crash repair, explains full-package reinstallation,
  independent backups and the visible EN-fallback trap. ROADMAP retains broader
  network/storage variants, HAOS restoration and other HACS versions as open work.
- Only controlled failure and one process-kill boundary are qualified. No full
  disk, hardware power-loss, arbitrary network outage or native HAOS restore is
  simulated. Temporary HACS backup is not a durable replacement for a full backup.
- Preserve evidence and volumes; stop both own containers and close their own
  browser tab after proof. Product versions/add-on repository remain unchanged.
  Build, final commits and GitHub CI result are recorded in the task report and
  private evidence.
