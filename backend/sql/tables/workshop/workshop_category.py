import sqlalchemy as s

from backend.sql import BaseModel


class WorkshopCategory(BaseModel):
    __tablename__ = "workshop_category"

    # PriKey
    workshop_category_id = s.Column(s.Integer, primary_key=True)

    # Data
    name = s.Column(s.String, nullable=False)
    color = s.Column(s.String, nullable=False)
