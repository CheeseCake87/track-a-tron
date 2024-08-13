import typing as t

import sqlalchemy as s
from app.api.system.models import SystemService
from app.extensions import db


def query_create_service(
        category: str,
        name: str,
        data: dict,
        enabled: bool = False,
        _auto_commit: bool = True,
        _flush: bool = True,
) -> SystemService:
    in_ = (
        s.insert(SystemService)
        .values(category=category, name=name, data=data, enabled=enabled)
        .returning(SystemService)
    )
    re_ = db.session.execute(in_).scalar()

    if _auto_commit:
        db.session.commit()
    else:
        if _flush:
            db.session.flush()

    return re_


def query_read_all_services() -> t.List[SystemService]:
    se_ = s.select(SystemService)
    re_ = db.session.execute(se_).scalars().all()
    return re_


def query_read_service(name: str) -> SystemService | None:
    wh_ = (SystemService.name == name,)
    se_ = s.select(SystemService).where(*wh_)
    re_ = db.session.execute(se_).scalar()
    return re_


def query_update_service(
        name: str,
        enabled: bool,
        data: dict,
        _auto_commit: bool = True,
        _flush: bool = True,
) -> SystemService | None:
    wh_ = (SystemService.name == name,)
    up_ = (
        s.update(SystemService)
        .where(*wh_)
        .values(data=data, enabled=enabled)
        .returning(SystemService)
    )
    re_ = db.session.execute(up_).scalar()

    if _auto_commit:
        db.session.commit()
    else:
        if _flush:
            db.session.flush()

    return re_


def query_update_service_enable(
        name: str, enabled: bool, _auto_commit: bool = True, _flush: bool = True
) -> SystemService | None:
    wh_ = (SystemService.name == name,)
    up_ = (
        s.update(SystemService)
        .where(*wh_)
        .values(enabled=enabled)
        .returning(SystemService)
    )
    re_ = db.session.execute(up_).scalar()

    if _auto_commit:
        db.session.commit()
    else:
        if _flush:
            db.session.flush()

    return re_
