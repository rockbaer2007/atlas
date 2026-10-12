# ATLAS stabilization / Stabilisierung

Agreed sequence on 2026-10-12. Existing functions, installed plugins and user
settings must remain compatible. Work through one verified increment at a time.

## Arbeitspunkte

1. HA-Paketversionen und enthaltene Quellen vereinheitlichen, anschließend das
   Add-on-Repository prüfen und veröffentlichen.
2. Administration, HA-Verbindung, Card Editor, Speichern und erneutes Laden sowie
   HACS-Export als zusammenhängenden Ablauf prüfen.
3. „Problem melden“ prüfen: Berichtsvorschau und Ausschluss sensibler Daten.
4. Gefundene Fehler beheben, relevante Tests und Docker-Prüfung ausführen,
   öffentliche Dokumentation aktualisieren und den geprüften Stand veröffentlichen.

## Work items

1. Align HA package versions and source contents; verify and publish the add-on repository.
2. Verify Administration, HA connection, Card Editor, save/reload and HACS export end to end.
3. Verify Report problem, report preview and exclusion of sensitive data.
4. Fix findings, run relevant tests and Docker checks, update public documentation and publish.

## Backup before changes

`C:/Users/rockb/source/backups/atlas-20261012-213313` contains Git bundles and
working-tree ZIP files for ATLAS and its add-on repository, plus a manifest of
commit IDs and working-tree status. ZIP integrity was verified. The ATLAS ZIP
includes the two untracked local roadmap files. Dependency and generated build
directories are excluded. This is a source backup, not a backup of the running
Home Assistant installation or browser settings.

## Progress

- Item 1: completed (Sprint G2.5.9251). Both repository packages use 0.1.285
  and pass the 469-file source comparison. Configuration except the version is
  identical to the backup; standalone and HA images build and their runtime
  endpoints respond successfully. Publication is recorded in Git history.
- Items 2–4: pending. Tests performed during item 1 do not complete these items.
