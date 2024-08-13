import typing as t

import sqlalchemy as s
from app.api.system.models import SystemLogServiceSmtp
from app.extensions import db


def query_read_all_smtp_logs() -> t.List[SystemLogServiceSmtp]:
    se_ = s.select(SystemLogServiceSmtp).order_by(SystemLogServiceSmtp.created)
    re_ = db.session.execute(se_).scalars().all()
    return re_
