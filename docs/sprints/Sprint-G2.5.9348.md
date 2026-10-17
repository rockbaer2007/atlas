# Sprint G2.5.9348 - Theme fixture preparation and Bubble CSS import finding

2026-10-17. Incomplete visual qualification, not a passing theme test.
App0.1.315 unchanged. No ATLAS runtime fix or release in this increment.

## Backup and restart recovery

- Private source/backups/atlas-themes-20261017 contains ATLAS/docs Git bundles,
  roadmap copy, runtime-before/runtime copies and full isolated HA baseline tar.
  HA tar SHA256 a8065da18f2384306c59217442ea8433873bf4a849114b56fcf3e7e427532a54.
- Own atlas-themes-20261017 Docker container/volume, loopback4250, cloned from
  previous isolated fixture. HA2026.10.1, Bubble3.4.2, Mushroom5.2.3, UIX8.4.0.
  Existing native Pi5 and Proxmox were not accessed or changed.
- Six-card fixture: inherited and overridden Core/Bubble/Mushroom pairs,
  parent custom property, custom theme with light/dark variables, original
  raw YAML/JSON saved. All original fixture files and prior backups retained.
- Workstation update/restart interrupts preparation. Reuse the stopped own
  container rather than creating another copy. Browser and node_repl Computer
  Use both fail to write kernel assets (Windows path not found), including
  after a JavaScript session reset. No browser tab could be created/controlled
  for this task. Do not replace missing browser evidence with API-only claims.
- UIX config flow succeeds in the own HA instance. Own App runs temporarily on
  127.0.0.32:4176 with fixture-only credentials; no native credentials used.

## Data-level results and open finding

- parseHomeAssistantEntitiesCardConfiguration drops Bubble's string-valued
  styles in both YAML and JSON input. Source has a nonempty CSS string with
  variable overrides; parsed card has no styles property. Core/Mushroom uix
  mappings and parent uix mapping are preserved, with6cards retained.
- Source location: preserveHomeAssistantCardStyles in
  packages/homeassistant/src/HomeAssistantCardConfiguration.ts accepts styles
  only when isRecord(card.styles). This does not handle Bubble's CSS string.
- HACS bundles generated from these parsed cards both report112/112 readiness
  checks and match the already-normalized card on package read. That does not
  prove preservation of the original imported CSS. Both completed local probe
  ZIPs and exact parsed/package data retained; no browser download performed.
- Direct /api/editor-projects save/read of the ORIGINAL raw six-card stack
  preserves Bubble CSS exactly. One new separately named own project retained;
  all6prior projects stay exact. This is a server API check, not manual UI
  save/reload, HACS UI import/export or a visible theme check.

## Outstanding work

- Repair browser automation runtime after the Codex/tool update and resume from
  resume.json and private helper scripts. No user data needs rebuilding.
- Fix/qualify Bubble string styles import separately before claiming a complete
  all-family theme roundtrip. No automatic replacement of user CSS was made.
- Still pending: actual light/dark and live theme switches, computed CSS across
  shadow roots, native/export rendering comparison, explicit overrides and
  full Editor UI save/reopen/export/import. No screenshots or passing visual
  assertion count claimed for this increment.
- DE/EN/FR docs and roadmap record the finding and pending qualification.
  npm run docs:build passes (existing large-chunk advisory only); Git diff
  checks pass in both repositories. No runtime code change, so no new release.
- Final cold-file comparison preserves all27original non-index runtime files
  and all6original project entries; the only project-index change adds the
  own source project. Own App/runner and Docker container stopped; post-stop
  HA directory copy, runtime tar, data/project/preservation proof and resume.json
  retained. No browser tab was created successfully during this task.
