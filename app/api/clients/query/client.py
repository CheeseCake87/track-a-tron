import typing as t

import sqlalchemy as s
from app.api.clients.models import Client
from app.extensions import db
from app.utilities import DatetimeDeltaMC


def _client_where_clause(where: t.Dict[str, t.Any]) -> set:
    wh_ = set()
    for k, v in where.items():
        if k == "any_name":
            wh_.add(
                s.or_(
                    Client.business_name.ilike(f"%{v}%"),  # noqa
                    Client.first_name.ilike(f"%{v}%"),  # noqa
                    Client.last_name.ilike(f"%{v}%"),  # noqa
                )
            )
            continue

        if k == "any_phone":
            wh_.add(
                s.or_(
                    Client.phone.ilike(f"%{v}%"),  # noqa
                    Client.alt_phone.ilike(f"%{v}%"),  # noqa
                )
            )
            continue

        if k == "any_email":
            wh_.add(
                s.or_(
                    Client.email_address.ilike(f"%{v}%"),  # noqa
                    Client.alt_email_address.ilike(f"%{v}%"),  # noqa
                )
            )
            continue

        if not hasattr(Client, k):
            continue

        wh_.add(getattr(Client, k) == v)

    return wh_


def query_all_paged(
        limit: int, page: int, where: dict
) -> tuple[list[Client], int, int]:
    """
    Query all clients with pagination.

    return: tuple [ list[clients], client_count, pages ]
    """

    wh_ = _client_where_clause(where)

    client_count = db.session.execute(
        s.select(s.func.count(Client.client_id)).where(*wh_)
    ).scalar()

    pages = client_count // limit + 1

    clients = (
        s.execute(s.select(Client).where(*wh_).limit(limit).offset((page - 1) * limit))
        .scalars()
        .all()
    )

    return clients, client_count, pages


def query_read_client_using_client_id(client_id: int) -> Client | None:
    wh_ = (Client.client_id == client_id,)
    se_ = s.select(Client).where(*wh_)
    re_ = db.session.execute(se_).scalar()
    return re_


def query_search_client(where: t.Dict[str, t.Any]) -> t.List[Client]:
    if not isinstance(where, dict):
        return []

    if not where:
        return []

    wh_ = _client_where_clause(where)

    if "__limit__" in where:
        se_ = s.select(Client).where(*wh_).limit(where["__limit__"])
        re_ = db.session.execute(se_).scalars().all()
        return re_

    se_ = s.select(Client).where(*wh_)
    re_ = db.session.execute(se_).scalars().all()
    return re_


def query_create_client_auto_date(values: dict, _auto_commit: bool = True, _flush: bool = True) -> t.Union[
    Client, None]:
    ignore_fields = {"client_id", "created"}

    in_ = (
        s.insert(Client)
        .values(
            **{
                k: v
                for k, v in values.items()
                if hasattr(Client, k) and k not in ignore_fields and v != ""
            },
            created=DatetimeDeltaMC().datetime,
        )
        .returning(Client)
    )
    re_ = db.session.execute(in_).scalar()

    if _auto_commit:
        db.session.commit()
    else:
        if _flush:
            db.session.flush()

    return re_


def query_create_client(values: dict, _auto_commit: bool = True, _flush: bool = True) -> Client | None:
    ignore_fields = {"client_id"}
    in_ = (
        s.insert(Client)
        .values(
            **{
                k: v
                for k, v in values.items()
                if hasattr(Client, k) and k not in ignore_fields and v != ""
            }
        )
        .returning(Client)
    )
    re_ = db.session.execute(in_).scalar()

    if _auto_commit:
        db.session.commit()
    else:
        if _flush:
            db.session.flush()

    return re_


def query_update_client(
        client_id: int, values: dict, _auto_commit: bool = True, _flush: bool = True
) -> Client | None:
    ignore_fields = {"client_id", "created"}

    wh_ = (Client.client_id == client_id,)
    up_ = (
        s.update(Client)
        .where(*wh_)
        .values(
            {
                k: v
                for k, v in values.items()
                if hasattr(Client, k) and k not in ignore_fields
            }
        )
        .returning(Client)
    )
    re_ = db.session.execute(up_).scalar()

    if _auto_commit:
        db.session.commit()
    else:
        if _flush:
            db.session.flush()

    return re_
