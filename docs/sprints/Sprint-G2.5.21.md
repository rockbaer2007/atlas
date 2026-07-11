# Sprint G2.5.21

# Core Integration Readiness

> Core should begin as a doorway, not a maze.

---

## Status

**Completed**

---

## Snapshot

No release snapshot.

---

# Goal

Activate the Core package as a thin integration layer above Runtime.

---

# Implementation

`@atlas/core` now depends on `@atlas/runtime` and exposes the first Core Runtime
entry point through the package root:

- `createCoreRuntimeHost`
- `CoreRuntimeHost`
- `CoreRuntimeHostConfiguration`

The first Core package-root API contract test verifies that Core consumers can
create a Runtime host through the Core boundary.

---

# Architecture Decisions

- Core becomes active only after Runtime has a protected public API.
- Core depends on Runtime in the current architecture phase.
- Core remains intentionally thin and does not add domain, rendering or
  integration behavior yet.
- Runtime remains the owner of host lifecycle, module activation and diagnostics.

---

# Deliverables

- Core Runtime host entry point
- Core dependency on Runtime
- Core package-root API contract test
- Package, boundary and sprint documentation updates

---

# Quality

Completed successfully.

- Type Check
- Build
- Unit Tests
- Diff whitespace check

---

# Next Sprint

## G2.5.22 - Core Runtime Diagnostics

Expose Core-level helpers for Runtime diagnostics while preserving Runtime as
the owner of diagnostic behavior.

---

(c) ATLAS Framework
