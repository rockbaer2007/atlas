# Sprint G2.5.9343 - YAML/JSON HACS export, readiness and re-import parity

2026-10-17. App0.1.314, integration0.1.306 unchanged. Isolated only;
Pi5 and Proxmox not accessed or modified.

## Safeguards

- Before edits, main/docs/add-on Git history bundles, both untracked user
  roadmaps, all22 persistent fixture files and the prior isolated HA archive
  copied privately to source/backups/atlas-hacs-yaml-20261017.
- HA before archive SHA256:
  3875823e4adda8ae3c9db46d9c8517b841e5eee1bed462cd5f8bb23c9f0f20fb.
- Fresh own HA2026.10.1 Docker volume/container, HA loopback4242, transport
  proxy4243, App127.0.0.30:4176 and internal standard4174/4175.
  Only known isolated fixture credentials used; no native credentials read.

## Change and regression evidence

- Export/import already support YAML. The readiness report incorrectly required
  JSON in one check while accepting both in another. Both now share one
  supported-format predicate. Diagnostic code package-format-json is renamed
  package-format-supported; consumers matching this identifier must adapt.
- JSON .atlas-card.json envelope, manifest schema, locale files, runtime script,
  archive layout and existing rejection contracts remain unchanged.
- Five regression cases cover both formats, exact template/editorPlan retention,
  deterministic re-export, format-independent runtime/locales and refusal of
  malformed content or missing FR locale. Full HA suite192/192 passes;
  pnpm build passes. Both package mirrors508files verified; package tests2/2.

## Real browser roundtrip

- Import nested Mushroom YAML with boundary newlines and multiline Jinja text,
  secondary text, dynamic icon and color. Save own separate server project
  ATLAS HACS YAML Roundtrip; original four projects remain exact.
- Actual normal browser HACS export -> completed ZIP import -> export for YAML
  and JSON, EN/DE/FR selected. Selected format restored. Both report112/112
  passed,8/8 groups ready. Each pair is byte-identical; fields and template
  strings compare exactly across formats and against the raw fixture.
- YAML32,301bytes SHA256
  71dbf911d8ad40accc9ad5277ece695cb89c8f310d24ae10804e78da47136979.
  JSON32,469bytes SHA256
  fc7442c2ad7b112926ee0c685ff838b13f3e59cc64bd287f8e14d2ece34c3105.
- Existing21files retain exact hashes. The22nd projects index is extended
  only by the own test project; original entries and revisions are exact.
  Settings, plugin state, config, trash and history preserved.
- Additional finding: imported card_mod style is detected in preview metadata
  but absent already from the first exported package, in both formats. No
  claim of style roundtrip preservation; a separate fix is now in ROADMAP.
- DE/EN/FR public Card Editor, status and version pages updated with format
  rules, diagnostic rename, evidence and limits. Documentation build passes.

## Retained evidence and limits

- Completed ZIPs, raw fixture, readiness text, screenshot, helper and proof.json
  retained privately. Runtime after archive SHA256:
  80c8e1d0becabdc26e214ad416ff12a40675260b18e3556e6fbaafe52f52438d.
  Stopped HA after archive SHA256:
  be491fc82ad46029d192580e22409e494d9e096dfb8d6207fc2be0e4049c9693.
- Own Chrome tab closed and own runner/process tree/container stopped. Volume,
  backups, projects and evidence retained. No pruning or existing file deletion.
- No native0.1.314 update, new GitHub repository/HACS registration or new
  generated-script execution qualification claimed. These are separate from
  the actual ZIP export/check/import workflow verified here.
