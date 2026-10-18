# Sprint G2.5.9358 - Import preview/parser parity

2026-10-18. App 0.1.318; HACS integration remains 0.1.306.

Before edits, complete Git bundles for ATLAS, the add-on repository and external
documentation are saved at
`C:/Users/rockb/source/backups/atlas-markdown-import-20261018`.
Existing user roadmaps and docs work remain untouched. No HA host is contacted
or changed; local pure tests/builds do not start HA or an app server.

## Correction

- Artifact inspection runs the same `summarizeHomeAssistantCardImport` path as
  actual import before approving a recognized candidate. Recursive validation
  covers raw cards, ATLAS packages and export payload content.
- Unsupported Markdown leaves, including nested Conditional/stack/grid/tab cards,
  are rejected by the existing pre-mutation UI gate. No Markdown editor/renderer
  support is added, and no stored user data is migrated or rewritten.
- YAML classification uses its structured parser instead of a multiline type
  regex. Candidate recognition also covers supported standalone JSON Entity and
  Conditional cards, leaving actual support to the shared parser.
- Existing external-artifact review behavior and successful inspection reasons
  remain intact. Invalid numeric conditions cannot receive a positive preview.

## Verification and delivery

- All 240 Home Assistant tests pass, including 27 new JSON/YAML parity tests:
  positive Entity leaves and negative Markdown leaves at six supported depths,
  raw/package/payload rejection, missing numeric bounds and a nested YAML type
  string which must not be mistaken for a root card.
- Complete workspace build and two package-preservation tests pass. Canonical
  sources are synchronized to both Home Assistant package copies; version318
  makes the update detectable. No Docker packaging behavior changed.
- Open-source Card Editor and development-status pages updated in DE/EN/FR.
  Documentation build passes (existing chunk-size warning); source/package/docs
  diff checks and JavaScript bundle syntax checks pass.
- Native update/browser verification on the approved .177/.68 hosts remains a
  separate next step after fresh backups. These hosts still run0.1.317; this
  increment does not claim the earlier native matrix was rerun with0.1.318.
