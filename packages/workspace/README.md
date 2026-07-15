# @atlas/workspace

Workspace readiness package for Atlas.

`@atlas/workspace` describes the active package inventory, layer ordering,
quality gates and pre-activation integration closures used to keep framework
planning aligned with the repository. It does not start runtime features or
open planned integration package APIs.

The package exports:

- `ATLAS_WORKSPACE_PACKAGE_INVENTORY`
- `ATLAS_WORKSPACE_QUALITY_GATES`
- `ATLAS_PLANNED_INTEGRATION_CLOSURES`
- `createAtlasFrameworkReadiness`
- `inspectAtlasFrameworkReadiness`
- `assertAtlasFrameworkReadiness`

The readiness model is intentionally metadata-only. It is used by tests and
documentation to confirm that root manifests, workspace packages and dependency
rules describe the same active framework shape before concrete framework
capabilities continue.
