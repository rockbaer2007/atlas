# Sprint G2.5.9342 - Native App0.1.313 and Mushroom import qualification

2026-10-17. Qualification only: App0.1.312 -> 0.1.313, HA2026.10.1,
integration0.1.306 unchanged. Proxmox first, then Pi5. No runtime changes,
new release or HA Core restart required.

## Safeguards

- ATLAS/docs history bundles, both user roadmaps, complete local Editor JSON
  exports, persistent ATLAS file mirrors/tars and selected HA files retained
  privately in source/backups/atlas-native-0313-mushroom-20261017.
- Fresh encrypted local HA backups: VM b34b6b26,4.67GB,11:17CEST,
  HA/settings/history/SSL/ATLAS; Pi2aebe9e1,135.92MB,11:16CEST,
  HA/settings/history/SSL/all three installed apps. HA displays these as
  Custom backup2026.10.1 despite the requested descriptive names.
  Complete encrypted HA archives remain on hosts; PC mirrors are not full HA
  backups. Other VM apps are outside the targeted VM backup.
- Both updates explicitly target0.1.313 with retention of the previous App
  version enabled. No unrelated App, HACS card or plugin updated.
- Passive sensor.cpu_speed on VM and sensor.backup_backup_manager_state on Pi.
  Jinja now().minute parity changes text/icon/color naturally; no HA service
  calls or device operations and no new helpers/resources/HA test files.

## Actual native workflow

- On each host, actual normal UI imports of single YAML, single JSON, stack
  JSON and stack YAML generate exact primary/secondary/icon/color/icon_color
  source strings, including primary boundary newlines and Jinja block text.
  Single cards remain Mushroom fields, not Core entity fields.
- Own separate server test project is saved, reopened and retained at revision2.
  Complete fields match actual bundle editorPlan entries; original two project
  entries, contents and revisions per host remain exact.
- Actual browser JSON-format HACS export -> completed ZIP import -> re-export
  is byte-identical per host, EN/DE/FR included, readiness112/112:
  VM33,126bytes, SHA256
  e879d7fba114f5ecddbcaac25425e3b60f4aa12123e987d36a518a4467a6385e;
  Pi33,388bytes, SHA256
  671f8de09dede412761ac998b71ecd80ca35f75f70e501696fdd82882935b99e.
  User releases browser-blocked downloads; no partial download is used.
- Unchanged generated stack code runs in an unsaved HA card preview on each
  host: odd/even minute -> Ungerade/Gerade Minute, lightbulb-off/on,
  blue/amber; second card -> Kühl/Warm, thermometer-low/high, green/red.
  Primary and secondary DOM text, computed tile colors and exact MDI SVG paths
  checked for both states without preview reload. Secondary reads real passive
  sensor state. Legacy icon_color is source-preservation-only; current color
  controls these installed Mushroom renders.
- Previews discarded, not saved as dashboard cards. Both own empty dashboards
  atlas-mushroom-0313-test-20261017 removed after explicit user confirmation.
  No module resource installed. Original dashboard/resource records preserved.
- Full original local Editor configuration restored via JSON import/confirmation.
  Actual fresh exports compare exactly except createdAt, including all36fields,
  groups, names, export choices and local mappings. Both Editors connected.
- Direct Administration/Hub and embedded Runtime Hub display existing six
  active plugins. Pi panel required its normal Reload control once after an
  initial loading notice; it then visibly shows all six plugins. DE/dark,
  approved controls/roots, HA URLs, remembered env connection and auto-connect
  retained; no raw token/browser storage extraction.

## Preservation and limits

- VM225 and Pi229 original ATLAS file contents preserved. Only projects index
  extended by own test entry, with own project workspace/backups added
  (seven VM/eight Pi files). History, trash, plugin state, terminal config and
  checked HA config/automation/script/scene/integration/resource files match.
- No physical network outage, CPU/RAM load, arbitrary templates/options or
  updated generated script installation claimed. Native qualification renders
  generated raw configuration in HA preview; actual downloaded script execution
  is separately established by isolated Sprint9341.
- DE/EN/FR public Card Editor/status docs and roadmap updated. Documentation
  build and diff checks pass. No code change, so no new runtime build/version bump.
- Keep backups, separate named test projects and evidence; close only own tabs.
