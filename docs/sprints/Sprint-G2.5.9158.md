# Sprint G2.5.9158 - Add-on Ingress Sidebar Branding

## Summary

- Added ATLAS `icon.png` and `logo.png` assets to the Home Assistant App/Add-on package.
- Enabled Home Assistant Ingress for the Card Editor port and added a dashboard-edit sidebar icon.
- Updated Add-on docs to prefer the Add-on sidebar toggle while keeping the Webpage dashboard fallback.
- Verified the prepared Add-on package builds and starts with healthy Administration and Card Editor surfaces.

## Verification

- `pnpm ha:app:prepare`
- `docker build --no-cache -t atlas-home-assistant-app:local output/home-assistant-app/atlas`
- `docker run -d --name atlas-ha-app-test -p 4176:4176 -p 4175:4175 -p 4174:4174 atlas-home-assistant-app:local`
- `GET http://127.0.0.1:4176/health`
- `docker inspect atlas-ha-app-test --format '{{json .State.Health}}'`
