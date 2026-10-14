# Sprint G2.5.9282 - A6 documentation alignment in DE/EN/FR

2026-10-14. Documentation only; HA app remains 0.1.297.

Back up both Git repositories as bundles and preserve user-owned untracked
roadmaps before editing. Private backup and audit scripts:
`C:/Users/rockb/source/backups/atlas-a6-docs-20261014`.

Review 21 corresponding ATLAS and plugin documentation pages in each language
in ugso-opensource-docs (63 pages). Replace French placeholders and incomplete
guides for architecture, Home Assistant, Card Editor, plugin documentation,
reference plugin, repository format, demo repository and File Studio.
Keep Home Assistant as the product name. Preserve technical IDs, Linux-sensitive
resource paths, public URLs, supported legacy imports and code examples.

Align Expert-only behavior, DE/EN/FR editor support, translation adapter/fallback
status, credential ownership, current documented HA app version and bounded
A5 evidence. A complete French manual does not promise complete French UI
coverage for external plugins: File Studio's remaining dialog/workflow gaps
stay documented. No external plugin implementation is changed.

Align six core sidebar entries and existing plugin/developer navigation.
Correct the German architecture home link and the French mobile-help anchor.
Map the three established German slugs to EN/FR counterparts in both generated
HTML and the browser language menu. Localize the documentation language,
search, appearance and mobile navigation controls; retain English defaults.

Verification:

- Final `npm run docs:build` passes. Existing large-chunk warning remains.
- All 63 pages are free of placeholder markers and unclosed code fences.
- Nine JSON examples parse; three card-package examples import through the
  existing Home Assistant parser with the expected Bubble target/entity.
- Generated HTML audit checks 3,357 local links, images and anchors: no failures.
- Seven locale route groups (21 source routes), query/hash/HTML variants and
  unrelated-route exclusion pass.
- All 21 Tabbed Card V2 variables agree across DE/EN/FR; nine checks confirm
  case-sensitive Bubble/Mushroom/Tabbed resource paths in the guides.
- Local browser checks cover translated pages, DE/EN/FR language switching
  and documentation search. Whitespace checks pass in both repositories.

No runtime code, native HA settings, projects, credentials or installed plugins
are changed. No package bump, add-on synchronization or Docker rebuild is needed.
Public documentation and ATLAS ledger commits are separate.

Remove completed A6 from the open roadmap; A7 is the next agreed priority.
Keep diverse-project qualification, long instrumented outage/load checks,
stable plugin API/version policy and HACS distribution/locale coverage open.
