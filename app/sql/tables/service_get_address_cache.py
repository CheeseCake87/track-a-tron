import sqlalchemy as s

from .__base_model__ import BaseModel


class ServiceGetAddressCache(BaseModel):
    """
    Table to store the results of the getAddress.io API

    This is to be used as a cache to prevent
    unnecessary requests to the API.
    """

    __tablename__ = "service_get_address_cache"

    # PriKey
    service_get_address_id = s.Column(s.Integer, primary_key=True)

    # Index
    postcode = s.Column(s.String(32), nullable=False, index=True)

    # Data
    cache = s.Column(s.JSON, default=None, nullable=True)