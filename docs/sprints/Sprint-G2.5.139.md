# Sprint G2.5.139 - Core Runtime Host Event Bus Review

## Goal

Review custom Runtime event bus pass-through through Core.

---

## Deliverables

- Custom event bus pass-through coverage
- Core subscription integration review
- Runtime lifecycle event publication coverage
- Sprint documentation

---

## Implementation

Added coverage that Core-created hosts preserve custom Runtime event buses and
Core event subscriptions attach to those buses.

---

## Public API

No new Core public APIs were added.

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

G2.5.140 - Core Runtime Host Module Registration Review
