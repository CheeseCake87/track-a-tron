import requests as r
from app import logging
from app.api.system.query.system_service import query_read_service
from .settings import ZeptoSettings


class ZeptoService:
    settings: ZeptoSettings

    def __init__(self, settings: ZeptoSettings = None):
        if settings:
            self.settings = settings
        else:
            self.settings = self._load_service_settings()

    def send(
            self, recipients: list[str], subject: str, html_body: str, reply_to: str = None
    ) -> bool:
        if not self.settings.disabled:
            response = r.request(
                "POST",
                self.settings.api_url,
                headers={
                    "accept": "application/json",
                    "content-type": "application/json",
                    "authorization": self.settings.token,
                },
                json={
                    "from": {"address": self.settings.sender},
                    "to": [
                        {"email_address": {"address": recipient}}
                        for recipient in recipients
                    ],
                    "reply_to": [{"address": reply_to, "name": reply_to}]
                    if reply_to
                    else None,
                    "subject": subject,
                    "htmlbody": html_body,
                },
            )

            if response.status_code == 200:
                logging.zepto_database_log(
                    to=", ".join(recipients),
                    reply_to=reply_to,
                    from_=self.settings.sender,
                    subject=subject,
                    body=html_body,
                    response=response.json(),
                )
                return True

            logging.system_database_log(
                "Zepto",
                f"Error: {response.content.decode('utf-8')}",
            )
            return False

        logging.system_database_log(
            "Zepto",
            "Zepto service is disabled",
        )
        return False

    def _load_service_settings(self):
        zepto_service = query_read_service("zepto")

        if not zepto_service:
            logging.system_database_log(
                "Zepto",
                "Zepto service not found",
            )
            return self._disabled_service

        try:
            return ZeptoSettings(
                sender=zepto_service.data["sender"],
                api_url=zepto_service.data["api_url"],
                token=zepto_service.data["token"],
            )
        except KeyError:
            logging.system_database_log(
                "Zepto",
                "Zepto service settings are missing keys needed for operation",
            )
            return self._disabled_service

    @property
    def _disabled_service(self):
        return ZeptoSettings(
            sender="",
            api_url="",
            token="",
            disabled=True,
        )
