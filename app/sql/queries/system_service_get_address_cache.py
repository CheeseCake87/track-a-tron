from sqlalchemy import select, insert, update

from app.sql.tables import SystemServiceGetAddressCache


def query_create_cache_entry(postcode: str, cache: dict):
    in_ = (
        insert(SystemServiceGetAddressCache)
        .values(postcode=postcode, cache=cache)
        .returning(SystemServiceGetAddressCache)
    )
    return in_


def query_read_cache_entry(postcode: str):
    """
    Expects no spaces, and all characters to be uppercase
    """
    wh_ = (SystemServiceGetAddressCache.postcode == postcode,)
    se_ = select(SystemServiceGetAddressCache).where(*wh_)
    return se_


def query_update_cache_entry(postcode: str, cache: dict):
    wh_ = (SystemServiceGetAddressCache.postcode == postcode,)
    up_ = (
        update(SystemServiceGetAddressCache)
        .where(*wh_)
        .values(cache=cache)
        .returning(SystemServiceGetAddressCache)
    )
    return up_
