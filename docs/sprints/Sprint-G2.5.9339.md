# Sprint G2.5.9339 - Isolated 60-minute, 36-entity soak

2026-10-17. Qualification only; ATLAS remains 0.1.312, HA Core 2026.10.1,
Bubble 3.4.2 and Mushroom 5.2.3. Pi 5 and Proxmox neither queried nor changed.

## Backup and isolation

- Private evidence: source/backups/atlas-soak-20261017. Full-history ATLAS/docs
  bundles, both untracked user roadmaps, runtime-before copy and eight-file
  hash baseline retained. Existing source files not overwritten.
- Clone the stopped prior isolated HA volume through a read-only source mount
  into own volume/container atlas-soak-20261017. Source-before archive SHA256
  d1960d7d30518e5b4b9c010760070d7e93fee9e1caf151ce285fe772f3b344fb.
- HA loopback 4236, transport proxy 4237, fresh App browser origin
  127.0.0.27:4176 with internal standard 4174/4175. Only new own browser tabs
  used. No real devices or remote translation provider involved.
- A one-day credential belongs only to the cloned HA fixture; it avoids expiry
  of the fixture's ordinary 30-minute access token during the hour.
- Full stopped HA configuration copied to PC and archived after the soak:
  SHA256 539600c333ef0459d5e7268591c7f3891c4de3011d580f2c1d5024bad3567deb.

## Workload and recovery

- Measured 09:02:57.807 to approximately 10:02:59 CEST: 3,601,541 ms.
  720 batches at nominal five-second intervals, 10,080 successful service calls,
  25,920 target-update requests, zero service failures. This counts requested
  target updates, not an independently counted total of state_changed events.
- 36 unique card entities: twelve Core sensors driven by twelve input_number
  helpers, twelve Bubble switches and twelve Mushroom template entities backed
  by 24 separate input_boolean helpers. No sensor/device service outside fixture.
- Proxy terminates existing Editor/HA sockets and refuses new transport during
  outages at minutes 10, 25 and 45. Measured durations: 15,002 / 45,003 / 90,007 ms.
  HA-side service updates continue directly while browser transport is offline.
- Existing Editor closes/reconnects automatically after every outage; all 36
  fields remain. Both browser sockets are active after each recovery. The
  90-second outage explicitly has zero active proxy connections while offline.
  No browser reload or manual connect during the measured hour.
- 36 browser checks during the measured hour retain twelve hui-entity-card, twelve bubble-card
  and twelve mushroom-template-card, with zero hui-error-card. Core/Bubble
  values visibly change. Mushroom default secondary text remains its entity ID;
  this is not dynamic authored Jinja-template qualification.
- Final REST reads of all 36 unique target entities match the final workload
  batch. Proxy counts 42,784 received frames; payloads/tokens are not logged.

## Storage and actual browser export

- Save own project through UI preview/confirmation before the run; after the
  hour, save revision 2, reload and preview/open that exact project ID. Full
  field metadata and generated card configuration match the expected plan.
- Actual first browser HACS ZIP is imported after the hour and exported again
  with EN/DE/FR selected. Both 67,810-byte ZIPs are identical, readiness 112/112,
  SHA256 a87ba07dcd15a1eef24e456265728ef41ecd0148de778cecab6594bea2210f83.
- The hour renders the initially generated fixture package. It has the same
  checked card configuration; its script/locale metadata bytes differ from the
  later UI export. Do not claim that exact downloaded script ran for 60 minutes.
  Afterwards the actual UI script/locales are deployed together at a fresh own
  resource URL, served byte-exact, and render all 36 cards without errors after
  a separate HA restart/reload. Test helpers intentionally initialize to their
  configured defaults on HA restart; final workload state checks precede it.
- Original eight runtime file contents, plugin/config/history/trash fixtures and
  complete original server project remain exact; projects index only extended.
  An extra own post-run project copy was created with New server project selected
  after reload. It is retained separately; the intended original test project
  was subsequently selected by ID and updated to revision 2. No user project
  replaced, deleted or deduplicated.
- All 48 original stopped HA source-file contents match the source-before
  archive after the test; only the new cloned volume was changed.
- After the measured hour, a Docker bind-mount helper/start operation stalled.
  The own stalled helper was removed, the stopped configuration was successfully
  copied/archived with docker cp, and official Docker Desktop restart restored
  normal operations. The subsequent actual-export render check passes. This
  desktop issue occurred outside the measured run; no host/fixture data lost.

## Measurements and limits

- 61 one-minute HA/coordinator/Chrome samples. Full three-process ATLAS group
  added at elapsed 340,170 ms, with 55 samples through completion. Earlier
  samples cover only the coordinator, not the complete App process group.
- Full ATLAS group working set: first 168.20 MiB, last/peak 168.56 MiB,
  minimum 168.09 MiB. Sampled HA container memory: 652.1-681.0 MiB,
  initial 680.2 MiB, final 665.8 MiB. No concerning sustained rise observed
  within this bounded run; this is not proof that leaks are impossible.
- HA CPU snapshots 0-2.15%; these sparse samples do not capture every burst.
  Windows CPU counters and working/private bytes are retained separately.
- Chrome metrics aggregate ALL its processes, including user tabs. Working set
  ranges approximately 2.97-3.44 GiB; it is not isolated per-tab ATLAS memory.
  Do not infer a Card-specific leak or CPU average from changing process totals.
- Windows PC browser/Node and Docker Linux fixture only; no ARM64 performance,
  physical LAN failure, suspended-browser or production-capacity claim.
- No runtime change or version bump needed. DE/EN/FR documentation updated;
  documentation build and whitespace checks recorded with completion evidence.
