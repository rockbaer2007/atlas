# ATLAS Framework

ATLAS is a modular TypeScript framework focused on stable architecture,
explicit contracts and long-term maintainability.

Current focus:

**Framework Readiness**

The active workspace now includes a metadata-only `@atlas/workspace` package
that keeps root manifests, package layers, dependency rules, quality gates and
planned integration closures aligned before concrete framework capabilities are
opened.

---

# Documentation

* `ATLAS.md` - project identity and principles
* `ROADMAP.md` - strategic roadmap
* `SPRINTS.md` - sprint overview
* `SNAPSHOTS.md` - release snapshot overview
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
