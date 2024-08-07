from sqlalchemy import func
from sqlalchemy import select, insert, update, or_

from app.sql.tables import Client
from app.utilities import DatetimeDeltaMC
from app.utilities import DatetimeDeltaMCTZU


def query_create_client(user_id: int, values: dict, ignore_fields: list[str] = None):
    in_ = (
        insert(Client)
        .values(
            **{
                k: v
                for k, v in values.items()
                if hasattr(Client, k) and k not in ignore_fields and v != ""
            },
            fk_user_id=user_id,
            created=DatetimeDeltaMC().datetime,
        )
        .returning(Client)
    )
    return in_


def query_read_client(where: dict):
    if not isinstance(where, dict):
        return None

    wh_ = []
    for k, v in where.items():
        if k == "any_name":
            wh_.append(
                or_(
                    Client.business_name.ilike(f"%{v}%"),
                    Client.first_name.ilike(f"%{v}%"),
                    Client.last_name.ilike(f"%{v}%"),
                )
            )
            continue

        if k == "any_phone":
            wh_.append(
                or_(Client.phone.ilike(f"%{v}%"), Client.alt_phone.ilike(f"%{v}%"))
            )
            continue

        if k == "any_email":
            wh_.append(
                or_(
                    Client.email_address.ilike(f"%{v}%"),
                    Client.alt_email_address.ilike(f"%{v}%"),
                )
            )
            continue

        if not hasattr(Client, k):
            continue

        wh_.append(getattr(Client, k) == v)

    if not wh_:
        return None

    if "__limit__" in where:
        se_ = select(Client).where(*wh_).limit(where["__limit__"])
        return se_

    se_ = select(Client).where(*wh_)
    return se_


def query_page_clients(
    where: dict,
    limit: int = 10,
    page: int = 1,
) -> tuple[select, select]:
    if page == 0:
        page = 1

    wh_arg = []
    for k, v in where.items():
        if k == "_in" and isinstance(v, dict):
            for in_key, in_val in v.items():
                if isinstance(in_val, list):
                    if hasattr(Client, in_key):
                        wh_arg.append(getattr(Client, in_key).in_(in_val))
                        continue

        if k == "any_name":
            wh_arg.append(
                or_(
                    Client.business_name.ilike(f"%{v}%"),
                    Client.first_name.ilike(f"%{v}%"),
                    Client.last_name.ilike(f"%{v}%"),
                )
            )
            continue

        if k == "any_number":
            wh_arg.append(
                or_(Client.phone.ilike(f"%{v}%"), Client.alt_phone.ilike(f"%{v}%"))
            )
            continue

        if k == "any_email_address":
            wh_arg.append(
                or_(
                    Client.email_address.ilike(f"%{v}%"),
                    Client.alt_email_address.ilike(f"%{v}%"),
                )
            )
            continue

        if k == "date_on":
            minus_day = (
                DatetimeDeltaMCTZU().set_datetime(v, "%Y-%m-%d").days(-1).datetime
            )
            plus_day = DatetimeDeltaMCTZU().set_datetime(v, "%Y-%m-%d").days(1).datetime
            wh_arg.append(Client.created > minus_day)
            wh_arg.append(Client.created < plus_day)
            continue

        if k == "date_from":
            date_from = (
                DatetimeDeltaMCTZU().set_datetime(v, "%Y-%m-%d").days(-1).datetime
            )
            wh_arg.append(Client.created > date_from)
            continue

        if k == "date_to":
            date_to = DatetimeDeltaMCTZU().set_datetime(v, "%Y-%m-%d").days(1).datetime
            wh_arg.append(Client.created < date_to)
            continue

        if hasattr(Client, k):
            wh_arg.append(getattr(Client, k) == v)

    se_ = (
        select(Client)
        .limit(limit)
        .offset((page - 1) * limit)
        .where(*wh_arg)
        .order_by(Client.created.desc())
    )

    count = select(func.count()).select_from(Client).where(*wh_arg)

    return se_, count


def query_update_client(client_id: int, values: dict, ignore_fields: list[str] = None):
    wh_ = (Client.client_id == client_id,)
    up_ = (
        update(Client)
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
    return up_
