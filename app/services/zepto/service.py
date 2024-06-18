import requests as r

from app.sql import DBSession
from app.sql.queries.system_service import query_read_service
from app.sql.queries.system_service_zepto_log import query_create_zepto_log
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
                with DBSession as s:
                    s.execute(
                        query_create_zepto_log(
                            to=", ".join(recipients),
                            reply_to=reply_to,
                            from_=self.settings.sender,
                            subject=subject,
                            body=html_body,
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

    def _load_service_settings(self):
        with DBSession as s:
            result = s.execute(query_read_service("zepto")).scalar_one_or_none()

            if not result:
                s.execute(
                    query_create_system_log(
                        "Zepto service not found", "Zepto service not found"
                    )
                )
                s.commit()

                return self._disabled_service

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

            return self._disabled_service

    @property
    def _disabled_service(self):
        return ZeptoSettings(
            sender="",
            api_url="",
            token="",
            disabled=True,
        )
