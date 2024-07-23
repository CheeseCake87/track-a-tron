import sqlalchemy as s

from app.sql import BaseModel


class StockCategory(BaseModel):
    __tablename__ = "stock_category"

    # PriKey
    stock_category_id = s.Column(s.Integer, primary_key=True)

    # ForKey
    fk_stock_section_id = s.Column(
        s.Integer, s.ForeignKey("stock_section.stock_section_id"), nullable=False
    )

    # Data
    name = s.Column(s.String, nullable=False)
    color = s.Column(s.String, nullable=False)
