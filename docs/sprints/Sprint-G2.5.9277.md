# Sprint G2.5.9277 - A5 native rendered HA card workload

2026-10-14. HA app 0.1.297. Verification/documentation only.

Fresh Git history, native Administration and original editor exports are saved
privately in `C:/Users/rockb/source/backups/atlas-a5-native-rendered-load-20261014`.
Create one empty own HA dashboard per host, without a sidebar entry. Existing
dashboards/resources remain unchanged. Load a mixed 120-field fixture in ATLAS
and read the actual structured JSON from its Expert export preview. Preserve
the unmodified full native configuration for each host as private evidence.

In the real HA manual card preview, first paste a 30-card subset and then the
unchanged full 120-card ATLAS export. Both physical Pi 5 ARM64 and Proxmox amd64
mount all three native implementations. Read-only DOM/shadow-root inspection
counts 10 each of hui-entity-card, bubble-card and mushroom-template-card for
30 cards, then 40 each for 120 cards. Every counted card has nonzero dimensions;
no hui-error-card occurs. Full accessibility evidence includes the last card
and real backup-manager idle state. These are real HA cards, not ATLAS tiles.

Opening the last Mushroom card's entity detail works on Pi. Proxmox's installed
Mushroom template does not expose the same default button behavior; a Core card
near the end opens the real entity detail successfully. No physical control
action or automation runs. The VM HA card catalog, which previews many installed
Community cards, produces one transient browser-action timeout before manual
selection; this is separate from the 120-card preview. It recovers without HA
restart, changing resources or modifying existing dashboards.

Observed paste-to-full-AX samples: Pi 600ms/921ms and VM 593ms/954ms for 30/120
cards. These include Windows Chrome browser automation and observation latency.
They are one sample per stage, not backend/server timings or statistically
valid hardware comparisons. All fields share one existing read-only sensor,
and Mushroom labels contain no new expensive server-side templates. No new
state transition is induced. CPU/RAM profiling, diverse entity workloads,
large live-template workloads and long-running/outage tests remain separate.

Cancel both unsaved card previews and leave edit mode. A later fresh DOM check
confirms no card instances remain and both own dashboards are empty; immediate
post-cancel observations still contain elements during dialog teardown. After
explicit current-action user confirmation, permanently delete only the two own
empty dashboards named ATLAS A5 Renderlast temporärer Test. Confirm each entry
is absent from the native dashboard table. No card is saved to a dashboard.

Restore both original ATLAS projects. Full fresh editor and Administration
exports exactly match originals except export timestamps. All six plugins
remain active per host. Close four own tabs; original user tabs remain open.
Private exports, configurations, native DOM counts, accessibility evidence and
screenshots support this bounded check. No runtime code/version change is needed.

DE/EN/FR development status and open roadmap are updated. Documentation build
and Git whitespace checks pass; runtime/Docker checks are not repeated for a
documentation-only verification increment.
