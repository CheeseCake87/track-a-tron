import requests as r

from app.sql.queries.service_get_address_cache import (
    query_create_cache_entry,
    query_read_cache_entry,
    query_update_cache_entry,
)
from app.sql.sessions import DBSession
from app.utilities.system_log import system_log_in_session, system_log
from .settings import GetAddressSettings
from ...sql.queries.service import query_read_service


class GetAddressService:
    base_url = "https://api.getAddress.io/find/{postcode}?api-key={api_key}&expand=true"
    settings: GetAddressSettings

    def __init__(self, settings: GetAddressSettings = None):
        if settings:
            self.settings = settings
        else:
            self.settings = self._load_service_settings()

    def find(self, postcode: str) -> dict:
        if not self.settings.disabled:
            resp = r.get(
                self.base_url.format(postcode=postcode, api_key=self.settings.api_key)
            )

            if resp.status_code != 429:
                system_log(
                    "getAddress.io : Rate limit exceeded",
                    "getAddress.io : Rate limit exceeded",
                )

                return {"ok": False, "message": "Rate limit exceeded"}

            if resp.status_code != 200:
                system_log(
                    "getAddress.io : Error with request", resp.content.decode("utf-8")
                )

                return {"ok": False, "message": "Error with request"}

            data = resp.json()

            return {"ok": True, "data": data}

        system_log(
            "getAddress.io service is disabled",
            "getAddress.io service is disabled",
        )
        return {"ok": False, "message": "Service is disabled"}

    def cache_find(self, postcode: str, refresh_cache: bool = False) -> dict:
        if not self.settings.disabled:
            if refresh_cache:
                data = self.find(postcode)

                if data.get("ok"):
                    with DBSession as s:
                        result = s.execute(
                            query_read_cache_entry(postcode)
                        ).scalar_one_or_none()
                        if result:
                            s.execute(query_update_cache_entry(postcode, data))
                            return {"ok": True, "data": data}

                        s.execute(query_create_cache_entry(postcode, data))
                        s.commit()
                        return {"ok": True, "data": data}

                return data  # Pass through the error from the find method

            with DBSession as s:
                result = s.execute(
                    query_read_cache_entry(postcode)
                ).scalar_one_or_none()
                if result:
                    return {"ok": True, "data": result.cache}

                data = self.find(postcode)

                if data.get("ok"):
                    s.execute(query_create_cache_entry(postcode, data))
                    s.commit()
                    return {"ok": True, "data": data}

                return data  # Pass through the error from the find method

        system_log(
            "getAddress.io service is disabled",
            "getAddress.io service is disabled",
        )
        return {"ok": False, "message": "Service is disabled"}

    def _load_service_settings(self) -> GetAddressSettings:
        with DBSession as s:
            result = s.execute(query_read_service("get_address")).scalar_one_or_none()

            if not result:
                system_log_in_session(
                    s,
                    "getAddress.io service not found",
                    "getAddress.io service not found",
                )
                return self._disabled_service

            try:
                return GetAddressSettings(
                    api_key=result.data["api_key"],
                    administration_key=result.data["administration_key"],
                    disabled=False,
                )
            except KeyError:
                system_log_in_session(
                    s,
                    "getAddress.io service key error",
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
