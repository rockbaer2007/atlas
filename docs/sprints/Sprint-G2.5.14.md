# Sprint G2.5.14

# Runtime Module Observability

> A lifecycle is easier to trust when its history is visible.

---

## Status

**Completed**

---

## Snapshot

No release snapshot.

---

# Goal

Expose module lifecycle state, timing and failures through a public Runtime
diagnostics boundary.

---

# Implementation

`RuntimeHost.moduleDiagnostics` returns a snapshot for every registered module.
Snapshots record the module id, version, lifecycle status, activation and
shutdown timings, timestamps and the latest activation or shutdown error.

The Runtime updates snapshots at registration, successful initialization,
terminal stop, terminal disposal and any activation or shutdown failure.

---

# Architecture Decisions

- Runtime diagnostics are immutable snapshots, not a mutable monitoring API.
- Diagnostics retain the latest lifecycle error until a later successful phase.
- Module timing uses elapsed wall-clock milliseconds.
- Foundation diagnostic report aggregation remains a future composition layer.

---

# Deliverables

- Runtime module status and snapshot types
- Public RuntimeHost module diagnostics
- Activation and shutdown diagnostic updates
- Lifecycle timing and failure diagnostics tests
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

## G2.5.15 - Runtime Configuration

Define RuntimeHost configuration contracts and validate application and module
configuration before startup.

---

(c) ATLAS Framework
