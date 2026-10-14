# Sprint G2.5.9280 - A5 user-confirmed three-minute network recovery

2026-10-14. HA app 0.1.297. Verification/documentation only.

Before the intended interruption, save fresh original native editor/Admin
exports, Git history and user-owned untracked roadmaps privately in
`C:/Users/rockb/source/backups/atlas-a5-long-outage-20261014`.
The user agrees to disconnect Pi LAN and the HA VM virtual NIC in Proxmox.
They report Pi reconnected, then VM reconnected. In the explicit follow-up,
they confirm each interruption lasted approximately three minutes and both
ATLAS editors reconnected automatically without reload or manual connect.
This is a user-observed native recovery result on Pi 5 ARM64 and Proxmox amd64.

Keep the independent evidence separate: fresh post-recovery native checks show
Pi connected with 31 entities and VM with 3727 entities/144 Lovelace resources.
Fresh entity synchronization succeeds. All six plugins remain active per host;
ATLAS app start times remain unchanged. Full before/after editor and Admin
exports compare exactly excluding only export timestamps. Private
verify-preservation.cjs reproduces all four comparisons without printing secrets.
Original projects have zero Expert fields and were not modified.

The planned 100-field fixture import did not run before the interruption:
Pi navigation timed out and eventually completed after recovery; the VM editor
was freshly opened for post-recovery verification. Monitoring helpers were
prepared and syntax checked but no helper output appears in the own tabs or
is supplied by the user. Do not claim instrumented socket closure, retry counts,
precise duration/latency or 100-field preservation for this outage scenario.
Fresh agent page opens verify recovered availability, not the user's no-reload
observation. Earlier bounded socket/field tests remain separate evidence.

No settings, native resources, dashboards, plugins or physical entity states
are changed by the agent. Own two tabs are closed after checking preservation;
the user's tabs remain open. The three-minute scenario is complete within the
user-confirmed scope. Repeated/longer outages under diverse workload and a
fully instrumented failed-retry trace remain possible follow-up verification.

Update the open roadmap and DE/EN/FR public development status with the evidence
boundary. Documentation build and Git whitespace checks pass. No runtime code,
package version bump or Docker rebuild is required for this documentation task.
