# Sprint G2.5.9350 - Bubble CSS import and generated root style inheritance

2026-10-17. HA App0.1.316, framework0.2.0-alpha.88, integration0.1.306 unchanged.
Fixes the two isolated findings from Sprint9349. No native Pi5/Proxmox access.

## Backup and implementation

- Private source/backups/atlas-css-fixes-20261017 contains pre-change main/docs/
  Add-on Git bundles, complete stopped HA config and runtime-before copy. Prior
  full HA baseline tar and theme evidence retained. Reused only own loopback
  atlas-themes-20261017 Docker fixture and127.0.0.32:4176 App.
- Native styles accept mapping or CSS string; card_mod/uix/uix_style retain
  mapping types. Import keeps exact strings, including empty values, while
  rejecting malformed native style arrays/scalars. YAML serialization retains
  strings. Existing nested field/entry ownership and objects remain intact.
- Newly exported Expert scripts route roots with uix/card_mod through native
  hui-card when available, assigning its config and forwarding live hass as
  before. This invokes the normal HA style-engine lifecycle for stack roots
  without ha-card. No CSS flattening, custom CSS parser or engine source copy.
  Direct helper fallback remains for hosts without the registered wrapper.
- Existing scripts/stored projects are not rewritten. Regenerate complete
  bundles for the runtime correction. Recover previously discarded Bubble CSS
  from original YAML/JSON or backups; the fix cannot reconstruct lost content.

## Regression and actual browser qualification

- New tests first reproduce Bubble import loss and direct creation bypassing
  the wrapper. Updated the older nested YAML expectation that encoded CSS loss.
-204/204 Home Assistant tests pass. New single/nested YAML/JSON HACS tests
  preserve multiline/template CSS and exact re-export; mapping/empty/invalid
  values covered. Generated-wrapper tests cover UIX and Card-Mod roots, entity
  remapping, live state forwarding and card sizing. Existing locale/race/
  fallback runtime tests continue to pass.
- pnpm build and node --check examples/status-demo/app.js pass.509canonical
  package files synchronized/checked in both main and external Add-on repos;
  both Home Assistant packaging tests pass. App version/changelog0.1.316.
- Actual Editor imports original raw YAML and JSON; copied output retains all
  six original cards, root UIX and byte-exact Bubble CSS. New separately named
  ATLAS Theme Fixed project saved/reopened through preview/Back up and apply.
- Actual UI HACS ZIP42612bytes imported and re-exported byte-identically;
 112/112 readiness checks on the real UI archive. Matching script/locales
  installed only in an added view in the own isolated HA dashboard, leaving
  earlier resources and original views/files intact.
- HA2026.10.1, Bubble3.4.2, Mushroom5.2.3, UIX8.4.0. Native/export pairs in
  custom light, dark and dark reload pass180computed-CSS comparisons including
  inherited properties, foreground/background, border width/color and radius.
  Green/light and violet/dark parent accents differ deliberately from primary
  fallback colors and now match. Bubble fixed background,3pxborder and9pxradius
  match, as do explicit child overrides and ordinary Bubble theme variables.
-273total private proof assertions include source, archive and data checks;
 180of these are computed-CSS comparisons. Screenshots and exact measurements
  retained. This verifies the specified UIX setup, not every styling engine/
  HA version. Profile navigation switches do not claim a continuously mounted
  Card theme-switch test. New Card-Mod wrapper has unit, not new browser proof.

## Data preservation and documentation

- All33pre-existing non-index runtime files and8existing project entries remain
  exact; only one separate own fixed project and recoverable backups added.
  Original local Editor configuration restored and re-export compared exactly
  except export timestamp. Existing settings/files/plugins/trash/history stay.
- DE/EN/FR Card Editor and development-status docs describe0.1.316, original
  source recovery, complete script/locales replacement and isolated boundaries.
  No automatic migration of user Card scripts or existing project contents.
- All40previous HA www files, original ui-lovelace.yaml and previous own
  dashboard view preserved exactly. Only the new separate fixed view/resource
  added. Own App and Docker fixture stopped, both own browser tabs closed;
  complete post-stop HA/runtime copies and proof retained. npm run docs:build
  passes (existing large-chunk advisory only); Git diff checks pass.
- Pi5/Proxmox stay at0.1.315. Native update qualification is the next explicit
  task; no native release installation or host restart performed here.
