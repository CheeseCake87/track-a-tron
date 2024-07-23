import sqlalchemy as s

from app.sql import BaseModel


class WorkflowTrigger(BaseModel):
    """
    These triggers are started by on_status_id in the workflow table.

    The delay_* determines the trigger order.

    Once the workflow is triggered, all triggers listed will be loaded
    into Huey's task queue using the delay_* values.
    """

    __tablename__ = "workflow_trigger"

    # PriKey
    workflow_trigger_id = s.Column(s.Integer, primary_key=True)

    # ForKey
    fk_workflow_id = s.Column(
        s.Integer,
        s.ForeignKey("workflow.workflow_id"),
        nullable=False,
    )

    # Delay
    delay_minutes = s.Column(s.Integer, default=0, nullable=False)
    delay_hours = s.Column(s.Integer, default=0, nullable=False)
    delay_days = s.Column(s.Integer, default=0, nullable=False)

    # Send Template
    send_template = s.Column(s.Boolean, default=False)
    send_workflow_template_id = s.Column(
        s.Integer,
        nullable=True,
        default=0,
        index=True,
    )

    # Change Status
    change_status = s.Column(s.Boolean, default=False)
    change_to_status_id = s.Column(
        s.Integer,
        nullable=True,
        default=0,
        index=True,
    )

    # Tracking
    created = s.Column(s.DateTime)
