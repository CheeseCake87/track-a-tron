from sqlalchemy import select, insert

from app.sql.tables import ServiceSmtpLog


def query_create_smtp_log(
    to: str,
    reply_to: str,
    from_: str,
    subject: str,
    body: str,
    response: dict = None,
):
    in_ = (
        insert(ServiceSmtpLog)
        .values(
            to=to,
            reply_to=reply_to,
            from_=from_,
            subject=subject,
            body=body,
            response=response,
        )
        .returning(ServiceSmtpLog)
    )
    return in_


def query_read_all_smtp_logs():
    se_ = select(ServiceSmtpLog).order_by(ServiceSmtpLog.created)
    return se_
