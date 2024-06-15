import sqlalchemy as s

from .__base_model__ import BaseModel


class System(BaseModel):
    __tablename__ = "system"

    # PriKey
    system_id = s.Column(s.Integer, primary_key=True)

    # Key
    service = s.Column(s.String, nullable=False, index=True)

    # Data
    data = s.Column(s.JSON, nullable=True)
