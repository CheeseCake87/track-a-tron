from quart_rpc.exceptions import DataException
from quart_rpc.validation import DataDict
from quart_rpc.version_1_1 import RPCResponse

from app.sql import GDBSession
from app.sql.queries.system_user import (
    query_read_system_user,
)


def get_user(data):
    d = DataDict(data)
    try:
        where = d.get_ensure_key("where")
    except DataException:
        return RPCResponse.fail("Missing required data.", {"where": "{field: value}"})

    with GDBSession as s:
        result = s.execute(query_read_system_user(where)).scalar_one_or_none()

        if not result:
            return RPCResponse.fail("No user found.")

        return RPCResponse.success(
            {
                "user_id": result.user_id,
                "username": result.username,
                "display_name": result.display_name,
                "email": result.email,
                "sms": result.sms,
                "private_key": result.private_key,
                "user_type": result.user_type,
                "disabled": result.disabled,
                "deleted": result.deleted,
                "created": result.created,
            },
            "User found.",
        )
