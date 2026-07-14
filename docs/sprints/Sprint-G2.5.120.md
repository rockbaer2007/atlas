# Sprint G2.5.120 - Runtime Diagnostics Shutdown Ordering Review

## Goal

Review Runtime diagnostic event ordering during shutdown.

---

## Deliverables

- Shutdown diagnostic event coverage
- Module stop and diagnostics ordering review
- Runtime dispose ordering coverage
- Sprint documentation

---

## Implementation

Added coverage that module stop events precede diagnostic health-change events
during shutdown and that Runtime disposal is published after diagnostic
subscribers complete.

---

## Public API

No new Runtime public APIs were added.

---

## Validation

- `pnpm --filter @atlas/runtime check`
- `pnpm --filter @atlas/runtime test`
- `pnpm check`
- `pnpm build`
- `pnpm test`
- `git diff --check`

---

## Status

Completed.

---

## Next Sprint

G2.5.121 - Runtime Lifecycle Event Review
