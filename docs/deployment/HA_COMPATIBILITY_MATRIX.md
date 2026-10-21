# Home Assistant compatibility matrix

Qualification checkpoint: 2026-10-21. These are exact tested combinations,
not an inclusive supported-version range or a production-readiness claim.

| HA Core | ATLAS integration / Runtime | Verified scope |
| --- | --- | --- |
| 2026.9.4 | 0.1.306 / 0.1.306 | Fresh isolated official amd64 Core container; real config/options flows, invalid URL rejection, admin-only panel, served module, integration reload and full HA stop/start; embedded Chrome Hub, Administration and Editor; authenticated version discovery, live entity search/selection; unchanged entry/schema, unrelated panels, project, plugin metadata/assets and config fixture. |
| 2026.10.1 | 0.1.306 / 0.1.305 native App | Previously qualified isolated Core and native Proxmox x86_64 / Pi 5 ARM64; HACS release update 0.1.301 -> 0.1.306 and HA restart with preserved data. Isolated rollback/re-update and unknown schema rejection. See Sprints 9313 and 9314. |
| 2026.10.2 | 0.1.306 / 0.1.327 native App | Existing test clone .68 after fresh full backup; embedded Hub/Administration/Editor, direct Editor connection and live sun.sun search, local save/reload, JSON and YAML HACS bundle export/import/re-export with 112/112 and byte equality, real HA Core restart and automatic Editor reconnection without reloading. Original Editor, seven server projects, six plugins, captured settings and files preserved. Temporary Runtime URL restored; .177 never accessed. See Sprint 9378. |

The eleven Python integration contracts are configured for the three exact official HA
images in the `home-assistant-compatibility` CI matrix. They use actual HA
dependencies with mocked entries/hass for bounded contract checks; they do not
start HA or replace the separate real-instance qualification above. The six
frontend tests remain in the build job. Both contract rows and frontend tests
passed locally at the 2026-10-15 checkpoint for the two historical rows.
All three contract jobs and the build job passed in
[CI run 39629349433](https://github.com/rockbaer2007/atlas/actions/runs/39629349433).
The eleven 2026.10.2 contracts also passed locally in the official image with
`--network none`; no extra live HA instance was started.

Reproduce a contract row from the repository root with Docker:

```sh
docker run --rm --entrypoint python -v "$PWD:/work:ro" -w /work ghcr.io/home-assistant/home-assistant:2026.9.4 scripts/test-atlas-frontend.py
```

Current real-instance tests are restricted to the explicitly authorized test
hosts 192.168.178.177 and 192.168.178.68. Historical isolated container rows do
not authorize new test targets. For the 2026-10-21 qualification, only .68 is
used and .177 must remain untouched. Take a fresh full backup, preserve the
original Editor export, compare projects/plugin settings/configuration hashes,
use owned test projects, then restore temporary settings and remove owned
artifacts. Never downgrade an existing HA data directory just to add a row.

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

## 2026.10.2 checkpoint boundaries

This row qualifies an already installed stable HA version, not an HA update or
schema migration. The integration remains 0.1.306 and the App remains 0.1.327.
HACS refers here to native Card bundle roundtrips; GitHub repository registration,
HACS installation/release updates, Supervisor restore, ARM64 and large Community
Card rendering were not repeated for this row. Saving/reloading is browser-local;
the seven existing shared server projects are compared without overwriting them.

The Options UI restores the original effective Runtime URL on .68 to
`http://192.168.178.177:4176/`. It retains that URL as an explicit option and updates
the entry timestamp; the original entry ID, data, schema and all other entries
remain unchanged. The panel is not opened after restoring this URL, so .177 is
never contacted. Administration also refreshes its settings timestamp; its
effective connection/settings remain identical. Eight captured files are
byte-identical; the ninth is the entry registry with only the changes above.
The complete original Editor export matches except for its export timestamp.

Fresh full backup: .68 `05de4b62`, 141.48 MB, including HA settings/history,
share/media/SSL and all Apps. Final unfiltered inventory retains exactly three
full backups: `05de4b62`, `e1a698d2`, `5a0986d5`. Old test backup `538b69e2`
is removed under the user's explicit test-backup retention authorization;
no additional full PC archive copy is claimed. PC evidence is retained under
`C:/Users/rockb/source/backups/atlas-ha-matrix-68-20261021`.
The 2026.10.2 contract image digest is
`sha256:33afb0659d786213264c2211f8d91c5fe87461c56eba6a3a546eb05fc71e89f4`.
