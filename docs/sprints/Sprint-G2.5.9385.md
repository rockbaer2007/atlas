# Sprint G2.5.9385 - Full and blocked browser storage on .68

2026-10-21. App 0.1.329, reference Editor 0.2.0-alpha.110, Chrome 155 and HA
2026.10.2 unchanged. Only .68 is accessed; .177 and the cloned Runtime integration
URL are not opened or modified. This is qualification with a recorded finding,
not a product fix or package update.

## Backup and test scope

Evidence: `C:/Users/rockb/source/backups/atlas-storage-faults-68-20261021`.
Git archives and private baseline settings/projects/plugins/trash plus ten files
precede changes. Fresh encrypted full HA backup fe0f6a0e, ATLAS 68 vor
Browserablagen-Prüfung 2026-10-21, completes at 20:11 local, 142.45 MB. Inventory
includes HA settings/history 2026.10.2, share/media/SSL, ATLAS 0.1.329, Get HACS
1.3.1 and Matter Server 9.2.0. No full archive PC download or restore is claimed.

The original complete Editor and all 20 visible existing draft sources are
exported separately before tests. An owned unregistered folder serves copied
live Editor HTML with an opt-in test probe before the unchanged installed bundle.
No plugin registration, file permission, port, HA dashboard/resource, Chrome
permission or browser security preference is added/changed. The seven original
server projects are retained; one owned project stays at revision 1.

The probe fills only its unique quota namespace, with a 16 MiB value budget per
bucket, until actual native QuotaExceededError occurs. It then exhausts remaining
space by growing its own last value by one character. Cleanup enumerates/removes
only this exact namespace, never Storage.clear or existing keys. localStorage
quota affects the .68:4176 origin during the test; sessionStorage quota affects
only its own tab. Other HA origins/hosts are not accessed or filled.

Separate method/getter blocks throw controlled SecurityError exceptions only in
owned test pages. They do not change Chrome settings or OS access control. The
probe uses captured native methods for quota operations, cleanup and a normal
user-clicked draft inventory download. That diagnostic bypass is limited to
draft-prefix records, owned filler counts and the owned tab pointer; it never
reads credentials or arbitrary browser storage. Each original v2 raw record
is compared byte-for-byte before/after every inventory checkpoint. Its project
also matches the independently exported original.

## Eight browser cases

1. **Actual full localStorage:** 97 owned filler entries / 10,438,860 UTF-16
   value bytes; native one-character insertion and extension both fail. These
   are filler payload bytes, not a universal browser quota including all keys.
   A longer unsaved name cannot replace the previous own draft. The Editor
   warns in EN/DE/FR; full JSON export retains the unsaved project. After removing
   filler, a normal input edit saves successfully. All 20 original records remain.
2. **Actual full sessionStorage in a fresh tab:** 109 owned entries /
   10,475,732 UTF-16 value bytes, native QuotaExceededError confirmed. The local
   draft writes successfully, but intent and tab pointer cannot be written.
   No warning is displayed. After reload, pointer and recovery offer are absent;
   the complete record remains in the manual picker. Removing own filler and
   explicit preview/apply restores the exact exported project.
3. **Blocked local writes:** SecurityError retains the prior own record, shows
   the local-save warning and permits export. Unblocking and retrying saves normally.
4. **Blocked session writes:** local record persists, but the pointer remains
   null without warning. Reload does not preselect it. Explicit manual recovery
   after unblocking matches the export exactly, reproducing case 2 independently
   of quota accounting.
5. **Blocked local read/write methods at startup:** the source picker contains
   only its empty option while reads are denied. Opening the owned server project
   and editing shows the save warning; export works. After unblocking, normal
   saving succeeds. Existing records were unreadable to the Editor, not deleted.
6. **Blocked window.localStorage getter at startup:** the Editor remains usable,
   saving warns and no new local draft is claimed. The in-memory project exports.
   Normal reload after removing the block plus Inspect backup/explicit apply
   restores the exact project from its PC export.
7. **Blocked window.sessionStorage getter at startup:** the App cannot construct
   its draft store, unlike the method-block fallback. Saving warns; no new local
   record is created, but export and subsequent PC-backed restoration work.
8. **Blocked session read/write methods:** independent local draft remains
   persistent but no warning/pointer/automatic selection is available. After
   unblocking, explicit manual recovery matches its export.

All eight in-memory exports retain the same fields, geometry, grid and script
filename as the test baseline, differing only in their deliberate test names.
No automatic draft application is claimed. The test does not change browser
security policy, fill the OS disk, test private browsing, eviction, power loss,
arbitrary browser engines or actual process crashes.

## Finding and next work

The qualification is NOT an all-pass storage-failure release. In cases 2, 4
and 8, the draft store catches session failures silently after the successful
local write. The UI gives no notice that the tab recovery link was not saved.
The record itself survives; only manual source selection recovers it after reload.
The roadmap prioritizes a precise DE/EN/FR partial-save warning, distinguishing
this condition from a failed local record write and retaining export/old sources.
No unrelated automatic choice of another tab's record should be introduced.

## Cleanup and preservation

Seven complete original Editor workspaces are restored through normal Import
and confirmation. Their full exports equal the original except createdAt; UI
language is English again. Final diagnostic inventories confirm zero owned local
or session filler keys in every test tab and byte-identical original 20 records.
Owned recovery sources and all PC exports remain; no browser storage purge occurs.

Only the owned server entry is removed by restoring the exact original project
store through the existing permitted File Studio write route, retaining its
normal safety history. The fixture's exact two files are archived on PC and
moved to recoverable trash. All 18 old trash entries remain unchanged, with one
identified own directory entry added. Final comparison passes for seven projects,
six plugins, connection/management/Terminal settings and ten file hashes including
HA entry registry and project store. App startedAt is separately identical:
no ATLAS restart is performed. No HA restart or update is triggered.

Only oldest full test backup db61a6a3 (Custom backup 2026.10.2, 142.31 MB,
19:25 local) is removed under the user's disposable-test retention authorization.
Exactly three remain in the unfiltered list: fe0f6a0e / c0f15050 / 4b8e929f.
Installed updates and PC backups remain; no additional PC full-archive copy of
the deleted old backup is claimed. All owned browser tabs are closed.

DE/EN/FR Editor and development-status documentation record the qualified cases,
export/recovery steps and the unresolved session-warning gap. Documentation
build and repository diff checks pass. No product tests are rerun for this
documentation-only change; actual browser observations and data comparisons are
the qualification evidence. App/package code and version are unchanged.
