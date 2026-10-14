# Sprint G2.5.9276 - A5 native mixed editor workload

2026-10-14. HA app 0.1.297. Verification/documentation only.

Before testing, retain Git history and fresh native original project/Admin
exports in `C:/Users/rockb/source/backups/atlas-a5-mixed-load-20261014`.
Use own direct ingress tabs on physical Pi 5 ARM64 and Proxmox amd64, with the
existing Administration-managed connection. Original projects have no fields.

Import 120 read-only fields: 40 Core Entity, 40 Bubble state, 40 Mushroom
Template, all bound to the existing backup-manager sensor. Their geometry
extends the visible surface to 12x60 with no overlap. Stored surface dimensions
are grid offsets, not absolute dimensions: the initial fixture's absolute
values normalize on import. Private fixture generator is corrected to native
canonical offsets (5,5); full field objects and normalized offsets match the
after exports. This is fixture normalization, not a runtime fix.

On both hosts select/edit field 120, apply its title, switch dark mode and
reload. Verify the edited title, all 120 fields, connection and no overlaps.
Switch EN/FR/DE, light mode and perform three sequential native HA refreshes.
Full final accessibility state confirms 120 fields and connected on both.
Differential AX snapshots omit unchanged text; omissions are not failures.
Pi returns 31 native entities; VM returns 3730 during the workload and 3728
after restoration. Counts can change with live HA catalogs. VM reports 144
resources. An explicit Pi resource check finds Bubble and Mushroom; the scan
summary counts scan-only entries separately from known dependencies.

Observed action-to-AX times for import confirmation/reload/sync are approximately
0.9-2.3 seconds. These include Windows Chrome automation and observation overhead,
use only a few samples and are not server timings or comparable benchmarks.
This tests editor layout/config generation, persistence and fresh HA requests;
the editor tiles do not mount 120 actual Lovelace card implementations. There
is no new native live-state transition proof, CPU/memory benchmark or rendered
120-card dashboard proof. Keep those limits explicit in public documentation.

Compare all 120 complete field objects to the normalized fixture, permitting
only the intentional final title edit. Restore both original projects and
Auto/DE presentation; turn off temporary resource debug. Fresh editor/Admin
exports match originals exactly excluding only export timestamps. All six
plugins remain active on each host. No HA dashboard, resource, automation or
physical device state is changed. Close own tabs after verification.

DE/EN/FR development status and roadmap record this completed bounded workload.
Documentation build and Git whitespace checks pass. No runtime code/package
changes; runtime tests and Docker builds need not be repeated for this increment.
