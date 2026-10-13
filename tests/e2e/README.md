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
and seeds legacy Administration preferences (token/provider keys and the older
single repository URL field) to verify migration without losing the theme,
repository or active plugin IDs. Secrets must leave the ordinary settings JSON.
It uses a mock HA API with an explicitly fake token. External browser requests
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

## A2: architecture and mobile emulation

Use a built image and a fresh test-owned data directory:

```powershell
$env:ATLAS_E2E_IMAGE = 'atlas:a2-arm64-0.1.289'
$env:ATLAS_E2E_PLATFORM = 'linux/arm64'
$env:ATLAS_E2E_MOBILE = '1'
node tests/e2e/atlas-stabilization.mjs
```

The image must be built with `--platform linux/arm64`, `BUILD_ARCH=aarch64`
and the matching `BUILD_VERSION`. The test checks the actual Node architecture.
Leave ATLAS_E2E_PLATFORM unset for amd64. Mobile mode uses a fresh Chromium
touch context with 360x800, 390x844, 844x390, 768x1024 and 1024x1366 viewports in DE/EN/FR.
It checks page overflow against the requested viewport (mobile Chromium can
expand its layout viewport when content overflows), dialog width/height, touch
open/close and unchanged saved settings/projects. Screenshots cover the plugin
manager, problem report, YAML import and HA export dialogs. Existing JSON/ZIP
roundtrips and container restart checks also run in mobile mode.
Only repository `lastChecked` timestamps are excluded from Admin comparisons:
opening the manager legitimately refreshes them in the background. Repository
URLs, IDs, status, credentials flags and every actual preference remain checked.

HA images are deliberately run with the standalone distribution setting for
the editable legacy-Administration migration fixture. This does not test
Supervisor-owned read-only options. ATLAS_E2E_SOURCE_HTML=1 is only a development
shortcut: read-only mounts of the two local HTML files replace image files.
Final acceptance must leave this unset; report.json records its use.

Important boundaries: this tests a simulated HA connection, not a live Supervisor
update or real HA actions. ARM64 on an x86 Docker host uses emulation; it does
not prove native Raspberry Pi performance. Chromium viewport/touch emulation
does not prove physical Android/iOS or Safari behavior, native touch drag/drop,
file-picker/download handling on phones or virtual keyboard behavior. After restart the flow opens
Administration to restore its encrypted browser-held credentials, then enters
the editor. Generated card locales can remain English fallbacks when automatic
translation is disabled. The current UI intentionally uses the Expert workflow.
