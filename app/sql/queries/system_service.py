from sqlalchemy import select, insert, update

from app.sql.tables import SystemService
from app.utilities import DatetimeDeltaMC


def query_create_service(category: str, name: str, data: dict, enabled: bool = False):
    in_ = insert(SystemService).values(
        category=category, name=name, data=data, enabled=enabled, created=DatetimeDeltaMC().datetime,
    )
    return in_


def query_read_all_services():
    se_ = select(SystemService)
    return se_


def query_read_service(name: str):
    wh_ = (SystemService.name == name,)
    se_ = select(SystemService).where(*wh_)
    return se_


def query_update_service(name: str, enabled: bool, data: dict):
    wh_ = (SystemService.name == name,)
    up_ = update(SystemService).where(*wh_).values(data=data, enabled=enabled)
    return up_


def query_update_service_enable(name: str, enabled: bool):
    wh_ = (SystemService.name == name,)
    up_ = update(SystemService).where(*wh_).values(enabled=enabled)
    return up_
