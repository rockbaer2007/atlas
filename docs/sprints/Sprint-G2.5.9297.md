# Sprint G2.5.9297 - Authenticated HA version discovery

2026-10-15. App/Add-on 0.1.303. No integration/schema migration.

## Backup and data boundary

Before source changes, retain Atlas, add-on and docs Git bundles in
`C:/Users/rockb/source/backups/atlas-ha-version-20261015`.
Existing native Pi backup and verified recovery exports remain available.
Do not update either live HA host during this implementation. Existing settings,
projects, installation identities, installed plugins and browser credentials on
those hosts are not changed. Browser tests use an isolated local runtime/data
root with a fake HA API and a disposable token, never the user's connection.
Preserve user-owned untracked roadmap files and docs `work/`.

## Implementation

- Administration reads only the configured HA connection's authenticated
  `GET /api/config` version. Expose sanitized status, normalized/raw version and
  source through `GET /api/homeassistant/version`; remote payloads, errors,
  locations and tokens stay private. No new credentials, capabilities or stores.
- Bound requests to three seconds and 256 KiB. Refuse redirects. Missing
  configuration, unauthorized access, malformed responses, network failures and
  timeouts remain unavailable. Never cache a successful version for later use.
  Reject results if the Admin connection changes while a request is pending.
- For HA requirements from catalog, descriptor or embedded manifest, the App
  fetches server metadata before preview and again before file staging. Client
  version claims are ignored. Known mismatches still return 422; unknown results
  still require explicit review. Other plugin checks need no HA request.
- Normalize HA beta/rc/dev notation to SemVer prereleases; never treat a
  prerelease as a stable release to satisfy a range.
- Bump App package/config to 0.1.303; keep framework and HA integration versions
  unchanged. Update release notes, policy, roadmap and public DE/EN/FR guides.

## Verification

- App tests: 29/29. Real Administration subprocess against an authenticated local
  HA fixture covers fresh versions, missing credentials, denied access, redirects,
  timeout and connection changes; unit tests cover invalid/oversized payloads,
  private-data exclusion and prerelease handling.
- Real App lifecycle tests cover a successful HA-constrained replacement,
  mismatched versions after successful preview, unavailable HA, unverified sources,
  catalog constraints and forged client versions. Rejected updates preserve
  installed files, settings/project fixtures and absence of staging directories.
- HA package tests: 163/163. Full pnpm build and changed server syntax checks pass.
- Browser on local port 4176: version endpoint returns authenticated fixture
  2026.10.1. Actual package-import UI rejects HA >=2027 and displays 2026.10.1;
  initial four-entry catalog remains unchanged. No test plugin installed.
  Private screenshot: `ui-ha-mismatch.png`.
- Canonical and separate add-on repository packages synchronized and verified:
  497 files each. Public VitePress DE/EN/FR build and whitespace checks pass.
- Docker CLI is available, but the Docker engine is not running; no local Docker
  image build or container health check is claimed.

## Remaining qualification

Pi/Proxmox update to 0.1.303 and real authenticated HA discovery are not yet
qualified. Existing 0.1.302 native evidence stays in Sprint G2.5.9296. Real
external-plugin replacement, further HA versions and integration schema
migration remain open. The new REST discovery requires an available token in
Administration; it does not use a browser version or infer HA from the App host.
