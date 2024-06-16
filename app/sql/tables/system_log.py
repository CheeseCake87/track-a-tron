import sqlalchemy as s

from app.utilities.datetime_delta import DatetimeDeltaMC
from .__base_model__ import BaseModel


class SystemLog(BaseModel):
    __tablename__ = "system_log"

    # PriKey
    system_log_id = s.Column(s.Integer, primary_key=True)

    # Data
    log = s.Column(s.String, nullable=True, default=None)

    # Tracking
    created = s.Column(s.DateTime, nullable=False, default=DatetimeDeltaMC().datetime)
