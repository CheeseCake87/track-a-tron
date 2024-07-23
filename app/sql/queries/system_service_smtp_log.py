from sqlalchemy import select, insert

from app.sql.tables import SystemServiceSmtpLog
from app.utilities import DatetimeDeltaMC


def query_create_smtp_log(
    to: str,
    reply_to: str,
    from_: str,
    subject: str,
    body: str,
    response: dict = None,
):
    in_ = (
        insert(SystemServiceSmtpLog)
        .values(
            to=to,
            reply_to=reply_to,
            from_=from_,
            subject=subject,
            body=body,
            response=response,
            created=DatetimeDeltaMC().datetime,
        )
        .returning(SystemServiceSmtpLog)
    )
    return in_


def query_read_all_smtp_logs():
    se_ = select(SystemServiceSmtpLog).order_by(SystemServiceSmtpLog.created)
    return se_
