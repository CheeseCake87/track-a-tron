from sqlalchemy import select, insert

from app.sql.tables import ServiceZeptoLog
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
        insert(ServiceZeptoLog)
        .values(
            to=to,
            reply_to=reply_to,
            from_=from_,
            subject=subject,
            body=body,
            response=response,
            created=DatetimeDeltaMC().datetime,
        )
        .returning(ServiceZeptoLog)
    )
    return in_


def query_read_all_zepto_logs():
    se_ = select(ServiceZeptoLog).order_by(ServiceZeptoLog.created)
    return se_
