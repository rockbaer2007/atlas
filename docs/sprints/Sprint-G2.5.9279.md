# Sprint G2.5.9279 - A5 native container CPU/RAM observation

2026-10-14. HA app 0.1.297. Verification/documentation only.

Save fresh native original editor/Admin exports and Git history privately in
`C:/Users/rockb/source/backups/atlas-a5-cpu-ram-20261014`. Keep original projects
untouched. Use the existing saved Terminal connection on each host without
reading credentials. The installed HA CLI retrieves only Core and ATLAS app
container statistics. No host configuration, integration or package is changed.

Run the same bounded Node/CLI sampler on Pi 5 ARM64 and Proxmox amd64: four
baseline sample pairs, fourteen load pairs, four recovery pairs. Each pair
reads Core then ATLAS; pause five seconds between pairs plus request runtime.
There are 22 observations per target per host, 88 statistics calls in total.
The CLI's addons alias reports deprecation but returns valid statistics.
Read-only sampling itself contributes to ATLAS container CPU/RAM in all phases.
Private sanitized sample arrays and summaries are complete; verify-results.cjs
checks indices, counts, finite data and statistics within rounding tolerance.

Load is the previous native 120-card configuration with 40 Core Entity,
40 Bubble and 40 Mushroom cards, including 40 distinct clock/sensor Jinja
templates. Execute only in unsaved previews on own empty HA dashboards. Both
hosts retain 120 nonzero-size native card instances and all 40 template outputs
change during the observation. No reload or physical device action occurs.

## Native container results

CPU is Supervisor cpu_percent. RAM is memory_usage converted to MiB.
B/L/R denote baseline/load/recovery medians. Load CPU maximum is the largest
observed sample, not a continuous peak measurement.

| Host / container | CPU B/L/R (%) | RAM B/L/R (MiB) | Load CPU max (%) |
| --- | --- | --- | --- |
| Pi / HA Core | 0.13 / 0.18 / 0.09 | 461.10 / 460.55 / 460.71 | 0.33 |
| Pi / ATLAS | 0.01 / 0.00 / 0.01 | 88.56 / 82.04 / 83.23 | 0.02 |
| VM / HA Core | 2.50 / 1.71 / 1.92 | 1374.49 / 1390.87 / 1388.90 | 21.71 |
| VM / ATLAS | 0.01 / 0.00 / 0.00 | 89.17 / 87.63 / 88.50 | 4.04 |

The VM Core load RAM median is 16.38 MiB above baseline and recovery remains
14.41 MiB above it. Existing integrations/background work continue running.
Do not attribute the difference or the isolated CPU spike solely to the test.
The shorter baseline/recovery windows are not equivalent statistical populations.
RAM returning exactly to baseline is not required by a cache/GC-based runtime;
this short check neither proves nor excludes a leak. ATLAS RAM samples include
the sampler/CLI and should not be advertised as its idle production footprint.

These are native container observations, not whole-Pi/whole-Proxmox-host metrics,
Windows Chrome CPU/RAM or a hardware comparison. Initial mount peaks may be
missed because load sampling begins after mounting. Load spans at least 65
seconds plus CLI runtime; baseline/recovery each at least 15 seconds plus CLI
runtime. Sampling is staggered across hosts, uses one shared sensor and simple
templates, and cannot establish long-run stability or worst-case capacity.

Cancel both previews and confirm native test card instances are gone before
recovery sampling. After explicit current-action user confirmation, delete only
the two empty CPU-RAM test dashboards and verify zero matching table entries.
Disconnect own Terminal sessions once samplers report done. Fresh final editor
and Administration exports exactly match before except export timestamps;
all six plugins remain active per host. Close six own tabs, preserve user tabs.

DE/EN/FR development status and roadmap are updated. Documentation build and
Git whitespace checks pass. No runtime code/version change or Docker rebuild.
