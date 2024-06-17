from sqlalchemy import select, insert, update

from app.sql.tables import Service
from app.utilities import DatetimeDeltaMC


def query_create_service(category: str, name: str, data: dict, enabled: bool = False):
    in_ = insert(Service).values(
        category=category, name=name, data=data, enabled=enabled, created=DatetimeDeltaMC().datetime,
    )
    return in_


def query_read_all_services():
    se_ = select(Service)
    return se_


def query_read_service(name: str):
    wh_ = (Service.name == name,)
    se_ = select(Service).where(*wh_)
    return se_


def query_update_service(name: str, enabled: bool, data: dict):
    wh_ = (Service.name == name,)
    up_ = update(Service).where(*wh_).values(data=data, enabled=enabled)
    return up_


def query_update_service_enable(name: str, enabled: bool):
    wh_ = (Service.name == name,)
    up_ = update(Service).where(*wh_).values(enabled=enabled)
    return up_
