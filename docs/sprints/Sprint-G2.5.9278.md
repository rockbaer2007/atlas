# Sprint G2.5.9278 - A5 native live-template workload

2026-10-14. HA app 0.1.297. Verification/documentation only.

Fresh native Administration and original project exports plus Git history are
saved privately in `C:/Users/rockb/source/backups/atlas-a5-live-templates-20261014`.
Original ATLAS projects remain untouched throughout this check. Start with the
previously verified structured 120-card ATLAS export, then extend its 40 Mushroom
secondary labels with distinct Jinja templates using now().strftime('%H:%M')
and states('sensor.backup_backup_manager_state'). Set explicit more-info actions.
This is a manually extended native test configuration, not a new ATLAS template
builder or proof that the unchanged generated export contains these templates.

Create one own empty HA dashboard without sidebar entry per host. Execute the
configuration only in real unsaved manual HA card previews on physical Pi 5
ARM64 and Proxmox amd64. DOM/shadow-root inspection confirms 40 Core Entity,
40 Bubble and 40 Mushroom card instances, all with nonzero dimensions and no
HA error card. Forty distinct rendered template values occur on each host.

Observe the clock labels update with no reload, no new config paste and no
physical device/state action. Pi's T001-T040 outputs change from 15:10 to 15:13;
VM's T001-T040 change from 15:12 to 15:13. Their read-only sensor suffix stays
idle. Both retain all 120 card instances after the update. Private before/after
DOM snapshots, normalized values and screenshots support the comparison;
verify-evidence.cjs validates all 40 identities/time changes and preservation.
The VM card catalog again briefly exceeds a browser action deadline while
loading installed Community previews; manual selection works after loading.

This adds bounded native server-template evaluation and automatic time-update
evidence. It does not measure template CPU/RAM cost, per-subscription transport
counts, exact update latency, long-duration stability or diverse changing
entities. A shared sensor and simple clock templates are not an expensive
template benchmark. The client is Windows Chrome, not a Pi-hosted browser.

Cancel both unsaved previews and exit edit mode. Fresh DOM observations confirm
no native test card instances remain and both own dashboards are empty.
Original editor/Admin exports match exactly except createdAt/exportedAt;
all six plugins remain active on each host. No native resource, original
dashboard, automation or physical device state is changed.

Cleanup of the two empty own dashboards awaits current-action user confirmation.
Documentation build and Git whitespace checks pass for DE/EN/FR status and
roadmap updates. No runtime code/package changes or version bump are required.
