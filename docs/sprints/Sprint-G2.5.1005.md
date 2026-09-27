# Sprint G2.5.1005 - Renderer Mount Reporting Consumer Diagnostics Policy Stability Review

Goal:

Evaluate summarized Renderer mount report consumer diagnostics through simple policy gates.

Implementation:

* Added a stable Renderer mount report consumer diagnostic policy contract.
* Added policy evaluation derived from aggregation summaries.
* Added stable policy diagnostic codes for failed consumers and exceeded issue limits.
* Kept policy evaluations independent from DOM elements, Theme bindings, Home Assistant fields and platform metadata.
* Updated the package root, public API contract tests, README, changelog and sprint indexes.

Public API:

* `RendererMountReportConsumerDiagnosticPolicy`
* `RendererMountReportConsumerDiagnosticPolicyCodes`
* `RendererMountReportConsumerDiagnosticPolicyEvaluation`
* `evaluateRendererMountReportConsumerDiagnosticPolicy`

Validation:

* `pnpm --filter @atlas/renderer check`
* `pnpm --filter @atlas/renderer test`
* `pnpm check`
* `pnpm build`
* `pnpm test`

Status:

Completed.
# Sprint G2.5.1005 - Correct Home Assistant Ingress source address

Goal:

Allow external repository plugins to install through the actual Home Assistant Core Ingress proxy.

Implementation:

* Trust the Home Assistant Core bridge address (172.30.32.1) instead of the Supervisor address.
* Add a regression test proving the Supervisor address is rejected.
* Bump the Home Assistant app package to 0.1.244.

Validation:

* `node --test scripts/atlas-request-origin.test.mjs`
* `pnpm build`
* `pnpm ha:app:prepare`
* `git diff --check`
