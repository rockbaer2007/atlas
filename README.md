# ATLAS Framework

ATLAS is a modular TypeScript framework focused on stable architecture,
explicit contracts and long-term maintainability.

Current focus:

**Home Assistant App/Add-on and Plugins**

ATLAS now ships a combined app runtime for Home Assistant-oriented workflows:
Administration, Plugin Hub, the Home Assistant Card Editor, ATLAS File Studio
and ATLAS Automation Exporter / Editor. The current Home Assistant App/Add-on
package is `0.1.128`.

The Plugin Hub opens one active plugin directly, shows a selection when several
plugins are active and keeps capability plus sidebar URL details collapsed by
default. It can copy either a plugin URL for Home Assistant Webpage dashboards
or a ready-to-use `panel_iframe` YAML block.

ATLAS Automation Exporter / Editor is available as a GitHub-installable plugin
at version `0.1.5`. It can analyze `/config/automations.yaml` or uploaded YAML,
show highlighted automation details, detect modern `action:` service calls and
export selected automations with timestamped filenames.

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
* Plugin Hub and installed plugin routing: `http://127.0.0.1:4176/`

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
