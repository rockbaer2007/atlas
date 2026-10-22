# Sprint G2.5.9396 - Make project opening confirmation visible

2026-10-22. App 0.1.334, Editor 0.2.0-alpha.115. Only .68 is accessed;
.177 and the existing Runtime integration URL are untouched.

## Finding and scope

The user reports no response to Preview opening and a missing Back up and apply
button on the phone. Photos show zero phone sources and only ready status; the
tablet shows Project opened, the original script and a local draft, not a server
save. Read-only backend comparison confirms all eight server projects unchanged,
including the own conflict project at revision one. No concurrent save result
is claimed. The code puts confirmation after the entire draft overview, below
the mobile fold, with no ready status/focus/scroll feedback. Native desktop
opening worked. The user later reaches the preview and confirms apply worked
under the previous UI. A mobile fetch defect is therefore not asserted.

Put the preview directly after project actions/status and before drafts; add a
heading, labelled region, focus and scroll into view. All preview entry paths
(open/save, local recovery and file backup inspection) use this presentation.
Add DE/EN/FR loading, ready and missing-selection messages. Disable opening/save
preview actions while inspecting. Read-only project/list requests abort after
15 seconds and can be retried. Writes, explicit apply, workspace signature and
revision conflict checks stay unchanged. No automatic retry/write is introduced.

## Safety and evidence

Evidence: C:/Users/rockb/source/backups/atlas-project-open-feedback-0334-68-20261022.
Source/docs archives, backend snapshots, all eight projects, 11 selected files,
complete original desktop Editor export and 39 raw sources are retained.
Fresh encrypted full backup ffcc1aac, ATLAS 68 vor Öffnungsvorschau 0.1.334
2026-10-22, completes at 15:38 local, 143.15 MB. UI lists HA settings/history
2026.10.2, Share/SSL/Media, ATLAS 0.1.333, Get HACS 1.3.1 and Matter Server 9.2.0.
No full-archive PC download/restore is claimed. Existing mobile exports remain
under user control; no remote browser store is cleared or changed.

## Checks

The native own fixture bundles the exact candidate module with the product CSS.
Its synthetic transport refuses writes; it contains 40 in-memory source rows
and never accesses actual draft storage. At real container widths 320/390/768,
both confirmation actions remain within bounds and at least 44 pixels high;
the preview precedes the draft overview. Focus and scroll expose confirmation.
DE/EN/FR labels pass. Missing selection and HTTP 503 are visible; a hanging read
shows loading, aborts after 15 seconds, re-enables the action and successfully
opens on retry. These are controlled native fixture checks, not Android viewport
or actual-device keyboard qualification.

Syntax checks, pnpm build, 431 Home Assistant tests, 31 frontend tests and 43 App
tests pass. Both 523-file package mirrors match canonical sources. Source
055e64a5 and package e697250 are pushed. Save conflict and WLAN-loss qualification
on real devices remain pending; the guide is updated without changing the own
server project or sidebar configuration.

## Installed verification

The normal HA update installs 0.1.334 on .68. Served shared-projects.mjs and
app.bundle.js match reviewed source after line-ending normalization. Native
opening preview of the actual conflict project shows the ready message and
confirmation region before local drafts; it is entirely within the visible
viewport. Cancellation preserves the original complete Editor export. All 39
raw desktop sources remain byte-identical. Final backend checks preserve eight
projects, six plugins, 11 selected file hashes and connection/Terminal settings.
The original 27 trash entries remain; only the exact own two-file inspection
fixture moves to recoverable File Studio trash as entry 28. The ongoing mobile
project/guide/sidebar stay available, with the guide updated to 0.1.334.

Local docs build and the 198-page UIX example/link/language check pass. DE/EN/FR
documentation commit: 04ace4f. Real-device rechecking of the new position remains
pending; the user's successful prior apply does not qualify this new UI version.
Source CI 055e64a5 and documentation build/deployment pass. All three public
Card Editor locale pages return HTTP 200 and include 0.1.334.

After the complete mobile qualification, remove the remaining owned project,
guide/sidebar and retain the newest three full backups. Five temporarily remain:
ffcc1aac, dbc776c2, a0ca4a9e, fe84e19f, dfc0c05c. PC backups are outside retention.
