# Sprint G2.5.322 - Renderer Platform Adapter Diagnostic Issue Shape Review

## Goal

Review platform adapter diagnostic issue shape.

## Deliverables

- Issue code coverage
- Issue message coverage
- Issue severity coverage

## Implementation

Failed platform adapter diagnostic issues remain Foundation-compatible issue
objects with code, message and severity only.

## Public API

No new public API was added.

## Validation

- `pnpm --filter @atlas/renderer check`
- `pnpm --filter @atlas/renderer test`
- `pnpm check`
- `pnpm build`
- `pnpm test`

## Status

Completed.

## Next Sprint

G2.5.323 - Renderer Platform Adapter Diagnostic No-Issue Shape Review.
