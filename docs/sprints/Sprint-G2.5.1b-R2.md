# Sprint G2.5.1b-R2

# ❤️ Heartbeat

> Every great framework begins with a heartbeat.

---

## Status

**Completed**

---

## Snapshot

**S0002**

---

# Goal

Implement the first production-ready event infrastructure for the ATLAS Framework.

Heartbeat establishes the architectural foundation for all future communication inside the framework.

---

# Objectives

- Define the public Event API
- Implement the EventBus contracts
- Implement the default EventBus
- Keep the public API minimal
- Achieve deterministic event processing
- Provide a stable and testable implementation

---

# Completed

## Contracts

- Event
- EventHandler
- EventSubscription
- EventPublisher
- EventSubscriber
- EventBus

---

## Implementations

- EventHandlerCollection
- DefaultEventSubscription
- DefaultEventBus

---

## Behaviour

- Sequential execution
- Registration order
- Fail Fast
- Snapshot enumeration
- Idempotent subscriptions

---

# Architecture Decisions

Heartbeat intentionally keeps the event infrastructure small.

The following components were postponed:

- EventMatcher
- EventFilter
- Priorities
- Wildcards

These features may return in later snapshots when justified by real-world requirements.

---

# Lessons Learned

Several architectural simplifications improved the quality of the event system.

Most notably:

- removing unnecessary abstractions
- separating responsibilities
- reducing the EventBus to a coordinator
- favouring behaviour over implementation details in unit tests

This resulted in a smaller, easier to understand implementation.

---

# Quality

Completed successfully.

- ✅ Type Check
- ✅ Build
- ✅ Unit Tests

---

# Deliverables

- Event Infrastructure
- Package README
- ADR-0022
- ADR-0023

---

# Statistics

| Item | Value |
|------|------:|
| Contracts | 6 |
| Default Implementations | 3 |
| ADRs | 2 |
| README Files | 1 |
| Snapshot | S0002 |

---

# Motto

> Every great framework begins with a heartbeat.

---

# Next Sprint

## G2.5.2 — Project Identity

Planned deliverables:

- ATLAS.md
- SPRINTS.md
- SNAPSHOTS.md
- CONTRIBUTING.md
- CODE_OF_CONDUCT.md
- SECURITY.md

---

© ATLAS Framework
