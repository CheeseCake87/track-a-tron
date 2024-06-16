from quart_rpc.version_1_0 import RPCResponse

from app.rpc.security import session_check
from app.sql import DBSession
from app.sql.queries.user import (
    query_read_all_users,
)


@session_check("logged_in", True)
@session_check("user_type", "admin")
def get_all_users(_):
    """
    Request Context Required
    """
    with DBSession as s:
        query = query_read_all_users()
        result = s.execute(query).scalars().all()

        return RPCResponse.success(
            [
                {
                    "user_id": r.user_id,
                    "username": r.username,
                    "display_name": r.display_name,

                    "email": r.email,
                    "sms": r.sms,

                    "private_key": r.private_key,

                    "user_type": r.user_type,
                    "disabled": r.disabled,
                    "deleted": r.deleted,

                    "created": r.created,
                }
                for r in result
            ],
            "Users found." if result else "No users found.",
        )
