from app.api.system.models import SystemLog, SystemLogServiceSmtp, SystemLogServiceZepto
from app.extensions import db
from app.utilities import DatetimeDeltaMC
from flask import current_app


def system_database_log(subject: str, log_: str):
    with current_app.app_context():
        system_log = SystemLog(subject=subject, log=log_, created=DatetimeDeltaMC.datetime)
        db.session.add(system_log)
        db.session.commit()

        current_app.logger.debug(f"System Log - Subject: {subject}, Log: {log_}")
        return system_log


def zepto_database_log(
        to: str, reply_to: str, from_: str, subject: str, body: str, response: dict
):
    with current_app.app_context():
        zepto_log = SystemLogServiceZepto(
            to=to,
            reply_to=reply_to,
            from_=from_,
            subject=subject,
            body=body,
            response=response,
            created=DatetimeDeltaMC.datetime,
        )
        db.session.add(zepto_log)
        db.session.commit()

        current_app.logger.debug(f"Zepto Log - To: {to}, Response: {response}")
        return zepto_log


def smtp_database_log(
        to: str, reply_to: str, from_: str, subject: str, body: str
):
    with current_app.app_context():
        smtp_log = SystemLogServiceSmtp(
            to=to,
            reply_to=reply_to,
            from_=from_,
            subject=subject,
            body=body,
            created=DatetimeDeltaMC.datetime,
        )
        db.session.add(smtp_log)
        db.session.commit()

        current_app.logger.debug(f"Zepto Log - To: {to}, Subject: {subject}")
        return smtp_log


__all__ = ["system_database_log", "zepto_database_log", "smtp_database_log"]
