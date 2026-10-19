# Sprint G2.5.9375 - Large exported Cards rendered in Home Assistant

Date: 2026-10-19. App 0.1.327, framework 0.2.0-alpha.89, HA 2026.10.2.
Qualification/documentation only; no ATLAS release or package update.
All network/browser tests use only .177 and .68.

## Safety and protocol

Evidence: `C:/Users/rockb/source/backups/atlas-ha-large-render-20261019`.
ATLAS/docs Git bundles and read-only server captures precede changes. Fresh
encrypted full HA backups fcd40035 (.177, 138.89 MB) and 538b69e2 (.68,
140.02 MB) include HA settings/history, SSL, media, share and all three Apps.
No full-archive PC download or restoration is claimed. Existing Editors are
not opened or modified. No permissions are widened for File Studio or Terminal.

The two real 36-field projects from Sprint9374 render 360/720 nested children
with Core Entity/Button, Conditional, Bubble and Mushroom. Their original
authored content is retained. Separate owned copies use a synthetic sensor,
numeric Conditional, dynamic Mushroom primary/secondary text, icon and color.
Both Mushroom color properties use the same expression to avoid contradictory
fixture settings. A stack defines a 17px CSS custom property for inheritance.
Card-Mod styles use a 3px border and 19px radius; native UIX Button styles use
5px/23px to prove precedence. Bubble background opacity is 0.7.

Four generated HACS fixtures pass 112/112 readiness checks. This increment
qualifies their HA rendering, not another browser export/import round trip.
Each view includes four matching native reference Cards outside the generated
Card. Thus 360/720 counts exclude the four reference Cards and container Cards.

## Separate engines and results

Card-Mod 4.2.1 runs alone, then its resource is replaced by a loader without
Card-Mod and all owned rendering pages are closed. With explicit user approval,
UIX 8.4.0 is installed through HACS, HA restarted and its integration added on
both hosts. Fresh pages load UIX alone. Existing Bubble 3.4.2 and Mushroom 5.2.3
resources retain their original IDs and URLs.

- Both original sizes render in light and dark with each engine on each host.
- Dynamic copies render every authored child and update Mushroom text,
  snowflake/blue at 18 and fire/red at 28, without page reload.
- Every generated leaf matches computed native reference CSS: text/background,
  border, radius and Bubble opacity. All dynamic leaves inherit 17px.
  UIX processes card_mod and gives the expected native uix Button 5px/23px.
- 62 qualified snapshots contain 33,120 leaf/native comparisons, zero error
  Cards. Theme transitions are sampled after settling, not mid-animation.
- Eight deliberate socket closures cover both hosts, sizes and engines.
  Recorded requested-close/disconnected/ready, closed old socket, connected HA
  and unchanged performance.timeOrigin prove automatic recovery without page
  reload. HA may rebuild the view and its Cards during recovery; stable DOM
  identity across reconnection is not claimed. State updates still work.

## Harness corrections and boundaries

Initial Chrome module-load failures occur despite HTTP 200 assets. The user
reloads the first owned views; fresh documents subsequently load UIX. Early
unloaded-engine samples are excluded in pre-uix-load/. Preparation also aligns
Mushroom color/icon_color and uses versioned loaders to avoid stale fixture
modules. Final evidence filenames carry r2/r3/r4 and settled; unqualified earlier
snapshots remain separate. A first reconnect helper incorrectly uses close code
1001, forbidden to browser scripts; corrected 4001 is used in final r4 evidence.
A module-scoped recorder survives HA view reconstruction. Multiple probe
listeners can report the same connection event; eight requested closures, not
listener notifications, are counted. The verifier checks r4 reconnection pairs.

This is a functional rendering check in Windows Chrome, not an FPS, latency,
isolated-memory, tablet/ARM64-browser or long-term stability benchmark. The HA
hosts include ARM64, but that does not make the browser ARM64. Four native
reference Cards are representatives, not pixel-diff references at every width.

## Preservation and cleanup

Both hosts preserve all seven server projects, six plugins, management/Terminal
settings and HA version. All 417 original approved files on .177 and nine on
.68 remain byte-identical, including original Lovelace registries, configuration,
automations, scripts, scenes, config entries and captured frontend user data.
Existing trash entries remain identical; only own WWW history/trash is added.
Private .68 plugin files remain covered by the full backup without expanded access.

Own test states, dashboards, resources and UIX entries are removed. HACS shows
UIX available for download again. Owned WWW directories move to recoverable
File Studio trash; PC evidence is retained. Original automatic theme mode and
resources are restored. Final restarts unload the temporary integration.
Both post-restart preservation comparisons pass again; removed UIX and own
loader URLs return 404 on each host. Public DE/EN/FR Card Editor/development
status documentation builds with npm (existing chunk-size advisory only), and
both repositories pass git diff --check. No runtime source changed, so the
previous package-test/build result is not presented as a new code test run.

Unfiltered final lists initially contain four completed full backups per host.
The action-time confirmation for deleting only 5a52e7ab (.177, 138.73 MB) and
9dfbb12e (.68, 139.93 MB), both named ATLAS ... vor HACS Paketgrenzen 2026-10-19,
is requested. No extra PC copy of these old full archives is verified. Once
approved, the newest three are fcd40035/86fcaf3c/760ac463 on .177 and
538b69e2/2003c901/38a20113 on .68. Installed updates and PC evidence remain.
