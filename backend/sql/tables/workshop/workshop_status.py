import sqlalchemy as s

from backend.sql import BaseModel


class WorkshopStatus(BaseModel):
    __tablename__ = "workshop_status"

    # PriKey
    workshop_status_id = s.Column(s.Integer, primary_key=True)

    # Data
    name = s.Column(s.String, default=None, nullable=True)
    color = s.Column(s.String(64), default=None, nullable=True)
    order = s.Column(s.Integer, default=0)

    # visibility
    user = s.Column(s.Boolean, default=True)
    manager = s.Column(s.Boolean, default=True)

    # Additional actions
    available_in_create = s.Column(s.Boolean, default=False)
    set_client_dnc = s.Column(s.Boolean, default=False)
