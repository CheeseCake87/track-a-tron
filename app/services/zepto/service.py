import requests as r

from app.sql import DBSession
from app.sql.queries.service import query_read_service
from app.sql.queries.service_zepto_log import query_create_zepto_log
from app.sql.queries.system_log import query_create_system_log
from .settings import ZeptoSettings


class ZeptoService:
    settings: ZeptoSettings

    def __init__(self, settings: ZeptoSettings = None):
        if settings:
            self.settings = settings
        else:
            self.settings = self._load_service_settings()

    def send(
        self, recipients: list[str], subject: str, body: str, reply_to: str = None
    ) -> bool:
        if not self.settings.disabled:
            _url = self.settings.api_url

            _payload = {
                "from": {"address": self.settings.sender},
                "to": [
                    {"email_address": {"address": recipient}}
                    for recipient in recipients
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

            if response.status_code == 200:
                with DBSession as s:
                    s.execute(
                        query_create_zepto_log(
                            to=", ".join(recipients),
                            reply_to=reply_to,
                            from_=self.settings.sender,
                            subject=subject,
                            body=body,
                            response=response.json(),
                        )
                    )
                    s.commit()
                return True

            with DBSession as s:
                s.execute(
                    query_create_system_log(
                        "Zepto service error",
                        response.content.decode("utf-8"),
                    )
                )
                s.commit()
                return False

        with DBSession as s:
            s.execute(
                query_create_system_log(
                    "Zepto service is disabled",
                    "Zepto service is disabled",
                )
            )
            s.commit()

        return False

    @staticmethod
    def _load_service_settings():
        with DBSession as s:
            result = s.execute(query_read_service("Zepto")).scalar_one_or_none()

            if not result:
                s.execute(
                    query_create_system_log(
                        "Zepto service not found", "Zepto service not found"
                    )
                )
                s.commit()

                return ZeptoSettings(
                    sender="",
                    api_url="",
                    token="",
                    disabled=True,
                )

        try:
            return ZeptoSettings(
                sender=result.data["sender"],
                api_url=result.data["api_url"],
                token=result.data["token"],
            )
        except KeyError:
            with DBSession as s:
                s.execute(
                    query_create_system_log(
                        "Zepto service key error",
                        "Zepto service settings are missing keys needed for operation",
                    )
                )
                s.commit()

            return ZeptoSettings(
                sender="",
                api_url="",
                token="",
                disabled=True,
            )
