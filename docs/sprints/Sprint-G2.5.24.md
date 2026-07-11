# Sprint G2.5.24 - Core Runtime Events

## Goal

Expose Runtime event subscriptions through the Core package boundary while
keeping Runtime and Kernel as the owners of event publication, ordering and
subscription disposal behavior.

---

## Deliverables

- Core Runtime event subscription helper
- Core event type aliases
- Core event contract tests
- Core event boundary documentation

---

## Implementation

Added `subscribeToCoreRuntimeEvent` to `@atlas/core`. The helper accepts a Core
Runtime host, Runtime event type and event handler, then delegates to the
Runtime host event bus.

Core event types are derived from Runtime event contracts and the Core Runtime
host subscription boundary, so Core does not introduce a parallel event model.

---

## Public API

`@atlas/core` now exports:

- `CoreRuntimeEvent`
- `CoreRuntimeEventType`
- `CoreRuntimeEventSubscription`
- `CoreRuntimeEventHandler`
- `subscribeToCoreRuntimeEvent`

---

## Validation

- `pnpm --filter @atlas/core check`
- `pnpm --filter @atlas/core test`
- `pnpm check`
- `pnpm build`
- `pnpm test`
- `git diff --check`

---

## Status

Completed.

---

## Next Sprint

G2.5.25 - Core API Review

Suggested focus:

- Review Core package-root exports
- Add Core public API coverage for value and type exports
- Document Core API readiness before integration packages
