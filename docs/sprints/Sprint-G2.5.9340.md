# Sprint G2.5.9340 - Mushroom Jinja qualification and confirmed import loss

2026-10-17. Outcome: **partial qualification, not a blanket pass**.
ATLAS remains 0.1.312; no runtime fix or release performed. Pi 5 and Proxmox
neither queried nor changed.

## Isolation and preservation

- Full-history ATLAS/docs Git bundles, copies of both untracked user roadmaps,
  prior stopped HA configuration archive and a fresh eight-file runtime baseline
  retained at source/backups/atlas-mushroom-jinja-20261017.
- Before archive SHA256
  d1960d7d30518e5b4b9c010760070d7e93fee9e1caf151ce285fe772f3b344fb.
  A new own HA volume/container is populated from the prior PC source copy;
  48 original source-file contents still match the prior source-before archive.
- HA Core 2026.10.1 on loopback 4238, own transport proxy 4239, fresh App origin
  127.0.0.28:4176 with internal standard 4174/4175. Original runtime files and
  the complete original named server project remain exact; only own project
  entries, workspace and backups are added. User roadmap copies match originals.
- Local fixture lamp and a new input_number/template sensor only. No real
  devices, production credentials or remote translation provider involved.
  Lamp restored off, new temperature fixture restored to 18 degrees.

## Positive path: complete ATLAS raw-entry project package

- One vertical-stack Expert field contains two Mushroom raw entries. Its
  primary/secondary Jinja strings, templated icon and `color` expressions remain
  literal source strings through save, revision 2, reload and preview/open.
  UI adds explicit columns/grid_options.columns 8; expressions remain exact.
- HA with pinned Mushroom 5.2.3 evaluates the templates, not ATLAS:
  lamp off/on -> Lampe aus/an, off/on, mdi:lightbulb-off/on, blue/amber;
  temperature 18/26 -> Kühl/Warm, 18.0/26.0 degrees, thermometer-low/high,
  green/red. DOM primary/secondary text, computed tile colors and exact SVG
  paths compared with the installed MDI icon files all pass.
- Initial generated runtime and subsequently the actual UI-exported runtime
  are both checked. Actual script/locales deployed together at a fresh own
  resource URL and served byte-exact. HA reload is a separate deployment step.
- Actual JSON HACS browser export, import that completed ZIP, and re-export:
  both 31,098-byte archives are identical, readiness 112/112, SHA256
  ac857d57cfa049c61280f69da8887c2b51c2f24ddd0e0ddf9aa77bce505fff12.
  Embedded editorPlan entries and raw package content retain all expressions.
  This does not establish every parsed import-summary representation as lossless.
- Proxy terminates both Editor/HA sockets and refuses transport while local
  HA fixture states change from on/warm to off/cool. Existing views reconnect
  without reload/manual connect and update text, icon SVG and color correctly.
  Measured outages: 45,113 ms initially, 31,548 ms with the actual UI export.
  Both sockets active after recovery; Editor retains its one stack/two entries.

## Failed paths: normal HA card import

- JSON and YAML parser reproductions remove `icon` and `color` from the supplied
  Mushroom template configuration; primary/secondary expressions survive there.
  Both formats reach normalizeHomeAssistantCardConfiguration in
  packages/homeassistant/src/HomeAssistantCardConfiguration.ts, whose Mushroom
  branch rebuilds a limited object and omits these keys.
- Real UI import of a vertical-stack JSON card reproduces this loss in the
  generated Expert HA code. The retained text expressions do not make the
  imported card equivalent to the original.
- Real UI import of the same Mushroom card alone instead creates a Core entity
  field and static name, losing the Mushroom type and template behavior.
  examples/status-demo/app.js createExpertFieldsFromImportedCard falls through
  to generic entity-field creation for this single-card case.
- Raw Card JSON/YAML and screenshots/DOM before replacement retained privately.
  Do not mark normal Mushroom raw imports as qualified or recommend them as
  complete transfers until these paths are fixed and re-tested. Runtime
  corrections remain the next separate increment.

## References, checks and boundaries

- Pinned upstream [Mushroom 5.2.3 Template Card documentation](https://github.com/piitaya/lovelace-mushroom/blob/v5.2.3/docs/cards/template.md)
  describes templated primary/secondary/icon and the current `color` property.
  Legacy icon_color, other Mushroom releases, custom actions and arbitrary Jinja
  programs are outside this fixture; no dedicated Jinja authoring UI added.
- Private typed/bundled diagnostics assert raw template preservation, actual
  exported runtime behavior, exact icon paths, reconnect and original data.
  No production code changed, so no runtime build/version bump needed.
- DE/EN/FR public docs explicitly describe the positive raw-project path and
  failed normal imports; the roadmap prioritizes correcting the loss. Docs
  build and whitespace checks recorded with completion evidence.
- Stop only own container/processes and close own tabs. Keep before/after HA
  archives, runtime baseline, source cards and all evidence for the follow-up.
