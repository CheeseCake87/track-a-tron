import os

from sqlalchemy import create_engine

from backend.config import Folders

DB_DEV_SQLF = os.getenv("DB_DEV_SQLITE_FILENAME", "tat-development.db")

DB_STA_PGL = os.getenv("DB_STA_PG_LOCATION")
DB_STA_PGD = os.getenv("DB_STA_PG_DATABASE")
DB_STA_PGU = os.getenv("DB_STA_PG_USERNAME")
DB_STA_PGP = os.getenv("DB_STA_PG_PASSWORD")

DB_PRO_PGL = os.getenv("DB_PRO_PG_LOCATION")
DB_PRO_PGD = os.getenv("DB_PRO_PG_DATABASE")
DB_PRO_PGU = os.getenv("DB_PRO_PG_USERNAME")
DB_PRO_PGP = os.getenv("DB_PRO_PG_PASSWORD")

# postgres (run dev_pg.yaml)
# e = create_engine(f"postgresql+psycopg2://{PGU}:{PGP}@{PGL}/{PGD}")


dev_db_engine = create_engine(
    f"sqlite:///{Folders().instance}/{DB_DEV_SQLF}",
    # echo=True,
)

sta_db_engine = create_engine(
    f"postgresql+psycopg2://{DB_STA_PGU}:{DB_STA_PGP}@{DB_STA_PGL}/{DB_STA_PGD}",
    # echo=True,
)

pro_db_engine = create_engine(
    f"postgresql+psycopg2://{DB_PRO_PGU}:{DB_PRO_PGP}@{DB_PRO_PGL}/{DB_PRO_PGD}",
    # echo=True,
)


ENGINE_LOOKUP = {
    "development": dev_db_engine,
    "staging": sta_db_engine,
    "production": pro_db_engine,
}

ENGINE = ENGINE_LOOKUP.get(os.getenv("DB_ENVIRONMENT", "development"))

__all__ = ["ENGINE"]