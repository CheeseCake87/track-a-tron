import sqlalchemy as s

from backend.sql import BaseModel


class Todo(BaseModel):
    __tablename__ = "todo"

    # PriKey
    todo_id = s.Column(s.Integer, primary_key=True)

    # ForKey
    fk_user_id = s.Column(
        s.Integer,
        s.ForeignKey("system_user.user_id"),
        nullable=True,
    )

    # Data
    summary = s.Column(s.String, nullable=False)

    # Due date
    no_due_datetime = s.Column(s.Boolean, nullable=False, default=False)
    due_datetime = s.Column(s.DateTime, nullable=True, default=None)

    # Notification
    notify_via_email = s.Column(s.Boolean, nullable=False, default=False)
    notify_via_sms = s.Column(s.Boolean, nullable=False, default=False)
    notify_x_before = s.Column(s.Integer, nullable=True, default=None)
    notification_datetime = s.Column(s.DateTime, nullable=True, default=None)

    # Flags
    done = s.Column(s.Boolean, nullable=False, default=False)
    overdue = s.Column(s.Boolean, nullable=False, default=False)

    # Tracking
    completed = s.Column(s.DateTime, nullable=True, default=None)
    created = s.Column(s.DateTime, nullable=False)
