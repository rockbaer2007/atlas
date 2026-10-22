# Sprint G2.5.9393 - Explicit local draft Search action

2026-10-22. App 0.1.333, reference Editor 0.2.0-alpha.114. Only .68 is
accessed; .177 and the existing Runtime address remain untouched.

## Change

The user can type on mobile but expects an explicit submit action. Add visible
Suchen/Search/Rechercher beside the input and Clear search, with Enter support.
Live filtering stays available. Zero device-local sources now explain that a
server project must first be opened/applied or a configuration imported. This is
distinct from a search with zero matches. Search never loads server projects.
The report of zero mobile sources does not prove a keyboard or live-filter bug.

The search label remains outside the input; wrapping controls have a 44-pixel
minimum height. No source format, storage writes or recovery semantics change.

## Safety and native verification

Evidence: C:/Users/rockb/source/backups/atlas-mobile-search-fix-0333-68-20261022.
Source/docs archives, the original complete Editor export, 39 raw desktop draft
sources, backend snapshots and 11 selected files are secured before changes.
Fresh full HA backup a0ca4a9e completes at 14:34 local, 143.05 MB, under the
actual name Custom backup 2026.10.2. Its UI lists HA settings/history, Share,
SSL, Media, ATLAS 0.1.332, Get HACS and Matter Server. No PC archive download or
full restore is claimed.

App 0.1.333 installs normally through HA on .68. In the normal native Editor,
Search filters IC68 to 9 of 39 sources; Enter works, and Clear search restores
39 of 39. Complete Editor exports compare equal after ignoring export metadata
and transient selected-field state. All 39 raw sources compare unchanged.
All nine server projects, six plugins, connection settings and 11 selected file
hashes remain intact. Existing 25 trash entries stay intact; only this fix's
four-file synthetic fixture folder is moved to recoverable File Studio trash.

A native isolated fixture uses the exact candidate module and real stylesheet
with in-memory sources: Search/Enter explicitly refresh newly added sources;
zero-source guidance passes in DE/EN/FR. The fixture uses a bundled .js because
plugin-assets .mjs files are served as octet-stream; this does not alter product
MIME handling. Actual 320/390/768-pixel containers keep input and buttons within
bounds at 44-pixel height. These are narrow-container checks, not actual Android
keyboard or device qualification.

The ongoing mobile A/B projects, guide and HA sidebar remain for the user's
Chrome tests. The guide now names 0.1.333, the Search action and the first-project
step for zero local sources. Actual phone/tablet results remain pending.

## Checks and publication

Source 60636bce, package mirror 13ef7ff; source CI passes. Syntax checks, build,
31 frontend tests, 431 Home Assistant tests and 43 App tests pass. Mirrors sync
523 files. Documentation DE/EN/FR describes the button and qualification boundary.
Retention: keep a0ca4a9e, fe84e19f and dfc0c05c. Deleting the two older full
backups c9456330 and 4dc22ce1 is pending the required browser action-time
confirmation; PC backups and installed updates remain preserved.
