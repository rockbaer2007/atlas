# Sprint G2.5.9379 - Shared-project multitab conflicts and App outage on .68

2026-10-21. App 0.1.327 / HA 2026.10.2 unchanged. Network tests target only .68.
.177 is never queried or changed; the cloned integration URL is not opened or
modified. This is qualification with a documented finding, not a product fix.

## Backup and bounded fixture

Evidence: `C:/Users/rockb/source/backups/atlas-shared-project-multitab-68-20261021`.
Git archives, private settings/project snapshots and ten file copies precede
changes. Fresh encrypted full HA backup 38b3c094 (141.6 MB, 18:16 local time)
includes HA settings/history, share/media/SSL and all three Apps, ATLAS 0.1.327,
Get HACS 1.3.1 and Matter 9.2.0. No full archive PC download/restore claimed.

Two in-app browser tabs use a browser session separate from the user's Chrome
Editor storage. Chrome is used only for backup and App lifecycle controls; no
existing Chrome draft is modified. An initial Editor export is retained. A
read-only download of the permitted File Studio project-store path is checked
against the seven public API project records before testing. No permissions
are expanded and no token is logged or copied into fixtures.

The only new server project is atlas-multitab-68-20261021, seeded as revision 1
through the normal project API with one passive sun.sun Entity field. Actual
UI opening/saving uses both tabs and the normal preview/confirmation flow.

## Six successful control paths

1. Both tabs open revision 1 and prepare different names. A saves revision 2.
   B's already prepared save is rejected as a server conflict, preserving its
   own visible draft and A's server revision. All seven originals are unchanged.
2. After an explicit list refresh/new preview B saves revision 3. A previews
   opening that version; B saves revision 4 before A confirms. A's stale open
   is rejected and its workspace is retained.
3. A opens the current version, prepares a save and changes its workspace after
   preview. Confirmation rejects the changed signature; revision 4 is retained.
4. HA's normal App controls stop only ATLAS. /health returns ECONNREFUSED;
   A's attempted save preview reports an error and retains A Changed.
5. B confirms its previously prepared save while the App is stopped. The backup
   request fails, an error is shown, confirmation becomes usable again and B
   Offline remains intact. Both complete Editor exports are downloaded during
   the outage and retained independently on the PC. HA itself is not stopped.
6. Starting ATLAS again preserves server revision 4. Repeating B's pending
   confirmation without reloading either Editor succeeds as revision 5. No
   unauthorized server update or original-project change is observed.

These are deterministic interleavings and a real unavailable App endpoint,
not packet-loss injection during an acknowledged write, timeout latency,
parallel-process stress or atomic recovery after a power/storage failure.

## Finding: one shared local draft slot

A still holds MT68 20261021 A Changed in memory. After B's successful retry,
A's Inspect local draft offers MT68 20261021 B Offline instead. Reloading A
returns its original empty local Editor; Inspect local draft still offers B,
not an independently recoverable A draft. A was explicitly exported before
reload, so this test loses no user/test data.

Cause: examples/status-demo/app.js persists shared workspaces to the single
localStorage key atlas.homeassistant.sharedProjectDraft, and readDraft reads
that same browser-origin-wide slot. The revisions guard server writes but do
not provide per-tab draft storage. Until corrected, explicitly save or export
each separate tab before reload/close and do not rely on Inspect local draft
for multiple independent drafts. The roadmap now prioritizes compatible
per-workspace/tab persistence and recovery. No fix or version bump is claimed.

## Cleanup and preservation

The isolated test workspace is returned through normal Import/confirmation to
its initial export. The full object matches except createdAt; Inspect local
draft then contains zero fields and no test name. Original Chrome storage was
never edited. The owned final project and both divergent exports remain on PC.

With all seven original API entries checked unchanged and no extra concurrent
projects present, File Studio's permitted normal write route restores the exact
pre-test project-store bytes, taking its normal history backup first. Only the
owned active catalog entry is removed. Automatic workspace/store/history safety
backups are retained; existing history/trash is not purged. No dashboard,
resource, synthetic HA entity, plugin package or permission is changed.

Final capture compares all seven projects, six plugins, management/Terminal
settings, old trash and ten original files, including the project store and HA
entry registry. All match; only App startedAt and connection updatedAt are
expected to change due to the controlled restart. App is running again.

Under the user's disposal/three-backup rule for test hosts, only oldest test
backup 5a0986d5 (140.55 MB, 2026-10-19 16:41) is removed. Final unfiltered list
retains exactly 38b3c094/05de4b62/e1a698d2. PC backups and installed updates
remain. No extra PC full-archive copy of the deleted backup is claimed.

Three existing project-store regression tests pass. Product code and versions
remain unchanged; DE/EN/FR docs record both the passing server protections and
the unresolved local-draft collision. DE/EN/FR documentation build and both
repository diff checks pass before the separate documentation commit.
Own browser tabs are closed.
