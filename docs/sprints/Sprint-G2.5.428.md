# Sprint G2.5.428 - Capability Direction Report Review

Goal:

Expose a compact capability direction report.

Deliverables:

- Selected status
- Owner package report
- Protected integration and risk report

Implementation:

Added `inspectAtlasFrameworkCapabilityDirection`.

Public API:

Added Workspace report inspection metadata only.

Validation:

- `pnpm --filter @atlas/workspace check`
- `pnpm --filter @atlas/workspace test`
- `pnpm check`
- `pnpm build`
- `pnpm test`

Status: Completed.

Next Sprint:

G2.5.429 - Capability Direction Assertion Review.
