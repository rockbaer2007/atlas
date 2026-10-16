# Sprint G2.5.9332 - Complete public ATLAS documentation audit

2026-10-16. Documentation-only review of all72 ATLAS/ATLAS-Plugin pages in
ugso-opensource-docs:24 per DE/EN/FR, including developer guidance. Builds,
source and prior qualification records are the evidence; no production hosts,
HAOS VMs, credentials, user data or external plugin repositories are changed.

## Safeguards and coverage

- Retain fresh Git bundles of ATLAS and the documentation before edits under
  source/backups/atlas-doc-audit-20261016. Preserve user roadmaps and docs/work.
- Save per-page hashes, headings and version inventory; normalized DE/EN/FR
  routes have matching24-page sets. Keep a separate reproducible audit helper
  and checks report outside Git. Review historical claims with their dates.
- Cross-check App312, integration306, runtime alpha39 and bundled reference
  alpha108 against current sources. Compare native recovery/HACS qualification
  with sprint records rather than describing every old test as newly rerun.
- Check local external-plugin metadata read-only and confirm the File Studio
  discrepancy against GitHub contents. No external source/package edits.

## Corrections

- Update landing pages, reference-plugin details and frontend guides to separate
  App/integration/framework versions and integrated versus external plugins.
- Refresh compatibility and plugin recovery scopes: native Icon Library,
  File Studio and Terminal UI recovery is completed; integration301->306 and
  isolated HA2026.9.4 are qualified. Unknown schema rejection is not a real
  data-format conversion; other hardware/versions remain explicit boundaries.
- Correct File Studio's stale App297 notes, Card Editor's stale native312
  follow-up and missing references to complete HAOS recovery/URL adaptation.
- Correct legacy resource-target documentation: actual HACS integration uses
  /atlas_frontend/frontend/atlas-homeassistant-panel.js, not a Lovelace resource
  under /hacsfiles/atlas. Retain legacy editor metadata with clear labels.
- Correct installation guidance: repository/import packages install persistently
  and static plugin JavaScript runs when opened in a browser. Node Runtime hooks
  are separate and are not automatically registered. Preserve the no-sandbox
  warning; remove obsolete claims that manual imports cannot serve web pages.
- Align French generator docs with MDI/custom PNG support; explain PNG512KiB,
  package file encoding and installer limits. Separate raw GitHub catalog access
  from optional GitHub Pages publication of install.html.
- Replace obsolete repository examples with an own atlas.plugin.example ID,
  supported host names and current App constraint; do not suggest replacing the
  protected bundled reference plugin. Historical version examples stay marked.
- Expand the architecture inventory with kernel/workspace and internal
  file-studio/notifyarchive contracts; keep installable File Studio external.
- Document Icon Studio0.1.16 startup fix, IndexedDB collection preservation,
  drawing/raster preview/export and File Studio handoff. Include both Icon
  plugins in the plugin list with experimental status, not blanket approval.
- Correct the German Demo Repository's accidental French paragraph.

## Open finding and validation

- File Studio's external main catalog says0.1.50 while its manifest/install
  package say0.1.51. Document this inconsistency in DE/EN/FR; do not tell users
  to bypass the compatibility gate. Fixing/releasing that repository is separate
  plugin work and has not been performed or claimed here.
- All72 pages scanned; locale route parity, nine JSON examples, known resource
  case and current release/example checks pass. VitePress build validates the
  public site including links. Review diffs and publish docs and ledger
  separately. No product/package version bump required for this audit.
- This is a documentation/source-evidence review, not renewed native tests,
  an audit of every unrelated project hosted on the same site or a guarantee
  that all upstream links, future releases or third-party behavior stay current.
