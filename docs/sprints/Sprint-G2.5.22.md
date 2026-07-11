# Sprint G2.5.22 - Core Runtime Diagnostics

## Goal

Expose Runtime diagnostics through the Core package boundary while keeping
Runtime as the owner of health aggregation and diagnostic report generation.

---

## Deliverables

- Core Runtime diagnostics helper
- Core diagnostics type aliases
- Core diagnostics contract tests
- Core diagnostic boundary documentation

---

## Implementation

Added `inspectCoreRuntimeHost` to `@atlas/core`. The helper reads the Runtime
host health summary and diagnostic report through the Core Runtime host type and
returns them as a compact Core diagnostics object.

Core diagnostics types are derived from `CoreRuntimeHost` so Core does not add a
direct Foundation dependency for diagnostic reports.

---

## Public API

`@atlas/core` now exports:

- `CoreRuntimeHealthReport`
- `CoreRuntimeDiagnosticReport`
- `CoreRuntimeDiagnostics`
- `inspectCoreRuntimeHost`

---

## Validation

- `pnpm --filter @atlas/core check`
- `pnpm --filter @atlas/core test`
- `pnpm check`
- `pnpm build`
- `pnpm test`
- `git diff --check`

---

## Status

Completed.

---

## Next Sprint

G2.5.23 - Core Runtime Lifecycle

Suggested focus:

- Define Core lifecycle helper shape
- Add Core lifecycle contract tests
- Document Core lifecycle boundary
