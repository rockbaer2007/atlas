# Sprint G2.5.9349 - Resumed isolated theme qualification

2026-10-17. App0.1.315 unchanged. Qualification completed with two open findings;
this is not a passing all-family CSS roundtrip or a runtime fix release.

## Recovery, backup and scope

- Browser control works after the Codex restart. Reused the existing isolated
  atlas-themes-20261017 container/volume, HA2026.10.1 on loopback4250 and own
  ATLAS on127.0.0.32:4176. No native Pi5/Proxmox access or changes.
- Existing full HA baseline tar, runtime copies and Git bundles retained.
  Another timestamped resume-before copy of runtime and stopped HA config was
  taken before continuing. Fixture-only credentials used; no secrets in output.
- Bubble3.4.2, Mushroom5.2.3, UIX8.4.0; no simultaneous Card-Mod qualification.
  Six native cards: inherited/overridden Core, Bubble and Mushroom.

## Actual Editor and rendering evidence

- Raw YAML imported through Paste YAML; own ATLAS Theme UI project saved using
  preview/Back up and apply, then opened again through the same UI. Six previous
  projects and the separately saved original raw-source project retained.
- Actual UI HACS ZIP downloaded, imported through Import HA card, then exported
  again. Both completed39611-byte ZIPs are byte-identical.112/112 readiness
  checks pass on the actual UI ZIP, without proving original CSS preservation.
- Raw JSON file also imported through the file chooser. Copied Expert output
  retains parent/Core/Mushroom UIX and all6cards, but lacks Bubble string CSS.
- Installed the unmodified UI-exported script and its matching EN/DE locales
  only in the own fixture. Native reference and generated Card displayed side
  by side. Browser read-only DOM/shadow-root computed styles and screenshots
  saved under private source/backups/atlas-themes-20261017.
- Default and custom themes in light/dark, return to custom light and full
  reload measured:6snapshots. Profile changes followed by dashboard navigation;
  no claim of testing changes on continuously mounted cards. Custom background/
  radius switch from rgb(243,247,251)/18px to rgb(23,35,50)/26px. Child-level
  Core/Mushroom fixed overrides remain rgb(237,221,230),3px,9px.
-308 assertions validate measured render equality, explicit expectations,
  expected negative cases, source preservation and original data. This count
  includes assertions confirming the failures, not308passing CSS cases.

## Two confirmed open findings

1. Normal YAML/JSON import drops Bubble string-valued styles. Its native fixed
   background,3pxborder and9pxradius disappear in the export in every tested
   theme. Direct raw-project server storage preserves the original source.
   Root cause candidate remains preserveHomeAssistantCardStyles accepting only
   record-valued styles; no runtime source changed in this increment.
2. Root-stack UIX is present in generated DEFAULT_CARD, but its custom property
   is absent on exported descendants. Equivalent fallback colors initially
   conceal the problem. A separate diagnostic changes only the custom theme
   accent to#07956d while primary stays#1475b8: Core/Mushroom native borders
   are rgb(7,149,109), exported borders rgb(20,117,184). Direct child-level
   UIX overrides work. Do not describe root inheritance as qualified.

## Preservation and completion

-27original non-index runtime files and all6original project entries compare
  exactly. Original source project still contains the full Bubble CSS. Only
  the additional own UI project and recoverable backup artifacts were added.
- DE/EN/FR Open-Source documentation and roadmap now distinguish rendering
  successes from both confirmed limitations; neither issue is marked fixed.
- Private UI proof, screenshots, original/normalized sources, completed ZIPs,
  own HA state and runtime snapshots retained for the next isolated fixes.
- Cold-state comparison also preserves all37original HA www files and the
  original ui-lovelace.yaml exactly. Both own browser tabs closed; own App and
  Docker fixture stopped, without removing their recoverable data.
- No package/version bump: documentation and qualification only. Relevant
  checks: automated qualification verifier and npm run docs:build; Git diff
  checks. Runtime build/tests are not rerun because runtime source is unchanged.
