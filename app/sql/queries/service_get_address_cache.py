from sqlalchemy import select, insert, update

from app.sql.tables import ServiceGetAddressCache


def query_create_cache_entry(postcode: str, cache: dict):
    in_ = (
        insert(ServiceGetAddressCache)
        .values(postcode=postcode, cache=cache)
        .returning(ServiceGetAddressCache)
    )
    return in_


def query_read_cache_entry(postcode: str):
    """
    Expects no spaces, and all characters to be uppercase
    """
    wh_ = (ServiceGetAddressCache.postcode == postcode,)
    se_ = select(ServiceGetAddressCache).where(*wh_)
    return se_


def query_update_cache_entry(postcode: str, cache: dict):
    wh_ = (ServiceGetAddressCache.postcode == postcode,)
    up_ = (
        update(ServiceGetAddressCache)
        .where(*wh_)
        .values(cache=cache)
        .returning(ServiceGetAddressCache)
    )
    return up_
