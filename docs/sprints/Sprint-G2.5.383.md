# Sprint G2.5.383 - Theme Allowed Dependency Review

## Goal

Review allowed Theme pre-activation dependencies.

## Deliverables

- Foundation dependency allowance
- Core dependency allowance
- Dependency direction readiness

## Implementation

Foundation and Core dependency names remain allowed by the Theme pre-activation
dependency boundary.

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

G2.5.384 - Theme Forbidden Dependency Ordering Review.
