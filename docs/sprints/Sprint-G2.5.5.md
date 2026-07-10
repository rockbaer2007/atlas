# Sprint G2.5.5

# Source Boundary Review

> A public API begins where the workspace can actually stand behind it.

---

## Status

**Completed**

---

## Snapshot

No release snapshot.

---

# Goal

Review the actual package source boundaries, confirm public exports and record
which planned packages intentionally remain empty.

---

# Findings

## Active Public Package

`@atlas/foundation` is the sole active public workspace package. Its root
barrel exports the current foundation domains only.

## Planned Packages

`@atlas/core`, `@atlas/runtime`, `@atlas/renderer`, `@atlas/theme`,
`@atlas/homeassistant` and `@atlas/devtools` remain deliberate placeholders.
Their `export {}` entry points reserve package names without creating premature
public contracts.

## Kernel Reference Source

`packages/kernel` contains historical kernel, event and module source, but has
no package manifest or build configuration. It is not included in the PNPM
workspace and does not define a published `@atlas/kernel` API.

---

# Architecture Decisions

- Package-root barrel exports remain the only public API boundary.
- Placeholder packages remain empty until their owning architecture phase.
- Workspace packages must not depend on `packages/kernel` reference source.
- Promoting, migrating or archiving kernel source requires a dedicated next
  sprint decision.

---

# Documentation Updates

- Added `docs/project/SOURCE_BOUNDARIES.md`
- Corrected the Foundation package README
- Corrected the Runtime package README
- Updated the architecture reference and project identity
- Updated sprint and changelog indexes

---

# Quality

Completed successfully.

- Type Check
- Build
- Unit Tests
- Diff whitespace check

---

# Deliverables

- Public source-boundary policy
- Placeholder package confirmation
- Kernel reference-source classification
- G2.5.6 decision backlog

---

# Next Sprint

## G2.5.6 - Kernel Workspace Decision

Decide whether `packages/kernel` becomes a configured public workspace package,
or whether its source is migrated or archived before new kernel work begins.

---

(c) ATLAS Framework
