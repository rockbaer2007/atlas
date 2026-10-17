# Sprint G2.5.9354 - Combined isolated project qualification: findings and checkpoint

2026-10-17. App 0.1.316 unchanged. Qualification is incomplete and has a confirmed
product failure; no runtime fix, release or production update is claimed.

## Backup and isolation

- Evidence/checkpoint: `C:/Users/rockb/source/backups/atlas-total-project-20261017`.
  Fresh full stopped HA configuration mirror/tar, runtime mirror/tar, both Git
  bundles and copies of user-owned untracked roadmaps precede test changes.
- Original stopped `atlas-live-uix-20261017` and original local runtime remain
  byte-exact: 110 HA files and 38 runtime files. Native Pi 5 and Proxmox are
  neither queried nor changed.
- Two new HA 2026.10.1 containers use separate volumes, loopback 4254/4255.
  New runtime copies bind 127.0.0.34/35 with standard ports 4174/4175/4176.
  Card-Mod 4.2.1 and UIX 8.4.0 are tested separately; Bubble 3.4.2 and Mushroom
  5.2.3 come from the prior verified isolated baseline. Existing fixture account
  credentials stay private and are used only with its new local clones.

## Actual UI work and confirmed failure

- Nine leaf cards per project: three Core, three Bubble and three Mushroom,
  nested through vertical/horizontal stacks, grid and conditional. Inherited
  root/child styling, Bubble string CSS and Mushroom Jinja primary/secondary,
  icon and icon-color expressions are included. Synthetic lamp/temperature
  helpers belong exclusively to the local fixture.
- Actual Chrome UI raw YAML/Card-Mod and JSON/UIX import, guarded server-project
  save and HACS ZIP export completed. Each own project is saved twice, revision
  two; API reopen matches persisted data. All nine pre-existing project entries
  remain exactly equal. No original project is overwritten.
- **Failure:** `numeric_state` condition `above: -1` is dropped on import in both
  formats. Original source renders all nine native leaves, while the generated
  script reports a HA configuration error for the third conditional row.
  Source, copied UI output, actual downloaded ZIPs, AX trees and screenshots
  preserve positive native and negative export evidence.
- Static cause: conditional normalization in
  `packages/homeassistant/src/HomeAssistantCardConfiguration.ts` retains only
  condition/entity/state; its YAML serializer likewise omits numeric bounds.
  This task does not change that implementation.
- Both broken packages still receive 112/112 readiness checks. This establishes
  a semantic validation gap; package readiness is not proof of HA validity.
- A separate state-condition variant is imported/saved/exported in the actual
  UI. Structured comparisons verify nesting, supported state condition, complete
  Jinja text/icon/color expressions, Bubble CSS and root/child styles. Only the
  editor's expected root grid metadata is normalized for comparisons. Both
  state-variant packages pass 112/112 checks and archive package reading.
  This variant does not turn the failed numeric-condition case into a pass.

## Browser interruption and remaining work

- The actual HACS file-chooser flow times out at the first ZIP re-import. Its
  unhandled event rejection resets the browser REPL; initialization then fails
  because local kernel assets cannot be written. One explicit session reset
  followed by initialization fails identically. No alternative browser backend,
  CDP client or hidden-state mutation is used to bypass the failure.
- Actual visible HACS re-import/re-export equality, project UI reopening, combined
  live theme sequences, dynamic rendered Jinja changes and browser reconnection
  remain **unverified**. Prior individual feature qualifications remain distinct.
- `verify-built.mjs` records the exact expected defect and supported comparisons
  in `proof-partial.json`; this is a findings check, not an overall green result.
- Both new containers stopped normally; only the verified own runtime process
  tree stopped. New volumes, snapshots, projects, exports and browser evidence
  retained. Browser tabs cannot be explicitly closed after the tool failure;
  no claim of completed tab cleanup. No backup or test data purged.
- `preserve.mjs` passes: originals byte-exact, 37 unchanged pre-existing runtime
  files per clone plus unchanged original entries in the project index, all 48
  original WWW files and original dashboard files retained. New own projects
  and guarded-save backup files are additive.
- DE/EN/FR public docs describe the defect and unfinished qualification. No
  version bump or runtime test/build rerun: runtime source is unchanged.
- Documentation build and Git whitespace checks pass; existing Vite large-chunk
  advisory only.

## Next step

Preserve this evidence, correct conditional bounds/import/readiness coverage in
an isolated backed-up increment, then finish actual UI ZIP roundtrip, saved
project reopening, live Jinja/theme changes and reconnection after the browser
tool is restored. Keep Pi 5 and Proxmox unchanged until separately requested.
