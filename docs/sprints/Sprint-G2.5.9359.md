# Sprint G2.5.9359 - Native 0.1.318 update and import verification

2026-10-18. Only approved hosts .177 and .68. Both updated from App0.1.317
to0.1.318; HA2026.10.2 remains unchanged. No runtime code change in this increment.

## Backup and preservation

Evidence: `C:/Users/rockb/source/backups/atlas-native-0318-20261018`.
ATLAS/docs Git bundles and fresh encrypted full HA backups precede updates:
.17759bccea1,138.5MB; .6882ca21c8,139.67MB, both11:27CEST.
Names: `ATLAS 177 vor 0.1.318 Importpruefung 2026-10-18` and the matching68 name.
Both include HA settings/history, SSL, media, share and installed Apps including
ATLAS317. Archives remain on hosts, not additionally downloaded to the PC.

Before snapshots capture seven existing projects/six plugins per host, plugin
management, Terminal config, trash and HA config files. .177 has a396-file
persistent mirror/tar; .68 private plugin storage is covered by the full HA
backup and semantic snapshots, with nine permitted config-file captures.
Fresh original local Editor JSON exports are saved exactly as found.

Final comparisons pass: all396 original .177 persistent files (including the
unchanged project index), all seven project entries per host, plugin/management
state, previous trash, selected configs and supplements remain exact. No new
server project, dashboard, resource, HA test entity or HA test file was created.
Positive imports affect only local browser drafts. Original complete local
Editors are restored by UI import/confirmation and actual exports compare
exactly excluding createdAt, both immediately and after reload.

## Passed checks and material findings

- HA UI and /app independently confirm both running Apps at0.1.318.
  Updates rebuild the App without restarting HA Core.
- Six Markdown cases per host, each through paste and actual file chooser:
  standalone JSON/YAML, nested Conditional JSON/YAML, valid ATLAS package shape
  and export payload. All24 are rejected at the import gate; visible code stays
  exact. Full Editor exports after rejection match pre-update originals.
- Supported Conditional inside a vertical-stack retains exact conditions and
  Entity name in JSON/YAML, both through paste and file import on both hosts:
  eight structural checks pass (apart from generated root grid options).
- **Open defect, no blanket positive qualification:** standalone Conditional
  JSON/YAML is accepted but its conditions disappear from actual Editor output;
  standalone Entity JSON/YAML replaces the custom name with an entity-derived
  name. Reproduced on both hosts through file import. Pure parser approval does
  not prove preservation by the later Editor application step. .318 exposes
  supported standalone candidates; this check does not establish when the later
  application defect first appeared. Do not describe it as newly introduced or
  previously absent without a controlled version comparison.
- Test helper correction: clipboard timing initially produced a false code
  mismatch; comparisons use the read-only visible #expert-editor-preview DOM
  text instead. Browser control timed out once; fresh bindings resumed testing.
  verify.cjs confirms24 rejections, eight exact wrapped imports, the four
  host/format finding pairs and original-state restoration/preservation.

## Documentation

DE/EN/FR document the completed native update, bounded Markdown success and
standalone losses. ROADMAP prioritizes the Editor application correction.
No automatic rollback: existing data is preserved and the limitation is explicit;
both full pre-update backups remain available. No claim of a new HACS ZIP,
theme/render matrix or HA restart test in this focused increment.
