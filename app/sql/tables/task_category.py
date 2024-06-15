import sqlalchemy as s

from .__base_model__ import BaseModel


class TaskCategory(BaseModel):
    __tablename__ = "task_category"

    # PriKey
    task_category_id = s.Column(s.Integer, primary_key=True)

    # Data
    name = s.Column(s.String, nullable=False)
    color = s.Column(s.String, nullable=False)

    # Tracking
    created = s.Column(s.DateTime, nullable=False)

    # Relationships
    rel_tasks = s.orm.relationship(
        "Task",
        back_populates="rel_task_category"
    )
    rel_workflows = s.orm.relationship(
        "Workflow",
        viewonly=True
    )
