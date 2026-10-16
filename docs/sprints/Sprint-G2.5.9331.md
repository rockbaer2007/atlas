# Sprint G2.5.9331 - Refresh public A5/A6/A7 status

2026-10-16. Documentation-only alignment after Sprint9330; no runtime or package
changes. Pi 5, Proxmox and the isolated HAOS VMs remain untouched.

- Back up both repositories as Git bundles before editing public documentation.
- Update the DE/EN/FR development-status pages in ugso-opensource-docs together:
  App0.1.312, integration0.1.306, A5/A6 complete within their documented scope,
  A7 Linux/systemd and native HA/HACS deployment implemented and verified.
- Summarize qualified Linux ARM64 reboot/credentials, shared plugins/projects,
  HACS release/update/recovery, Card locale/package integrity and full HAOS
  recovery with retained and changed IP. Preserve isolation/hardware limits.
- Mark original14-October reports as historical. Replace the obsolete A5/A6/A7
  next-work list with actual follow-up qualification: diverse projects/endurance,
  physical/ARM64 HAOS recovery and further HA/platform/API compatibility.
- Correct linked Linux and Card Editor introductions in all three languages,
  including the obsolete initial no-OS-reboot boundary. Correct the French HA
  guide's claim that native HACS installation is still unqualified.
- Keep historical version/test counts intact; no production-readiness guarantee,
  automatic address migration or complete external-plugin French UI is claimed.
- Build public docs with npm run docs:build, check both diffs and publish the
  documentation and ATLAS sprint ledger separately. User files/work stay intact.
