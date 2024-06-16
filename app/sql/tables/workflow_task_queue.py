import sqlalchemy as s

from app.utilities.datetime_delta import DatetimeDeltaRI
from .__base_model__ import BaseModel


class WorkflowTaskQueue(BaseModel):
    __tablename__ = "workflow_task_queue"

    # PriKey
    workflow_task_queue_id = s.Column(s.Integer, primary_key=True)

    # ForKey
    fk_workflow_id = s.Column(
        s.Integer,
        s.ForeignKey("workflow.workflow_id"),
        nullable=False,
    )
    fk_task_id = s.Column(
        s.Integer,
        s.ForeignKey("task.task_id"),
        nullable=False,
    )

    # Action: Send Template
    send_template = s.Column(s.Boolean, default=False)
    send_workflow_template_id = s.Column(
        s.Integer,
        nullable=True,
        default=None,
    )

    # Action: Change Status
    change_status = s.Column(s.Boolean, default=False)
    change_to_status_id = s.Column(
        s.Integer,
        nullable=True,
        default=None,
    )

    # Data
    task_sid = s.Column(s.String, nullable=True, default=None, index=True)
    task_happens_at = s.Column(s.DateTime, default=None, nullable=True)

    # Flags
    task_done = s.Column(s.Boolean, default=False, nullable=True)
    task_cancelled = s.Column(s.Boolean, default=False, nullable=True)

    # Tracking
    created = s.Column(s.DateTime, default=DatetimeDeltaRI().datetime)
