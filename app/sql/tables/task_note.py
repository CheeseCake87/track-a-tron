import sqlalchemy as s

from .__base_model__ import BaseModel


class TaskNote(BaseModel):
    __tablename__ = "task_note"

    # PriKey
    task_note_id = s.Column(s.Integer, primary_key=True)

    # ForKey
    fk_task_id = s.Column(
        s.Integer,
        s.ForeignKey("task.task_id"),
    )
    fk_user_id = s.Column(
        s.Integer,
        s.ForeignKey("user.user_id"),
        nullable=True,
    )

    # Data
    html_note = s.Column(s.String, nullable=False)
    text_note = s.Column(s.String, nullable=False)

    # Tracking
    created = s.Column(s.DateTime, nullable=False)
