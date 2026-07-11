# Sprint G2.5.16

# Runtime Health Reporting

> Diagnostics explain what happened; health explains what it means right now.

---

## Status

**Completed**

---

## Snapshot

No release snapshot.

---

# Goal

Promote Runtime module diagnostics into host-level health reporting.

---

# Implementation

`RuntimeHost.health` returns a host-level health report with application
identity, lifecycle state, aggregate health, module health reports and healthy,
degraded and failed module counts.

Module health is derived from existing lifecycle diagnostics:

- failed modules are `failed`
- registered or stopped modules are `degraded`
- initialized or disposed modules are `healthy`

The host health is the highest-severity module health.

---

# Architecture Decisions

- Runtime health is derived from diagnostics instead of duplicating lifecycle
  state.
- Health reporting stays Runtime-native in this sprint.
- Foundation diagnostic report adaptation is deferred to the next sprint.
- An empty Runtime is healthy unless another Runtime-level failure is recorded.

---

# Deliverables

- Runtime health state contract
- Runtime module health report contract
- Runtime host health report contract
- Host health aggregation tests
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

## G2.5.17 - Runtime Diagnostics Reports

Adapt Runtime health into Foundation diagnostic reports and define stable issue
codes for Runtime diagnostic consumers.

---

(c) ATLAS Framework
