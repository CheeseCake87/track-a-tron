import sqlalchemy as s

from app.utilities.datetime_delta import DatetimeDeltaRI
from .__base_model__ import BaseModel


class WorkflowTemplate(BaseModel):
    __tablename__ = "workflow_template"

    # PriKey
    workflow_template_id = s.Column(s.Integer, primary_key=True)

    # Data
    name = s.Column(s.String(64), default=None, nullable=True)

    # Email
    email = s.Column(s.Boolean, default=False)
    email_subject = s.Column(s.String, default=None, nullable=True)
    email_html = s.Column(s.Text, default="", nullable=True)

    # SMS
    sms = s.Column(s.Boolean, default=False)
    sms_text = s.Column(s.String, default="", nullable=True)

    # Tracking
    created = s.Column(s.DateTime, default=DatetimeDeltaRI().datetime)
