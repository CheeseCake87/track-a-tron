import sqlalchemy as s

from app.sql import BaseModel


class AssetPartNameCache(BaseModel):
    """
    This table stores the names of asset parts for quick reference.
    To be used in a datalist tag.
    """
    __tablename__ = "asset_part_name_cache"

    # PriKey
    asset_part_name_cache_id = s.Column(s.Integer, primary_key=True)

    # ForKey
    fk_asset_category_id = s.Column(s.Integer, s.ForeignKey("asset_category.asset_category_id"), nullable=False)

    # Data
    name = s.Column(s.String, nullable=False)
