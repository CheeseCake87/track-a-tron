import typing as t

import sqlalchemy as s
from app.api.system.models import SystemUser
from app.extensions import db
from app.utilities import DatetimeDeltaMC


def query_create_system_user(
        display_name: str,
        username: str,
        password: str,
        salt: str,
        private_key: str,
        user_type: t.Literal["user", "manager", "admin"],
        email: str = None,
        sms: str = None,
        _auto_commit: bool = True,
        _flush: bool = True,
) -> int | None:
    extras = {}
    if email:
        extras["email"] = email
    if sms:
        extras["sms"] = sms
    se_ = (
        s.insert(SystemUser)
        .values(
            display_name=display_name,
            username=username,
            password=password,
            salt=salt,
            private_key=private_key,
            user_type=user_type,
            created=DatetimeDeltaMC().datetime,
            **extras,
        )
        .returning(SystemUser.user_id)
    )
    re_ = db.session.execute(se_).scalar()

    if _auto_commit:
        db.session.commit()
    else:
        if _flush:
            db.session.flush()

    return re_


def query_read_system_user_by_user_id(user_id: int) -> SystemUser | None:
    wh_ = (SystemUser.user_id == user_id,)
    se_ = s.select(SystemUser).where(*wh_)
    re_ = db.session.execute(se_).scalar()
    return re_


def query_read_system_user_by_username(username: str) -> SystemUser | None:
    wh_ = (SystemUser.username == username,)
    se_ = s.select(SystemUser).where(*wh_)
    re_ = db.session.execute(se_).scalar()
    return re_


def query_read_system_user(where: dict) -> SystemUser | None:
    wh_ = []
    for k, v in where.items():
        wh_.append(getattr(SystemUser, k) == v)

    se_ = s.select(SystemUser).where(*wh_)
    re_ = db.session.execute(se_).scalar()
    return re_


def query_read_all_system_users() -> t.List[SystemUser]:
    se_ = (
        s.select(SystemUser)
        .where(SystemUser.deleted == False)  # noqa
        .order_by(SystemUser.user_id)
    )
    re_ = db.session.execute(se_).scalars().all()
    return re_


def query_read_all_active_system_users() -> t.List[SystemUser]:
    se_ = (
        s.select(SystemUser)
        .where(SystemUser.deleted == False, SystemUser.disabled == False)  # noqa
        .order_by(SystemUser.display_name)
    )
    re_ = db.session.execute(se_).scalars().all()
    return re_


def query_update_system_user(
        user_id: int, values: dict, _auto_commit: bool = True, _flush: bool = True
) -> SystemUser | None:
    ignore_fields = {"user_id", "created", "password", "salt"}

    wh_ = (SystemUser.user_id == user_id,)
    up_ = (
        s.update(SystemUser)
        .where(*wh_)
        .values({k: v for k, v in values.items() if k not in ignore_fields or []})
        .returning(SystemUser)
    )
    re_ = db.session.execute(up_).scalar()

    if _auto_commit:
        db.session.commit()
    else:
        if _flush:
            db.session.flush()

    return re_


def query_update_system_user_password(
        user_id: int, password: str, salt: str, _auto_commit: bool = True, _flush: bool = True
) -> SystemUser | None:
    wh_ = (SystemUser.user_id == user_id,)
    up_ = (
        s.update(SystemUser)
        .where(*wh_)
        .values({"password": password, "salt": salt})
        .returning(SystemUser)
    )
    re_ = db.session.execute(up_).scalar()

    if _auto_commit:
        db.session.commit()
    else:
        if _flush:
            db.session.flush()

    return re_
