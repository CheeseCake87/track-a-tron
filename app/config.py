from flask_imp.config import ImpConfig, FlaskConfig, SQLiteDatabaseConfig

database_configs = {
    "development": SQLiteDatabaseConfig(name="database"),
}

flask_config = FlaskConfig(
    secret_key="8aa7205c5c2f09d16b418d5a2df0d21d381e7220c8fa04b0"
)

imp_config = ImpConfig(
    init_session={
        "logged_in": False,
        "user_id": None,
        "user_type": None,
        "display_name": None,
    },
    database_main=database_configs["development"],
)
