import requests as r

from app.sql.queries.service_get_address_cache import (
    query_create_cache_entry,
    query_read_cache_entry,
    query_update_cache_entry,
)
from app.sql.queries.system_log import query_create_system_log
from app.sql.sessions import DBSession
from .settings import GetAddressSettings


class GetAddressService:
    base_url = "https://api.getAddress.io/find/{postcode}?api-key={api_key}&expand=true"
    settings: GetAddressSettings

    def __init__(self, settings: GetAddressSettings):
        self.settings = settings

    def find(self, postcode: str) -> dict:
        resp = r.get(
            self.base_url.format(postcode=postcode, api_key=self.settings.api_key)
        )

        if resp.status_code != 429:
            with DBSession as s:
                s.execute(
                    query_create_system_log(
                        "getAddress.io : Rate limit exceeded",
                        "getAddress.io : Rate limit exceeded",
                    )
                )
                s.commit()

            return {"ok": False, "message": "Rate limit exceeded"}

        if resp.status_code != 200:
            with DBSession as s:
                s.execute(
                    query_create_system_log(
                        "getAddress.io : Error with request",
                        resp.content.decode("utf-8"),
                    )
                )
                s.commit()

            return {"ok": False, "message": "Error with request"}

        data = resp.json()

        return {"ok": True, "data": data}

    def cache_find(self, postcode: str, refresh_cache: bool = False) -> dict:
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

            return data

        with DBSession as s:
            result = s.execute(query_read_cache_entry(postcode)).scalar_one_or_none()
            if result:
                return {"ok": True, "data": result.cache}

            data = self.find(postcode)

            if data.get("ok"):
                s.execute(query_create_cache_entry(postcode, data))
                s.commit()
                return {"ok": True, "data": data}

            return data
