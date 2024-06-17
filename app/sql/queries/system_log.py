from sqlalchemy import select, insert, delete

from app.sql.tables import SystemLog
from app.utilities import DatetimeDeltaMC


def query_create_system_log(subject: str, log: str):
    in_ = insert(SystemLog).values(subject=subject, log=log, created=DatetimeDeltaMC().datetime,)
    return in_


def query_read_system_log(system_log_id: int):
    wh_ = (SystemLog.system_log_id == system_log_id,)
    se_ = select(SystemLog).where(*wh_)
    return se_


def query_read_all_system_logs():
    se_ = select(SystemLog).order_by(SystemLog.created)
    return se_


def query_delete_system_log(system_log_id: int):
    wh_ = (SystemLog.system_log_id == system_log_id,)
    de_ = delete(SystemLog).where(*wh_)
    return de_


def query_delete_all_system_logs():
    de_ = delete(SystemLog)
    return de_
