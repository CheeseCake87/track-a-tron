import sqlalchemy as s

from .__base_model__ import BaseModel


class Service(BaseModel):
    __tablename__ = "service"

    # PriKey
    service_id = s.Column(s.Integer, primary_key=True)

    # Meta
    category = s.Column(s.String, nullable=False, index=True)
    name = s.Column(s.String, nullable=False, index=True)

    # Data
    data = s.Column(s.JSON, nullable=True)

    # Flags
    enabled = s.Column(s.Boolean, nullable=False, default=False)
