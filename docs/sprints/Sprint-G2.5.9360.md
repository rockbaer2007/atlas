# Sprint G2.5.9360 - Preserve standalone Conditional and Entity imports

2026-10-18. App0.1.319; HACS integration remains0.1.306.

Before edits, Git bundles for ATLAS, the App repository and external docs are
saved at `C:/Users/rockb/source/backups/atlas-single-card-import-20261018`.
User roadmaps/docs work remain untouched. No HA host is contacted or changed;
the approved .177/.68 test hosts retain their previous0.1.318 installation.

## Correction and limits

- The actual Editor import conversion keeps standalone Conditional and Entity
  cards as one field with their complete normalized raw Card. Conditional wrappers
  are no longer reduced to replacement Entity cards for condition references.
- Field generation retains Conditional raw data even without a field entity;
  surface analysis treats that preserved card as populated. Child card target
  recognition recurses through Conditional wrappers.
- Entity generation keeps the normalized imported name unless explicitly renamed.
  Correction after native qualification in Sprint9361: the parser still replaces
  empty names and trims surrounding whitespace. These local tests compared values
  after normalization and did not prove literal source-name preservation. Explicit entity selection
  still updates the card entity. Existing styled-card paths stay intact.
- Stored data is not rewritten. Already lost conditions/names require the original
  source or backup. This does not add a visual condition editor or change the
  existing normalization of other unsupported Card properties.

## Regression evidence

- Tests extract and execute the shipped Editor conversion functions from app.js
  before generating real Expert configuration. The initial17 tests all fail
  before the fix, reproducing missing raw cards, multiple replacement fields and
  names lost. They pass after the correction; two HACS tests are then added.
- JSON/YAML cover named, empty-name and whitespace-name Entity cards; nested
  Conditional logic with strict zero bounds; distinct condition/card entities;
  nested Conditional cards; iframe, Mushroom and Bubble children; JSON draft
  serialization/reload and actual Editor config generation/export.
- Two real HACS archive tests preserve standalone conditions, names, Card-Mod,
  readiness approval and embedded Editor plans in JSON/YAML. A separate test
  retains deliberate Entity renaming/selection.
- All 259 Home Assistant tests, full workspace build, source/bundle syntax checks,
  two package-preservation tests and canonical synchronization checks pass.
  Both App package copies contain the matching0.1.319 version and regression test.
- DE/EN/FR documentation distinguishes the local correction from the still-pending
  native update qualification; no runtime migration or user-data writes occur.
- Native browser/update verification of0.1.319 on .177/.68 remains the next scope;
  no claim that the0.1.318 native failures have been rerun against an updated host.
