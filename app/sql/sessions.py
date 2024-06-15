import os

from sqlalchemy.orm import Session

from .engines import dev_db_engine, sta_db_engine, pro_db_engine

ENGINE_LOOKUP = {
    "development": dev_db_engine,
    "staging": sta_db_engine,
    "production": pro_db_engine,
}

ENGINE = ENGINE_LOOKUP.get(os.getenv("DB_ENVIRONMENT", "development"))


class _DBSession:
    def __init__(self):
        pass

    def __enter__(self):
        with Session(ENGINE) as session:
            return session

    def __exit__(self, exc_type, exc_val, exc_tb):
        pass


DBSession = _DBSession()
