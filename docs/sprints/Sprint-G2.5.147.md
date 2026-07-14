# Sprint G2.5.147 - Core Public API Value Surface Review

## Goal

Review the compact Core package-root value surface.

---

## Deliverables

- Exact Core value export coverage
- Accidental value export protection
- Sprint documentation

---

## Implementation

Added coverage that the Core package-root runtime value surface contains only
the intended helper functions.

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

G2.5.148 - Core Public API Type Surface Review
