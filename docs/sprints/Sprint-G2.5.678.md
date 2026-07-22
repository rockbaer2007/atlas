# Sprint G2.5.678 - Renderer Mount Reporting Consumption Report Stability Review

Goal:

Define Renderer mount report consumption views across lifecycle-backed reports, filters and summaries.

Implementation:

* Added Renderer mount report consumption requests and filtered report views.
* Added lifecycle state, mounted state and diagnostics status filters.
* Kept consumption summaries aligned with the filtered report set.
* Preserved report order and kept consumption independent from source arrays, DOM elements, Theme bindings, Home Assistant fields and platform metadata.
* Updated the package root, public API contract tests, README, changelog and sprint indexes.

Public API:

* `RendererMountReportConsumption`
* `RendererMountReportConsumptionRequest`
* `RendererMountReportFilter`
* `createRendererMountReportConsumption`

Validation:

* `pnpm --filter @atlas/renderer check`
* `pnpm --filter @atlas/renderer test`
* `pnpm check`
* `pnpm build`
* `pnpm test`

Status:

Completed.