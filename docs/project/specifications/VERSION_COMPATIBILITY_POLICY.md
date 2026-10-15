# ATLAS version, compatibility and data preservation policy

Status: release and maintenance rules adopted 2026-10-15. App 0.1.302 adds the
compatibility gate below; it does not change existing data formats or migrate
installed plugins. App 0.1.303 adds authenticated HA-version discovery. The
optional descriptor compatibility field is preserved.

## Version identities

| Identity | Meaning and release rule |
| --- | --- |
| App/runtime distribution | Root package version; Docker, App/Add-on and Linux package releases identify the delivered runtime. User-visible updates require a version bump and matching affected distribution metadata. |
| HA integration | `custom_components/atlas_frontend/manifest.json` version identifies the HA panel/config flow integration. HACS commit identity is recorded separately. |
| Framework packages | Each `@atlas/*` package has its own version. Do not compare its alpha version to an App version as if they were the same product. |
| Plugin | Stable plugin ID plus independently incremented version; catalog, package descriptor and embedded manifest must agree. The bundled Card Editor ships with ATLAS; external plugins release independently. |
| Data format | Envelope kind plus schema/format version describes readable data. It is independent of a product version. A revision is a concurrency counter, not a schema version. |

Repository format `version: "1"`, published plugin envelope
`atlas.schemaVersion: 1`, shared plugin state `version: 1` and editor project
store `version: 1` are separate contracts, not interchangeable version numbers.
No blanket compatibility claim follows from equal version strings.

## Release numbering

Use `MAJOR.MINOR.PATCH` for release numbers. A compatible fix increments PATCH;
a compatible feature increments MINOR; a breaking public contract increments
MAJOR once stable 1.x contracts exist. Before 1.0, breaking changes require a
new MINOR plus explicit migration/recovery notes; PATCH releases must preserve
existing supported contracts and data. Pre-release identifiers such as
`-alpha.N` identify an explicit test build, not stable compatibility.

Current alpha packages and historic App 0.1.x releases predate this policy.
Do not rename or retroactively reclassify them. From this policy onward, a
breaking App change must not be hidden in another 0.1.x patch. Documentation-only
changes need no runtime version bump. Never republish changed package bytes at
the same released version; identify source commit/build in release evidence.

## Compatibility declarations and actual enforcement

- Repository `compatibility.atlas` refers to the App/runtime distribution,
  not a framework npm package. `host` identifies the tested deployment context;
  `homeAssistant` describes the claimed HA range. Record exact tested runtime,
  plugin, HA Core, architecture and deployment versions in release evidence.
- Catalog, package descriptor and embedded manifest declarations are all checked
  on the server using node-semver ranges for `atlas` and `homeAssistant`.
  One unsupported declaration blocks replacement even if the other sources
  claim support. Missing metadata means unknown, not proven compatible.
  Legacy plugins are not disabled; unknown candidates require explicit review.
- Host names accept one string or alternative strings. `administration-local`
  retains its historic meaning of the common Node installer. Recognized target
  aliases are `docker`, `linux` and `homeassistant`, derived from the configured
  distribution target, never from the browser URL. Ordinary local startup is
  `local-runtime`, not automatically Docker. Host declarations must match.
- Since 0.1.303, Administration reads the configured HA instance's authenticated
  `GET /api/config` version using its server-held connection. The gate fetches
  fresh metadata before preview and again before staging a replacement, only
  when a HA requirement exists. Browser-supplied versions are ignored. Tokens,
  location and other HA configuration are never returned by discovery.
  Missing credentials, timeouts, redirects, authorization failures and invalid
  responses remain unknown; no last successful version is reused. Explicit
  review remains required for unknown requirements. HA beta/rc/dev releases are
  normalized to SemVer prereleases and never promoted to stable. The sanitized
  `GET /api/homeassistant/version` response exposes status/version only, with a
  fixed reason on failure. Requests are bounded to three seconds and 256 KiB.
  Unknown future fields also need review; malformed known ranges or host
  declarations block the candidate.
- Administration currently compares available plugin versions with numeric
  locale ordering to offer updates. This is not a full SemVer resolver or a
  compatibility gate. Treat pre-release channel transitions as manual review.
- Kernel module dependencies are a separate enforced contract: exact numeric
  triples, `^` and `*` are supported; general range expressions and prereleases
  are not. Current caret matching keeps the same major and, for major zero,
  the same minor. In particular `^0.0.3` currently accepts `0.0.4`; do not claim
  complete npm SemVer caret behavior. Prefer exact versions for 0.0.x modules.
- Package parsing validates known envelopes, and the server checks package
  identity/version against its manifest before replacement. Capabilities are
  declarations, not automatic permissions or a code sandbox.

Administration calls the read-only POST `/api/plugins/check-compatibility` with
the candidate package and catalog declarations. Unsupported results show the
reason; unknown results require confirmation. POST `/api/plugins/install`
revalidates independently before staging files. `allowUnknown: true` acknowledges
unknown results only and cannot bypass a known mismatch. API clients must carry
catalog metadata when installing a catalog candidate; embedded manifest checks
always apply. Package and catalog versions must agree in the repository UI.
The gate checks declared constraints, not trustworthiness or functional support.

## Persisted data and migrations

Preserve settings, installation identity, encrypted secrets, editor projects,
plugin catalog/activation state and each external plugin's own data separately.
Changing the runtime URL/browser origin may select different local data even
when the server is the same. Keep runtime address and persistent mounts stable.

For any future schema change, the release must document old/new kinds and
versions, supported read/write versions, transformations, backup locations and
recovery procedure. Preserve supported legacy imports, including legacy editor
projects, without restoring the retired Simple editor UI.

Required migration design: inspect and validate without writes; back up original
bytes; transform a copy; validate it; then explicitly apply with concurrency
checks and atomic replacement. A failed, unsupported or newer-format read must
leave the original intact, never replace it with an empty default. Do not strip
unknown fields by silently rewriting data. Retry must be idempotent or clearly
refused; no partial cross-store success may be advertised as a completed
migration. New credential locations or capabilities need a separate decision.

These are requirements for future migrations, not a claim that every importer
already implements them. Shared plugin/project stores currently reject unknown
store versions and use backups plus revision checks for supported changes.

## Backup, update and recovery

1. Record the exact installed and target versions/commits. Back up HA settings
   and ATLAS persistent data before HA updates, or runtime/data/identity for
   standalone hosts. Export local Admin settings, editor workspaces and shared
   plugin metadata separately; include external plugin data and browser-only
   collections where present. A Git bundle protects source, not live HA data.
2. Keep encrypted credentials and their required installation identity/key
   material recoverable through the existing supported mechanism. Exports alone
   do not make secrets portable to a different installation.
3. Review changes and declared compatibility, then update one component at a
   time. Integration updates require the documented HA restart. Keep App and
   plugin updates independent unless a release declares an ordering dependency.
4. Verify health, native panel access, plugin versions/activation and project
   open/export equivalence. Compare settings and secret status without exposing
   credentials. Do not save test edits into user projects.
5. For recovery, restore a matched code AND pre-migration data snapshot on the
   same installation. An older binary must not write a newer unsupported store.
   Never promise downgrade compatibility without a tested reverse migration.

Plugin directory replacement currently rolls back a failed swap, but removes
the previous directory after success. It is not a retained release rollback
archive. Shared plugin metadata backups do not contain installed package files
or every external plugin's private data. A full backup is still required.

## Release evidence and acceptance

For a changed package: validate package/catalog identity, run affected tests and
builds, document tested hosts and unsupported/unknown combinations. A changed
schema additionally needs fixtures for supported old/current/newer data,
failure preservation, repeated migration, stale revisions and matched restore.
For official HA integration release qualification, cover Pi ARM64 and Proxmox
amd64 where applicable; label missing hosts as untested.

Native HACS commit updates to `42a56f1` and HA restart passed on both hosts in
[Sprint G2.5.9292](../../sprints/Sprint-G2.5.9292.md). Integration source and
version stayed unchanged at 0.1.301, so real version/schema migration and further
HA versions remain open. No generic support matrix or stable 1.0 API is claimed.

Public guidance is maintained in DE/EN/FR in the external documentation repo,
under `projects/atlas-plugins/developers/compatibility`.
