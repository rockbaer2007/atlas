# Sprint G2.5.9270 - A5 Docker verification follow-up

2026-10-14. Evidence-only follow-up for source commit `ace0cfbc`, HA app 0.1.295.
No runtime change or new deployment version. Docker Desktop was enabled by the
user after Sprint 9269; do not restart the macOS VM or touch live HA data.

Backup and logs are outside Git in
`C:/Users/rockb/source/backups/atlas-a5-docker-20261014`. Docker Engine 29.7.2.
Build the standalone image through `pnpm docker:build` and the canonical HA
package with `BUILD_VERSION=0.1.295`, `BUILD_ARCH=amd64`. Both builds pass,
including Linux native node-pty compilation and workspace compilation.

Images tested:

- `atlas:local`: `sha256:d2ca871a24ab9f6d98f7a6950917cf024c24846d6ddfbf514628c0fa537e1f0f`
- `atlas:a5-ha-0.1.295`: `sha256:c7dcbb6a91702a6ed5b9287cb6fe90c92ab6944946df786c7628526f371bc960`

Nine app-server lifecycle/origin regression checks pass inside the standalone
Linux image with network access disabled. Separate disposable containers run
the real Administration, Card Editor and app server, each limited to one CPU
and 512 MiB RAM and exposed only on temporary loopback ports. Test both images
before and after an actual container restart: `/health`, `/admin`, `/editor`,
`/hub`, plugin install and launch status by ID/slug, rejection of conflicting
updates retaining old assets, valid update, persistence after restart,
uninstall and restoring the original package. Other plugin descriptors and
fixture project/settings files compare unchanged.

The HA image reports version 0.1.295 through `/app` and uses its real `/run.sh`.
The standalone image retains its existing `0.0.0-local` version fallback;
its tested source revision is recorded above. These are Linux amd64 container
checks, not ARM64 execution, Supervisor/Ingress deployment, native HA load,
browser storage restoration or renderer/theme/browser compatibility evidence.
No production secrets, projects, plugins or volumes are used.

Both containers pass Docker's health check. Remove only the task-labelled test
containers and their anonymous volumes after recording results; retain image
tags and private logs. A5 remains open for the separately listed native and
renderer/theme checks. Public DE/EN/FR documentation records the Docker results.
