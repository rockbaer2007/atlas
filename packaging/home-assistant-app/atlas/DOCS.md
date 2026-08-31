# ATLAS

ATLAS starts Administration and the Home Assistant Card Editor together.

Open the web UI after starting the app. The runtime page shows app links,
health status, surface ports and the planned distribution order.
The `/app` endpoint reports this package as `home-assistant-app-preview`.
The Add-on enables Home Assistant Ingress on the Card Editor port, so
**Open web UI** and **Show in sidebar** open the editor directly.

The Home Assistant token and translation provider keys stay in ATLAS
Administration. The Card Editor receives only the current browser session
handoff and provider key-configured flags.
The Add-on options can provide the Home Assistant URL, a long-lived access
token, whether ATLAS Administration should import that token on startup and
whether the Card Editor should auto-connect after the handoff.

ATLAS keeps a stable app identity through the `atlas_instance_id` option. Use a
deliberate value when encrypted Administration secrets should survive app
rebuilds or container recreation on the same Home Assistant installation.

## Editor als Dashboard/Webseite einbinden

Der bevorzugte Add-on-Weg ist **Einstellungen -> Add-ons -> ATLAS -> In
Seitenleiste anzeigen**. Home Assistant oeffnet dann den Editor ueber Ingress,
aehnlich wie bei Zigbee2MQTT.

Alternativ kannst du den ATLAS Card Editor wie ioBroker, FHEM oder andere
lokale Web-UIs als Webseiten-Dashboard anzeigen:

1. Gehe zu **Einstellungen -> Dashboards**.
2. Waehle **Dashboard hinzufuegen**.
3. Waehle den Typ **Webseite**.
4. Name: `Atlas Card Editor`.
5. URL: nutze die Editor-URL aus ATLAS, zum Beispiel
   `http://<home-assistant-host>:4174/`.
6. Aktiviere **In Seitenleiste anzeigen** und speichere das Dashboard.

Der Editor oeffnet sich dann direkt im Home-Assistant-Inhalt. ATLAS
Administration bleibt ueber den Link im Editor erreichbar. Home-Assistant-Token
und Provider-API-Keys bleiben in ATLAS Administration beziehungsweise in den
Add-on-Optionen und werden nicht dauerhaft im Editor gespeichert.

## Home-Assistant-Token in den Add-on-Optionen

Trage in der Add-on-Konfiguration die Home-Assistant-URL und optional einen
Long-Lived Access Token ein. Aktiviere **Token in ATLAS Administration
uebernehmen**, wenn ATLAS den Token beim Start an die Administration uebergeben
soll. Aktiviere **Card Editor automatisch verbinden**, wenn der Editor nach dem
Handoff direkt verbinden soll.

Der Token wird bewusst als Textfeld angezeigt. Home Assistant kann lokale
Password-Felder beim Wiederladen maskieren und dann nur einen gekuerzten
Platzhalter an das Add-on uebergeben. ATLAS ignoriert solche zu kurzen oder
maskierten Werte beim Start. Der Token wird nicht dauerhaft im Card Editor
gespeichert. Administration bleibt der Besitzer der Verbindungseinstellungen.

## Add Editor as Dashboard/Webpage

The preferred Add-on path is **Settings -> Add-ons -> ATLAS -> Show in
sidebar**. Home Assistant then opens the editor through Ingress, similar to
Zigbee2MQTT.

Alternatively, go to **Settings -> Dashboards**, add a **Webpage** dashboard, use
`Atlas Card Editor` as the name and set the URL to the editor endpoint, for
example `http://<home-assistant-host>:4174/`. Enable **Show in sidebar** before
saving.

## Home Assistant Token in Add-on Options

Enter the Home Assistant URL and optionally a long-lived access token in the
Add-on configuration. Enable **Import token into ATLAS Administration** when
ATLAS should pass the token to Administration on startup. Enable
**Auto-connect Card Editor** when the editor should connect immediately after
the handoff.

The token is intentionally shown as a text field. Home Assistant can mask local
password fields on reload and pass only a shortened placeholder to the Add-on.
ATLAS ignores masked or implausibly short token values during startup. The token
is not stored permanently by the Card Editor. Administration remains the owner
of the connection settings.
