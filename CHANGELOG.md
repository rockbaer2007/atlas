# Changelog

All notable changes to the ATLAS Framework will be documented in this file.

The format is based on **Keep a Changelog** and the project adheres to **Semantic Versioning (SemVer)**.

## [Unreleased]

### Added

* Repository governance documentation.
* `ATLAS.md` project constitution.
* `ROADMAP.md` strategic development roadmap.
* `SPRINTS.md` sprint index.
* `SNAPSHOTS.md` snapshot index.
* GitHub issue templates.
* GitHub pull request template.
* Build artifact policy documentation.
* Source-boundary documentation.
* `@atlas/kernel` workspace package.
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
