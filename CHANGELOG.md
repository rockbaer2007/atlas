# Changelog

All notable changes to the ATLAS Framework will be documented in this file.

The format is based on **Keep a Changelog** and the project adheres to **Semantic Versioning (SemVer)**.

## [Unreleased]

### Added

* Framework readiness now has a dedicated `@atlas/workspace` package that
  verifies active package inventory, root manifests, dependency rules, quality
  gates and planned integration closures.
* Framework capability direction now selects Renderer output-to-target mounting
  as the next concrete capability while keeping Theme, Home Assistant and
  Devtools public APIs closed.
* Renderer mount planning now describes output-to-target mount plans,
  readiness gates and plan reports without executing adapters or binding to
  concrete platforms.
* Renderer mount plan execution now routes ready plans through generic guarded
  adapter and platform-adapter resolutions while preserving manual non-execution
  and integration-free result boundaries.
* Renderer mount lifecycle records now describe planned, executed and reported
  mount work across plans, results and diagnostics without adding concrete DOM,
  Theme or Home Assistant bindings.
* Renderer mount reporting now aggregates lifecycle records into compact report
  and summary shapes with plan strategy, quality gates, mounted state and
  diagnostics issues while staying free of DOM, Theme and Home Assistant
  bindings.
* Renderer mount report consumption now filters lifecycle-backed reports by
  state, mounted status and diagnostics status while returning matching summary
  counts without adding integration metadata.
* Renderer mount report consumers now provide a generic sync or async consumer
  integration point for consumption views while preserving summary references
  and integration-free boundaries.
* Renderer mount report consumer registries now add generic lookup and
  first-candidate selection while preserving consumer references and avoiding
  handler execution during selection.
* Renderer mount report consumer registry conflicts now detect duplicate
  consumer names and resolve them with the existing first-candidate policy
  without invoking consumer handlers.
* Renderer mount report consumer diagnostics now inspect consumer results into
  stable success, not-consumed and failure diagnostics without platform
  metadata.
* Theme and Devtools integration reviews now protect package-root closure,
  required-layer ordering, activation gate copies, dependency boundary ordering
  and pre-activation dependency independence.
* Home Assistant integration review now protects package-root closure,
  required-layer ordering, activation gate copies, dependency boundary ordering
  and pre-activation dependency independence.
* Renderer platform adapter integration review now protects Home Assistant-style
  metadata as Renderer-only data across adapters, registry, lookup, selection,
  conflict resolution, mounting and diagnostics.
* Renderer platform adapter diagnostic review now protects mount failure codes,
  Error and string failure reports, unresolved success reports, metadata
  boundaries and report independence.
* Renderer platform adapter selection review now protects request references,
  empty platform states, selected and missing result shape, and no-mount
  first-candidate behavior.
* Renderer platform adapter conflict review now protects conflict references,
  duplicate grouping, resolution shape and guarded mount failure boundaries.
* Renderer platform adapter registry and lookup review now protects platform
  adapter references, registry ordering, lookup misses and first-match behavior.
* Renderer adapter selection and platform adapter review now protects selection
  candidate references, no-mount selection and platform adapter metadata boundaries.
* Renderer adapter conflict review now protects conflict references, duplicate
  grouping, resolution shape and guarded mount failure boundaries.
* Renderer adapter review now protects adapter shape, mount handler references,
  registry ordering and lookup result reference behavior.
* Renderer output, target and mount contract review now protects descriptive
  data boundaries, reference preservation and failure-message behavior.
* Renderer pipeline review now protects host context pass-through, stage result
  ordering, mixed completion and rejection boundaries before output work.
* Core public API review now protects the compact Core package-root value
  surface before returning to Renderer boundary work.
* Renderer host context review now protects Core Runtime host pass-through,
  diagnostics visibility and pipeline context ownership.
* Core Runtime host review now protects configuration, custom events/services,
  module registration, validation and diagnostics pass-through behavior.
* Core lifecycle review now protects Runtime lifecycle pass-through results,
  idempotency, events and error propagation through Core.
* Core Runtime event review now protects pass-through lifecycle, module,
  diagnostic and subscription disposal behavior above Runtime.
* Runtime lifecycle event review now protects lifecycle payloads, awaited
  subscribers and duplicate terminal event suppression.
* Runtime diagnostics event review now protects diagnostic event payloads,
  duplicate suppression and awaited lifecycle ordering.
* Core diagnostics review now protects read-through Runtime diagnostic context,
  issue severity and live health inspection through Core.
* Devtools activation readiness now tracks internal activation, dependency and
  closed public API checks before concrete diagnostics tooling work.
* Theme activation readiness now tracks internal activation, dependency and
  closed public API checks before concrete theme model work.
* Home Assistant integration boundary readiness now tracks internal activation,
  dependency and closed public API checks before concrete integration work.
* Repository governance documentation.
* `ATLAS.md` project constitution.
* `ROADMAP.md` strategic development roadmap.
* `SPRINTS.md` sprint index.
* `SNAPSHOTS.md` snapshot index.
* GitHub issue templates.
* GitHub pull request template.
* Build artifact policy documentation.
* Source-boundary documentation.
* Integration package readiness specification.
* `@atlas/kernel` workspace package.
* `@atlas/renderer` workspace package activation above Core.
* Renderer pipeline boundary contracts.
* Renderer sequential pipeline execution helper.
* Renderer output boundary contracts.
* Renderer target boundary contracts.
* `DefaultEventBus` public export from `@atlas/kernel`.
* `RuntimeHost` and runtime lifecycle events from `@atlas/runtime`.
* Runtime service keys for application and EventBus composition.
* Runtime module registration and activation events.
* Kernel module dependency resolution and Runtime dependency-ordered activation.
* Optional module stop and dispose contracts with reverse-order Runtime shutdown.
* Module version compatibility validation for Runtime dependencies.
* Runtime module lifecycle diagnostics with statuses, timing and errors.
* RuntimeHost configuration contracts and startup configuration validation.
* RuntimeHost health reporting derived from module diagnostics.
* RuntimeHost diagnostic reports using Foundation diagnostics contracts.
* Runtime diagnostic change events with health transition payloads.
* Core Runtime host entry point above `@atlas/runtime`.
* Core Runtime diagnostics helper above Runtime health and diagnostic reports.
* Core Runtime lifecycle transition helper above Runtime host lifecycle methods.
* Core Runtime event subscription helper above Runtime host events.
* Core package-root API contract tests.
* Renderer package-root API contract tests.
* Runtime package-root API contract tests.

### Changed

* Repository structure cleanup.
* Documentation organization improvements.
* Package README consistency.
* Package TypeScript build output alignment.
* Roadmap foundation/runtime boundaries.
* Public package-boundary documentation.
* Kernel source promoted from reference code to a configured workspace package.
* Kernel public API validation and consumer-level test coverage.
* Runtime package promoted from placeholder to active workspace package.
* Kernel container aligned with its public `ServiceContainer` contract.
* Runtime module activation through the Kernel module contract.
* Missing and cyclic Runtime module dependencies now reject startup.
* Runtime disposal now propagates module shutdown failures without claiming disposal.
* Incompatible required and present optional module versions now reject startup.
* Runtime module activation and shutdown failures are now visible in diagnostics.
* Invalid Runtime application and module configuration now rejects before startup.
* Runtime module diagnostics now aggregate into host health state.
* Runtime health now maps to stable diagnostic issue codes.
* Runtime health transitions now publish diagnostic change events.
* Runtime module registration no longer publishes hidden asynchronous diagnostic events.
* `@atlas/core` is now an active package with a Runtime dependency.
* Planned integration package dependency direction is now documented above Core.
* `@atlas/renderer` is now an active package with a Core dependency.
* Renderer public API coverage now protects value and type exports.
* Renderer now exposes an ordered pipeline stage contract without a rendering engine.
* Renderer pipeline creation now preserves stage order independently from source arrays.
* Renderer pipeline execution now reports aggregate completion from stage results.
* Renderer pipeline execution review now covers empty and asynchronous pipelines.
* Renderer output now records kind, name and optional string content without targets.
* Renderer output review now covers optional content and current output kinds.
* Renderer target contracts now describe target kind, name and optional identifier.
* Renderer target review now covers optional identifiers and current target kinds.
* Renderer mount contracts now describe output-to-target requests and mount results.
* Renderer mount review now covers current mount result states.
* Renderer adapter contracts now describe named synchronous or asynchronous mount handlers.
* Renderer adapter review now covers adapter names and mount request delivery.
* Renderer adapter registries now capture ordered adapter lists before lookup behavior.
* Renderer adapter registry review now covers empty registry contracts.
* Renderer adapter lookup contracts now describe lookup requests and results before search behavior.
* Renderer adapter lookup review now covers stable lookup request and result shapes.
* Renderer adapter registry search now finds adapters by name and reports misses.
* Renderer adapter registry search review now covers first-match behavior.
* Renderer adapter conflict contracts now describe duplicate-name adapter groups.
* Renderer adapter conflict review now covers empty conflict adapter groups.
* Renderer adapter conflict detection now reports duplicate-name adapter groups.
* Renderer adapter conflict detection review now covers empty registries.
* Renderer adapter conflict resolution contracts now describe unresolved and resolved states.
* Renderer adapter conflict resolution review now covers embedded conflict copy behavior.
* Renderer adapter selection contracts now describe candidate selection requests and results.
* Renderer adapter selection review now covers empty candidate requests.
* Renderer adapter selection policy helper now selects the first candidate explicitly.
* Renderer adapter selection policy review now protects candidate order.
* Renderer adapter conflicts can now resolve through first-candidate selection.
* Renderer adapter conflict integration review now protects copy boundaries.
* Renderer adapter registry conflicts can now resolve through first-candidate selection.
* Renderer adapter registry resolution review now protects conflict ordering.
* Renderer resolved adapter choices can now drive guarded mount execution.
* Renderer resolved adapter mounting review now covers asynchronous adapters.
* Renderer resolved adapter mounting now reports rejected adapter mounts.
* Renderer adapter mount failure review now covers non-Error rejections.
* Renderer mount failures can now be inspected as Foundation-compatible diagnostic reports.
* Renderer mount diagnostics review now covers package-root exports and successful reports.
* Renderer platform adapter boundary contracts now describe platform adapter metadata.
* Renderer platform adapter review now covers capability copy behavior and empty capability lists.
* Renderer platform adapter registry contracts now capture ordered platform adapter lists.
* Renderer platform adapter registry review now protects package-root empty registry creation.
* Renderer platform adapter lookup contracts now describe platform lookup requests and results.
* Renderer platform adapter lookup review now protects package-root copy behavior.
* Renderer platform adapter registry search now finds platform adapters by platform.
* Renderer platform adapter registry search review now protects package-root first-match behavior.
* Renderer platform adapter conflict contracts now describe duplicate platform adapter groups.
* Renderer platform adapter conflict review now protects package-root empty conflict groups.
* Renderer platform adapter conflict detection now reports duplicate-platform adapter groups.
* Renderer platform adapter conflict detection review now protects package-root no-conflict behavior.
* Renderer platform adapter conflict resolution contracts now describe unresolved and resolved states.
* Renderer platform adapter conflict resolution review now protects package-root copy behavior.
* Renderer platform adapter selection contracts now describe candidate selection requests and results.
* Renderer platform adapter selection review now covers empty candidate requests.
* Renderer platform adapter selection policy helper now selects the first candidate explicitly.
* Renderer platform adapter selection policy review now protects candidate order.
* Renderer platform adapter conflicts can now resolve through first-candidate selection.
* Renderer platform adapter conflict integration review now protects copy boundaries.
* Renderer platform adapter registry conflicts can now resolve through first-candidate selection.
* Renderer platform adapter registry resolution review now protects conflict ordering.
* Renderer resolved platform adapter choices can now drive guarded mount execution.
* Renderer resolved platform adapter mounting review now covers asynchronous adapters.
* Renderer resolved platform adapter mounting now reports rejected adapter mounts.
* Renderer platform adapter mount failure review now covers non-Error rejections.
* Renderer platform adapter mount failures can now be inspected as diagnostic reports.
* Renderer platform adapter mount diagnostics review now covers successful reports.
* Renderer platform adapter integration boundary review now keeps concrete platform behavior outside Renderer.

### Fixed

* Removed tracked `node_modules` from Git version control.
* Removed tracked generated build artifacts from version control.
* Corrected Foundation documentation that implied a public EventBus API.

### Removed

* None.

### Security

* None.

---

## [0.2.0-alpha.1] - Initial Foundation

### Added

#### Foundation

* Foundation package architecture.
* Monorepo workspace.
* TypeScript project configuration.
* Shared build infrastructure.

#### Core

* Registry infrastructure.
* Lifecycle foundation.
* Diagnostics foundation.
* Result domain.
* Capabilities.
* Event contracts.

#### Architecture

* Layered package architecture.
* Public API strategy.
* Internal implementation boundaries.
* Package dependency rules.
* Module dependency model.
* Architecture Decision Record (ADR) process.

#### Documentation

* Architecture documentation.
* ADR collection.
* Sprint documentation.
* Release documentation.
* Project specifications.

### Changed

* Repository organization.
* Documentation structure.
* Package architecture refinement.

### Fixed

* Repository cleanup.
* Removed tracked dependency artifacts.
* Improved repository health.

### Security

* Initial security baseline established.

---

## Release Policy

ATLAS follows Semantic Versioning.

Release channels:

* Alpha
* Beta
* Release Candidate (RC)
* Stable

Every release must satisfy the defined quality gates before publication.

---

## References

* Semantic Versioning: https://semver.org/
* Keep a Changelog: https://keepachangelog.com/

---

*This document is maintained as part of the official project documentation.*
