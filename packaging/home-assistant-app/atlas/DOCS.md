# ATLAS

ATLAS starts Administration and the Home Assistant Card Editor together.

Open the web UI after starting the app. The runtime page shows app links,
health status, surface ports and the planned distribution order.
The `/app` endpoint reports this package as `home-assistant-app-preview`.

The Home Assistant token and translation provider keys stay in ATLAS
Administration. The Card Editor receives only the current browser session
handoff and provider key-configured flags.

ATLAS keeps a stable app identity through the `atlas_instance_id` option. Use a
deliberate value when encrypted Administration secrets should survive app
rebuilds or container recreation on the same Home Assistant installation.
