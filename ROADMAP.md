# ATLAS Roadmap

Updated: 2026-10-22. Framework **0.2.0-alpha.89**, HA app **0.1.333**.

This is the current open ATLAS backlog. Completed work belongs in
[the sprint ledger](docs/sprints/) and Git history, not in this list.
The four stabilization items are closed; evidence and test boundaries are in
[the stabilization record](docs/deployment/ATLAS_STABILIZATION_2026_10.md).

## Agreed priorities / Vereinbarte nächste Schritte

### Verbindliche Testrichtlinie ab 18.10.2026

Für Netzwerk-, HA-, Browser-, Update- und Belastungstests ausschließlich
`192.168.178.177` und `192.168.178.68` verwenden. Keine Tests auf
Produktivsystemen oder anderen Adressen. Frühere Hostfreigaben und historische
Prüfberichte gelten nicht als aktuelle Erlaubnis. Vor Änderungen Backup erstellen
und vorhandene Einstellungen, Dateien, Projekte und Plugins erhalten.
Lokale statische Prüfungen und Unit-Tests ohne Zugriff auf andere Systeme
bleiben möglich. Diese Richtlinie hat Vorrang vor den älteren Testplänen unten.

Nach jedem abgeschlossenen Test auf .177/.68 jeweils nur drei vollständige
HA-Backups behalten, bevorzugt die drei neuesten erfolgreich abgeschlossenen
Vollsicherungen. Alle Backup-Arten ungefiltert kontrollieren; endgültige
Browser-Löschungen weiterhin konkret bestätigen lassen. PC-Sicherungen bleiben
von dieser Aufbewahrungsgrenze ausgenommen.

### Laufend: Mobilprüfung der Entwurfsübersicht auf .68

App 0.1.333 ergänzt einen sichtbaren Button **Suchen** und Enter neben der
laufenden Filterung. Bei null lokalen Quellen zuerst ein Serverprojekt öffnen
und gesichert übernehmen; die Suche lädt keine Serverprojekte. Die tatsächliche
Mobilprüfung bleibt offen. Änderung und Prüfgrenzen: [Sprint9393](docs/sprints/Sprint-G2.5.9393.md).

Die Prüfung in Chrome auf Handy und Tablet ist vorbereitet, noch nicht bestanden.
Frisches Vollbackup, PC-Quellen-/Dateisicherungen und zwei eigene Serverprojekte
MOB68 A/B sowie eine temporäre Startseite mit lokalem Sicherungsdownload liegen
bereit. Auf jedem Gerät zuerst eigene lokale Quellen und die aktuelle vollständige
Editor-Konfiguration exportieren, danach die beiden Testprojekte in getrennten
Tabs öffnen. Suche, Auswahl, Hoch-/Querformat mit Tastatur und ausdrückliche
Wiederherstellung nach Neuladen prüfen. .177 bleibt unverändert. Testobjekte bis
zur Rückmeldung erhalten; danach gezielt bereinigen und drei Vollbackups behalten.
Status und Grenzen: [Sprint9392](docs/sprints/Sprint-G2.5.9392.md).

### Zuletzt abgeschlossen: durchsuchbare Entwurfsübersicht

App 0.1.332 ergänzt Projekt-/Scriptnamen, Speicherzeit, Quellenkennung und eine
ehrliche Zuordnung (dieser Tab oder anderer/früherer Tab). Mehrbegriffs-Suche,
Trefferzahl, leere Treffer und die Auswahl nach Filterende sind in DE/EN/FR auf
.68 geprüft, ebenso gleichnamige Projekte in zwei Tabs und deren Wiederherstellung
nach Neuladen. Alle 32 vorhandenen Quellen bleiben bytegleich; Originaleditoren,
Bestandsdaten und drei Vollbackups sind erhalten. .177 unverändert. Die Chrome-
Viewport-Vorgabe greift nicht; echte schmale/mobile Darstellung bleibt offen.
Details: [Sprint9391](docs/sprints/Sprint-G2.5.9391.md).

### Zuletzt abgeschlossen: Dateiimporte als getrennte Tab-Entwürfe sichern

Der echte Browserabbruch während eines erneuten Dateiimports ist auf .68 mit
App 0.1.331 bestanden: nach dem lokalen Datensatzschreiben, vor dem Tab-Zeiger.
Nach Sitzungswiederherstellung wird der neuere A-Entwurf ausdrücklich angeboten;
Vorschau-Abbrechen ändert nichts. Neuer A-Stand, Vorgänger A und unabhängiger B-
Stand lassen sich mit identischen Inhalten und Einstellungen wiederherstellen;
die Übernahme wählt die erste Karte aus. Alle 20 vorherigen Quellen im Testprofil
bleiben bytegleich, Originaleditoren und globale Arbeitsfläche sind hergestellt.
Eigene Testdateien liegen im Papierkorb, drei Vollbackups bleiben auf .68; .177
unverändert. Kein Abbruch innerhalb der atomaren Storage-Operation und keine
Stromausfallprüfung. Details: [Sprint9390](docs/sprints/Sprint-G2.5.9390.md).

Der Profilwechseltest mit App 0.1.330 auf .68 findet eine Lücke im normalen
Import einer Editor-Gesamtkonfiguration (JSON, Schaltfläche Import), ohne zuvor
geöffnetes gemeinsames Projekt. Beide Dateien werden im frischen Chrome-Profil
zunächst vollständig übernommen. Es entstehen aber weder eigene Tab-Entwürfe
noch Tab-Zeiger. Nach Neuladen zeigen beide Tabs den zuletzt importierten Stand;
auch die umgekehrte Importreihenfolge bestätigt dies. Die getrennten Quelldateien
bleiben vollständig und stellen den jeweiligen Stand wieder her.

App 0.1.331 nimmt bestätigte Gesamtkonfigurations-Importe in die getrennte lokale
Entwurfssicherung auf. Jeder erneute Dateiimport erzeugt eine neue Quelle und
erhält den Vorgänger. Nach Neuladen wird die eigene Quelle vorausgewählt;
Prüfung und gesicherte Übernahme bleiben ausdrücklich, die globale Profil-
Arbeitsfläche kann weiter den letzten Import zeigen. Der ursprüngliche Befund
steht in [Sprint9388](docs/sprints/Sprint-G2.5.9388.md).

Update und native Wiederholungsprüfung auf .68 bestehen: ursprüngliche A/B-
Dateien, umgekehrte Reihenfolge, erneuter gleicher Import, vollständige Exporte
vor/nach Wiederherstellung, Abbrechen und ungültige Datei sowie blockierte lokale
und Sitzungsablage mit sicheren Folgeversuchen. Alle 48 alten Quellen sind
bytegleich erhalten, Bestandsdaten und Editor-Ausgangsstände wiederhergestellt,
eigene Testdateien bereinigt und drei Vollbackups behalten. .177 unverändert.
Details: [Sprint9389](docs/sprints/Sprint-G2.5.9389.md). Keine neue HACS-Qualifikation.

### Zuletzt abgeschlossen: getrennte Entwürfe nach Browserabbruch

App 0.1.328 behebt die gemeinsame Entwurfsablage. Auf .68 bestehen getrennte
Entwürfe nach Tab-Neuladen, explizite Wiederherstellung eines geschlossenen
Tabs und lokale Änderungen während eines echten App-Ausfalls. Server-Konflikte
bleiben gesperrt. Der alte globale Entwurf bleibt lesbar; Wiederherstellungsquellen
werden nicht automatisch gelöscht. Details: [Sprint9380](docs/sprints/Sprint-G2.5.9380.md).

Der vollständige Chrome-Neustart mit Sitzungswiederherstellung ist auf .68
bestanden: beide Tab-Zeiger bleiben getrennt, vollständige Wiederherstellungen
entsprechen den Exporten, manuelle Quellenwahl bleibt möglich. Siehe
[Sprint9381](docs/sprints/Sprint-G2.5.9381.md).

Auch das erzwungene Ende aller Chrome-Prozesse und die anschließende
Sitzungswiederherstellung bestehen auf .68: getrennte Tab-Zeiger, zwei vollständige
Entwürfe mit unterschiedlichen Kartentiteln und vier unveränderte ältere Quellen.
Details und Grenzen: [Sprint9382](docs/sprints/Sprint-G2.5.9382.md).
Der Test beendet einen Browser nach abgeschlossener lokaler Sicherung, nicht
während eines Schreibvorgangs; Stromausfall und gelöschter Browserspeicher sind
damit nicht geprüft. Geräteaustausch benötigt weiter einen separaten Export.
HA-Vollbackups sichern keine lokalen Browserentwürfe.

Der anschließende Schreibabbruch ist ebenfalls auf .68 geprüft: Chrome wird
innerhalb der lokalen Sicherung nach dem Datensatzschreiben und vor der
Aktualisierung des Tab-Zeigers beendet. Der vollständige neue Entwurf bleibt
manuell auswählbar; vorausgewählt bleibt der zuletzt bestätigte Vorgänger.
Tab B und acht ältere Quellen sind unverändert. Eine eigene Testinstrumentierung
markiert genau diese Grenze; die installierten App-Dateien bleiben unverändert.
Kein Abbruch innerhalb des atomaren nativen Speicheraufrufs und kein
Stromausfall-/Datenträgertest. Siehe [Sprint9383](docs/sprints/Sprint-G2.5.9383.md).

App 0.1.329 schließt die dabei sichtbare Erkennungslücke: Eine vor dem Schreiben
tabgebunden gespeicherte Absicht erkennt beim Neuladen den exakt passenden
Nachfolger und bietet Vorschau plus gesicherte Übernahme in DE/EN/FR an.
Keine automatische Übernahme, keine Ableitung aus fremden Namen/Zeitstempeln.
Update und gezielter Schreibabbruch auf .68 bestehen samt Abbrechen,
Wiederherstellung, fremdem neuerem Entwurf und 13 unveränderten älteren Quellen.
Details und Grenzen: [Sprint9384](docs/sprints/Sprint-G2.5.9384.md).

### Zuletzt abgeschlossen: Fehler der Sitzungsablage sichtbar melden

Die Browserablagen-Prüfung mit unveränderter App 0.1.329 auf .68 ist abgeschlossen:
echte lokale und Sitzungs-Quota sowie gezielt blockierte Lese-/Schreibzugriffe
und Storage-Getter. Lokale Schreibfehler zeigen den Exporthinweis; Entwürfe und
PC-Wiederherstellung bleiben erhalten. Alle 20 bestehenden Quellen sind bytegleich.
Details: [Sprint9385](docs/sprints/Sprint-G2.5.9385.md).

App 0.1.330 unterscheidet jetzt lokale Schreibfehler von einer nicht bestätigten
Tab-Wiederherstellungszuordnung. Volle oder blockierte Sitzungsablage zeigt einen
eigenen DE/EN/FR-Hinweis nach erfolgreichem lokalen Speichern. Auch ein gesperrter
sessionStorage-Getter verhindert lokale Sicherung nicht mehr. Export bleibt möglich;
Sprachwechsel und Projektlisten-Aktualisierung erhalten die Warnung. Erst eine
vollständig bestätigte Folgesicherung entfernt sie. Keine automatische Quellenwahl.
Die native Prüfung auf .68 besteht mit echten Quota-Grenzen, blockierten Methoden
und Getter, manueller Wiederherstellung und lokalem Fehler-Vorrang. Alle 31 alten
Quellen bleiben bytegleich; Originaleditoren und Bestandsdaten sind wiederhergestellt,
Testobjekte bereinigt und drei Vollbackups erhalten. .177 bleibt unangetastet.
Details und Grenzen: [Sprint9386](docs/sprints/Sprint-G2.5.9386.md).
Keine allgemeine Browser-/Datenträgerfehlerfreigabe.

Auch die Kombination aus zwei Tabs, blockierter Sitzungsablage und einem echten
HA-Verbindungsabbruch besteht auf .68 mit unveränderter App 0.1.330. Während des
HA-Neustarts bleiben unterschiedliche lokale Entwürfe editier- und exportierbar;
beide Tabs verbinden sich automatisch wieder. Nach Neuladen unter weiter
blockierter Sitzung erfolgt keine automatische Quellenübernahme. Die ausdrücklich
gewählten Wiederherstellungen stimmen vollständig mit den jeweiligen Ausfall-
Exporten überein, abgesehen vom Exportzeitpunkt. Nach bestätigter Folgesicherung
bleiben auch die Tab-Zeiger beim Neuladen getrennt. Alle 40 vorherigen Quellen
und Bestandsdaten sind erhalten; Originaleditoren wiederhergestellt, Testobjekte
bereinigt und drei Vollbackups behalten. .177 unverändert. Kein WLAN-Ausfall oder
Browser-Prozessabbruch in diesem Lauf. Siehe [Sprint9387](docs/sprints/Sprint-G2.5.9387.md).

### Zuletzt abgeschlossen: begrenzter und abbrechbarer HACS-Import

App 0.1.327 prüft vor dem Lesen maximal 32 MiB ZIP-Dateigröße. Das Inventar ist
vor CRC-Arbeit auf 2.048 Einträge, 8 MiB pro Eintrag, 24 MiB Gesamtinhalt und
1.024 UTF-8-Bytes pro Pfad begrenzt. Ein eigener Worker ist während Lesen und
Prüfen terminierbar; ein 15-Sekunden-Prüfwächter beendet hängende Aufträge.
Ohne Worker gibt es keinen synchronen Ersatz. Der Editor wird erst nach
ausdrücklicher Übernahme geändert. Abbrechen verwirft auch fertige Ergebnisse;
dieselbe Datei ist erneut auswählbar, die Abbrechen-Schaltfläche bleibt stehen.

Alle 431 Pakettests, Workspace-Build und Paketabgleich bestehen. Nach frischen
Vollbackups sind beide Testhosts auf 0.1.327 geprüft: 20 Grenzfälle, sechs
Abbrüche während Lesen/Prüfen beziehungsweise nach Ergebnis, zwei gleiche
Datei-Wiederholungen und zwei ausdrückliche Übernahmen. Vollständige
Originaleditoren und erfasste Bestandsdaten bleiben erhalten. Siehe
[Sprint9373](docs/sprints/Sprint-G2.5.9373.md) für Grenzen und Belege.

### Zuletzt abgeschlossen: HACS-Import unter wiederholter Last

Mit unveränderter App 0.1.327 und HA 2026.10.2 auf .177/.68 sind rund
25 Minuten mit je 60 Serienübernahmen plus zwei echten HACS-Rückimporten
geprüft. Die Projekte enthalten 36 Editorfelder mit 360 beziehungsweise 720
verschachtelten Core-/Bubble-/Mushroom-Karten. Insgesamt 238 Abbrüche während
Lesen, Prüfung und nach fertiger Vorschau erhalten den jeweils geladenen Entwurf;
116 gleiche Datei-Wiederholungen bestehen. Vier HACS-Rundläufe sind bytegleich.
Auch die vollständige Prüfung eines gültigen Pakets mit 24 MiB Gesamtinhalt
und je drei Neuladetests bestehen. Originaleditoren und erfasste Bestandsdaten
sind wiederhergestellt beziehungsweise unverändert. Siehe
[Sprint9374](docs/sprints/Sprint-G2.5.9374.md) für Belege und Messgrenzen.

Windows-Chrome-Gesamtprozesswerte sind keine isolierte ATLAS-Speichermessung
und kein Nachweis von Leckfreiheit. ARM64-Browserleistung und Langzeitbetrieb
über diesen begrenzten Lauf bleiben offen.

### Zuletzt abgeschlossen: HA-Darstellung großer exportierter Projekte

Mit App 0.1.327 und HA 2026.10.2 auf .177/.68 sind die exportierten 360-/720-
Karten-Projekte sowie eigene dynamische Varianten gegen native Referenzkarten
geprüft. Card-Mod 4.2.1 und UIX 8.4.0 werden ausschließlich getrennt geladen.
UIX verarbeitet dabei sowohl vorhandene `card_mod`-Blöcke als auch native
`uix`-Stile. Hell/Dunkel, CSS-Vererbung, Mushroom-Jinja für Text/Symbol/Farbe
und acht WebSocket-Abbrüche mit automatischer Wiederverbindung bestehen.
62 abgeschlossene Aufnahmen enthalten 33.120 Kartenvergleiche; während des
Tests werden keine Originaleditoren geöffnet oder verändert. Siehe
[Sprint9375](docs/sprints/Sprint-G2.5.9375.md) für Datenabgleich und Messgrenzen.

### Zuletzt abgeschlossen: gestufter Tablet-Test

Auf .177/.68 wurden nach frischen Vollbackups eigene Browserchecks und separate
temporäre Dashboards mit Start, 12, 360 und 720 Karten bereitgestellt. Die PC-Vorprüfung
zählt alle Karten ohne Fehler und prüft Theme/Zustandswechsel sowie Wiederverbindung.
Vorhandene Editoren, Projekte, Plugins und erfasste Bestandsdateien bleiben erhalten.
Card-Mod läuft allein; eine neue Tablet-UIX-Prüfung ist nicht enthalten.

Der Nutzer bestätigt 12/360 Karten sowie 720 Karten auf beiden Hosts samt
Theme-Wechsel und Wiederverbindung auf Samsung Galaxy Tab A6, Android 11 /
LineageOS, Chrome Mobile 155. Nach Stoppen anderer Apps reagiert der Browser
flüssig. Dies ist eine funktionale Nutzerrückmeldung, keine FPS-/Speichermessung
oder Langzeitqualifikation; einzelne Hoch-/Querformatdetails sind nicht belegt.
Eigene Testobjekte sind bereinigt, WWW-Dateien im wiederherstellbaren Papierkorb,
Bestandsdaten unverändert und je drei Vollbackups erhalten. Stream Deck bleibt
unverändert. Ergebnis und Grenzen: [Sprint9376](docs/sprints/Sprint-G2.5.9376.md).

### Zuletzt abgeschlossen: 60-Minuten-Tablet-Dauertest mit UIX

Der Nutzer bestätigt je 60 Minuten mit 720 Karten auf .177 und .68 samt
Theme-Wechsel und Wiederverbindung: Galaxy Tab A6, Android 11 / LineageOS,
Chrome Mobile 155. UIX 8.4.0 läuft allein, ohne geladenes Card-Mod-Modul.
Eigene Testobjekte und temporäres UIX sind entfernt, WWW-Dateien im
wiederherstellbaren Papierkorb. Bestandsvergleich bestanden; je drei Vollbackups
bleiben erhalten. Die funktionale Nutzerrückmeldung ersetzt keine unabhängigen
FPS-/Speichermessungen oder einen Nachweis von Leckfreiheit.
Siehe [Sprint9377](docs/sprints/Sprint-G2.5.9377.md).

### Historischer Größenbefund: App 0.1.324

Die Größenqualifikation mit unveränderter App 0.1.324 auf .177/.68 und HA
2026.10.2 ist abgeschlossen: 24 echte Dateiauswahlen, 16 gültige Übernahmen
mit 112/112 und acht Ablehnungen. Bis zu 30.008 Dateien, 64 MiB Zusatzinhalt
und 16 MiB README-Text werden angenommen. Deflate mit 128 MiB deklariertem
Inhalt, eine fast 4-GiB-Eintragsdeklaration und abgeschnittene Archive werden
abgewiesen. Die Kompressionsablehnung ist kein Größenlimit.

Damals fehlten feste Archiv-/Eintrags-/Gesamtgrößenlimits vor der teuren Verarbeitung
sowie eine bedienbare, zuverlässig abbrechbare Prüfung ohne blockierten UI-Thread.
Der damalige Handler las zunächst die ganze Datei und prüfte im UI-Thread.
Diese Lücke ist mit dem oben beschriebenen Worker-Ablauf geschlossen.
Neuladen direkt nach Dateiauswahl erhält in beiden beobachteten Versuchen den
Originalentwurf, qualifiziert aber keinen gezielten Abbruch während laufender
CRC-/JSON-Arbeit. Keine allgemeine Last- oder ARM64-Browserfreigabe behaupten.
Vollständige Originaleditoren und erfasste Bestandsdaten sind erhalten; siehe
[Sprint9372](docs/sprints/Sprint-G2.5.9372.md). Tests weiterhin nur .177/.68,
vorher Backup und danach je drei Vollbackups.

### Zuletzt abgeschlossen: Mehrdeutige HACS-Pakete und Scriptidentitäten sperren

Die Importlücken aus App 0.1.323 sind in 0.1.324 geschlossen. Reader und tatsächliche
Editorübernahme verlangen vollständige Freigabe; mehrere Projekte/Scripts werden
vor der Auswahl gesperrt, alle Scriptidentitäten abgeglichen. Nach Vollbackups
bestehen Update und 60 echte Importe auf .177/.68 mit HA 2026.10.2: 52 korrekte
Ablehnungen, acht gültige Kontrollen, alle 14 früheren Fehlübernahmen abgewiesen.
Originaleditoren und geprüfte Bestandsdaten bleiben erhalten. 418 Pakettests,
darunter 40 neue Handler-/Identitätsregressionen, bestehen. Siehe
[Sprint9371](docs/sprints/Sprint-G2.5.9371.md); der historische Negativbefund und
seine Protokollgrenzen bleiben in [Sprint9370](docs/sprints/Sprint-G2.5.9370.md)
erhalten. Weiterer offener Produktumfang steht unten. Tests nur .177/.68,
vorher Backup und anschließend je drei Vollbackups.

### Zuletzt abgeschlossen: ZIP-Integrität und präzise Importdiagnose

Die CRC-Lücke aus App 0.1.321 ist mit 0.1.322 geschlossen; siehe
[Sprint9368](docs/sprints/Sprint-G2.5.9368.md). App 0.1.323 beseitigt die
irreführenden Dateifehlt-Folgehinweise bei verworfenem ZIP-Inventar. Die ZIP-
Ursache blockiert zuerst; abhängige Prüfungen bleiben nicht geprüft. Tatsächlich
fehlende Dateien in verifizierten ZIPs bleiben Fehler. Native Updates und alle
64 Paketfälle auf .177/.68 mit HA 2026.10.2 bestehen: 60 korrekte Ablehnungen,
vier gültige JSON/YAML-Kontrollen mit 112/112, 26 unverifizierbare Archive ohne
erfundene Dateifehler. Originaleditoren und geprüfte Bestandsdaten sind erhalten;
378 Pakettests und vier lokale bytegleiche Archiv-Rundläufe bestehen. Siehe
[Sprint9369](docs/sprints/Sprint-G2.5.9369.md). Beide Korrekturen sind abgeschlossen;
der weitere offene Produktumfang steht unten. CRC32 ist keine Signatur.

### Letzte abgeschlossene Qualifikation: App 0.1.321 und HACS-Titelprüfung (18.10.2026)

Die erweiterte Conditional-Qualifikation ist abgeschlossen; Ergebnisse und
Grenzen stehen in [Sprint9357](docs/sprints/Sprint-G2.5.9357.md).
Die Markdown-Vorprüflücke ist in App 0.1.318 lokal korrigiert und durch
Regressionstests abgesichert; siehe [Sprint9358](docs/sprints/Sprint-G2.5.9358.md).
Das Update und die Markdown-Ablehnung auf .177/.68 sind nach frischen Sicherungen
geprüft; siehe [Sprint9359](docs/sprints/Sprint-G2.5.9359.md). Keine vollständige
Einzelkarten-Freigabe: Der tatsächliche Editorimport nimmt einzelne Conditional-
Karten an, verliert aber deren Bedingungen; bei einzelnen Entity-Karten wird
der eigene Name ersetzt. Auf beiden Hosts mit JSON/YAML reproduziert.
Beide Verluste sind im Editor-Übernahmepfad mit App 0.1.319 lokal korrigiert und
durch Tests des tatsächlichen Editor-Codes abgesichert; siehe
[Sprint9360](docs/sprints/Sprint-G2.5.9360.md). Das Update auf .177/.68 ist nach
Vollsicherungen geprüft: Bedingungen und normale eigene Namen bleiben über
Datei-/Einfügeimport, Paketexport/-rückimport und Neuladen erhalten; siehe
[Sprint9361](docs/sprints/Sprint-G2.5.9361.md). Bestandsdaten sind unverändert.
Die Parser-Normalisierung leerer Entity-Namen und äußerer Leerzeichen ist mit
App 0.1.320 lokal korrigiert; 37 neue Quellvergleiche und insgesamt 296 Pakettests
bestehen, siehe [Sprint9362](docs/sprints/Sprint-G2.5.9362.md). Das native Update
auf .177/.68 ist nach Vollsicherungen bestanden: 64 Importfälle, 128 quellgetreue
Codeproben und 16 echte Card-Paket-Rundläufe samt Neuladen; siehe
[Sprint9363](docs/sprints/Sprint-G2.5.9363.md). Beide Hosts liefen danach mit 0.1.320,
Bestandsdaten und ursprüngliche lokale Editorstände sind erhalten. Der native
HACS-/HA-Test mit benannter Kontrollkarte davor besteht: vier bytegleiche
JSON/YAML-ZIP-Rundläufe mit 112/112 und 72 passende Export-/Referenzpaare vor/nach
Neuladen; siehe [Sprint9364](docs/sprints/Sprint-G2.5.9364.md).
Der dabei gefundene Titelprüfungsfehler ist mit App 0.1.321 lokal korrigiert:
Beide Prüfungen verwenden den Paketnamen statt des ersten Anzeigenamens.
Die acht gesicherten Original-/Kontrollpakete bestehen unverändert mit 112/112
und bytegleichen Rückexporten; 324 Pakettests bestehen. Siehe
[Sprint9365](docs/sprints/Sprint-G2.5.9365.md). Das native Update auf .177/.68
ist nach frischen Vollsicherungen bestanden; beide Hosts laufen mit 0.1.321 und
HA 2026.10.2. Die vier ursprünglichen JSON/YAML-Fehler-ZIPs ohne Kontrollkarte
bestehen im echten Editor mit jeweils 112/112 und bytegleichen Rückexporten.
Namen/Bedingungen bleiben nach Import und Neuladen exakt, Bestandsdaten und beide
ursprünglichen lokalen Editorstände unverändert. Siehe
[Sprint9366](docs/sprints/Sprint-G2.5.9366.md). Dieser Update-/Titelprüfschritt ist
abgeschlossen; weitere Qualifikation bleibt auf .177/.68 beschränkt und richtet
sich nach dem unten dokumentierten offenen Produktumfang.
Bereits verlorene Inhalte aus Originalquelle oder Sicherung neu importieren.

App0.1.314 aligns YAML/JSON HACS readiness with the supported export/import
formats. Both isolated browser roundtrips pass 112/112 checks and byte-identical
re-export with template preservation. See [Sprint9343](docs/sprints/Sprint-G2.5.9343.md).
Pi 5 and Proxmox remain unchanged at the previously qualified App0.1.313.
App0.1.315 fixes imported card_mod/uix/uix_style preservation in structured
card data, YAML/JSON, HACS packages and generated scripts, including structural
UIX export conversion and exact style ownership. Isolated qualification and
limits are in [Sprint9344](docs/sprints/Sprint-G2.5.9344.md).
The native App0.1.313 -> 0.1.315 update now also passes on Proxmox and Pi5
after fresh backups: YAML/Card-Mod and JSON/UIX export/re-import/re-export
achieve112/112 checks and byte-identical archives, preserving original data,
projects, plugins, trash/history and complete local Editor configurations.
See [Sprint9345](docs/sprints/Sprint-G2.5.9345.md).
Actual CSS rendering now passes in separate isolated HA2026.10.1 instances
with Mushroom5.2.3 and Card-Mod4.2.1 / UIX8.4.0: generated scripts match native
reference cards for dynamic CSS, current shadow selectors and UIX radii.
The check exposes configuration limits: CSS templates require config.entity,
old Mushroom selectors need reviewing, uix_style is preserved but not executed,
and UIX prefers uix over card_mod. See [Sprint9346](docs/sprints/Sprint-G2.5.9346.md).
Native CSS qualification now also passes after fresh backups on Proxmox and
Pi5: both Card-Mod4.2.1 and UIX8.4.0, each tested separately with App0.1.315,
HA2026.10.1 and Mushroom5.2.3. Export/native pairs match in909computed-style
checks including natural Jinja color changes and reload. Original data and
extension configuration are restored; see [Sprint9347](docs/sprints/Sprint-G2.5.9347.md).
App 0.1.316 now fixes Bubble string CSS import and root-stack UIX inheritance.
The same isolated HA 2026.10.1 fixture passes YAML/JSON and actual HACS UI
roundtrip with byte-identical ZIPs, 112/112 readiness checks, and 180 computed-CSS
comparisons across light/dark/reload. Native and exported parent accents now
match even when distinct from fallback colors. Existing data and projects stay
unchanged; old lost CSS requires the original source and existing scripts must
be regenerated. See [Sprint9350](docs/sprints/Sprint-G2.5.9350.md). Findings
and earlier negative evidence remain in [Sprint9349](docs/sprints/Sprint-G2.5.9349.md).
The native 0.1.315 -> 0.1.316 update now also passes on Proxmox and Pi 5 after
fresh HA backups: 240 additional computed-CSS comparisons including reload,
YAML/JSON style preservation and actual HACS UI roundtrips with byte-identical
archives and 112/112 readiness checks per host. Original local Editor states,
files, projects, plugins, trash and history are preserved. Three resource removals
made by the user on Proxmox were explicitly confirmed and retained. Owned test
dashboards/resources and temporary Pi UIX were removed after confirmation.
See [Sprint9351](docs/sprints/Sprint-G2.5.9351.md).
In-place light/dark theme switches now also pass in two isolated HA 2026.10.1
instances, separately using Card-Mod 4.2.1 and UIX 8.4.0 with Bubble 3.4.2 and
Mushroom 5.2.3. Seven transitions per engine cover custom/default themes,
960 computed-CSS comparisons and stable document plus all Card identities.
Fixed overrides stay fixed; inherited colors/radii follow HA's live theme mode.
Original isolated data remains byte-exact; native hosts were untouched. See
[Sprint9352](docs/sprints/Sprint-G2.5.9352.md).
The same live sequence now also passes on Proxmox and Pi 5 after fresh HA
backups, separately for Card-Mod 4.2.1 and UIX 8.4.0: 1,920 computed-CSS
comparisons, 28 transitions and stable Card/document identities. Original themes
and extension configuration are restored; owned test artifacts are cleaned up.
See [Sprint9353](docs/sprints/Sprint-G2.5.9353.md). Broader real user projects,
themes and further HA/styling versions remain separate qualification scopes.

App 0.1.317 fixes the conditional import defect found in
[Sprint9354](docs/sprints/Sprint-G2.5.9354.md). Complete condition data, including
numeric bounds, state lists and logical children, survives YAML/JSON and HACS
roundtrips. Missing/invalid numeric bounds now block import and package readiness.
The same isolated combined project now passes actual UI save/reopen, byte-equal
HACS ZIP re-export, dynamic Jinja text/icons/colors, conditional hide/show,
eight live theme transitions and 972 native/export CSS comparisons. Both Editors
reconnect automatically after isolated HA shutdown/start, with fresh template
updates and no page reload. Original data is preserved. See
[Sprint9355](docs/sprints/Sprint-G2.5.9355.md). Native 0.1.317 qualification on
Proxmox/Pi5 now also passes after fresh backups: actual HACS UI roundtrips,
Conditional/Jinja, live themes, 756 CSS comparisons and automatic connection
after HA Core restarts. Original data and local Editor configurations are
preserved; owned artifacts cleaned up. Scope and the unsampled brief Pi
connection interval: [Sprint9356](docs/sprints/Sprint-G2.5.9356.md).
Broader real user projects and further HA/styling versions remain open scopes.

Agreed on 2026-10-13. Preserve existing settings, encrypted credentials,
projects and installed plugins throughout future work.

| ID | Open work | Abschlusskriterium |
| --- | --- | --- |
| A7 | Qualify further HA versions and future data-format conversions when required. | Bestehende Einstellungen, Projekte und Plugins bei Versionsmigrationen erhalten. |

**A7 Linux/systemd is implemented and verified on Debian 12 amd64 LXC and
native Raspberry Pi OS / Debian 13 aarch64 on Pi 4.**
Installation, real update, rollback, backup, restart and recovery after an
unhealthy update preserve configuration, identity and plugin/project fixtures.
Evidence and Linux host limits are in
[Sprint G2.5.9283](docs/sprints/Sprint-G2.5.9283.md).
The native Pi 4 check covers real 0.1.303 -> 0.1.304 update/rollback,
backup/restart, automatic unhealthy-update recovery and native PTY execution.
See [Sprint G2.5.9307](docs/sprints/Sprint-G2.5.9307.md) for preservation and
backup boundaries; further distributions and hardware remain separate checks.
Pi 4 LAN exposure of only combined port 4176 and actual Chrome Administration,
Hub and Editor rendering are now verified after a fresh PC-verified ATLAS backup.
Internal ports remain loopback-only. See
[Sprint G2.5.9308](docs/sprints/Sprint-G2.5.9308.md) for first-visit identity
initialization and standalone/no-HA-connection boundaries.
The native Pi 4 now also connects to Proxmox HA with Administration-owned
credentials: 3,736 live entities, search/domain filtering and automatic Editor
reconnection after a direct browser reload are verified. Plugin/project state
and unrelated Administration settings are preserved. See
[Sprint G2.5.9309](docs/sprints/Sprint-G2.5.9309.md) for backup and test limits.
App0.1.305 additionally preserves the remembered HA connection in an encrypted
private Linux installation store. A real Pi 4 reboot, fresh HA authentication
before Administration reload, direct Editor reconnection and data preservation
pass after backed-up token adoption. See
[Sprint G2.5.9311](docs/sprints/Sprint-G2.5.9311.md). Other distributions and
HA App environment-owned credentials retain their separate qualification limits.
The App0.1.305 update is now also verified on Proxmox and Pi 5 after fresh
backups: env-owned HA authentication, direct/embedded Administration and Hub,
live Editor connection, terminal access and existing plugin/project/config
preservation pass. At that checkpoint the HACS integration remained0.1.301. See
[Sprint G2.5.9312](docs/sprints/Sprint-G2.5.9312.md) for targeted VM backup and
file-check boundaries.
The HACS integration release upgrade 0.1.301 -> 0.1.306 is now qualified on
Proxmox and Pi 5 after checked backups and real HA Core restarts. Stored entry
identity/schema 1.1/URL, existing plugin/project state and checked files remain
unchanged. Isolated rollback/re-update and refusal of unknown schema 1.2 also pass.
See [Sprint G2.5.9314](docs/sprints/Sprint-G2.5.9314.md) for the PC-verified VM
backup, storage recovery and test boundaries. Further HA versions and actual
conversion between different production schemas remain open; no unnecessary
format change was introduced just for qualification.
The compatibility matrix now also qualifies HA Core 2026.9.4 in a fresh isolated
amd64 installation with integration0.1.306 and Runtime0.1.306: real setup/options,
reload/restart, embedded Hub/Administration/Editor, live entity selection and
fixture preservation pass. CI runs the eleven integration contracts against
both 2026.9.4 and 2026.10.1. This does not qualify every intervening version,
9.4 HACS downloads or native ARM64 execution. Pi 5 and Proxmox were untouched.
See [Sprint G2.5.9315](docs/sprints/Sprint-G2.5.9315.md).
The exact HA 2026.10.2 / integration0.1.306 / native App0.1.327 combination is
now qualified on .68: embedded surfaces, live connection/search, local save/reload,
byte-identical JSON/YAML HACS Card roundtrips and automatic reconnection after
a real HA Core restart. Original Editor and captured data are preserved; the
temporary Runtime address is restored. .177 is not accessed. CI includes all
three exact HA versions. See [Sprint G2.5.9378](docs/sprints/Sprint-G2.5.9378.md)
and [the matrix](docs/deployment/HA_COMPATIBILITY_MATRIX.md) for metadata changes,
retention and boundaries. A newer stable HA version when available and actual
schema conversions remain separate qualification work.
The optional native HA panel/config-entry integration is implemented in 0.1.299
and verified with isolated Home Assistant Core 2026.10.1 and its real frontend.
Native installation/setup and embedded project access are verified on Proxmox
and Pi 5. The Pi HACS installation, HA restart, configuration and panel checks
are recorded in [Sprint G2.5.9290](docs/sprints/Sprint-G2.5.9290.md).
Native HACS commit updates followed by HA Core restart are verified on Pi 5 and
Proxmox, with settings, local/editor server projects and shared plugins preserved.
At that earlier checkpoint both integrations remained at 0.1.301; their source was unchanged across
the tested commits. That check did not qualify a release/schema migration.
See [Sprint G2.5.9292](docs/sprints/Sprint-G2.5.9292.md).
Catalog inclusion is not claimed. Preserve the existing runtime address,
installation identity and add-on Ingress access. See
[Sprint G2.5.9284](docs/sprints/Sprint-G2.5.9284.md).
The HACS download diagnosis and qualification boundary are recorded in
[Sprint G2.5.9285](docs/sprints/Sprint-G2.5.9285.md).
Shared plugin management with explicit, backed-up adoption is implemented in
0.1.300 and verified across separate browser origins. Proxmox adoption is confirmed
by the user; native Pi adoption is verified at revision 1 with five repositories,
five external metadata entries and six active plugins shared by App, direct Runtime
and the embedded HA panel. Existing settings and projects are preserved. See
[Sprint G2.5.9291](docs/sprints/Sprint-G2.5.9291.md). Editor
projects, credentials and external plugin settings remain outside this migration.
See [Sprint G2.5.9286](docs/sprints/Sprint-G2.5.9286.md).
Named Expert editor project storage is implemented in 0.1.301 with explicit
save/open previews, workspace backups, revision checks and separate local drafts.
Native App/Runtime project adoption on Proxmox is verified, including the embedded
HA Runtime panel, round-trip project equivalence, stale-save conflict rejection,
reload persistence and original local configuration preservation. The same
App/Ingress to direct Runtime round trip is verified on the real Pi 5 after
updating from 0.1.300 to 0.1.301. The Pi HA Runtime panel is now configured and
opens the same server project after HA restart. Diverse real user projects
remain follow-up qualification;
external-plugin projects and browser preferences remain separate. See
[Sprint G2.5.9287](docs/sprints/Sprint-G2.5.9287.md).
Native evidence and backup boundaries are recorded in
[Sprint G2.5.9288](docs/sprints/Sprint-G2.5.9288.md).
Pi update, backup and project-preservation evidence are recorded in
[Sprint G2.5.9289](docs/sprints/Sprint-G2.5.9289.md).

A6 documentation alignment is complete; the 21 ATLAS/plugin
pages per language, navigation, locale routes and technical examples are
reviewed in DE/EN/FR. Evidence and remaining external-plugin UI translation
limits are recorded in [Sprint G2.5.9282](docs/sprints/Sprint-G2.5.9282.md).
A5 is complete as the documented stabilization and verification
increment, not as production approval. Criteria, API boundaries, regression
results and native test limits are recorded in
[the A5 review](docs/deployment/ATLAS_A5_REVIEW_2026_10.md) and
[Sprint G2.5.9281](docs/sprints/Sprint-G2.5.9281.md).

## Open follow-up qualification

App0.1.313 corrects the normal Mushroom YAML/JSON import losses identified in
[Sprint G2.5.9340](docs/sprints/Sprint-G2.5.9340.md): single cards retain their
Mushroom type and text/icon/color templates, as do nested entries. YAML block
scalars preserve indentation and blank lines. Isolated regression and actual
HA execution evidence is recorded in [Sprint G2.5.9341](docs/sprints/Sprint-G2.5.9341.md).
The backed-up native App0.1.313 update now also passes on Proxmox and Pi 5:
all four normal import paths, exact templates, save/open, actual HACS round trips
and real HA preview text/icon/color changes on natural minute boundaries.
Original data and complete local Editor configurations are retained. See
[Sprint G2.5.9342](docs/sprints/Sprint-G2.5.9342.md) for native scope and boundaries.

The isolated mixed Core/Bubble/Mushroom HACS-card bundle round trip is qualified
in [Sprint G2.5.9316](docs/sprints/Sprint-G2.5.9316.md). Actual browser download,
reimport/re-export and real HA rendering retain the checked fields/configuration.
App0.1.307 fixes false title conflicts when a project's name differs from its
first nested card. Grid metadata round-trips; HA uses generated stacks rather
than identical pixel geometry. App0.1.308 loads exported Card locale files,
follows the HA language or an explicit Card language, and applies per-field EN
fallbacks. DE/FR exports still need translation/review when no adapter runs.
See [Sprint G2.5.9318](docs/sprints/Sprint-G2.5.9318.md). App0.1.309 exports
the dist repository layout. Isolated HACS2.0.5 download methods install the
script/locales together and the real /hacsfiles/ endpoint serves them in HA.
See [Sprint G2.5.9319](docs/sprints/Sprint-G2.5.9319.md) for fixture transport and
release/filename boundaries. Real GitHub OAuth, custom Dashboard repository
registration, branch installation and automatic module registration now pass
in isolated HA2026.10.1/HACS2.0.5; see
[Sprint G2.5.9320](docs/sprints/Sprint-G2.5.9320.md). Native hosts were untouched.
Real tagged releases v0.1.0/v0.1.1, HACS update detection, installation and
manual reinstallation of v0.1.0 also pass, including exact script/locale bytes,
stable module identity and preserved configuration after restart; see
[Sprint G2.5.9321](docs/sprints/Sprint-G2.5.9321.md).
Controlled download failure after a real script write restores v0.1.0 through
HACS2.0.5. A hard process interruption leaves a partial installation after
restart; normal HACS reinstallation and a separate complete configuration-volume
snapshot recovery both pass. See [Sprint G2.5.9322](docs/sprints/Sprint-G2.5.9322.md)
for fault-injection scope and the absence of automatic crash recovery.
App0.1.310 adds an embedded EN/DE/FR repair notice to newly generated Cards:
declared locale files are checked even when inactive, while English fallback
and live child Cards remain usable. Isolated missing-file/repair verification
and the re-export boundary are recorded in
[Sprint G2.5.9323](docs/sprints/Sprint-G2.5.9323.md).
Native App0.1.310 updates and generated-Card missing-FR/EN checks also pass on
Proxmox/Pi 5 after fresh backups; existing settings, projects and external plugins
are preserved. See [Sprint G2.5.9324](docs/sprints/Sprint-G2.5.9324.md) for the
manual /local/ test resource scope and transient VM preview read-failure boundary.
App0.1.311 additionally pairs newly generated scripts and locales with a
deterministic package marker. Mixed/unmarked locales are excluded and reported;
isolated generated-runtime and HA browser checks are recorded in
[Sprint G2.5.9325](docs/sprints/Sprint-G2.5.9325.md). Existing deployed scripts
need deliberate re-export. This is not signature verification or automatic repair.
Native0.1.311 App updates and own generated-Card mixed EN/FR, unmarked FR and
repair checks pass on both hosts; see [Sprint G2.5.9326](docs/sprints/Sprint-G2.5.9326.md).
The same update exposed a File Studio retention limitation: trash/history
defaulted to the replaceable container filesystem. The only pre-existing trash
entries were our previous test folders; these were reconstructed from PC copies
with original metadata after the update. App0.1.312 now uses persistent plugin
installation data, with isolated old-container migration, replacement, backup
recovery and actual file restoration qualified in
[Sprint G2.5.9327](docs/sprints/Sprint-G2.5.9327.md). Before the FIRST update,
prepare legacy stores inside the OLD container and back up the prepared data;
already lost stores require an earlier backup. Native0.1.312 preparation and
updates now pass on Proxmox and Pi 5 after fresh HA backups plus PC copies of
legacy/prepared data: both original trash entries, all12 history files and
all169/174 persistent files remain intact, alongside configuration/projects.
See [Sprint G2.5.9328](docs/sprints/Sprint-G2.5.9328.md). This does not qualify
HAOS-native backup restoration or recovery of previously discarded stores.

A separate native HAOS full-backup restore is now qualified with owned fixtures:
HAOS18.3/HA2026.10.1/Supervisor2026.10.2, encrypted full backup downloaded to PC,
then uploaded and restored through Supervisor into a fresh Hyper-V amd64 VM.
All154 checked files, App options, HA settings/config entries, six plugin catalog
entries, the named project and retained trash/history match the source exactly.
See [Sprint G2.5.9329](docs/sprints/Sprint-G2.5.9329.md). Pi 5 and Proxmox were
untouched; real production backup archives were not restored. The isolated test
address was deliberately retained. A second fresh HAOS target now also qualifies
recovery under a different isolated IP: the full restore retains all154 checked
files and existing credentials; update only the App's HA URL and the Runtime
integration's options URL through their supported configuration interfaces.
Generated plugin links follow the new request origin automatically. No automatic
rewrite of stored addresses is promised. See
[Sprint G2.5.9330](docs/sprints/Sprint-G2.5.9330.md).

- Diverse real user projects, entities, Custom Cards and theme combinations.
  A bounded isolated36-field Core/Bubble/Mushroom project now passes actual UI
  save/reopen, byte-identical HACS export/import and real HA rendering. During
  360 fixture state changes over190seconds, controlled12/24/62second transport
  outages recover automatically without reload; the longest includes both
  Editor and HA browser sockets. Existing fixture data remains intact and
  native hosts are untouched. See [Sprint G2.5.9337](docs/sprints/Sprint-G2.5.9337.md).
  The same 36-field save/reopen and actual browser HACS-export/import workflow
  now also passes on Proxmox and Pi 5 after fresh backups. Repeated exports are
  byte-identical per host; original local Editor configurations are restored.
  Existing Editors recover after a real VM reboot and user-performed Pi LAN
  interruption; all 36 HA cards remain rendered. Native checks use passive real
  sensors, not the isolated 360 synthetic changes or ARM64 browser benchmarking.
  See [Sprint G2.5.9338](docs/sprints/Sprint-G2.5.9338.md).
  A full isolated 60-minute run now also passes with 36 distinct fixture entities:
  720 update batches, 10,080 successful service calls and automatic recovery
  after 15/45/90-second transport outages. Actual browser export/import,
  save/reopen, final entity states and original fixture preservation pass.
  App/HA memory sampling and its browser-wide/late process-tree limits are in
  [Sprint G2.5.9339](docs/sprints/Sprint-G2.5.9339.md). Native hosts were untouched.
- Longer or more precisely isolated CPU/RAM profiles, larger entity counts and
  further network failure variants beyond that bounded 60-minute fixture check.
- Stable production plugin/API contracts and broader host compatibility. Release/version/migration rules and the plugin compatibility gate are defined in [the policy](docs/project/specifications/VERSION_COMPATIBILITY_POLICY.md). Native 0.1.302 gate refusal/review paths are recorded in [Sprint G2.5.9296](docs/sprints/Sprint-G2.5.9296.md). Updates to 0.1.303 and authenticated HA discovery are recorded in [Sprint G2.5.9298](docs/sprints/Sprint-G2.5.9298.md). Real Icon Library 0.1.8/0.1.9 backend replacement and recovery passed on Proxmox/Pi with original assets/shared metadata/projects restored; see [Sprint G2.5.9300](docs/sprints/Sprint-G2.5.9300.md). Native 0.1.304 updates, UI cancellation/replacement/recovery and guarded shared metadata adoption now pass on both hosts after fresh backups; see [Sprint G2.5.9302](docs/sprints/Sprint-G2.5.9302.md). Further plugin families, real migrations and generic plugin-data rollback remain open.
- Further real network/storage failure variants, HAOS recovery on physical/ARM64 hardware and additional HACS versions beyond the bounded isolated checks. No automatic HACS crash rollback is promised.
- Linux installer qualification on further distributions and additional bare-metal hardware beyond the verified Pi 4 ARM64 host.

The completed bounded checks stay in the sprint ledger and the review above.
These follow-ups remain open; no hardware benchmark, stable 1.0 API or complete
browser/host compatibility is claimed. Preserve Expert-only legacy import
compatibility, settings, encrypted credentials, projects and plugins.

The ATLAS recovery path is additionally qualified with File Studio 0.1.50/0.1.51
after isolated 0.1.49 replacement/recovery, then native Proxmox/Pi cycles. Original
plugin bytes, selected config files, projects, settings and visible browser
preferences are preserved; declared-capability metadata is refreshed as intended.
See [Sprint G2.5.9303](docs/sprints/Sprint-G2.5.9303.md) for backup and file-check
boundaries. Further families and real data migrations remain separate work.

Terminal 0.1.9 -> 0.1.10 catalog updates and UI recovery back to exact original
0.1.9, then forward to retained 0.1.10, now pass after the guarded metadata
correction: first isolated, then Proxmox and Pi 5. Both native hosts finish at
0.1.10 with functional local shells and preserved settings, selected config files,
named projects and other plugins. See
[Sprint G2.5.9306](docs/sprints/Sprint-G2.5.9306.md) for backup boundaries.
Existing wrongly constrained snapshots on other installations still require
reviewed treatment without weakening compatibility or integrity checks.

The ATLAS guarded recovery path now also passes with actual Automation Exporter /
Editor packages0.1.27/0.1.28 in an isolated local App: non-mutating preview,
cancellation, stale-preview rejection after a real management change, exact
package recovery, re-update/restart and source/export/project/history/trash
preservation. Browser analysis/export and File Studio handoff pass. See
[Sprint G2.5.9333](docs/sprints/Sprint-G2.5.9333.md).
Native Pi 5 and Proxmox28->27->original28 recovery now also passes after fresh
local HA backups and PC copies: exact plugin/source/export/retention/project
preservation, UI cancellation/recovery and identical synthetic YAML analysis.
App312 and authenticated HA2026.10.1 remain unchanged, with no restart needed.
See [Sprint G2.5.9334](docs/sprints/Sprint-G2.5.9334.md). Real data-format
migration, new GitHub release qualification and full HA restore remain distinct.

Icon Studio package recovery is now also qualified in an isolated App312 with
actual16/17 packages, guarded UI cancellation/recovery and App restart. On the
same browser origin/profile, all131collection icons and2drawing text objects
survive; re-exported collection JSON, iconset JS and drawing SVG match exactly.
Server files, named project, sibling plugin, trash and history remain intact.
Browser stores are outside HA/server backups; no deleted-storage recovery or
origin/profile migration is claimed.
See [Sprint G2.5.9335](docs/sprints/Sprint-G2.5.9335.md).
Native Pi 5 and Proxmox16->17->original16->17 now also pass after fresh local
HA backups and PC copies. All12package assets, existing server files, shared
settings, six active plugins, named project, trash and history are preserved.
Direct and HA Ingress browser origins retain their three reference icons and
empty drawing drafts; collection JSON is byte-identical. New text creation,
undo and reload pass. App312 and HA2026.10.1 need no restart. After recovery,
reload Administration before another update if a stale preview is rejected.
See [Sprint G2.5.9336](docs/sprints/Sprint-G2.5.9336.md).

## Remaining product directions

These are longer-term directions, not claims that basic infrastructure is
missing. Prefer concrete, verified product increments over additional
architecture contract expansion.

- Stabilize extension/API boundaries and implement the documented compatibility,
  migration and recovery rules for a production release.
- Expand Renderer/Theme integration with measured performance, larger layouts,
  dynamic theme inheritance and real host integration where still needed.
- Review external card-builder interoperability through explicit schemas and
  attribution. `studiobts/home-assistant-card-builder` remains an AGPL-3.0 reference
  to evaluate; do not copy its source into ATLAS blindly.
- Improve guidance for unknown HACS card types and consider a reviewed community
  mapping exchange. Preserve existing local mapping and import/export behavior.
- Evaluate broader repository artifact types (cards, integrations, tools and
  themes) with explicit installation/compatibility contracts. Basic plugin
  discovery, installation, updates and administration are already implemented.
- Review broader code/documentation generators and architecture validation
  against the existing CLI and generator before planning more implementation.
- Consider additional platforms and community extensions after core deployment
  and compatibility paths have been verified.

## Deployment order and test boundaries

1. Standalone Docker runtime (implemented; continue real deployment checks).
2. HA app/add-on from the same runtime (implemented; real A1 verified; A2 accepted).
3. Optional Linux/systemd installer (implemented; Debian 12 amd64 LXC verified).
4. Native ATLAS Runtime HA panel (implemented; native release update/restart verified; additional HA versions and future schema conversions remain separate qualification).

HACS card-package export exists; A7 concerns hosting/integrating ATLAS itself.
The real Supervisor upgrade and Ingress checks are recorded in Sprint
G2.5.9256. They do not establish hardware actions, mobile support, ARM64
execution, every plugin-owned project format or production readiness.

## Separate projects and preserved references

The Card Editor is the integrated ATLAS reference plugin. File Studio, Terminal,
Automation Exporter, Blocks, Studio and other standalone projects have their own
backlogs. Their implementations are not open ATLAS work or ATLAS sprint work.

Preserve these future cross-project references without starting them as part of
the priorities above:

- **Lovelace UV Card**: original UGSo/ATLAS implementation inspired by
  `https://github.com/filipnet/haos-uv-index`; UV sensors, risk colors, WHO-style
  protection guidance, Mushroom-compatible presentation and optional alerts.
- **Parcel integration evaluation**: `TA2k/ioBroker.parcel` remains optional
  inspiration for normalized parcel data and a possible HA bridge/integration.
  No implementation or provider choice is agreed.
- **HTML-to-VitePress converter**: possible independent helper for HTML/CSS/assets
  to Markdown/frontmatter conversion; keep its implementation in its own project.

## Keeping the roadmap current

- Remove completed items from the open list; retain their evidence in sprints.
- Keep unresolved and unverified work open. Cleaning this document does not
  complete implementation or deployment checks.
- Maintain DE/EN public documentation together, with reviewed French wherever
  offered. Standalone plugin locale coverage belongs to those projects.
- Preserve credential boundaries, Linux-sensitive HA resource paths, English
  card-language fallback and the established backup/restore rules.
