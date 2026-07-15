# Sprint G2.5.364 - Home Assistant Forbidden Dependency Ordering Review

## Goal

Review forbidden Home Assistant dependency ordering.

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

- `pnpm --filter @atlas/homeassistant check`
- `pnpm --filter @atlas/homeassistant test`
- `pnpm check`
- `pnpm build`
- `pnpm test`

## Status

Completed.

## Next Sprint

G2.5.365 - Home Assistant Dependency Report Copy Review.
