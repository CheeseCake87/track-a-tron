from sqlalchemy.orm import DeclarativeBase

from .engines import dev_db_engine, sta_db_engine, pro_db_engine
from .sessions import GDBSession
from .sessions import ENGINE


class BaseModel(DeclarativeBase):
    pass


__all__ = [
    "dev_db_engine",
    "sta_db_engine",
    "pro_db_engine",
    "GDBSession",
    "ENGINE",
    "BaseModel",
]
