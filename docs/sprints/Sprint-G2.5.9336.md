# Sprint G2.5.9336 - Native Icon Studio update and recovery qualification

2026-10-16. Qualify existing ATLAS package recovery on Pi 5 and Proxmox with
external Icon Studio16/17. No ATLAS runtime change; App stays0.1.312 and
authenticated HA stays2026.10.1. External implementation17 belongs to its own repo.

## Safeguards and checks

- Before changes, retain three Git bundles, full persistent plugin-root PC
  mirrors/tars, original16 packages, selected HA configuration, server iconset,
  browser collection JSON and direct-origin JS/SVG exports. Chrome-held exports
  were released by the user and only copied after completion.
- Fresh local HA backups: Proxmox e047560a (4.67GB, HA/SSL/ATLAS), Pi2b440443
  (135.44MB, HA/SSL/all three installed apps). Both retained on their hosts;
  no claim that these full HA archives were downloaded to the PC.
- Actual Administration repository update16->17, guarded UI restore17->original16
  and repository re-update16->17 pass on both hosts. Proxmox cancellation is
  harmless. A stale preview after recovery was rejected without replacement;
  reloading Administration and selecting the update again succeeds.
- At every stage all12served assets match the expected actual package.
  Original non-target files/configuration, shared settings, activation and
  repositories remain exact except normal target-version/revision bookkeeping.
  Each host retains six active plugins, one complete named project, two trash
  entries and12history files. Only expected recovery/management backups are added.
- Four browser contexts: direct4176 and observed HA Ingress URL per host. Each
  contains three reference icons and an empty drawing. Final collection JSON is
  byte-identical to its own baseline; drawing DOM remains exact after reload.
  New text creation succeeds, undo and reload restore the original empty draft.
  DE language remains selected. No native custom collection/nonempty draft claim.
- App boot metadata is unchanged: neither App nor HA restart was necessary.

## Documentation and boundaries

- Public DE/EN/FR docs record native qualification, stale-preview reload guidance
  and separate browser/server storage. IndexedDB and draft data are not included
  in HA backups. SVG is not a full editable-draft/undo backup.
- Larger131-icon/two-text drawing coverage belongs to isolated Sprint9335.
  Native JS/SVG exports were secured before changes, not re-exported afterward;
  byte-identical native post-checks apply to collection JSON only.
- No deleted-browser-store recovery, origin/profile migration, data-format
  conversion or HACS integration update is claimed. Both hosts finish17.
- Private evidence: source/backups/icon-studio-017-native-20261016.
  Public docs build and git diff checks pass; no runtime/version bump needed.
