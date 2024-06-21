from quart_rpc.exceptions import DataException
from quart_rpc.validation import DataDict
from quart_rpc.version_1_1 import RPCResponse

from app.sql import GDBSession
from app.sql.queries.system_user import (
    query_update_system_user,
)


def delete_user(data):
    d = DataDict(data)
    try:
        system_user_id = d.get_ensure_key("system_user_id")
        username = d.get_ensure_key("username")
        display_name = d.get_ensure_key("display_name")
    except DataException:
        return RPCResponse.fail(
            "Missing required data.",
            {
                "system_user_id": "int",
                "username": "str",
                "display_name": "str",
            },
        )

    with GDBSession as s:
        result = s.execute(
            query_update_system_user(
                system_user_id,
                {
                    "username": f"{system_user_id}_deleted_{username}",
                    "display_name": f"{display_name} (deleted)",
                    "deleted": True,
                }
            )
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
            "User deleted.",
        )

        s.commit()

        return response
