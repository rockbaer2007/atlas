# Sprint G2.5.55 - Renderer Adapter Selection Policy Readiness

## Goal

Define Renderer adapter first-candidate selection helper before automatic
conflict resolution.

---

## Deliverables

- Renderer adapter first-candidate selection helper
- Renderer selected policy helper coverage
- Renderer missing policy helper coverage
- Sprint documentation

---

## Implementation

Added `selectFirstRendererAdapterCandidate` to apply an explicit first-candidate
selection policy to a Renderer adapter selection request.

The helper selects the first available candidate and reports an unselected
result when no candidates exist.

---

## Public API

Added Renderer adapter selection policy export:

- `selectFirstRendererAdapterCandidate`

---

## Boundary

The first-candidate helper is an explicit policy helper only. Renderer does not
yet wire selection policies into conflict detection, conflict resolution,
platform mounting, Home Assistant cards, device targets or theme resolution.

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

G2.5.56 - Renderer Adapter Selection Policy Review

Suggested focus:

- Review Renderer adapter selection policy package-root exports
- Add first-candidate policy candidate order coverage
- Document policy readiness before conflict integration
