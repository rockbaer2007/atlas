# A5 Abschlussprüfung - 14.10.2026

Stand: HA-App 0.1.297, Framework 0.2.0-alpha.88. A5 ist als begrenzte
Stabilisierungs- und Verifikationsphase abgeschlossen. Das ist keine
Produktionsfreigabe und keine Zusage einer stabilen Plugin-API.

## Abgleich der vereinbarten Kriterien

| Kriterium | Nachweis | Bewertung / Grenze |
| --- | --- | --- |
| Größere Editor-Projekte | Sprints 9265, 9266, 9276 | 100/120 vorbereitete Felder, Bearbeitung und Roundtrip geprüft; vielfältige Nutzerprojekte fehlen. |
| Tatsächliches HA-Rendering | Sprints 9272-9274, 9277 | Core/Bubble/Mushroom auf Pi und VM, 120 native Instanzen; Bundle manuell installiert, keine HACS-Release-Verteilung geprüft. |
| Live-Updates | Sprints 9265-9268, 9278 | Ereignisreihenfolge, echte Pi-Statuswechsel und 40 native Zeit-Templates; ein gemeinsamer Sensor ersetzt keine vielfältige Entitätslast. |
| Fehler/Wiederverbindung | Sprints 9267, 9268, 9275, 9280 | Regressionen, LAN-Test, geschlossener Socket mit 24 Feldern und vom Benutzer bestätigte Drei-Minuten-Unterbrechungen; letztere ohne 100-Feld-Fixture oder Versuchstrace. |
| Leistung | Sprint 9279 | Native Core-/ATLAS-Containerproben vor/während/nach Last; keine Gesamtgeräte-, Browser- oder Langzeitmessung. |
| Renderer/Themes/Sprachen | Sprint 9271, 9276 | DE/EN/FR, Hell/Dunkel/Auto, vier Viewports und Reload geprüft; keine beliebige Theme-/Browser-/Card-Kombination. |
| Plugin-Lebenszyklus | Sprints 9269, 9270; aktuelle Regressionen | Installation, abgewiesenes Update, Austausch, Neustart, Deinstallation/Paket-Wiederherstellung mit isolierten Daten; keine Garantie aller externen Plugin-Datenformate. |
| Erhalt bestehender Daten | Sprints 9266-9280 | Frische native Original-/Admin-Exporte bis auf Zeitstempel identisch, sechs Plugins aktiv; keine Migration oder Live-Deinstallation externer Plugins. |

Die einzelnen Sprintdateien in `docs/sprints/` enthalten den jeweiligen Umfang,
Messmethoden und Grenzen. Synthetische Tests, native Agent-Prüfungen und
Benutzerbeobachtungen bleiben unterschiedliche Nachweisarten.

## Plugin-/API-Grenzen für den aktuellen Stand

| Ebene | Vorhandener Vertrag | Noch nicht zugesagt |
| --- | --- | --- |
| TypeScript Runtime | `RuntimePlugin` benötigt Manifest und `activate`; optionale `deactivate`/`dispose` werden Stop-/Dispose-Hooks. | Beliebige Webpakete automatisch als Runtime-Modul ausführen. |
| Katalog | Eindeutige IDs, Beschreibungen und Suche nach `extensionPoints`/`provides`; ursprüngliches Manifest im Aktivierungskontext. | Durch Deklarationen automatisch Services registrieren oder Zugriff gewähren. |
| Installierbare Webplugins | Zwei unterstützte Paketumschläge; Repository-Dateien serverseitig installieren und aktualisieren, bekannte Startpfade. | Runtime-Hooks für jede statische HTML-Seite oder eine allgemeine Versions-Kompatibilitätsgarantie. |
| Startstatus | Administration/Hub/direkter Start beachten den gespeicherten Aktivierungsstatus. | Deaktivierung als Zugriffssperre auf rohe Plugin-Assets. |
| Daten/Schlüssel | Administration verwaltet Geheimnisse; der Referenzeditor nutzt den bestehenden Session-Handoff, andere Plugins ihren freigegebenen Kontext. | Plugin-Metadaten als Sandbox oder Freigabe beliebiger Dateien/Geheimnisse. |
| Versionierung | Plugin-ID erhalten, sichtbare Paketänderungen versionieren; Format-/Importkompatibilität in Regressionen prüfen. | Eine stabile 1.0-API oder eine vollständige Host-/HA-Version-Matrix während Alpha. |

Quellen: `packages/runtime/src/RuntimePlugin.ts`, `RuntimePluginCatalog.ts`,
`RuntimePluginInstallPackage.ts`, die zugehörigen Tests und
`scripts/atlas-plugin-lifecycle.test.mjs`. Öffentliche Entwicklerdokumentation
in DE/EN/FR beschreibt dieselben Grenzen. Änderungen an diesen Verträgen müssen
Format-/Import-, Lebenszyklus- und Daten-Erhalt-Prüfungen durchlaufen; notwendige
Migrationen und Auswirkungen gehören in Versions-/Release-Hinweise.

## Abschlusschecks vom 14.10.2026

- Runtime: 55 Tests.
- Renderer: 532 Tests, einschließlich Routing/Mounts und API-Exporten.
- Theme: 12 Tests.
- Home Assistant: 163 Tests, einschließlich generiertem Expert-Script und Transport.
- App/Origin/Paket/Lebenszyklus: 11 Tests mit isoliertem Backend.

Insgesamt 773 ausgewählte Regressionen bestanden. Workspace-Build und
DE/EN/FR-Dokumentationsbuild bestanden; Git-Whitespace-Prüfung bestanden.
Frühere native Tests werden anhand ihrer gespeicherten Nachweise abgeglichen,
in dieser Abschlussprüfung nicht erneut ausgeführt. Docker-Paketierung bleibt
durch die vorherigen Docker-/Paketprüfungen belegt; kein neues Image erzeugt.
Die echten HA-Installationen werden in dieser Prüfung nicht verändert.

## Offene Folgequalifikation

Diese Punkte sind keine nachträglich bestandenen Tests und bleiben offen:

1. Unterschiedliche echte Nutzerlayouts, Entitäten, Custom Cards und Theme-Kombinationen.
2. Langzeit-/Speicherprofile und wiederholte instrumentierte Netzausfälle unter Projektlast.
3. Stabile Produktions-API, dokumentierte Versions-/Migrationspolitik und breitere Host-Kompatibilitätsmatrix.
4. HACS-Repository-/Release-Verteilung und vollständige Laufzeitprüfung exportierter Kartensprachen.

Als nächste vereinbarte Arbeitspriorität folgt A6: französische Dokumentation
vervollständigen und DE/EN/FR fachlich abgleichen. A7 bleibt der spätere
Linux/systemd- und native ATLAS-Frontend-Deploymentpfad.
