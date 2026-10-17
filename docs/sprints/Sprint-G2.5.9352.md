# Sprint G2.5.9352 - Isolated live theme switches without remounting

2026-10-17. App 0.1.316 / framework 0.2.0-alpha.88 unchanged. Qualification only;
no runtime/package update, migration or version bump. Native Pi 5 and Proxmox
were neither queried nor changed.

## Backup and isolation

- Private evidence root: `C:/Users/rockb/source/backups/atlas-live-themes-20261017`.
  Main/docs Git bundles, user untracked roadmap copies, complete stopped HA
  configuration copy/tar and complete isolated runtime copy precede test work.
- HA baseline tar SHA-256:
  `6db4238511fde317777d096d5595194b4acf7248d020ae40291e259b8f10bf6a`.
- Original `atlas-themes-20261017` container/volume remained stopped. Two new
  clones run HA 2026.10.1 on loopback-only ports 4252/4253, with separate volumes.
  Existing ATLAS runtime was not started or modified.
- Card-Mod 4.2.1 and UIX 8.4.0 tested separately. In the Card-Mod clone only,
  omit the cloned UIX config entry and load the previously verified official
  Card-Mod asset. DOM evidence: 25 `card-mod` elements with no `uix-node`, versus
  26 `uix-node` elements with no `card-mod` in the UIX clone.
- Both use Bubble 3.4.2 and Mushroom 5.2.3. Original assets/configuration remain
  backed up. The cloned old fixture database recovers after its prior unclean
  shutdown; no production database is involved. Duplicate cloned instance-ID
  discovery warning is confined to these isolated Docker fixtures.

## Fixture and native HA switching

- Six native reference cards and six generated cards per engine: inherited and
  fixed-override Core, Bubble and Mushroom. Generated bundles use the current
  0.1.316 source; each passes 112 package-readiness checks. This task does not
  claim another actual Editor UI export/import cycle.
- Two inherited parent accents deliberately differ from primary fallback:
  green `#07956d` in custom light and violet `#9d7eff` in custom dark.
  Custom background/radius: `#f3f7fb`/18px versus `#172332`/26px.
  Fixed child background/border/radius remain pink/purple/9px in both modes.
- Initial server `frontend.set_theme` buttons do not override a fixed user
  selection inherited from the old fixture; this is not counted as a switch.
  Fixture-only controls instead dispatch the same native `settheme` event
  (`theme`, `dark`) handled by HA's installed frontend/profile implementation.
  Handler evidence is retained privately. No manual CSS-variable injection,
  browser hidden-state mutation or copied style-engine implementation is used.
- All setup reloads/profile navigation finish before the measurement baseline.
  During the measured sequence there are no reloads or navigation: custom dark
  -> light -> dark -> light -> default light -> default dark -> custom dark
  -> custom light. HA's actual dark-mode flag is exposed by the fixture as DOM
  text; color-scheme metadata provides supplementary evidence.
- A fixture probe assigns WeakMap UUIDs to every observed Core/Bubble/Mushroom
  custom element and the generated root, exposing only identities/time origin
  in visible DOM. The same 12 Card instances, generated root, probe session and
  document time origin survive all seven transitions per engine.

## Results and preservation

- 960 native/export computed-CSS comparisons pass: 10 nodes x 6 properties x
  8 snapshots x 2 engines. Properties: foreground/background, border width/color,
  radius and inherited accent. Additional explicit expectations validate actual
  theme changes, fixed overrides and exact return to previous custom styles.
- Backgrounds, text colors and inherited borders follow HA's
  light/dark modes. Bubble background/radius follows theme variables; explicit
  Bubble CSS and child Core/Mushroom overrides remain fixed. Screenshots reviewed.
  No browser error entries captured. No pixel-equality or timing SLA is claimed.
- `verify.mjs` and `preserve.mjs` pass. Original 103 HA files and 38 runtime files
  remain byte-exact, including all nine existing projects and original retention
  stores/settings/plugins. All 43 pre-existing WWW files and original dashboards
  also match in both new clones. No original user data is rewritten.
- Both owned browser tabs closed and both new containers stopped cleanly. New
  volumes/config snapshots/evidence retained for recovery; nothing is purged.
- DE/EN/FR Card Editor and development-status docs updated. Docs build and Git
  whitespace checks pass; existing Vite large-chunk advisory only. Runtime source
  is unchanged, so prior release tests/build are not repeated for this evidence.

## Boundaries / next step

This qualifies Chrome on the PC, HA 2026.10.1, the specified Card versions and
native HA mode handling through isolated fixture controls. It does not qualify
every theme, OS/browser color-scheme event, theme UI implementation or further
HA/styling version. Native mounted-Card theme changes remain a separate task
requiring fresh backups; Pi 5 and Proxmox remain untouched here.
