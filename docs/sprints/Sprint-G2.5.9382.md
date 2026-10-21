# Sprint G2.5.9382 - Forced Chrome termination and draft recovery on .68

2026-10-21. Chrome 155.0.8059.82 / Windows, App 0.1.328, reference Editor
0.2.0-alpha.109 and HA 2026.10.2 unchanged. Only .68 is accessed. .177 and
the cloned Runtime integration URL are not opened or changed. Qualification
requires no product/package version bump.

## Backup and draft preservation

Evidence: `C:/Users/rockb/source/backups/atlas-browser-crash-68-20261021`.
Git archives, private baseline snapshots and ten original files precede changes.
Fresh encrypted full HA backup db61a6a3 is complete, displayed as Custom backup
2026.10.2, 142.31 MB, 19:25 local time. Its inventory includes HA settings/history,
share/media/SSL, ATLAS 0.1.328, Get HACS 1.3.1 and Matter Server 9.2.0. No full
archive PC download or restoration is claimed.

The connected Chrome initially contains only the user's empty new tab. The
.68 Editor has the original empty workspace and four older recovery records.
The complete original Editor is exported. All four original draft IDs are
recorded through their visible select options and individually backed up using
normal Inspect local draft / Back up and apply / Export. Sources are never
rewritten. One fresh writer record is used while inspecting the older sources.
No hidden browser storage, token or page runtime variable is inspected/modified.

One owned server project, atlas-browser-crash-68-20261021, revision 1, contains a
passive sun.sun Entity field. Two Chrome tabs open it through normal preview and
confirmation. A/B receive distinct unsaved project names and rendered field
titles, CRASH A title preserved / CRASH B title preserved. Complete exports and
their distinct visible recovery IDs are saved on PC before interruption.

## Abrupt process end and recovery

Browser inventory immediately before interruption contains only the two owned
.68 Editor tabs and the user's empty new tab. The user runs
`taskkill /F /IM chrome.exe /T`, rather than closing Chrome normally. The agent
does not automate process termination. Before Chrome is reopened, a
read-only OS process inventory confirms exactly zero chrome.exe processes;
the saved stopped-process list is empty. The user then reopens Chrome and
confirms session restoration.

The main process changes from PID 14752 (created 19:19:13 local time) to
15516 (created 19:30:30). The extension reconnects with a new browser session,
new tab IDs and both original .68 URLs/group restored. No unrelated HA page
is present or loaded by the agent. HA and ATLAS are not stopped; the server
project remains revision 1 / Base throughout the browser absence.

Both restored tabs show the original empty workspace until explicit recovery,
and each Local drafts selector preselects exactly its own pre-abort recovery ID.
Normal Inspect local draft previews the correct A/B project. Back up and apply
restores each draft. The complete exports after recovery compare equal to the
pre-abort exports except createdAt, including the different Card titles and all
field data. The two pointers also compare equal before/after.

All four older source IDs remain selectable. Each is applied/exported again;
the five retained project values (name, fields, surface size, grid size, script
filename) compare unchanged with its pre-test export. This checks the actual
draft contract rather than unrelated current Editor control values.

Scope: one forcible browser-process termination after visible local saving and
completed safety exports, followed by Chrome's session recovery. This does not
exercise a simultaneous interrupted localStorage write, disk failure, power loss,
OS crash, deleted browser storage, private browsing or another browser engine.
No automatic application of a draft is claimed: the user-visible confirmation
flow remains required.

## Cleanup and retention

Normal Import/confirmation restores both original complete Editor workspaces;
each export matches the original except createdAt. The seven original server
projects are checked unchanged before interruption, while Chrome is absent and
after restoration. With exactly one owned extra project present, the existing
permitted File Studio write route restores the exact original project-store
bytes and creates its normal safety history backup. Only the owned active
server entry is removed. Existing history/trash is preserved.

Final capture passes for seven projects, six plugins, connection/management
and Terminal settings, old trash and ten file hashes including HA entry
registry and project store. A separate assertion confirms identical App
startedAt: no ATLAS restart occurred. No dashboard, resource, HA entity,
plugin, permission or Runtime integration was changed. Original drafts and
test recovery sources/PC exports remain available; browser storage is not purged.

Only oldest full test backup 38b3c094 (ATLAS 68 vor Mehrtab Konflikttest
2026-10-21, 141.6 MB, 18:16) is removed under the user's disposable-test retention
rule. The final unfiltered list has exactly three completed full backups:
db61a6a3 / 4a3e1395 / 8d09b5cd. PC backups and installed updates remain;
no additional PC full-archive copy of the deleted backup is claimed.

All owned browser tabs are closed; the user's empty new tab is left alone.
DE/EN/FR Card Editor and development-status docs record the successful abrupt
termination and explicit recovery, with limits. The roadmap closes this check.
Docs build and both repository diff checks pass before separate commits.
