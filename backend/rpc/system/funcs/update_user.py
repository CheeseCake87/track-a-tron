from quart_rpc.exceptions import DataException
from quart_rpc.validation import DataDict
from quart_rpc.version_1_1 import RPCResponse

from backend.sql import GDBSession
from backend.sql.queries.system_user import (
    query_update_system_user,
)


def update_user(data):
    ignore_fields = ["user_id"]

    d = DataDict(data)
    try:
        user_id = d.get_ensure_key("user_id")
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
            query_update_system_user(user_id, values, ignore_fields)
        ).scalar_one_or_none()

        if not result:
            return RPCResponse.fail("No user found.")

        response = RPCResponse.success(
            {
                "user_id": result.user_id,
                "display_name": result.display_name,
                "username": result.username,
                "user_type": result.user_type,
            },
            "User updated.",
        )

        s.commit()

        return response
