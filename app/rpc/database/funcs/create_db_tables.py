from quart_rpc.exceptions import DataException
from quart_rpc.validation import DataDict
from quart_rpc.version_1_0 import RPCResponse

from app.sql.engines import dev_db_engine, sta_db_engine, pro_db_engine
from app.sql.tables import BaseModel


def create_db_tables(data):
    d = DataDict(data)
    try:
        environment = d.get_ensure_key("environment")
    except DataException:
        return RPCResponse.fail(
            "Missing required data.",
            {
                "environment": "[development, staging, production]",
            },
        )

    lookup = {
        "development": dev_db_engine,
        "staging": sta_db_engine,
        "production": pro_db_engine,
    }

    if environment not in lookup:
        return RPCResponse.fail("Invalid environment.")

    BaseModel.metadata.create_all(lookup[environment])
    return RPCResponse.success(message="Tables created.")
