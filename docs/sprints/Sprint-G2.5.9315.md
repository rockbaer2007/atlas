# Sprint G2.5.9315 - Additional stable HA compatibility row

2026-10-15. User requests another stable HA version, isolated only. Pi 5 and
Proxmox must remain unchanged. No production host is queried or modified.

## Backup and isolation

- Verified complete-history Git bundles for ATLAS and documentation, plus copies
  of the two user-owned untracked roadmap files. Leave those originals untouched.
- Fresh official HA Core2026.9.4 amd64 container, new config directory, generated
  local-only test credentials and input_boolean fixture. No 2026.10 storage
  downgrade, production settings, files, tokens or devices are used.
- Bind HA4194 and runtime4195/internal4196/4197 to loopback only. All runtime
  plugin/config/history/trash/identity roots point into the new private fixture.
- Back up initialized runtime data and stopped HA config before restart.
  HA archive SHA256: `a2cc21817bdd1cb7d48043e4907d229ce17fe994527fec9320db47fe065f73ae`.
  Evidence: `C:/Users/rockb/source/backups/atlas-ha-matrix-20261015`.

## Results

- Eleven integration contracts pass independently with actual HA2026.9.4 and
  HA2026.10.1 Python dependencies. Six frontend and 39 App tests pass.
- Real HA2026.9.4 config flow, rejection of credential-bearing URL, options,
  integration reload, admin-only panel, static module0.1.306 and full HA stop/start
  pass. Exact entry identity, data/options/schema1.1 and all unrelated panel
  metadata remain equal. Fixture input_boolean is available after restart.
- Real Chrome embedded Hub, Administration and Editor load. Editor authenticates
  against the local fixture, receives 19 live entities, searches the real
  `input_boolean.atlas_matrix_lamp` and prepares its ID/name for an Expert field.
  Authentication/version discovery still returns2026.9.4 after HA restart.
  Direct HA-page reload followed by Editor opening reconnects without token input.
- Eight runtime fixture files retain exact hashes, including named project,
  shared management revision1, installed fixture manifest/HTML and config YAML.
  Project/metadata APIs compare equal after restart and after browser checks.
- First private comparison helper accidentally included result metadata only in
  its saved baseline; fix the helper and repeat comparisons against the retained
  original baseline. No product change or data repair is needed.
- CI now has an independent two-version HA contract matrix with fail-fast off.
  Public DE/EN/FR documentation records exact rows and qualification limits.
- Documentation build and both Git whitespace checks pass. VitePress reports
  its existing large-chunk advisory. Own browser tab is closed; own HA container
  and three runtime processes are stopped, with backup/evidence retained.

See [the matrix](../deployment/HA_COMPATIBILITY_MATRIX.md) for reproducible
commands and exclusions. HACS delivery, native ARM64, third-party card families
and release rollback were not requalified on2026.9.4. Product version remains
0.1.306; this increment changes qualification/CI/docs only.
