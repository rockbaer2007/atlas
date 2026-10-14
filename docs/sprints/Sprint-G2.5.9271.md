# Sprint G2.5.9271 - A5 renderer and theme verification

2026-10-14. HA app 0.1.296 / reference Card Editor alpha.102.

Back up ATLAS, add-on and documentation Git histories plus the user-owned
untracked roadmaps in `C:/Users/rockb/source/backups/atlas-a5-renderer-theme-20261014`.
Use a separate loopback fixture origin with fixture-only storage keys and no
Home Assistant credentials. Do not modify existing Admin settings, editor
projects, installed plugins or native HA installations.

The browser check reproduces two dark-theme defects:

- The generic dark status style overrides blocked/pending colors. Blocked
  has the same turquoise text and border as ready. Add specific dark blocked
  and pending rules without changing renderer APIs, data or state mapping.
- Expert field rows have white backgrounds while inheriting nearly white
  dark-theme text. Use existing theme variables for rows, borders and empty
  hints, and readable dark-theme delete icons. Geometry remains unchanged.

An isolated Chrome fixture uses the actual editor HTML, CSS and bundle with
36 synthetic fields across Entity, Button, Sensor, Thermostat, Bubble and
Mushroom Template previews. All 27 DE/EN/FR x light/dark/auto x ready/pending/
blocked combinations pass; colors remain distinct and all fields remain.
Auto follows simulated system preference change events in both directions.
Reload retains the selected language/theme and fields. Stored field objects
and surface size compare byte-for-byte before/after theme and locale changes.

Viewport checks at 1440x900, 900x1200, 1200x900 and 390x844 report 36 nonempty
field rectangles, zero pair overlaps and zero page horizontal overflow.
Field-row text contrast is above 16:1 in both themes; delete icon contrast is
above 6:1 in light and 8:1 in dark. No browser console errors are recorded.
Browser/layout/contrast evidence and screenshots are saved with the backup.

All 532 Renderer, 12 Theme and 162 Home Assistant tests pass. Workspace build,
demo JavaScript syntax, app-server/packaging checks and canonical package
synchronization are verified. Public DE/EN/FR documentation records the change.

Build `atlas:a5-theme-0.1.296` from the canonical HA package. A disposable,
network-isolated container starts both real surfaces and reports /health ok
and /app version 0.1.296. The served editor contains the corrected rules, and
its source SHA-256 matches the browser-tested source exactly. No production
volumes are mounted; remove only the labelled test container after checking
Docker health. The fixture server/browser are also stopped after screenshots.

Limits: these are synthetic editor previews, not actual native HA/HACS card
execution, real user-owned layouts, ARM64/native load or Safari compatibility.
System preference events are simulated; OS settings are unchanged. A5 remains
open for native and broader integration verification. No schema migration,
credential change or external plugin implementation is included.
