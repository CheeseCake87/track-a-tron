from quart_rpc.exceptions import DataException
from quart_rpc.validation import DataDict
from quart_rpc.version_1_1 import RPCResponse

from app.sql import GDBSession
from app.sql.queries.system_user import (
    query_update_system_user,
)


def update_user(data):
    ignore_fields = ["system_user_id"]

    d = DataDict(data)
    try:
        system_user_id = d.get_ensure_key("system_user_id")
        values = d.get_ensure_key("values")
    except DataException:
        return RPCResponse.fail(
            "Missing required data.",
            {
                "user_id": "int",
                "values": "dict",
            },
        )

    with GDBSession as s:
        result = s.execute(
            query_update_system_user(system_user_id, values, ignore_fields)
        ).scalar_one_or_none()

        if not result:
            return RPCResponse.fail("No user found.")

        response = RPCResponse.success(
            {
                "system_user_id": result.system_user_id,
                "display_name": result.display_name,
                "username": result.username,
                "user_type": result.user_type,
            },
            "User updated.",
        )

        s.commit()

        return response
