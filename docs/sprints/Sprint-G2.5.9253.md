# Sprint G2.5.9253 - Opt-in problem report privacy and workflow

ATLAS stabilization item 3, 2026-10-13.

Changes:

- Redact quoted JSON/YAML credentials, escaped values, cookie headers, embedded
  URL userinfo, encoded query keys and token-bearing URL fragments.
- Preserve configured-key status only for real booleans; redact non-boolean
  values in configured maps. Remove the known HA session/reconnect token even
  when embedded in ordinary card text. No new Admin secrets are read.
- Fix the report's imported-style count to use `layoutOptions`, matching the
  existing style-inspection contract.
- Extend isolated browser tests with DE/EN/FR preview, clipboard payload and
  failure fallback, offline GitHub link and styled YAML import.
- Framework 0.2.0-alpha.88, HA package logic 0.2.0-alpha.80,
  Card Editor descriptor 0.2.0-alpha.96, HA app 0.1.287.
- Public report-flow documentation updated in German, English and French.

Validation:

- Reproduced seven privacy failures before the filter corrections.
- 159 HA tests pass, including 16 report tests; TypeScript check and build pass.
- All 14 isolated browser checkpoints pass, including the previous workflow,
  DE/EN/FR reporting, unchanged saved settings/descriptor/state snapshots,
  clipboard failure fallback and styled YAML report preview. No page errors.
- Browser artifacts: `C:/Users/rockb/AppData/Local/Temp/atlas-e2e-DIyQcS`.
- Standalone Docker and HA image 0.1.287 build on amd64. Both package repositories
  match all 469 canonical files. The HA image carries the 0.1.287 version label.
- DE/EN/FR documentation builds successfully with the existing chunk-size warning.
- No live HA installation, real provider credentials, OS clipboard or installed
  production-plugin data was modified. Test containers removed after checks.

Status: stabilization item 3 complete. Item 4, the final stabilization review,
remains pending. Real Supervisor update and aarch64 execution remain unverified.

Boundaries: test-only HA endpoint and credentials, temporary profile and plugin
store. Clipboard payloads use a stub so the OS clipboard remains unchanged;
GitHub issue navigation is intercepted and fulfilled offline. No reports or
issues are sent, no real HA service calls are made. Arbitrary personal text
still requires review before sharing. Diagnostic report text remains English;
the existing dialog and status messages support DE/EN/FR.
