import sqlalchemy as s

from app.sql import BaseModel


class Asset(BaseModel):
    __tablename__ = "asset"

    # PriKey
    asset_id = s.Column(s.Integer, primary_key=True)

    # ForKey
    fk_asset_category_id = s.Column(s.Integer, s.ForeignKey("asset_category.asset_category_id"), nullable=False)

    # Data
    brand = s.Column(s.String, nullable=False)
    model = s.Column(s.String, nullable=True)
    serial_number = s.Column(s.String, nullable=True)
    from_workshop_tag = s.Column(s.String, nullable=True)

    asset_tag = s.Column(s.String, nullable=True)

    # Tracking
    discarded = s.Column(s.Boolean, default=False)
    created = s.Column(s.DateTime, nullable=False)
