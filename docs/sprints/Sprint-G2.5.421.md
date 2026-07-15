# Sprint G2.5.421 - Framework Capability Direction Review

Goal:

Select the next concrete framework capability after readiness closure.

Deliverables:

- Capability direction model
- Renderer mounting selection
- Integration closure protection

Implementation:

Added Workspace capability direction metadata that selects Renderer output-to-target mounting.

Public API:

Added metadata-only Workspace exports. No integration API was opened.

Validation:

- `pnpm --filter @atlas/workspace check`
- `pnpm --filter @atlas/workspace test`
- `pnpm check`
- `pnpm build`
- `pnpm test`

Status: Completed.

Next Sprint:

G2.5.422 - Renderer Mounting Direction Review.
