# Sprint G2.5.405 - Package Layer Alignment Review

Goal:

Make package layer ordering reflect the active framework shape.

Deliverables:

- Updated package layer manifest
- Layer-order tests
- Workspace readiness layer metadata

Implementation:

Updated `atlas.packages.json` for Workspace, Foundation, Kernel, Runtime, Core, Renderer, Theme, Home Assistant and Devtools.

Public API:

No runtime API was added.

Validation:

- `pnpm --filter @atlas/workspace check`
- `pnpm --filter @atlas/workspace test`
- `pnpm check`
- `pnpm build`
- `pnpm test`

Status: Completed.

Next Sprint:

G2.5.406 - Dependency Rule Alignment Review.
