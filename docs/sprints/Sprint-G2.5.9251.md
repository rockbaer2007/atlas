# Sprint G2.5.9251 - Consistent Home Assistant source packages

Goal: align the older in-repository HA package with the canonical scaffold and
the published add-on repository without changing settings or plugin contracts.

Implementation:

- Record the agreed four stabilization items and source backup location.
- Use one source inventory for package preparation and repository synchronization.
- Add a read-only package check that compares complete file contents.
- Bump the HA app to 0.1.285; keep framework and plugin versions unchanged.
- Preserve configuration keys/defaults, data paths and reference-plugin selection.

Validation:

- `pnpm build` and all workspace tests with `pnpm test --run` passed.
- Home Assistant package: 146 tests passed.
- New packaging tests: source copying preserves existing destination data and
  excludes build artifacts; read-only checking rejects an incomplete repository.
- Request-origin tests: 3 passed; JavaScript syntax and `git diff --check` passed.
- Both repository copies match the 469 canonical source files.
- Compared configuration with the backup: only the version changed, including
  the old 0.1.224 copy. Options, schema and persistent paths remain unchanged.
- `pnpm docker:build` and the generated HA image build with BUILD_VERSION=0.1.285
  passed on amd64. HA image version label is 0.1.285.
- Both isolated containers return HTTP 200 for `/health`, `/app`,
  `/administration/` and `/card-editor/`; both surfaces are ready. The standalone
  container reports healthy. The HA image contains the Card Editor reference
  plugin; external installed-plugin storage remains outside the source package.
- Test containers removed. No live HA installation or browser user settings
  were modified. aarch64 image and real Supervisor update remain unverified.

Status: completed. Stabilization items 2–4 remain pending. Only ATLAS changes
belong in the sprint ledger; standalone project reports omit ATLAS sprint numbers.
