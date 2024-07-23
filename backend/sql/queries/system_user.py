import typing as t

from sqlalchemy import select, insert, update

from backend.sql.tables import SystemUser
from backend.utilities import DatetimeDeltaMC


def query_create_system_user(
        display_name: str,
        username: str,
        password: str,
        salt: str,
        private_key: str,
        user_type: t.Literal["user", "manager", "admin"],
        email: str = None,
        sms: str = None,
):
    extras = {}
    if email:
        extras["email"] = email
    if sms:
        extras["sms"] = sms

    in_ = (
        insert(SystemUser)
        .values(
            display_name=display_name,
            username=username,
            password=password,
            salt=salt,
            private_key=private_key,
            user_type=user_type,
            created=DatetimeDeltaMC().datetime,
            **extras
        )
        .returning(SystemUser.user_id)
    )
    return in_


def query_read_system_user_by_user_id(user_id: int):
    wh_ = (SystemUser.user_id == user_id,)
    se_ = select(SystemUser).where(*wh_)
    return se_


def query_read_system_user_by_username(username: str):
    wh_ = (SystemUser.username == username,)
    se_ = select(SystemUser).where(*wh_)
    return se_


def query_read_system_user(where: dict):
    wh_ = []
    for k, v in where.items():
        wh_.append(getattr(SystemUser, k) == v)

    se_ = select(SystemUser).where(*wh_)
    return se_


def query_read_all_system_users():
    se_ = (
        select(SystemUser)
        .where(SystemUser.deleted == False)  # noqa
        .order_by(SystemUser.user_id)
    )
    return se_


def query_update_system_user(
        user_id: int, values: dict, ignore_fields: list[str] = None
):
    if not ignore_fields:
        ignore_fields = []
    wh_ = (SystemUser.user_id == user_id,)
    up_ = (
        update(SystemUser)
        .where(*wh_)
        .values({k: v for k, v in values.items() if k not in ignore_fields or []})
        .returning(SystemUser)
    )
    return up_
