from sqlalchemy import func
from sqlalchemy import select, insert, update

from app.sql.tables import Task
from app.utilities import DatetimeDeltaMCTZU


def query_create_task(values: dict, ignore_fields: list[str] = None):
    in_ = (
        insert(Task)
        .values(
            **{
                k: v
                for k, v in values.items()
                if hasattr(Task, k) and k not in ignore_fields or []
            },
        )
        .returning(Task)
    )
    return in_


def query_read_task(where: dict):
    wh_ = []
    for k, v in where.items():
        wh_.append(getattr(Task, k) == v)
    if not wh_:
        return None
    se_ = select(Task).where(*wh_)
    return se_


def query_count_tasks(
        where: dict,
        status_scopes: list[int] = None,
):
    wh_arg = []
    for k, v in where.items():

        if k == "_in" and isinstance(v, dict):
            for in_key, in_val in v.items():
                if isinstance(in_val, list):
                    if hasattr(Task, in_key):
                        wh_arg.append(getattr(Task, in_key).in_(in_val))
                        continue

        if hasattr(Task, k):
            wh_arg.append(getattr(Task, k) == v)

    se_ = select(func.count()).select_from(Task).where(*wh_arg)

    if status_scopes and isinstance(status_scopes, list):
        wh_in_status_id = (Task.fk_task_status_id.in_(status_scopes),)
        se_ = se_.where(*wh_in_status_id)

    return se_


def query_page_tasks(
        where: dict,
        limit: int = 10,
        page: int = 1,
        status_scopes: list[int] = None,
):
    if page == 0:
        page = 1

    wh_arg = []
    for k, v in where.items():
        if k == "_in" and isinstance(v, dict):
            for in_key, in_val in v.items():
                if isinstance(in_val, list):
                    if hasattr(Task, in_key):
                        wh_arg.append(getattr(Task, in_key).in_(in_val))
                        continue

        if k == "date_on":
            minus_day = DatetimeDeltaMCTZU().set_datetime(v, "%Y-%m-%d").days(-1).datetime
            plus_day = DatetimeDeltaMCTZU().set_datetime(v, "%Y-%m-%d").days(1).datetime
            wh_arg.append(Task.created > minus_day)
            wh_arg.append(Task.created < plus_day)
            continue

        if k == "date_from":
            date_from = DatetimeDeltaMCTZU().set_datetime(v, "%Y-%m-%d").days(-1).datetime
            wh_arg.append(Task.created > date_from)
            continue

        if k == "date_to":
            date_to = DatetimeDeltaMCTZU().set_datetime(v, "%Y-%m-%d").days(1).datetime
            wh_arg.append(Task.created < date_to)
            continue

        if hasattr(Task, k):
            wh_arg.append(getattr(Task, k) == v)

    se_ = (
        select(Task)
        .limit(limit)
        .offset((page - 1) * limit)
        .where(*wh_arg)
        .order_by(Task.created.desc())
    )

    if status_scopes:
        wh_in_status_id = (Task.fk_task_status_id.in_(status_scopes),)
        se_ = se_.where(*wh_in_status_id)

    return se_


def query_update_task(task_id: int, values: dict, ignore_fields: list[str] = None):
    wh_ = (Task.task_id == task_id,)
    up_ = (
        update(Task)
        .where(*wh_)
        .values(
            {
                k: v
                for k, v in values.items()
                if hasattr(Task, k) and k not in ignore_fields or []
            }
        )
        .returning(Task)
    )
    return up_


if __name__ == "__main__":
    print(query_page_tasks(where={}))
