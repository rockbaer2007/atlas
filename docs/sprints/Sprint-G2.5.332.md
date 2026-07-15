# Sprint G2.5.332 - Renderer Platform Adapter Integration Package Root Review

## Goal

Review Renderer package-root integration boundaries.

## Deliverables

- Package-root export coverage
- Home Assistant helper absence coverage
- Public API shape validation

## Implementation

Renderer package-root coverage now confirms Home Assistant activation and card
helpers are not exported from Renderer.

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

G2.5.333 - Renderer Platform Adapter Home Assistant Metadata Review.
