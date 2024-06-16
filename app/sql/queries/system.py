from sqlalchemy import select, insert, update

from app import __version__
from app.sql.tables import System


def query_create_system():
    in_ = insert(System).values(version=__version__)
    return in_


def query_read_system():
    wh_ = (System.system_id == 1,)
    se_ = select(System).where(*wh_)
    return se_


def query_update_system_version():
    wh_ = (System.system_id == 1,)
    up_ = update(System).where(*wh_).values(version=__version__)
    return up_


def query_update_system_installation_complete():
    wh_ = (System.system_id == 1,)
    up_ = update(System).where(*wh_).values(installation_complete=True)
    return up_
