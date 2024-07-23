from sqlalchemy import select, insert

from app.sql.tables import SystemServiceZeptoLog
from app.utilities import DatetimeDeltaMC


def query_create_zepto_log(
    to: str,
    reply_to: str,
    from_: str,
    subject: str,
    body: str,
    response: dict = None,
):
    in_ = (
        insert(SystemServiceZeptoLog)
        .values(
            to=to,
            reply_to=reply_to,
            from_=from_,
            subject=subject,
            body=body,
            response=response,
            created=DatetimeDeltaMC().datetime,
        )
        .returning(SystemServiceZeptoLog)
    )
    return in_


def query_read_all_zepto_logs():
    se_ = select(SystemServiceZeptoLog).order_by(SystemServiceZeptoLog.created)
    return se_
