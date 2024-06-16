from quart_rpc.version_1_0 import RPCResponse

from app.utilities.security import session_check
from app.sql import DBSession
from app.sql.queries.user import (
    query_update_user,
)
from quart_rpc.exceptions import DataException
from quart_rpc.validation import DataDict


@session_check("logged_in", True)
@session_check("user_type", "admin")
def update_user(data):
    """
    Request Context Required
    """
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

    with DBSession as s:
        result = s.execute(
            query_update_user(user_id, values, ignore_fields)
        ).scalar_one_or_none()

        if not result:
            return RPCResponse.fail("No user found.")

        response = RPCResponse.success(
            {
                "user_id": result.user_id,
                "display_name": result.display_name,
                "username": result.username,
                "disabled": result.disabled,
                "sequential_allocation": result.sequential_allocation,
                "holiday": result.holiday,
                "user_type": result.user_type,
                "time_locked": result.time_locked,
                "ip_locked": result.ip_locked,
                "ip_addresses": result.ip_addresses,
                "source_scopes": result.source_scopes,
                "status_scopes": result.status_scopes,
                "background": result.background,
                "created": result.created,
                "deleted": result.deleted,
            },
            "User updated.",
        )

        s.commit()

        return response
