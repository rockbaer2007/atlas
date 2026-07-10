# Sprint G2.5.6

# Kernel Workspace Decision

> A package becomes public when its source, build and promises agree.

---

## Status

**Completed**

---

## Snapshot

No release snapshot.

---

# Goal

Decide whether the historical kernel source should become a configured
workspace package, and establish its initial public API boundary.

---

# Decision

`packages/kernel` is promoted to the active `@atlas/kernel` workspace package.

The source already has a coherent Foundation-only dependency direction,
package-level barrels and an existing test suite. Promotion makes the code part
of the normal type check, build and test pipeline instead of leaving it as
unvalidated reference source.

---

# Public API

The package root exports:

- kernel and application contracts
- service-container contracts and implementations
- dependency-injection contracts and implementations
- module contracts and infrastructure
- event contracts

EventBus implementations remain internal. Their public lifecycle and
compatibility guarantees require a separate API decision.

---

# Deliverables

- `@atlas/kernel` package manifest
- Kernel TypeScript build configuration
- Kernel package README
- Root event-contract exports
- Source-boundary and architecture updates
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

## G2.5.7 - Kernel API Validation

Validate the new public package surface against consumer needs, add API-level
tests and decide whether EventBus implementations should be public.

---

(c) ATLAS Framework
