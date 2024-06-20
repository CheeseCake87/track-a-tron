from app.sql import GDBSession
from app.sql.queries.system_log import query_create_system_log


def system_log_in_session(session: GDBSession, subject, log):
    session.execute(query_create_system_log(subject, log))
    session.commit()


def system_log(subject, log):
    with GDBSession as s:
        system_log_in_session(s, subject, log)
