# Home Assistant compatibility matrix

Qualification checkpoint: 2026-10-15. These are exact tested combinations,
not an inclusive supported-version range or a production-readiness claim.

| HA Core | ATLAS integration / Runtime | Verified scope |
| --- | --- | --- |
| 2026.9.4 | 0.1.306 / 0.1.306 | Fresh isolated official amd64 Core container; real config/options flows, invalid URL rejection, admin-only panel, served module, integration reload and full HA stop/start; embedded Chrome Hub, Administration and Editor; authenticated version discovery, live entity search/selection; unchanged entry/schema, unrelated panels, project, plugin metadata/assets and config fixture. |
| 2026.10.1 | 0.1.306 / 0.1.305 native App | Previously qualified isolated Core and native Proxmox x86_64 / Pi 5 ARM64; HACS release update 0.1.301 -> 0.1.306 and HA restart with preserved data. Isolated rollback/re-update and unknown schema rejection. See Sprints 9313 and 9314. |

The eleven Python integration contracts run against both exact official HA
images in the `home-assistant-compatibility` CI matrix. They use actual HA
dependencies with mocked entries/hass for bounded contract checks; they do not
start HA or replace the separate real-instance qualification above. The six
frontend tests remain in the build job. Both contract rows and frontend tests
passed locally at this checkpoint.

Reproduce a contract row from the repository root with Docker:

```sh
docker run --rm --entrypoint python -v "$PWD:/work:ro" -w /work ghcr.io/home-assistant/home-assistant:2026.9.4 scripts/test-atlas-frontend.py
```

For a new real-instance check, use a fresh config/data directory and loopback-only
ports. Copy only the ATLAS integration into the fixture's `custom_components`.
Create test-only credentials, entities, project and plugin assets. Back up the
initialized fixture before restart, compare the full own config entry and panel
metadata, and hash the runtime's data before/after. Never downgrade an existing
HA data directory or reuse production tokens just to add a matrix row.

The 2026.9.4 fixture uses official image digest
`sha256:3e6710a7ab2a61311d9d899b719f6c3657791c63e8f4942cec4ebc42401d6b76`.
Private fixtures, checked Git bundles and evidence are retained under
`C:/Users/rockb/source/backups/atlas-ha-matrix-20261015`.

Boundaries: 2026.9.4 was manually installed from the canonical integration
folder; HACS download/upgrade, Supervisor/Add-on lifecycle, native ARM64,
third-party card families and release rollback were not repeated for that row.
Pi 5 and Proxmox were neither queried nor changed for the 2026.9.4 test.
No product code, stored schema or package version changes were necessary.
Further HA versions and actual future data-format conversions remain open.
