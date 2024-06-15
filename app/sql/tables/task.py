import sqlalchemy as s

from .__base_model__ import BaseModel


class Task(BaseModel):
    __tablename__ = "task"

    # PriKey
    task_id = s.Column(s.Integer, primary_key=True)

    # ForKey
    fk_task_status_id = s.Column(
        s.Integer,
        s.ForeignKey("task_status.task_status_id"),
    )  # Status of the task
    fk_task_category_id = s.Column(
        s.Integer,
        s.ForeignKey("task_category.task_category_id"),
    )  # Category of the task
    fk_user_id = s.Column(
        s.Integer,
        s.ForeignKey("user.user_id"),
        default=1,
    )  # User that created the task
    fk_assigned_user_id = s.Column(
        s.Integer,
        s.ForeignKey("user.user_id"),
        default=1,
    )  # User that the task is assigned to

    # Due date
    no_due_datetime = s.Column(s.Boolean, nullable=False, default=False)
    due_datetime = s.Column(s.DateTime, nullable=True, default=None)

    # Notification
    notify_x_before = s.Column(s.Integer, nullable=True, default=None)
    notification_datetime = s.Column(s.DateTime, nullable=True, default=None)

    # Flags
    done = s.Column(s.Boolean, nullable=False, default=False)
    overdue = s.Column(s.Boolean, nullable=False, default=False)
    completed = s.Column(s.DateTime, nullable=True, default=None)

    # Tracking
    created = s.Column(s.DateTime, nullable=False)

    # Relationships
    rel_task_category = s.orm.relationship(
        "TaskCategory",
        back_populates="rel_tasks",
        viewonly=True,
    )
    rel_status_logs = s.orm.relationship(
        "TaskStatusLog",
        viewonly=True,
    )
    rel_workflow_task_queue = s.orm.relationship(
        "WorkflowTaskQueue",
        viewonly=True,
    )
