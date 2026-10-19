# Sprint G2.5.9376 - Staged tablet rendering test completed

Date: 2026-10-19. App 0.1.327 and HA 2026.10.2 unchanged.
Desktop preflight and user-reported tablet qualification; no product release.
Only .177/.68 are used for network/browser checks.

## Safety and setup

Evidence: `C:/Users/rockb/source/backups/atlas-tablet-20261019`.
ATLAS/docs Git bundles and full read-only captures preserve the baseline.
Fresh encrypted full HA backups complete before deploying test assets:
d352abe0 on .177 (139.43 MB), 5a0986d5 on .68 (140.55 MB). Restore lists contain
HA settings/history, SSL, media, share and all three Apps including ATLAS 0.1.327.
No complete archive PC download or restore is claimed.

Separate admin-only dashboards, hidden from the sidebar, use the path
`/atlas-tablet-test-20261019`. Start renders only the small control/instruction
Cards, followed by separate 12-, 360- and 720-leaf views. No existing Editor or
dashboard is edited. One owned module resource per host references
`/local/atlas-tablet-20261019/loader-r3.js`. Card-Mod 4.2.1 alone is used, with
existing Bubble 3.4.2/Mushroom 5.2.3. UIX is neither installed nor loaded.

Two genuine ATLAS-generated HACS fixtures retain 36 fields and 360/720 children,
pass the real readiness reader and use a unique owned synthetic state,
sensor.atlas_tablet_20261019_value. All authored actions are disabled; no real
device service is called. Own state writes are collision-guarded by a marker.
The controller provides 18/28 states, light/dark, automatic-theme restoration,
current viewport/orientation, connection status and a single-socket reconnect.
Module-scoped connection evidence survives view reconstruction without duplicate
listeners. Assets remain confined to the owned WWW directory.

A separate ES5-syntax HTML browser check under
`/local/atlas-tablet-20261019/index.html` loads neither HA nor large Cards. It
reports WebSocket/Promise/fetch/Web Components/modules/Grid/ResizeObserver and
browser identification locally. Available features are not a complete HA
compatibility or performance guarantee. It sends no telemetry.

## Desktop preflight and preservation

Both lightweight checks load. Windows Chrome renders exactly 12/360/720 leaves
on both hosts without error Cards; large views contain 90/180 of each leaf type.
The small stage changes states/themes and reconnects with connected HA, one
ready event and a closed old socket. This is fixture preflight, not new tablet
evidence. Initial DOM enumeration with document.children returns no nodes in
the browser read scope; the corrected querySelectorAll/shadow-root enumeration
provides qualified counts. Initial zero-count files are not passing evidence.

Theme restoration initially retains an explicit dark flag because HA merges
omitted properties. The final helper explicitly includes dark:undefined to
restore the captured default/automatic selection. Versioned helper revision 3
is loaded in fresh pages. Full frontend-user-data hashes subsequently match
the original on both hosts; no retained theme preference change is accepted.

verify-prepared.mjs preserves all seven server projects, six plugins, management,
Terminal settings and old trash entries. All 531 baseline approved files on .177
and nine on .68 match, apart from the two Lovelace registries: every original
registry entry remains identical and exactly one owned dashboard/resource is
added. Private .68 plugin files remain protected by its full backup; no access
permissions are widened. New owned helper history is expected and retained.

## Tablet result and cleanup

The user identifies a Samsung Galaxy Tab A6 with Android 11 / LineageOS and
Chrome Mobile 155. After stopping some other Apps, the lightweight check is
reported responsive. The user reports the 12- and 360-Card stages okay, followed
by 720 Cards okay on both .177/.68, including theme changes and reconnection.
These are user-reported functional results, not instrumented FPS, memory or
long-term measurements. Separate detailed portrait/landscape results are not
reported. Tablet UIX remains unqualified; this run uses Card-Mod alone.

Both owned dashboards, resources and marker-guarded synthetic states are removed.
WWW directories are moved to recoverable File Studio trash. Original automatic
theme selection is restored. capture.mjs after comparisons pass: all seven
projects, six plugins and original trash entries per host are unchanged; all
531 original approved files on .177 and nine on .68 match the baseline.
Own test URLs return 404. PC evidence remains in the backup folder.

Only the oldest own test backups 760ac463 (.177) and 38a20113 (.68) are removed
under the user's test-backup cleanup authorization. The newest three full
backups remain: .177 d352abe0/fcd40035/86fcaf3c;
.68 5a0986d5/538b69e2/2003c901. No installed update is removed.

The user enabled sidebar entries for the tablet. Future test dashboards should
be sidebar-visible without Admin-only. The existing Stream Deck setup is
untouched. Public DE/EN/FR guides record results, boundaries and cleanup.
