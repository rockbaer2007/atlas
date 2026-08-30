from __future__ import annotations

from homeassistant import config_entries
import voluptuous as vol

from .const import (
    CONF_SHOW_IN_SIDEBAR,
    CONF_SHOW_UPDATE_HINT,
    DEFAULT_SHOW_IN_SIDEBAR,
    DEFAULT_SHOW_UPDATE_HINT,
    DOMAIN,
)


class TabbedCardV2ConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    VERSION = 1

    @staticmethod
    def async_get_options_flow(config_entry):
        return TabbedCardV2OptionsFlow(config_entry)

    async def async_step_user(self, user_input=None):
        await self.async_set_unique_id(DOMAIN)
        self._abort_if_unique_id_configured()

        return self.async_create_entry(
            title="Tabbed Card V2 Editor",
            data={},
            options={
                CONF_SHOW_IN_SIDEBAR: DEFAULT_SHOW_IN_SIDEBAR,
                CONF_SHOW_UPDATE_HINT: DEFAULT_SHOW_UPDATE_HINT,
            },
        )


class TabbedCardV2OptionsFlow(config_entries.OptionsFlow):
    def __init__(self, config_entry):
        self._config_entry = config_entry

    async def async_step_init(self, user_input=None):
        if user_input is not None:
            return self.async_create_entry(title="", data=user_input)

        options = self._config_entry.options
        return self.async_show_form(
            step_id="init",
            data_schema=vol.Schema(
                {
                    vol.Optional(
                        CONF_SHOW_IN_SIDEBAR,
                        default=options.get(CONF_SHOW_IN_SIDEBAR, DEFAULT_SHOW_IN_SIDEBAR),
                    ): bool,
                    vol.Optional(
                        CONF_SHOW_UPDATE_HINT,
                        default=options.get(CONF_SHOW_UPDATE_HINT, DEFAULT_SHOW_UPDATE_HINT),
                    ): bool,
                }
            ),
        )
