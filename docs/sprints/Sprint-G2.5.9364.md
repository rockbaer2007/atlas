# Sprint G2.5.9364 - Native HACS literal-name roundtrip and HA rendering

2026-10-18. Qualification only; App stays 0.1.320, integration 0.1.306.
Only approved hosts 192.168.178.177 and 192.168.178.68 are contacted.

## Backup and preservation boundary

- Fresh complete encrypted HA backups: .177 a84e5539, 138.52 MB; .68 f9df37a6,
  139.71 MB. Native details confirm HA 2026.10.2 settings/history, SSL, media,
  share and Apps including ATLAS 0.1.320. Full archives remain on their hosts.
- Git bundles, file mirrors, fresh local Editor exports, source fixtures, actual
  downloaded ZIPs, extracted files, DOM observations and screenshots are in
  `C:/Users/rockb/source/backups/atlas-native-hacs-names-20261018`.
- Original local Editors are reimported, reloaded and compared exactly with
  pre-test exports, excluding createdAt. No original server project is written.

## New readiness finding

- Four actual JSON/YAML ZIP exports begin with an Entity card named empty string.
  All retain their eight original card entries and names, but report 110/112:
  package-title-present and import-summary-title-present fail despite an explicit
  package name. The native Editor report is reproduced on .177; all four archives
  reproduce through the same readiness implementation locally.
- The check uses the first card's display name instead of the existing package
  name. package-title-present uses trim(), so whitespace-only first names also
  fail that check (code inference; not a new native whitespace-first fixture).
- This is an open readiness/reporting defect, not loss of name data. No runtime
  fix or unrestricted empty-first HACS qualification is claimed in this sprint.

## Scoped positive qualification

- A named control Entity card precedes the same eight fixtures: empty string,
  one space, outer spaces around Literal name and outer tabs around Küche, each
  standalone and nested inside a visible screen Conditional.
- Both hosts export JSON and YAML HACS ZIPs through the actual Editor. User
  releases blocked browser downloads. Each actual chooser reimport passes112/112;
  output survives reload. All four reexported ZIPs are byte-identical, including
  all eight archive entries. Embedded card entries preserve original names and
  conditions. Existing grid column normalization is checked semantically, not
  misrepresented as an unnormalized root-object comparison.
- Two script resources and their EN/DE/FR locale files per host are loaded from
  the real ZIPs, byte-verified through File Studio, in a new own WWW test folder.
  No new HACS repository registration/installation is part of this test.
- Each own HA dashboard contains two native reference stacks and two exported
  scripts: 36 rendered Entity cards per host. Before/after reload, all72
  exported/native pairs match name text, title attribute, visible text, state
  and computed white-space: 144 captured card observations in total.
- Literal DOM name strings remain exact. HA's normal CSS visually collapses
  outer whitespace in both native and exported cards; empty names remain empty.
  Existing sun.sun is read only. No device commands or test states are created.

## Closure

- After explicit user confirmation, both own dashboards and four own script
  resources are deleted through HA UI. Own WWW folders move to File Studio
  trash. No original resource/dashboard is removed; backups remain available.
- Final comparisons pass: all396 pre-existing persistent files on .177 match;
  nine additional files belong solely to the new recoverable test-trash entry.
  All nine approved-scope files on .68 match. Original projects (seven each),
  plugins (six each), management/terminal settings, original trash entries and
  captured HA configuration are retained. No broader file access is granted.
- Both original local Editors match after reload. Own browser tabs are closed.
- DE/EN/FR docs record scoped results and the open title-reporting defect;
  docs build and git diff checks pass. User roadmaps/untracked work untouched.

Next: fix readiness title selection while preserving original Card names, then
retest the original empty-first packages. Network tests remain limited to .177/.68.
