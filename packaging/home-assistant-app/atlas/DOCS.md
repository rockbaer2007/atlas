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

## Add Editor as Dashboard/Webpage

The preferred Add-on path is **Settings -> Add-ons -> ATLAS -> Show in
sidebar**. Home Assistant then opens the editor through Ingress, similar to
Zigbee2MQTT.

Alternatively, go to **Settings -> Dashboards**, add a **Webpage** dashboard, use
`Atlas Card Editor` as the name and set the URL to the editor endpoint, for
example `http://<home-assistant-host>:4174/`. Enable **Show in sidebar** before
saving.
