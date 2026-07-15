# Sprint G2.5.429 - Capability Direction Assertion Review

Goal:

Fail fast when capability direction is incomplete.

Deliverables:

- Assertion helper
- Unselected direction coverage
- Opened integration closure coverage

Implementation:

Added `assertAtlasFrameworkCapabilityDirection` and failure tests.

Public API:

Added Workspace assertion metadata only.

Validation:

- `pnpm --filter @atlas/workspace check`
- `pnpm --filter @atlas/workspace test`
- `pnpm check`
- `pnpm build`
- `pnpm test`

Status: Completed.

Next Sprint:

G2.5.430 - Capability Direction Mutation Review.
