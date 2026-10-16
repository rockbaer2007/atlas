# Sprint G2.5.9338 - Native 36-card workflow on Proxmox and Pi 5

2026-10-16. Qualification only; ATLAS remains0.1.312, HA Core2026.10.1.
Proxmox first, then Pi5. No App, plugin or integration update performed.

## Safeguards

- Full-history ATLAS/docs Git bundles, copies of both untracked user roadmaps,
  persistent ATLAS mirrors/tars, selected HA files, original local Editor exports
  and structured evidence retained privately at
  source/backups/atlas-expert-36-native-20261016. No credentials published.
- Fresh local encrypted HA backups: VM f6128325,4.67GB,18:34CEST (HA/SSL/ATLAS,
  not all unrelated VM apps); Pi4b6fc210,135.77MB,19:14CEST (HA/SSL/all3apps).
  Full HA archives remain on their hosts; PC mirrors are not full HA backups.
- VM initially lacked space. User expressly approved deletion of ONLY older
  test backups a58a397d/50ee03a3; e047560a and other backups retained. Their full
  archives were not on PC; this boundary was disclosed before approval.

## Actual UI results

- Each own separate server project contains36fields:12Core entity,12Bubble
  state buttons and12Mushroom Template cards,4x2each across12columns/24rows,
  no overlaps. Existing passive sensors reused; no device service calls.
- Save through preview/confirmation, actual browser HACS ZIP export, import
  that completed downloaded ZIP, re-export, save revision2, reload and reopen
  own project: exact field/card comparisons pass on both hosts.
- Each host's two UI exports are byte-identical with EN/DE/FR selected:
  VM62983bytes SHA256
  55564e4febfe6fc4044245d940648576ef8ddb85871d2239566d3d028be4a732;
  Pi62534bytes SHA256
  24c72d88519ec411efd33063bfc77764e47da85b0e490bcafe0b04b9a254d157.
  Bundle readiness112/112, full fields/card/language manifest verified.
  Chrome releases performed by user; partial downloads never used as exports.
- HA shadow DOM confirms12of each real card type and zero hui-error-card.
  Rendering uses generated stacks, not identical editor pixel geometry.
- User restarted the VM to apply hardware changes. Existing Editor and HA
  card view recovered without our reload/manual connection and retained36cards.
  App start changed to16:57:45.654Z; HA reports12GBRAM and166.6GBtotal/52.6GBfree.
- User unplugged/reconnected Pi LAN after instructions for60seconds and confirmed
  no reload. Existing Editor connected with36fields; HA retained12of each card
  without errors. Exact outage duration/received frame count not instrumented.
  Earlier wrong-context/undefined-temp1 Console attempts closed no socket and
  are not counted as tests. Physical LAN test replaces that helper workflow.
- Original complete local Editor configurations restored through UI import
  and confirmation, then actual normal JSON exports compared: exact except
  export createdAt. Original empty local canvases restored, connection active.
- Both own dashboards/test cards removed through HA UI after explicit approval;
  original dashboard registry hashes match. Separate named server test projects
  and their safety snapshots retained. All current backups kept.

## Preservation and boundaries

- VM original218ATLASfiles and Pi222files exact, except projects index extended
  by the own new project. Original server project contents/revisions, six active
  plugins/shared management, terminal config, trash and history preserved.
  Final totals225VM/229Pi files; additions limited to own workspace/backups.
- Safe Administration controls retain original HA URLs, DE/dark, remember-token,
  auto-connect and approved roots. No raw token or browser storage extraction.
- Checked HA configuration/files preserved with one observed VM exception:
  existing resource3ac5b98cc4c047f59cc570dce64c9e8d retains its module/path
  /hacsfiles/hass-selfhst-icons/hass-selfhst-icons.js; only hacstag changes from
  103100560020261009 to103100560020261016 after reboot. All144resource records
  otherwise exact. This unrelated metadata is retained, not reverted.
- Native load is36rendered cards with passive existing sensors, not360synthetic
  changes from Sprint9337. Browser rendering runs in PC Chrome, not on ARM64.
  No CPU/RAM benchmark, duration test, arbitrary capacity or HACS upgrade claim.
  EN fallback language files unchanged; no translation adapter executed.
- DE/EN/FR Card Editor documentation updated together; documentation build and
  git diff checks pass. No runtime change, version bump or new code tests needed.
