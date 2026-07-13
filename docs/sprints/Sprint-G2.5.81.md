# Sprint G2.5.81 - Renderer Platform Adapter Selection Readiness

## Goal

Define Renderer platform adapter selection request and result contracts before
automatic conflict policies.

---

## Deliverables

- Renderer platform adapter selection request contract
- Renderer platform adapter selection result contract
- Selected and unselected platform adapter coverage
- Sprint documentation

---

## Implementation

Added `RendererPlatformAdapterSelectionRequest` and
`RendererPlatformAdapterSelectionResult` to describe explicit platform adapter
selection inputs and outputs.

Selection requests carry a platform and candidate platform adapter list.
Selection results can describe a selected platform adapter or an unselected
state. Request creation copies candidate arrays so later source mutations do not
change the request shape.

---

## Public API

Added Renderer platform adapter selection exports:

- `RendererPlatformAdapterSelectionRequest`
- `RendererPlatformAdapterSelectionResult`
- `createRendererPlatformAdapterSelectionRequest`
- `createRendererPlatformAdapterSelectionResult`

---

## Boundary

Renderer platform adapter selection contracts are descriptive only. Renderer
does not yet define automatic conflict policies, preference rules, DOM mounting,
Home Assistant cards, device targets or theme resolution.

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

G2.5.82 - Renderer Platform Adapter Selection Review

Suggested focus:

- Review Renderer platform adapter selection package-root exports
- Add empty candidate selection request coverage
- Document platform adapter selection readiness before policy helpers
