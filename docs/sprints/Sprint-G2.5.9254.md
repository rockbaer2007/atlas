# Sprint G2.5.9254 - Combined stabilization acceptance checks

ATLAS stabilization item 4, 2026-10-13. Runtime remains framework
0.2.0-alpha.88 / HA app 0.1.287. This increment changes validation and
documentation only; no new runtime settings, plugin contracts or data migrations.

Changes:

- Fix the stale workspace readiness assertion (alpha.86 -> current alpha.88).
- Extend the isolated browser test with older Administration preferences:
  plaintext token/provider-key migration, single-repository-URL migration,
  retained theme and active plugin IDs. Existing workflow/report checks remain.
- Record the combined acceptance results and update DE/EN/FR public status.

Verification:

- `pnpm test --run`: 870 tests passed across all 11 workspace packages.
- `pnpm check`: all workspace TypeScript checks passed.
- `pnpm build`, JavaScript syntax checks and `git diff --check` passed.
- Request-origin and packaging tests: 5 passed.
- Package check: 469 canonical source files match both repository copies.
- Fresh standalone and HA amd64 Docker builds passed.
- Browser: all 15 checkpoints passed, including legacy preferences, restart,
  JSON/HACS export/reimport, DE/EN/FR reporting and clipboard-failure fallback.
  Project/Administration settings and plugin state/descriptor snapshots stay
  unchanged through reporting; test-plugin settings stay byte-identical.
- Browser artifacts: `C:/Users/rockb/AppData/Local/Temp/atlas-e2e-y56FbP`.
  The migrated provider key and HA token both restore after reload and restart.
- HA options/schema/defaults match the pre-stabilization backup; only the version
  differs. The two user-owned untracked roadmap files retain their SHA256 hashes.
- Generated HA image 0.1.287 reports both surfaces ready and returns the actual
  Administration/Card Editor HTML through `/admin` and `/editor`. Test containers
  were removed. DE/EN/FR docs build passed with the existing chunk-size warning.

Boundaries: isolated mock HA and fake credentials; no real Supervisor upgrade,
physical HA actions, native OS clipboard, mobile or aarch64 execution tested.
The GitHub issue URL is verified offline without submitting a report. Cold
restart verification restores encrypted credentials through Administration.
The current Expert UI and existing English card-locale fallback behavior remain.

Status: complete. All four agreed stabilization items are finished within these
test boundaries. Deployment verification on the user's real HA remains separate.
