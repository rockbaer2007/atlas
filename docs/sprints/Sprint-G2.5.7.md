# Sprint G2.5.7

# Kernel API Validation

> A public default earns its name by being useful from the package root.

---

## Status

**Completed**

---

## Snapshot

No release snapshot.

---

# Goal

Validate the public `@atlas/kernel` surface from a consumer perspective and
decide whether the standard EventBus implementation should be public.

---

# Decision

`DefaultEventBus` is a public `@atlas/kernel` export.

Its behavior is already covered by tests for ordered delivery, fail-fast error
handling, async handlers, idempotent subscriptions and safe deregistration
during publication. A package-root API test now verifies the consumer path.

---

# Public Boundary

The package root now exposes:

- event contracts
- `DefaultEventBus`

`DefaultEventSubscription` and `EventHandlerCollection` remain internal.
Consumers receive subscriptions through the `EventBus` contract and do not need
to manage handler storage directly.

---

# Deliverables

- Public `DefaultEventBus` root export
- Package-root API test
- Updated kernel package documentation
- Updated source-boundary and architecture documentation
- Sprint and changelog updates

---

# Quality

Completed successfully.

- Type Check
- Build
- Unit Tests
- Diff whitespace check

---

# Next Sprint

## G2.5.8 - Runtime Integration Readiness

Define the first Runtime contracts that consume the stable Foundation and Kernel
package boundaries.

---

(c) ATLAS Framework
