import sqlalchemy as s

from .__base_model__ import BaseModel
from ...utilities import DatetimeDeltaRI


class ServiceZeptoLog(BaseModel):
    """
    Table to store the results of the Zepto API
    """

    __tablename__ = "service_zepto_log"

    # PriKey
    service_zepto_log_id = s.Column(s.Integer, primary_key=True)

    # Data
    to = s.Column(s.String(32), default=None, nullable=True)
    reply_to = s.Column(s.String(32), default=None, nullable=True)
    from_ = s.Column(s.String(32), name="from", default=None, nullable=True)
    subject = s.Column(s.String(128), default=None, nullable=True)
    body = s.Column(s.String, default=None, nullable=True)

    # API Response
    response = s.Column(s.JSON, default=None, nullable=True)

    # Tracking
    created = s.Column(s.DateTime, default=DatetimeDeltaRI().datetime)
