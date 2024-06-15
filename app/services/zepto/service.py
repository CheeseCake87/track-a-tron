import requests as r

from .settings import ZeptoSettings


class ZeptoService:
    settings: ZeptoSettings

    def __init__(self, settings: ZeptoSettings):
        self.settings = settings

    def send(
        self, recipients: list[str], subject: str, body: str, reply_to: str = None
    ):
        _url = self.settings.api_url

        _payload = {
            "from": {"address": self.settings.sender},
            "to": [
                {"email_address": {"address": recipient}} for recipient in recipients
            ],
            "subject": subject,
            "htmlbody": body,
        }

        if reply_to:
            _payload["reply_to"] = [{"address": reply_to, "name": reply_to}]

        _headers = {
            "accept": "application/json",
            "content-type": "application/json",
            "authorization": self.settings.token,
        }

        response = r.request("POST", _url, headers=_headers, json=_payload)

        if self.settings.dev_mode:
            print("ZeptoEmailService")
            print("Sender", self.settings.sender)
            print("API URL", self.settings.api_url)
            print("Recipients", recipients)
            print("Subject", subject)
            print("Body", body)
            print("----")
            print(response.json())
            return
