import sqlalchemy as s
import typing as t
from app.api.system.models import SystemLogServiceZepto
from app.extensions import db


def query_read_all_zepto_logs() -> t.List[SystemLogServiceZepto]:
    se_ = s.select(SystemLogServiceZepto).order_by(SystemLogServiceZepto.created)
    re_ = db.session.execute(se_).scalars().all()
    return re_
