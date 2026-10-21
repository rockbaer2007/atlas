# Sprint G2.5.9389 - Independent draft recovery after configuration file import

2026-10-21. App 0.1.331, reference Editor 0.2.0-alpha.112. Tests are limited
to .68 with HA 2026.10.2; .177 and the cloned Runtime integration remain untouched.

## Implementation and local verification

The confirmed normal JSON whole-configuration Import handler now enrolls the
imported Editor project in per-tab draft persistence even without a prior shared
project. The first import into a normal workspace still retains its previous
whole-configuration/settings persistence behavior. Afterwards this tab's edits
use the local draft store. The global profile workspace can therefore still show
the last import; its separate tab recovery source is preselected after reload
and requires explicit preview/backed-up apply. No automatic draft application is
introduced, and this change does not claim per-tab storage of every global setting.

saveNew validates a project, refreshes the confirmed tab pointer and allocates a
new independent source. A later import in the same tab never overwrites the
previous writable record. Ordinary edits then update only the new record. Failed
new-record writes cannot route retries into the old record. The refreshed pointer
also links an interrupted later import to the correct predecessor. Credentials
remain excluded; local failure and partial session-recovery notices are retained.
No existing source is migrated or deleted and no record schema changes.

Five regression tests cover two imported tabs, repeated imports, invalid-input
retention, a later-import write interruption, quota/retry preservation and blocked
session recovery (several cases share a test). All 29 frontend tests, 431 HA-package
tests and 43 App checks pass, as do Workspace build and JavaScript syntax.
Both 522-file package mirrors match canonical sources. Product eb2239f6 and
separate package 613fdba are pushed; product GitHub CI passes.

## Safety backup

Evidence: `C:/Users/rockb/source/backups/atlas-file-import-drafts-0331-68-20261021`.
Source/docs Git archives, backend settings/project/plugin/trash snapshots and ten
file copies precede edits. Fresh encrypted full HA backup 4dc22ce1, ATLAS 68 vor
Dateiimport-Entwürfen 0.1.331 2026-10-21, completes at 21:37 local, 142.7 MB.
Its UI lists HA settings/history 2026.10.2, share/media/SSL, ATLAS 0.1.330,
Get HACS 1.3.1 and Matter Server 9.2.0. No full archive PC download/restore claim.
The source profile's 48 old raw draft sources and complete Editor export are
secured separately. The ATLAS Test profile has zero draft sources; its complete
initial configuration is exported too. Prior failing-case A/B export files are
copied unchanged into this evidence folder for the native regression.

A running Supervisor update appears during HA's update search and completes
without agent initiation. Only the ATLAS 0.1.330-to-0.1.331 App update is requested
through the normal HA update controls. No unrelated update is started.

## Native .68 verification and restoration

The unchanged A/B configuration files from the failing 0.1.330 case now create
separate sources in two ATLAS Test tabs. After reload, each source is preselected;
explicit Inspect local draft / Back up and apply restores the complete expected
configuration. Full exports match the respective source except export createdAt.
Reverse-order imports and repeated import in one tab retain earlier sources and
recover the correct new source. Cancelled and invalid imports change neither the
configuration nor the draft inventory.

Two additional disposable fixture tabs inject failed Storage writes only in
their own page realm. Blocked session writes retain the imported local source and
show the partial-recovery warning. A later successful import clears the warning,
creates a new pointer and recovers correctly after reload. Blocked local writes
leave the in-memory imported configuration exportable and existing raw records
unchanged. The successful retry receives a new source instead of overwriting its
predecessor. These native cases simulate blocked writes; they are not a new actual
quota-exhaustion test or forced browser-crash test. Interrupted later-import and
quota/retry cases are covered by the local regression tests above.

Both complete original profile configurations are restored, including all four
test workspaces and the target profile's global workspace. All 48 pre-existing
source-profile raw records remain byte-identical. The initially empty target
profile retains 20 newly generated test/recovery sources as additional backups.
All 15 sources present before restoration retain identical project content;
one active test record's updatedAt changes during cleanup, so raw-byte equality
of all new test sources through cleanup is not claimed. No source is purged.

The final backend comparison preserves seven server projects, six plugins, ten
file hashes, connection/management/Terminal settings and all 22 pre-existing
trash entries. No server test project was created. The fixture's own two files
are archived on the PC and its directory is moved to File Studio trash, resulting
in 23 entries. Native installed bundle/module hashes remain unchanged by the
fixture. ATLAS's startedAt is unchanged after the installed update: no additional
App restart occurs during the tests. HA remains 2026.10.2. .177 is never accessed
and the pre-existing Runtime integration URL is not changed.

Oldest disposable full test backup 205c94c3 (20:36, 142.51 MB) is removed under
the user's standing test-system retention authorization. Exactly three complete
backups remain in the unfiltered HA list: 4dc22ce1, f504403a and 7556d862.
PC backups and installed updates remain. No additional PC full-archive copy of
the removed backup is claimed. All five own Editor fixture tabs and the own
verification/HA backup tabs are closed; user tabs are retained.

Evidence includes before/post-update/after snapshots, both complete profile
exports, draft inventories, native recovery exports, fixture hashes/cleanup
receipt and three-full-backups.png. verify.mjs passes and writes
verification-summary.json. DE/EN/FR Card Editor and development-status pages
document the fix, explicit recovery contract, native outcomes and test limits.
