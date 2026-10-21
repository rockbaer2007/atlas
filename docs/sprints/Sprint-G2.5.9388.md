# Sprint G2.5.9388 - Fresh-profile configuration import qualification

2026-10-21. Unchanged App 0.1.330/reference Editor 0.2.0-alpha.111, HA 2026.10.2
on .68 only. Qualification completed with a reproducible finding, not a full
two-draft reload pass. No product/package version change or restart is made.
.177 and the cloned Runtime integration URL are neither accessed nor changed.

## Backup and preparation

Evidence: `C:/Users/rockb/source/backups/atlas-fresh-profile-drafts-68-20261021`.
Source/docs Git archives, full original Editor export, all 46 old raw draft sources,
settings/project/plugin/trash inventories and ten file copies are secured first.
HA full backup f504403a, ATLAS 68 vor frischem Browserprofil 0.1.330 2026-10-21,
completes at 21:21 local, 142.65 MB. Its UI lists settings/history 2026.10.2,
share/media/SSL, ATLAS 0.1.330, Get HACS 1.3.1 and Matter Server 9.2.0. No full
archive PC download or backup-restore test is claimed.

One owned server project with a passive sun.sun Entity card is used to prepare
two drafts in the source profile. Both normal JSON Export files contain a full
Editor configuration, including three groups/two tracked entities, one 4x3 field,
script filename and settings. They differ in project names ST68 Fresh Profile A
Sonne / ST68 Fresh Profile B Soleil and field titles Profil A – Sonne / Profil B
– Soleil. Both source Editors are restored
and re-exported exactly, excluding createdAt. All 46 old sources remain byte-equal.
The owned server project is removed and the original project-store bytes restored.

A disposable, unregistered two-file probe loads the unchanged installed Editor
bundle. It only offers a normal download of draft-record inventory plus tab
pointer; it does not mutate Storage, read credentials, or install a plugin.
The installed bundle/module hashes remain unchanged through cleanup.

## Separate profile and immediate import: passed

The user creates a separate local Chrome profile ATLAS Test and connects its
extension. Browser inventory records distinct source/destination profile and
extension identities. Initial normal Editor UI has no local draft choices; the
probe confirms zero v2 records and no tab pointer. No browser database is copied.

Two destination tabs exist before either import. Normal file chooser plus native
confirmation imports draft-a-source.json into A and draft-b-source.json into B.
Immediate complete JSON re-exports match their own original files, excluding
createdAt only. Connection to .68 is available from the existing Administration
handoff; no new credentials or capability settings are required.

One attempted return export instead triggers HACS Export. It is not counted as
part of this test; the required JSON export is repeated through the observed
JSON control and verified. Browser policy rejects opening chrome://downloads;
the accidental download is left untouched rather than working around that block.
This run does not qualify HACS export/import.

## Import/reload finding: failed

Immediately after both imports, the destination inventory still contains zero
draft records and no tab pointer; both Local drafts selections are empty.

- Before reload, A is A and B is B, with their distinct field titles.
- After reloading both, both complete configurations equal B. A no longer has its
  own imported workspace, and no local recovery source exists for A.
- Explicitly importing A's original file recovers its complete configuration.
  B's in-memory workspace is still B before reload, but becomes A after reload.
  This reproduces last-import-wins in the reverse order as well.
- The original export files are intact, and every explicit import/file recovery
  checked against them is exact. No pre-existing draft or server data is lost.

Static source evidence agrees: the normal whole-configuration Import handler
ends in persistConfiguration() without activating a shared project. That function
uses the per-tab draft store only when sharedProjectActive is true; otherwise it
writes the shared profile configurationStorageKey. The test deliberately performs
no extra edits or shared-project opening to hide this initial-import boundary.

Next fix: enroll confirmed whole-configuration imports into independent per-tab
draft/recovery handling, retaining prior sources and the existing storage-error
notices. Normal JSON whole-configuration import is the proven scope; no new claim
about HACS, raw HA-card, YAML, browser crashes or cross-device execution is made.

## Restoration, cleanup and retention

Both destination Editors are restored from their separately exported initial
empty configuration, with full re-export equality except createdAt. Its final
inventory again has zero local draft sources and no pointer. The user's original
Editor tab is returned to /editor with this original state and left open; the
agent-created second tab and intermediate tabs are closed. The profile itself
and user-created extension/settings tabs are retained.

All 46 old source records are checked again in the original profile and remain
byte-identical. Final backend comparison passes for seven original projects,
six plugins, connection/management/Terminal settings, 21 existing trash entries
and ten file hashes. Only the owned two-file probe folder enters recoverable
trash (22 total). App startedAt is unchanged; HA and ATLAS are not restarted.

Only oldest disposable full backup fe0f6a0e (ATLAS 68 vor Browserablagen-Prüfung
2026-10-21, 142.45 MB, 20:11) is removed under the standing test-retention rule.
The unfiltered list confirms exactly three full backups: f504403a (142.65 MB),
7556d862 (142.58 MB), 205c94c3 (142.51 MB). No extra full PC copy of the removed
archive is claimed; PC evidence/source exports and installed updates remain.

verify.mjs reproducibly checks immediate imports, both failure orders, exact
file recovery, all four restored Editors and unchanged original data. Its result
is completed-with-finding. DE/EN/FR docs and roadmap distinguish the successful
file migration from the still-open per-tab reload behavior.
