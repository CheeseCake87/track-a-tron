import sqlalchemy as s

from backend.sql import BaseModel


class StockSection(BaseModel):
    __tablename__ = "stock_section"

    # PriKey
    stock_section_id = s.Column(s.Integer, primary_key=True)

    # Data
    name = s.Column(s.String, nullable=False)
    color = s.Column(s.String, nullable=False)
