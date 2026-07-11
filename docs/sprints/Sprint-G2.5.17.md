# Sprint G2.5.17

# Runtime Diagnostics Reports

> Health is useful at a glance; diagnostics are useful when something must be fixed.

---

## Status

**Completed**

---

## Snapshot

No release snapshot.

---

# Goal

Adapt Runtime health into Foundation diagnostic reports with stable Runtime
issue codes.

---

# Implementation

`RuntimeHost.diagnostics` returns a Foundation `DiagnosticReport` derived from
the current Runtime health report.

Healthy Runtime state returns a successful report with no issues. Degraded
modules produce warning issues and failed modules produce error issues.

---

# Architecture Decisions

- Foundation remains the owner of the diagnostic report contract.
- Runtime owns Runtime-specific issue codes.
- Runtime diagnostic reports are derived from health instead of introducing a
  second source of truth.
- Diagnostic events are deferred to the next sprint.

---

# Deliverables

- Runtime diagnostic issue code contract
- `RuntimeHost.diagnostics`
- Healthy, degraded and failed diagnostic report tests
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

## G2.5.18 - Runtime Event Diagnostics

Publish Runtime diagnostic events when health changes and define stable event
payload contracts.

---

(c) ATLAS Framework
