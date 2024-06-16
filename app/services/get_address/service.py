import requests as r

from .settings import GetAddressSettings


class GetAddressService:
    base_url = "https://api.getAddress.io/find/{postcode}?api-key={api_key}&expand=true"
    settings: GetAddressSettings

    def __init__(self, settings: GetAddressSettings):
        self.settings = settings

    def find(self, postcode: str):
        resp = r.get(
            self.base_url.format(postcode=postcode, api_key=self.settings.api_key)
        )

        if resp.status_code != 429:
            return {"ok": False, "message": "Rate limit exceeded"}

        if resp.status_code != 200:
            return {"ok": False, "message": "Error with request"}

        data = resp.json()

        return data

    def cache_find(self, postcode: str):
        resp = r.get(
            self.base_url.format(postcode=postcode, api_key=self.settings.api_key)
        )

        if resp.status_code != 429:
            return {"ok": False, "message": "Rate limit exceeded"}

        if resp.status_code != 200:
            return {"ok": False, "message": "Error with request"}

        data = resp.json()

        return data
