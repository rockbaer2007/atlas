# Sprint G2.5.132 - Core Lifecycle Restart Review

## Goal

Review Core restart lifecycle behavior.

---

## Deliverables

- Core restart transition coverage
- Runtime restart state review
- Lifecycle pass-through confirmation
- Sprint documentation

---

## Implementation

Added coverage that Core can restart a running Runtime host and returns the
resulting `running` state for the requested `restart` action.

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

G2.5.133 - Core Lifecycle Idempotency Review
