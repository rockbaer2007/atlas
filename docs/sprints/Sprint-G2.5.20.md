# Sprint G2.5.20

# Runtime API Review

> A package is ready for higher layers when its public door is tested.

---

## Status

**Completed**

---

## Snapshot

No release snapshot.

---

# Goal

Review and protect the public Runtime API before Core integration begins.

---

# Implementation

The Runtime package now has package-root API contract tests. The tests verify
that public Runtime values and representative public Runtime types are
available through `@atlas/runtime` rather than deep source imports.

The Runtime barrel export order was aligned to make the public surface easier
to scan.

---

# Architecture Decisions

- Runtime consumers should import from the package root.
- Package-root API tests protect Core and future packages from accidental
  Runtime export regressions.
- Runtime service keys remain Symbols and are validated by their stable
  descriptions instead of string identity.
- No new Runtime behavior was introduced in this sprint.

---

# Deliverables

- Runtime package-root API contract tests
- Runtime barrel export review
- Runtime public boundary documentation updates
- Sprint documentation updates

---

# Quality

Completed successfully.

- Type Check
- Build
- Unit Tests
- Diff whitespace check

---

# Next Sprint

## G2.5.21 - Core Integration Readiness

Review the Core placeholder boundary and prepare the first Core package API
contract on top of Runtime.

---

(c) ATLAS Framework
