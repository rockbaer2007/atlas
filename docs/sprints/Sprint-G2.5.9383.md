# Sprint G2.5.9383 - Chrome interruption during local draft saving on .68

2026-10-21. App 0.1.328, reference Editor 0.2.0-alpha.109 and HA 2026.10.2
unchanged. Only .68 is accessed; .177 and the cloned Runtime integration URL
are neither opened nor changed. This qualification changes no product code or
package and requires no version bump.

## Backup and controlled interruption

Evidence: `C:/Users/rockb/source/backups/atlas-draft-write-interruption-68-20261021`.
Git archives, private baseline snapshots, ten original files, the complete
original Editor and all eight existing draft sources precede changes. Fresh
encrypted full HA backup 4b8e929f is complete, displayed as Custom backup
2026.10.2, 142.34 MB, 19:38 local. Its inventory includes HA settings/history,
share/media/SSL, ATLAS 0.1.328, Get HACS 1.3.1 and Matter Server 9.2.0.
No full archive PC download or restoration is claimed.

One owned server project, atlas-draft-write-interruption-68-20261021, stays at
revision 1 / WI68 20261021 Base. Tabs A/B use different unsaved project names.
Complete exports and their distinct recovery IDs are saved before interruption.
The intended next A version has a distinct project name and Card title;
its project-backup file is preserved separately.

An owned, unregistered File Studio folder serves a copy of the live Editor
HTML with a base URL and a visible, opt-in test probe before the unchanged
installed app.bundle.js. Installed bundle and draft-module hashes are captured
and checked unchanged at cleanup. No plugin, capability, file permission, token,
HA integration, dashboard or resource is added or changed.

The probe transparently delegates Storage.setItem to the native implementation.
Only when explicitly armed and writing the owned A Next draft does it pause
after the native localStorage record write returns, before control returns to
the real draft-store save call and its sessionStorage tab-pointer update.
An owned server journal records this phase, old/new IDs, project name, field
count and safe title marker. A blocking alert keeps the actual save call paused.
This does not claim interruption inside the atomic native setItem primitive.

Journal phase after-local-record-before-tab-pointer is valid at
2026-10-21T17:43:04.150Z: previous pointer e456d093438e397076bb95089adf46e9,
new record 01cd70465ff61372256ad349c75cc098, one field, 444 record bytes.
The intended title marker is WI68 A Next title preserved. The user leaves the
alert open and runs taskkill /F /IM chrome.exe /T. Before reopening Chrome,
read-only OS inventory confirms exactly zero Chrome processes. Main PID changes
from 15516 (19:30:30 local) to 30984 (19:44:27). Chrome restores both owned tabs;
no other HA tab is opened. Server project revision and all seven originals
remain unchanged while Chrome is absent.

## Recovery result and boundary

After session restoration, A still preselects its last confirmed baseline ID;
B still preselects 42b350d0ded7ab252f746679dc962a72. A Next is separately
listed by name/time. Normal Inspect local draft / Back up and apply restores
the confirmed A baseline and B; full exports match their pre-abort exports
except createdAt. Explicitly selecting A Next restores all five retained project
values exactly against the intended project backup, including its new title.

Thus the new complete record survives this interrupted save, but is NOT
automatically selected: the old tab pointer was intentionally not updated.
Manual source selection is required for the newer version in this tested gap.
No draft is applied without the existing preview/confirmation flow.

All eight pre-existing sources are selected, applied and exported again. Their
name, fields, surface size, grid size and script filename compare unchanged
against the separately saved originals. Sources are never rewritten or removed.
Screenshot write-interruption-recovered.png shows the recovered A Next version.

Scope: one controlled process termination at this exact multi-step save boundary
using the actual installed Editor and transparent test instrumentation. It is
not a random-timing stress series, interruption inside a native atomic write,
power loss, disk flush/disk failure, OS crash, deleted storage or another browser.
HA full backups do not contain local browser drafts; PC exports remain necessary.

## Cleanup, data preservation and retention

Normal Import/confirmation restores both complete original Editor workspaces;
full exports match the original except createdAt. Only the owned server project
is removed by restoring the exact original project-store bytes through the
existing permitted File Studio write route, with its normal safety history.
The probe folder's exact three files are backed up on PC, hashes verified and
the folder moved to recoverable File Studio trash. All 16 old trash entries
remain unchanged; exactly the one identified own directory entry is added.
Existing history is preserved. Original/test draft sources and PC exports remain;
browser storage is not purged. All owned browser tabs are closed.

Final comparison passes for seven original projects, six plugins, connection,
management and Terminal settings, old trash and ten file hashes including HA
entry registry and project store. App startedAt is separately identical: no
ATLAS or HA restart occurs. Installed bundle/module bytes are unchanged.

Only oldest own full test backup 8d09b5cd (ATLAS 68 vor Tab-Entwürfen 0.1.328
2026-10-21, 141.66 MB, 18:56) is removed under the user's disposable-test
retention authorization. The final unfiltered list contains exactly three:
4b8e929f / db61a6a3 / 4a3e1395. PC backups and installed updates are preserved;
no additional PC full-archive copy of the removed backup is claimed.

DE/EN/FR Editor and development-status docs record the precise interrupted-save
result, required manual selection and limits. Docs build and both repository
diff checks pass before separate commits. No product tests are rerun for this
documentation-only increment; runtime qualification and full comparisons are
the relevant evidence.
