import sqlalchemy as s
from app.api.system.models import SystemCacheServiceGetAddress
from app.extensions import db


def query_create_cache_entry(postcode: str, cache: dict):
    in_ = (
        s.insert(SystemCacheServiceGetAddress)
        .values(postcode=postcode, cache=cache)
        .returning(SystemCacheServiceGetAddress)
    )
    db.session.execute(in_)
    db.session.commit()
    return in_


def query_read_cache_entry(postcode: str) -> SystemCacheServiceGetAddress:
    """
    Expects no spaces, and all characters to be uppercase
    """
    wh_ = (SystemCacheServiceGetAddress.postcode == postcode,)
    se_ = s.select(SystemCacheServiceGetAddress).where(*wh_)
    re_ = db.session.execute(se_)
    return re_


def query_update_cache_entry(postcode: str, cache: dict):
    wh_ = (SystemCacheServiceGetAddress.postcode == postcode,)
    up_ = (
        s.update(SystemCacheServiceGetAddress)
        .where(*wh_)
        .values(cache=cache)
        .returning(SystemCacheServiceGetAddress)
    )
    db.session.execute(up_)
    db.session.commit()
    return up_
