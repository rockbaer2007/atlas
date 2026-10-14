# Sprint G2.5.9275 - A5 native closed-transport recovery

2026-10-14. HA app 0.1.297; verification and documentation only.

Fresh Git, Administration and original editor backups are retained privately in
`C:/Users/rockb/source/backups/atlas-a5-closed-transport-20261014`.
Use separate direct native ingress editor tabs on Pi 5 ARM64 and Proxmox amd64.
Load 24 read-only Entity fields on the existing backup-manager sensor, arranged
as a 12x6 surface without overlaps. No physical device action is performed.

The user executes a guarded Chrome Console helper against the single existing
open HA WebSocket. It closes the transport with code 1000, retains the old
socket reference and observes old CLOSED plus editor CONNECTED within the
20-second observation loop. Both hosts report
`ATLAS_A5: alter Socket CLOSED, Editor erneut CONNECTED` without page reload or
manual connection action. The first helper attempts abort before closure;
corrected helpers accept Chrome's stored socket object or single-item array.
No credentials are read by the helper. This is human-assisted native evidence.

Fresh entity synchronization succeeds after recovery: 31 native HA entities on
Pi and 3728 on Proxmox. The VM also reports 144 Lovelace resources. Each fresh
project export retains all 24 field IDs, targets, entity bindings, positions and
sizes exactly. Restore both original projects and export again. Full editor
and Administration exports compare exactly to the fresh originals excluding
only createdAt/exportedAt. All six plugins remain active on each installation.
Own test tabs are closed after restoration; native resources and dashboards
are unchanged. Private before/after exports provide preservation evidence.

This proves automatic recovery after bounded client-initiated transport closure
on both native backends, using a Windows Chrome client. It does not prove a
prolonged network outage, backend restart under load, rejected-token recovery,
or Pi browser-rendering performance. Diverse user projects and native backend
load remain A5 work. No runtime change or package version bump is required.

DE/EN/FR development status and open roadmap are updated. Documentation build
and Git whitespace checks pass; prior runtime tests are not rerun for this
documentation-only increment.
