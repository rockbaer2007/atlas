# Sprint G2.5.9395 - Prepare cross-device project save conflict

2026-10-22. App 0.1.333 is unchanged. Only .68 is accessed; .177 and the
existing Runtime URL are untouched. Actual phone/tablet results remain pending.

## Safety

Evidence: C:/Users/rockb/source/backups/atlas-mobile-conflict-68-20261022.
Source/docs archives, backend/project/plugin/trash snapshots and selected files
are saved before changes. Fresh encrypted full backup dbc776c2, ATLAS 68 vor
Mobilkonflikt 0.1.333 2026-10-22, completes at 15:13 local, 143.14 MB. Its UI lists
HA settings/history 2026.10.2, Share, SSL, Media, ATLAS 0.1.333, Get HACS 1.3.1
and Matter Server 9.2.0. No archive PC download or restore is claimed.

The desktop profile's complete Editor configuration and 39 raw draft sources
are exported. Opening preview/cancellation preserves the complete Editor export;
all 39 raw sources compare unchanged. No test project is applied in the desktop
profile. On each real device the user must export original configuration and
sources before applying the new test project; HA backups exclude browser drafts.

## Owned preparation

One project, atlas-mobile-conflict-20261022, is saved with revision zero after
collision checks: MOB68 Gemeinsamer Speicherkonflikt, mobil-konflikt-68.js, one
Core Entity card MOB68 Konflikt Sonne reading sun.sun. It remains revision one
at handoff. Seven original entries are preserved in full, including revisions.

The owned one-file guide atlas-mobile-conflict-20261022/index.html is deployed
under plugin-assets. Its backup button reads only legacy/v2 draft source keys,
exports locally, never seeds storage, and explains zero sources. No Admin token
or provider key is read. A normal Editor link opens one separate device tab.

HA's Webpage dashboard flow creates the owned storage dashboard atlas_mobilkonflikt,
URL atlas-mobilkonflikt, title ATLAS Mobilkonflikt, require_admin false and
show_in_sidebar true. It embeds the guide. The actual generated path is recorded
instead of assuming a typed suffix was committed. Native sidebar navigation
renders the full guide. Existing dashboard entries remain identical; core config
entries and all other selected original files remain identical. No resources,
test HA states, integration permissions or network ports are changed.

Final prepared snapshot: App 0.1.333, eight projects (seven original plus one
owned), six plugins, eleven selected files (one owned dashboard file added),
27 unchanged trash entries. Native read-only opening preview and cancellation
pass. These checks do not qualify actual concurrent mobile saves.

## User procedure and boundaries

Both devices explicitly open/apply the same project. Phone changes the script
to mobil-konflikt-handy.js, tablet to mobil-konflikt-tablet.js. The tablet first
opens Preview and save and leaves confirmation pending. The phone then saves
fully; the tablet confirms its stale preview. Expected: conflict, unchanged
phone server state and retained tablet draft. The tablet must not refresh its
project list first, since that would replace the stale revision under test.
Both drafts are exported independently before destructive workspace recovery.

After reviewing that result, the phone changes to mobil-konflikt-handy-offline.js,
exports, opens save preview while online, disables Wi-Fi and any alternative
LAN route, and confirms. Expected: no false success and retained draft. If no
feedback appears within 30 seconds, stop clicking and report; after reconnection
inspect the server before retrying. HA/router are not restarted. This is transport
loss before the save request, not a deterministic post-write/pre-ack interruption.

Fixtures remain for the actual user test, which is not marked passed. Four full
backups temporarily remain: dbc776c2, a0ca4a9e, fe84e19f, dfc0c05c. After completion,
remove owned fixtures, retain the newest three successful full backups and all
PC evidence, compare original data and update DE/EN/FR with actual results.
No new runtime version is needed for this documentation/test preparation.
