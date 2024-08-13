import typing as t

import sqlalchemy as s
from app.api.system.models import SystemLog
from app.extensions import db


def query_read_all_system_logs() -> t.List[SystemLog]:
    se_ = s.select(SystemLog).order_by(SystemLog.created)
    re_ = db.session.execute(se_).scalars().all()
    return re_


__all__ = [
    "query_read_all_system_logs",
]
