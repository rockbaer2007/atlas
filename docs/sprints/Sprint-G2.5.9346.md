# Sprint G2.5.9346 - Isolated Card-Mod and UIX CSS rendering

2026-10-17. Qualification only, App0.1.315 unchanged. No release or runtime
code change. Pi5 and Proxmox were not accessed or modified for this task.

## Backup and isolated setup

- Private evidence: source/backups/atlas-css-rendering-20261017. Git bundles
  of ATLAS and documentation, roadmap copy, original runtime copy and full
  baseline HA configuration archive retained before test mutations.
- HA baseline archive SHA256:
  a8065da18f2384306c59217442ea8433873bf4a849114b56fcf3e7e427532a54.
- Two new Docker Core2026.10.1 instances on loopback4246/4248, own volumes;
  existing baseline directories and original UI exports never modified.
  Mushroom5.2.3. No Supervisor/full-HAOS restoration claim.
- Card-Mod4.2.1 official tagged card-mod.js SHA256:
  5e7e71ad61796f59070f8c4621e69fa8e71a9864d0be0922bc4dbc72f990cd35.
- UIX8.4.0 official tagged source archive SHA256:
  aac07c87681117fd06a85a81a760b518f694e21a79f7daac6906e094161355e0.
  Manual custom_components/uix installation and successful integration config
  flow; frontend module managed by integration. Card-Mod uses extra_module_url.
  Engines kept separate, following UIX's migration instructions.
- Own YAML dashboard added; original dashboard and existing resource files
  retained. Only input_boolean.atlas_roundtrip_lamp fixture service calls.
  Loopback published ports; no physical devices or native credentials used.

## Actual browser and computed CSS qualification

- Install scripts/locales from the previous genuine UI-exported Card-Mod/YAML
  and UIX/JSON bundles. Compare generated custom-card children against native
  cards with identical configuration. Read actual DOM getComputedStyle values,
  including nested shadow roots, rather than merely inspecting script source.
- Original fixture reveals two problems with its CSS example, not ATLAS data
  loss: CSS Jinja using bare entity fails with UndefinedError, and the old
  mushroom-state-info$ node does not exist in Mushroom5.2.3.
- Separate positive copies use config.entity only inside CSS templates and
  ha-tile-info$ -> .info for shadow styles. Mushroom primary/icon/color keep
  their own entity expressions. Original fixtures/archives remain unchanged.
  Positive scripts/locales are regenerated through the existing public ATLAS
  HACS bundle generator from updated rawCard AND matching plan entries; this
  phase is not claimed as a fresh manual UI export/import roundtrip.
- A changed script requires a new resource query to avoid stale browser module
  cache. Restart both own HA containers to adopt the new resource configuration,
  then reload tabs. No ATLAS runtime workaround or CSS injection was needed.
- In both engines, generated AND native Mushroom cards match: text color and
  4px border blue rgb(0,0,255) -> red rgb(255,0,0) -> blue on helper changes,
  without reload. Current shadow selector produces 3px letter spacing in both.
- UIX-only card: 17px radius under UIX; unchanged12px under Card-Mod.
  Conflicting blocks: Card-Mod uses31px, UIX uses37px from uix. ATLAS preserves
  both blocks and does not merge their CSS. This matches upstream precedence.
- Core native reference: rgb(12,34,56) background, 6px rgb(210,120,30) border,
  23px radius. Unstyled same-entity cards retain12px radius, default foreground
  and1px border; styles do not leak across cards.
- uix_style fixture's7px padding is not applied by either tested engine: actual
  padding matches the unstyled button (19.6719px 0px at this viewport). Its old
  display name UIX legacy never proved a supported alias. Keep import data but
  use the documented uix.style key for execution.
- Corrected styles survive reload and own-container restart. Final off state
  restored before stopping containers. Screenshots cardmod-off.png / uix-on.png
  and original negative/positive DOM measurements retained privately.

## Preservation, documentation and checks

- Private verify.mjs validates304 assertions across both engines and off/on/
  off-return/reload measurements plus preservation. Each instance retains all37
  original www files byte-for-byte and the original ui-lovelace.yaml exactly.
- All28 baseline ATLAS runtime files, including6projects, remain byte-identical
  to the saved runtime copy. No ATLAS app server or plugin update required.
  The added integration/resources/dashboard belong only to new fixture volumes.
- Both own browser tabs closed and both containers stopped. No existing backups
  deleted; test copies retained for reproducibility.
- DE/EN/FR public Card Editor and development status document tested versions,
  working CSS/Jinja example, current shadow selector, uix_style limits, block
  precedence, setup requirements and source links. ROADMAP records completion
  and keeps native CSS qualification and other versions/themes open.
- npm run docs:build passes (existing large-chunk advisory only); both Git
  diff --check checks pass. Runtime build/test suite not repeated because only
  qualification records and documentation changed.
- No claim for arbitrary CSS, every theme, UIX Forge/Broker, all Mushroom
  versions, mobile rendering or native styling-extension installations.

Primary references:

- https://github.com/thomasloven/lovelace-card-mod/tree/v4.2.1
- https://github.com/Lint-Free-Technology/uix/blob/v8.4.0/docs/source/quick-start.md
- https://github.com/Lint-Free-Technology/uix/blob/v8.4.0/docs/source/faq.md
- https://github.com/Lint-Free-Technology/uix/blob/v8.4.0/docs/source/using/templates.md
