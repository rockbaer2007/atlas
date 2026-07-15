# Sprint G2.5.384 - Theme Forbidden Dependency Ordering Review

## Goal

Review forbidden Theme dependency ordering.

## Deliverables

- Forbidden dependency order coverage
- Duplicate forbidden dependency coverage
- Dependency report hygiene

## Implementation

Forbidden dependency reports now have coverage preserving source order and
duplicate forbidden dependency entries.

## Public API

No new public API was added.

## Validation

- `pnpm --filter @atlas/theme check`
- `pnpm --filter @atlas/theme test`
- `pnpm check`
- `pnpm build`
- `pnpm test`

## Status

Completed.

## Next Sprint

G2.5.385 - Theme Dependency Report Copy Review.
