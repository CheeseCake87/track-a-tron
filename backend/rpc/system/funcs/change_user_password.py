from flask_imp.auth import generate_salt, encrypt_password, authenticate_password
from quart_rpc.exceptions import DataException
from quart_rpc.validation import DataDict
from quart_rpc.version_1_1 import RPCResponse

from backend.sql import GDBSession
from backend.sql.queries.system_user import (
    query_update_system_user, query_read_system_user_by_user_id,
)


def change_user_password(data):
    d = DataDict(data)
    try:
        user_id = d.get_ensure_key("user_id")
        current_password = d.get_ensure_key("current_password")
        new_password = d.get_ensure_key("new_password")
    except DataException:
        return RPCResponse.fail(
            "Missing required data.",
            {
                "user_id": "int",
                "current_password": "str",
                "new_password": "str",
            },
        )

    with GDBSession as s:
        result = s.execute(
            query_read_system_user_by_user_id(user_id)
        ).scalar_one_or_none()
        if not result:
            return RPCResponse.fail("No user found.")

        if not authenticate_password(current_password, result.password, result.salt):
            return RPCResponse.fail("Invalid password.")

        salt = generate_salt()
        password_hash = encrypt_password(new_password, salt)

        s.execute(
            query_update_system_user(
                user_id,
                {"password": password_hash, "salt": salt}
            )
        ).scalar_one_or_none()

        response = RPCResponse.success(
            {
                "user_id": result.user_id,
                "display_name": result.display_name,
                "username": result.username,
                "user_type": result.user_type,
            },
            "Password updated.",
        )

        s.commit()

        return response
