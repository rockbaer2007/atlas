# Sprint G2.5.9308 - Pi 4 LAN binding and browser qualification

Date: 2026-10-15

## Scope and backup

User explicitly authorizes exposing only combined App port 4176 on the native
Pi 4, then testing Administration, Plugin Hub and Card Editor in the browser.
Use the existing App0.1.304/systemd installation from Sprint9307. No runtime,
integration, add-on or plugin source change; no package version bump.

Re-enable the restricted temporary SSH test key through the user. Existing sudo
authorization is available during execution; no password is read or policy
changed. Before mutation, run the installer's real backup command. It stops
the service, captures state/configuration/unit/installation metadata and waits
for readiness after restarting it.

Backup `/var/backups/atlas/2026-10-15T17-01-41-375Z-fQOS5E` remains on the Pi.
Archive it and copy it to the private PC evidence directory
`source/backups/atlas-pi4-linux-20261015/lan`. Verify archive readability and
expected data/env/unit/installation entries. SHA256 matches the Pi:
`434e9e5ad6a2f2b2b7841cc12912e8246acb91d536fc5d357c6e3ead75f186db`.
Do not change the binding until PC verification is complete. Earlier backups
remain untouched. This is an ATLAS backup, not a new whole-OS/SD-card image.

## Constrained change and preservation

Change exactly `ATLAS_APP_HOST=127.0.0.1` to `ATLAS_APP_HOST=192.168.178.34`
in `/etc/atlas/atlas.env`, then restart the existing atlas service. Preserve
the rest of the environment and file permissions. Leave `ATLAS_HOST=127.0.0.1`.
Health succeeds with distribution linux-installer and version0.1.304.

Socket inventory confirms only:

- 192.168.178.34:4176 for the combined App;
- 127.0.0.1:4174 for the Editor child server;
- 127.0.0.1:4175 for the Administration child server.

No firewall, Internet/router forwarding, credentials or access-policy settings
are changed. The private helper would restore the exact environment and old
binding if readiness or the preservation check failed; that recovery branch is
not triggered in this successful run.

Before and after the restart compare persistent file bytes/modes/owners/mtimes,
shared plugin state, project list, catalog, service unit and installation
metadata. Preserve everything, normalizing only the deliberately changed
public origin in catalog asset URLs. The shared store remains uninitialized,
there are no named server projects and only the built-in reference plugin is
present. Do not claim existing populated ATLAS user projects on this fresh host.

## Real LAN browser verification

Use Windows Chrome against the real Pi LAN address, not a local substitute.

- Administration renders with readable controls; refresh runtime status and
  open/close Plugin Manager. Version0.1.304 reports healthy. No settings are saved
  and no repository/plugin is installed, adopted, deactivated or removed.
- Ordinary `/hub` correctly routes directly to the sole active Editor.
  `/hub?select=1&language=de` displays the real Hub, reference plugin image,
  capabilities and correct LAN Editor link.
- Card Editor renders the palette, ready Expert controls and empty workspace.
  The existing no-HA-connection message is expected: no HA token/connection is
  configured on this fresh standalone test installation. No HA live-card or
  authenticated connection test is claimed. No field/draft/project is edited.
- Leave Administration, explicit Hub selection and Editor tabs open for the user.
  Save and visually inspect screenshots of all three surfaces outside Git.

The first Administration visit legitimately creates the previously absent
`/var/lib/atlas/admin-device.json`. Validate the exact expected version/UUID/date
schema and 0600 mode, then repeat the preservation comparison allowing only this
new installation identity. All previously existing state, projects/catalog,
unit and installation metadata still match, with only the intended env host
change. This first-visit initialization is not silently described as zero new
files. No raw tokens or identity values are printed in the evidence.

Final LAN health also succeeds from the PC. Remove only the dedicated temporary
authorized-key line after verification, preserving remaining bytes and file
owner/group/mode; normal password authentication configuration is unchanged.
Keep the LAN binding in place as requested. This does not qualify other browsers,
mobile layouts, HA connectivity, a host reboot or subsequent package updates.

Whitespace checks pass. No runtime build is needed for this evidence-only change;
the native full builds and installer regressions are recorded in Sprint9307.
