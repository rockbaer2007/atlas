# Sprint G2.5.23 - Core Runtime Lifecycle

## Goal

Expose Runtime lifecycle transitions through the Core package boundary while
keeping Runtime as the owner of lifecycle state changes and lifecycle event
publication.

---

## Deliverables

- Core Runtime lifecycle helper
- Core lifecycle action, state and result types
- Core lifecycle contract tests
- Core lifecycle boundary documentation

---

## Implementation

Added `transitionCoreRuntimeHost` to `@atlas/core`. The helper accepts a Core
Runtime host and lifecycle action, delegates to the corresponding Runtime host
method and returns the action with the resulting host state.

Core lifecycle types are derived from `CoreRuntimeHost` where possible so Core
does not introduce a parallel lifecycle model.

---

## Public API

`@atlas/core` now exports:

- `CoreRuntimeLifecycleAction`
- `CoreRuntimeLifecycleState`
- `CoreRuntimeLifecycleResult`
- `transitionCoreRuntimeHost`

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

G2.5.24 - Core Runtime Events

Suggested focus:

- Define Core event subscription helper shape
- Add Core event contract tests
- Document Core event boundary
