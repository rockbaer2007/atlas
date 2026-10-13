# Sprint G2.5.9262 - Compact mobile grid and title controls

2026-10-13. HA app 0.1.291 / reference Card Editor 0.2.0-alpha.99.

## Change

Wrap the existing X/Y/zoom sliders in native details/summary. At embedded editor
widths up to 1180 px, start closed; at desktop width, show the sliders directly.
Only breakpoint changes reset the group's open state; language changes do not.
The group contains the original inputs and values. No persistence migration,
project edit or change to plugin settings is introduced by collapsing it.
Translate the group label in DE/EN/FR.

At tablet widths, show title input and equal-width action buttons in one row.
On phones, keep a full-width title input with two paired buttons below it.
Allow translated button text to wrap without overflow.

## Validation

Passed JavaScript syntax, build, 159 HA tests, two package tests and 469-file
package parity, HA Docker build and DE/EN/FR public documentation build.
Docker refuses to finish starting a test container twice; stop only the owned
waiting clients. No container is created, so full Docker E2E/restart checks
cannot run for this increment. No user containers or HA installation are stopped.

Instead, an isolated fresh Edge touch context checks the local editor at
360x800, 390x844, 768x1024 and 1024x1366 in DE/EN/FR: default closed state,
opening/closing, unchanged slider values, title row geometry, equal button
dimensions and no page overflow. A populated test card and a changed zoom value
survive toggling and reload; desktop width shows sliders directly again.
All 13 checkpoints pass. Fake Admin response only; no real credentials or
user browser profile. Evidence is retained outside Git at
`C:/Users/rockb/source/backups/atlas-mobile-controls-20261013`.
Physical tablet verification of the release remains pending.
