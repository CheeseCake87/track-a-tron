from quart_rpc.version_1_1 import RPCResponse

from app.sql import GDBSession
from app.sql.queries.system_user import (
    query_read_all_system_users,
)


def get_all_users(_):
    with GDBSession as s:
        query = query_read_all_system_users()
        result = s.execute(query).scalars().all()

        return RPCResponse.success(
            [
                {
                    "user_id": r.system_user_id,
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
