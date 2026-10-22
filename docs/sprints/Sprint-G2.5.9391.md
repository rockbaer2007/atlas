# Sprint G2.5.9391 - Searchable local draft overview

2026-10-22. App 0.1.332, reference Editor 0.2.0-alpha.113, HA 2026.10.2.
Native tests access only .68; .177 and the pre-existing Runtime URL are untouched.

## Backup and implementation

Evidence: `C:/Users/rockb/source/backups/atlas-draft-overview-68-20261022`.
Source/docs Git archives, the original complete Editor configuration, all 32
existing raw browser draft sources, backend snapshots and ten selected file copies
are secured. Full encrypted HA backup dfc0c05c, ATLAS 68 vor Entwurfsübersicht
0.1.332 2026-10-22, completes at 13:42 local, 142.99 MB. The UI lists HA settings/
history 2026.10.2, share/SSL/media, ATLAS 0.1.331, Get HACS 1.3.1 and Matter
Server 9.2.0. No additional full-archive PC download/restore is claimed.

The local draft controls move to a separate full-width section with search,
result count, a six-row list and source details. Project/card name, script filename,
localized save timestamp, tab association and source ID identify a recovery source.
Search combines case-insensitive terms across those values, including ISO dates.
Only the source already confirmed by the existing draft store is labelled this
tab; others say other or previous tab. Legacy records have explicit unknown time.
No persistent tab-owner metadata, invented historical ownership or record schema
migration is introduced. Summary caching additionally exposes existing script
filenames without changing stored raw records.

Filtering preserves the selected source in memory and restores it when clearing
the filter. No matches disables inspection. Language changes retain query and
selection. A newer interrupted-save recovery action clears a filter before opening
its candidate. Search/selection/details are presentation only; inspection and
backed-up apply retain their previous explicit behavior. No deletion is added.

Two meaningful tests cover duplicate names, source/script/date/multiple-term
search, unknown legacy metadata and byte-preservation of stored sources. All 31
frontend tests, 431 HA-package tests and 43 App checks pass; workspace build,
JavaScript syntax and Git whitespace checks pass. Both 523-file package mirrors
match. Product 966457dd and App repository 508fdb0 are pushed; product CI passes,
including all three configured HA compatibility versions.

## Native update and UI qualification

HA's normal repository update search discovers 0.1.332. Only ATLAS is updated;
existing settings and the original Editor export remain unchanged. All 32 raw
sources remain byte-identical after search, empty-result handling, clear-selection
restoration, preview cancellation and DE/EN/FR switching. Localized times and
source details display correctly. The complete workspace export is unchanged.

Two own JSON imports create projects with identical names but different script
filenames and cards. Each tab marks only its own source; project-plus-script and
full-source-ID searches find the intended record. The initial native exports are
used as recovery baselines (normal import normalizes synthetic field data).
After reload, separate explicit recovery restores each baseline's complete content
and settings; only export createdAt and first-card selection differ. Native list,
details and duplicate-name screenshots are retained.

A temporary 390x844 viewport request does not change actual innerWidth (2560) in
this Chrome extension session. It is reset. Desktop rendering is inspected, but
no narrow/mobile rendering qualification is claimed. This remains follow-up work.
No new browser crash, HACS roundtrip or HA compatibility version is qualified here.

## Restoration, cleanup and retention

Both test workspaces and a fresh normal workspace import the complete original
configuration. Full exports match it except createdAt, including global reload.
All 32 original raw sources remain byte-identical. Final inventory has 39 sources;
new test/recovery copies remain as extra recovery material, with no source purged.
The one-file unregistered inventory fixture only exports the whitelisted local
draft keys through its visible button; it reads no credentials and never modifies
storage. Its exact HTML is archived and its own directory moved to recoverable
File Studio trash. All own Editor, inventory and HA tabs are closed.

Final comparison retains seven server projects, six plugins, ten file hashes,
connection/Terminal/management settings and all 24 previous trash entries; only
the own fixture adds entry 25. Only the reference Editor version changes from
alpha.112 to alpha.113; external plugins remain unchanged. App 0.1.332 stays
installed. .177 is not accessed and Runtime configuration is not changed.

Oldest disposable full test backup f504403a (21 October 21:21, 142.65 MB) is
removed under the user's standing test-system retention rule. The unfiltered
list confirms exactly three full backups: dfc0c05c, c9456330 and 4dc22ce1.
PC backups and installed updates remain. No extra full PC copy of the removed
archive is claimed. DE/EN/FR Card Editor and development-status pages record
the feature, native result, source-preservation contract and mobile test limit.

The first local documentation build hits a Windows EPERM output-directory lock;
an early dependent checker therefore sees missing build output. A clean retry
build succeeds and the subsequent 198-page UIX integrity check passes. These
transient output failures do not change source documentation or user data.
