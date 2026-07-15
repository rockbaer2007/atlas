# Sprint G2.5.363 - Home Assistant Allowed Dependency Review

## Goal

Review allowed Home Assistant pre-activation dependencies.

## Deliverables

- Foundation dependency allowance
- Core dependency allowance
- Dependency direction readiness

## Implementation

Foundation and Core dependency names remain allowed by the Home Assistant
pre-activation dependency boundary.

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

G2.5.364 - Home Assistant Forbidden Dependency Ordering Review.
