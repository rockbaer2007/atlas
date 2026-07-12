# Sprint G2.5.53 - Renderer Adapter Selection Readiness

## Goal

Define Renderer adapter selection request and result contracts before automatic
conflict policies.

---

## Deliverables

- Renderer adapter selection request contract
- Renderer adapter selection result contract
- Renderer selected and unselected adapter coverage
- Sprint documentation

---

## Implementation

Added `RendererAdapterSelectionRequest` and `RendererAdapterSelectionResult` to
describe explicit adapter selection inputs and outputs.

Selection requests carry a name and candidate adapter list. Selection results
can describe a selected adapter or an unselected state. Request creation copies
candidate arrays so later source mutations do not change the request shape.

---

## Public API

Added Renderer adapter selection exports:

- `RendererAdapterSelectionRequest`
- `RendererAdapterSelectionResult`
- `createRendererAdapterSelectionRequest`
- `createRendererAdapterSelectionResult`

---

## Boundary

Renderer adapter selection contracts are descriptive only. Renderer does not yet
define automatic conflict policies, preference rules, platform mounting, Home
Assistant cards, device targets or theme resolution.

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

G2.5.54 - Renderer Adapter Selection Review

Suggested focus:

- Review Renderer adapter selection package-root exports
- Add empty candidate selection request coverage
- Document selection readiness before policy helpers
