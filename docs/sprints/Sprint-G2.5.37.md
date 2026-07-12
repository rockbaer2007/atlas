# Sprint G2.5.37 - Renderer Mounting Readiness

## Goal

Define Renderer mount request and result contracts before platform adapters.

---

## Deliverables

- Renderer mount request contract
- Renderer mount result contract
- Renderer mount contract tests
- Sprint documentation

---

## Implementation

Added `RendererMountRequest` and `RendererMountResult` to describe the
output-to-target boundary for future mounting behavior.

Added `createRendererMountRequest` and `createRendererMountResult` helpers to
create stable mount contract shapes without performing any platform work.

---

## Public API

Added Renderer mount exports:

- `RendererMountRequest`
- `RendererMountResult`
- `createRendererMountRequest`
- `createRendererMountResult`

---

## Boundary

Renderer mount contracts are descriptive. Renderer does not yet define DOM
mounting, Home Assistant cards, adapter lifecycles, device targets or theme
resolution.

---

## Validation

- `pnpm --filter @atlas/renderer check`
- `pnpm --filter @atlas/renderer test`
- `pnpm check`
- `pnpm build`
- `pnpm test`
- `git diff --check`

---

## Status

Completed.

---

## Next Sprint

G2.5.38 - Renderer Mounting Review

Suggested focus:

- Review Renderer mount package-root exports
- Add Renderer mount result state coverage
- Document Renderer mounting readiness before adapter contracts
