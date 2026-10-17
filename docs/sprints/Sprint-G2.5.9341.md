# Sprint G2.5.9341 - Preserve Mushroom YAML/JSON and single-card imports

2026-10-17. App **0.1.313**, framework0.2.0-alpha.88, integration0.1.306.
Corrects the normal-import failures recorded in Sprint9340. Pi 5 and Proxmox
were neither queried nor changed. No external devices or production credentials.

## Backup and isolation

- Full-history bundles for ATLAS, documentation and add-on repositories, both
  user roadmap copies, cloned previous isolated runtime and full stopped HA
  archive retained privately in source/backups/atlas-mushroom-import-fix-20261017.
- HA-before TAR SHA256
  0a398e4914330e1d3ad08ab7be2f44da28b60c9570c8fdeb5d448407a34b3bb0.
- Separate HA2026.10.1 amd64 volume/container at loopback4240, transport
  proxy4241, App127.0.0.29:4176 with internal standard4174/4175. Mushroom5.2.3.
- Both existing server-project entries remain exact, including the prior Jinja
  diagnostic project; 14 other original runtime files remain byte-exact.
  This includes settings, files, plugin state, history and trash. Own new
  single/stack projects, workspace snapshots and backups are kept separately.

## Correction

- Mushroom normalization preserves primary/secondary source text, icon, current
  color and legacy icon_color. Single-card UI conversion explicitly creates a
  Mushroom field with its raw card instead of falling through to Core entity.
- Generation retains the raw templates while applying an explicit entity edit.
  Apply title deliberately updates primary in single and container entries.
- Replace the lossy trimmed-line YAML parser with pinned yaml2.9.1. Standard
  block scalars retain indentation, blank lines, literal hash text and chomping.
  Malformed YAML is rejected. Quoted scalar export preserves boundary newlines,
  initial indentation and CRLF; ordinary multiline output keeps its block style.
- Existing stored projects are not migrated or rewritten. Already lost fields
  cannot be reconstructed without their original source. No Jinja authoring UI
  or arbitrary Mushroom option support is claimed.

## Verification

- Seven new regression cases cover JSON/YAML normalization and actual extracted
  UI single-card conversion, raw generation/entity edits, literal/folded blocks,
  blank lines/indentation/CRLF, nested cards and invalid YAML. Earlier reproduction
  failed all four initial cases; all187 HA package tests now pass.
- Actual Chrome imports of single JSON, single YAML, stack JSON and stack YAML
  retain source primary/secondary/icon/color in generated code. Explicit title
  editing changes only the intended primary. Server save/open and reload retain
  the templates. The two original server projects remain unchanged.
- Actual JSON-format HACS exports are imported back through the UI and exported
  again, byte-identical for each package; readiness112/112 each, EN/DE/FR present.
  Single: 28,531 bytes, SHA256
  3c19230eadcd70b423681b932bb4bbeb54b54a32cdf9a0061508411a443a7579.
  Stack: 32,653 bytes, SHA256
  44ad5527043566c9bc95738069f8bd770b0597b693d22dcdc95a6ee0a343f6c4.
  YAML raw import is qualified separately; the existing HACS readiness contract
  expects JSON package format and rejects that check for YAML-format bundles.
- Deploy actual UI-exported scripts/locales to new isolated HA resources. Three
  rendered Mushroom instances show lamp off/on -> Lampe aus/an, off/on,
  lightbulb-off/on, blue/amber; temperature18/26 -> Kühl/Warm, 18.0/26.0 degrees,
  thermometer-low/high, green/red. Primary/secondary DOM text, computed colors
  and exact MDI SVG paths are checked. Legacy icon_color is preservation-only.
- Proxy terminates both sockets, refuses transport for45,317ms while fixtures
  change back off/cool, then both views recover without reload/manual connect.
  All three cards show changed text/icon/color; Editor retains its field and
  both sockets are active. State fixtures end off/18 degrees.
- pnpm build, node --check examples/status-demo/app.js, package snapshot sync
  and check, Home Assistant package tests and DE/EN/FR documentation build pass.
  Public docs replace the old warning with versioned behavior and boundaries.
- Keep before/after evidence and stop only own runtime/container/browser tabs.
  Native host update qualification and arbitrary templates/options remain separate.
