from quart_rpc.validation import DataDict, DataException
from quart_rpc.version_1_0 import RPCResponse

from app.sql import DBSession
from app.sql.queries.system_service import query_update_service


def update_service(data):
    with DBSession as s:
        d = DataDict(data)
        try:
            name = d.get_ensure_key("name")
            enabled = d.get_ensure_key("enabled")
            data = d.get_ensure_key("data")
        except DataException:
            return RPCResponse.fail(
                "Missing required data.",
                {
                    "name": "string",
                    "enabled": "bool",
                    "data": "dict",
                },
            )

        s.execute(query_update_service(name, enabled, data))
        s.commit()

        return RPCResponse.success(
            True,
            "Service updated successfully.",
        )
