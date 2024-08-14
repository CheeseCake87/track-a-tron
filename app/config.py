import os

from dotenv import load_dotenv
from flask_imp.config import ImpConfig, FlaskConfig, SQLiteDatabaseConfig

load_dotenv()

database_configs = {
    "main": SQLiteDatabaseConfig(name="database"),
}

flask_config = FlaskConfig(
    secret_key=os.environ.get("SECRET_KEY"),
)

imp_config = ImpConfig(
    init_session={
        "logged_in": False,
        "user_id": None,
        "user_type": None,
        "display_name": None,
    },
    database_main=database_configs["main"],
)
