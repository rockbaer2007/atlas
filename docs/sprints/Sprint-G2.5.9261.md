# Sprint G2.5.9261 - Compact tablet Card Editor palette

2026-10-13. HA app 0.1.290 / reference Card Editor 0.2.0-alpha.98.

## Change

The physical Android tablet shows full-width palette buttons and a long card
list above the editor. At embedded editor widths 521-1180 px, arrange actions
in two columns and cards side by side in a scrollable single-row window.
ResizeObserver measures the first two cards after render, language changes,
filter changes and resizing; cap the height for short landscape screens.
Phone and desktop layouts stay unchanged. The layout height is transient CSS,
not saved project data; no settings or storage migration is introduced.

The user also reports Terminal in the iPad simulator, MacBook Air simulator
and the named "Stream Deck" simulator OK. Agent observation confirms the
iPhone 18 Pro Hub and iPad Pro Card Editor with 27 live entities. These are
Chrome simulator checks, not physical Apple hardware or Safari verification.
The device referred to as "Stream Deck" is not independently identified.

## Validation

Passed JavaScript syntax check, build, 159 HA tests, two packaging tests,
469-file package parity and 26 Docker mobile E2E checkpoints with DE/EN/FR.
Extend responsive checks to
1024x1366, assert paired equal-width actions, paired cards, bounded row height
and scroll access to the last card. Existing project roundtrips and restart
preservation remain covered. Update public DE/EN/FR documentation and build it.
Physical tablet confirmation of the new release remains pending.

Desktop E2E passes all 16 checkpoints on repeat. The first desktop run times out
waiting for the transient JSON-import status after the resource scan replaces
it; no browser error is recorded. The complete mobile run and desktop rerun
pass JSON/HACS roundtrips and restart preservation. Public docs build passes.
