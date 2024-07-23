import sqlalchemy as s

from app.sql import BaseModel


class SystemService(BaseModel):
    __tablename__ = "system_service"

    # PriKey
    system_service_id = s.Column(s.Integer, primary_key=True)

    # Meta
    name = s.Column(s.String, nullable=True, default=None)
    category = s.Column(s.String, nullable=True, default=None)

    # Data
    data = s.Column(s.JSON, nullable=True, default=None)

    # Flags
    enabled = s.Column(s.Boolean, nullable=False, default=False)
