# Sprint G2.5.9380 - Independent local Editor drafts per tab

2026-10-21. ATLAS App 0.1.328, reference Editor 0.2.0-alpha.109.
Only .68 is tested, with HA 2026.10.2. .177 is never queried or modified.
The cloned Runtime integration URL remains unchanged and is not opened.

## Backup and implementation

Evidence: `C:/Users/rockb/source/backups/atlas-tab-drafts-0328-68-20261021`.
Git archives, private baseline snapshots, ten original files and the complete
isolated-browser Editor export precede changes. Fresh full HA backup 8d09b5cd
(141.66 MB, 18:56 local time) contains HA settings/history, share/media/SSL and
ATLAS 0.1.327, Get HACS 1.3.1 and Matter 9.2.0. No full-archive PC download
or actual full-backup restore is claimed.

The old global sharedProjectDraft key remains readable and is never overwritten
or deleted by the new code. editor-drafts.mjs allocates an independent random
record per page lifetime, stores the current recovery pointer in sessionStorage
and scans individual localStorage records without a shared mutable index.
Reloaded or duplicated tabs fork on their next write; explicit recovery keeps
the source record intact. Invalid records are retained but excluded from the
picker. No automatic expiry or eviction. Quota/validation failures retain old
records and show a DE/EN/FR export warning. Record data excludes Administration
connection/credential fields and is bounded to 5,000 fields / 4 MiB project JSON.

The normal shared-project UI adds a localized Local drafts selector with names,
timestamps and a current-tab marker. Existing preview, workspace backup and
explicit confirmation remain mandatory. Locally saved drafts can survive an
App outage, but preview/apply still needs the server. Browser-profile/address
storage is not part of HA backups; deletion/device migration needs an Export.

## Real .68 qualification

The App update from 0.1.327 to 0.1.328 uses HA's existing App update controls.
An immediate comparison passes for all original data, allowing only the exact
App/reference-plugin version changes and runtime timestamps. User Chrome
Editor storage is never edited: tests use separate in-app browser storage.

One owned server project, atlas-tab-drafts-0328-68-20261021, contains one passive
sun.sun Entity field. Both tabs open revision 1 through normal preview/apply.

1. A and B change to distinct unsaved names. The two visible draft IDs differ.
   After reloading both, each selector defaults to its own former source.
   Explicit preview/apply recovers the matching name and field. Complete Editor
   exports before/after recovery match except createdAt for both tabs.
2. Both preview saving revision 1. A writes revision 2. B's stale confirmation
   reports a server conflict and retains B's distinct draft. Revision 2 remains.
3. A prepares a new save preview. Only ATLAS is stopped via HA's normal controls;
   /health confirms ECONNREFUSED. A's confirmation and B's save preview report
   unavailable-server errors. Both tabs then edit distinct Offline names, save
   separate local drafts and download complete exports while the App is off.
4. Starting ATLAS retains server revision 2. Reloading both tabs and explicitly
   applying each preferred draft recovers both Offline workspaces. Both complete
   exports match the outage exports except createdAt.
5. B is closed. A new C starts with the original empty workspace and the legacy
   source selected, without automatically applying a foreign draft. Selecting
   B's retained ID and preview/apply recovers B Offline. Earlier A Unsaved remains
   selectable and previews correctly after later edits and recovery forks.
6. Selection, current-tab/legacy labels and preview/confirmation are exercised
   in DE/EN/FR. Screenshots show the new controls without overlapping their row.
   The original zero-field legacy preview remains available before and after.

Duplicated session pointers, invalid data, unavailable session storage and quota
failure are covered by unit tests, not by injected browser state. Full browser
process restart/session restoration, power loss and cross-device recovery are
not claimed. These are deterministic two-tab interleavings and a real App outage.

## Cleanup and preservation

Normal Import/confirmation restores A and C to the original complete Editor
export; both compare equal except createdAt. The original UI language returns
to English. Test exports remain on PC. Retained test-only recovery records in
the isolated browser are not purged; no original Chrome drafts are touched.

After checking all seven original API records unchanged and exactly one owned
extra entry, the existing permitted File Studio write route restores the exact
original project-store bytes, taking its normal history backup. Own active
project removed; previous history/trash and automatic safety backups retained.
No dashboard, resource, HA state, capability or external plugin is changed.

Final comparison passes for seven server projects, six plugins, management and
Terminal settings, old trash and ten original file hashes including the HA
entry registry and project store. Expected differences are App 0.1.328,
reference Editor .109 and restart/settings timestamps. App is running again.

Under the user's explicit disposable-test/three-backup rule, only oldest full
backup e1a698d2 (Custom backup 2026.10.2, 140.72 MB, 2026-10-19 18:22) is removed.
The unfiltered final list contains exactly three full backups:
8d09b5cd / 38b3c094 / 05de4b62. PC backups and installed updates remain.
No additional PC full-archive copy of the deleted backup is claimed.

## Verification and publication

Six focused draft tests, twelve combined frontend tests, all 431 Home Assistant
package tests, Workspace build, two packaging tests and the exact 522-file
App-package mirror check pass. Syntax/diff checks pass. GitHub CI for source
701d7a04 passes. App package release d3a9f17 is pushed separately.
DE/EN/FR docs explain recovery, limits and the qualified paths. Documentation
build and separate docs diff check pass. All owned browser tabs are closed.
