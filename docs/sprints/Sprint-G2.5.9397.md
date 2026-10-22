# Sprint G2.5.9397 - Complete mobile shared-project conflict and Wi-Fi loss

2026-10-22. App 0.1.334 retained. Only .68 is accessed; .177 and the Runtime
integration's existing address are untouched. Documentation and cleanup only;
no new runtime version or additional test series.

## User-observed device outcomes and independent server check

After 0.1.334, the user confirms both devices loaded the shared project and the
explicit confirmation was visible. Chrome on Blackview BV6200 Pro (Android 14 /
DokeOS 4.0) and Samsung Tab A6 (Android 11 / LineageOS) is the agreed context.
The phone saves mobil-konflikt-handy.js; the tablet's stale preview reports a
conflict and retains mobil-konflikt-tablet.js. A read-only backend snapshot
confirms revision 2 and the phone script, with no tablet overwrite.

The prepared phone procedure changes to mobil-konflikt-handy-offline.js, requests
a local export, opens save preview online, disconnects WLAN and confirms.
The user reports an error, preserved offline script and successful reconnection.
The complete project entry after reconnection equals the earlier confirmed
revision-2 snapshot exactly, including timestamp and fields. The offline save
did not modify the server. This is transport loss before write, not a controlled
post-write/pre-ack failure. No retry-save success or latency benchmark is claimed.
Device outcomes are user-reported; server preservation is separately verified.

## Preservation and cleanup

Evidence: C:/Users/rockb/source/backups/atlas-mobile-conflict-complete-68-20261022.
Source/docs archives, complete pre-cleanup project store, guide HTML, backend
snapshots and selected config files are retained. Existing fresh qualification
full backups ffcc1aac and dbc776c2 are retained; no extra test is introduced for
cleanup. All seven original project entries equal the pre-test snapshot in full.

Only atlas-mobile-conflict-20261022 is removed from the project store after an
exact current-entry check against the confirmed revision-2 snapshot and a second
read-before-write guard. The normal File Studio write flow preserves every other
entry; the entire original store and actual test result remain on PC. No public
project-delete API exists. Only the exact owned guide folder moves to recoverable
File Studio trash. The own dashboard atlas_mobilkonflikt / atlas-mobilkonflikt
is removed through normal HA dashboard management, including its iframe card.

Final comparison passes: App 0.1.334, seven original projects, six plugins,
connection and Terminal settings, and ten remaining selected original files.
lovelace_dashboards differs only by removal of the owned item; its own storage
file disappears. Core config entries and other selected HA files remain intact.
All previous 28 trash entries remain; only the owned guide adds entry 29.
No mobile draft store or downloaded export is cleared. The existing desktop
sources are untouched; no Editor apply is performed during cleanup.

## Retention and documentation

After concrete user confirmation, only older full backups fe84e19f (143.01 MB)
and dfc0c05c (142.99 MB) are deleted. The unfiltered HA list retains exactly
ffcc1aac, dbc776c2 and a0ca4a9e. PC backups and installed updates remain.

DE/EN/FR Card Editor and development-status pages replace pending status with
the confirmed outcomes, independently checked server state and test boundaries.
The roadmap closes this qualification without claiming all network failures
or production readiness have been covered.
Local npm documentation build and the 198-page UIX example/link/language check
pass. Documentation commit: 9248e4f. Final server/data comparison and the exact
three-backup list are saved in the evidence folder; agent-owned mobile test
helper tabs are closed.
GitHub documentation workflow 39792318657 is still queued at completion;
publication is automatic after that workflow runs. No completed deployment or
public-page verification is claimed for this increment yet.
