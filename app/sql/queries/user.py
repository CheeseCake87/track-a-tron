import typing as t

from sqlalchemy import select, insert, update

from app.sql.tables import User


def query_create_user(
        display_name: str,
        username: str,
        password: str,
        salt: str,
        private_key: str,
        user_type: t.Literal["user", "manager", "admin"],
):
    in_ = (
        insert(User)
        .values(
            display_name=display_name,
            username=username,
            password=password,
            salt=salt,
            private_key=private_key,
            user_type=user_type,
        )
        .returning(User.user_id)
    )
    return in_


def query_read_user_by_user_id(user_id: int):
    wh_ = (User.user_id == user_id,)
    se_ = select(User).where(*wh_)
    return se_


def query_read_user_by_username(username: str):
    wh_ = (User.username == username,)
    se_ = select(User).where(*wh_)
    return se_


def query_read_user(where: dict):
    wh_ = []
    for k, v in where.items():
        wh_.append(getattr(User, k) == v)

    se_ = select(User).where(*wh_)
    return se_


def query_read_all_users():
    se_ = select(User).order_by(User.user_id)
    return se_


def query_update_user(user_id: int, values: dict, ignore_fields: list[str] = None):
    wh_ = (User.user_id == user_id,)
    up_ = (
        update(User)
        .where(*wh_)
        .values({k: v for k, v in values.items() if k not in ignore_fields or []})
        .returning(User)
    )
    return up_
