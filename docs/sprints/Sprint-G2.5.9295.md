# Sprint G2.5.9295 - Plugin compatibility gate before replacement

2026-10-15. App/Add-on 0.1.302 and Runtime package 0.2.0-alpha.39.

## Backup and data boundary

Before edits, retain Atlas, add-on and documentation Git bundles under
`C:/Users/rockb/source/backups/atlas-plugin-compatibility-gate-20261015`.
No deployed HA system, existing plugin directory, project or settings store is
changed. Browser verification uses an isolated local runtime with its own data
root and installation identity. User-owned untracked roadmap files and docs
`work/` remain untouched. Existing native HA backups remain available.

## Implementation

- Add read-only `/api/plugins/check-compatibility`; validate the candidate
  package with the same origin/identity/path checks as installation.
- Combine catalog, package descriptor and embedded manifest constraints. Use
  pinned node-semver 7.8.5 for ranges; preserve descriptor declarations through
  package parsing/serialization and Runtime catalog creation.
- Recheck at `/api/plugins/install` before staging files. A known mismatch or
  malformed known requirement returns 422. Unknown declarations return 409
  until explicitly acknowledged; acknowledgement cannot override incompatibility.
- Check actual App version and configured distribution host aliases. Preserve
  the historic administration-local alias. An ordinary local process is not
  inferred to be Docker from the default health label.
- HA version is not acquired or trusted from the client: declared HA ranges
  remain unknown and require manual review. Unknown future fields also require
  review. No automatic deactivation of existing legacy plugins.
- Administration performs preview before repository installation/update or
  local package import. Require catalog/package version agreement, show DE/EN/FR
  mismatch reasons, and ask before accepting unknown/legacy compatibility.
  Cancellation and errors leave browser plugin metadata unchanged.
- Separate preview route avoids an older backend treating a preview request
  as a real install. A missing preview service fails without installing.

## Verification

- App tests: 24/24. New range cases cover zero-major, prerelease, invalid ranges,
  combined sources, host alternatives, legacy metadata and unavailable HA.
- Real isolated backend lifecycle verifies read-only preview, refusal without
  acknowledgement, server-side rejection even with acknowledgement, independent
  catalog/descriptor/manifest constraints and supported update/restart. Rejected
  candidates preserve installed bytes and project/settings fixtures; no staging
  directory remains. Shared management/project lifecycle regressions pass.
- Runtime tests: 56/56, including compatibility preservation in package parsing
  and generated manifests. Home Assistant package tests: 163/163.
- Full pnpm build and JavaScript syntax checks pass.
- Browser on the standard combined local port 4176: incompatible local fixture
  displays the reason and remains absent; legacy fixture prompts for review,
  cancellation preserves the original four-entry test catalog. No real plugin
  is installed. Private screenshot: `ui-blocked.png`.
- Canonical and separate add-on repository packages synchronized and verified:
  495 files each. Docker CLI exists but Docker engine is stopped; container build
  and container health checks could not run.
- Public DE/EN/FR compatibility guides updated and built; whitespace checks pass.

## Limits and remaining work

No live Pi/Proxmox update or native gate qualification is claimed. HA integration
code/version remains 0.1.301; this change updates the App backend. No schema
migration or reverse migration is introduced. Constraints document declared
compatibility, not plugin trust or functional certification. Catalog constraints
are supplied by the client; embedded package/manifest constraints are rechecked
on the server. Verified HA-version discovery, native deployment and broader
compatibility qualification remain open.
