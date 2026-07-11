# Sprint G2.5.25 - Core API Review

## Goal

Review and protect the Core package-root API before activating integration
packages above Core.

---

## Deliverables

- Core package-root value export coverage
- Core package-root type export coverage
- Core API readiness documentation
- Sprint documentation

---

## Implementation

Added package-root API review tests for `@atlas/core`. The tests explicitly
cover the exported value surface for host creation, diagnostics, lifecycle and
event helpers.

The type coverage confirms the public Core host, diagnostics, lifecycle and
event types can be consumed from the package root without deep imports.

---

## Public API

Reviewed Core package-root exports:

- `createCoreRuntimeHost`
- `inspectCoreRuntimeHost`
- `transitionCoreRuntimeHost`
- `subscribeToCoreRuntimeEvent`
- Core Runtime host, diagnostics, lifecycle and event types

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

G2.5.26 - Integration Package Readiness

Suggested focus:

- Review planned integration package boundaries
- Confirm next active package candidate
- Document dependency direction from integrations to Core
