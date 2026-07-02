# ATLAS Framework

# Release Notes

## Snapshot S0002

# ❤️ Heartbeat

Release Date

2026-07-02

---

## Overview

Heartbeat delivers the first production-ready event infrastructure of the
ATLAS Framework.

This snapshot establishes the foundation for communication between all
framework packages.

---

## Added

### Event Infrastructure

- Event contracts
- Event handlers
- Event subscriptions
- Event publisher
- Event subscriber
- Default EventBus

### Default Implementations

- EventHandlerCollection
- DefaultEventSubscription
- DefaultEventBus

### Documentation

- Package README
- ADR-0022 Event Model
- ADR-0023 EventMatcher Postponed
- Sprint documentation

---

## Changed

The event architecture was simplified.

Removed concepts:

- EventMatcher
- EventFilter

The EventBus now acts purely as a coordinator.

---

## Quality

Validation completed successfully.

- ✅ Type Check
- ✅ Build
- ✅ Unit Tests

---

## Snapshot

S0002

Codename

❤️ Heartbeat

---

© ATLAS Framework
