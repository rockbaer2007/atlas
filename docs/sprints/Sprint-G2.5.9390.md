# Sprint G2.5.9390 - Browser termination during a repeated file-import draft save

2026-10-22. App 0.1.331, reference Editor 0.2.0-alpha.112, HA 2026.10.2.
Only .68 is accessed. .177 and the existing Runtime integration are untouched.
This is native qualification of existing behavior; no product or package update.

## Backup and scope

Evidence: `C:/Users/rockb/source/backups/atlas-import-crash-68-20261022`.
Source/docs Git archives, complete original Editor export, all 20 original raw
draft sources in the ATLAS Test Chrome profile, backend snapshots and ten file
copies are secured. Fresh full HA backup c9456330, ATLAS 68 vor Dateiimport-
Browserabbruch 0.1.331 2026-10-22, completes at 13:02 local, 142.91 MB. Its UI
lists HA settings/history 2026.10.2, share/media/SSL, ATLAS 0.1.331, Get HACS
1.3.1 and Matter Server 9.2.0. No complete archive PC download/restore claim.
Browser-local drafts require their own backup; HA full backups do not cover them.

Two own fixture tabs load the unchanged installed native Editor bundle and draft
module. An unregistered three-file fixture directory adds a visible inventory
export and a one-shot hook for the uniquely named A Next test project. It neither
registers a plugin nor changes permissions, resources, dashboards or credentials.
The fixture copies the live HTML with a base URL and wraps Storage.setItem only
in its own page realm. A and B use ordinary complete JSON configuration imports;
their complete baseline exports match their respective files except createdAt.

## Actual interruption and recovery

Two preparatory halt attempts complete without a process crash: the automated
dialog flow advances the first, and the user confirms the second too quickly.
Neither is counted as interruption evidence. A is reset to its complete baseline
before the final attempt; all earlier sources are preserved.

The final native repeated import is paused after the real localStorage record
write returns and before the native store updates its session tab pointer.
A beacon records and validates the new record, old pointer and pending intent
while a blocking alert remains open. The user confirms the halt dialog is open,
then force-terminates Chrome. An OS process inventory confirms zero chrome.exe
processes before the user reopens the ATLAS Test profile and restores its session.
The normal profile shares Chrome's main process; the user reports only YouTube
there and is informed that it will also close. No other HA page is tested.

The restored A pointer is still its predecessor 9922b69542a22235ddacf8d9e8d83c21.
Its pending intent names new record 122b2ee7d4df018716e329a36e627df2 and matches
the journal timestamp. B retains pointer 3d8e3f9188ace29097d5972c2551d6a4.
The newer A source is offered for explicit inspection; no foreign offer appears
in B. The shared profile workspace initially shows B, as documented, rather than
silently applying A. Cancelling A's recovery preview leaves its complete export
unchanged. Explicit backed-up apply recovers A Next; separate inspection/apply
recovers B and the A predecessor. All project content and configuration fields
match their respective imports. Export createdAt differs, and apply selects the
first card (selectedExpertFieldIndex 0 rather than the imported -1); neither is
reported as byte-identical complete exports.

This is one controlled process-termination boundary between two native writes.
It does not interrupt the atomic localStorage primitive itself, simulate power
loss, disk failure or storage deletion, or qualify every possible crash timing.
No new HACS, HA restart or network-outage qualification is claimed.

## Restoration, cleanup and retention

Both test workspaces and a fresh normal Editor workspace import the complete
original configuration. Full exports match editor-before.json except createdAt,
including after normal reload. All 20 original raw draft records remain byte-
identical. The final inventory has 32 sources; new owned test/recovery sources
are retained as additional recovery material, not purged. All own Editor and HA
verification tabs close; the user's blank tab remains.

The own three fixture files are archived on the PC and their directory is moved
through File Studio into recoverable trash. Native installed bundle/module hashes
remain unchanged. Final comparison preserves seven server projects, six plugins,
ten file hashes, connection/management/Terminal settings and all 23 original trash
entries; only the own fixture adds entry 24. App startedAt and HA version remain
unchanged. .177 is not accessed, and Runtime's original URL is not modified.

The oldest disposable full test backup 7556d862 (21 October 21:09, 142.58 MB) is
removed under the standing test-system retention authorization. The unfiltered
HA list confirms exactly three full backups: c9456330, 4dc22ce1 and f504403a.
PC backups and installed updates remain; no extra full PC archive of the removed
backup is claimed. Screenshots and full backup-list text are saved locally.

DE/EN/FR Card Editor and development-status pages record the native result and
its limits. Relevant verification consists of the native recovery/export/raw-
draft comparisons, backend/file/fixture hash comparisons, documentation build,
UIX documentation integrity check and Git whitespace checks. No runtime source
changes require a new App version or another installation on either host.
