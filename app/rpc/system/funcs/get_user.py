from quart_rpc.version_1_0 import RPCResponse

from app.utilities.security import session_check
from app.sql import DBSession
from app.sql.queries.user import (
    query_read_user,
)
from quart_rpc.exceptions import DataException
from quart_rpc.validation import DataDict


@session_check("logged_in", True)
@session_check("user_type", "admin")
def get_user(data):
    d = DataDict(data)
    try:
        where = d.get_ensure_key("where")
    except DataException:
        return RPCResponse.fail("Missing required data.", {"where": "{field: value}"})

    with DBSession as s:
        result = s.execute(query_read_user(where)).scalar_one_or_none()

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
