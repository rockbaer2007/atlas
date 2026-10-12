# Sprint G2.5.9252 - Administration to HACS workflow preservation

ATLAS stabilization item 2: verify the complete current Expert workflow using an
isolated browser, a temporary plugin data directory and a mock HA WebSocket API.
Existing user browser profiles and live HA installations are not modified.

Changes:

- Preserve optional template IDs and resize reference sizes in normalized editor
  fields used by reload, JSON import and HACS import. Older fields without these
  properties retain their previous shape; invalid reference sizes are ignored.
- Compare the HACS manifest name with the embedded package manifest name, rather
  than the first card title. Existing raw-card summary behavior remains intact.
- Add regression tests for JSON/HACS round trips and invalid legacy metadata.
- Add a reproducible isolated browser workflow test under `tests/e2e/`.
- Framework 0.2.0-alpha.87, HA package logic 0.2.0-alpha.79,
  Card Editor descriptor 0.2.0-alpha.95, HA app 0.1.286.

Validation:

- 148 Home Assistant tests passed, including the two new regression tests;
  existing manifest-mismatch rejection and raw-card summary tests still pass.
- HA TypeScript check, full ATLAS build, JavaScript syntax and diff checks passed.
- Isolated Edge/Playwright browser test: 10 checkpoints passed. Tested encrypted
  token restoration, navigation, HA entities/resources, Core/Bubble/Mushroom,
  field positions and preview on reload, DE/EN/FR HACS ZIP and JSON export/import,
  container restart, Administration restoration and subsequent reconnection.
- Installed test plugin remains active and its settings file stays byte-identical.
  No JavaScript page errors and no HA service calls occurred.
- Artifacts: `C:/Users/rockb/AppData/Local/Temp/atlas-e2e-xWXiIu/report.json`
  plus ZIP/JSON downloads, inspections and final editor screenshot in that folder.
- Both repository copies pass the 469-file canonical source comparison.
- Generated HA image 0.1.286 builds on amd64, has the matching version label,
  reports both surfaces ready and serves the expected Administration HTML at
  `/admin` and Card Editor HTML at `/editor`. These are the actual app routes;
  HTTP 200 alone on an unknown route can merely return the Plugin Hub fallback.
- German, English and French public docs updated; VitePress build passed with
  its existing chunk-size warning.

Limitations: mock HA only; no real HA/Supervisor update, hardware actions,
mobile browser or aarch64 image tested. After restart the tested flow opens
Administration to restore browser-held encrypted credentials before entering
the editor. User profiles, installed production plugins and live HA settings
were not modified. Test containers were removed.

Status: completed; stabilization items 3 and 4 remain pending.

Scope: the current UI intentionally starts in Expert mode (existing behavior
since commit 15b40d1f). This increment does not reintroduce a Simple mode switch
or change the retained Administration start-mode setting. Exported-card locales
remain English fallbacks without an enabled translation provider.
