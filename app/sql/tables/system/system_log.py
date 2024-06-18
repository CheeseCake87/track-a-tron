import sqlalchemy as s

from app.sql import BaseModel


class SystemLog(BaseModel):
    __tablename__ = "system_log"

    # PriKey
    system_log_id = s.Column(s.Integer, primary_key=True)

    # Data
    subject = s.Column(s.String, nullable=True, default=None)
    log = s.Column(s.String, nullable=True, default=None)

    # Tracking
    created = s.Column(s.DateTime)
