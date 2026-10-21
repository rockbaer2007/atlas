# Sprint G2.5.9381 - Full Chrome restart and independent draft recovery on .68

2026-10-21. Chrome 155.0.8059.82 on Windows. App 0.1.328 / reference Editor 0.2.0-alpha.109 / HA 2026.10.2
remain unchanged. This is qualification, not a code or package update.
Only .68 is accessed; .177 and the cloned Runtime integration URL are untouched.

## Backup and test scope

Evidence: `C:/Users/rockb/source/backups/atlas-browser-session-68-20261021`.
Git archives, private baseline snapshots and ten original file copies precede
changes. Fresh encrypted full HA backup 4a3e1395, displayed as Custom backup
2026.10.2, is complete at 19:14 local time (142.29 MB): HA settings/history,
share/media/SSL, ATLAS 0.1.328, Get HACS 1.3.1 and Matter Server 9.2.0.
No full archive PC download or restoration is claimed.

The user closes their other Chrome pages before the test; inventory then shows
only the owned .68 backup page. A separate profile was initially proposed, but
is not used. The actual check uses the connected normal Chrome profile, whose
.68 Editor initially has zero fields and no local draft records in its picker.
The complete original Editor is exported and checked on PC before opening the
test project. No browser storage is injected, deleted or read through hidden APIs.

One owned server project, atlas-browser-session-68-20261021, revision 1, has one
passive sun.sun Entity field. Two Chrome tabs open it through normal preview,
workspace backup and explicit apply. A and B receive different unsaved names;
their visible local-draft IDs are different. Both complete Editor exports and
the selected IDs are saved on PC before restart. The backup tab is closed, so
only the two .68 Editor pages remain before the user's restart action.

## Full process restart and session recovery

The user opens a new tab and executes chrome://restart, then confirms the
restart. Read-only OS process metadata verifies that Chrome's main process is
replaced (PID 22800, created 13:19:51, to PID 14752, created 19:19:13 local time).
The extension reconnects with a new browser session and new tab IDs. Both .68
Editor pages and their group are restored; only the user's blank new tab is
present in addition. No unrelated HA page is restored or accessed by the agent.

Each restored Editor initially displays the original empty local workspace,
as expected: recovery remains explicit. Its Local drafts selector preselects
exactly its own previous ID, not the other tab's more recent draft. Both IDs
match the saved pre-restart values. Normal Inspect local draft previews the
correct A/B name and one field. Back up and apply restores each draft.

The complete before/after Editor exports compare equal except createdAt for
both tabs. Sources remain available after recovery forks; A can explicitly
select B's original source and preview B without changing A's workspace. The
server project remains revision 1 / Base throughout. All seven original API
project records compare unchanged before restart, after restart and cleanup.
HA auto-connect is visible with 32 live entities on the restored Editor pages.

This qualifies one orderly Chrome restart with automatic session restoration
and manual draft selection. It does not qualify an unexpected crash, forced
process termination, OS restart, power loss, deleted storage or device migration.
Session restoration is browser-dependent; separate exports remain recommended.

## Cleanup, preservation and retention

Normal Import/confirmation restores both Chrome workspaces to the initial
complete export. Both compare equal except createdAt. The original main local
configuration remains separate from shared drafts. Test exports and recovery
sources remain available; no existing draft or browser storage is purged.

After verifying seven unchanged originals and exactly one owned extra project,
the existing permitted File Studio write route restores the original project
store bytes with its normal safety history backup. Only the owned active server
project is removed. No dashboard, HA entity, resource, plugin, capability or
Runtime entry is changed. Automatic safety backups/history are preserved.

Final capture passes for seven projects, six plugins, connection/management and
Terminal settings, old trash and ten file hashes, including the project store
and HA entry registry. App 0.1.328 remains running; there is no App/HA restart.

Under the user's disposable-test/three-backup rule, only oldest full backup
05de4b62 (ATLAS 68 vor HA-Kompatibilitätsmatrix 2026-10-21, 141.48 MB, 17:41)
is removed. The final unfiltered list has exactly three completed full backups:
4a3e1395 / 8d09b5cd / 38b3c094. Installed updates and PC backups remain.
No additional PC full-archive copy of the removed backup is claimed.

All owned test tabs are closed after restoration; the user's new tab is left
alone. DE/EN/FR Card Editor and development status docs record the passing
restart and its limits. The roadmap advances to unexpected-browser-abort
qualification in a separate disposable session. No product version bump is
needed for this documentation-only increment. Docs build and both repository
diff checks pass before the separate commits/pushes.
