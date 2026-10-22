# Sprint G2.5.9394 - Complete real mobile draft qualification

2026-10-22. No runtime/package change: App 0.1.333 remains installed. Only .68
is accessed. .177 and the existing Runtime integration URL are untouched.

## User-reported actual-device result

The user confirms Chrome on phone and tablet: selection, search, tab association,
portrait/landscape and explicit separate restoration of A and B all work.
Devices from the agreed qualification: Blackview BV6200 Pro, Android 14/DokeOS
4.0, and Samsung Tab A6, Android 11/LineageOS. These are user-observed results,
not remotely instrumented Android measurements or a new Companion/iOS test.

Initially zero local sources meant no server project had yet been applied in
that browser. The user subsequently confirmed successful A apply, one local
source, then B in a second tab with both sources and correct tab association.
The reported opening failure did not reproduce: native read-only preview of
the selected A project succeeded; the user also reached that preview and applied
it successfully. No speculative additional runtime fix was introduced.

## Preservation and cleanup

Evidence: C:/Users/rockb/source/backups/atlas-mobile-draft-complete-68-20261022.
Source/docs archives and a complete backend/project/selected-file snapshot are
saved before cleanup. Existing fresh full backup a0ca4a9e from this qualification
is retained. No new test or new full-restore claim is introduced during cleanup.

Only atlas-mobile-drafts-a-20261022 and atlas-mobile-drafts-b-20261022 are removed
from the project store after exact comparison with the original fixture entries.
The entire pre-cleanup store and both entries remain secured on PC. There is no
public project delete API, so the existing File Studio write flow updates only
these two IDs with a read-before-write guard. All seven original entries retain
their complete contents, revision and timestamps.

The exact own one-file guide folder atlas-mobile-drafts-20261022 moves to
recoverable File Studio trash. The own HA dashboard atlas_mobiltest_20261022,
path atlas-mobiltest-20261022, is removed through normal dashboard management.
No original dashboard or resource is touched. HA's delayed storage flush is
awaited before final comparison: lovelace_dashboards differs only by this entry;
its own dashboard storage file disappears. Core config entries, settings,
automations/scripts/scenes and other selected files match the before snapshot.

Final backend comparison passes: App 0.1.333, seven original projects, six plugins,
ten selected remaining files, connection settings and Terminal configuration
preserved. The previous 26 trash entries remain; only the guide adds entry 27.
Device-local drafts/exports are retained; no access to or clearing of mobile
browser storage is attempted. The existing 39 PC sources were not applied or
modified during cleanup. Temporary links intentionally cease to exist.

## Backup retention and docs

After the user's concrete confirmation, only c9456330 and 4dc22ce1 are deleted.
Keep the three newest full backups a0ca4a9e, fe84e19f and dfc0c05c. PC evidence
and installed updates remain. The unfiltered HA backup list is checked.

DE/EN/FR Card Editor and development-status pages now record the successful
user qualification, device versions and cleanup, replacing the pending status.
Documentation-only increment: no package version bump is necessary.
Local npm docs build and the 198-page UIX example/link/language check pass.
Documentation commit: a15eb4e. Source report: 1cb9edd0.
GitHub documentation build/deploy succeeds; all three public card-editor.html
locale pages return HTTP 200 and include the actual-device result and 0.1.333.
The three-backup screenshot and final before/after comparison are saved in the
evidence folder. Agent-owned guide/sidebar helper tabs are closed; mobile sources
and downloads remain under the user's control.
