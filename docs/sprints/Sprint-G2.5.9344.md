# Sprint G2.5.9344 - Preserve imported Card-Mod and UIX styles

2026-10-17. App0.1.315; integration0.1.306 unchanged. Isolated only.
Pi5 and Proxmox not accessed or modified.

## Backup and isolation

- Before edits, main/docs/add-on Git history bundles, both user roadmaps,
  complete25file persistent runtime mirror and separate runtime-before copy,
  plus the previous isolated HA archive retained privately in
  source/backups/atlas-card-mod-20261017.
- HA before SHA256:
  be491fc82ad46029d192580e22409e494d9e096dfb8d6207fc2be0e4049c9693.
- Fresh HA2026.10.1 container/volume atlas-card-mod-20261017, loopback4244;
  proxy4245; App127.0.0.31:4176, internal standard4174/4175.
  Known isolated fixture credentials only. No production access.

## Implementation

- Typed card style configuration preserves card_mod/uix/uix_style mappings in
  normalization and YAML serialization, including nested stacks, grids,
  conditional and Tabbed Card children. JSON naturally serializes these objects.
- Styled single-card fields keep raw card data instead of rebuilding away
  styles or an entities list. Glance fields retain their imported raw styles.
  Existing stored data is not migrated or overwritten.
- UIX export converts card_mod properties structurally in card trees and
  exported Editor fields. Preview, package content and generated script use
  the same converted data, for JSON as well as YAML. Source workspace fields
  remain unchanged. Existing uix and uix_style blocks are preserved; a same-card
  uix collision keeps both engines without merging/overwriting.
- Preview inspection no longer copies parsed style objects by entity ID onto
  unrelated cards; structured styles stay at their exact card position.
  Backward style lookup avoids appending another copy already preceding entity.
- Seven regression cases cover10card types, all3style keys and both formats,
  nested style ownership, CSS/Jinja whitespace, shadow selectors, HACS re-import,
  deterministic re-export, UIX conversion/collision and styled single fields.
  Full HA suite199/199 passes, pnpm build and app.js syntax check pass.
  Both package mirrors509files verify; packaging tests2/2 pass.

## Actual browser and preservation proof

- Raw YAML stack: root card_mod, Mushroom card_mod with selector mapping and
  multiline CSS/Jinja, second Mushroom uix, an unstyled Core card and a Core
  button with uix_style. All four use the same entity to expose wrong ownership.
- Actual browser YAML/card-mod export -> completed ZIP import -> export passes
  112/112 and is byte-identical. Existing UIX objects remain present. Preview
  parses with the exact original style ownership; unstyled card stays unstyled.
- Select JSON and uix export -> actual ZIP import -> export likewise passes
  112/112 and is byte-identical. Card-Mod root/child become UIX, original UIX
  and uix_style stay intact. Parsed package content, Editor-plan-derived config
  and DEFAULT_CARD in the generated script match all style objects exactly.
- Direct normal JSON import of a styled Mushroom single card produces the
  exact original card object, including multiline CSS and Jinja source.
- YAML36,474bytes SHA256
  8230ffe37c0c9836ae8ae177614720be95f339fadd3d59cc0cfe372875b32977.
  UIX JSON36,731bytes SHA256
  99f865bb848691af4d0a8a83831c40d15e58064142df885c7c0dbde6aa19385f.
- All24original files except projects index match byte-for-byte. Index is
  extended by own ATLAS Styles Roundtrip project; original5project entries,
  revisions and contents remain exact. New project retains original styles.
  Settings, config, plugin state, trash and history preserved.
- DE/EN/FR Card Editor/status/version docs corrected together; old0.1.314
  style limitation marked fixed. ROADMAP now points to native qualification.
  Documentation build passes.

## Evidence and limits

- Raw imports, completed ZIP pairs, preview text, screenshot, proof.json and
  before/after copies retained privately. Runtime after SHA256:
  741b4759e6156d22807e4c02c74df50619880a3173077ecc6b8cd82166eeead1.
  Stopped HA after SHA256:
  a8065da18f2384306c59217442ea8433873bf4a849114b56fcf3e7e427532a54.
- Own browser tab, runner/process tree and container stopped. Volume and
  backups retained. No pruning, original file deletion or native updates.
- Preservation covers mapping-style configuration, not installing UIX/Card-Mod
  or proving arbitrary CSS rendering in different extension versions.
  Previously discarded styles cannot be reconstructed without original import
  or backup. card-mod export preserves existing UIX keys, not reverse conversion.
