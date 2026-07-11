# Sprint G2.5.18

# Runtime Event Diagnostics

> A diagnostic signal is most useful when it arrives at the moment state changes.

---

## Status

**Completed**

---

## Snapshot

No release snapshot.

---

# Goal

Publish diagnostic events when aggregate Runtime health changes.

---

# Implementation

Runtime now publishes `runtime.diagnostics.changed` whenever the aggregate
Runtime health changes. The event payload includes the previous health state,
current health state and current `RuntimeHealthReport`.

Health transitions are emitted when module diagnostics affect aggregate health,
including registered, initialized and failed module states.

---

# Architecture Decisions

- Diagnostic events are derived from Runtime health, not from separate event
  bookkeeping.
- Events are published only when aggregate health changes.
- The event payload carries the full health report for observers that need more
  context than the current health state.
- Runtime event ordering guarantees remain a dedicated follow-up topic.

---

# Deliverables

- Runtime diagnostic event contract
- `runtime.diagnostics.changed` event publishing
- Healthy and failed health transition event tests
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

## G2.5.19 - Runtime Event Semantics

Review Runtime lifecycle and diagnostic event ordering and define registration
event guarantees.

---

(c) ATLAS Framework
