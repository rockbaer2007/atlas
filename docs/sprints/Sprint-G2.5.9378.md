# Sprint G2.5.9378 - HA 2026.10.2 compatibility checkpoint on .68

2026-10-21. Integration 0.1.306 / App 0.1.327 unchanged. Only .68 is accessed;
.177 is neither queried nor modified. HA already runs the latest available
stable 2026.10.2; no downgrade, HA update or invented migration is performed.

## Preservation and real-host qualification

Evidence: `C:/Users/rockb/source/backups/atlas-ha-matrix-68-20261021`.
Git archives, original Editor JSON, private config-file copies and settings/
plugin/project snapshots precede changes. Fresh encrypted full backup 05de4b62
(141.48 MB) contains settings/history, share/media/SSL and all three Apps,
including ATLAS 0.1.327. No full archive PC download or backup restore claimed.

The cloned ATLAS integration initially points to .177:4176. The user explicitly
authorizes temporarily changing its Options URL to .68:4176, then restoring it.
Embedded Hub, Administration and Editor load on .68. Editor connects to 32 live
entities; search finds sun.sun. No .177 iframe is opened. Protected plugin
directories remain protected; no File Studio capability is expanded.

Two small passive Core/Conditional projects use only sun.sun. Actual ZIP
selection, Worker validation and explicit application pass 112/112 for JSON and
YAML. Local Save group and reload preserve the three fields and nested state_not
condition. Both actual browser exports are selected again and imported with
112/112; re-exports are byte-identical: JSON 29115 bytes, YAML 28846 bytes.
The canonical UI exports use the existing EN/DE Card language selection; an
additional EN/DE/FR diagnostic export is not part of that byte comparison.
Browser download warnings are confirmed by the user, never bypassed.

A real HA Core restart closes the open direct Editor connection (1006); the
automatic retry reconnects without reload or manual Connect. The App remains
available and the test Editor data survives. This is functional qualification,
not timing, stress, native ARM64 or leak measurement.

## Cleanup and comparisons

Original Editor JSON is imported through its normal confirmation dialog. A fresh
export equals the entire original object except createdAt; Auto theme and the
original Card language choices are restored. No server project, HA dashboard,
resource, integration package, synthetic entity or WWW fixture is created.

After the HACS cycles the Options UI restores the original effective Runtime
URL to http://192.168.178.177:4176/. The panel is not reopened afterwards.
HA stores an explicit identical option and refreshes modified_at. Comparison
permits exactly those two own-entry changes; all other entry content, entry ID,
data and schema match. Administration's updatedAt changes when opened; every
effective setting matches. Eight other captured files are byte-identical.
All seven shared projects, six plugins, management state, Terminal settings,
existing trash and HA/App versions match the original snapshots.

Under the user's explicit disposal/three-backup instruction for these test
systems, only oldest own test backup 538b69e2 (140.02 MB, 2026-10-19 15:21) is
removed. The final unfiltered inventory has exactly 05de4b62/e1a698d2/5a0986d5.
PC backups and installed updates are retained; no extra PC full copy of the
deleted archive is claimed. .177 backup retention is not touched.

## Verification and public scope

Six frontend panel tests, 431 Home Assistant package tests and workspace build
pass. CI matrix adds 2026.10.2 beside 2026.9.4/2026.10.1; all three eleven-test
contract jobs and the build job pass in run 39629349433 (commit f72dac71).
The 2026.10.2 contracts also pass locally in the official image with network
disabled, digest 33afb0659d786213264c2211f8d91c5fe87461c56eba6a3a546eb05fc71e89f4.
Docker initially was stopped; the user started it and the local run completed.

Matrix and DE/EN/FR public frontend documentation distinguish exact tested
combinations, local persistence, Card ZIP roundtrips and actual running-HA checks
from CI mocks. HACS repository installation/release rollback, Supervisor restore,
broader HA ranges and future real data-schema conversions are not newly claimed.
No product code/package change: no App or integration version bump is needed.
DE/EN/FR VitePress production build and both repository whitespace checks pass.
