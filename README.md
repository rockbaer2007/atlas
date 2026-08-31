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

Run the combined local app preview:

```sh
pnpm build
pnpm start:app
```

Open:

* App status: `http://127.0.0.1:4176/app`
* App health: `http://127.0.0.1:4176/health`
* Administration: `http://127.0.0.1:4175/`
* Home Assistant Card Editor: `http://127.0.0.1:4174/`

Build and run the standalone Docker preview:

```sh
pnpm docker:build
pnpm docker:up
```

The container binds the app surfaces through `ATLAS_HOST=0.0.0.0` and exposes
ports `4176`, `4175` and `4174`. Set `ATLAS_INSTANCE_ID` when a server,
Docker host or later Home Assistant App/Add-on package needs a deliberate
stable Administration identity.

The packaged-app distribution path is documented in
[`docs/deployment/ATLAS_APP_DISTRIBUTION.md`](docs/deployment/ATLAS_APP_DISTRIBUTION.md).
It keeps standalone Docker first, then derives the Home Assistant App/Add-on
and Linux VM/LXC installer from the same runtime contract.

---

## License

MIT License. See [LICENSE](LICENSE).

---

© ATLAS Framework
