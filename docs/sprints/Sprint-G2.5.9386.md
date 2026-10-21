# Sprint G2.5.9386 - Distinguish partial draft saves from local write failures

2026-10-21. App 0.1.330, reference Editor 0.2.0-alpha.111. Only .68 with HA
2026.10.2 is tested; .177 and the cloned Runtime integration URL remain untouched.

## Implementation

The local-draft store confirms the session write intent and tab pointer by
reading back their exact values after writing. Its save result includes the
transient sessionRecoveryAvailable boolean, never stored in the draft record.
Failed or silently ignored session writes and unreadable session values report
false after a successful local write. Local validation/write/read failures still
throw instead of claiming a saved draft. Stale-marker cleanup failure alone is
harmless once the pointer is confirmed and creates no false partial-save result.

The Editor passes partial status to a separate DE/EN/FR notice: draft saved
locally, tab recovery unconfirmed, export before reload/close and select the
matching local source manually later. The existing local-save error remains
distinct. Notice state is retained across language changes and project-list
refreshes, and translated again in the selected language. Choosing an empty
draft does not dismiss it. A subsequent fully confirmed save clears the notice.
The notice is an aria-live status output and opens the shared-project section.

Access to the sessionStorage getter is isolated from local store construction.
If that getter is denied, the persistent draft store still works without a session
and reports partial recovery, rather than disabling the local store as in 0.1.329.
No project record schema migration, source deletion, automatic recovery or changed
credential boundary is introduced.

18 focused draft tests and 24 combined frontend tests pass, including quota,
SecurityError, read denial, silent no-op writes, missing session, intent-only
failure, harmless cleanup failure, retry recovery and local-write error priority.
All 431 HA-package tests, Workspace build, JavaScript syntax and two packaging
tests pass. The 522-file package mirrors match exactly. Source ea4a980d passes
GitHub CI; package deebb65 publishes App 0.1.330 separately.

## Backup

Evidence: `C:/Users/rockb/source/backups/atlas-session-warning-0330-68-20261021`.
Git archives, settings/projects/plugins/trash snapshots and ten file copies
precede changes. Fresh encrypted full HA backup 205c94c3, ATLAS 68 vor
Sitzungswarnung 0.1.330 2026-10-21, completes at 20:36 local, 142.51 MB.
Inventory includes HA settings/history 2026.10.2, share/media/SSL, ATLAS 0.1.329,
Get HACS 1.3.1 and Matter Server 9.2.0. No full archive PC copy or restore is
claimed. The complete original Editor and all 31 pre-existing draft sources are
individually exported before the App update; original sources are not rewritten.

## Native qualification on .68

App 0.1.330 is installed through the normal HA App controls. A disposable,
unregistered two-file probe page loads the unchanged installed Editor bundle.
Only that page instruments Storage methods/getters; no browser permissions or
privacy settings change. Its bounded, uniquely prefixed filler reaches actual
native quota failures, including failure to extend a value by one character.
Installed bundle/module hashes still match after the test.

Seven cases pass: full session with no pointer, full session with an existing
pointer but failed pending intent, blocked session writes, blocked session reads
and writes, blocked session getter at startup, blocked local writes and full
local storage. The native filler values total 10,473,606 / 10,473,576 UTF-16 bytes
for the two session cases and 10,421,792 for the local case; these are measured
test values, not universal browser limits or complete storage accounting.

Successful local writes show the partial-recovery notice, including when the
getter is denied. DE/EN/FR switches, project-list refresh and empty-source
inspection retain it. Export succeeds. Reload under session quota requires
explicit manual recovery; its full export matches. Releasing the fault alone
does not clear the warning; a successful intent-plus-pointer save does. Local
write errors keep their distinct failure notice, preserve the prior record
byte-for-byte and allow exporting the current in-memory project.

All 31 pre-existing raw draft records remain byte-equal at every inventory
checkpoint, with independent pre-update exports as the original project baseline.
Five original Editor configurations are restored through normal import controls;
their complete exports match except generated createdAt. All filler entries are
removed on all five pages (local/session counts zero). Their tabs are closed.
Owned test recovery sources and PC exports are retained rather than purged.

The owned server project is removed and original project-store bytes restored.
Seven original projects, six plugins, connection/management/Terminal settings,
19 old trash entries and ten file hashes pass final comparison. Only the owned
two-file fixture folder enters recoverable trash. App/ref-plugin version and
update metadata are the expected changes. App startedAt is unchanged after the
update: no additional App or HA restart is triggered by fault tests. The Runtime
integration is never opened or redirected; .177 is not accessed.

No forced browser-process crash, operating-system disk fill, different browser,
or arbitrary privacy-policy failure is qualified by this run.

## Retention and documentation

Only oldest disposable full backup 4b8e929f (Custom backup 2026.10.2, 142.34 MB,
21 October 19:38) is removed under the user's standing test-retention instruction.
The unfiltered HA list confirms exactly three full backups: 205c94c3 (142.51 MB),
fe0f6a0e (142.45 MB) and c0f15050 (142.39 MB). No additional full PC archive of
the removed backup is claimed. PC evidence and installed updates are retained.
All owned browser tabs are closed. Screenshots and final comparisons are stored
in the evidence directory above.

DE/EN/FR Card Editor and development-status documentation explain the new notice,
manual recovery and the native qualification boundary. Source roadmap records
this finding as completed rather than retaining it as an open task.
