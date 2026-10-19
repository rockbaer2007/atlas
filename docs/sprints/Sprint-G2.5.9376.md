# Sprint G2.5.9376 - Staged tablet rendering test prepared

Date: 2026-10-19. App 0.1.327 and HA 2026.10.2 unchanged.
Preparation only; no tablet qualification or product release is claimed.
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

## Tablet handoff and outstanding work

The user describes an older Galaxy Tab A, roughly eight years old, used only as
a virtual Stream Deck. An exact Android/browser version is not confirmed; the
reported sluggish ordinary dashboard does not establish its cause. The existing
Stream Deck setup must remain untouched. Start with the lightweight check,
then the small 12-leaf stage only if responsive. Do not force large views when
already stalled. Portrait/landscape, scrolling, state/theme updates, reconnect
and perceived latency on the actual tablet remain pending. 360/720 are optional
later stages conditional on responsive small-stage operation. No tablet UIX,
FPS or memory claim is made.

Public DE/EN/FR tablet instructions are linked from the Card Editor guide.
Owned hosted test views/assets/state remain available for the user's test;
they are not prematurely removed. Fresh and prior full backups are retained
during the ongoing tablet workflow. After the user's report, remove only own
test objects, move WWW assets to recoverable File Studio trash, compare data
again and retain the newest three completed full backups per test host.
