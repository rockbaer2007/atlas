# Sprint G2.5.1000 - Activate read-only Devtools diagnostic summaries

Goal:

Replace the empty Devtools package root with its first narrow, read-only public
contract for summarizing Foundation diagnostic reports.

Implementation:

* Add `summarizeDiagnostics` with unavailable, healthy and issues states.
* Include report totals, issue totals and severity counts without mutating reports.
* Depend on Foundation only; keep interactive panels and workspace mutation deferred.
* Remove obsolete empty-package activation-gate scaffolding and update package readiness docs.
* Bump `@atlas/devtools` to `0.2.0-alpha.39`.

Validation:

* `pnpm --filter @atlas/devtools test`
* `pnpm --filter @atlas/devtools check`
* `pnpm --filter @atlas/devtools build`
* `pnpm install --lockfile-only`
* `git diff --check`

Status:

Completed.
