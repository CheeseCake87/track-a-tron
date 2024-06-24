import sqlalchemy as s

from app.sql import BaseModel


class AssetPart(BaseModel):
    __tablename__ = "asset_part"

    # PriKey
    asset_part_id = s.Column(s.Integer, primary_key=True)

    # ForKey
    fk_asset_id = s.Column(s.Integer, s.ForeignKey("asset.asset_id"), nullable=False)
    fk_asset_category_id = s.Column(s.Integer, s.ForeignKey("asset_category.asset_category_id"), nullable=False)

    # Data
    name = s.Column(s.String, nullable=False)
    used_on_workshop_tag = s.Column(s.String, nullable=True)

    # Flags
    removed = s.Column(s.Boolean, default=False)
    tested = s.Column(s.Boolean, default=False)
    working = s.Column(s.Boolean, default=False)

    # Tracking
    discarded = s.Column(s.Boolean, default=False)
    created = s.Column(s.DateTime, nullable=False)
