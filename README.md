# ATLAS Framework

ATLAS is a modular TypeScript framework focused on stable architecture,
explicit contracts and long-term maintainability.

Current focus:

**Stabilized Framework Contracts**

The G2.5 sprint line is complete. ATLAS now has a stabilized foundation,
runtime, renderer and integration-boundary contract surface with no planned
sprints remaining in the current sprint ledger.

The recommended next phase is product-facing implementation: turn the renderer
contracts into a concrete mounted output scenario before opening Theme, Home
Assistant or Devtools execution paths.

---

# Documentation

* `ATLAS.md` - project identity and principles
* `ROADMAP.md` - strategic roadmap
* `SPRINTS.md` - sprint overview
* `SNAPSHOTS.md` - release snapshot overview
* `docs/project/STABILIZATION_REVIEW.md` - G2.5 stabilization review
* `CONTRIBUTING.md` - contribution process
* `SECURITY.md` - security policy
* `docs/adr` - architecture decision records
* `docs/project` - project specifications

---

# Development

Install dependencies:

```sh
pnpm install
```

Run quality gates:

```sh
pnpm check
pnpm build
pnpm test
```

---

© ATLAS Framework
