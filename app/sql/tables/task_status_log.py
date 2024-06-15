import sqlalchemy as s

from app.utilities.datetime_delta import DatetimeDeltaRI
from .__base_model__ import BaseModel


class TaskStatusLog(BaseModel):
    __tablename__ = "task_status_log"

    # PriKey
    task_status_log_id = s.Column(s.Integer, primary_key=True)

    # ForKey
    fk_user_id = s.Column(
        s.Integer,
        s.ForeignKey("user.user_id"),
        nullable=True,
        default=0,
    )  # User that changed the status
    fk_task_id = s.Column(
        s.Integer,
        s.ForeignKey("task.task_id"),
        nullable=False,
    )

    # Current status
    to_task_status_id = s.Column(
        s.Integer,
        nullable=True,
        default=0,
    )
    # Previous status
    from_task_status_id = s.Column(
        s.Integer,
        nullable=True,
        default=0,
    )
    days_at_previous_task_status = s.Column(s.Integer, default=0, nullable=False)

    # Tracking
    created = s.Column(s.DateTime, default=DatetimeDeltaRI().datetime)
