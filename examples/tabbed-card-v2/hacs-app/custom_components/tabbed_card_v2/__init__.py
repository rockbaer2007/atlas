from pathlib import Path

from homeassistant.components import panel_custom
from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant

from .const import DOMAIN, PANEL_ICON, PANEL_TITLE, PANEL_URL_PATH

FRONTEND_PATH = Path(__file__).parent / "frontend"


async def async_setup(hass: HomeAssistant, config: dict) -> bool:
    if DOMAIN in config:
        await _async_register_panel(hass)
    return True


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    await _async_register_panel(hass)
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    return True


async def _async_register_panel(hass: HomeAssistant) -> None:
    if hass.data.get(DOMAIN, {}).get("panel_registered"):
        return

    await hass.http.async_register_static_paths(
        [
            StaticPathConfig(
                f"/{DOMAIN}/frontend",
                str(FRONTEND_PATH),
                cache_headers=False,
            )
        ]
    )

    await panel_custom.async_register_panel(
        hass=hass,
        frontend_url_path=PANEL_URL_PATH,
        webcomponent_name="tabbed-card-v2-panel",
        module_url=f"/{DOMAIN}/frontend/tabbed-card-v2-panel.js",
        sidebar_title=PANEL_TITLE,
        sidebar_icon=PANEL_ICON,
        require_admin=False,
        config={
            "cardResourceUrl": f"/{DOMAIN}/frontend/tabbed-card-v2.js",
            "hacsRepository": "https://github.com/rockbaer2007/tabbed-card-v2",
        },
    )

    hass.data.setdefault(DOMAIN, {})["panel_registered"] = True
