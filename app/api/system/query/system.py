import sqlalchemy as s
from app.api.system.models import System
from app.extensions import db
from app.utilities import DatetimeDeltaMC


def query_create_system() -> None:
    from app import __version__

    in_ = s.insert(System).values(
        version=__version__,
        created=DatetimeDeltaMC().datetime,
    )
    db.session.execute(in_)
    db.session.commit()


def query_read_system() -> System | None:
    wh_ = (System.system_id == 1,)
    se_ = s.select(System).where(*wh_)
    re_ = db.session.execute(se_).scalar()
    return re_


def query_update_system_version() -> None:
    from app import __version__

    wh_ = (System.system_id == 1,)
    up_ = s.update(System).where(*wh_).values(version=__version__)
    db.session.execute(up_)
    db.session.commit()


def query_update_system_installation_complete() -> None:
    wh_ = (System.system_id == 1,)
    up_ = s.update(System).where(*wh_).values(installation_complete=True)
    db.session.execute(up_)
    db.session.commit()


__all__ = [
    "query_create_system",
    "query_read_system",
    "query_update_system_version",
    "query_update_system_installation_complete",
]
