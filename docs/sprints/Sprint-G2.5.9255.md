# Sprint G2.5.9255 - Open roadmap after stabilization

Documentation-only increment, 2026-10-13. Runtime remains framework
0.2.0-alpha.88 / HA app 0.1.287.

- Replace the mixed delivered/planned roadmap with the current open ATLAS backlog.
- Persist priorities: real HA verification, ARM64/mobile, Simple/Expert decision,
  production readiness, French documentation and later deployment paths.
- Close A4 (roadmap cleanup) without marking other priorities complete.
- Remove completed feature inventories and separate standalone-plugin work from
  ATLAS work. Preserve unverified long-term directions and required references.
- Point agent rules at the open backlog; stop planning basic problem reporting.
- Align DE/EN/FR public next-step lists and correct stale public HA versions.

Completed history remains in Git, sprints and the stabilization record.
No settings, plugin contracts, package versions or runtime code were changed.

Validation: open priority IDs and current versions match all four roadmap/status
documents; local history links resolve. DE/EN/FR VitePress build and diff checks
passed. No runtime tests repeated because only documentation and working rules
changed. User-owned roadmap files and the untracked docs work folder are preserved.

Status: complete. A1 (real Home Assistant verification) remains the next priority.
