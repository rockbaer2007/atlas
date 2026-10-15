# Sprint G2.5.9294 - Version and compatibility maintenance policy

2026-10-15. Define ATLAS/plugin release rules and data-preservation requirements
before adding any automatic compatibility gate or schema migration.

## Backup and preservation

Source backups before edits:
`C:/Users/rockb/source/backups/atlas-compatibility-policy-20261015`.
Both Atlas and documentation repository histories are retained as Git bundles;
the two user-owned untracked roadmap files are copied and left untouched.
The documentation repository's user-owned `work/` directory is untouched.
No HA/runtime/browser state is changed, so no new live backup or restart is
needed for this documentation-only increment. Prior native backups are retained.

## Rules and evidence

- Add the version/compatibility policy under project specifications, linked
  from repository-format guidance and the roadmap.
- Distinguish App distribution, HA integration, framework package, plugin,
  schema and concurrency revision identities; no forced renumbering.
- Define compatible patch/feature releases and explicit pre-1.0 minor bumps for
  future breaking changes, with migration and recovery notes.
- Record current implementation limits: repository compatibility fields are
  descriptive, version update ordering is not a SemVer resolver, and kernel
  dependency matching supports a limited grammar. Correct the source-boundary
  description of zero-major caret matching to reflect actual code.
- Define future server-side compatibility validation without disabling legacy
  installations just because metadata are absent.
- Define migration preview, original backup, copy validation, explicit apply,
  concurrency and atomic replacement requirements. Do not claim a universal
  migration implementation or automatic reverse migrations.
- Explain matched code/data restore, installation-bound secrets, independent
  external plugin data, and the lack of a retained package rollback archive
  after successful directory replacement.
- Add matching DE/EN/FR developer guides, navigation and publishing links in
  the external docs repo. Keep the implementation gate and real schema/version
  migration qualification open in the roadmap.

## Verification

Existing regression tests run in isolation, without accessing real HA data:
Kernel 36/36, Runtime 55/55 and app lifecycle/store/package tests 20/20 pass.
These cover the existing dependency, package, revision, corruption and preserved
state behaviors described in the policy; they do not validate a new migration.
Public DE/EN/FR documentation build passes with only the existing large-chunk
warning; git diff --check passes in both repositories.
No runtime source/package update; no version bump or add-on synchronization.
