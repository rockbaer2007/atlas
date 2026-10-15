# Sprint G2.5.9299 - App reload diagnosis and qualification correction

2026-10-15. Investigate the Proxmox App loading symptom from Sprint G2.5.9298.
No runtime/package changes, new release, HA restart or plugin changes.

## Recovery boundary

- Source Git bundle retained before investigation at
  `C:/Users/rockb/source/backups/atlas-proxmox-reload-20261015/atlas-before.bundle`.
- New encrypted local native backup `2c2b27e5`,
  `ATLAS Proxmox vor Ladefix 2026-10-15`, completed at 15:28, 4.67 GB.
  Includes HA settings and ATLAS 0.1.303 plus SSL; media/share and unrelated
  apps excluded. Detail labels the HA component settings/history; history
  coverage is not independently verified. No Cloud/SFTP destination selected.
- Existing backups, settings, projects, credentials and six plugins retained.
  No project save, plugin import/install, configuration submission, cache purge
  or integration disable operation is performed.

## Findings

- Automated fresh loads reproduce the HA overlay with an empty `about:blank`
  iframe even though its DOM source points to the existing Ingress URL.
  Opening that same URL directly displays the ATLAS Hub and six active plugins.
- The automated fresh-load symptom also occurs for Studio Code Server, so the
  observation does not establish an ATLAS-specific failure.
- UIX 8.4.0 is present and patches the HA App host. Its experimental frame
  styling option is already off. Inspect settings without submitting changes.
  A sidebar-card error is present in HA logs; neither extension is established
  as the cause. Temporary URL-only `sidebarOff` test does not fix the symptom.
- The user explicitly confirms normal manual F5 reload works on Proxmox.
  Inspect the user's successfully reloaded `/app/a5967f93_atlas` tab: complete
  Hub, six detected and six active plugins. Save a private screenshot.
- The user additionally confirms Pi access works. This is user-reported;
  no new Pi modification or backup is necessary in this investigation.

## Outcome and limits

Close the proposed ATLAS product-fix task as a corrected diagnosis: normal
manual reload is confirmed working, and no ATLAS regression is demonstrated.
Remove the previously inferred product defect from the open roadmap.
The automated-path discrepancy remains unresolved; its precise cause and
foreground/background timing are not proven. Do not claim a code fix or full
automated reload coverage. Preserve this limit in future native test reports.

Only qualification documentation changes. `git diff --check` passes; no build
or runtime unit tests are rerun for documentation-only corrections.
