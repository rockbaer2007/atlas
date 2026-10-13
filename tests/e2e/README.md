# ATLAS workflow preservation test

Run from the ATLAS repository after `pnpm build` and `pnpm docker:build`:

```powershell
node tests/e2e/atlas-stabilization.mjs
```

Prerequisites: Docker running with `atlas:local`, Python with the standard ZIP
library, Playwright 1.62.1 or compatible, and installed Microsoft Edge. If
Playwright is installed outside the repository, set `ATLAS_PLAYWRIGHT_MODULE`
to its module directory. Ports 4174, 4175, 4176 and 18123 must be free; the test
does not stop existing servers to obtain them.

The test creates a temporary browser context, data directory and container,
and uses a mock HA API with an explicitly fake token. External browser requests
are blocked. It verifies settings reload, encrypted token restoration, plugin
navigation, HA authentication/entities/resources, Core/Bubble/Mushroom fields,
editor reload, DE/EN/FR ZIP and JSON export/reimport, and restart preservation.
It verifies that no HA service calls occur and plugin fixture settings stay
unchanged. Browser and test container are closed; temporary reports, downloads,
screenshots and the test-owned data directory are retained for inspection.

The problem-report checks seed fake credentials into card text and diagnostic
strings, and unrelated test cookies/storage. DE/EN/FR preview, clipboard payload,
clipboard failure fallback, offline issue URL and styled YAML import are covered.
Clipboard calls use a test implementation without modifying the OS clipboard;
the GitHub compose URL is fulfilled locally, with no request sent to GitHub.
Saved editor/Administration settings and plugin descriptors/state are compared
before and after each report flow.

Important boundaries: this tests a simulated HA connection, not a live Supervisor
update, mobile browser or real HA actions. After restart the flow opens
Administration to restore its encrypted browser-held credentials, then enters
the editor. Generated card locales can remain English fallbacks when automatic
translation is disabled. The current UI intentionally uses the Expert workflow.
