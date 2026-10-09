# UGSo Blocks for HA Roadmap

Stand: 9. Oktober 2026. Status: Lokaler Prototyp 0.1.0 implementiert; weitere Phasen geplant.

## Erster Prototyp

Seit Version 0.1.1 liegt der maßgebliche Code unter `blocks_for_ha/` im gemeinsamen Repository [ugso-ha-mqtt-addons](https://github.com/rockbaer2007/ugso-ha-mqtt-addons/tree/master/blocks_for_ha), neben HA Grafik Visual Studio. Das ursprüngliche separate Repository bleibt als Sicherung des ersten Prototyps erhalten. Entwicklung und Updates erfolgen im gemeinsamen Repository.

Das eigenständige Projekt `ugso-blocks-for-ha` enthält Version 0.1.0 mit einfachen Auslöser-, Bedingungs- und Aktionsblöcken, YAML-Vorschau, Kopieren, Speichern auf den Rechner und Öffnen unterstützter YAML-Dateien als Blocks. Drei Beispiele, Projektdateien und lokale Browsersicherung sind vorhanden. Die Oberfläche verwendet „Blocks“; die Originalbibliothek wird als „Built with Blockly“ genannt und mit Lizenztexten ausgeliefert. Generator-, Import- und Browserprüfungen sind vorhanden; die Ausführung in einer realen HA-Installation steht noch aus.

HA-Verbindung und Entitäts-/Aktionsauswahl folgen separat. Dafür soll die backendseitige Supervisor-/Token-Verbindung von UGSo Visual Studio als Vorlage dienen. Die direkte Verbindung ist noch nicht implementiert. Blockpakete und Katalog bleiben geplante Ausbauschritte; Scripts und umfassender YAML-Import sind ebenfalls noch offen.

UGSo Blocks for HA wird ein eigenständiger visueller Editor für native Home-Assistant-Automationen und Scripts. Blockly übernimmt die Blockoberfläche; Home Assistant führt die exportierten Regeln aus. Der Editor muss während der Ausführung nicht geöffnet sein. Zunächst entsteht ein privater Prototyp, anschließend ist eine öffentliche Veröffentlichung vorgesehen. Eine spätere ATLAS-Anbindung ist optional und macht das Projekt nicht zu einem bereits integrierten Plugin.

## Architektur und Veröffentlichung

- Eigene HA-Blöcke auf Basis der Blockly-Bibliothek, ohne ioBroker-Laufzeit.
- Blockarbeitsbereich als versioniertes Blockly-JSON speichern.
- Gemeinsames strukturiertes Automationsmodell zwischen Blöcken und YAML verwenden; keine YAML-Erzeugung durch ungeprüfte Textverkettung.
- Generierte Automation enthält native HA-Auslöser, Bedingungen und Aktionen; Berechnungen darin werden von HA ausgeführt. Dieses Projekt verlagert deren Ausführung nicht auf einen Display-Browser.
- Erste Version: eigenständige lokale Weboberfläche mit Export und manueller Übernahme in HA. Danach Verpackung als HA-App mit Ingress und dauerhafter Projektspeicherung.
- Home Assistant Container benötigt für dieselbe Oberfläche eine eigenständige Bereitstellung; die HA-App ist der Supervisor-Pfad.
- Eigener Code vorzugsweise Apache-2.0, Drittanbieter-Lizenzen und erforderliche Hinweise mitliefern. Eigener Name und eigenes Logo; „Built with Blockly“ als Herkunftshinweis. Keine Darstellung als offizielles HA- oder Blockly-Produkt.

Blockly erlaubt eigene Blockdefinitionen und Generatoren. Die Softwarelizenz und die Markenregeln sind getrennt zu beachten: [Blockly-Lizenz](https://github.com/RaspberryPiFoundation/blockly/blob/main/LICENSE), [Marken und Attribution](https://docs.blockly.com/guides/app-integration/attribution/).

## Funktionsliste und Prioritäten

P1 bedeutet erste nutzbare Version, P2 Ausbau, P3 spätere Erweiterung. Die Liste ist eine geplante Abdeckung; unterstützte HA-Versionen werden vor Implementierung und Release festgelegt.

### Automation und Script als Grundstruktur

- P1: Name, Beschreibung, stabile ID, mehrere Auslöser, optionale Bedingungen und Aktionsfolge.
- P1: Ausführungsmodi single, restart, queued und parallel; passende Einstellungen für maximale gleichzeitig laufende beziehungsweise wartende Durchläufe.
- P1: Script ohne Auslöser, mit wiederverwendbarer Aktionsfolge.
- P2: Einzelne Blöcke deaktivieren, Trigger-IDs und Zuordnung „ausgelöst durch“.
- P2: Alias für Schritte, Anfangszustand und Trace-Einstellungen.
- P3: Script-Eingabefelder und Antwortdaten, Automation-Blueprints und Script-Blueprints.

Die Modi steuern konkurrierende Aufrufe; sie sind keine Blockly-Schleifen: [HA-Ausführungsmodi](https://www.home-assistant.io/docs/automation/modes/).

### Auslöser

- P1: Zustandsänderung mit von/nach, Attribut und optionaler Mindestdauer.
- P1: Zahlenwert überschreitet oder unterschreitet eine Grenze; Attributauswahl.
- P1: Uhrzeit, Zeitmuster und Sonnenaufgang/-untergang mit Versatz.
- P1: Home Assistant startet oder stoppt.
- P2: Ereignis mit Datenfilter, MQTT-Nachricht, Webhook und Kalendertermin.
- P2: Geräteauslöser aus den Möglichkeiten der jeweiligen HA-Integration.
- P2: Zone, Anwesenheit, NFC-Tag und Assist-Satz.
- P2: Template-Auslöser mit Jinja und gültigem HA-Kontext.
- P3: Neuere domänenspezifische Auslöser und Mehrfachziel-Verhalten nach HA-Version.
- P1: In der Oberfläche erklären, dass Auslöser auf Ereignisse beziehungsweise Grenzüberschreitungen reagieren und keine dauerhafte Bedingungsprüfung darstellen. Mindestdauer übersteht HA-Neustarts nicht automatisch.

Die konkreten Felder folgen den nativen Auslösern: [HA-Auslöser](https://www.home-assistant.io/docs/automation/trigger/).

### Bedingungen und Werte

- P1: Zustand, Zahlenbereich, Zeit/Wochentag und Sonnenbedingungen.
- P1: UND, ODER, NICHT und verschachtelte Bedingungen mit passenden Blockanschlüssen.
- P1: Zahl, Text, Wahr/Falsch, Vergleich und Entitätsattribut als Eingabewerte.
- P1: Fehlende Entität sowie unknown/unavailable sichtbar unterscheiden; keine automatische Nullannahme.
- P2: Anwesenheit/Zone, Gerätebedingung und Trigger-ID.
- P2: Lokale Variablen, Listen, einfache Mathematik und Textverarbeitung; HA-Ausdrücke als Jinja erzeugen, keine JavaScript-Ausführung erwarten.
- P2: Erweiterter Template-Block mit Kontext, Vorschau und unveränderter Speicherung.
- P3: Datumsrechnung, Listenfilter, strukturierte Daten und weitergehende Template-Helfer.

Nicht jede generische Blockly-Programmierfunktion hat eine direkte HA-Entsprechung. Zulässige Blöcke werden durch das native Automationsmodell begrenzt: [HA-Bedingungen](https://www.home-assistant.io/docs/scripts/conditions/).

### Aktionen und Ablaufsteuerung

- P1: Generischer Block „HA-Aktion ausführen“ mit Domain, Aktion, Ziel und Daten.
- P1: Wenn/Dann/Sonst, geordnete Folge, Verzögerung und expliziter Stopp.
- P2: Mehrere Zweige mit choose, Wiederholen mit Anzahl/while/until/for_each.
- P2: Warten auf Bedingung oder Auslöser, Timeout und Verhalten nach Timeout.
- P2: Parallele Zweige und Variablen; Reihenfolge und gemeinsamen Kontext erklären.
- P2: Andere Scripts und Automationen aufrufen; blockierender Script-Aufruf gegenüber script.turn_on unterscheidbar machen.
- P2: Ereignis auslösen, MQTT veröffentlichen, Antwortvariable und Fehlerbehandlung mit continue_on_error.
- P3: Geräteaktionen, dynamische Ziele und integrationseigene Erweiterungen.

Die Ablaufblöcke werden auf native HA-Aktionsstrukturen abgebildet: [HA-Aktionen und Script-Abläufe](https://www.home-assistant.io/docs/scripts/).

### Komfortblöcke für typische Geräte

Zusätzlich zum generischen Aktionsblock werden diese vereinfachten Bedienblöcke geplant. Verfügbarkeit und Felder stammen aus den installierten HA-Integrationen; nicht unterstützte Gerätefunktionen bleiben deaktiviert.

| Priorität | Bereich | Vorgesehene Blöcke |
| --- | --- | --- |
| P1 | Licht und Schalter | Ein/Aus, Helligkeit, Farbe, Umschalten |
| P1 | Benachrichtigung | Titel, Nachricht, Empfänger beziehungsweise Notify-Aktion |
| P1 | Helfer | input_boolean, input_number, input_select, input_text und Timer |
| P2 | Heizung | Solltemperatur, HVAC-Modus, Voreinstellung |
| P2 | Rollladen | Öffnen, Schließen, Stoppen und Position |
| P2 | Medien | Wiedergabe, Pause, Lautstärke und Ansage |
| P2 | Szene und Script | Szene aktivieren, Script mit Eingaben aufrufen |
| P2 | Energie | Leistungs-/SOC-Grenzen, Freigabe und Hysterese als Vorlagen |
| P3 | Weitere Geräte | Ventilator, Schloss, Alarmanlage, Bewässerung und Staubsauger |

### HA-Verbindung und Auswahlfelder

- P1: Ohne Verbindung mit Demo-Entitäten arbeiten und gültiges YAML exportieren.
- P2: Authentifizierte Verbindung, Verbindungsstatus und erneute Verbindung nach Unterbrechung.
- P2: Entitäten mit Namen, Domain, Zustand, Einheit und Attributen suchen; Bereiche und Geräte als Ziele auswählen.
- P2: Verfügbare Aktionen und deren Feldbeschreibungen aus HA laden, statt eine starre Gesamtliste zu pflegen.
- P2: Zugangsdaten ausschließlich im Backend verwalten; keine Tokens in Blockly-Projekten, YAML, Logs oder Fehlerexporten.
- P3: Geräteauslöser und Geräteaktionen über die tatsächlichen Integrationsfähigkeiten auflösen.

Zustände, Ereignisse und Aktionsaufrufe sind über die [HA-WebSocket-API](https://developers.home-assistant.io/docs/api/websocket/) verfügbar. Schreibende Automationsverwaltung benötigt eine gesonderte Prüfung der unterstützten APIs.

### Editor und Austausch

- P1: Kategorien, Suche, Drag-and-drop, Zoom, Rückgängig/Wiederholen, Kopieren und Kommentare.
- P1: Kompakte DE/EN-Oberfläche, klare Farben für Auslöser/Bedingungen/Aktionen, Tastaturbedienung und verständliche Fehler direkt am Block.
- P1: Live-YAML-Vorschau, Projekt speichern/laden, YAML kopieren und herunterladen; Dateiname aus dem tatsächlichen Automations- oder Scriptnamen.
- P1: Listenformat für automations.yaml gegenüber einzelnem Automations-YAML ausdrücklich auswählen.
- P2: Import der unterstützten YAML-Strukturen zurück in Blöcke; IDs, Variablen und Aktionsreihenfolge erhalten.
- P2: Nicht unterstützte Inhalte als unveränderten erweiterten YAML-Block behalten oder den Import mit genauer Begründung stoppen. Niemals stillschweigend verwerfen.
- P2: Externe Änderungen erkennen und Unterschiede anzeigen; Blockly-JSON und exportierte Automation gegeneinander prüfen.
- P3: FR-Oberfläche, Vorlagenbibliothek, Blueprint-Unterstützung und geteilte Blockgruppen.

Blockly speichert Arbeitsbereiche, übersetzt jedoch bestehendes HA-YAML nicht selbst zurück in Blöcke: [Blockly-Speicherung](https://docs.blockly.com/guides/configure/serialization/).

### Prüfung und Diagnose

- P1: Vollständigkeit, Anschlussarten, Zahlen-/Zeitformate, erforderliche Ziele und leere Zweige prüfen.
- P1: YAML mit einem strukturierten Parser erzeugen und wieder einlesen; Ausdrücke und Text korrekt behandeln.
- P1: Referenzbeispiele für Licht, Bewegung mit Wartezeit und Batteriegrenze als Generator-Tests.
- P2: YAML → Blöcke → YAML auf gleiche Bedeutung prüfen, einschließlich Modi, Trigger-IDs und Templates.
- P2: Testwerte zur Prüfung von Bedingungen; klar vom echten Ausführen von Geräteaktionen unterscheiden.
- P2: Verweis auf die native HA-Trace-Ansicht; spätere direkte Trace-Anzeige nur über geprüfte APIs.
- P2: Problembericht mit Vorschau und ohne Zugangsdaten; Fehler am verursachenden Block markieren.

## Blockpakete als Plugins und Katalog

Entscheidung: UGSo Blocks for HA erhält einen stabilen Grundeditor und installierbare Blockpakete als Plugins. Auslöser, Bedingungen, Ablaufsteuerung, Variablen, Projektverwaltung und YAML-Export bleiben im Grundeditor. Integrations- und App-spezifische Blöcke werden über Pakete ergänzt. Eine HA-App kann solche Blöcke nur nutzen, wenn sie eine passende HA-Aktion oder eine ausdrücklich unterstützte Schnittstelle bereitstellt.

### Paketformat und Ausführung

- P1: Erweiterbares Blockregister und stabile, namensraumgebundene Paket- und Block-IDs bereits im Grundmodell vorsehen.
- P2: Versioniertes Manifest mit Autor, Lizenz, Paketversion, Blockschema-Version, benötigter Editor-Version und unterstützten HA-Versionen.
- P2: Deklarative Blockdefinitionen mit Feldern, Anschlussarten, Farben, Übersetzungen, Hilfetexten und Beispielen.
- P2: Zuordnung zu nativen HA-Aktionen durch einen vom Grundeditor geprüften Generator. Pakete dürfen keine beliebigen JavaScript-Generatoren, Installationsscripts oder ausführbaren Erweiterungen mitbringen.
- P2: Benötigte Integrationen, Aktionen und Fähigkeiten im Manifest deklarieren und gegen die angeschlossene HA-Installation prüfen.
- P2: Zugangsdaten bleiben in der zuständigen Integration oder im Backend; Pakete, Blockprojekte und YAML-Exporte enthalten keine Tokens oder Anbieter-Schlüssel.

### Geplante Integrationspakete

| Paketbereich | Beispielblöcke | Voraussetzung |
| --- | --- | --- |
| Sprachausgabe | Text vorlesen, Sprache/Stimme und Ziel-Lautsprecher auswählen | Passende TTS- und Wiedergabeaktionen in HA |
| Messenger | WhatsApp-, Telegram- oder Signal-Nachricht senden | Installierte Integration beziehungsweise geeigneter Anbieter; kein eingebauter Versanddienst |
| Benachrichtigung | Nachricht mit Titel, Empfänger und integrationsabhängigen Zusatzdaten | Verfügbare Notify- oder Companion-App-Aktion |
| Energie und Geräte | Komfortblöcke für konkrete Wechselrichter, Heizungen oder andere Geräte | Zugehörige Integration und unterstützte Aktionen |
| Weitere Apps | App-spezifische Funktionen als verständliche Blockly-Blöcke | Dokumentierte, ausdrücklich unterstützte Anbindung |

Die Blockoberfläche vereinfacht vorhandene Aktionen; sie installiert nicht automatisch den erforderlichen Dienst. Bei fehlender Integration bleiben Blöcke mit ihren Einstellungen erhalten und zeigen den konkreten Grund an. Export wird verhindert, wenn eine erforderliche Zuordnung fehlt oder nicht unterstützt wird. Offline ist Export bei gültiger Zuordnung mit Hinweis auf ungeprüfte Integrationsverfügbarkeit möglich.

### Katalog und Paketverwaltung

- P2: Bestehenden UGSo-Katalog um einen getrennten Pakettyp **Blockly-Blockpaket** erweitern. Grafik-Widgets und Tools bleiben eigene Pakettypen; Blockpakete sind nicht automatisch mit deren Laufzeit kompatibel.
- P2: Paketdetails mit Funktionsliste, Voraussetzungen, Version, Lizenz, Beispielen und Prüfsumme anzeigen.
- P2: Kataloginstallation und lokalen Paketimport unterstützen; Pakete vor Installation anhand von Schema, Inhalt und Prüfsumme prüfen.
- P2: Installierte Pakete auflisten; kompatible Updates, Änderungsübersicht, Deinstallation und Wiederherstellung anbieten.
- P2: Veröffentlichungsprüfung und Pakettests vor Freigabe; eine Prüfsumme bestätigt Dateiintegrität und ersetzt keine Inhaltsprüfung.
- P2: Keine Aktionen beim Installieren oder Öffnen eines Pakets ausführen. Ein Nachrichtenblock versendet erst durch die später in HA ausgeführte Automation.

### Gespeicherte Projekte und Updates

- P1: Paket-ID, Paketversion, Block-ID und Schema-Version im Projekt erhalten.
- P2: Fehlende Plugins durch Platzhalter darstellen, die Felder und Verbindungen verlustfrei behalten. Abhängige Exporte bleiben bis zur Auflösung gesperrt.
- P2: Updates mit kompatiblen Definitionen oder deklarativen, vom Editor unterstützten Migrationen durchführen; vor Migration das Projekt sichern.
- P2: Vor Deinstallation anzeigen, welche Projekte betroffen sind. Blöcke niemals stillschweigend löschen oder in andere Aktionen umdeuten.
- P2: Tests für Paketimport, inkompatible Versionen, fehlende Integrationen, Updates und Wiederherstellung ergänzen.

## Umsetzungsphasen und Abnahmekriterien

| Phase | Ergebnis | Abnahme |
| --- | --- | --- |
| 1 | Lokaler Blockly-Prototyp mit P1-Grundblöcken | Drei Referenzautomationen erzeugen gültiges YAML; HA führt sie nach manueller Übernahme korrekt aus. |
| 2 | Projektverwaltung, Scripts, Prüfung und Blockregister | Projekte lassen sich verlustfrei speichern/laden; Paketreferenzen bleiben erhalten; unvollständige Blöcke verhindern den Export. |
| 3 | HA-App, Entitäts- und Aktionsauswahl | Oberfläche per Ingress erreichbar; Projekte überleben Neustarts; keine Tokens in Exporten. |
| 4 | P2-Abläufe, begrenzter YAML-Import und deklarative Blockpakete | Unterstützte Strukturen behalten ihre Bedeutung; unbekannte Inhalte bleiben erhalten; lokale Pakete werden geprüft und fehlende Plugins verlustfrei dargestellt. |
| 5 | Öffentliche erste Version mit Kataloganbindung | Unterstützte HA-Versionen dokumentiert; Paketinstallation, Updates, Lizenzen, Beispiele, Sicherungs- und Fehlerabläufe geprüft. |
| 6 | P3-Erweiterungen | Blueprint-, Geräte- und Diagnosefunktionen schrittweise ergänzen. |

## Dateizugriff und Grenzen

Gemäß ATLAS-Projektregel erhält der Automationseditor keine direkte Schreibfunktion für HA-Systemdateien. Vor dem Öffnen oder Lesen lokaler Automationsdateien ist eine Sicherung in einem Zeitstempelordner mit unverändertem Originaldateinamen erforderlich. Export und manuelle Übernahme sind der erste Integrationsweg. Eine spätere API-basierte Verwaltung wäre eine gesonderte Entscheidung mit Versionsprüfung, Änderungsvorschau und Wiederherstellung; sie ist nicht Teil der ersten Version.

Der native HA-Editor wird nicht ersetzt oder verändert. Der Import beliebiger vorhandener Automationen wird erst zugesagt, wenn die entsprechenden Strukturen unterstützt und geprüft sind. ioBroker-Scripte sind kein kompatibles Importformat.

Das nächste ATLAS-Card-Editor-Inkrement bleibt der bereits vorgesehene opt-in „Problem melden“-Ablauf. Die vorliegende Roadmap startet keine Umsetzung und verschiebt diese Priorität nicht.
