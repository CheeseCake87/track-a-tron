import sqlalchemy as s

from app.extensions import db


class SystemCacheServiceGetAddress(db.Model):
    """
    Table to store the results of the getAddress.io API

    This is to be used as a cache to prevent
    unnecessary requests to the API.
    """

    __tablename__ = "system_service_get_address_cache"

    # PriKey
    system_service_get_address_id = s.Column(s.Integer, primary_key=True)

    # Index
    postcode = s.Column(s.String(32), nullable=False, index=True)

    # Data
    cache = s.Column(s.JSON, default=None, nullable=True)
