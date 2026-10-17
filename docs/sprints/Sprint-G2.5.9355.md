# Sprint G2.5.9355 - Conditional preservation and combined isolated project

2026-10-17. HA App 0.1.317; framework 0.2.0-alpha.88 and HACS integration
0.1.306 unchanged. No native Pi 5 or Proxmox access, deployment or restart.

## Backup and correction

- Fresh stopped fixture configuration and cloned runtime backups, main/docs/
  add-on Git bundles: `C:/Users/rockb/source/backups/atlas-conditional-fix-20261017`.
  Earlier failing evidence remains in `atlas-total-project-20261017`.
- Conditional imports retain complete structured condition data rather than
  narrowing it to condition/entity/state. Numeric above/below (including zero
  and negative values), entity_id, state lists/state_not, screen/user options
  and logical child conditions survive. The existing YAML library serializes
  complete Conditional cards, preserving nested values and multiline strings.
- Missing/invalid numeric bounds and non-object conditions raise a typed error.
  HACS package reading rejects these through the existing readiness gate and
  returns only the known validation explanation; unrelated errors remain generic.
  This is targeted numeric validation, not a complete HA condition-schema checker.
- Existing stored projects are not migrated or rewritten. Previously lost bounds
  need their original source/backup. Regenerate existing exported scripts.
- Official HA Conditional documentation confirms numeric bounds and complete
  condition shapes: https://www.home-assistant.io/dashboards/conditional/.
  Native rendering here remains pinned to HA 2026.10.1.

## Regression and package verification

- Nine regression tests cover YAML/JSON, nested logical and numeric conditions,
  state lists and screen/user data, byte-equal archive roundtrip, malformed
  bounds and rejection of an existing broken package. All 213 HA package tests
  pass, as do the full build and both HA packaging tests.
- App/package version bumped together to 0.1.317. Canonical source package and
  separate add-on repository synchronized; no native hosts updated.

## Actual combined-project browser qualification

- Resume only the two existing isolated HA clones on loopback 4254/4255, with
  separate cloned App storage at 127.0.0.34/35:4176. Both live Apps report317.
  Card-Mod4.2.1 and UIX8.4.0 remain separate; Bubble3.4.2/Mushroom5.2.3 unchanged.
- Nine native reference leaves and nine exported leaves per engine: Core,
  Bubble and Mushroom inside horizontal/vertical stacks, grid and numeric
  Conditional, with root/child CSS and Mushroom Jinja primary/secondary,
  icon and icon color. Same original failing above:-1 source used.
- Actual UI import, guarded save and preview/reopen pass in YAML/Card-Mod and
  JSON/UIX. Actual HACS UI ZIP re-import/re-export is byte-identical for both,
  with112/112 readiness checks. The previously broken archive is visibly blocked
  with its numeric-state explanation; the current valid workspace is retained.
- Use the visible file-input label for upload. Clicking the hidden input was
  the prior fixture-control failure; the supported label/chooser flow works.
  Old duplicate negative/positive script resources are removed from only the
  owned clone configuration before rendering; old files/evidence retained.
- Jinja transitions18->28 and lamp off->on change actual text, SVG icon geometry
  and blue/red computed icon color for all six Mushroom instances per engine.
- Numeric Conditional hides the third native and generated row at -2 and
  restores it at18. The negative value is a deliberately injected synthetic
  local REST state, since the old fixture helper's service minimum is zero.
  Normal helper services restore18/off afterward. No physical devices involved.
- Four in-place theme transitions per engine: custom light -> dark -> default
  light -> default dark -> custom light. All19 observed Card/root identities,
  probe session and document time origin stay stable during that sequence.
  Native HA settheme controls are used; no injected CSS-variable substitution.
- `verify-built.mjs` records972 native/export computed-CSS comparisons across
  nine snapshots and both engines, with explicit custom-theme backgrounds,
  radii and inherited accents. Text, icons, styles and document identity pass.
- Real isolated HA stop/start yields closed on both Editors, then connected
  without reload/manual start. Fresh28/on template events update all cards
  after reconnection, and Editor code stays exact. HA naturally remounts its
  dashboard/probe after restart; only document identity is required across the
  outage. Stable Card-instance identity is claimed for theme switches only.
- Screenshots visually reviewed. Chrome on the PC, synthetic entities, bounded
  layout/versions; no ARM browser benchmark, universal condition validation,
  hardware actions or additional soak duration claimed.

## Preservation, cleanup and documentation

- `proof.json` and `preservation-proof.json` pass. Per clone, all43 original
  runtime files outside the project index remain exact; all10 previous project
  entries remain exact. One new own project per clone is additive. All56/55
  original WWW files and original dashboards are retained; existing configuration
  is unchanged apart from known owned resource registrations.
- Original earlier runtime remains byte-exact. Both new HA containers stopped
  normally; only the verified own runtime process tree stopped. States restored
  to18/off; snapshots, projects and exports retained, nothing purged.
- Four current test tabs closed. Four old tabs from the interrupted pre-restart
  session still reject attachment/close with a detached-debugger error, including
  fresh claim attempts. Their cleanup cannot be confirmed; no unrelated tabs
  touched. These old tabs may be closed manually.
- DE/EN/FR Card Editor and development-status docs updated, including native
  hosts remaining0.1.316 and the recovery limits for previously lost bounds.
- Docs build, all three Git whitespace checks and510-file source/add-on package
  consistency checks pass. Existing Vite large-chunk advisory only.

## Next

Qualify the0.1.317 native update on Proxmox/Pi5 only when requested, with fresh
backups and preservation checks. Previous failed evidence remains historical.
