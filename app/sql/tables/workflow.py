import sqlalchemy as s

from app.utilities.datetime_delta import DatetimeDeltaRI
from .__base_model__ import BaseModel


class Workflow(BaseModel):
    """
    Once the workflow is triggered using the on_status_id,
    all triggers found in the workflow_trigger table that match the
    workflow_id in this table will be loaded into Huey's task queue.

    As each trigger is loaded into Huey, the task_sid from Huey along with
    the details of the trigger will be stored in the workflow_task_queue table.

    Huey will then execute the task_sid and update the workflow_task_queue table.
    """
    __tablename__ = "workflow"

    # PriKey
    workflow_id = s.Column(s.Integer, primary_key=True)

    # ForKey
    fk_task_category_id = s.Column(
        s.Integer,
        s.ForeignKey("task_category.task_category_id"),
        nullable=False,
    )

    # Trigger on Status
    on_status_id = s.Column(s.Integer, nullable=False, default=0, index=True)

    # Data
    active = s.Column(s.Boolean, default=False)
    name = s.Column(s.String(64), default=None, nullable=True)

    # Tracking
    created = s.Column(s.DateTime, default=DatetimeDeltaRI().datetime)

    # Relationship
    rel_workflow_triggers = s.orm.relationship(
        "WorkflowTrigger",
        viewonly=True
    )
    rel_workflow_task_queue = s.orm.relationship(
        "WorkflowTaskQueue",
        viewonly=True
    )
