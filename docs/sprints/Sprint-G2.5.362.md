# Sprint G2.5.362 - Home Assistant Dependency Boundary Review

## Goal

Review Home Assistant dependency boundaries.

## Deliverables

- Forbidden dependency coverage
- Pre-activation dependency boundary
- Concrete integration dependency validation

## Implementation

Home Assistant dependency boundary reports continue to reject concrete
pre-activation dependencies including Renderer, Runtime, Theme and websocket clients.

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

G2.5.363 - Home Assistant Allowed Dependency Review.
