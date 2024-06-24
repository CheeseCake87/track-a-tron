import sqlalchemy as s

from app.sql import BaseModel


class SystemDeviceBrandCache(BaseModel):
    """
    This table stores the names of device brands for quick reference.
    To be used in a datalist tag.
    """
    __tablename__ = "system_device_brand_cache"

    # PriKey
    system_device_brand_cache_id = s.Column(s.Integer, primary_key=True)

    # Data
    name = s.Column(s.String, nullable=False)
