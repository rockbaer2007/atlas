from pathlib import Path

from homeassistant.components import frontend
from homeassistant.components import panel_custom
from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant

from .const import (
    CONF_SHOW_IN_SIDEBAR,
    CONF_SHOW_UPDATE_HINT,
    DEFAULT_SHOW_IN_SIDEBAR,
    DEFAULT_SHOW_UPDATE_HINT,
    DOMAIN,
    PANEL_ICON,
    PANEL_TITLE,
    PANEL_URL_PATH,
)

FRONTEND_PATH = Path(__file__).parent / "frontend"


async def async_setup(hass: HomeAssistant, config: dict) -> bool:
    if DOMAIN in config:
        await _async_register_static_paths(hass)
        await _async_register_panel(hass, {})
    return True


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    await _async_register_static_paths(hass)
    await _async_apply_panel_options(hass, entry.options)
    entry.async_on_unload(entry.add_update_listener(_async_update_listener))
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    frontend.async_remove_panel(hass, PANEL_URL_PATH, warn_if_unknown=False)
    hass.data.setdefault(DOMAIN, {})["panel_registered"] = False
    return True


async def _async_update_listener(hass: HomeAssistant, entry: ConfigEntry) -> None:
    frontend.async_remove_panel(hass, PANEL_URL_PATH, warn_if_unknown=False)
    hass.data.setdefault(DOMAIN, {})["panel_registered"] = False
    await _async_apply_panel_options(hass, entry.options)


async def _async_register_static_paths(hass: HomeAssistant) -> None:
    if hass.data.get(DOMAIN, {}).get("static_registered"):
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
    hass.data.setdefault(DOMAIN, {})["static_registered"] = True


async def _async_apply_panel_options(hass: HomeAssistant, options: dict) -> None:
    show_in_sidebar = options.get(CONF_SHOW_IN_SIDEBAR, DEFAULT_SHOW_IN_SIDEBAR)
    if not show_in_sidebar:
        frontend.async_remove_panel(hass, PANEL_URL_PATH, warn_if_unknown=False)
        hass.data.setdefault(DOMAIN, {})["panel_registered"] = False
        return

    await _async_register_panel(hass, options)


async def _async_register_panel(hass: HomeAssistant, options: dict) -> None:
    if hass.data.get(DOMAIN, {}).get("panel_registered"):
        return

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
            "showUpdateHint": options.get(
                CONF_SHOW_UPDATE_HINT,
                DEFAULT_SHOW_UPDATE_HINT,
            ),
        },
    )

    hass.data.setdefault(DOMAIN, {})["panel_registered"] = True
