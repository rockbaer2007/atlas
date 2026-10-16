# Sprint G2.5.9325 - Exported Card package consistency

2026-10-16. App0.1.311, HA package0.2.0-alpha.88, reference plugin
0.2.0-alpha.108. Integration remains0.1.306. Isolated only: Pi 5 and Proxmox
are neither queried nor changed in this increment.

## Preservation and scope

- Before implementation retain Git bundles of ATLAS, add-on and documentation,
  both user roadmaps and a complete PC copy of the stopped isolated HA config.
  Private evidence: source/backups/atlas-card-consistency-20261016.
- Create a separate Docker volume/container from that copy, HA2026.10.1 and
  HACS2.0.5 on loopback4228. Previous containers/volumes are retained and stopped.
  No production credentials are copied into code or published evidence.
- Only the own cloned Card script/locales and its resource cache parameter are
  changed. Restore the original resource file after the browser qualification.
  Check 75 other configuration/dashboard/resource/community files and eight
  non-HACS integration entries exactly; both user roadmaps remain identical.
- No settings, files, project formats, plugin state or encrypted credentials are
  migrated. Source/packaging backups remain on PC; own test containers are stopped
  after qualification, not deleted.

## Implementation

- Derive a deterministic v1 package marker from the generated script before
  marker insertion. The input includes generated runtime, layout/configuration,
  title and declared languages. Identical exports share the marker.
- Embed the marker in the actual script and its export descriptor; new package
  language files carry the same _meta.packageId. Retain it through HACS dist/
  packaging, embedded package import/re-export and the frontend translation merge.
- Before applying locale text, require matching language metadata and package
  marker. Reject both absent and different markers. Check inactive declared
  locales as well as EN. Retain embedded EN/live child Cards and the independent
  built-in EN/DE/FR repair notice with affected safe file paths.
- Preserve supplied legacy scripts/locales unchanged. If a HACS bundle creates
  a new script from a plan with no supplied script, stamp its accompanying locales
  consistently. Older installed scripts gain this check only through deliberate
  re-export/deployment; changing an App alone does not rewrite deployed Cards.
- The 64-bit deterministic marker detects accidental package mixtures; it is
  not a cryptographic digest/signature or authenticity guarantee. Translation
  edits retaining the marker are permitted and are not detected as corruption.
  No automatic repair, crash rollback or old-script upgrade is promised.

## Verification

- 180 Home Assistant package tests pass. Actual generated runtime tests exercise
  A-script/B-locales and B-script/A-locales for EN/DE/FR, absent markers, inactive
  FR, exclusion of stale text, live entity forwarding and repair on fresh reload.
  Deterministic identity, changed-configuration identity, HACS ZIP round trip and retained
  legacy source/locale bytes are covered.
- Actual frontend translation-merge fixture retains the marker and provider
  metadata without modifying the original package; no provider/network call.
- Real HA browser: complete A renders two mixed Core/Bubble/Mushroom Cards.
  B-script with A-FR and unmarked FR shows DE/FR notices naming locales/fr.json;
  B-script with A-EN names locales/en.json. Child temperature21.5 remains rendered.
  Complete B plus reload clears the notices and renders both Cards.
- A previously cached older script under the unchanged HACS URL initially cannot
  run the new check. A new cache parameter for only the own cloned resource loads
  the new module. Normal HACS release resource versioning/browser refresh remains
  necessary; a server file replacement does not rewrite a running old module.
- pnpm build, JavaScript syntax, 39 App tests and six frontend tests pass.
  Docker image builds; own loopback4240 preview reports0.1.311 and healthy
  Administration4175/Card Editor4174. Editor renders without a real HA connection.
- DE/EN/FR public documentation and generated package README explain markers,
  translation handling, repair and limits. VitePress production build passes.
  Both add-on copies match the canonical 504-file source inventory.

Final private verification records preservation, screenshots, commits and CI.
