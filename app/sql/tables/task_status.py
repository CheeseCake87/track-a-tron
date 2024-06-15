import sqlalchemy as s

from app.utilities.datetime_delta import DatetimeDeltaRI
from .__base_model__ import BaseModel


class TaskStatus(BaseModel):
    __tablename__ = "task_status"

    # PriKey
    task_status_id = s.Column(s.Integer, primary_key=True)

    # ForKey
    fk_task_category_id = s.Column(
        s.Integer,
        s.ForeignKey("task_category.task_category_id"),
        nullable=False,
    )

    # Data
    name = s.Column(s.String, default=None, nullable=True)
    color = s.Column(s.String(64), default=None, nullable=True)
    order = s.Column(s.Integer, default=0)

    # visibility
    user = s.Column(s.Boolean, default=True)
    manager = s.Column(s.Boolean, default=True)

    # Additional actions
    include_in_add_task = s.Column(s.Boolean, default=False)
    set_dnc = s.Column(s.Boolean, default=False)

    # Tracking
    created = s.Column(s.DateTime, default=DatetimeDeltaRI().datetime)
