# Sprint G2.5.35 - Renderer Target Boundary

## Goal

Define the first Renderer target contract shape before mounting behavior is
introduced.

---

## Deliverables

- Renderer target type contract
- Renderer target creation helper
- Renderer target contract tests
- Sprint documentation

---

## Implementation

Added `RendererTargetKind`, `RendererTarget` and `createRendererTarget` to
`@atlas/renderer`.

Renderer targets record a target kind, name and optional identifier. The helper
returns a copied target shape so the public boundary is explicit without
binding targets to DOM, Home Assistant surfaces, devices or mounting behavior.

---

## Public API

`@atlas/renderer` now exports:

- `RendererTarget`
- `RendererTargetKind`
- `createRendererTarget`

---

## Boundary

Renderer targets are descriptive. Renderer does not yet define target mounting,
DOM references, Home Assistant surfaces, devices or theme resolution.

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

G2.5.36 - Renderer Target Review

Suggested focus:

- Review Renderer target package-root exports
- Add Renderer target kind coverage
- Document Renderer target readiness before mounting contracts
