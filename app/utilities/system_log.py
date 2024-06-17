from app.sql import DBSession
from app.sql.queries.system_log import query_create_system_log


def system_log_in_session(session: DBSession, subject, log):
    session.execute(query_create_system_log(subject, log))
    session.commit()


def system_log(subject, log):
    with DBSession as s:
        system_log_in_session(s, subject, log)
