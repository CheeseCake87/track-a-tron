import sqlalchemy as s

from app.utilities.datetime_delta import DatetimeDeltaMC
from .__base_model__ import BaseModel


class System(BaseModel):
    __tablename__ = "system"

    # PriKey
    system_id = s.Column(s.Integer, primary_key=True)

    # Data
    version = s.Column(s.String, nullable=False)
    installation_complete = s.Column(s.Boolean, nullable=False, default=False)

    # Tracking
    created = s.Column(s.DateTime, nullable=False, default=DatetimeDeltaMC().datetime)
