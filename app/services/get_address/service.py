import typing as t

import requests as r
from app.api.system.query.system_cache_service_get_address import (
    query_create_cache_entry,
    query_read_cache_entry,
    query_update_cache_entry,
)
from app.api.system.query.system_service import query_read_service
from .settings import GetAddressSettings
from ... import logging


class GetAddressService:
    base_url = "https://api.getAddress.io/find/{postcode}?api-key={api_key}&expand=true"
    settings: GetAddressSettings

    def __init__(self, settings: GetAddressSettings = None):
        if settings:
            self.settings = settings
        else:
            self.settings = self._load_service_settings()

    def find(self, postcode: str, refresh_cache: bool = False) -> tuple[bool, t.Union[str, dict]]:
        postcode = postcode.replace(" ", "").upper()

        if not self.settings.disabled:
            cache_found, cache = self._search_cache(postcode)

            # Cache found, return cache
            if cache_found:

                # Refresh requested
                if refresh_cache:
                    successful, data = self._do_request(postcode)

                    if successful:
                        query_update_cache_entry(postcode, data)
                        return True, data

                    return False, data

                return True, cache

            # Cache not found, make request
            successful, data = self._do_request(postcode)
            if successful:
                query_create_cache_entry(postcode, data)
                return True, data

            return False, data

        logging.system_database_log("Postcode Lookup Service", "Service is disabled")
        return False, "Service is disabled"

    @staticmethod
    def _search_cache(postcode: str) -> t.Tuple[bool, t.Union[dict, str]]:
        search_cache = query_read_cache_entry(postcode)

        if search_cache:
            return True, search_cache.cache

        return False, "Cache not found"

    def _do_request(self, postcode: str) -> t.Tuple[bool, t.Union[dict, str]]:
        resp = r.get(
            self.base_url.format(postcode=postcode, api_key=self.settings.api_key)
        )

        if resp.status_code == 429:
            logging.system_database_log(
                "Postcode Lookup Service", "Rate limit exceeded"
            )
            return False, "Rate limit exceeded"

        if resp.status_code != 200:
            logging.system_database_log(
                "Postcode Lookup Service", f"Error: {resp.content.decode('utf-8')}"
            )
            return False, resp.content.decode("utf-8")

        return True, resp.json()

    def _load_service_settings(self) -> GetAddressSettings:
        get_address_service = query_read_service("get_address")

        if not get_address_service:
            logging.system_database_log(
                "getAddress.io",
                "getAddress.io service not found",
            )
            return self._disabled_service

        try:
            return GetAddressSettings(
                api_key=get_address_service.data["api_key"],
                administration_key=get_address_service.data["administration_key"],
                disabled=False,
            )
        except KeyError:
            logging.system_database_log(
                "getAddress.io",
                "getAddress.io service settings is missing keys needed for operation",
            )
            return self._disabled_service

    @property
    def _disabled_service(self) -> GetAddressSettings:
        return GetAddressSettings(
            api_key="",
            administration_key="",
            disabled=True,
        )
