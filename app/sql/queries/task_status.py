from sqlalchemy import select, insert, update

from app.sql.tables import TaskStatus


def query_create_task_status(values: dict, ignore_fields: list[str] = None):
    in_ = (
        insert(TaskStatus)
        .values(
            **{
                k: v
                for k, v in values.items()
                if hasattr(TaskStatus, k) and k not in ignore_fields or []
            },
        )
        .returning(TaskStatus)
    )
    return in_


def query_read_all_task_statuses():
    se_ = select(TaskStatus).order_by(TaskStatus.task_status_id)
    return se_


def query_read_task_status_by_id(status_id: int):
    wh_ = (TaskStatus.task_status_id == status_id,)
    se_ = select(TaskStatus).where(*wh_)
    return se_


def query_read_task_status(where: dict):
    wh_ = []
    for k, v in where.items():
        wh_.append(getattr(TaskStatus, k) == v)
    if not wh_:
        return None
    se_ = select(TaskStatus).where(*wh_)
    return se_


def query_update_task_status(task_status_id: int, values: dict, ignore_fields: list[str] = None):
    wh_ = (TaskStatus.task_status_id == task_status_id,)
    up_ = (
        update(TaskStatus)
        .where(*wh_)
        .values(
            {
                k: v
                for k, v in values.items()
                if hasattr(TaskStatus, k) and k not in ignore_fields or []
            }
        )
        .returning(TaskStatus)
    )
    return up_
