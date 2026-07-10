# Sprint G2.5.13

# Runtime Module Versioning

> A dependency is only ready when its promised version is present.

---

## Status

**Completed**

---

## Snapshot

No release snapshot.

---

# Goal

Define compact module version compatibility rules and reject incompatible
dependency versions before Runtime activation.

---

# Version Rules

Module manifests use stable `MAJOR.MINOR.PATCH` version values.

- `1.2.3` requires an exact version match.
- `^1.2.3` accepts the same major version at or above `1.2.3`.
- `^0.2.3` accepts only the same pre-1.0 minor version at or above `0.2.3`.
- `*` accepts any available version.

Pre-release identifiers and richer range expressions are intentionally deferred.

---

# Implementation

The Kernel `ModuleVersionMatcher` validates resolved module dependencies. The
RuntimeHost therefore rejects incompatible graphs before any module initializes.
Optional dependencies may be absent, but an optional dependency that is present
must still meet its version requirement.

---

# Deliverables

- Kernel module version matcher
- Dependency-resolver version validation
- Kernel compatibility tests
- Runtime incompatible-version startup test
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

## G2.5.14 - Runtime Module Observability

Publish module dependency diagnostics and module lifecycle timing through the
Runtime observability boundary.

---

(c) ATLAS Framework
