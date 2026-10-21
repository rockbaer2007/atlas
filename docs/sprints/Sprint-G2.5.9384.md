# Sprint G2.5.9384 - Offer same-tab recovery after interrupted local saving

2026-10-21. App 0.1.329, reference Editor 0.2.0-alpha.110. Tests only on .68
with HA 2026.10.2; .177 and the cloned Runtime integration are not accessed.

## Implementation and local verification

Before writing a new persistent record, the draft store writes a small intent
to this tab's sessionStorage: record ID, confirmed predecessor ID and exact write
timestamp. On reload, only a valid matching completed record with that intent
and the same predecessor is preferred. Record validation and project size limits
still apply. No global newest-record or name-based inference is used; timestamp
order is not used as a proxy for tab identity, including after a clock rollback.

The intent is cleared only after the tab pointer is written. A stale intent
left after that pointer update creates no false offer. Missing, invalid or
unreadable records/markers do not replace the confirmed selection or delete bytes.
Without usable session storage, persistent sources remain manually recoverable.
Old versions lacking an intent cannot be retroactively assigned to a tab.

The UI opens the shared-project section, preselects the detected source and
shows a DE/EN/FR notice and Inspect newer draft action. It uses the existing
server preview, current-workspace backup and explicit Back up and apply flow.
Nothing is applied automatically. Confirmed predecessors, foreign tabs, old
draft sources and legacy compatibility remain intact.

Ten focused draft tests pass, including the former post-record/pre-pointer
interruption, tab isolation, absent/corrupt/mismatched candidates, failed writes,
post-pointer interruption, missing session storage and clock rollback. The combined
frontend suite passes 16 tests. All 431 HA-package tests, Workspace build,
JavaScript syntax, two packaging tests and the exact 522-file package sync pass.
Source 46d669b8 passes GitHub CI; App package b46e631 is published separately.

## Backup

Evidence: `C:/Users/rockb/source/backups/atlas-draft-recovery-0329-68-20261021`.
Git archives, baseline settings/projects/plugins/trash and ten original files
precede changes. Fresh encrypted full backup c0f15050, ATLAS 68 vor
Entwurfswiederherstellung 0.1.329 2026-10-21, is complete at 19:53 local,
142.39 MB. Inventory includes HA settings/history 2026.10.2, share/media/SSL,
ATLAS 0.1.328, Get HACS 1.3.1 and Matter Server 9.2.0. No full archive PC copy
or restore is claimed. The complete original Editor and all 13 visible existing
draft sources are individually exported before the App update; sources stay intact.

## Native .68 qualification

The existing HA App update controls install 0.1.329. An immediate full comparison
passes, allowing only the App/reference-plugin versions and runtime/settings
timestamps. Existing project bytes, six plugin entries and configuration are
preserved. The initial Editor offers no interrupted recovery for older unmarked
sources, including a previous same-name A Next source.

An owned unregistered folder serves a copy of live Editor HTML with a visible
opt-in test probe before the unchanged installed bundle. Bundle and draft-module
bytes match the published source and stay unchanged through cleanup. There is
no extra plugin registration, permission, port, dashboard or HA resource.

One owned server project stays at revision 1 / WI68 20261021 Base. Two normal
Editor tabs create distinct local A Baseline / B Unchanged drafts, backed up
before the test. After reloading A to fork its writer, normal Inspect backup
previews the intended A Next project with a new RECOVERY 0329 title preserved
Card title. The opt-in probe lets the native local record write finish, journals
the exact matching pending intent/old pointer/new ID, then throws before the
real store can advance its tab pointer. The existing persistence handler shows
its local-save warning. Normal reload then exercises the new recovery UI.

The journal confirms a valid after-local-record-before-tab-pointer interruption:
previous ID 3e5b1c4636735578d1062926d2444420, successor
0faa3509899acc65b9101092d87d1a21, exact intent timestamp
2026-10-21T18:02:38.760Z, one field and 446 record bytes. The server project and
all seven original projects remain unchanged. This run uses a controlled
exception in the real save path, not another forced browser-process termination.
The actual hard-process boundary was separately demonstrated in Sprint9383.
No interruption inside atomic native setItem, disk failure or power loss is claimed.

1. After reload A preselects the exact successor, opens the section and shows
   the recovery offer. Its full workspace export still matches the original
   except createdAt: no automatic application occurs. B keeps its own preferred
   ID 9a728a6e85bd4b00f4ea59fbd55488e8 and shows no foreign recovery offer.
2. B is explicitly recovered again, creating a newer foreign record; its full
   export matches its baseline. Even after manually selecting that newer B
   source in A, Inspect newer draft previews only A's marked successor.
3. Notice and preview work in DE/EN/FR. German/French cancellation leaves the
   complete original workspace unchanged. Screenshots record all three locales.
4. English Back up and apply restores all five retained project values exactly
   against the intended backup, including Card title. The recovery offer hides.
   A subsequent reload retains the confirmed source with no repeated offer.
5. The older confirmed A predecessor is still explicitly recoverable; its full
   export matches the baseline. All 13 pre-existing sources are separately
   recovered/exported again; name, fields, surface, grid and filename compare
   unchanged. No original source is rewritten or removed.

## Cleanup, retention and documentation

Normal Import/confirmation restores both complete original Editor workspaces;
exports match the original except createdAt. UI language returns to English.
Only the owned server entry is removed by writing the exact original project
store through the existing permitted File Studio route, retaining normal history.
The probe folder's exact three files are archived on PC and moved to recoverable
trash. All 17 old trash entries remain unchanged; precisely one own folder entry
is added. Browser draft sources and PC backups remain; no storage purge occurs.

Final comparison passes for seven projects, six plugins, connection/management/
Terminal settings, old trash and ten file hashes, including HA entry registry
and project store. The installed App remains 0.1.329; only its update restarts
ATLAS, not an additional fault-injected App outage. .177 is untouched.

Only oldest own full test backup 4a3e1395 (Custom backup 2026.10.2, 142.29 MB,
19:14 local) is removed under the user's disposable-test retention authorization.
The final unfiltered list has exactly three full backups:
c0f15050 / 4b8e929f / db61a6a3. Installed updates and PC backups remain.
No additional PC full-archive copy of the removed old backup is claimed.
All owned Editor/HA tabs are closed.

DE/EN/FR Card Editor and development-status docs explain the feature, native
result, old-record/manual-recovery boundary and controlled-exception test scope.
Documentation build and repository diff checks pass before separate commits.
